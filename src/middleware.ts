import { NextResponse, type NextRequest } from 'next/server';
import { createServerClient } from '@supabase/ssr';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yxvfciewtuvpljaoukyu.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_RY-xubaK5noTlmrlrg0bIw_HahknsC4';

/**
 * Routes requiring mandatory user authentication.
 */
const PROTECTED_PREFIXES = ['/portfolio', '/account', '/orders'];

/**
 * Public authentication routes where authenticated users should be redirected away.
 */
const AUTH_ROUTES = ['/login'];

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  // Initialize Supabase Server Client to inspect and refresh auth cookies
  const supabase = createServerClient(supabaseUrl, supabaseKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Verify authenticated user from Supabase token
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // 1. Check if the requested route is a protected route
  const isProtectedRoute = PROTECTED_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtectedRoute && !user) {
    const redirectUrl = new URL('/login', request.url);
    const targetPath = pathname + request.nextUrl.search;
    redirectUrl.searchParams.set('redirect', targetPath);
    return NextResponse.redirect(redirectUrl);
  }

  // 2. If authenticated user visits /login, redirect them to intended target or /portfolio
  const isAuthRoute = AUTH_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );

  if (isAuthRoute && user) {
    const destination = request.nextUrl.searchParams.get('redirect') || '/portfolio';
    // Prevent redirect loops to /login
    if (!destination.startsWith('/login')) {
      return NextResponse.redirect(new URL(destination, request.url));
    }
    return NextResponse.redirect(new URL('/portfolio', request.url));
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static assets)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon)
     * - public files (svg, png, jpg, etc.)
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
