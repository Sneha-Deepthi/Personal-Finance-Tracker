'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function RegisterPage() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    setLoading(true)

    try {
      const res = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Registration failed')
        return
      }

      router.push('/login')
    } catch (err) {
      console.error('Register error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-gray-900 dark:to-gray-800 px-4">
      <Card className="w-full max-w-md p-6 space-y-4 bg-white dark:bg-gray-700 text-black dark:text-white shadow-lg">
        <h2 className="font-bold text-2xl dark:text-cyan-400 text-center">Create Account</h2>

        <form onSubmit={handleRegister} className="space-y-4">
          <div>
            <Label htmlFor="name" className="dark:text-white py-1">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              disabled={loading}
              className="dark:text-white dark:placeholder-gray-100"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <Label htmlFor="email" className="dark:text-white py-1">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
              className="dark:text-white dark:placeholder-gray-100"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <Label htmlFor="password" className="dark:text-white py-1">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="dark:text-white dark:placeholder-gray-100"
              placeholder="Create a password"
            />
          </div>

          <div>
            <Label htmlFor="confirmPassword" className="dark:text-white py-1">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              disabled={loading}
              className="dark:text-white dark:placeholder-gray-100"
              placeholder="Re-enter your password"
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm font-medium -mt-2">{error}</p>
          )}

          <Button
            type="submit"
            className="w-full flex items-center justify-center gap-2 dark:text-black dark:bg-white dark:hover:bg-white"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Registering...
              </>
            ) : (
              'Register'
            )}
          </Button>
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            Already have an account?{' '}
            <Link
              href="/login"
              className="text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Register here
            </Link>
          </div>
        </form>
      </Card>
    </main>
  )
}
