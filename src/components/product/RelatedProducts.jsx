'use client'

import ProductCard from '@/components/store/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useRef } from 'react'

const RelatedProducts = ({ products, categoryName }) => {
  const scrollContainerRef = useRef(null)

  const scroll = (direction) => {
    const container = scrollContainerRef.current
    if (!container) return

    const scrollAmount = 300
    const newScrollPosition =
      direction === 'left'
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount

    container.scrollTo({
      left: newScrollPosition,
      behavior: 'smooth',
    })
  }

  if (!products || products.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-white">
              Productos <span className="text-brand-yellow">Relacionados</span>
            </h2>
            {categoryName && (
              <p className="text-white/60 text-sm mt-1">
                Más productos de {categoryName}
              </p>
            )}
          </div>

          {/* Navigation Buttons */}
          <div className="hidden md:flex gap-2">
            <button
              onClick={() => scroll('left')}
              className="w-10 h-10 bg-white/5 hover:bg-brand-yellow hover:text-black text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-10 h-10 bg-white/5 hover:bg-brand-yellow hover:text-black text-white rounded-full flex items-center justify-center transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Products Carousel */}
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide snap-x snap-mandatory"
          style={{
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {products.map((product, index) => (
            <div
              key={product.id}
              className="flex-shrink-0 w-[280px] snap-start"
            >
              <ProductCard product={product} index={index} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  )
}

export default RelatedProducts
