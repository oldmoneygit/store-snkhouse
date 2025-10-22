'use client'

import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { motion } from 'framer-motion'

export default function BackToStoreBar() {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[70] bg-gradient-to-r from-zinc-900 via-black to-zinc-900 border-b border-brand-yellow/30"
    >
      <div className="container mx-auto px-4">
        <Link
          href="/"
          className="flex items-center gap-2 py-3 text-brand-yellow hover:text-brand-yellow/80 transition-colors duration-300 w-fit group"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
          <span className="text-sm font-semibold uppercase tracking-wider">
            Volver a la Tienda
          </span>
        </Link>
      </div>
    </motion.div>
  )
}
