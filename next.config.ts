import withBundleAnalyzer from '@next/bundle-analyzer'
import type { NextConfig } from 'next'

const supabaseUrl = new URL(process.env.NEXT_PUBLIC_SUPABASE_URL ?? '')

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig: NextConfig = {
  reactStrictMode: false, // Disabled strict mode to avoid double rendering
  compiler: {
    removeConsole: process.env.VERCEL_ENV === 'production',
  },
  images: {
    domains: [supabaseUrl.hostname],
    loader: 'custom',
    loaderFile: './supabase-loader.js',
    deviceSizes: [
      375, // Base iPhone/Android
      390, // iPhone Pro
      428, // iPhone Pro Max
      512, // Safe maximum for portrait
    ],
    imageSizes: [
      128, // Thumbnails/previews
      256, // Content images
      384, // Full-screen images
    ],
    // remotePatterns: [
    //   { hostname: 'avatars.githubusercontent.com', protocol: 'http', pathname: 'u' },
    //   { hostname: '127.0.0.1:54321', protocol: 'http', pathname: 'u' },
    // ],
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        crypto: false,
      }
    }
    return config
  },
  experimental: {
    typedRoutes: true,
  },
  // For App Router, redirects are preferred over rewrites for auth flows
  // async redirects() {
  //   return [
  //     {
  //       source: '/',
  //       destination: '/auth',
  //       permanent: true,
  //     },
  //     {
  //       // More precise regex pattern
  //       source: '/sign-(in|up)',
  //       destination: '/auth',
  //       permanent: true,
  //     },
  //   ]
  // },
}

export default bundleAnalyzer(nextConfig)
