'use client'

import { motion } from 'framer-motion'
import { Hammer, Ruler, Palette, Sparkles, Package, Clock, CheckCircle2 } from 'lucide-react'
import { TIMELINE_DATA } from '@/utils/constants'

const iconMap = {
  Hammer,
  Ruler,
  Palette,
  Sparkles,
  Package
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item = {
  hidden: { opacity: 0, x: -50 },
  show: { opacity: 1, x: 0 }
}

export default function Timeline() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass border-blue-500/30 mb-4">
            <Clock className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-bold tracking-widest text-blue-400">
              TIMELINE
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-brand-yellow">
              Progreso
            </span>{' '}
            <span className="text-white">del Proyecto</span>
          </h2>
        </motion.div>

        {/* Timeline Items */}
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
          className="space-y-4"
        >
          {TIMELINE_DATA.map((phase, idx) => {
            const Icon = iconMap[phase.icon]

            return (
              <motion.div
                key={idx}
                variants={item}
                className={`relative group ${
                  phase.status === 'completed' ? 'opacity-100' :
                  phase.status === 'inProgress' ? 'opacity-100' : 'opacity-50'
                }`}
              >
                {/* Glow Effect */}
                <div className={`absolute inset-0 ${
                  phase.status === 'completed' ? 'bg-gradient-to-r from-green-500/20 to-transparent' :
                  phase.status === 'inProgress' ? 'bg-gradient-to-r from-brand-yellow/20 to-transparent' :
                  'bg-gradient-to-r from-gray-500/10 to-transparent'
                } opacity-0 group-hover:opacity-100 blur-xl transition-all duration-500`} />

                {/* Card */}
                <div className={`relative glass border ${
                  phase.status === 'completed' ? 'border-green-500/30' :
                  phase.status === 'inProgress' ? 'border-brand-yellow/50' :
                  'border-white/10'
                } p-6 flex items-center gap-6 group-hover:border-white/30 transition-all duration-300`}>

                  {/* Icon */}
                  <div className={`w-16 h-16 flex items-center justify-center flex-shrink-0 ${
                    phase.status === 'completed' ? 'bg-green-500/20' :
                    phase.status === 'inProgress' ? 'bg-brand-yellow/20 animate-pulse' :
                    'bg-white/5'
                  }`}>
                    <Icon className={`w-8 h-8 ${
                      phase.status === 'completed' ? 'text-green-400' :
                      phase.status === 'inProgress' ? 'text-brand-yellow' :
                      'text-gray-500'
                    }`} />
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <h3 className="text-xl font-black text-white mb-1">
                      {phase.phase}
                    </h3>
                    <p className="text-sm text-gray-500 font-mono">
                      {phase.month}
                    </p>
                  </div>

                  {/* Status Icon */}
                  {phase.status === 'completed' && (
                    <CheckCircle2 className="w-6 h-6 text-green-400" />
                  )}
                  {phase.status === 'inProgress' && (
                    <div className="w-6 h-6 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
                  )}
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
