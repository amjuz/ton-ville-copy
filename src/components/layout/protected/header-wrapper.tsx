import { useMotionValueEvent, useScroll } from 'framer-motion'
import React, { ReactNode, useState } from 'react'
import MotionElem from '@/components/Elements/motionDiv'

export default function HeaderWrapper({ children }: { children: ReactNode }) {
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
    <MotionElem
      as="header"
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      variants={{
        visible: { y: 5 },
        hidden: { y: '-120%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 1.2, ease: 'easeInOut' }}
    >
      {children}
    </MotionElem>
  )
}
