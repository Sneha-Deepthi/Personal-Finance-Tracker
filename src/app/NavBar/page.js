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
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Dashboard', href: '/' },
  { label: 'Transactions', href: '/transactions' },
  { label: 'Budget', href: '/budget' },
]

export default function MainNav() {
  const pathname = usePathname()

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
      </NavigationMenuList>
    </NavigationMenu>
  )
}
