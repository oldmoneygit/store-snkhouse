/**
 * Utilidades de Conversão e Formatação de Moedas
 */

/**
 * Taxas de câmbio
 * Base: 1 ARS (Peso Argentino)
 *
 * IMPORTANTE: Atualizar periodicamente!
 * Fonte: https://www.xe.com/ ou API de câmbio
 */
const EXCHANGE_RATES = {
  ARS: 1,
  MXN: 0.012, // 1 ARS = 0.012 MXN (conforme especificado)
  // Adicionar mais moedas conforme necessário:
  // BRL: 0.0055,  // 1 ARS = 0.0055 BRL (exemplo)
  // CLP: 1.12,    // 1 ARS = 1.12 CLP (exemplo)
}

/**
 * Converte preço de ARS (base) para outra moeda
 * @param {number} priceARS - Preço em ARS (Peso Argentino)
 * @param {string} targetCurrency - Moeda destino (MXN, BRL, etc)
 * @param {boolean} round - Arredondar para inteiro (default: true)
 * @returns {number} Preço convertido
 */
export function convertPrice(priceARS, targetCurrency = 'ARS', round = true) {
  if (!priceARS || priceARS <= 0) return 0

  const rate = EXCHANGE_RATES[targetCurrency]
  if (!rate) {
    console.warn(`Taxa de câmbio não encontrada para ${targetCurrency}, usando ARS`)
    return priceARS
  }

  const convertedPrice = priceARS * rate

  // Arredondar para evitar centavos quebrados
  return round ? Math.round(convertedPrice) : convertedPrice
}

/**
 * Formata valor em moeda com locale correto
 * @param {number} amount - Valor a formatar
 * @param {Object} currencyConfig - Config da moeda { code, locale, symbol, symbolDisplay }
 * @returns {string} Valor formatado (ex: "$1.234,56" ou "MXN $993")
 */
export function formatCurrency(amount, currencyConfig) {
  if (!amount && amount !== 0) return '-'

  const { code, locale, decimals = 2, symbolDisplay } = currencyConfig

  try {
    // Formatar o número com locale correto
    const formattedNumber = new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)

    // Se tem symbolDisplay customizado (ex: "MXN $"), usar ele
    if (symbolDisplay) {
      return `${symbolDisplay}${formattedNumber}`
    }

    // Caso contrário, usar formatação padrão de moeda
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(amount)
  } catch (error) {
    console.error('Erro ao formatar moeda:', error)
    // Fallback simples
    const symbol = symbolDisplay || currencyConfig.symbol
    return `${symbol}${amount.toLocaleString(locale)}`
  }
}

/**
 * Formata valor em moeda compacta (K, M)
 * Ex: 1500 → $1.5K
 * @param {number} amount - Valor a formatar
 * @param {Object} currencyConfig - Config da moeda
 * @returns {string} Valor formatado compacto
 */
export function formatCurrencyCompact(amount, currencyConfig) {
  if (!amount && amount !== 0) return '-'

  const { code, locale } = currencyConfig

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: code,
      notation: 'compact',
      compactDisplay: 'short',
    }).format(amount)
  } catch (error) {
    return formatCurrency(amount, currencyConfig)
  }
}

/**
 * Converte e formata preço em uma única função
 * @param {number} priceARS - Preço base em ARS
 * @param {Object} currencyConfig - Config da moeda destino
 * @returns {string} Preço convertido e formatado
 */
export function convertAndFormat(priceARS, currencyConfig) {
  const converted = convertPrice(priceARS, currencyConfig.code)
  return formatCurrency(converted, currencyConfig)
}

/**
 * Retorna taxa de câmbio para uma moeda
 * @param {string} currency - Código da moeda
 * @returns {number} Taxa de câmbio
 */
export function getExchangeRate(currency) {
  return EXCHANGE_RATES[currency] || 1
}

/**
 * Atualiza taxa de câmbio (útil para atualizar dinamicamente)
 * @param {string} currency - Código da moeda
 * @param {number} rate - Nova taxa
 */
export function updateExchangeRate(currency, rate) {
  if (rate && rate > 0) {
    EXCHANGE_RATES[currency] = rate
  }
}

/**
 * Retorna todas as taxas de câmbio disponíveis
 * @returns {Object} Mapa de taxas
 */
export function getAllExchangeRates() {
  return { ...EXCHANGE_RATES }
}

/**
 * Converte valor de volta para ARS (reverso)
 * @param {number} price - Preço na moeda convertida
 * @param {string} fromCurrency - Moeda origem
 * @returns {number} Valor em ARS
 */
export function convertToARS(price, fromCurrency) {
  if (fromCurrency === 'ARS') return price

  const rate = EXCHANGE_RATES[fromCurrency]
  if (!rate) return price

  return Math.round(price / rate)
}

/**
 * Calcula desconto e retorna preço final
 * @param {number} originalPrice - Preço original
 * @param {number} discountPercent - Percentual de desconto (ex: 20 para 20%)
 * @returns {Object} { original, discount, final }
 */
export function calculateDiscount(originalPrice, discountPercent) {
  const discount = (originalPrice * discountPercent) / 100
  const final = originalPrice - discount

  return {
    original: originalPrice,
    discount,
    final,
    percent: discountPercent,
  }
}

/**
 * Formata percentual de desconto
 * @param {number} percent - Percentual
 * @returns {string} Formatado (ex: "20%")
 */
export function formatDiscount(percent) {
  return `${Math.round(percent)}%`
}
