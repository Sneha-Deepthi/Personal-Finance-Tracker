'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TransactionList({ onEdit, refreshFlag }) {
  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions')
    const data = await res.json()
    setTransactions(data)
  }

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
    fetchTransactions()
  }

  useEffect(() => {
    fetchTransactions()
  }, [refreshFlag])

  return (
    <div className="space-y-4">
      {transactions.map((tx) => (
        <Card
          key={tx._id}
          className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-700 text-black dark:text-white"
        >
          <div>
            <p className="font-medium">{tx.description}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              ₹{tx.amount} on {new Date(tx.date).toLocaleDateString()}
            </p>
          </div>
          <div className="flex mt-2 sm:mt-0 sm:flex-row space-x-2">
            <Button variant="outline" size="sm" onClick={() => onEdit(tx)}>
              Edit
            </Button>
            <Button variant="destructive" size="sm" onClick={() => handleDelete(tx._id)}>
              Delete
            </Button>
          </div>
        </Card>
      ))}
    </div>
  )
}
