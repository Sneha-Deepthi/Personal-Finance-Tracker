import { connectDB } from '@/lib/mongo'
import Budget from '@/models/Budget'

export async function GET() {
  await connectDB()
  const budgets = await Budget.find().sort({ createdAt: -1 })
  return Response.json(budgets)
}

export async function POST(req) {
  await connectDB()
  const { category, amount, month } = await req.json()

  const newBudget = await Budget.create({ category, amount, month })
  return Response.json(newBudget)
}
