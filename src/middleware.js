// src/middleware.js
import { NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

export const config = {
  matcher: ['/transactions/:path*', '/budget/:path*', '/homepage/:path*'], 
}

export function middleware(request) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/unAuthenticated', request.url))
  }

  try {
    // ✅ Verify token integrity and expiration
    jwt.verify(token, JWT_SECRET)
  } catch (err) {
    console.error('JWT verification failed:', err)
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}
