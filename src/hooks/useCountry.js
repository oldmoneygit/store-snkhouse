/**
 * Hook para acessar configuração do país atual
 * Uso: const country = useCountry()
 */

'use client'

import { useState, useEffect } from 'react'
import { getCountryConfig, detectCountry } from '@/config/countries'

const STORAGE_KEY = 'snkhouse_country'

export function useCountry() {
  const [config, setConfig] = useState(() => getCountryConfig())

  useEffect(() => {
    // Client-side: detectar e salvar país
    const detectedCountry = detectCountry()

    // Salvar explicitamente no localStorage
    try {
      localStorage.setItem(STORAGE_KEY, detectedCountry)
      console.log('[useCountry] País detectado e salvo:', detectedCountry)
    } catch (e) {
      console.error('[useCountry] Erro ao salvar no localStorage:', e)
    }

    // Atualizar config
    setConfig(getCountryConfig())
  }, [])

  return config
}

/**
 * Hook para acessar apenas tradução
 * Uso: const t = useTranslation()
 */
export function useTranslation() {
  const country = useCountry()
  return country.i18n.translations
}

/**
 * Hook para acessar apenas moeda
 * Uso: const currency = useCurrency()
 */
export function useCurrency() {
  const country = useCountry()
  return country.currency
}

/**
 * Hook para detectar código do país
 * Uso: const countryCode = useCountryCode()
 */
export function useCountryCode() {
  const [code, setCode] = useState(() => detectCountry())

  useEffect(() => {
    setCode(detectCountry())
  }, [])

  return code
}
