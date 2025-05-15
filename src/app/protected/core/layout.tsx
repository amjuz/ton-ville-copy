import BottomNav from '@/components/layout/protected/bottom-nav'
import { ProtectedHeader } from '@/components/layout/protected/protected-header'

export default function CoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ProtectedHeader />
      <main className="flex-1 pb-16">{children}</main>
      <BottomNav />
    </>
  )
}
