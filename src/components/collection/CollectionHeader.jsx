'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'

const CollectionHeader = ({ name, image, productsCount }) => {
  return (
    <section className="relative py-12 md:py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
            {/* Left - Collection Image */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="order-2 md:order-1"
            >
              <div className="relative aspect-[4/5] rounded-2xl overflow-hidden bg-white/5">
                <Image
                  src={image}
                  alt={name}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </motion.div>

            {/* Right - Collection Info */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="order-1 md:order-2 space-y-6"
            >
              {/* Collection Name */}
              <div className="space-y-3">
                <p className="text-brand-yellow text-sm md:text-base font-bold uppercase tracking-wider">
                  Colección
                </p>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
                  {name}
                </h1>
              </div>

              {/* Product Count */}
              <div className="flex items-center gap-3 pb-6 border-b border-white/10">
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-bold text-brand-yellow">
                    {productsCount}
                  </span>
                  <span className="text-white/60 text-base md:text-lg">
                    {productsCount === 1 ? 'producto' : 'productos'}
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full mt-2" />
                  <p className="text-white/80 text-sm md:text-base">
                    Calidad Premium 1:1
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full mt-2" />
                  <p className="text-white/80 text-sm md:text-base">
                    Envío rápido y seguro
                  </p>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-2 h-2 bg-brand-yellow rounded-full mt-2" />
                  <p className="text-white/80 text-sm md:text-base">
                    Compra 1 Lleva 2
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CollectionHeader
