/**
 * Meta Pixel Events Component
 * Componente para enviar eventos específicos do Meta Pixel com parâmetros avançados
 */

'use client'

import { useEffect } from 'react'
import { trackPixelEvent, formatProductData, formatCartData } from '@/utils/metaPixelUtils'

/**
 * Evento ViewContent - Quando usuário visualiza um produto
 * @param {Object} product - Dados do produto
 */
export function ViewContent({ product }) {
  useEffect(() => {
    if (!product) return

    // Garantir que dispara apenas UMA vez por produto
    const productId = product.id || product.slug
    const tracked = sessionStorage.getItem(`viewcontent_${productId}`)

    if (!tracked) {
      const eventData = formatProductData(product)
      trackPixelEvent('ViewContent', eventData)

      // Marcar como rastreado nesta sessão
      sessionStorage.setItem(`viewcontent_${productId}`, Date.now().toString())
    }
  }, [product])

  return null
}

/**
 * Evento AddToCart - Quando usuário adiciona produto ao carrinho
 * (Este deve ser chamado no momento da ação, não como componente)
 */
export function triggerAddToCart(product, quantity = 1) {
  console.log('[DEBUG] triggerAddToCart called with:', { product: product?.name, quantity })

  if (!product) {
    console.error('[ERROR] triggerAddToCart: product is undefined or null')
    return
  }

  try {
    const eventData = {
      ...formatProductData(product),
      quantity,
    }

    console.log('[DEBUG] AddToCart eventData:', eventData)
    trackPixelEvent('AddToCart', eventData)
  } catch (error) {
    console.error('[ERROR] triggerAddToCart exception:', error)
  }
}

/**
 * Evento InitiateCheckout - Quando usuário inicia o processo de checkout
 * @param {Array} cartItems - Items do carrinho
 */
export function triggerInitiateCheckout(cartItems) {
  console.log('[DEBUG] triggerInitiateCheckout called with:', { itemCount: cartItems?.length })

  if (!cartItems || cartItems.length === 0) {
    console.error('[ERROR] triggerInitiateCheckout: cartItems is empty or undefined')
    return
  }

  try {
    const eventData = formatCartData(cartItems)
    console.log('[DEBUG] InitiateCheckout eventData:', eventData)
    trackPixelEvent('InitiateCheckout', eventData)
  } catch (error) {
    console.error('[ERROR] triggerInitiateCheckout exception:', error)
  }
}

/**
 * Evento Purchase - Quando compra é finalizada
 * @param {Object} purchaseData - Dados da compra
 */
export function triggerPurchase(purchaseData) {
  const { cartItems, total, orderId } = purchaseData

  const eventData = {
    ...formatCartData(cartItems),
    value: total,
    transaction_id: orderId,
  }

  trackPixelEvent('Purchase', eventData)
}

/**
 * Evento Search - Quando usuário faz uma busca
 * @param {string} searchQuery - Termo de busca
 */
export function triggerSearch(searchQuery) {
  trackPixelEvent('Search', {
    search_string: searchQuery,
  })
}

/**
 * Evento AddToWishlist - Quando usuário adiciona produto aos favoritos
 * @param {Object} product - Dados do produto
 */
export function triggerAddToWishlist(product) {
  const eventData = formatProductData(product)
  trackPixelEvent('AddToWishlist', eventData)
}
