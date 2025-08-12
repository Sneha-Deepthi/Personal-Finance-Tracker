import { connectDB } from '@/lib/mongo'
import Budget from '@/models/Budget'
import { cookies } from 'next/headers'
import { getUserIdFromToken } from '@/lib/auth'

export async function PUT(req, { params }) {
  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { category, amount, month } = await req.json()
  const updated = await Budget.findOneAndUpdate(
    { _id: params.id, userId },
    { category, amount, month },
    { new: true }
  )

  return Response.json(updated)
}

export async function DELETE(req, { params }) {
  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  await Budget.findOneAndDelete({ _id: params.id, userId })
  return Response.json({ success: true })
}
