/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  // Force static export for better performance
  output: 'standalone',
}

module.exports = nextConfig
