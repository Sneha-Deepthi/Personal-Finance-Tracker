'use client'

import { useEffect, useState } from 'react'
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select'

import { categories } from '@/lib/categories'

const CATEGORY_COLORS = {
  Food: '#f87171',
  Transport: '#60a5fa',
  Health: '#34d399',
  Shopping: '#fbbf24',
  Utilities: '#a78bfa',
  Entertainment: '#f472b6',
}

const MONTHS = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
]

export default function CategoryPieChart({ refreshFlag }) {
  const [transactions, setTransactions] = useState([])
  const [data, setData] = useState([])
  const [selectedMonth, setSelectedMonth] = useState('')
  const [selectedYear, setSelectedYear] = useState('')
  const [availableYears, setAvailableYears] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch transactions with cookies
        const res = await fetch(`/api/transactions`, { credentials: 'include' })
        if (!res.ok) {
          console.error('Failed to fetch transactions:', res.status, await res.text())
          setLoading(false)
          return
        }

        const txs = await res.json()

        if (!Array.isArray(txs)) {
          console.error('Expected array but got:', txs)
          setLoading(false)
          return
        }

        setTransactions(txs)

        // ✅ Extract unique years for filter
        const years = [...new Set(txs.map((tx) => new Date(tx.date).getFullYear()))]
        setAvailableYears(years.sort((a, b) => b - a))

        // ✅ Default to current month/year
        const today = new Date()
        setSelectedMonth(String(today.getMonth()))
        setSelectedYear(String(today.getFullYear()))
      } catch (err) {
        console.error('Failed to fetch transactions:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [refreshFlag])

  useEffect(() => {
    if (!Array.isArray(transactions)) return

    const filtered = transactions.filter((tx) => {
      const date = new Date(tx.date)
      const matchMonth = selectedMonth === '' || date.getMonth().toString() === selectedMonth
      const matchYear = selectedYear === '' || date.getFullYear().toString() === selectedYear
      return matchMonth && matchYear
    })

    const totals = {}
    filtered.forEach((tx) => {
      if (!tx.category) return
      totals[tx.category] = (totals[tx.category] || 0) + tx.amount
    })

    const chartData = Object.entries(totals).map(([category, amount]) => ({
      category,
      amount,
    }))

    setData(chartData)
  }, [transactions, selectedMonth, selectedYear])

  if (loading) {
    return (
      <Card className="p-4 bg-white dark:bg-gray-700 text-black dark:text-white w-full max-w-full">
        <p className="text-center">Loading chart...</p>
      </Card>
    )
  }

  return (
    <Card className="p-4 bg-white dark:bg-gray-700 text-black dark:text-white w-full max-w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-3">
        <div className="flex flex-wrap gap-2">
          <Select onValueChange={(val) => setSelectedMonth(val)} value={selectedMonth}>
            <SelectTrigger className="w-[100px] sm:w-[120px] peer">
              <SelectValue placeholder="Month" />
            </SelectTrigger>
            <SelectContent>
              {MONTHS.map((label, index) => (
                <SelectItem key={index} value={index.toString()}>
                  {label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select onValueChange={(val) => setSelectedYear(val)} value={selectedYear}>
            <SelectTrigger className="w-[100px] sm:w-[120px] peer">
              <SelectValue placeholder="Year" />
            </SelectTrigger>
            <SelectContent>
              {availableYears.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-300 text-center">No data available</p>
      ) : (
        <div className="w-full h-[250px] sm:h-[300px] md:h-[350px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                dataKey="amount"
                nameKey="category"
                outerRadius="80%"
                innerRadius="50%"
                label={({ category }) => category}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={CATEGORY_COLORS[entry.category] || '#ccc'}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => `₹${value.toFixed(2)}`}
                contentStyle={{
                  backgroundColor: 'white',
                  color: 'black',
                  borderColor: '#ccc',
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      )}
    </Card>
  )
}
