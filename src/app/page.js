'use client'
import { useState } from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs'
import TransactionForm from '@/components/TransactionForm'
import TransactionList from '@/components/TransactionList'
import MonthlyBarChart from '@/components/MonthlyBarChart'
import CategoryPieChart from '@/components/CategoryPieChart'
import Dashboard from '@/components/Dashboard'

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

  const toggleRefresh = () => setRefreshFlag((prev) => !prev)

  return (
    <main className="px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      {/* Responsive Header */}
      <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 text-blue-700 dark:text-blue-50 bg-blue-50 dark:bg-black sticky top-0 z-10 py-2">
        PERSONAL FINANCE TRACKER
      </h1>

      {/* Dashboard Summary */}
      <div className="mb-6">
        <Dashboard refreshFlag={refreshFlag} />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="add" className="w-full">
        {/* Responsive Tabs List */}
        <div className="overflow-x-auto">
          <TabsList className="px-1 py-1.5 h-fit min-w-[400px] sm:min-w-0 grid grid-cols-2 sm:grid-cols-4 gap-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg">
            <TabsTrigger 
              value="add" 
              className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 font-medium transition-colors duration-200"
            >
              Add Transaction
            </TabsTrigger>
            <TabsTrigger 
              value="transactions" 
              className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 font-medium transition-colors duration-200"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="barchart" 
              className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 font-medium transition-colors duration-200"
            >
              Monthly Bar Chart
            </TabsTrigger>
            <TabsTrigger 
              value="piechart" 
              className="whitespace-nowrap text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 data-[state=active]:bg-blue-100 dark:data-[state=active]:bg-blue-900 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-200 font-medium transition-colors duration-200"
            >
              Category Pie Chart
            </TabsTrigger>
          </TabsList>
        </div>

        {/* Tab: Add Transaction */}
        <TabsContent value="add" className="space-y-4 mt-4">
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <TransactionForm onSave={handleSave} editing={editing} />
          </div>
        </TabsContent>

        {/* Tab: Transactions */}
        <TabsContent value="transactions" className="mt-4">
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900 max-h-[60vh] overflow-y-auto">
            <TransactionList
              onEdit={handleEdit}
              refreshFlag={refreshFlag}
              onRefresh={toggleRefresh}
            />
          </div>
        </TabsContent>

        {/* Tab: Monthly Bar Chart */}
        <TabsContent value="barchart" className="mt-4">
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <MonthlyBarChart refreshFlag={refreshFlag} />
          </div>
        </TabsContent>

        {/* Tab: Category Pie Chart */}
        <TabsContent value="piechart" className="mt-4">
          <div className="p-4 rounded-xl shadow bg-white dark:bg-gray-900">
            <CategoryPieChart refreshFlag={refreshFlag} />
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}