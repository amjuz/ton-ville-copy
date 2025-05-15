import React, { Suspense } from 'react'
import { WakeUpChief } from '@/app/protected/wake-up/components/wake-up-chief'

export default function WakeUp() {
  return (
    <Suspense fallback={<></>}>
      <WakeUpChief />
    </Suspense>
  )
}
