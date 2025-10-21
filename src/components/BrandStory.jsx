'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import { IMAGES } from '@/utils/constants'
import { Sparkles, Heart, Target } from 'lucide-react'

export default function BrandStory() {
  const values = [
    {
      icon: Sparkles,
      title: "Qualidade 1:1",
      desc: "Importados das mesmas fábricas da Nike"
    },
    {
      icon: Heart,
      title: "Pasión",
      desc: "Sneakerheads para sneakerheads"
    },
    {
      icon: Target,
      title: "Exclusividad",
      desc: "Drops limitados y colaboraciones únicas"
    }
  ]

  return (
    <section className="relative py-20 md:py-32 overflow-hidden bg-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-brand-yellow/5 to-black"></div>

      {/* Floating blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-brand-yellow/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="relative w-64 h-64 md:w-96 md:h-96 mx-auto mb-12"
          >
            <Image
              src={IMAGES.logoSmoke}
              alt="SNKHOUSE Logo"
              fill
              className="object-contain"
              priority
            />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-black text-white mb-6"
          >
            <span className="bg-gradient-to-r from-brand-yellow via-yellow-300 to-brand-yellow bg-clip-text text-transparent">
              MÁS QUE SNEAKERS
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            viewport={{ once: true }}
            className="text-brand-gray text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
          >
            SNKHOUSE nació de la pasión por la cultura sneaker en Buenos Aires.
            Somos el primer showroom premium dedicado a ofrecer sneakers importados 1:1,
            fabricados nas mesmas fábricas que a Nike usa, com qualidade premium garantida.
          </motion.p>
        </motion.div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {values.map((value, index) => {
            const Icon = value.icon
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="glass p-8 rounded-2xl text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.6 }}
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 rounded-full bg-brand-yellow/10 border-2 border-brand-yellow/30 group-hover:border-brand-yellow group-hover:bg-brand-yellow/20 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-brand-yellow" />
                </motion.div>

                <h3 className="text-2xl font-bold text-white mb-3">
                  {value.title}
                </h3>
                <p className="text-brand-gray leading-relaxed">
                  {value.desc}
                </p>
              </motion.div>
            )
          })}
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
        >
          {[
            { num: "2026", label: "Inauguración" },
            { num: "500+", label: "Modelos Premium" },
            { num: "180m²", label: "De Experiencia" },
            { num: "#1", label: "En Argentina" }
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.1 }}
              className="text-center p-6 glass-yellow rounded-xl"
            >
              <div className="text-3xl md:text-4xl font-black text-brand-yellow mb-2 font-mono">
                {stat.num}
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
