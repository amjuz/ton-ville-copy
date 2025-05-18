'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import EarnLogo from '@/components/Icons/EarnLogo'
import ExploreLogo from '@/components/Icons/ExploreLogo'
import NotificationLogo from '@/components/Icons/NotificationLogo'
import ProfileLogo from '@/components/Icons/ProfileLogo'

interface IBottomNavProps {
  profileId: string
}

export default function BottomNav({ profileId }: IBottomNavProps) {
  const pathname = usePathname()
  const navItems = [
    { icon: ExploreLogo, label: 'Explore', href: '/' },
    { icon: EarnLogo, label: 'Farm', href: '/protected/core/earn' },
    { icon: NotificationLogo, label: 'Notifications', href: '/protected/core/notification' },
    { icon: ProfileLogo, label: 'Profile', href: `/protected/core/profile/${profileId}` },
  ] as const

  localStorage.setItem('profileId', profileId)
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-background">
      <div className="container mx-auto">
        <ul className="flex h-16 items-center justify-center">
          {navItems.map((item, index) => (
            <li key={`BottomNav-${item.href}-${index}`} className="basis-1/4">
              <Link
                href={item.href}
                className={`flex flex-col items-center justify-center space-y-1 p-2 ${
                  pathname === item.href ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {/* <item.icon className="mb-1 h-6 w-6" /> */}
                <item.icon />
                <span className="text-xs">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  )
}
