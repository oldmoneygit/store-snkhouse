'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'

const NeedHelpSection = () => {
  // WhatsApp link with pre-filled message in Spanish
  const whatsappMessage = encodeURIComponent('Hola, vengo de la sección de ayuda, ¿pueden resolver una duda?')
  const whatsappLink = `https://wa.me/5519319937940?text=${whatsappMessage}`

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-black to-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="group relative aspect-[16/5] md:aspect-[21/5] lg:aspect-[24/5] overflow-hidden rounded-2xl"
        >
          <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
            <div className="relative w-full h-full">
              <Image
                src="/images/banners/need-help-banner.webp"
                alt="¿Necesitar Ayuda? - Contacta con nuestro equipo de atención al cliente"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                quality={95}
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default NeedHelpSection
