import { Inter, JetBrains_Mono } from 'next/font/google'
import './globals.css'
import { SEO_DATA } from '@/utils/constants'
import MetaPixelLoader from '@/components/MetaPixelLoader'
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

/**
 * ESTRATÉGIA DE 2 PROJETOS VERCEL:
 * - Projeto Argentina: tem suas próprias env vars (NEXT_PUBLIC_COUNTRY=AR)
 * - Projeto México: tem suas próprias env vars (NEXT_PUBLIC_COUNTRY=MX)
 * - Cada projeto é completamente isolado
 * - Meta Pixel carrega automaticamente o ID correto do país
 */

export default function RootLayout({ children }) {
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
        {/* Meta Pixel - carrega o pixel correto baseado na config do país */}
        <MetaPixelLoader />
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
