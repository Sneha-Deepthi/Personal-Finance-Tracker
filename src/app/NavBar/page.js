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

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('/api/auth/user', { credentials: 'include' })
        if (res.ok) {
          const data = await res.json()
          setIsLoggedIn(true)
          setEmail(data.email) // not data.user.email
        }
        else {
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
  )
}
