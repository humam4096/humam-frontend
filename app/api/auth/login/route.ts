import { NextResponse } from 'next/server';
import { getDb } from '@/db/client';
import { users } from '@/db/schema';
import { verifyPassword } from '@/lib/password';
import { createSession, getSessionCookieConfig } from '@/lib/session';
import { checkRateLimit, getClientIp, resetRateLimit, RATE_LIMIT_CONFIGS } from '@/lib/rate-limit';
import { eq } from 'drizzle-orm';
import { z } from 'zod';

const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(1, 'Password is required'),
});

export async function POST(request: Request) {
  try {
    // Rate limiting
    const clientIp = getClientIp(request);
    const rateLimitKey = `login:${clientIp}`;
    const rateLimit = await checkRateLimit(rateLimitKey, RATE_LIMIT_CONFIGS.login);

    if (rateLimit.isLimited) {
      return NextResponse.json(
        {
          error: 'Too many login attempts. Please try again later.',
          resetAt: rateLimit.resetAt.toISOString(),
        },
        { status: 429 }
      );
    }

    // Parse and validate request body
    const body = await request.json().catch(() => null);
    const validation = loginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {
          error: 'Invalid input',
          details: validation.error,
        },
        { status: 400 }
      );
    }

    const { email, password } = validation.data;
    const db = getDb();

    // Find user by email
    const result = await db
      .select()
      .from(users)
      .where(eq(users.email, email.toLowerCase()))
      .limit(1);

    if (result.length === 0) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    const user = result[0];

    // Verify password
    const isValidPassword = await verifyPassword(password, user.passwordHash);

    if (!isValidPassword) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Reset rate limit on successful login
    await resetRateLimit(rateLimitKey);

    // Create session
    const userAgent = request.headers.get('user-agent') || undefined;
    const sessionToken = await createSession(user.id, clientIp, userAgent);

    console.log('[Login API] Session created:', { userId: user.id, hasToken: !!sessionToken });

    // Set session cookie
    const cookieConfig = getSessionCookieConfig();
    console.log('[Login API] Cookie config:', cookieConfig);
    
    const response = NextResponse.json(
      {
        success: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );

    response.cookies.set({
      name: cookieConfig.name,
      value: sessionToken,
      httpOnly: cookieConfig.httpOnly,
      secure: cookieConfig.secure,
      sameSite: cookieConfig.sameSite,
      maxAge: cookieConfig.maxAge,
      path: cookieConfig.path,
    });

    console.log('[Login API] Cookie set on response');
    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
