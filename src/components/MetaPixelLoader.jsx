/**
 * Meta Pixel Loader - Client Component
 * Carrega o Meta Pixel correto baseado no país detectado
 *
 * 🇦🇷 Argentina → Pixel ID da Argentina
 * 🇲🇽 México → Pixel ID do México
 */

'use client'

import { useEffect, useState } from 'react'
import { useCountry } from '@/hooks/useCountry'
import MetaPixelScript from './MetaPixelScript'
import MetaPixel from './MetaPixel'

export default function MetaPixelLoader() {
  const country = useCountry()
  const [pixelId, setPixelId] = useState(null)

  useEffect(() => {
    // Pega o Pixel ID correto do país atual
    if (country && country.metaPixel && country.metaPixel.id) {
      const currentPixelId = country.metaPixel.id

      console.log(`[MetaPixel] Carregando Pixel do ${country.name}:`, currentPixelId)
      setPixelId(currentPixelId)
    }
  }, [country])

  // Não renderizar nada até ter o pixelId correto
  if (!pixelId) {
    return null
  }

  return (
    <>
      <MetaPixelScript pixelId={pixelId} />
      <MetaPixel />
    </>
  )
}
