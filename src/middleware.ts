import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Check if the request is for a protected route
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    // In a real application, you would check for a valid JWT token
    // For this demo, we'll check for a simple auth flag in localStorage
    // Note: This is handled on the client side in the dashboard page
    
    // For server-side middleware, you would typically check cookies or headers
    const authCookie = request.cookies.get('auth');
    
    // If no auth cookie exists, redirect to login
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*']
};
