'use client'

import { useState, useEffect } from 'react'

/**
 * Hook para detectar se devemos reduzir animações
 * Considera: preferência do usuário + conexão lenta
 */
export function useReducedMotion() {
  const [shouldReduceMotion, setShouldReduceMotion] = useState(false)

  useEffect(() => {
    // Verificar preferência de reduced motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduceMotion(mediaQuery.matches)

    // Detectar conexão lenta
    if ('connection' in navigator) {
      const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
      if (connection) {
        const slowConnection = connection.effectiveType === 'slow-2g' ||
                              connection.effectiveType === '2g' ||
                              connection.effectiveType === '3g' ||
                              connection.saveData === true

        if (slowConnection) {
          setShouldReduceMotion(true)
        }
      }
    }

    // Listener para mudanças
    const handleChange = (e) => setShouldReduceMotion(e.matches)
    mediaQuery.addEventListener('change', handleChange)

    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  return shouldReduceMotion
}

/**
 * Retorna variantes de animação otimizadas
 */
export function getMotionVariants(shouldReduce) {
  if (shouldReduce) {
    return {
      initial: {},
      animate: {},
      transition: { duration: 0 }
    }
  }

  return {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }
}
