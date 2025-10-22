'use client'

import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import { ShoppingCart, Eye } from 'lucide-react'
import { getImageConfig } from '@/utils/performance'

const ProductCard = ({ product, index = 0 }) => {
  const {
    name,
    slug,
    price,
    regularPrice,
    currency = 'USD',
    image,
    stock = 'available',
    tags = [],
  } = product

  const stockBadge = {
    available: { text: 'Disponible', color: 'bg-green-500' },
    limited: { text: 'Stock Limitado', color: 'bg-orange-500' },
    soldout: { text: 'Agotado', color: 'bg-red-500' },
  }

  const productUrl = `/product/${slug}`
  const imageConfig = getImageConfig(index, 20) // Assume 20 total products max

  return (
    <div className="hover:-translate-y-2 transition-all duration-300">
      <Link href={productUrl} className="block group">
        <div className="bg-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand-yellow/20">
          {/* Image Container */}
          <div className="relative aspect-[4/3] bg-black">
            {/* Stock Badge */}
            {stock !== 'available' && (
              <div className={`absolute top-2 left-2 z-10 ${stockBadge[stock].color} text-white text-[10px] font-bold px-2 py-0.5 rounded-md`}>
                {stockBadge[stock].text}
              </div>
            )}
            <Image
              src={image}
              alt={name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500"
              sizes="(max-width: 768px) 95vw, (max-width: 1200px) 45vw, 23vw"
              loading={imageConfig.loading}
              priority={imageConfig.priority}
              quality={imageConfig.quality}
            />
          </div>

          {/* Product Info - Black Background */}
          <div className="bg-black p-3 space-y-2">
            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex gap-1.5 flex-wrap">
                {tags.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] text-brand-yellow/80 bg-brand-yellow/10 px-1.5 py-0.5 rounded"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* Product Name */}
            <h3 className="text-white text-sm font-bold leading-tight group-hover:text-brand-yellow transition-colors min-h-[2.5rem]">
              {name}
            </h3>

            {/* Price and Stock */}
            <div className="space-y-1.5">
              {/* Regular Price (riscado) */}
              {regularPrice && regularPrice > price && (
                <p className="text-gray-400 text-sm line-through">
                  {currency === 'USD' ? '$' : 'AR$'} {regularPrice.toLocaleString()}
                </p>
              )}

              {/* Sale Price */}
              <p className="text-brand-yellow font-bold text-lg">
                {currency === 'USD' ? '$' : 'AR$'} {price.toLocaleString()}
              </p>

              {stock === 'available' && (
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-brand-yellow to-yellow-500 rounded-full">
                  <span className="text-black text-[10px] md:text-xs font-black uppercase tracking-tight md:tracking-wide whitespace-nowrap overflow-hidden text-ellipsis">COMPRA 1 LLEVA 2</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default ProductCard
