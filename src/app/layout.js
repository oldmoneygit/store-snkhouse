import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SEO_DATA } from '@/utils/constants'
import MetaPixelScript from '@/components/MetaPixelScript'
import MetaPixel from '@/components/MetaPixel'
import ClientProviders from '@/components/ClientProviders'
import ChatWidget from '@/components/ChatWidget'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
  weight: ['400', '500', '600', '700'], // normal, medium, semibold, bold
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata = {
  metadataBase: new URL(SEO_DATA.url),
  title: SEO_DATA.title,
  description: SEO_DATA.description,
  keywords: SEO_DATA.keywords,
  authors: [{ name: 'SNKHOUSE' }],
  creator: 'SNKHOUSE',
  publisher: 'SNKHOUSE',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: SEO_DATA.url,
    title: SEO_DATA.title,
    description: SEO_DATA.description,
    siteName: 'SNKHOUSE Showroom',
    images: [
      {
        url: SEO_DATA.ogImage,
        width: 1200,
        height: 630,
        alt: 'SNKHOUSE Showroom - Palermo, Buenos Aires',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: SEO_DATA.title,
    description: SEO_DATA.description,
    images: [SEO_DATA.ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

// IMPORTANTE: Este layout é server component e não pode usar hooks client-side
// O Pixel ID será detectado dinamicamente pelo MetaPixelScript no client-side

export default function RootLayout({ children }) {
  // Fallback: tentar pegar o Pixel Argentina das variáveis antigas (legacy support)
  const fallbackPixelId = process.env.NEXT_PUBLIC_AR_META_PIXEL_ID ||
                         process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html lang="es" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link rel="canonical" href={SEO_DATA.url} />

        {/* Performance Optimization: Preconnect to external domains */}
        <link rel="preconnect" href="https://connect.facebook.net" />
        <link rel="dns-prefetch" href="https://connect.facebook.net" />
        <link rel="preconnect" href="https://snkhouse-bot-widget.vercel.app" />
        <link rel="dns-prefetch" href="https://snkhouse-bot-widget.vercel.app" />

        {/* Performance Optimization: Preload critical resources */}
        <link rel="preload" as="image" href="/images/hero/interior-symmetric-fisheye.jpg" />
        <link rel="preload" as="image" href="/images/logo/snkhouse-logo-white.png" />

        {/* Mobile Optimization */}
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5, user-scalable=yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />

        {/* Performance Hints */}
        <meta httpEquiv="x-dns-prefetch-control" content="on" />
      </head>
      <body className="font-sans antialiased">
        {/* Meta Pixel - detectará país automaticamente no client-side */}
        {fallbackPixelId && <MetaPixelScript pixelId={fallbackPixelId} />}
        {fallbackPixelId && <MetaPixel />}
        <ClientProviders>
          {children}
          {/* Widget de Chat com IA */}
          <ChatWidget />
        </ClientProviders>
        <Analytics />
      </body>
    </html>
  )
}
