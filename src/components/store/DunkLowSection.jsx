'use client'

import CollectionCarousel from './CollectionCarousel'
import productsData from '../../../data/products.json'

const DunkLowSection = () => {
  // Usar apenas produtos seedream da categoria Dunk Low (IDs: 69-75)
  const dunkLowProducts = productsData.products.filter(p =>
    p.category === 'dunk-low' && p.seedreamVersion === true
  )

  return (
    <CollectionCarousel
      title="Nike Dunk Low"
      titleImage="/images/banners/dunk-low-banner.webp"
      subtitle="El estilo retro que nunca pasa de moda, desde las canchas a las calles"
      products={dunkLowProducts}
      categoryUrl="https://www.snkhouse.com/?s=dunk+low&post_type=product"
      emoji="🔥"
      badge="RETRO"
    />
  )
}

export default DunkLowSection
