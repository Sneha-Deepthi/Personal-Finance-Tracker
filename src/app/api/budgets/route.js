import { connectDB } from '@/lib/mongo'
import Budget from '@/models/Budget'
import { cookies } from 'next/headers'
import { getUserIdFromToken } from '@/lib/auth'

export async function GET() {
  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const budgets = await Budget.find({ userId }).sort({ createdAt: -1 })
  return Response.json(budgets)
}

export async function POST(req) {
  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { category, amount, month } = await req.json()
  const newBudget = await Budget.create({ category, amount, month, userId })
  return Response.json(newBudget)
}
