/** @type {import('next').NextConfig} */

// Modos de deploy:
// 1. Desenvolvimento: npm run dev (localhost:3000)
// 2. Produção Subdomínio: npm run build + npm start (store.snkhouse.com)
// 3. Export Estático: EXPORT_STATIC=true npm run build (para CDN/static hosting)
const isStaticExport = process.env.EXPORT_STATIC === 'true'

const nextConfig = {
  // Enable static export APENAS para deploy estático (CDN)
  // Para subdomínio com Node.js, deixar sem output
  ...(isStaticExport && { output: 'export' }),

  // Image optimization config
  images: {
    // Custom loader apenas para export estático
    ...(isStaticExport && {
      loader: 'custom',
      loaderFile: './src/utils/imageLoader.js'
    }),
    formats: ['image/webp'], // Force WebP format for better performance
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    minimumCacheTTL: 60 * 60 * 24 * 365, // Cache images for 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'www.snkhouse.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'store.snkhouse.com',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // NO basePath para subdomínio!
  // Rotas ficam limpas: store.snkhouse.com/ (não store.snkhouse.com/showroom/)

  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Cache headers for better performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Preconnect to external domains
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://www.snkhouse.com/api/:path*',
      },
    ]
  },
}

module.exports = nextConfig
