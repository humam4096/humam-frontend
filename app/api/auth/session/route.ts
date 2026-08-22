import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { validateSession, SESSION_COOKIE_NAME } from '@/lib/session';

export async function GET(request: Request) {
  try {
    const cookieStore = await cookies();
    const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value;

    console.log('[Session API] Checking session...');
    console.log('[Session API] Cookie name:', SESSION_COOKIE_NAME);
    console.log('[Session API] Has session token:', !!sessionToken);

    if (!sessionToken) {
      console.log('[Session API] No session token found');
      return NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
    }

    // Validate session and get user
    const user = await validateSession(sessionToken);
    // console.log('[Session API] Validated user:', user ? { id: user.id, email: user.email } : null);

    if (!user) {
      // Session is invalid or expired, clear cookie
      console.log('[Session API] Session invalid or expired');
      const response = NextResponse.json(
        { authenticated: false, user: null },
        { status: 401 }
      );
      response.cookies.delete(SESSION_COOKIE_NAME);
      return response;
    }

    console.log('[Session API] Session valid, returning user');
    return NextResponse.json(
      {
        authenticated: true,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[Session API] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
