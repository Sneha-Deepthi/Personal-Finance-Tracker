// src/app/api/auth/logout/route.js
import { cookies } from 'next/headers'

export async function POST() {
  const cookieStore = await cookies()
  cookieStore.set('token', '', {
    httpOnly: true,
    path: '/',
    maxAge: 0, // expires immediately
  })

  return Response.json({ message: 'Logged out successfully' })
}
