'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
        credentials: 'include',
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.message || 'Login failed')
        return
      }

      window.location.href = '/homepage';

    } catch (err) {
      console.error('Login error:', err)
      setError('Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-200 to-blue-300 dark:from-gray-900 dark:to-gray-800 px-4">
      <Card className="w-full max-w-md p-6 space-y-4 bg-white dark:bg-gray-700 text-black dark:text-white shadow-lg">
        <h2 className="font-bold text-2xl dark:text-cyan-400 text-center">Login</h2>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label htmlFor="email" className="dark:text-white py-1">
              Registered Email
            </Label>
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
            <Label htmlFor="password" className="dark:text-white py-1">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
              className="dark:text-white dark:placeholder-gray-100"
              placeholder="Enter your password"
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
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>
          <div className="text-center text-sm text-gray-600 dark:text-gray-300">
            Don&apos;t have an account?{' '}
            <Link
              href="/register"
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
