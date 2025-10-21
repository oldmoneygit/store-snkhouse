'use client'

import { motion } from 'framer-motion'

/**
 * Componente de título padrão para seções da loja
 * Garante tipografia uniforme em toda a aplicação
 */
const SectionTitle = ({
  title,
  highlight,
  subtitle,
  className = ''
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`text-center mb-12 ${className}`}
    >
      <h2 className="text-3xl md:text-5xl font-bold text-white mb-4 leading-tight">
        {title}{highlight && <span className="text-brand-yellow text-3xl md:text-5xl font-bold"> {highlight}</span>}
      </h2>
      {subtitle && (
        <p className="text-gray-400 text-base max-w-2xl mx-auto">
          {subtitle}
        </p>
      )}
    </motion.div>
  )
}

export default SectionTitle
