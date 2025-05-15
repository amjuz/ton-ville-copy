import { ReactNode } from 'react'

interface DashboardLayoutProps {
  children: ReactNode
}

//TODO: Wrap this layout with TonConnectUI to enable Wallet Connection
export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div>
      <header>HIDING STICKY HEADER</header>
      <main>{children}</main>
      <footer>FIXED STICKY NAVBAR</footer>
    </div>
  )
}
