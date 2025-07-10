'use client'
import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TransactionList({ onEdit, refreshFlag, onRefresh }) {
  const [transactions, setTransactions] = useState([])

  const fetchTransactions = async () => {
    const res = await fetch('/api/transactions')
    const data = await res.json()
    // Sort by latest first
    const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
    setTransactions(sorted)
  }

  const handleDelete = async (id) => {
    await fetch(`/api/transactions/${id}`, { method: 'DELETE' })
    fetchTransactions()
    onRefresh()
  }

  useEffect(() => {
    fetchTransactions()
  }, [refreshFlag])

  return (
    <div className="p-4 space-y-4 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white border-1 dark:border-white">
      <h2 className="font-bold text-2xl dark:text-cyan-400 dark:text-shadow-lg/10 dark:text-shadow-gray-700">Transaction list</h2>
      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No transactions to display.</p>
      ) : (
        transactions.map((tx) => (
          <Card
            key={tx._id}
            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-700 text-black dark:text-white shadow-lg dark:shadow-blue-950"
          >
            <div>
              <p className="font-medium">{tx.description}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                ₹{tx.amount} on {new Date(tx.date).toLocaleDateString()}
              </p>
              {tx.category && (
                <p className="text-xs mt-1 text-blue-600 dark:text-blue-300">
                  Category: {tx.category}
                </p>
              )}
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
        ))
      )}
    </div>
  )
}
