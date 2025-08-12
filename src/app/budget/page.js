'use client'

import { useEffect, useState } from 'react'
import BudgetPage from './BudgetPage'

export default function BudgetPageWrapper() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch('/api/auth/user', {
        credentials: 'include', // send cookies
      })

      if (res.ok) {
        const data = await res.json()
        setEmail(data.email)
      }

      setLoading(false)
    }

    fetchUser()
  }, [])

  if (loading) return <p className="p-4">Loading...</p>

  return (
    <div className="space-y-8 px-4 sm:px-6 py-6 max-w-7xl mx-auto">
      <p className="text-sm text-gray-500 dark:text-gray-300">
        Logged in as: <span className="font-medium">{email}</span>
      </p>

      {/* BudgetPage will fetch data using cookies on the server */}
      <BudgetPage />
    </div>
  )
}
