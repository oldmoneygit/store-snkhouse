'use client'

import { useCallback } from 'react'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import productsData from '../../../data/products.json'

const TravisScottSection = () => {
  // Filter Travis Scott products - ONLY original images (exclude seedream versions)
  const travisProducts = productsData.products
    .filter(product => product.category === 'travis-scott' && !product.seedreamVersion)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
      skipSnaps: false,
      dragFree: false,
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  if (travisProducts.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-zinc-950 to-black relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #FAB800 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-yellow mb-4">
            <span className="text-brand-yellow text-sm font-bold tracking-widest">COLECCIÓN EXCLUSIVA</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black mb-4">
            <span className="text-white text-3xl md:text-5xl font-black">Travis Scott x Jordan </span>
            <span className="text-brand-yellow text-3xl md:text-5xl font-black">🔥</span>
          </h2>
          <p className="text-gray-400 text-base max-w-2xl mx-auto">
            Las colaboraciones más icónicas entre Travis Scott y Jordan Brand
          </p>
        </motion.div>

        {/* Carousel Container */}
        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-4">
              {travisProducts.map((product) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="flex-[0_0_calc(50%-8px)] md:flex-[0_0_calc(33.333%-11px)] lg:flex-[0_0_calc(20%-13px)] min-w-0"
                >
                  <Link href={`https://www.snkhouse.com/product/${product.slug}/`} className="block group">
                    <div className="bg-black rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand-yellow/20">
                      {/* Image Container */}
                      <div className="relative aspect-[4/3] bg-black">
                        {/* Featured Badge */}
                        {product.featured && (
                          <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-brand-yellow text-black text-[10px] font-black rounded-md">
                            DESTACADO
                          </div>
                        )}
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 33vw, 20vw"
                        />
                      </div>

                      {/* Product Info - Black Background */}
                      <div className="bg-black p-3 space-y-2">
                        <h3 className="text-white text-xs font-bold leading-tight group-hover:text-brand-yellow transition-colors min-h-[2.5rem]">
                          {product.name}
                        </h3>

                        <div className="space-y-1.5">
                          {/* Regular Price (riscado) */}
                          {product.regularPrice && product.regularPrice > product.price && (
                            <p className="text-gray-400 text-sm line-through">
                              {product.currency === 'USD' ? '$' : 'AR$'} {product.regularPrice.toLocaleString()}
                            </p>
                          )}

                          {/* Sale Price */}
                          <p className="text-brand-yellow font-bold text-sm md:text-lg whitespace-nowrap">
                            {product.currency === 'USD' ? '$' : 'AR$'} {product.price.toLocaleString()}
                          </p>

                          {product.stock === 'available' && (
                            <div className="inline-flex items-center gap-1 px-2 py-1 md:px-3 md:py-1.5 bg-gradient-to-r from-brand-yellow to-yellow-500 rounded-full">
                              <span className="text-black text-[9px] md:text-[10px] font-black uppercase tracking-tight md:tracking-wide whitespace-nowrap">COMPRA 1 LLEVA 2</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-brand-yellow border border-zinc-800 hover:border-brand-yellow rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
            aria-label="Previous slide"
          >
            <ChevronLeft className="w-6 h-6 text-white group-hover:text-black" />
          </button>

          <button
            onClick={scrollNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-brand-yellow border border-zinc-800 hover:border-brand-yellow rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
            aria-label="Next slide"
          >
            <ChevronRight className="w-6 h-6 text-white group-hover:text-black" />
          </button>
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="https://snkhouse.com/categoria/travis-scott"
            className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black font-black text-lg rounded-full hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-300 group"
          >
            <span className="font-black">Ver Toda la Colección</span>
            <ExternalLink className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default TravisScottSection
