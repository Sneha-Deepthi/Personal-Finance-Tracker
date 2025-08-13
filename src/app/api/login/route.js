// src/app/api/login/route.js
import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import User from '@/models/Users'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_key'

export async function POST(request) {
  try {
    const { email, password } = await request.json()
    if (!email || !password) {
      return NextResponse.json({ message: 'Email and password are required' }, { status: 400 })
    }

    await connectDB()

    const user = await User.findOne({ email })
    if (!user) {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return NextResponse.json({ message: 'Invalid password' }, { status: 401 })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '7d' })

    // ✅ Redirect response after login
    const response = NextResponse.redirect(new URL('/homepage', request.url))

    // ✅ Set secure cookie for production
    response.cookies.set('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // must be true on Vercel
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    })

    return response
  } catch (error) {
    console.error('Login error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
