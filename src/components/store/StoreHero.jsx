'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const StoreHero = () => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="relative h-[70vh] md:h-[85vh] lg:h-screen w-full overflow-hidden" id="hero">
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
      <div className="relative z-10 h-full flex flex-col justify-end pb-12 md:pb-20 px-4">
        <div className="container mx-auto text-center md:text-left">
          {/* Small Tag */}
          <motion.span
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { duration: 0.6, delay: 0.2 }}
            className="inline-block text-brand-yellow text-xs md:text-sm font-bold uppercase tracking-wider mb-3 md:mb-4"
          >
            Sneakers Exclusivos
          </motion.span>

          {/* Main CTA */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 20 }}
            animate={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
            transition={shouldReduceMotion ? {} : { duration: 0.6, delay: 0.4 }}
          >
            <Link
              href="#products"
              className="inline-block px-6 py-3 md:px-8 md:py-4 bg-brand-yellow text-black font-bold uppercase tracking-wide text-xs md:text-sm rounded-full hover:bg-yellow-400 transition-colors duration-200 active:scale-95"
            >
              Explorar Colección
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator - Hidden on mobile */}
        {!shouldReduceMotion && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
            className="hidden md:block absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={32} className="text-white/60" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </section>
  )
}

export default StoreHero
