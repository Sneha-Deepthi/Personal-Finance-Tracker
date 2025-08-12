import { connectDB } from '@/lib/mongo'
import Transaction from '@/models/Transaction'
import { cookies } from 'next/headers'
import { getUserIdFromToken } from '@/lib/auth'

export async function GET(req) {
  const cookieStore = await cookies() // ✅ await is required here
  const token = cookieStore.get('token')?.value

  const userId = await getUserIdFromToken(token)
  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const transactions = await Transaction.find({ userId }).sort({ date: -1 })
  return Response.json(transactions)
}

export async function POST(req) {
  await connectDB()

  const cookieStore = cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 })
  }

  const data = await req.json()
  const newTransaction = await Transaction.create({ ...data, userId })
  return Response.json(newTransaction)
}
