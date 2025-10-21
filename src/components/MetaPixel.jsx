'use client'

import { useEffect } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'

export default function MetaPixel() {
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
