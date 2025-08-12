import { NextResponse } from 'next/server'

export const config = {
  matcher: ['/transactions/:path*', '/budget/:path*', '/homepage/:path*'], // Apply middleware to these routes
}

export function middleware(request) {
  const token = request.cookies.get('token')?.value

  // If token is missing, redirect to login
  if (!token) {
    return NextResponse.redirect(new URL('/unAuthenticated', request.url))
  }

  // Optionally, attach token or decoded info to the request (advanced usage)
  return NextResponse.next()
}
