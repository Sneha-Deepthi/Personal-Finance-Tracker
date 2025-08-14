'use client'

import { useEffect,useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import MonthlyBarChart from './MonthlyBarChart'

export default function TransactionsPage() {
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [editing, setEditing] = useState(null)
  const [email, setEmail] = useState('')

  const handleSaved = () => {
    setRefreshFlag((prev) => prev + 1)
    setEditing(null)
  }

  const handleEdit = (transaction) => {
    setEditing(transaction)
  }
  useEffect(() => {
    const fetchEmail = async () => {
      const res = await fetch('/api/auth/user', {
        credentials: 'include',
      })
      if (res.ok) {
        const data = await res.json()
        setEmail(data.email)
      }
    }

    fetchEmail()
  }, [])

  return (
    <div className="space-y-8 px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Logged in as: <span className="font-medium">{email}</span>
      </p>
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Transactions</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
          <CardContent className="p-4">
            <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">
              {editing ? 'Edit Transaction' : 'Add New Transaction'}
            </h2>
            <TransactionForm
              onSave={handleSaved}
              editing={editing}
              className="mt-2"
            />
          </CardContent>
        </Card>

        <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
          <CardContent className="p-4">
            <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">All Transactions</h2>
            <TransactionList
              onEdit={handleEdit}
              refreshFlag={refreshFlag}
              onRefresh={handleSaved}
            />
          </CardContent>
        </Card>
      </div>

      <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
        <CardContent className="p-4">
          <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">Monthly Expenses</h2>
          <MonthlyBarChart refreshFlag={refreshFlag} />
        </CardContent>
      </Card>
    </div>
  )
}
