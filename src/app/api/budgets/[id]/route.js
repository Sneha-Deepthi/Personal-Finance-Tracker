import { connectDB } from '@/lib/mongo'
import Budget from '@/models/Budget'

export async function PUT(req, { params }) {
  await connectDB()
  const { category, amount, month } = await req.json()

  const updated = await Budget.findByIdAndUpdate(params.id, {
    category,
    amount,
    month,
  }, { new: true })

  return Response.json(updated)
}

export async function DELETE(req, { params }) {
  await connectDB()
  await Budget.findByIdAndDelete(params.id)
  return Response.json({ success: true })
}
