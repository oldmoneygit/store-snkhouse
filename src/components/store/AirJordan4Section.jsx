'use client'

import CollectionCarousel from './CollectionCarousel'
import productsData from '../../../data/products.json'

const AirJordan4Section = () => {
  // Usar apenas produtos seedream da categoria Air Jordan 4 (IDs: 61-68)
  const jordan4Products = productsData.products.filter(p =>
    p.category === 'air-jordan-4' && p.seedreamVersion === true
  )

  return (
    <CollectionCarousel
      title="Air Jordan 4"
      titleImage="/images/banners/air-jordan-4-banner.webp"
      subtitle="Performance y estilo en uno de los diseños más versátiles de Jordan Brand"
      products={jordan4Products}
      categoryUrl="/collection/air-jordan-4"
      emoji="⚡"
      badge="CLÁSICO"
    />
  )
}

export default AirJordan4Section
