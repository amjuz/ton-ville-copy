import { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | TonVille',
    default: 'TonVille',
  },
  description: 'Tribes of TON - Join the community of TON blockchain enthusiasts',
  keywords: ['TON', 'Tribes', 'Blockchain', 'Cryptocurrency', 'Community'],

  openGraph: {
    title: 'TonVille',
    description: 'Tribes of TON - Join the community of TON blockchain enthusiasts',
    url: 'https://miniapp.tonville.com',
    siteName: 'TonVille',
    images: [
      {
        url: '/images/og-image.webp',
        width: 1200,
        height: 630,
        alt: 'TonVille - Tribes of TON',
        type: 'image/webp',
      },
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TonVille - Tribes of TON',
        type: 'image/jpeg',
      },
    ],
  },

  twitter: {
    card: 'summary_large_image',
    title: 'TonVille',
    description: 'Tribes of TON - Join the community of TON blockchain enthusiasts',
    images: ['/images/og-image.webp', '/images/og-image.jpg'],
    creator: '@tonville',
  },

  icons: {
    icon: [
      { url: '/favicon/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon/favicon.ico' },
    ],
    apple: [{ url: '/favicon/apple-touch-icon.png', sizes: '180x180' }],
    other: [
      {
        rel: 'mask-icon',
        url: '/favicon/safari-pinned-tab.svg',
        color: '#000000',
      },
    ],
  },
  manifest: '/favicon/site.webmanifest',
}
