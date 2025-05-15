import { retrieveLaunchParams } from '@telegram-apps/sdk'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { useServerAction } from 'zsa-react'
import { useInitData } from '@/hooks/useInitDataRaw'
import { authAction } from '@/app/actions/auth'

/**
 * Custom hook that handles the authentication process using Telegram data.
 *
 */
export function useTelegramAuth() {
  const { initDataRaw, initData } = useInitData()
  const d = retrieveLaunchParams()

  const { execute: auth, error } = useServerAction(authAction)
  const router = useRouter()

  useEffect(() => {
    if (!initData || !initDataRaw) return
    const { user, authDate, hash } = initData
    // const { user, authDate, hash } = parseInitData(initDataRaw)

    if (!user || !String(user.id) || !authDate || !hash) return

    auth({ initDataRaw }).then(([type, error]) => {
      if (error) throw error
      if (!type) return
      if (type === 'signup') router.push('/protected/onboarding')
      if (type === 'magiclink') router.push('/protected/core')
    })
  }, [initDataRaw])
  useEffect(() => {
    if (!error) return
    console.log(error)
    throw error
  }, [error])
}
