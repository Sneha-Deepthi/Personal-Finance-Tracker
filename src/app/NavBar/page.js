'use client'

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { label: 'Dashboard', href: '/homepage' },
  { label: 'Transactions', href: '/transactions' },
  { label: 'Budget', href: '/budget' },
]

export default function MainNav() {
  const pathname = usePathname()
  const router = useRouter()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [email, setEmail] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setIsLoggedIn(true)
          setEmail(data.email)
        } else {
          setIsLoggedIn(false)
          setEmail('')
        }
      } catch {
        setIsLoggedIn(false)
        setEmail('')
      }
    }
    fetchUser()
  }, [pathname])

  const handleLogout = async () => {
    if (confirm(`Are you sure you want to logout?\nLogged in as: ${email}`)) {
      await fetch('/api/auth/logout', {
        method: 'POST',
        credentials: 'include',
      })
      setIsLoggedIn(false)
      setEmail('')
      router.push('/login')
    }
  }

  return (
    <div>
      {/* Desktop Menu - Right aligned */}
      <div className="hidden md:flex">
        <NavigationMenu>
          <NavigationMenuList>
            {navLinks.map((item) => (
              <NavigationMenuItem key={item.href}>
                <NavigationMenuLink asChild>
                  <Link
                    href={item.href}
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === item.href && 'bg-muted text-primary'
                    )}
                  >
                    {item.label}
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem>
              {isLoggedIn ? (
                <button
                  onClick={handleLogout}
                  className={cn(
                    navigationMenuTriggerStyle(),
                    'text-red-500 hover:text-red-700'
                  )}
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  className={cn(
                    navigationMenuTriggerStyle(),
                    pathname === '/login' && 'bg-muted text-primary'
                  )}
                >
                  Login
                </Link>
              )}
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>

      {/* Mobile Hamburger - Right aligned */}
      <div className="md:hidden">
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 rounded-md border hover:bg-muted text-black dark:text-white"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>

        {mobileOpen && (
          <div className="absolute top-full right-0 w-48 bg-white dark:bg-gray-900 shadow-md border rounded-md z-50">
            <nav className="flex flex-col p-2 space-y-1">
              {navLinks.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2 hover:bg-muted dark:hover:bg-gray-800 text-black dark:text-white',
                    pathname === item.href && 'bg-muted text-primary dark:bg-gray-800'
                  )}
                >
                  {item.label}
                </Link>
              ))}
              {isLoggedIn ? (
                <button
                  onClick={() => {
                    setMobileOpen(false)
                    handleLogout()
                  }}
                  className="text-left px-3 py-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
                >
                  Logout
                </button>
              ) : (
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2 hover:bg-muted dark:hover:bg-gray-800 text-black dark:text-white',
                    pathname === '/login' && 'bg-muted text-primary dark:bg-gray-800'
                  )}
                >
                  Login
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </div>
  )
}
