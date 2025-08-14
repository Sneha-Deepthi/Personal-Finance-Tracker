'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { categories } from '@/lib/categories'

export default function Dashboard({ refreshFlag }) {
  const [transactions, setTransactions] = useState([])
  const [email, setEmail] = useState('')
  const router = useRouter()

  useEffect(() => {
    const fetchData = async () => {
      try {
        // First get the user info from the cookie-auth endpoint
        const userRes = await fetch('/api/auth/user', {
          credentials: 'include',
        })

        if (!userRes.ok) {
          router.push('/unAuthenticated')
          return
        }

        const userData = await userRes.json()
        if (!userData?.userId) {
          router.push('/unAuthenticated')
          return
        }

        setEmail(userData.email)

        // Fetch transactions for this user
        const txRes = await fetch(`/api/transactions`, {
          credentials: 'include',
        })

        if (!txRes.ok) {
          console.error('Failed to fetch transactions')
          return
        }

        const data = await txRes.json()
        const sorted = data.sort((a, b) => new Date(b.date) - new Date(a.date))
        setTransactions(sorted)
      } catch (err) {
        console.error('Error fetching dashboard data:', err)
      }
    }

    fetchData()
  }, [refreshFlag, router])

  const total = transactions.reduce((sum, tx) => sum + tx.amount, 0)

  const categoryTotals = {}
  transactions.forEach((tx) => {
    if (!tx.category) return
    categoryTotals[tx.category] =
      (categoryTotals[tx.category] || 0) + tx.amount
  })

  const recentTx = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {/* Total */}
        <Card className="p-4 bg-white dark:bg-gray-700 text-black dark:text-white">
          <h3 className="font-bold text-2xl dark:text-cyan-400">Total Expenses</h3>
          <p className="text-2xl font-bold mt-2">₹{total.toFixed(2)}</p>
        </Card>

        {/* Categories */}
        <Card className="p-4 bg-white dark:bg-gray-700 text-black dark:text-white">
          <h3 className="font-bold text-2xl dark:text-cyan-400">Category Breakdown</h3>
          <ul className="mt-2 space-y-1">
            {categories.map((cat) => (
              <li key={cat} className="flex justify-between">
                <span>{cat}</span>
                <span>₹{(categoryTotals[cat] || 0).toFixed(2)}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Recent Transactions */}
        <Card className="p-4 bg-white dark:bg-gray-700 text-black dark:text-white">
          <h3 className="font-bold text-2xl dark:text-cyan-400">Recent Transactions</h3>
          {recentTx.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-300">No recent transactions</p>
          ) : (
            <ul className="space-y-3">
              {recentTx.map((tx) => (
                <li
                  key={tx._id}
                  className="flex justify-between items-center border-b pb-2 last:border-none"
                >
                  <div>
                    <p className="font-medium">₹{tx.amount}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {tx.description}
                    </p>
                  </div>
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-gray-800 border border-white dark:border-white text-blue-700 dark:text-blue-50 rounded-full">
                    {tx.category || 'Uncategorized'}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
    </div>
  )
}
