/**
 * Retorna o Shopify Variant ID correto baseado no país atual
 *
 * Suporta tanto estrutura antiga (string) quanto nova (objeto multi-país):
 * - Antiga: "gid://shopify/ProductVariant/123"
 * - Nova: { "AR": "gid://...", "MX": "gid://..." }
 *
 * @param {string|object} variantId - Variant ID (string ou objeto multi-país)
 * @param {string} countryCode - Código do país (AR, MX)
 * @returns {string|null} - Variant ID do Shopify para o país atual
 */
export function getShopifyVariantId(variantId, countryCode = 'AR') {
  // Se não tem variantId, retornar null
  if (!variantId) return null

  // Se é string (estrutura antiga), retornar direto
  if (typeof variantId === 'string') {
    return variantId
  }

  // Se é objeto (estrutura nova multi-país), retornar ID do país
  if (typeof variantId === 'object' && variantId !== null) {
    return variantId[countryCode] || null
  }

  return null
}

/**
 * Retorna o Shopify Product ID correto baseado no país atual
 * Mesma lógica do getShopifyVariantId mas para IDs de produtos
 */
export function getShopifyProductId(productId, countryCode = 'AR') {
  if (!productId) return null

  if (typeof productId === 'string') {
    return productId
  }

  if (typeof productId === 'object' && productId !== null) {
    return productId[countryCode] || null
  }

  return null
}
