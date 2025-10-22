/**
 * Sistema de Configuração Multi-País
 *
 * ESTRATÉGIA DE 2 PROJETOS VERCEL:
 * - Projeto Argentina: NEXT_PUBLIC_COUNTRY=AR
 * - Projeto México: NEXT_PUBLIC_COUNTRY=MX
 */

import argentinaConfig from './argentina'
import mexicoConfig from './mexico'

// Mapa de configurações
const configs = {
  AR: argentinaConfig,
  MX: mexicoConfig,
}

/**
 * Detecta o país atual
 *
 * IMPORTANTE: Com 2 projetos Vercel separados, cada projeto tem sua própria
 * variável NEXT_PUBLIC_COUNTRY configurada no Vercel Dashboard.
 *
 * @returns {string} Código do país (AR, MX, etc)
 */
export function detectCountry() {
  // 1. PRIORIDADE: Variável de ambiente (Projetos separados no Vercel)
  const envCountry = process.env.NEXT_PUBLIC_COUNTRY
  if (envCountry && configs[envCountry]) {
    return envCountry
  }

  // 2. FALLBACK: Query parameter (apenas para desenvolvimento/teste local)
  if (typeof window !== 'undefined') {
    const urlParams = new URLSearchParams(window.location.search)
    const countryParam = urlParams.get('country')?.toUpperCase()

    if (countryParam && configs[countryParam]) {
      return countryParam
    }
  }

  // 3. DEFAULT: Argentina (fallback para desenvolvimento)
  return 'AR'
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
