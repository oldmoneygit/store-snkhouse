'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import { IMAGES } from '@/utils/constants'
import { Camera, Maximize2, MapPin } from 'lucide-react'
import { useRef } from 'react'

export default function Gallery() {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y1 = useTransform(scrollYProgress, [0, 1], [100, -100])
  const y2 = useTransform(scrollYProgress, [0, 1], [-100, 100])
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  const galleryImages = [
    {
      src: IMAGES.interiorSymmetric,
      title: "Simetría Perfecta",
      desc: "Vista fisheye del showroom completo",
      size: "large", // Ocupa 2 colunas
      icon: Maximize2
    },
    {
      src: IMAGES.interiorBuenosAires,
      title: "Vista de Buenos Aires",
      desc: "Interior con cityscape",
      size: "medium",
      icon: MapPin
    },
    {
      src: IMAGES.entranceOutside,
      title: "Entrada Principal",
      desc: "Blue hour exterior",
      size: "medium",
      icon: Camera
    },
    {
      src: IMAGES.entrancePOV,
      title: "Tu Experiencia",
      desc: "POV primera persona",
      size: "large",
      icon: Camera
    }
  ]

  return (
    <section ref={containerRef} className="relative py-32 overflow-hidden bg-black">
      {/* Animated background */}
      <motion.div
        style={{ y: y1 }}
        className="absolute top-0 left-0 w-full h-full"
      >
        <div className="absolute top-20 left-20 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      </motion.div>
      <motion.div
        style={{ y: y2 }}
        className="absolute bottom-0 right-0 w-full h-full"
      >
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      </motion.div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, type: "spring" }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-6 py-3 glass-yellow mb-6 rounded-full"
          >
            <Camera className="w-5 h-5 text-brand-yellow" />
            <span className="text-sm font-bold tracking-widest text-brand-yellow">
              GALERÍA PREMIUM
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-7xl font-black mb-6">
            <span className="text-white">Conocé el</span>
            <br />
            <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
              SNKHOUSE
            </span>
          </h2>

          <p className="text-brand-gray text-lg md:text-xl max-w-2xl mx-auto">
            180m² de experiencia sneaker premium en el corazón de Palermo
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-7xl mx-auto">
          {galleryImages.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`relative group cursor-pointer ${
                  item.size === 'large' ? 'md:col-span-2' : 'md:col-span-1'
                }`}
              >
                {/* Glass border effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-transparent rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Card */}
                <div className="relative overflow-hidden rounded-3xl glass border-2 border-white/5 group-hover:border-brand-yellow/30 transition-all duration-500">
                  {/* Image */}
                  <div className={`relative ${
                    item.size === 'large' ? 'aspect-[21/9]' : 'aspect-square'
                  } overflow-hidden`}>
                    <Image
                      src={item.src}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      sizes={item.size === 'large' ? '100vw' : '50vw'}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                    {/* Floating icon */}
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                      viewport={{ once: true }}
                      className="absolute top-6 right-6 w-12 h-12 rounded-full glass-yellow flex items-center justify-center group-hover:scale-110 transition-transform duration-300"
                    >
                      <Icon className="w-6 h-6 text-brand-yellow" />
                    </motion.div>

                    {/* Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-8">
                      <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 + index * 0.1 }}
                        viewport={{ once: true }}
                      >
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2 group-hover:text-brand-yellow transition-colors duration-300">
                          {item.title}
                        </h3>
                        <p className="text-brand-gray group-hover:text-white transition-colors duration-300">
                          {item.desc}
                        </p>
                      </motion.div>

                      {/* Hover line */}
                      <motion.div
                        initial={{ scaleX: 0 }}
                        whileHover={{ scaleX: 1 }}
                        className="h-1 bg-gradient-to-r from-brand-yellow to-transparent mt-4 origin-left"
                      ></motion.div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats */}
        <motion.div
          style={{ scale }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto"
        >
          {[
            { label: "Imágenes", value: "50+" },
            { label: "Ángulos", value: "360°" },
            { label: "Calidad", value: "4K" },
            { label: "Actualización", value: "Diaria" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="glass-yellow p-6 rounded-2xl text-center"
            >
              <div className="text-3xl font-black text-brand-yellow mb-2 font-mono">
                {stat.value}
              </div>
              <div className="text-sm text-brand-gray uppercase tracking-wider">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
