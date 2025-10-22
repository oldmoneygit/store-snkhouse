import productsData from '../../data/products.json'

/**
 * Busca um produto pelo slug
 * @param {string} slug - Slug do produto (ex: "nike-air-jordan-1-retro-high-dior")
 * @returns {object|null} - Produto encontrado ou null
 */
export function getProductBySlug(slug) {
  // Priorizar produtos com shopifyVariantId (IDs 53-77 foram importados para Shopify)
  const productsWithSlug = productsData.products.filter(p => p.slug === slug)

  if (productsWithSlug.length === 0) return null

  // Se há múltiplos produtos com mesmo slug, priorizar o que tem shopifyProductId
  const productWithShopify = productsWithSlug.find(p => p.shopifyProductId)

  return productWithShopify || productsWithSlug[0]
}

/**
 * Busca produtos relacionados (mesma categoria, excluindo o produto atual)
 * @param {string} currentSlug - Slug do produto atual
 * @param {string} category - Categoria do produto
 * @param {number} limit - Número máximo de produtos relacionados (padrão: 4)
 * @returns {array} - Array de produtos relacionados
 */
export function getRelatedProducts(currentSlug, category, limit = 4) {
  // Agrupar produtos por slug e priorizar os que têm shopifyProductId
  const uniqueProducts = {}

  productsData.products.forEach(p => {
    if (p.category === category && p.slug !== currentSlug) {
      // Se já existe produto com este slug, priorizar o que tem Shopify ID
      if (uniqueProducts[p.slug]) {
        if (p.shopifyProductId && !uniqueProducts[p.slug].shopifyProductId) {
          uniqueProducts[p.slug] = p
        }
      } else {
        uniqueProducts[p.slug] = p
      }
    }
  })

  const relatedProducts = Object.values(uniqueProducts)

  // Embaralha e retorna apenas os primeiros 'limit' produtos
  return relatedProducts
    .sort(() => Math.random() - 0.5)
    .slice(0, limit)
}

/**
 * Retorna todos os slugs de produtos (usado para generateStaticParams)
 * @returns {array} - Array de objetos com { slug }
 */
export function getAllProductSlugs() {
  // Remover duplicatas - priorizar produtos com shopifyProductId
  const uniqueSlugs = new Set()
  const slugs = []

  // Primeiro, adicionar produtos com shopifyProductId
  productsData.products.forEach(p => {
    if (p.shopifyProductId && !uniqueSlugs.has(p.slug)) {
      uniqueSlugs.add(p.slug)
      slugs.push({ slug: p.slug })
    }
  })

  // Depois, adicionar produtos sem shopifyProductId (se slug ainda não existe)
  productsData.products.forEach(p => {
    if (!p.shopifyProductId && !uniqueSlugs.has(p.slug)) {
      uniqueSlugs.add(p.slug)
      slugs.push({ slug: p.slug })
    }
  })

  return slugs
}
