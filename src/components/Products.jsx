'use client'

import Image from '@/components/OptimizedImage'
import { motion } from 'framer-motion'
import { Star } from 'lucide-react'
import { PRODUCTS_DATA } from '@/utils/constants'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0 }
}

export default function Products() {
  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-black via-brand-yellow/5 to-black">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-yellow mb-4">
            <Star className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-bold tracking-widest text-brand-yellow">
              PRODUCTOS PREMIUM
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">
              Exclusividad
            </span>{' '}
            <span className="text-white">& Calidad</span>
          </h2>
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto"
        >
          {PRODUCTS_DATA.map((product, idx) => (
            <motion.div
              key={idx}
              variants={item}
              className="relative group overflow-hidden"
            >
              {/* Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-yellow/30 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500 z-0" />

              {/* Card */}
              <div className="relative glass overflow-hidden group-hover:border-brand-yellow/50 transition-all duration-300">
                {/* Image */}
                <div className="aspect-square overflow-hidden relative">
                  <Image
                    src={product.img}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>

                {/* Content */}
                <div className="p-6 bg-gradient-to-t from-black/80 to-transparent">
                  <h3 className="text-lg font-black text-white mb-1">
                    {product.title}
                  </h3>
                  <p className="text-sm text-brand-yellow">{product.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
