'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

const StoreHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden" id="hero">
      {/* Background Image - Full Screen, Clean */}
      <Image
        src="/images/hero/interior-symmetric-fisheye.jpg"
        alt="SNKHOUSE Interior"
        fill
        className="object-cover"
        priority
        quality={70}
        sizes="100vw"
      />

      {/* Subtle Bottom Gradient only (for readability) */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

      {/* Minimal Content at Bottom */}
      <div className="relative z-10 h-full flex flex-col justify-end pb-20 px-4">
        <div className="container mx-auto text-center md:text-left">
          {/* Small Tag */}
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block text-brand-yellow text-sm md:text-base font-bold uppercase tracking-wider mb-4"
          >
            Sneakers Exclusivos
          </motion.span>

          {/* Main CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="#products"
              className="inline-block px-8 py-4 bg-brand-yellow text-black font-bold uppercase tracking-wide text-sm md:text-base rounded-full hover:bg-yellow-400 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-brand-yellow/50"
            >
              Explorar Colección
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown size={32} className="text-white/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default StoreHero
