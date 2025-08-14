import { connectDB } from '@/lib/mongo'
import Budget from '@/models/Budget'
import { cookies } from 'next/headers'
import { getUserIdFromToken } from '@/lib/auth'

// PUT: Update a budget by ID (optional, not needed if you only show error)
export async function PUT(req, context) {
  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  // Get dynamic route params
  const { params } = context
  const id = params.id

  const { category, amount, month } = await req.json()

  const updated = await Budget.findOneAndUpdate(
    { _id: id, userId },
    { category, amount, month },
    { new: true }
  )

  if (!updated) {
    return Response.json({ error: 'Budget not found' }, { status: 404 })
  }

  return Response.json(updated)
}

// DELETE: Delete a budget by ID
export async function DELETE(req, context) {
  await connectDB()

  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value
  const userId = await getUserIdFromToken(token)

  if (!userId) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { params } = context
  const id = params.id

  const deleted = await Budget.findOneAndDelete({ _id: id, userId })

  if (!deleted) {
    return Response.json({ error: 'Budget not found' }, { status: 404 })
  }

  return Response.json({ success: true })
}
