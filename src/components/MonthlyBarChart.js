'use client'

import { useEffect, useState } from 'react'
import { Card } from '@/components/ui/card'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'

export default function MonthlyBarChart({ refreshFlag }) {
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('/api/transactions')
      const transactions = await res.json()

      const monthlyTotals = {}
      transactions.forEach((tx) => {
        const date = new Date(tx.date)
        const key = new Intl.DateTimeFormat('en-US', {
          month: 'short',
          year: 'numeric',
        }).format(date)
        monthlyTotals[key] = (monthlyTotals[key] || 0) + tx.amount
      })

      const chartData = Object.keys(monthlyTotals)
        .sort((a, b) => new Date(a) - new Date(b))
        .map((month) => ({
          month,
          amount: monthlyTotals[month],
        }))

      setData(chartData)
    }

    fetchData()
  }, [refreshFlag])

  return (
    <Card className="p-4 bg-white dark:bg-gray-700 text-black dark:text-white">
      <h2 className="text-xl font-semibold mb-4">Monthly Expenses</h2>
      {data.length === 0 ? (
        <p className="text-gray-500 dark:text-gray-200">Loading chart...</p>
      ) : (
        <ResponsiveContainer width="90%" height={300}>
          <BarChart data={data}>
            <XAxis dataKey="month" stroke="currentColor" />
            <YAxis stroke="currentColor" tickFormatter={(v) => `₹${v}`} />
            <Tooltip
              contentStyle={{
                backgroundColor: 'white',
                color: 'black',
                borderColor: '#ccc',
              }}
              wrapperStyle={{
                backgroundColor: 'white',
              }}
            />
            <Bar dataKey="amount" fill="#3b82f6" barSize={30}/>
          </BarChart>
        </ResponsiveContainer>
      )}
    </Card>
  )
}
