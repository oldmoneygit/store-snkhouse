'use client'

import { motion } from 'framer-motion'
import { useReducedMotion } from '@/hooks/useReducedMotion'

/**
 * Componente de título padrão para seções da loja
 * Garante tipografia uniforme e responsiva em toda a aplicação
 * Otimizado para mobile e conexões lentas
 */
const SectionTitle = ({
  title,
  highlight,
  subtitle,
  className = ''
}) => {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      initial={shouldReduceMotion ? {} : { opacity: 0, y: 30 }}
      whileInView={shouldReduceMotion ? {} : { opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-8 md:mb-12 px-4 ${className}`}
    >
      <h2 className="text-2xl md:text-3xl lg:text-5xl font-bold text-white mb-3 md:mb-4 leading-tight">
        {title}{highlight && <span className="text-brand-yellow text-2xl md:text-3xl lg:text-5xl font-bold"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle
