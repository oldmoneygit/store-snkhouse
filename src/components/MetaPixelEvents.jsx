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

    const eventData = formatProductData(product)
    trackPixelEvent('ViewContent', eventData)
  }, [product])

  return null
}

/**
 * Evento AddToCart - Quando usuário adiciona produto ao carrinho
 * (Este deve ser chamado no momento da ação, não como componente)
 */
export function triggerAddToCart(product, quantity = 1) {
  const eventData = {
    ...formatProductData(product),
    quantity,
  }
  trackPixelEvent('AddToCart', eventData)
}

/**
 * Evento InitiateCheckout - Quando usuário inicia o processo de checkout
 * @param {Array} cartItems - Items do carrinho
 */
export function triggerInitiateCheckout(cartItems) {
  const eventData = formatCartData(cartItems)
  trackPixelEvent('InitiateCheckout', eventData)
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
