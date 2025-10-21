'use client'

import CollectionCarousel from './CollectionCarousel'
import productsData from '../../../data/products.json'

const YeezySection = () => {
  // Usar apenas produtos seedream da categoria Yeezy (IDs: 76, 77)
  const yeezyProducts = productsData.products.filter(p =>
    p.category === 'yeezy' && p.seedreamVersion === true
  )

  return (
    <CollectionCarousel
      title="Yeezy"
      titleImage="/images/banners/yeezy-banner.webp"
      subtitle="La visión revolucionaria de Kanye West en colaboración con Adidas"
      products={yeezyProducts}
      categoryUrl="https://www.snkhouse.com/product-category/yeezy/"
      emoji="🌊"
      badge="EXCLUSIVO"
    />
  )
}

export default YeezySection
