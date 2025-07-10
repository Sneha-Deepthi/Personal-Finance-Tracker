'use client'

import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'
import { Select } from '@/components/ui/select'
import { categories } from '@/lib/categories' // <-- Define or import category list

export default function TransactionForm({ onSave, editing }) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [category, setCategory] = useState('')

  useEffect(() => {
    if (editing) {
      setAmount(editing.amount)
      setDescription(editing.description)
      setDate(editing.date.slice(0, 10))
      setCategory(editing.category || '')
    }
  }, [editing])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!amount || !description || !date || !category) {
      alert('All fields are required!')
      return
    }

    const data = {
      amount: parseFloat(amount),
      description,
      date,
      category,
    }

    const method = editing ? 'PUT' : 'POST'
    const endpoint = editing ? `/api/transactions/${editing._id}` : '/api/transactions'

    await fetch(endpoint, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })

    onSave()
    setAmount('')
    setDescription('')
    setDate('')
    setCategory('')
  }

  return (
    <Card className="p-6 space-y-4 bg-white dark:bg-gray-700 text-black dark:text-white">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label className="py-2 dark:text-white text-md">Amount (₹)</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="dark:text-white dark:placeholder-gray-100"
          />
        </div>
        <div>
          <Label className="py-2 dark:text-white text-md">Description</Label>
          <Input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            className="dark:text-white dark:placeholder-gray-100"
          />
        </div>
        <div>
          <Label className="py-2 dark:text-white text-md">Date</Label>
          <Input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="dark:text-white dark:placeholder-gray-100"
          />
        </div>
        <div>
          <Label className="py-2 dark:text-white text-md">Category</Label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded p-2 dark:bg-gray-600 dark:text-white"
          >
            <option value="">Select category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit" className="w-full dark:text-black dark:bg-white dark:hover:bg-white">
          {editing ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </form>
    </Card>
  )
}
