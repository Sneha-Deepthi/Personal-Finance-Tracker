import mongoose from 'mongoose'
import { connectDB } from '@/lib/mongo'
import Transaction from '@/models/Transaction'
import { getUserIdFromToken } from '@/lib/auth'
import { cookies } from 'next/headers'

// UPDATE transaction
export async function PUT(req, context) {
  try {
    const { id } = await context.params
    await connectDB()

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: 'Invalid transaction ID' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const userId = await getUserIdFromToken(token)

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const data = await req.json()

    const updated = await Transaction.findOneAndUpdate(
      { _id: id, userId },
      data,
      { new: true }
    )

    if (!updated) {
      return Response.json(
        { message: 'Transaction not found or unauthorized' },
        { status: 404 }
      )
    }

    return Response.json(updated)
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}

// DELETE transaction
export async function DELETE(req, context) {
  try {
    const { id } = await context.params
    await connectDB()

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return Response.json({ message: 'Invalid transaction ID' }, { status: 400 })
    }

    const cookieStore = await cookies()
    const token = cookieStore.get('token')?.value
    const userId = await getUserIdFromToken(token)

    if (!userId) {
      return Response.json({ message: 'Unauthorized' }, { status: 401 })
    }

    const deleted = await Transaction.findOneAndDelete({
      _id: id,
      userId
    })

    if (!deleted) {
      return Response.json(
        { message: 'Transaction not found or unauthorized' },
        { status: 404 }
      )
    }

    return Response.json({ success: true })
  } catch (err) {
    return Response.json({ message: err.message }, { status: 500 })
  }
}
