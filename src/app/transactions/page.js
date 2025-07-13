'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import TransactionForm from './TransactionForm'
import TransactionList from './TransactionList'
import MonthlyBarChart from './MonthlyBarChart'

export default function TransactionsPage() {
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [editing, setEditing] = useState(null)

  const handleSaved = () => {
    setRefreshFlag((prev) => prev + 1)
    setEditing(null)
  }

  const handleEdit = (transaction) => {
    setEditing(transaction)
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Transactions
      </h1>

      {/* Form + List Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Form Card */}
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

        {/* Transaction List */}
        <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
          <CardContent className="p-4">
            <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">
              All Transactions
            </h2>
            <TransactionList
              onEdit={handleEdit}
              refreshFlag={refreshFlag}
              onRefresh={handleSaved}
            />
          </CardContent>
        </Card>
      </div>

      {/* Full-width Chart at Bottom */}
      <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
        <CardContent className="p-4">
          <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">
            Monthly Expenses
          </h2>
          <MonthlyBarChart refreshFlag={refreshFlag} />
        </CardContent>
      </Card>
    </div>
  )
}
