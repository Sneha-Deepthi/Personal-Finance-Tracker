'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default function UnAuthenticated() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-gray-900 dark:to-gray-800 px-4">
      <div className="max-w-4xl text-center space-y-8">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
          You are not logged in
        </h1>
        <p className="text-lg sm:text-xl text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
          Please log in to access this page.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
          <Link href="/login">
            <Button className="px-6 py-3 text-lg font-medium">
              Go to Login
            </Button>
          </Link>
          <Link href="/">
            <Button
              variant="outline"
              className="px-6 py-3 text-lg font-medium"
            >
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    </main>
  )
}
