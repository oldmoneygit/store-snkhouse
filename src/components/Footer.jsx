'use client'

import { motion } from 'framer-motion'
import { LOCATION_DATA } from '@/utils/constants'
import Logo from './Logo'

const footerLinks = {
  ayuda: [
    { label: 'Seguimiento de Pedido', url: 'https://www.snkhouse.com/seguimiento-de-pedido/' },
    { label: 'Preguntas Frecuentes', url: 'https://www.snkhouse.com/preguntas-frecuentes/' },
    { label: 'Contáctanos', url: 'https://www.snkhouse.com/contactanos/' }
  ],
  informacion: [
    { label: 'Guía de Tallas', url: 'https://www.snkhouse.com/guia-de-tallas/' },
    { label: 'Plazo de Entrega', url: 'https://www.snkhouse.com/plazo-de-entrega/' }
  ],
  legal: [
    { label: 'Política de Cambios y Devoluciones', url: 'https://www.snkhouse.com/politica-de-cambios-y-devoluciones/' },
    { label: 'Política de Seguridad y Privacidad', url: 'https://www.snkhouse.com/politica-de-seguridad-y-privacidad/' }
  ]
}

export default function Footer() {
  return (
    <footer className="relative py-12 px-4 border-t border-white/5">
      <div className="max-w-6xl mx-auto">
        {/* Links Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12"
        >
          {/* Logo and Address */}
          <div className="text-center md:text-left">
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="mb-3"
            >
              <Logo className="w-24 md:w-28 h-auto text-brand-yellow" gradient={true} />
            </motion.div>
            <p className="text-gray-600 font-mono text-xs">{LOCATION_DATA.address}</p>
            <p className="text-gray-700 font-mono text-xs">
              {LOCATION_DATA.neighborhood}
            </p>
            <p className="text-gray-700 font-mono text-xs">
              {LOCATION_DATA.city} • {LOCATION_DATA.country}
            </p>
          </div>

          {/* Ayuda */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-sm mb-4">AYUDA</h3>
            <ul className="space-y-2">
              {footerLinks.ayuda.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-600 hover:text-brand-yellow transition-colors text-xs font-mono"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Información */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-sm mb-4">INFORMACIÓN</h3>
            <ul className="space-y-2">
              {footerLinks.informacion.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-600 hover:text-brand-yellow transition-colors text-xs font-mono"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="text-center md:text-left">
            <h3 className="text-white font-bold text-sm mb-4">LEGAL</h3>
            <ul className="space-y-2">
              {footerLinks.legal.map((link, index) => (
                <li key={index}>
                  <a
                    href={link.url}
                    className="text-gray-600 hover:text-brand-yellow transition-colors text-xs font-mono"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-col items-center gap-4 pt-8 border-t border-white/5"
        >
          <p className="text-gray-700 font-mono text-xs">
            © 2025 SNKHOUSE • ALL RIGHTS RESERVED
          </p>
          <p className="text-gray-800 text-[10px] font-mono">
            Built with ❤️ for sneakerheads • Powered by Next.js
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
