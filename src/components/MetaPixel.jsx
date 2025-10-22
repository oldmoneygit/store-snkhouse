'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  initializeFacebookParams,
  getFacebookClickId,
  getFacebookBrowserId,
} from '@/utils/metaPixelUtils'

function MetaPixelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inicializar parâmetros do Facebook uma vez no mount
  useEffect(() => {
    initializeFacebookParams()
  }, [])

  // Track PageView com parâmetros avançados em toda mudança de rota
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      // Capturar parâmetros avançados
      const fbc = getFacebookClickId()
      const fbp = getFacebookBrowserId()

      const eventData = {
        ...(fbc && { fbc }),
        ...(fbp && { fbp }),
      }

      // Track PageView com parâmetros avançados
      window.fbq('track', 'PageView', eventData)

      console.log('Meta Pixel - PageView tracked:', {
        pathname,
        ...eventData,
      })
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
