'use client'

import { motion } from 'framer-motion'
import { Mail, Instagram, ExternalLink, Sparkles } from 'lucide-react'
import Image from 'next/image'
import FlagArgentina from '@/components/icons/FlagArgentina'
import FlagMexico from '@/components/icons/FlagMexico'
import WhatsAppIcon from '@/components/icons/WhatsAppIcon'

export default function LinksPage() {
  // UTM parameters para tracking
  const utmParams = 'utm_source=linktree&utm_medium=social&utm_campaign=links_page'

  const links = [
    {
      id: 1,
      title: 'SNKHOUSE Argentina',
      titleGradient: 'from-[#74ACDF] via-[#F6B40E] to-[#74ACDF]',
      description: 'Precios en ARS $ • Envíos a toda Argentina',
      url: `https://snkhouseargentina.com?${utmParams}&utm_content=argentina_store`,
      flagComponent: FlagArgentina,
      color: 'from-blue-500/20 to-blue-500/0 border-blue-500/30',
      iconColor: 'text-blue-400',
      isStore: true,
    },
    {
      id: 2,
      title: 'SNKHOUSE México',
      titleGradient: 'from-[#006847] via-[#CE1126] to-[#006847]',
      description: 'Precios en MXN $ • Envíos a todo México',
      url: `https://snkhousemexico.com?${utmParams}&utm_content=mexico_store`,
      flagComponent: FlagMexico,
      color: 'from-green-500/20 to-green-500/0 border-green-500/30',
      iconColor: 'text-green-400',
      isStore: true,
    },
    {
      id: 3,
      title: 'WhatsApp',
      description: 'Chatea con nosotros - Respuesta inmediata',
      url: `https://wa.me/551931993794?text=Hola!%20Vengo%20desde%20links.snkhouse.com`,
      icon: WhatsAppIcon,
      color: 'from-green-500/20 to-green-500/0 border-green-500/30',
      iconColor: 'text-green-500',
      customIcon: true,
    },
    {
      id: 4,
      title: 'Email',
      description: 'contacto@snkhouse.com',
      url: 'mailto:contacto@snkhouse.com?subject=Contacto%20desde%20links.snkhouse.com',
      icon: Mail,
      color: 'from-purple-500/20 to-purple-500/0 border-purple-500/30',
      iconColor: 'text-purple-400',
    },
    {
      id: 5,
      title: 'Instagram',
      description: '@snkhouse - Síguenos para ofertas exclusivas',
      url: `https://instagram.com/snkhouse?${utmParams}&utm_content=instagram`,
      icon: Instagram,
      color: 'from-pink-500/20 to-pink-500/0 border-pink-500/30',
      iconColor: 'text-pink-400',
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle, #FAB800 1px, transparent 1px)',
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Gradient Overlays */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-brand-yellow/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-4 py-12 md:py-20">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 md:mb-16"
        >
          {/* Promo Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 mb-6 bg-gradient-to-r from-brand-yellow to-yellow-500 rounded-full"
          >
            <Sparkles className="w-4 h-4 text-black" />
            <span className="text-black text-sm font-black uppercase tracking-wide">
              Compra 1 Lleva 2
            </span>
            <Sparkles className="w-4 h-4 text-black" />
          </motion.div>

          {/* Logo */}
          <div className="mb-6 flex flex-col items-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="mb-4"
            >
              <Image
                src="/images/logo-snkhouse-white.png"
                alt="SNKHOUSE"
                width={200}
                height={60}
                className="w-auto h-10 md:h-12"
                priority
              />
            </motion.div>
            <div className="flex items-center justify-center gap-2 text-brand-yellow">
              <div className="h-px w-12 bg-brand-yellow/50" />
              <span className="text-sm font-bold tracking-widest">LINKS</span>
              <div className="h-px w-12 bg-brand-yellow/50" />
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-gray-400 text-base md:text-lg max-w-2xl mx-auto">
            Tus sneakers favoritos a un clic de distancia ⚡
          </p>
        </motion.div>

        {/* Links Grid */}
        <div className="max-w-2xl mx-auto space-y-4">
          {links.map((link, index) => {
            const Icon = link.icon
            const FlagComponent = link.flagComponent
            return (
              <motion.a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                whileHover={{ scale: 1.02, y: -4 }}
                whileTap={{ scale: 0.98 }}
                className={`
                  relative block p-6 rounded-2xl border backdrop-blur-sm
                  bg-gradient-to-br ${link.color}
                  hover:shadow-2xl hover:shadow-brand-yellow/20
                  transition-all duration-300 group
                  overflow-hidden
                `}
              >
                {/* Hover Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-yellow/0 via-brand-yellow/5 to-brand-yellow/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative flex items-center gap-4">
                  {/* Icon or Flag */}
                  <div
                    className={`
                    w-16 h-16 rounded-xl flex items-center justify-center
                    ${link.customIcon ? 'bg-transparent' : 'bg-black/40 group-hover:bg-black/60'}
                    transition-colors
                    flex-shrink-0 p-2
                  `}
                  >
                    {FlagComponent ? (
                      <FlagComponent className="w-full h-auto" />
                    ) : link.customIcon ? (
                      <Icon className="w-10 h-10" />
                    ) : (
                      <Icon className={`w-7 h-7 ${link.iconColor}`} />
                    )}
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 min-w-0">
                    {link.isStore ? (
                      <h3 className={`
                        text-lg md:text-xl font-black mb-1
                        bg-gradient-to-r ${link.titleGradient}
                        bg-clip-text text-transparent
                        group-hover:scale-105 transition-transform
                        inline-block
                      `}>
                        {link.title}
                      </h3>
                    ) : (
                      <h3 className="text-white text-lg md:text-xl font-bold mb-1 group-hover:text-brand-yellow transition-colors">
                        {link.title}
                      </h3>
                    )}
                    <p className="text-gray-400 text-sm truncate">{link.description}</p>
                  </div>

                  {/* Arrow Icon */}
                  <ExternalLink className="w-5 h-5 text-gray-500 group-hover:text-brand-yellow group-hover:translate-x-1 transition-all flex-shrink-0" />
                </div>
              </motion.a>
            )
          })}
        </div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center space-y-4"
        >
          {/* Features */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-green-500" />
              <span className="text-gray-400">Envío Gratis</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-brand-yellow" />
              <span className="text-gray-400">Calidad Premium 1:1</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-gray-400">Pago Seguro</span>
            </div>
          </div>

          {/* Copyright */}
          <p className="text-gray-600 text-sm">
            © {new Date().getFullYear()} SNKHOUSE. Todos los derechos reservados.
          </p>
        </motion.div>
      </div>
    </div>
  )
}
