'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import { IMAGES } from '@/utils/constants'
import { Footprints, Sparkles, Eye } from 'lucide-react'
import { useRef } from 'react'

export default function Experience() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 1.1])

  const features = [
    {
      icon: Eye,
      title: "Vista 360°",
      desc: "Explorá cada rincón"
    },
    {
      icon: Footprints,
      title: "Tu Recorrido",
      desc: "Diseñado para vos"
    },
    {
      icon: Sparkles,
      title: "Cada Detalle",
      desc: "Pensado al máximo"
    }
  ]

  return (
    <section ref={containerRef} className="relative min-h-screen flex items-center overflow-hidden bg-black">
      {/* Parallax Background Image */}
      <motion.div
        style={{ y, scale }}
        className="absolute inset-0"
      >
        <Image
          src={IMAGES.entrancePOV}
          alt="SNKHOUSE Experience POV"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black"></div>
        {/* Yellow glow effect */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-yellow/20 via-transparent to-transparent"></div>
      </motion.div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10 py-32">
        <motion.div
          style={{ opacity }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* Badge */}
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 glass-yellow mb-8 rounded-full"
          >
            <Footprints className="w-6 h-6 text-brand-yellow" />
            <span className="text-sm font-bold tracking-widest text-brand-yellow">
              EXPERIENCIA INMERSIVA
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h2
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-6xl md:text-8xl font-black mb-8"
          >
            <span className="text-white">Sentí la</span>
            <br />
            <motion.span
              initial={{ backgroundPosition: "0% 50%" }}
              animate={{ backgroundPosition: "100% 50%" }}
              transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
              className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent bg-[length:200%_auto]"
            >
              EXPERIENCIA
            </motion.span>
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-brand-gray mb-16 leading-relaxed"
          >
            Desde el momento que cruzás la puerta, cada paso es una experiencia
            <br className="hidden md:block" />
            diseñada para los verdaderos sneakerheads
          </motion.p>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05, y: -10 }}
                  className="glass p-8 rounded-2xl backdrop-blur-2xl group cursor-pointer"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow/10 border-2 border-brand-yellow/30 mb-6 group-hover:border-brand-yellow group-hover:bg-brand-yellow/20 transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-brand-yellow" />
                  </motion.div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-brand-gray group-hover:text-white transition-colors duration-300">
                    {feature.desc}
                  </p>
                </motion.div>
              )
            })}
          </div>

          {/* Bottom Quote */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            viewport={{ once: true }}
            className="glass-yellow p-8 md:p-12 rounded-3xl"
          >
            <div className="text-4xl md:text-5xl font-black text-brand-yellow mb-4">
              &ldquo;
            </div>
            <p className="text-xl md:text-2xl text-white font-bold italic mb-4">
              No es solo un showroom, es una experiencia que te cambia
            </p>
            <div className="h-1 w-24 bg-gradient-to-r from-brand-yellow to-transparent mx-auto"></div>
          </motion.div>
        </motion.div>
      </div>

      {/* Floating elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 5, 0]
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 left-10 w-32 h-32 rounded-full bg-brand-yellow/5 backdrop-blur-xl border border-brand-yellow/20"
      ></motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -5, 0]
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 right-10 w-24 h-24 rounded-full bg-brand-yellow/5 backdrop-blur-xl border border-brand-yellow/20"
      ></motion.div>
    </section>
  )
}
