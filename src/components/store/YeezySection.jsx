'use client'

import CollectionCarousel from './CollectionCarousel'
import productsData from '../../../data/products.json'

const YeezySection = () => {
  // Mostrar APENAS produtos Yeezy seedream (versões melhoradas para homepage)
  const yeezyProducts = productsData.products.filter(p =>
    p.category === 'yeezy' && p.seedreamVersion === true
  )

  return (
    <CollectionCarousel
      title="Yeezy"
      titleImage="/images/banners/yeezy-banner.webp"
      subtitle="La visión revolucionaria de Kanye West en colaboración con Adidas"
      products={yeezyProducts}
      categoryUrl="/collection/yeezy"
      emoji="🌊"
      badge="EXCLUSIVO"
    />
  )
}

export default YeezySection
