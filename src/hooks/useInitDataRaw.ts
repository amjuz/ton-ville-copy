import { retrieveLaunchParams } from '@telegram-apps/sdk-react'
import { useMemo } from 'react'

/**
 * @returns Raw init data string.
 * @override `useInitDataRaw` of `@telegram-apps/sdk-react` because it returns parsed initData.
 */
export function useInitData() {
  return useMemo(() => {
    const { initDataRaw, initData } = retrieveLaunchParams()

    return { initDataRaw, initData }
  }, [])
}
