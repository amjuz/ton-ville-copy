'use client'
import { Ghost } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'

export default function NotFound() {
  return (
    <div>
      <div className="flex flex-col items-center justify-center pt-12">
        <h1 className="text-3xl font-medium">Page not found</h1>
        <Ghost size={54} />
        <div className="pt-5">
          <Link className={buttonVariants()} href={'/protected/core'}>
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
