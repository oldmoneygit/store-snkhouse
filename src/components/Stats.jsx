'use client'

import { motion } from 'framer-motion'
import { Ruler, Package, Users, Trophy } from 'lucide-react'
import { STATS_DATA } from '@/utils/constants'

const iconMap = {
  Ruler,
  Package,
  Users,
  Trophy
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 }
}

export default function Stats() {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16 px-4"
    >
      {STATS_DATA.map((stat, idx) => {
        const Icon = iconMap[stat.icon]

        return (
          <motion.div
            key={idx}
            variants={item}
            className="relative group"
          >
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-yellow/20 to-transparent opacity-0 group-hover:opacity-100 blur-xl transition-all duration-300" />

            {/* Card */}
            <div className="relative glass p-6 group-hover:border-brand-yellow/50 group-hover:bg-black/60 transition-all duration-300 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
              <Icon className={`w-8 h-8 ${stat.color} mb-3 mx-auto group-hover:scale-110 transition-transform duration-300`} />
              <div className={`text-3xl font-black ${stat.color} mb-1`}>
                {stat.value}
              </div>
              <div className="text-xs text-gray-400 font-medium uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}
