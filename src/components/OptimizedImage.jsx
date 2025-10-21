'use client'

import Image from 'next/image'

/**
 * Custom Image component for static export
 * Adds custom loader with basePath support ONLY for WordPress export
 */
export default function OptimizedImage({ src, alt, ...props }) {
  // Check if we're in WordPress export mode (basePath will be set by Next.js config)
  const isWordPressExport = process.env.NEXT_PUBLIC_WP_EXPORT === 'true'

  const customLoader = ({ src, width, quality }) => {
    // Only add basePath for WordPress export
    if (isWordPressExport) {
      const basePath = '/showroom'

      // If src already starts with basePath, return as-is
      if (src.startsWith(basePath)) {
        return src
      }

      // If src is absolute (starts with /), add basePath
      if (src.startsWith('/')) {
        return `${basePath}${src}`
      }
    }

    // For development or other builds, return src as-is
    return src
  }

  // Only use custom loader for WordPress export
  const imageProps = isWordPressExport
    ? { loader: customLoader }
    : {}

  return (
    <Image
      src={src}
      alt={alt}
      {...imageProps}
      {...props}
    />
  )
}
