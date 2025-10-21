'use client'

import { useCallback } from 'react'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import { motion } from 'framer-motion'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { getImageConfig } from '@/utils/performance'

const CollectionCarousel = ({
  title,
  titleImage,
  subtitle,
  products,
  categoryUrl,
  emoji = '👟',
  badge = 'COLECCIÓN'
}) => {
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

  if (!products || products.length === 0) return null

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
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
          className={titleImage ? "text-center mb-4" : "text-center mb-12"}
        >
          {!titleImage && (
            <div className="inline-flex items-center gap-2 px-4 py-2 glass-yellow mb-4">
              <span className="text-brand-yellow text-sm font-bold tracking-widest">{badge}</span>
            </div>
          )}
          {titleImage ? (
            <div className="flex justify-center items-center">
              <div className="relative w-full max-w-6xl h-32 md:h-48 lg:h-64">
                <Image
                  src={titleImage}
                  alt={title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          ) : (
            <>
              <h2 className="text-3xl md:text-5xl font-black mb-4">
                <span className="text-white text-3xl md:text-5xl font-black">{title} </span>
                <span className="text-brand-yellow text-3xl md:text-5xl font-black">{emoji}</span>
              </h2>
              {subtitle && (
                <p className="text-gray-400 text-base max-w-2xl mx-auto">
                  {subtitle}
                </p>
              )}
            </>
          )}
        </motion.div>

        {/* Carousel Container */}
        <div className={titleImage ? "relative max-w-5xl mx-auto px-4 md:px-8 py-8 bg-zinc-950/30 rounded-2xl border-l-4 border-brand-yellow/30" : "relative"}>
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex gap-6">
              {products.map((product, index) => {
                const imageConfig = getImageConfig(index, products.length)

                return (
                  <div
                    key={product.id}
                    className={titleImage
                      ? "flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(25%-18px)] min-w-0"
                      : "flex-[0_0_calc(50%-12px)] md:flex-[0_0_calc(50%-12px)] lg:flex-[0_0_calc(33.333%-16px)] min-w-0"
                    }
                  >
                    {titleImage ? (
                      <Link href={`https://www.snkhouse.com/product/${product.slug}/`} className="block h-full group">
                        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-brand-yellow/50 transition-all duration-300 h-full cursor-pointer hover:-translate-y-2">
                          {/* Product Image */}
                          <div className="relative aspect-square bg-white p-6">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              loading={imageConfig.loading}
                              priority={imageConfig.priority}
                              quality={imageConfig.quality}
                            />
                          </div>

                          {/* Product Info */}
                          <div className="p-6">
                            <h3 className="text-white font-semibold text-base mb-4 min-h-[3rem] line-clamp-2 group-hover:text-brand-yellow transition-colors">
                              {product.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-4">
                              {/* Regular Price (riscado) */}
                              {product.regularPrice && product.regularPrice > product.price && (
                                <p className="text-gray-400 text-sm line-through mb-1">
                                  {product.currency === 'USD' ? '$' : 'AR$'} {product.regularPrice.toLocaleString()}
                                </p>
                              )}

                              {/* Sale Price */}
                              <p className="text-brand-yellow font-bold text-base md:text-xl whitespace-nowrap">
                                {product.currency === 'USD' ? '$' : 'AR$'} {product.price.toLocaleString()}
                              </p>
                            </div>

                            {/* CTA Button */}
                            <div className="w-full bg-brand-yellow text-black font-bold py-1.5 px-2 md:py-2 md:px-4 rounded-full group-hover:bg-yellow-500 transition-all duration-300 transform group-hover:scale-105 uppercase text-[9px] md:text-[10px] text-center overflow-hidden text-ellipsis">
                              🔥 COMPRA 1 LLEVA 2
                            </div>
                          </div>
                        </div>
                      </Link>
                    ) : (
                      <Link href={`https://www.snkhouse.com/product/${product.slug}/`} className="block h-full group">
                        <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl overflow-hidden border border-zinc-800 hover:border-brand-yellow/50 transition-all duration-300 h-full cursor-pointer hover:-translate-y-2">
                          {/* Product Image */}
                          <div className="relative aspect-square bg-white p-6">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
                              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                              loading={imageConfig.loading}
                              priority={imageConfig.priority}
                              quality={imageConfig.quality}
                            />
                          </div>

                          {/* Product Info */}
                          <div className="p-6">
                            <h3 className="text-white font-semibold text-base mb-4 min-h-[3rem] line-clamp-2 group-hover:text-brand-yellow transition-colors">
                              {product.name}
                            </h3>

                            {/* Price */}
                            <div className="mb-4">
                              {/* Regular Price (riscado) */}
                              {product.regularPrice && product.regularPrice > product.price && (
                                <p className="text-gray-400 text-sm line-through mb-1">
                                  {product.currency === 'USD' ? '$' : 'AR$'} {product.regularPrice.toLocaleString()}
                                </p>
                              )}

                              {/* Sale Price */}
                              <p className="text-brand-yellow font-bold text-base md:text-xl whitespace-nowrap">
                                {product.currency === 'USD' ? '$' : 'AR$'} {product.price.toLocaleString()}
                              </p>
                            </div>

                            {/* CTA Button */}
                            <div className="w-full bg-brand-yellow text-black font-bold py-1.5 px-2 md:py-2 md:px-4 rounded-full group-hover:bg-yellow-500 transition-all duration-300 transform group-hover:scale-105 uppercase text-[9px] md:text-[10px] text-center overflow-hidden text-ellipsis">
                              🔥 COMPRA 1 LLEVA 2
                            </div>
                          </div>
                        </div>
                      </Link>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Navigation Buttons */}
          <button
            onClick={scrollPrev}
            className={titleImage
              ? "absolute left-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-brand-yellow border border-zinc-800 hover:border-brand-yellow rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
              : "absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-brand-yellow border border-zinc-800 hover:border-brand-yellow rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
            }
            aria-label="Previous slide"
          >
            <ChevronLeft className={titleImage ? "w-5 h-5 text-white group-hover:text-black" : "w-6 h-6 text-white group-hover:text-black"} />
          </button>

          <button
            onClick={scrollNext}
            className={titleImage
              ? "absolute right-0 top-1/2 -translate-y-1/2 w-10 h-10 bg-black/80 hover:bg-brand-yellow border border-zinc-800 hover:border-brand-yellow rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
              : "absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/80 hover:bg-brand-yellow border border-zinc-800 hover:border-brand-yellow rounded-full flex items-center justify-center transition-all duration-300 z-10 group"
            }
            aria-label="Next slide"
          >
            <ChevronRight className={titleImage ? "w-5 h-5 text-white group-hover:text-black" : "w-6 h-6 text-white group-hover:text-black"} />
          </button>
        </div>

        {/* View All Button */}
        {categoryUrl && !titleImage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Link
              href={categoryUrl}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black font-black text-lg rounded-full hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-300 group"
            >
              <span className="font-black">Ver Toda la Colección</span>
              <ExternalLink className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>

      {/* View All Button for hierarchical layout - inside the container */}
      {categoryUrl && titleImage && (
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-8 max-w-5xl mx-auto"
          >
            <Link
              href={categoryUrl}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black font-black text-lg rounded-full hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-300 group"
            >
              <span className="font-black">Ver Toda la Colección</span>
              <ExternalLink className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      )}
    </section>
  )
}

export default CollectionCarousel
