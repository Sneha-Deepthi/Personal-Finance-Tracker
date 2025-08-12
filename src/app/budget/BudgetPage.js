'use client'

import { useState } from 'react'
import BudgetList from './BudgetList'
import BudgetVsActualChart from './BudgetVsActualChart'
import BudgetForm from './BudgetForm'
import SpendingInsights from './SpendingInsights'
import { Card, CardContent } from '@/components/ui/card'

export default function BudgetPage() {
  const [refreshFlag, setRefreshFlag] = useState(0)
  const [editingBudget, setEditingBudget] = useState(null)

  const handleRefresh = () => {
    setRefreshFlag((prev) => prev + 1)
    setEditingBudget(null)
  }

  return (
    <div className="space-y-8 px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Budget Planner</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1 space-y-6">
          <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
            <CardContent className="p-4">
              <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">
                {editingBudget ? 'Edit Budget' : 'Add New Budget'}
              </h2>
              <BudgetForm
                onSaved={handleRefresh}
                initialData={editingBudget}
              />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
            <CardContent className="p-4">
              <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">Your Budgets</h2>
              <BudgetList
                refreshFlag={refreshFlag}
                onEdit={setEditingBudget}
                onChange={handleRefresh}
              />
            </CardContent>
          </Card>
        </div>

        <div className="flex-1 space-y-6">
          <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
            <CardContent className="p-4">
              <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">Spending Insights</h2>
              <SpendingInsights
                refreshFlag={refreshFlag}
                onChange={handleRefresh}
              />
            </CardContent>
          </Card>

          <Card className="bg-white dark:bg-gray-900 text-black dark:text-white shadow rounded-xl">
            <CardContent className="p-4">
              <h2 className="font-bold text-2xl dark:text-cyan-400 py-1">Budget vs Actual</h2>
              <BudgetVsActualChart refreshFlag={refreshFlag} />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
