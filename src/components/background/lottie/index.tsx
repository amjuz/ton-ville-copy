'use client'

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

export default function BackgroundLottie() {
  const [animationData, setAnimationData] = useState<unknown>()

  useEffect(() => {
    import('@/assets/lotties/space.json').then((data) => {
      setAnimationData(data)
    })
  }, [])

  if (!animationData) return null

  return (
    <Lottie
      className={
        'absolute top-0 -z-50 h-full w-full animate-in fade-in after:absolute after:inset-0 after:animate-pulse after:bg-gradient-to-br after:from-black after:via-indigo-950 after:to-black after:opacity-10 after:content-[attr(before)]'
      }
      animationData={animationData}
      autoplay
      loop
    />
  )
}
