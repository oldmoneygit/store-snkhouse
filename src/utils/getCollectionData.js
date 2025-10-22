import productsData from '../../data/products.json'

/**
 * Busca uma coleção pelo slug
 * @param {string} slug - Slug da coleção (ex: "travis-scott")
 * @returns {object|null} - Coleção encontrada ou null
 */
export function getCollectionBySlug(slug) {
  const collection = productsData.categories.find((cat) => cat.slug === slug)
  return collection || null
}

/**
 * Busca produtos de uma coleção específica
 * @param {string} categorySlug - Slug da categoria
 * @returns {array} - Array de produtos da coleção
 */
export function getProductsByCollection(categorySlug) {
  // Mapeia o slug da coleção para a categoria do produto
  const categoryMapping = {
    'travis-scott': 'travis-scott',
    'jordan-low': 'air-jordan-1',
    'jordan-high': 'air-jordan-1',
    'jordan-mid': 'air-jordan-1',
    'air-jordan-1': 'air-jordan-1',
    'air-jordan-2': 'air-jordan-2',
    'air-jordan-3': 'air-jordan-3',
    'air-jordan-4': 'air-jordan-4',
    'air-jordan-5': 'air-jordan-5',
    'air-jordan-6': 'air-jordan-6',
    'air-jordan-11': 'air-jordan-1', // Jordan 11 estão em air-jordan-1 mas filtrados por nome
    'air-jordan-12': 'air-jordan-12',
    'air-jordan-13': 'air-jordan-13',
    'air-force': 'air-force-1',
    'air-force-1': 'air-force-1',
    'dunk-sb': 'dunk-low',
    'dunk-low': 'dunk-low',
    'yeezy': 'yeezy',
    'air-max': 'air-max',
    'new-balance': 'new-balance',
    'outros': 'outros',
  }

  const productCategory = categoryMapping[categorySlug]

  if (!productCategory) {
    return []
  }

  return productsData.products.filter((product) => {
    // Excluir produtos seedream (IDs 53-80) - esses são apenas para home
    if (product.seedreamVersion === true) {
      return false
    }

    // Verificar se o produto pertence à categoria
    const matchesCategory = product.category === productCategory

    if (!matchesCategory) {
      return false
    }

    // Para jordan-low, filtrar apenas os que têm "low" no nome
    if (categorySlug === 'jordan-low') {
      return product.name.toLowerCase().includes('low') && !product.name.toLowerCase().includes('jordan 11')
    }

    // Para jordan-mid, filtrar apenas os que têm "mid" no nome
    if (categorySlug === 'jordan-mid') {
      return product.name.toLowerCase().includes('mid')
    }

    // Para jordan-high, filtrar os que têm "high" no nome (excluir mid e low)
    if (categorySlug === 'jordan-high') {
      const name = product.name.toLowerCase()
      return name.includes('high') && !name.includes('mid') && !name.includes('low') && !name.includes('jordan 11')
    }

    // Para air-jordan-11, filtrar produtos com "jordan 11" no nome
    if (categorySlug === 'air-jordan-11') {
      return product.name.toLowerCase().includes('jordan 11')
    }

    // Para air-jordan-1 (geral), mostrar todos os Jordan 1 (exceto Jordan 11)
    if (categorySlug === 'air-jordan-1') {
      return !product.name.toLowerCase().includes('jordan 11')
    }

    // Para outras categorias, retornar todos os produtos da categoria
    return true
  })
}

/**
 * Retorna todos os slugs de coleções (usado para generateStaticParams)
 * @returns {array} - Array de objetos com { slug }
 */
export function getAllCollectionSlugs() {
  return productsData.categories.map((cat) => ({
    slug: cat.slug,
  }))
}
