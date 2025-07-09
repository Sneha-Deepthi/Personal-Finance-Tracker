import { connectDB } from '@/lib/mongo'
import Transaction from '@/models/Transaction'

export async function PUT(req, { params }) {
  await connectDB()
  const data = await req.json()
  const updated = await Transaction.findByIdAndUpdate(params.id, data, { new: true })
  return Response.json(updated)
}

export async function DELETE(req, { params }) {
  await connectDB()
  await Transaction.findByIdAndDelete(params.id)
  return Response.json({ success: true })
}
