'use client'

import { useCallback } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import productsData from '../../../data/products.json'
import SectionTitle from './SectionTitle'
import { getImageConfig } from '@/utils/performance'

// Get products by their IDs
const getProductsByIds = (ids) => {
  return ids.map(id => productsData.products.find(p => p.id === id)).filter(Boolean)
}

// Best sellers product IDs (32 produtos da coleção seedream)
// IDs 53-57 = Travis Scott seedream
// IDs 58-77 = Coleções seedream (Jordan 1, Jordan 4, Dunk Low, Yeezy)
const bestSellerIds = [53, 58, 54, 61, 62, 63, 64, 55, 69, 70, 71, 72, 76, 77, 56, 21, 57, 23, 59, 60, 29, 30, 31, 65, 33, 66, 67, 68, 73, 74, 75, 41]

const BestSellers = () => {
  const bestSellersProducts = getProductsByIds(bestSellerIds)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      slidesToScroll: 1,
      breakpoints: {
        '(min-width: 768px)': { slidesToScroll: 2 },
        '(min-width: 1024px)': { slidesToScroll: 3 }
      }
    },
    [Autoplay({ delay: 5000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  const formatPrice = (price, currency = 'ARS') => {
    if (currency === 'USD') {
      return `$${price.toLocaleString()}`
    }
    return `AR$ ${price.toLocaleString()}`
  }

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-brand-black to-black overflow-hidden" id="bestsellers">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionTitle
          title="Los más vendidos"
          highlight="🔥"
          subtitle="Hemos separado las zapatillas más vendidas aquí en Sneaker House"
        />

        {/* Carousel */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {bestSellersProducts.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-[0_0_calc(50%-12px)] min-w-0 md:flex-[0_0_48%] lg:flex-[0_0_31%] xl:flex-[0_0_23%]"
                >
                  <Link href={`/product/${product.slug}`} className="block h-full group">
                    <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-brand-yellow/50 transition-all duration-300 h-full cursor-pointer">
                      {/* Product Image */}
                      <div className="relative aspect-square bg-white p-6">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                          loading={getImageConfig(index, bestSellersProducts.length).loading}
                          priority={getImageConfig(index, bestSellersProducts.length).priority}
                          sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          quality={getImageConfig(index, bestSellersProducts.length).quality}
                        />
                      </div>

                      {/* Product Info */}
                      <div className="p-6">
                        <h3 className="text-white font-semibold text-base mb-4 min-h-[3rem] line-clamp-2 group-hover:text-brand-yellow transition-colors">
                          {product.name}
                        </h3>

                        {/* Prices */}
                        <div className="mb-4">
                          {/* Regular Price (riscado) */}
                          {product.regularPrice && product.regularPrice > product.price && (
                            <p className="text-gray-400 text-sm line-through mb-1">
                              {formatPrice(product.regularPrice, product.currency)}
                            </p>
                          )}

                          {/* Sale Price */}
                          <p className="text-brand-yellow font-bold text-base md:text-xl whitespace-nowrap">
                            {formatPrice(product.price, product.currency)}
                          </p>
                        </div>

                        {/* CTA Button */}
                        <div className="w-full bg-brand-yellow text-black font-bold py-1.5 px-2 md:py-3 md:px-6 rounded-full group-hover:bg-yellow-500 transition-all duration-300 transform group-hover:scale-105 uppercase text-[10px] md:text-sm text-center whitespace-nowrap">
                          🔥 COMPRA 1 LLEVA 2
                        </div>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows (Hidden on mobile) */}
          <button
            onClick={scrollPrev}
            className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 bg-brand-yellow/90 hover:bg-brand-yellow text-black p-4 rounded-full z-10 transition-all duration-300 hover:scale-110"
            aria-label="Previous"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={scrollNext}
            className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 bg-brand-yellow/90 hover:bg-brand-yellow text-black p-4 rounded-full z-10 transition-all duration-300 hover:scale-110"
            aria-label="Next"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>

        {/* Dots Indicator */}
        <div className="flex justify-center gap-2 mt-8">
          <div className="w-2 h-2 rounded-full bg-brand-yellow"></div>
          <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
          <div className="w-2 h-2 rounded-full bg-zinc-700"></div>
        </div>
      </div>
    </section>
  )
}

export default BestSellers
