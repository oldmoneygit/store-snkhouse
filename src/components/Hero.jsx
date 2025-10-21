'use client'

import Image from '@/components/OptimizedImage'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Zap, Sparkles, MapPin, Calendar } from 'lucide-react'
import { IMAGES, LOCATION_DATA } from '@/utils/constants'
import { useRef } from 'react'

export default function Hero() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0.3])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div
        style={{ y }}
        className="absolute inset-0 z-0"
      >
        <Image
          src={IMAGES.hero}
          alt="SNKHOUSE Showroom Interior"
          fill
          priority
          quality={90}
          className="object-cover"
          sizes="100vw"
        />
        {/* Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/60 to-black/90"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
      </motion.div>

      {/* Grid Pattern Overlay */}
      <div
        className="absolute inset-0 opacity-5 z-[1]"
        style={{
          backgroundImage: 'linear-gradient(#FAB800 1px, transparent 1px), linear-gradient(90deg, #FAB800 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      {/* Content */}
      <motion.div
        style={{ opacity }}
        className="relative z-10 text-center max-w-6xl mx-auto px-4"
      >
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-6 py-3 glass-yellow mb-8 group hover:bg-brand-yellow/20 hover:border-brand-yellow transition-all duration-300 shadow-glow-yellow"
        >
          <Zap className="w-5 h-5 text-brand-yellow animate-pulse" />
          <span className="text-brand-yellow text-sm font-black tracking-widest">EN CONSTRUCCIÓN</span>
          <Sparkles className="w-5 h-5 text-brand-yellow" />
        </motion.div>

        {/* Main Title */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-7xl md:text-9xl font-black mb-8 leading-none tracking-tighter"
        >
          <span className="text-brand-yellow text-shadow-glow animate-pulse">SNK</span>
          <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.5)]">HOUSE</span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-300 to-white text-5xl md:text-7xl tracking-wider">
            SHOWROOM
          </span>
        </motion.h1>

        {/* Location Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="inline-flex items-center gap-3 px-8 py-4 glass mb-6 group hover:border-brand-yellow/60 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.4)]"
        >
          <MapPin className="w-5 h-5 text-brand-yellow group-hover:scale-110 transition-transform duration-300" />
          <span className="text-base font-bold text-gray-200">
            {LOCATION_DATA.neighborhood}, {LOCATION_DATA.city}
          </span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-500 text-sm mb-16 font-mono"
        >
          {LOCATION_DATA.fullAddress}
        </motion.div>

        {/* Opening Date Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="inline-flex items-center gap-3 px-6 py-3 glass-yellow shadow-glow-yellow"
        >
          <Calendar className="w-5 h-5 text-brand-yellow" />
          <span className="text-brand-yellow text-sm font-bold tracking-widest">
            INAUGURACIÓN FEB 2026
          </span>
        </motion.div>
      </motion.div>

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          rotate: [0, 45, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-10 w-20 h-20 border border-brand-yellow/30 z-[1]"
      />
      <motion.div
        animate={{
          rotate: [0, -45, 0],
          scale: [1, 1.2, 1]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-10 w-16 h-16 border border-purple-500/20 z-[1]"
      />

      {/* Animated Background Blobs */}
      <div className="fixed inset-0 opacity-20 pointer-events-none z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-[120px]"
        />
      </div>
    </section>
  )
}
