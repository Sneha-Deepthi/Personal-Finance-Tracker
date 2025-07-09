import mongoose from 'mongoose'
import { categories } from '@/lib/categories'

const TransactionSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    category: {
      type: String,
      enum: categories, // ✅ Restrict to predefined list
      required: true,
    },
  },
  {
    timestamps: true, // adds createdAt, updatedAt
  }
)

export default mongoose.models.Transaction ||
  mongoose.model('Transaction', TransactionSchema)
