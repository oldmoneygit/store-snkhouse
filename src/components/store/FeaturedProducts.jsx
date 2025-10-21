'use client'

import { motion } from 'framer-motion'
import ProductCard from './ProductCard'
import productsData from '../../../data/products.json'

const FeaturedProducts = () => {
  // IDs dos produtos em destaque (imagens editadas da seedream)
  // IDs 53, 55, 56, 57 = Travis Scott seedream
  // IDs 58-77 = Coleções seedream (Jordan 1, Jordan 4, Dunk Low, Yeezy)
  const featuredIds = [61, 77, 69, 64, 53, 68, 62, 71, 74, 75, 72, 55, 41]
  const featuredProducts = featuredIds.map(id => productsData.products.find(p => p.id === id)).filter(Boolean)

  return (
    <section className="relative py-20 bg-black" id="products">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-yellow uppercase tracking-widest text-sm font-bold mb-4 block">
            Colección Exclusiva
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Productos en <span className="text-brand-yellow text-3xl md:text-5xl font-bold">Destaque</span>
          </h2>
          <p className="text-white/60 text-lg max-w-2xl mx-auto">
            Los sneakers más codiciados del momento. Ediciones limitadas y colaboraciones exclusivas.
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-7xl mx-auto">
          {featuredProducts.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="https://snkhouse.com/loja"
            className="inline-block px-8 py-4 bg-transparent border-2 border-brand-yellow text-brand-yellow font-bold uppercase tracking-wide rounded-full transition-all duration-300 hover:bg-brand-yellow hover:text-black hover:scale-105"
          >
            Ver Todos los Productos
          </a>
        </motion.div>
      </div>

      {/* Background Decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-brand-yellow/5 blur-[120px] pointer-events-none" />
    </section>
  )
}

export default FeaturedProducts
