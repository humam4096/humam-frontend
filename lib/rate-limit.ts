// Rate limiting utilities using D1 database
import { getDb } from '@/db/client';
import { rateLimits } from '@/db/schema';
import { eq, and, lt } from 'drizzle-orm';

export interface RateLimitConfig {
  maxAttempts: number;
  windowMinutes: number;
}

export const RATE_LIMIT_CONFIGS = {
  login: { maxAttempts: 5, windowMinutes: 15 },
  register: { maxAttempts: 3, windowMinutes: 60 },
  api: { maxAttempts: 100, windowMinutes: 15 },
} as const;

/**
 * Check if a key is rate limited
 * @param key - Unique identifier (e.g., "login:192.168.1.1", "register:user@example.com")
 * @param config - Rate limit configuration
 * @returns Object with isLimited, remaining attempts, and reset time
 */
export async function checkRateLimit(
  key: string,
  config: RateLimitConfig
): Promise<{
  isLimited: boolean;
  remaining: number;
  resetAt: Date;
}> {
  const db = getDb();
  const now = new Date();
  const windowStart = new Date(now.getTime() - config.windowMinutes * 60 * 1000);

  // Clean up expired rate limit entries first
  await db.delete(rateLimits).where(lt(rateLimits.expiresAt, now.toISOString()));

  // Get existing rate limit entry
  const existing = await db
    .select()
    .from(rateLimits)
    .where(eq(rateLimits.key, key))
    .limit(1);

  if (existing.length === 0) {
    // No rate limit entry exists, create one
    const expiresAt = new Date(now.getTime() + config.windowMinutes * 60 * 1000);
    
    await db.insert(rateLimits).values({
      key,
      count: 1,
      windowStart: now.toISOString(),
      expiresAt: expiresAt.toISOString(),
    });

    return {
      isLimited: false,
      remaining: config.maxAttempts - 1,
      resetAt: expiresAt,
    };
  }

  const entry = existing[0];
  const entryWindowStart = new Date(entry.windowStart);

  // Check if we're still in the same window
  if (entryWindowStart < windowStart) {
    // Window has expired, reset the counter
    const expiresAt = new Date(now.getTime() + config.windowMinutes * 60 * 1000);
    
    await db
      .update(rateLimits)
      .set({
        count: 1,
        windowStart: now.toISOString(),
        expiresAt: expiresAt.toISOString(),
      })
      .where(eq(rateLimits.key, key));

    return {
      isLimited: false,
      remaining: config.maxAttempts - 1,
      resetAt: expiresAt,
    };
  }

  // We're in the same window, increment the counter
  const newCount = entry.count + 1;
  const expiresAt = new Date(entryWindowStart.getTime() + config.windowMinutes * 60 * 1000);

  await db
    .update(rateLimits)
    .set({ count: newCount })
    .where(eq(rateLimits.key, key));

  const isLimited = newCount > config.maxAttempts;
  const remaining = Math.max(0, config.maxAttempts - newCount);

  return {
    isLimited,
    remaining,
    resetAt: expiresAt,
  };
}

/**
 * Reset rate limit for a key (useful after successful authentication)
 * @param key - Unique identifier
 */
export async function resetRateLimit(key: string): Promise<void> {
  const db = getDb();
  await db.delete(rateLimits).where(eq(rateLimits.key, key));
}

/**
 * Get client IP address from request
 * @param request - Request object
 * @returns IP address string
 */
export function getClientIp(request: Request): string {
  // Cloudflare provides the real IP in CF-Connecting-IP header
  const cfIp = request.headers.get('CF-Connecting-IP');
  if (cfIp) return cfIp;

  // Fallback to X-Forwarded-For
  const forwarded = request.headers.get('X-Forwarded-For');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }

  // Fallback to X-Real-IP
  const realIp = request.headers.get('X-Real-IP');
  if (realIp) return realIp;

  return 'unknown';
}

/**
 * Clean up all expired rate limit entries (can be called periodically)
 */
export async function cleanupExpiredRateLimits(): Promise<void> {
  const db = getDb();
  const now = new Date().toISOString();
  
  await db.delete(rateLimits).where(lt(rateLimits.expiresAt, now));
}
