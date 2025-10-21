'use client'

import { useState } from 'react'
import Image from '@/components/OptimizedImage'
import { motion, AnimatePresence } from 'framer-motion'
import { RotateCcw, ChevronLeft, ChevronRight, Package } from 'lucide-react'
import { CONSTRUCTION_PHASES } from '@/utils/constants'

export default function CardStack() {
  const [cards, setCards] = useState(CONSTRUCTION_PHASES)
  const [currentIndex, setCurrentIndex] = useState(0)

  const moveToEnd = () => {
    setCards(prev => [...prev.slice(1), prev[0]])
    setCurrentIndex((prev) => (prev + 1) % CONSTRUCTION_PHASES.length)
  }

  const moveToStart = () => {
    setCards(prev => [prev[prev.length - 1], ...prev.slice(0, -1)])
    setCurrentIndex((prev) => (prev - 1 + CONSTRUCTION_PHASES.length) % CONSTRUCTION_PHASES.length)
  }

  const resetCards = () => {
    setCards(CONSTRUCTION_PHASES)
    setCurrentIndex(0)
  }

  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-yellow mb-4">
            <Package className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-bold tracking-widest text-brand-yellow">
              GALERÍA
            </span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-4">
            <span className="text-white">Seguí la</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">
              Obra
            </span>
          </h2>
          <p className="text-gray-500 text-sm">Cada fase nos acerca al opening</p>
        </motion.div>

        {/* Card Stack Container */}
        <div className="relative w-full max-w-2xl mx-auto">
          {/* Controls Header */}
          <div className="flex items-center justify-between mb-8">
            {/* Reset Button */}
            <button
              onClick={resetCards}
              className="p-3 glass-yellow hover:border-brand-yellow hover:bg-brand-yellow/10 transition-all duration-300 group"
              aria-label="Reset cards"
            >
              <RotateCcw className="w-4 h-4 text-brand-yellow group-hover:rotate-180 transition-transform duration-500" />
            </button>

            {/* Progress Dots */}
            <div className="flex gap-2">
              {CONSTRUCTION_PHASES.map((_, i) => (
                <div
                  key={i}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === currentIndex
                      ? 'bg-brand-yellow w-8 shadow-glow-yellow'
                      : 'bg-white/10 w-1'
                  }`}
                />
              ))}
            </div>

            {/* Counter */}
            <div className="text-brand-yellow text-xs font-mono px-3 py-1 glass-yellow">
              {String(currentIndex + 1).padStart(2, '0')} / {String(CONSTRUCTION_PHASES.length).padStart(2, '0')}
            </div>
          </div>

          {/* Card Stack */}
          <div className="relative aspect-video">
            <div className="relative w-full h-full">
              {cards.map((card, i) => {
                const isFront = i === 0
                const offset = i * 8
                const scale = 1 - i * 0.04
                const brightness = Math.max(0.4, 1 - i * 0.15)

                return (
                  <motion.div
                    key={card.id}
                    initial={false}
                    animate={{
                      y: -offset,
                      scale: scale,
                      filter: `brightness(${brightness})`
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeOut"
                    }}
                    className="absolute inset-0"
                    style={{
                      zIndex: cards.length - i,
                      pointerEvents: isFront ? 'auto' : 'none'
                    }}
                  >
                    <div className="relative w-full h-full glass border-2 border-brand-yellow/30 overflow-hidden group hover:border-brand-yellow transition-all duration-300 shadow-glow-yellow">
                      {/* Image */}
                      <Image
                        src={card.src}
                        alt={card.alt}
                        fill
                        className="object-cover select-none"
                        draggable={false}
                        sizes="(max-width: 768px) 100vw, 672px"
                      />

                      {/* Gradient Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

                      {/* Content */}
                      <div className="absolute bottom-0 left-0 right-0 p-6 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-brand-yellow flex items-center justify-center font-black text-black text-sm shadow-glow-yellow-strong">
                            {card.id}
                          </div>
                          <h3 className="text-brand-yellow font-black text-xl tracking-wider">
                            {card.title}
                          </h3>
                        </div>
                        <p className="text-gray-400 text-sm font-medium">
                          {card.description}
                        </p>
                      </div>

                      {/* Large Number Background */}
                      <div className="absolute top-4 right-4 text-brand-yellow/10 font-black text-8xl leading-none pointer-events-none">
                        {card.id}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            {/* Navigation Buttons */}
            <button
              onClick={moveToStart}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-16 p-4 glass-yellow hover:border-brand-yellow hover:-translate-x-20 transition-all duration-300 z-50 group hidden md:flex"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6 text-brand-yellow group-hover:scale-110 transition-transform" />
            </button>

            <button
              onClick={moveToEnd}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-16 p-4 glass-yellow hover:border-brand-yellow hover:translate-x-20 transition-all duration-300 z-50 group hidden md:flex"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 text-brand-yellow group-hover:scale-110 transition-transform" />
            </button>
          </div>

          {/* Mobile Navigation */}
          <div className="flex md:hidden gap-4 justify-center mt-6">
            <button
              onClick={moveToStart}
              className="p-4 glass-yellow hover:border-brand-yellow transition-all duration-300 group flex-1"
              aria-label="Previous card"
            >
              <ChevronLeft className="w-6 h-6 text-brand-yellow mx-auto" />
            </button>
            <button
              onClick={moveToEnd}
              className="p-4 glass-yellow hover:border-brand-yellow transition-all duration-300 group flex-1"
              aria-label="Next card"
            >
              <ChevronRight className="w-6 h-6 text-brand-yellow mx-auto" />
            </button>
          </div>

          {/* Instructions */}
          <div className="mt-6 text-center">
            <p className="text-gray-600 text-xs font-mono">
              ← → NAVEGAR • ↻ RESETEAR
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
