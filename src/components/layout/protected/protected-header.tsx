'use client'
import { motion, useMotionValueEvent, useScroll } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'
import { buttonVariants } from '@/components/ui/button'
import TonvilleLogo from '@/components/Icons/TonvilleLogo'
import WalletIcon from '@/components/Icons/WalletIcon'
import SearchIcon from '@/components/Icons/SearchIcon'

export function ProtectedHeader() {
  const [hidden, setHidden] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (latest > previous && latest > 150) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })
  return (
    <div>
      <motion.div
        className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
        variants={{
          visible: { y: 5 },
          hidden: { y: '-120%' },
        }}
        animate={hidden ? 'hidden' : 'visible'}
        transition={{ duration: 1.2, ease: 'easeInOut' }}
      >
        <div className="flex h-14 items-center justify-between px-4">
          <Link href="/protected/core" className="flex items-center space-x-2">
            <div className="relative h-9 w-11 overflow-hidden rounded-sm">
              {/* <Image
                src={PlaceholderImage.src}
                alt="TonVille Logo"
                width={32}
                height={32}
                className="h-full w-full object-cover"
              /> */}
              <TonvilleLogo />
            </div>
          </Link>

          <div className="flex items-center gap-4">
            {/* variant="ghost" size="icon" */}
            <Link
              href={"/protected/core/search?type='cheif'"}
              className={buttonVariants({
                size: 'icon',
                variant: 'ghost',
                className: 'h-9 w-9',
              })}
              aria-label="Search"
            >
              {/* <Search className="h-4 w-4" /> */}
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-muted">
                <SearchIcon />
              </div>
            </Link>
            <div className="rounded-full bg-blue-500 p-2">
              <Link href={'/auth'}>
                <WalletIcon />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
