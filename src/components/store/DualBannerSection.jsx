'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'

const DualBannerSection = () => {
  const banners = [
    {
      id: 1,
      title: 'SB Dunk Low',
      subtitle: 'Strange Love',
      image: '/images/banners/strange-love-banner.webp',
      link: 'https://www.snkhouse.com/product/nike-sb-dunk-low-strange-love-skateboards/',
      bgColor: 'from-pink-200/20 to-red-200/20'
    },
    {
      id: 2,
      title: 'SB Dunk Low x Travis Scott',
      subtitle: 'Cactus Jack',
      image: '/images/banners/cactus-jack-banner.webp',
      link: 'https://www.snkhouse.com/product/nike-sb-dunk-low-x-travis-scott/',
      bgColor: 'from-amber-200/20 to-yellow-200/20'
    }
  ]

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
        {/* Grid Layout - 2 columns on desktop, 1 on mobile */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 max-w-5xl mx-auto">
          {banners.map((banner, index) => (
            <motion.div
              key={banner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative aspect-[5/6] overflow-hidden rounded-xl"
            >
              <Link href={banner.link}>
                {/* Background Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${banner.bgColor}`} />

                {/* Banner Image */}
                <div className="relative w-full h-full">
                  <Image
                    src={banner.image}
                    alt={`${banner.title} ${banner.subtitle}`}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    quality={90}
                  />
                </div>

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                {/* Bottom CTA on Hover */}
                <div className="absolute bottom-0 left-0 right-0 p-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-300 text-xs font-semibold mb-1">
                        {banner.title}
                      </p>
                      <h3 className="text-white text-lg font-black">
                        {banner.subtitle}
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-brand-yellow text-black font-bold rounded-full text-sm">
                      <span>Comprar</span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default DualBannerSection
