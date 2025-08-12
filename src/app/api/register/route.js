import { NextResponse } from 'next/server'
import { connectDB } from '@/lib/mongo'
import User from '@/models/Users'
import bcrypt from 'bcryptjs'

export async function POST(request) {
  try {
    const { name, email, password } = await request.json()

    if (!name || !email || !password) {
      return NextResponse.json({ message: 'All fields are required' }, { status: 400 })
    }

    await connectDB()

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 409 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    })

    return NextResponse.json(
      { message: 'User registered successfully', user: { name: newUser.name, email: newUser.email } },
      { status: 201 }
    )
  } catch (error) {
    console.error('Registration error:', error)
    return NextResponse.json({ message: 'Server error' }, { status: 500 })
  }
}
