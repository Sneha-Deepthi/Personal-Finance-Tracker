import { connectDB } from '@/lib/mongo'
import Transaction from '@/models/Transaction'

export async function GET() {
  await connectDB()
  const transactions = await Transaction.find().sort({ date: -1 })
  return Response.json(transactions)
}

export async function POST(req) {
  await connectDB()
  const data = await req.json()
  const newTransaction = await Transaction.create(data)
  return Response.json(newTransaction)
}
