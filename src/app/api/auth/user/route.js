import { cookies } from 'next/headers'
import { getUserIdFromToken } from '@/lib/auth'
import { connectDB } from '@/lib/mongo'
import User from '@/models/Users'

export async function GET() {
  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return Response.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const user = await User.findById(userId).select('email')

  if (!user) {
    return Response.json({ message: 'User not found' }, { status: 404 })
  }

  return Response.json({
    email: user.email,
    userId, // ✅ include this for BudgetPageWrapper
  })
}
