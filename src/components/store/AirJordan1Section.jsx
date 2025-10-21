'use client'

import CollectionCarousel from './CollectionCarousel'
import productsData from '../../../data/products.json'

const AirJordan1Section = () => {
  // Usar apenas produtos seedream da categoria Air Jordan 1 (IDs: 58, 59, 60)
  const jordan1Products = productsData.products.filter(p =>
    p.category === 'air-jordan-1' && p.seedreamVersion === true
  )

  return (
    <CollectionCarousel
      title="Air Jordan 1"
      titleImage="/images/banners/air-jordan-1-banner.webp"
      subtitle="El icónico modelo que revolucionó el mundo del sneaker"
      products={jordan1Products}
      categoryUrl="https://www.snkhouse.com/?s=AIR+JORDAN+1&post_type=product"
      emoji="👑"
      badge="ICONO"
    />
  )
}

export default AirJordan1Section
