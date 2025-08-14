'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import TransactionForm from '../TransactionForm'

export default function AllTransactionsPage() {
  const [transactions, setTransactions] = useState([])
  const [editing, setEditing] = useState(null)

  const fetchTransactions = async () => {
    try {
      const res = await fetch(`/api/transactions`, { credentials: 'include' })
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json()
      const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
      setTransactions(sorted)
    } catch (err) {
      console.error(err)
    }
  }

  const handleDelete = async (id) => {
    if (!id) {
      alert('Invalid transaction ID.')
      return
    }

    if (!confirm('Are you sure you want to delete this transaction?')) return

    const res = await fetch(`/api/transactions/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    })

    if (res.ok) {
      fetchTransactions()
    } else {
      const err = await res.json()
      alert(err.message || 'Error deleting transaction')
    }
  }

  const handleEdit = (tx) => setEditing(tx)

  const handleSaved = () => {
    setEditing(null)
    fetchTransactions()
  }

  useEffect(() => {
    fetchTransactions()
  }, [])

  return (
    <div className="space-y-8 px-4 md:px-8 py-6">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">All Transactions</h1>

      <Button variant="outline" className="mb-4" onClick={() => history.back()}>
        ← Back
      </Button>

      {editing && (
        <Card className="p-4 mb-6">
          <h2 className="text-xl font-semibold mb-2">Edit Transaction</h2>
          <TransactionForm editing={editing} onSave={handleSaved} />
        </Card>
      )}

      {transactions.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No transactions available.</p>
      ) : (
        <div className="space-y-4">
          {transactions.map((tx) => (
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
                <Button variant="outline" size="sm" onClick={() => handleEdit(tx)}>
                  Edit
                </Button>
                <Button variant="destructive" size="sm" onClick={() => handleDelete(tx._id)}>
                  Delete
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
