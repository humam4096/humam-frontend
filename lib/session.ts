// Session management utilities
import { getDb } from '@/db/client';
import { sessions, users } from '@/db/schema';
import { eq } from 'drizzle-orm';
import type { User } from './auth';

const SESSION_DURATION_DAYS = 7;
const SESSION_COOKIE_NAME = 'humam_session';

/**
 * Generate a cryptographically secure session token
 * @returns Session token string
 */
export function generateSessionToken(): string {
  return crypto.randomUUID();
}

/**
 * Hash a session token for storage in database
 * @param token - Plain session token
 * @returns Hashed token
 */
export async function hashToken(token: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(token);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Create a new session for a user
 * @param userId - User ID
 * @param ipAddress - Client IP address (optional)
 * @param userAgent - Client user agent (optional)
 * @returns Session token (unhashed, to be sent to client)
 */
export async function createSession(
  userId: string,
  ipAddress?: string,
  userAgent?: string
): Promise<string> {
  const db = getDb();
  const token = generateSessionToken();
  const tokenHash = await hashToken(token);
  
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + SESSION_DURATION_DAYS);

  await db.insert(sessions).values({
    id: crypto.randomUUID(),
    userId,
    tokenHash,
    expiresAt: expiresAt.toISOString(),
    ipAddress: ipAddress || null,
    userAgent: userAgent || null,
  });

  return token;
}

/**
 * Validate a session token and return the associated user
 * @param token - Plain session token
 * @returns User object if valid, null otherwise
 */
export async function validateSession(token: string): Promise<User | null> {
  if (!token) return null;

  const db = getDb();
  const tokenHash = await hashToken(token);

  const result = await db
    .select({
      user: users,
      session: sessions,
    })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.tokenHash, tokenHash))
    .limit(1);

  if (result.length === 0) return null;

  const { user, session } = result[0];

  // Check if session has expired
  const expiresAt = new Date(session.expiresAt);
  if (expiresAt < new Date()) {
    // Delete expired session
    await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
    return null;
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
    role: user.role as User['role'],
  };
}

/**
 * Delete a session (logout)
 * @param token - Plain session token
 */
export async function deleteSession(token: string): Promise<void> {
  if (!token) return;

  const db = getDb();
  const tokenHash = await hashToken(token);

  await db.delete(sessions).where(eq(sessions.tokenHash, tokenHash));
}

/**
 * Delete all sessions for a user
 * @param userId - User ID
 */
export async function deleteAllUserSessions(userId: string): Promise<void> {
  const db = getDb();
  await db.delete(sessions).where(eq(sessions.userId, userId));
}

/**
 * Clean up expired sessions (can be called periodically)
 */
export async function cleanupExpiredSessions(): Promise<void> {
  const db = getDb();
  const now = new Date().toISOString();
  
  await db.delete(sessions).where(eq(sessions.expiresAt, now));
}

/**
 * Get session cookie configuration
 */
export function getSessionCookieConfig() {
  return {
    name: SESSION_COOKIE_NAME,
    maxAge: SESSION_DURATION_DAYS * 24 * 60 * 60, // Convert days to seconds
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
  };
}

export { SESSION_COOKIE_NAME };
