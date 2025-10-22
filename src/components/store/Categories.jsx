'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import productsData from '../../../data/products.json'
import SectionTitle from './SectionTitle'

const Categories = () => {
  // Apenas as 6 coleções principais para a página inicial
  const mainCollectionSlugs = ['travis-scott', 'jordan-low', 'jordan-high', 'air-force', 'dunk-sb', 'yeezy']
  const categories = productsData.categories.filter(cat =>
    mainCollectionSlugs.includes(cat.slug || cat.id)
  )

  return (
    <section className="relative py-20 bg-black" id="categories">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <SectionTitle
          title="Nuestras"
          highlight="Colecciones"
          className="mb-16"
        />

        {/* Categories Grid - 2 columns mobile, 3 columns desktop - APENAS IMAGENS (TAMANHO COMPLETO) */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link href={`/collection/${category.slug}`}>
                <div className="relative overflow-hidden rounded-xl aspect-[5/7]">
                  {/* Apenas a Imagem - SEM texto, SEM overlay - TAMANHO COMPLETO */}
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-contain group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Categories
