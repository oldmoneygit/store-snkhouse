'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'

const SeedreamGallery = () => {
  const galleryImages = [
    {
      src: '/images/gallery/product-jordan1-blacktoe.jpg',
      alt: 'Air Jordan 1 Black Toe en exhibición',
      span: 'md:col-span-2 md:row-span-2', // Large
    },
    {
      src: '/images/gallery/neon-snkhouse-2.jpg',
      alt: 'Neon SNKHOUSE',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      src: '/images/gallery/interior-wide-angle-1.jpg',
      alt: 'Interior SNKHOUSE vista amplia',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      src: '/images/gallery/product-jordan1-mocha.jpg',
      alt: 'Air Jordan 1 Mocha',
      span: 'md:col-span-1 md:row-span-1',
    },
    {
      src: '/images/gallery/interior-detail-1.jpg',
      alt: 'Detalle interior',
      span: 'md:col-span-1 md:row-span-1',
    },
  ]

  return (
    <section className="relative py-20 bg-zinc-950">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-brand-yellow uppercase tracking-widest text-sm font-bold mb-4 block">
            Nuestra Tienda
          </span>
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Experiencia <span className="text-brand-yellow text-3xl md:text-5xl font-bold">Premium</span>
          </h2>
        </motion.div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-4">
          {galleryImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={`group relative overflow-hidden rounded-2xl ${image.span} min-h-[300px]`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-700"
              />
              {/* Subtle overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default SeedreamGallery
