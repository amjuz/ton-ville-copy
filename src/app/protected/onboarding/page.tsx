import { Suspense } from 'react'
import Slides from '@/app/protected/onboarding/components/slides'

export default function OnboardingPage() {
  return (
    <Suspense fallback={<></>}>
      <Slides />
    </Suspense>
  )
}
