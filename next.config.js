/** @type {import('next').NextConfig} */

// Verifica se é export para WordPress
const isWordPressExport = process.env.EXPORT_WP === 'true'

const nextConfig = {
  // Enable static export ONLY for WordPress export
  ...(isWordPressExport && { output: 'export' }),

  // Image optimization config
  images: {
    ...(isWordPressExport && { loader: 'custom' }),
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },

  // Transpile next-image-export-optimizer (only for WordPress export)
  ...(isWordPressExport && { transpilePackages: ['next-image-export-optimizer'] }),

  // Base path ONLY for WordPress export
  // Durante desenvolvimento, as rotas ficam normais: / e /store
  // Durante export WP, ficam: /showroom e /showroom/store
  ...(isWordPressExport && { basePath: '/showroom' }),

  // Performance optimizations
  swcMinify: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
}

module.exports = nextConfig
