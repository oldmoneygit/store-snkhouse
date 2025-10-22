'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'
import Image from 'next/image'
import { useEffect } from 'react'

const SizeGuideModal = ({ isOpen, onClose }) => {
  // Close on ESC key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      window.addEventListener('keydown', handleEsc)
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden'
    }

    return () => {
      window.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              className="relative w-full max-w-4xl bg-black border-2 border-brand-yellow/30 rounded-xl shadow-2xl shadow-brand-yellow/20 overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-to-r from-black via-zinc-900 to-black border-b border-brand-yellow/20 px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
                <h2 className="text-lg md:text-2xl font-bold text-brand-yellow">
                  GUÍA DE TALLAS
                </h2>
                <button
                  onClick={onClose}
                  className="w-8 h-8 md:w-10 md:h-10 flex items-center justify-center bg-white/10 hover:bg-brand-yellow/20 text-white hover:text-brand-yellow rounded-lg transition-all duration-200"
                  aria-label="Cerrar"
                >
                  <X className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>

              {/* Content */}
              <div className="bg-black p-4 md:p-6 max-h-[70vh] md:max-h-[80vh] overflow-y-auto">
                {/* Important Notice */}
                <div className="bg-brand-yellow/10 border border-brand-yellow/30 rounded-lg p-3 md:p-4 mb-4 md:mb-6">
                  <div className="flex items-start gap-2 md:gap-3">
                    <div className="w-5 h-5 md:w-6 md:h-6 flex-shrink-0 bg-brand-yellow rounded-full flex items-center justify-center text-black font-bold text-sm md:text-base mt-0.5">
                      !
                    </div>
                    <div>
                      <p className="text-white text-xs md:text-sm font-semibold mb-1">
                        Las medidas a continuación son dimensiones aproximadas
                      </p>
                      <p className="text-white/70 text-[11px] md:text-xs">
                        Solo para servir como parámetro para nuestros clientes. Las medidas pueden variar unos centímetros por siendo producido manualmente. Si es necesario, habla con nuestro soporte para una mejor elección de tamaño.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Size Guide Image */}
                <div className="relative w-full bg-gradient-to-br from-zinc-900 to-black rounded-lg overflow-hidden">
                  <div className="relative w-full aspect-[9/16] md:aspect-[9/14]">
                    <Image
                      src="/images/size-guide.webp"
                      alt="Guía de Tallas SNKHOUSE"
                      fill
                      className="object-contain"
                      priority
                      quality={100}
                    />
                  </div>
                </div>

                {/* Help Text */}
                <div className="mt-4 md:mt-6 text-center">
                  <p className="text-white/60 text-xs md:text-sm mb-2">
                    ¿Tienes dudas sobre tu talla?
                  </p>
                  <a
                    href="/contactanos"
                    className="inline-flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-brand-yellow text-black font-bold text-xs md:text-sm rounded-lg hover:bg-yellow-400 transition-all duration-200"
                  >
                    Contacta con nosotros
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}

export default SizeGuideModal
