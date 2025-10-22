/**
 * Meta Pixel Utilities
 * Gerencia parâmetros avançados do Facebook Pixel para melhor qualidade de correspondência
 *
 * Parâmetros recomendados pelo Facebook:
 * - fbc: Facebook Click ID (capturado da URL)
 * - fbp: Facebook Browser ID (do cookie _fbp)
 * - email: Email do usuário (hasheado com SHA-256)
 * - phone: Telefone do usuário (hasheado com SHA-256)
 * - fn: First name (hasheado)
 * - ln: Last name (hasheado)
 */

/**
 * Captura o Facebook Click ID (fbc) da URL
 * @returns {string|null} - fbc parameter ou null
 */
export function getFacebookClickId() {
  if (typeof window === 'undefined') return null

  try {
    const urlParams = new URLSearchParams(window.location.search)
    const fbclid = urlParams.get('fbclid')

    if (fbclid) {
      // Formato correto do fbc: fb.1.timestamp.fbclid
      const timestamp = Date.now()
      return `fb.1.${timestamp}.${fbclid}`
    }

    // Tenta recuperar do sessionStorage se já foi capturado antes
    const storedFbc = sessionStorage.getItem('_fbc')
    if (storedFbc) return storedFbc

    return null
  } catch (error) {
    console.error('Error getting Facebook Click ID:', error)
    return null
  }
}

/**
 * Captura o Facebook Browser ID (fbp) do cookie
 * @returns {string|null} - fbp parameter ou null
 */
export function getFacebookBrowserId() {
  if (typeof window === 'undefined') return null

  try {
    const cookies = document.cookie.split(';')
    const fbpCookie = cookies.find(cookie => cookie.trim().startsWith('_fbp='))

    if (fbpCookie) {
      return fbpCookie.split('=')[1]
    }

    return null
  } catch (error) {
    console.error('Error getting Facebook Browser ID:', error)
    return null
  }
}

/**
 * Salva o fbc no sessionStorage para persistência durante a sessão
 * @param {string} fbc - Facebook Click ID
 */
export function saveFacebookClickId(fbc) {
  if (typeof window === 'undefined' || !fbc) return

  try {
    sessionStorage.setItem('_fbc', fbc)
  } catch (error) {
    console.error('Error saving Facebook Click ID:', error)
  }
}

/**
 * Hash SHA-256 para dados de usuário (client-side)
 * Nota: Para produção, é melhor fazer hash no servidor
 * @param {string} value - Valor para hash
 * @returns {Promise<string>} - Valor hasheado
 */
export async function hashValue(value) {
  if (!value || typeof window === 'undefined') return null

  try {
    // Normalizar: lowercase e trim
    const normalized = value.toLowerCase().trim()

    // Criar hash SHA-256
    const encoder = new TextEncoder()
    const data = encoder.encode(normalized)
    const hashBuffer = await crypto.subtle.digest('SHA-256', data)

    // Converter para hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    return hashHex
  } catch (error) {
    console.error('Error hashing value:', error)
    return null
  }
}

/**
 * Prepara dados de usuário para Advanced Matching
 * @param {Object} userData - Dados do usuário (email, phone, firstName, lastName)
 * @returns {Promise<Object>} - Dados hasheados para o pixel
 */
export async function prepareUserData(userData = {}) {
  const prepared = {}

  try {
    // Email
    if (userData.email) {
      prepared.em = await hashValue(userData.email)
    }

    // Phone - remover caracteres especiais antes de hashear
    if (userData.phone) {
      const cleanPhone = userData.phone.replace(/[^0-9]/g, '')
      prepared.ph = await hashValue(cleanPhone)
    }

    // First Name
    if (userData.firstName) {
      prepared.fn = await hashValue(userData.firstName)
    }

    // Last Name
    if (userData.lastName) {
      prepared.ln = await hashValue(userData.lastName)
    }

    return prepared
  } catch (error) {
    console.error('Error preparing user data:', error)
    return {}
  }
}

/**
 * Envia evento customizado para o Meta Pixel com parâmetros avançados
 * @param {string} eventName - Nome do evento (ex: 'ViewContent', 'AddToCart')
 * @param {Object} eventData - Dados do evento
 * @param {Object} userData - Dados do usuário (opcional)
 */
export async function trackPixelEvent(eventName, eventData = {}, userData = {}) {
  if (typeof window === 'undefined' || !window.fbq) {
    console.warn('Meta Pixel not loaded')
    return
  }

  try {
    // Capturar parâmetros do Facebook
    const fbc = getFacebookClickId()
    const fbp = getFacebookBrowserId()

    // Preparar dados de usuário hasheados
    const hashedUserData = await prepareUserData(userData)

    // Montar objeto completo de dados do evento
    const fullEventData = {
      ...eventData,
      // Adicionar parâmetros avançados
      ...(fbc && { fbc }),
      ...(fbp && { fbp }),
    }

    // Enviar evento com Advanced Matching se houver dados de usuário
    if (Object.keys(hashedUserData).length > 0) {
      window.fbq('track', eventName, fullEventData, {
        eventID: `${eventName}_${Date.now()}`, // ID único do evento
        ...hashedUserData,
      })
    } else {
      window.fbq('track', eventName, fullEventData)
    }

    console.log(`Meta Pixel - ${eventName} tracked:`, fullEventData)
  } catch (error) {
    console.error(`Error tracking ${eventName}:`, error)
  }
}

/**
 * Formata dados de produto para o Meta Pixel
 * @param {Object} product - Dados do produto
 * @returns {Object} - Dados formatados
 */
export function formatProductData(product) {
  return {
    content_ids: [product.id || product.slug],
    content_name: product.name,
    content_type: 'product',
    value: product.price,
    currency: product.currency || 'USD',
  }
}

/**
 * Formata dados do carrinho para o Meta Pixel
 * @param {Array} cartItems - Items do carrinho
 * @returns {Object} - Dados formatados
 */
export function formatCartData(cartItems) {
  const contentIds = cartItems.map(item => item.id || item.slug)
  const value = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0)
  const numItems = cartItems.reduce((total, item) => total + item.quantity, 0)

  return {
    content_ids: contentIds,
    content_type: 'product',
    contents: cartItems.map(item => ({
      id: item.id || item.slug,
      quantity: item.quantity,
      item_price: item.price,
    })),
    num_items: numItems,
    value: value,
    currency: 'USD',
  }
}

/**
 * Inicializa captura automática do fbc
 * Deve ser chamado uma vez no carregamento da página
 */
export function initializeFacebookParams() {
  if (typeof window === 'undefined') return

  try {
    const fbc = getFacebookClickId()
    if (fbc) {
      saveFacebookClickId(fbc)
    }
  } catch (error) {
    console.error('Error initializing Facebook params:', error)
  }
}
