import BottomNav from '@/components/layout/protected/bottom-nav'
import { ProtectedHeader } from '@/components/layout/protected/protected-header'
import { getServerClient } from '@/lib/supabase/server'
import { createServerClient } from '@supabase/ssr'

export default async function CoreLayout({ children }: { children: React.ReactNode }) {
  const client = await getServerClient()

  const { data, error } = await client.auth.getUser()

  if (!data.user?.id) {
    return
  }

  return (
    <>
      <ProtectedHeader />
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav profileId={data.user.id} />
    </>
  )
}
