'use client'

import { useState } from 'react'
import Dashboard from '@/components/Dashboard'
import TransactionForm from '@/app/transactions/TransactionForm'
import CategoryPieChart from '@/components/CategoryPieChart'

export default function Home() {
  const [refreshFlag, setRefreshFlag] = useState(0)

  const handleSave = () => {
    setRefreshFlag((prev) => prev + 1)
    alert("New transaction has been added");
  }


  return (
    <main className="px-4 sm:px-6 py-6 max-w-7xl mx-auto space-y-8">
      {/* Dashboard Summary */}
      <section>
        <Dashboard refreshFlag={refreshFlag} />
      </section>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        {/* Transaction Form */}
        <section>
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <h2 className="font-bold text-2xl dark:text-cyan-400 dark:text-shadow-lg/10 dark:text-shadow-gray-700 py-1">
              Add New Transaction
            </h2>
            <TransactionForm onSave={handleSave}/>
          </div>
        </section>

        {/* Category Pie Chart */}
        <section>
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <h3 className="font-bold text-2xl dark:text-cyan-400 dark:text-shadow-lg/10 dark:text-shadow-gray-700 py-1">Expenses by Category</h3>
            <CategoryPieChart refreshFlag={refreshFlag} />
          </div>
        </section>
      </div>
    </main>
  )
}
