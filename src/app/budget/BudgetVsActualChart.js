'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer,
} from 'recharts'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
]

const getMonthLabel = (ym) => {
  const [year, month] = ym.split('-')
  return `${monthNames[parseInt(month) - 1]} ${year}`
}

export default function BudgetVsActualChart({ refreshFlag }) {
  const [chartData, setChartData] = useState([])
  const [filteredData, setFilteredData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('__all__')
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  useEffect(() => {
    const loadData = async () => {
      try {
        const [txRes, budgetRes] = await Promise.all([
          fetch(`/api/transactions`),
          fetch(`/api/budgets`),
        ])

        if (!txRes.ok || !budgetRes.ok) {
          console.error('Failed to fetch transactions or budgets')
          return
        }

        const transactions = await txRes.json()
        const budgets = await budgetRes.json()

        const actualByCatMonth = {}
        transactions.forEach((tx) => {
          const cat = tx.category || 'Uncategorized'
          const month = tx.date?.slice(0, 7)
          const key = `${cat}-${month}`
          actualByCatMonth[key] = (actualByCatMonth[key] || 0) + tx.amount
        })

        const combined = budgets.map((b) => {
          const key = `${b.category}-${b.month}`
          return {
            category: b.category,
            month: b.month,
            Budget: b.amount,
            Spent: actualByCatMonth[key] || 0,
          }
        })

        setChartData(combined)
        setFilteredData(combined)
      } catch (error) {
        console.error('Error loading data:', error)
      }
    }

    loadData()
  }, [refreshFlag])

  useEffect(() => {
    let filtered = chartData
    if (selectedCategory !== '__all__') {
      filtered = filtered.filter((item) => item.category === selectedCategory)
    }
    if (selectedMonth !== '__all__') {
      filtered = filtered.filter((item) => item.month === selectedMonth)
    }
    setFilteredData(filtered)
  }, [selectedCategory, selectedMonth, chartData])

  const uniqueCategories = [...new Set(chartData.map((d) => d.category))]
  const uniqueMonths = [...new Set(chartData.map((d) => d.month))].sort().reverse()

  return (
    <Card className="p-4 space-y-4 bg-white dark:bg-gray-700 text-black dark:text-white">
      <div className="flex flex-wrap gap-4">
        <div className="w-full sm:w-1/3">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full dark:bg-gray-600">
              <SelectValue placeholder="Filter by Category" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700">
              <SelectItem value="__all__">All Categories</SelectItem>
              {uniqueCategories.map((cat) => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:w-1/3">
          <Select value={selectedMonth} onValueChange={setSelectedMonth}>
            <SelectTrigger className="w-full dark:bg-gray-600">
              <SelectValue placeholder="Filter by Month" />
            </SelectTrigger>
            <SelectContent className="dark:bg-gray-700">
              <SelectItem value="__all__">All Months</SelectItem>
              {uniqueMonths.map((m) => (
                <SelectItem key={m} value={m}>{getMonthLabel(m)}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={filteredData}>
          <XAxis dataKey="category" stroke="currentColor" />
          <YAxis stroke="currentColor" />
          <Tooltip />
          <Legend />
          <Bar dataKey="Budget" fill="#4ade80" />
          <Bar dataKey="Spent" fill="#f87171" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}
