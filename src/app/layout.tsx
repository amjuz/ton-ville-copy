import { Toaster } from 'react-hot-toast'
import { ThemeProvider } from 'next-themes'
import ReactQueryProvider from '@/lib/react-query/ReactQueryProvider'
import { cn } from '@/lib/utils/cn'
import { metadata } from '@/components/layout/metadata'
import { TelegramAppRoot } from '@/components/layout/telegram-app'
import { lato } from '@/app/fonts'
import '@/app/globals.css'
import Background from '@/components/ui/background'
import ReactReduxProvider from '@/providers/ReactReduxProvider'

type RootLayoutProps = {
  children: React.ReactNode
}

export { metadata }

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          lato.variable,
          'dark relative min-h-screen w-screen touch-pan-y overflow-x-hidden'
        )}
      >
        <ReactQueryProvider>
          <ReactReduxProvider>
            <TelegramAppRoot>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <Toaster />
                <main className="scrollbar-w-2 scrollbar-thumb-rounded scrollbar-track-primary scrollbar-thumb h-full max-h-screen min-h-screen overflow-y-scroll">
                  {children}
                </main>
                <Background />
              </ThemeProvider>
            </TelegramAppRoot>
          </ReactReduxProvider>
        </ReactQueryProvider>
      </body>
    </html>
  )
}
