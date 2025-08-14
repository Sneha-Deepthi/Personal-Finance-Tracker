'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

import Dashboard from '@/components/Dashboard'
import TransactionForm from '@/app/transactions/TransactionForm'
import CategoryPieChart from '@/components/CategoryPieChart'

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [userId, setUserId] = useState(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/user', {
        credentials: 'include', // send cookies
      })

      setLoading(false)
    }

    fetchUser()
  }, [])

  const handleSave = () => {
    setRefreshFlag((prev) => prev + 1)
    alert('New transaction has been added')
  }

  if (loading) return <p className="text-center mt-10">Loading...</p>

  return (
    <main className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-8">
      <section>
        <Dashboard refreshFlag={refreshFlag} userId={userId} />
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">
              Add New Transaction
            </h2>
            <TransactionForm onSave={handleSave} userId={userId} />
          </div>
        </section>

        <section>
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <h3 className="font-bold text-2xl dark:text-cyan-400 py-1">
              Expenses by Category
            </h3>
            <CategoryPieChart refreshFlag={refreshFlag} userId={userId} />
          </div>
        </section>
      </div>
    </main>
  )
}
