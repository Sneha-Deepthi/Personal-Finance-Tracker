import { connectDB } from '@/lib/mongo'
import Transaction from '@/models/Transaction'
import { getUserIdFromToken } from '@/lib/auth'
import { cookies } from 'next/headers'

export async function PUT(req, { params }) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const userId = await getUserIdFromToken(token)

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    const updated = await Transaction.findOneAndUpdate(
      { _id: params.id, userId },
      data,
      { new: true }
    )

    if (!updated) {
      return Response.json({ message: 'Transaction not found or unauthorized' }, { status: 404 })
    }

    return Response.json(updated)
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}

export async function DELETE(req, { params }) {
  try {
    await connectDB()

    const cookieStore = cookies()
    const token = cookieStore.get('token')?.value
    const userId = await getUserIdFromToken(token)

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const deleted = await Transaction.findOneAndDelete({ _id: params.id, userId })

    if (!deleted) {
      return Response.json({ message: 'Transaction not found or unauthorized' }, { status: 404 })
    }

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
