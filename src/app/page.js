'use client'
import { useState } from 'react'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import MonthlyBarChart from '@/components/MonthlyBarChart'

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [editing, setEditing] = useState(null)

  const handleSave = () => {
    setRefreshFlag((prev) => prev + 1)
    setEditing(null)
  }

  const handleEdit = (tx) => {
    setEditing(tx)
  }

  return (
    <main className="p-6 max-w-7xl mx-auto">
      <h1 className="py-2 text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-50 bg-blue-50 dark:bg-blue-950 sticky top-0">
        PERSONAL FINANCE TRACKER
      </h1>

      <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-6">
        {/* Left: Form + List */}
        <div className="space-y-4">
          <div className="p-4 rounded-xl shadow">
            <TransactionForm onSave={handleSave} editing={editing} />
          </div>
          <div className="p-4 rounded-xl shadow max-h-[calc(100vh-300px)] overflow-y-auto">
            <TransactionList onEdit={handleEdit} refreshFlag={refreshFlag} />
          </div>
        </div>

        {/* Right: Sticky Chart */}
        <div className="p-4 rounded-xl shadow h-fit lg:sticky top-20">
          <MonthlyBarChart refreshFlag={refreshFlag} />
        </div>
      </div>
    </main>
  )
}
