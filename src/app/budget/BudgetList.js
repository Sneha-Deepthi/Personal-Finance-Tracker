'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const getMonthYear = (monthStr) => {
  const [year, month] = monthStr.split('-')
  return `${monthNames[parseInt(month) - 1]} ${year}`
}

export default function BudgetList({ refreshFlag, onEdit }) {
  const [budgets, setBudgets] = useState([])
  const [filteredBudgets, setFilteredBudgets] = useState([])
  const [filterMonth, setFilterMonth] = useState('')
  const [filterYear, setFilterYear] = useState('')

  const fetchBudgets = async () => {
    try {
      const res = await fetch('/api/budgets')
      const data = await res.json()
      setBudgets(data)
    } catch (error) {
      console.error('Failed to fetch budgets:', error)
    }
  }

  const handleDelete = async (id) => {
    try {
      await fetch(`/api/budgets/${id}`, { method: 'DELETE' })
      fetchBudgets()
    } catch (err) {
      console.error('Delete failed:', err)
    }
  }

  const filterBudgets = () => {
    const filtered = budgets.filter((b) => {
      const [year, month] = b.month.split('-')
      return (
        (!filterMonth || filterMonth === month) &&
        (!filterYear || filterYear === year)
      )
    })
    setFilteredBudgets(filtered)
  }

  useEffect(() => {
    fetchBudgets()
  }, [refreshFlag])

  useEffect(() => {
    filterBudgets()
  }, [budgets, filterMonth, filterYear])

  const yearOptions = Array.from(new Set(budgets.map((b) => b.month.split('-')[0])))
  const monthOptions = Array.from(new Set(budgets.map((b) => b.month.split('-')[1])))

  return (
    <Card className="p-4 space-y-4 bg-white dark:bg-gray-700 text-black dark:text-white">
      {/* <h2 className="text-lg font-semibold text-cyan-500 dark:text-cyan-400">Your Budgets</h2> */}

      {/* Filters */}
      <div className="flex gap-4 flex-wrap">
        <Select value={filterMonth} onValueChange={setFilterMonth}>
          <SelectTrigger className="w-full md:w-1/3 dark:bg-gray-600 dark:data-[placeholder]:text-white border border-gray-300 dark:border-gray-50 peer">
            <SelectValue placeholder="Filter by Month" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700 dark:text-white">
            {monthOptions.map((m) => (
              <SelectItem key={m} value={m}>
                {monthNames[parseInt(m) - 1]}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={filterYear} onValueChange={setFilterYear}>
          <SelectTrigger className="w-full md:w-1/3 dark:bg-gray-600 dark:data-[placeholder]:text-white border border-gray-300 dark:border-gray-50 peer">
            <SelectValue placeholder="Filter by Year" />
          </SelectTrigger>
          <SelectContent className="dark:bg-gray-700 dark:text-white">
            {yearOptions.map((y) => (
              <SelectItem key={y} value={y}>
                {y}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Budget List */}
      {filteredBudgets.length === 0 ? (
        <p className="text-gray-500">No budgets match the filter.</p>
      ) : (
        <ul className="space-y-3 text-sm">
          {filteredBudgets.map((budget) => (
            <li key={budget._id} className="border-b pb-2">
              <div className="p-2 flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <div>
                  <div className="font-medium">{budget.category}</div>
                  <div className="text-xs text-white">{getMonthYear(budget.month)}</div>
                </div>
                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mt-2 sm:mt-0">
                  <span className="text-green-600 font-semibold">₹{budget.amount}</span>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onEdit?.(budget)}
                      className="text-blue-600 border-blue-300 hover:bg-blue-50 dark:border-white dark:text-white"
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(budget._id)}
                      className="text-red-600 border-red-300 hover:bg-red-50 dark:border-white dark:bg-red-600 dark:text-white"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      )}
    </Card>
  )
}
