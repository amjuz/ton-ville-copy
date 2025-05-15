'use client'

import { Splash } from '@/components/ui/splash'
import { useTelegramAuth } from '@/hooks/useTelegramAuth'

/**
 * @return {JSX.Element} A splash screen while the user is being authenticated.
 * @see AuthForm
 */

// write email auth here

export default function AuthPage() {
  useTelegramAuth()
  return <Splash />
}
