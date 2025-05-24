import StoreProvider from './store-providers'
import { getServerClient } from '@/lib/supabase/server'
import { ErrorDisplay } from '../error/error-display'

export default async function InitialStateDispatcher({ children }: { children: React.ReactNode }) {
  // const [] = await Promise.all([])
  const supabase = await getServerClient()
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  if (error) return <ErrorDisplay error={error} />

  return <StoreProvider userId={user?.id}>{children}</StoreProvider>
}
