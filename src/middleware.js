// src/middleware.js
import { NextResponse } from 'next/server'
import { jwtVerify } from 'jose'

// Convert the secret into a Uint8Array for jose
const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'
const secretKey = new TextEncoder().encode(JWT_SECRET)

export const config = {
  matcher: ['/transactions/:path*', '/budget/:path*','/homepage/:path*'],
}

export async function middleware(request) {
  const token = request.cookies.get('token')?.value

  if (!token) {
    return NextResponse.redirect(new URL('/unAuthenticated', request.url))
  }

  try {
    // Verify token integrity and expiration using jose (works in Edge runtime)
    await jwtVerify(token, secretKey)
  } catch (err) {
    console.error('JWT verification failed:', err)
    return NextResponse.redirect(new URL('/unAuthenticated', request.url))
  }

  return NextResponse.next()
}
