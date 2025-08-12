'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { categories } from '@/lib/categories'

export default function BudgetForm({ onSaved, initialData }) {
  const [category, setCategory] = useState('')
  const [amount, setAmount] = useState('')
  const [month, setMonth] = useState(() => new Date().toISOString().slice(0, 7))

  useEffect(() => {
    if (initialData) {
      setCategory(initialData.category)
      setAmount(initialData.amount.toString())
      setMonth(initialData.month)
    }
  }, [initialData])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const method = initialData ? 'PUT' : 'POST'
    const url = initialData ? `/api/budgets/${initialData._id}` : `/api/budgets`

    await fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        category,
        amount: parseFloat(amount),
        month,
      }),
    })

    setCategory('')
    setAmount('')
    setMonth(new Date().toISOString().slice(0, 7))
    onSaved?.()
  }

  return (
    <Card className="p-6 space-y-4 bg-white dark:bg-gray-700 text-black dark:text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="py-2 dark:text-white text-md">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-full dark:bg-gray-600 dark:text-white">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700 dark:text-white">
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label className="py-2 dark:text-white text-md">Budget Amount (₹)</Label>
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            min="0"
            required
            placeholder="Enter amount"
            className="dark:bg-gray-600 dark:text-white"
          />
        </div>

        <div>
          <Label className="py-2 dark:text-white text-md">Budget Month</Label>
          <Input
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            type="month"
            required
            className="dark:bg-gray-600 dark:text-white"
          />
        </div>

        <Button type="submit" className="w-full dark:text-black dark:bg-white">
          {initialData ? 'Update Budget' : 'Save Budget'}
        </Button>
      </form>
    </Card>
  )
}
