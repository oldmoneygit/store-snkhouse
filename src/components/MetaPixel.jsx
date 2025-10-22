'use client'

import { useEffect, Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import {
  initializeFacebookParams,
  trackPixelEvent,
} from '@/utils/metaPixelUtils'

function MetaPixelTracker() {
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Inicializar parâmetros do Facebook uma vez no mount
  useEffect(() => {
    initializeFacebookParams()
  }, [])

  // Track PageView com event_id para deduplicação em toda mudança de rota
  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq) {
      // Usar trackPixelEvent para garantir event_id e deduplicação
      trackPixelEvent('PageView', {})
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
