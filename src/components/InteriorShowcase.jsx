'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import { IMAGES } from '@/utils/constants'
import { Layers, Package, ShoppingBag, Star } from 'lucide-react'
import { useRef } from 'react'

export default function InteriorShowcase() {
  const containerRef = useRef(null)
  const imageRef = useRef(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const { scrollYProgress: imageScroll } = useScroll({
    target: imageRef,
    offset: ["start end", "end start"]
  })

  const x = useTransform(imageScroll, [0, 1], [-100, 100])
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])

  const interiorFeatures = [
    {
      icon: Layers,
      title: "500+ Modelos",
      desc: "Colección curada de sneakers premium",
      color: "from-yellow-500/20 to-yellow-500/5"
    },
    {
      icon: ShoppingBag,
      title: "Ediciones Limitadas",
      desc: "Drops exclusivos y colaboraciones únicas",
      color: "from-orange-500/20 to-orange-500/5"
    },
    {
      icon: Star,
      title: "Importados 1:1",
      desc: "Mesmas fábricas da Nike",
      color: "from-blue-500/20 to-blue-500/5"
    },
    {
      icon: Package,
      title: "Condición Perfecta",
      desc: "Almacenamiento y cuidado profesional",
      color: "from-purple-500/20 to-purple-500/5"
    }
  ]

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-gradient-to-b from-black via-brand-yellow/5 to-black">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          style={{ opacity }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            whileInView={{ scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 glass-yellow mb-8 rounded-full"
          >
            <Layers className="w-6 h-6 text-brand-yellow" />
            <span className="text-sm font-bold tracking-widest text-brand-yellow">
              INTERIOR PREMIUM
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-5xl md:text-7xl font-black mb-6"
          >
            <span className="text-white">180m² de</span>
            <br />
            <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
              PURO DISEÑO
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            viewport={{ once: true }}
            className="text-xl text-brand-gray max-w-3xl mx-auto"
          >
            Cada detalle pensado para crear la experiencia sneaker definitiva
          </motion.p>
        </motion.div>

        {/* Main Image with Parallax */}
        <div ref={imageRef} className="mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="relative rounded-3xl overflow-hidden"
          >
            {/* Glowing border */}
            <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/20 via-transparent to-brand-yellow/20 rounded-3xl blur-xl"></div>

            {/* Image container */}
            <div className="relative aspect-[21/9] overflow-hidden rounded-3xl border-2 border-brand-yellow/20">
              <motion.div style={{ x }} className="w-full h-full">
                <Image
                  src={IMAGES.interiorWidePanoramic}
                  alt="SNKHOUSE Interior Panorámico"
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </motion.div>

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>

              {/* Floating badge on image */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.6, delay: 0.5, type: "spring", bounce: 0.5 }}
                viewport={{ once: true }}
                className="absolute bottom-8 left-8 glass-yellow px-6 py-4 rounded-2xl"
              >
                <div className="text-3xl font-black text-brand-yellow mb-1 font-mono">
                  180m²
                </div>
                <div className="text-sm text-white uppercase tracking-wider">
                  De Experiencia Premium
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {interiorFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -10 }}
                className="group cursor-pointer"
              >
                <div className={`relative glass p-8 rounded-2xl border-2 border-white/5 group-hover:border-brand-yellow/30 transition-all duration-300 bg-gradient-to-br ${feature.color}`}>
                  {/* Icon */}
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.2 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-brand-yellow/10 border-2 border-brand-yellow/30 mb-6 group-hover:bg-brand-yellow/20 group-hover:border-brand-yellow transition-all duration-300"
                  >
                    <Icon className="w-8 h-8 text-brand-yellow" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-brand-yellow transition-colors duration-300">
                    {feature.title}
                  </h3>
                  <p className="text-brand-gray leading-relaxed group-hover:text-white transition-colors duration-300">
                    {feature.desc}
                  </p>

                  {/* Hover line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    className="h-1 bg-gradient-to-r from-brand-yellow to-transparent mt-6 origin-left"
                  ></motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Quote */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="glass p-12 rounded-3xl max-w-4xl mx-auto border-2 border-brand-yellow/20">
            <motion.div
              animate={{
                scale: [1, 1.05, 1]
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Star className="w-12 h-12 text-brand-yellow mx-auto mb-6" />
            </motion.div>

            <p className="text-2xl md:text-3xl font-bold text-white mb-4">
              Diseñado para sneakerheads por sneakerheads
            </p>
            <div className="h-1 w-32 bg-gradient-to-r from-transparent via-brand-yellow to-transparent mx-auto"></div>
          </div>
        </motion.div>
      </div>

      {/* Floating animated shapes */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 90, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-32 h-32 border-2 border-brand-yellow/20 rounded-2xl"
      ></motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [0, -90, 0],
          opacity: [0.2, 0.5, 0.2]
        }}
        transition={{
          duration: 7,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20 w-24 h-24 border-2 border-brand-yellow/20 rounded-full"
      ></motion.div>
    </section>
  )
}
