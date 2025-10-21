'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import { IMAGES } from '@/utils/constants'
import { Building2, MapPin, Navigation, Zap } from 'lucide-react'
import { useRef } from 'react'

export default function ExteriorShowcase() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, -200])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.2, 1, 0.9])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.5, 1, 1, 0.5])

  const highlights = [
    {
      icon: Building2,
      value: "180m²",
      label: "Espacio Premium"
    },
    {
      icon: MapPin,
      value: "Palermo",
      label: "Buenos Aires"
    },
    {
      icon: Zap,
      value: "2026",
      label: "Inauguración"
    },
    {
      icon: Navigation,
      value: "Godoy Cruz 2539",
      label: "Ubicación"
    }
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen overflow-hidden bg-black">
      {/* Parallax Image Background */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <Image
          src={IMAGES.hero}
          alt="SNKHOUSE Aerial View"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Gradient overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black opacity-80"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>
        {/* Yellow accent glow */}
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-brand-yellow/20 to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 min-h-screen flex flex-col justify-center py-32">
        <motion.div
          style={{ opacity }}
          className="max-w-6xl mx-auto"
        >
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 2, -2, 0]
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center gap-3 px-8 py-4 glass-yellow rounded-full"
            >
              <Building2 className="w-6 h-6 text-brand-yellow" />
              <span className="text-sm font-bold tracking-widest text-brand-yellow">
                EL PRIMER SHOWROOM PREMIUM DE ARGENTINA
              </span>
            </motion.div>
          </motion.div>

          {/* Main Title */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <h2 className="text-6xl md:text-8xl lg:text-9xl font-black mb-6">
              <motion.span
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
                className="block text-white"
              >
                SNKHOUSE
              </motion.span>
              <motion.span
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                viewport={{ once: true }}
                className="block bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent"
              >
                PALERMO
              </motion.span>
            </h2>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl text-brand-gray max-w-3xl mx-auto"
            >
              El destino definitivo para sneakerheads en el corazón de Buenos Aires
            </motion.p>
          </motion.div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {highlights.map((item, index) => {
              const Icon = item.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50, scale: 0.8 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{
                    duration: 0.6,
                    delay: 0.6 + index * 0.1,
                    type: "spring",
                    bounce: 0.4
                  }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    rotate: [0, -5, 5, 0],
                    transition: { duration: 0.3 }
                  }}
                  className="glass backdrop-blur-2xl p-6 md:p-8 rounded-2xl text-center group cursor-pointer border-2 border-white/5 hover:border-brand-yellow/50 transition-all duration-300"
                >
                  <motion.div
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow/10 border-2 border-brand-yellow/30 mb-4 group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-brand-yellow" />
                  </motion.div>

                  <div className="text-3xl md:text-4xl font-black text-brand-yellow mb-2 font-mono">
                    {item.value}
                  </div>
                  <div className="text-sm text-brand-gray group-hover:text-white transition-colors duration-300 uppercase tracking-wider">
                    {item.label}
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            viewport={{ once: true }}
            className="mt-20 text-center"
          >
            <div className="glass-yellow p-8 md:p-12 rounded-3xl inline-block">
              <div className="flex items-center gap-4 justify-center">
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-brand-yellow"
                ></motion.div>
                <p className="text-xl md:text-2xl font-bold text-white">
                  Una ubicación icónica para una experiencia única
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Decorative floating shapes */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 180, 360],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-1/4 left-10 w-40 h-40 rounded-full border-2 border-brand-yellow/20"
      ></motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [360, 180, 0],
          opacity: [0.3, 0.6, 0.3]
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-1/4 right-10 w-32 h-32 rounded-full border-2 border-brand-yellow/20"
      ></motion.div>
    </section>
  )
}
