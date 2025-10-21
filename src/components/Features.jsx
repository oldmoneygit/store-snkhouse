'use client'

import { motion } from 'framer-motion'
import { Store, Sparkles, TrendingUp } from 'lucide-react'
import { FEATURES_DATA } from '@/utils/constants'

const iconMap = {
  Store,
  Sparkles,
  TrendingUp
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0 }
}

export default function Features() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass border-purple-500/30 mb-4">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <span className="text-xs font-bold tracking-widest text-purple-400">
              EXPERIENCIA
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">
              Por Qué
            </span>{' '}
            <span className="text-white">SNKHOUSE</span>
          </h2>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="grid md:grid-cols-3 gap-6"
        >
          {FEATURES_DATA.map((feature, idx) => {
            const Icon = iconMap[feature.icon]

            return (
              <motion.div
                key={idx}
                variants={item}
                className="relative group"
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />

                {/* Card */}
                <div className="relative glass p-8 group-hover:border-white/30 transition-all duration-300 h-full">
                  <div className="bg-white/10 w-16 h-16 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-8 h-8 text-brand-yellow" />
                  </div>
                  <h3 className="text-xl font-black text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-400 text-sm">{feature.desc}</p>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
