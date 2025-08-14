'use client'

import { useState, useEffect } from 'react'
import Dashboard from '@/components/Dashboard'
import TransactionForm from '@/app/transactions/TransactionForm'
import CategoryPieChart from '@/components/CategoryPieChart'

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [loading, setLoading] = useState(true)
  const [email, setEmail]=useState('')

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/user', {
        credentials: 'include', // send cookies
      })
      if(res.ok){
        const data=await res.json()
        setEmail(data.email)
      }
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
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Logged in as: <span className="font-medium">{email}</span>
      </p>
      <section>
        <Dashboard refreshFlag={refreshFlag}/>
      </section>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <section>
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">
              Add New Transaction
            </h2>
            <TransactionForm onSave={handleSave}/>
          </div>
        </section>

        <section>
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <h3 className="font-bold text-2xl dark:text-cyan-400 py-1">
              Expenses by Category
            </h3>
            <CategoryPieChart refreshFlag={refreshFlag}/>
          </div>
        </section>
      </div>
    </main>
  )
}
