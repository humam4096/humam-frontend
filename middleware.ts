import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';
import { NextRequest, NextResponse } from 'next/server';
import { validateSession } from './lib/session';

// Create the next-intl middleware
const intlMiddleware = createMiddleware(routing);

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/dashboard'];

// Public routes that don't require authentication
const PUBLIC_ROUTES = ['/', '/login', '/contact'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Extract locale from pathname (e.g., /en/dashboard -> en)
  const localeMatch = pathname.match(/^\/(ar|en)(\/.*)?$/);
  const locale = localeMatch ? localeMatch[1] : 'en';
  const pathWithoutLocale = localeMatch ? (localeMatch[2] || '/') : pathname;

  // Skip auth check for API routes (they handle auth internally)
  if (pathname.startsWith('/api/')) {
    return intlMiddleware(request);
  }

  // Skip auth check for static files
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/static') ||
    pathname.includes('/favicon.ico') ||
    pathname.includes('.')
  ) {
    return intlMiddleware(request);
  }

  // Check if route is protected
  const isProtectedRoute = PROTECTED_ROUTES.some(route => 
    pathWithoutLocale.startsWith(route)
  );

  // Check if route is public
  const isPublicRoute = PUBLIC_ROUTES.some(route => 
    pathWithoutLocale === route || pathWithoutLocale.startsWith(route + '/')
  );

  // If route is protected, check authentication
  if (isProtectedRoute) {
    const sessionCookie = request.cookies.get('humam_session');
    
    if (!sessionCookie) {
      // No session cookie, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/login`;
      url.searchParams.set('redirect', pathWithoutLocale);
      return NextResponse.redirect(url);
    }

    // Validate session
    const user = await validateSession(sessionCookie.value);

    if (!user) {
      // Invalid or expired session, redirect to login
      const url = request.nextUrl.clone();
      url.pathname = `/${locale}/login`;
      url.searchParams.set('redirect', pathWithoutLocale);
      
      const response = NextResponse.redirect(url);
      response.cookies.delete('humam_session');
      return response;
    }

    // User is authenticated, check role-based access if needed
    // For now, all authenticated users can access dashboard
    // You can add more granular checks here based on specific routes
  }

  // If user is logged in and tries to access login, redirect to dashboard
  if (pathWithoutLocale === '/login') {
    const sessionCookie = request.cookies.get('humam_session');
    
    if (sessionCookie) {
      const user = await validateSession(sessionCookie.value);
      
      if (user) {
        const url = request.nextUrl.clone();
        url.pathname = `/`;
        return NextResponse.redirect(url);
      }
    }
  }

  // Continue with next-intl middleware for internationalization
  return intlMiddleware(request);
}

export const config = {
  // Match all pathnames except for static files
  matcher: ['/', '/(ar|en)/:path*']
};
