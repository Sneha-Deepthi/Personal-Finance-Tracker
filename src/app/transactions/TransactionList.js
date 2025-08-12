'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export default function TransactionList({ onEdit, refreshFlag, onRefresh , userId }) {
  const [transactions, setTransactions] = useState([])
  
  const fetchTransactions = async () => {
    const res = await fetch(`/api/transactions`, { credentials: 'include' })
    const data = await res.json()
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

  const recentTx = transactions.slice(0, 3)

  return (
    <div className="p-4 space-y-4 rounded-xl bg-white dark:bg-gray-700 text-black dark:text-white border-1 dark:border-white">
      {/* <h2 className="font-bold text-2xl dark:text-cyan-400">Transaction List</h2> */}

      {recentTx.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300">No transactions to display.</p>
      ) : (
        recentTx.map((tx) => (
          <Card
            key={tx._id}
            className="p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white dark:bg-gray-700 shadow-lg dark:shadow-blue-950"
          >
            <div>
              <p className="font-medium dark:text-gray-50">{tx.description}</p>
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
              <Button variant="outline" size="sm" onClick={() => onEdit(tx)} className="bg-white text-blue-600 border-blue-300 hover:bg-blue-50 dark:border-white dark:text-white">
                Edit
              </Button>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(tx._id)} className="bg-white text-red-600 border-1 border-red-600 hover:bg-red-50 dark:border-white dark:bg-red-600 dark:text-white">
                Delete
              </Button>
            </div>
          </Card>
        ))
      )}

      {/* View More Link */}
      {transactions.length > 3 && (
        <div className="text-center pt-2">
          <Link href="/transactions/all">
            <Button variant="ghost">View More</Button>
          </Link>
        </div>
      )}
    </div>
  )
}
