'use client'

import { useEffect } from 'react'
import { useMetaPixel } from '@/hooks/useMetaPixel'

export default function HomePageTracking() {
  const { trackViewContent } = useMetaPixel()

  useEffect(() => {
    // Track ViewContent quando a homepage carregar
    trackViewContent(
      'Homepage - SNKHOUSE Store',
      ['homepage'],
      0,
      'ARS'
    )
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return null
}
