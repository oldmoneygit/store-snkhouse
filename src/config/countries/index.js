/**
 * Sistema de Configuração Multi-País
 * Detecta automaticamente o país baseado no hostname
 */

import argentinaConfig from './argentina'
import mexicoConfig from './mexico'

// Mapa de configurações
const configs = {
  AR: argentinaConfig,
  MX: mexicoConfig,
}

const STORAGE_KEY = 'snkhouse_country'

/**
 * Detecta o país atual baseado no hostname
 * @returns {string} Código do país (AR, MX, etc)
 */
export function detectCountry() {
  // Server-side
  if (typeof window === 'undefined') {
    // Durante build ou SSR
    const hostname = process.env.VERCEL_URL || process.env.NEXT_PUBLIC_VERCEL_URL || 'localhost'

    if (hostname.includes('mexico')) return 'MX'
    if (hostname.includes('argentina')) return 'AR'

    // Default: Argentina
    return 'AR'
  }

  // Client-side
  console.log('[detectCountry] Detectando país no client-side...')
  const hostname = window.location.hostname.toLowerCase()
  console.log('[detectCountry] Hostname:', hostname)

  // 1. Verificar hostname (produção)
  if (hostname.includes('mexico') || hostname.includes('.mx')) {
    console.log('[detectCountry] México detectado via hostname')
    saveCountry('MX')
    return 'MX'
  }
  if (hostname.includes('argentina') || hostname.includes('.ar')) {
    console.log('[detectCountry] Argentina detectada via hostname')
    saveCountry('AR')
    return 'AR'
  }

  // 2. Verificar query parameter (para testar)
  const urlParams = new URLSearchParams(window.location.search)
  const countryParam = urlParams.get('country')?.toUpperCase()
  console.log('[detectCountry] Query param "country":', countryParam)

  if (countryParam && configs[countryParam]) {
    console.log('[detectCountry] País detectado via query param:', countryParam)
    saveCountry(countryParam)
    return countryParam
  }

  // 3. Verificar localStorage (persistência)
  const savedCountry = getSavedCountry()
  console.log('[detectCountry] País salvo no localStorage:', savedCountry)

  if (savedCountry && configs[savedCountry]) {
    console.log('[detectCountry] Usando país do localStorage:', savedCountry)
    return savedCountry
  }

  // 4. Default: Argentina
  console.log('[detectCountry] Usando default: AR')
  return 'AR'
}

/**
 * Salva país no localStorage
 * @param {string} countryCode - Código do país
 */
function saveCountry(countryCode) {
  try {
    console.log('[saveCountry] Salvando país no localStorage:', countryCode)
    localStorage.setItem(STORAGE_KEY, countryCode)
    const saved = localStorage.getItem(STORAGE_KEY)
    console.log('[saveCountry] Verificação - valor salvo:', saved)
  } catch (e) {
    console.error('[saveCountry] Erro ao salvar no localStorage:', e)
  }
}

/**
 * Recupera país salvo do localStorage
 * @returns {string|null} Código do país ou null
 */
function getSavedCountry() {
  try {
    return localStorage.getItem(STORAGE_KEY)
  } catch (e) {
    return null
  }
}

/**
 * Retorna a configuração do país atual
 * @returns {Object} Configuração do país
 */
export function getCountryConfig() {
  const countryCode = detectCountry()
  return configs[countryCode] || configs.AR
}

/**
 * Retorna todas as configurações disponíveis
 * @returns {Object} Mapa de todas as configs
 */
export function getAllCountries() {
  return configs
}

/**
 * Verifica se um código de país é válido
 * @param {string} code - Código do país
 * @returns {boolean}
 */
export function isValidCountry(code) {
  return !!configs[code]
}

// Export default
export default {
  detectCountry,
  getCountryConfig,
  getAllCountries,
  isValidCountry,
  configs,
}
