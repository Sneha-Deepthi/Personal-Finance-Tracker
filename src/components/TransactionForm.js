'use client'
import { useState, useEffect } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Card } from '@/components/ui/card'

export default function TransactionForm({ onSave, editing }) {
  const [amount, setAmount] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')

  useEffect(() => {
    if (editing) {
      setAmount(editing.amount)
      setDescription(editing.description)
      setDate(editing.date.slice(0, 10))
    }
  }, [editing])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!amount || !description || !date) {
      alert('All fields are required!')
      return
    }

    const data = {
      amount: parseFloat(amount),
      description,
      date,
    }

    if (editing) {
      await fetch(`/api/transactions/${editing._id}`, {
        method: 'PUT',
        body: JSON.stringify(data),
      })
    } else {
      await fetch('/api/transactions', {
        method: 'POST',
        body: JSON.stringify(data),
      })
    }

    onSave()
    setAmount('')
    setDescription('')
    setDate('')
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
        <Button type="submit" className="w-full">
          {editing ? 'Update Transaction' : 'Add Transaction'}
        </Button>
      </form>
    </Card>
  )
}
