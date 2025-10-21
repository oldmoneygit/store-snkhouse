'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

function MetaPixelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  useEffect(() => {
    // Inicializar Meta Pixel
    if (typeof window !== 'undefined' && window.fbq) {
      // Track PageView em toda mudança de rota
      window.fbq('track', 'PageView')

      console.log('Meta Pixel - PageView tracked:', pathname)
    }
  }, [pathname, searchParams])

  return null
}

export default function MetaPixel() {
  return (
    <Suspense fallback={null}>
      <MetaPixelTracker />
    </Suspense>
  )
}
