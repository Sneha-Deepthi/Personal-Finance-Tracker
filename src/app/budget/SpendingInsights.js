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

const monthNames = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
]

const getMonthLabel = (ym) => {
  const [year, month] = ym.split('-')
  return `${monthNames[parseInt(month) - 1]} ${year}`
}

export default function SpendingInsights({ refreshFlag }) {
  const [insights, setInsights] = useState([])
  const [allBudgets, setAllBudgets] = useState([])
  const [allTransactions, setAllTransactions] = useState([])
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7))

  useEffect(() => {
    const loadData = async () => {
      try {
        const [txRes, budgetRes] = await Promise.all([
          fetch('/api/transactions', { credentials: 'include' }),
          fetch('/api/budgets', { credentials: 'include' }),
        ])

        if (!txRes.ok) {
          console.error('Transaction API error:', await txRes.text())
          return
        }
        if (!budgetRes.ok) {
          console.error('Budget API error:', await budgetRes.text())
          return
        }

        const txs = await txRes.json()
        const budgets = await budgetRes.json()

        setAllTransactions(Array.isArray(txs) ? txs : [])
        setAllBudgets(Array.isArray(budgets) ? budgets : [])
      } catch (error) {
        console.error('Error loading data in SpendingInsights:', error)
      }
    }

    loadData()
  }, [refreshFlag])

  useEffect(() => {
    const filteredBudgets = selectedMonth === '__all__'
      ? allBudgets
      : allBudgets.filter((b) => b.month === selectedMonth)

    const actual = {}
    allTransactions
      .filter((tx) => {
        const txMonth = tx.date?.slice(0, 7)
        return selectedMonth === '__all__' || txMonth === selectedMonth
      })
      .forEach((tx) => {
        const cat = tx.category || 'Uncategorized'
        actual[cat] = (actual[cat] || 0) + tx.amount
      })

    const list = filteredBudgets.map((b) => {
      const spent = actual[b.category] || 0
      const diff = b.amount - spent
      return diff < 0
        ? `⚠️ Over budget in ${b.category} by ₹${-diff}`
        : `✅ ${b.category} budget safe: ₹${diff} left`
    })

    setInsights(list)
  }, [selectedMonth, allBudgets, allTransactions])

  const uniqueMonths = [...new Set(allBudgets.map((b) => b.month))].sort().reverse()

  return (
    <Card className="p-4 space-y-4 bg-white dark:bg-gray-700 text-black dark:text-white">
      <div className="w-full sm:w-1/2">
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

      <ul className="list-disc list-inside text-sm text-gray-700 dark:text-gray-300">
        {insights.length === 0 ? (
          <li>No insights available for the selected month.</li>
        ) : (
          insights.map((text, idx) => <li key={idx}>{text}</li>)
        )}
      </ul>
    </Card>
  )
}
