'use client'

import { motion } from 'framer-motion'
import { Instagram, ArrowRight } from 'lucide-react'
import { SOCIAL_LINKS } from '@/utils/constants'

export default function CTA() {
  return (
    <section className="relative py-24 px-4">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-yellow/5 to-transparent" />

      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Divider Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="inline-block w-16 h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent mb-8"
        />

        {/* Title */}
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-5xl md:text-6xl font-black text-white mb-6"
        >
          Seguinos en
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">
            Instagram
          </span>
        </motion.h3>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-gray-500 text-sm mb-10 uppercase tracking-wider"
        >
          Updates exclusivos del showroom
        </motion.p>

        {/* CTA Button */}
        <motion.a
          href={SOCIAL_LINKS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-yellow to-yellow-500 text-black px-10 py-5 font-black text-base hover:shadow-glow-yellow-strong transition-all duration-300 uppercase tracking-wider group"
        >
          <Instagram className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          {SOCIAL_LINKS.instagramHandle}
          <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform duration-300" />
        </motion.a>

        {/* Additional Info */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-gray-600 text-xs mt-8 font-mono"
        >
          Drops • Previews • Behind the Scenes
        </motion.p>
      </div>
    </section>
  )
}
