'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { OPENING_DATE } from '@/utils/constants'

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2
    }
  }
}

const item = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1 }
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date()
      const difference = OPENING_DATE - now

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60)
        })
      }
    }

    calculateTimeLeft()
    const interval = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(interval)
  }, [])

  const timeUnits = [
    { value: timeLeft.days, label: 'DÍAS' },
    { value: timeLeft.hours, label: 'HRS' },
    { value: timeLeft.minutes, label: 'MIN' },
    { value: timeLeft.seconds, label: 'SEG' }
  ]

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-100px" }}
      className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto mb-10 px-4"
    >
      {timeUnits.map((unit, idx) => (
        <motion.div
          key={idx}
          variants={item}
          className="relative group"
        >
          {/* Glow Effect */}
          <div className="absolute inset-0 bg-brand-yellow opacity-0 group-hover:opacity-30 blur-2xl transition-all duration-300" />

          {/* Card */}
          <div className="relative glass-yellow p-4 md:p-6 group-hover:border-brand-yellow group-hover:bg-black/60 transition-all duration-300 shadow-glow-yellow">
            <motion.div
              key={unit.value}
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="text-4xl md:text-6xl font-black text-brand-yellow mb-2 font-mono text-shadow-glow"
            >
              {String(unit.value).padStart(2, '0')}
            </motion.div>
            <div className="text-[10px] md:text-xs text-gray-400 font-bold tracking-widest">
              {unit.label}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  )
}
