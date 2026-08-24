import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { getDb } from '@/db/client';
import { users } from '@/db/schema';
import { hashPassword, validatePasswordStrength } from '@/lib/password';
import { validateSession } from '@/lib/session';
import { checkRateLimit, getClientIp, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const addUserSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  name: z.string().min(2, 'Name must be at least 2 characters'),
  role: z.enum(['ADMIN', 'EDITOR', 'CLIENT', 'GUEST']).default('CLIENT'),
});

export async function POST(request: Request) {
  try {
    // Check if user is authenticated and is an ADMIN
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get('humam_session')?.value;

    if (!sessionToken) {
      return NextResponse.json(
        { error: 'Authentication required' },
        { status: 401 }
      );
    }

    const currentUser = await validateSession(sessionToken);

    if (!currentUser || currentUser.role !== 'ADMIN') {
      return NextResponse.json(
        { error: 'Admin access required to add users' },
        { status: 403 }
      );
    }

    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitKey = `add-user:${clientIp}`;
    const rateLimit = await checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIGS.register);

    if (rateLimit.isLimited) {
      return NextResponse.json(
        {
          error: 'Too many add user attempts. Please try again later.',
          resetAt: rateLimit.resetAt.toISOString(),
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json().catch(() => null);
    const validation = addUserSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error,
        },
        { status: 400 }
      );
    }

    const { email, password, name, role } = validation.data;

    // Validate password strength
    const passwordValidation = validatePasswordStrength(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: passwordValidation.error },
        { status: 400 }
      );
    }

    const db = getDb();

    // Check if user already exists
    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (existingUser.length > 0) {
      return NextResponse.json(
        { error: 'Email already registered' },
        { status: 409 }
      );
    }

    // Hash password
    const passwordHash = await hashPassword(password);

    // Create user
    const userId = crypto.randomUUID();
    await db.insert(users).values({
      id: userId,
      email: email.toLowerCase(),
      passwordHash,
      name,
      role,
    });

    return NextResponse.json(
      {
        success: true,
        message: 'User added successfully',
        user: {
          id: userId,
          email: email.toLowerCase(),
          name,
          role,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Add user error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
