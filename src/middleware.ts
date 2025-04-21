import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;
  
  // Protected routes (requires authentication)
  const protectedRoutes = ['/dashboard'];
  
  // Public routes (accessible without authentication)
  const publicRoutes = ['/auth/login', '/auth/signup', '/auth/forgot-password', '/auth/reset-password'];
  
  // Check if path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );
  
  // Check if path starts with any public route
  const isPublicRoute = publicRoutes.some(route => 
    path === route || path.startsWith(`${route}/`)
  );

  // If accessing a protected route without a token, redirect to login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // If accessing login/signup pages with a token, redirect to dashboard
  if (isPublicRoute && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // For home page with a token, redirect to dashboard
  if (path === '/' && token) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // For home page without a token, redirect to login
  if (path === '/' && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
}; 