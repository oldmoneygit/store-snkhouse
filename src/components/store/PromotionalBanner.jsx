'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'

const PromotionalBanner = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed top-0 left-0 right-0 z-[60] overflow-hidden bg-black leading-none"
    >
      <Link
        href="https://snkhouse.com/promociones"
        className="block relative w-full"
        style={{ aspectRatio: '19.2 / 1' }}
      >
        <Image
          src="/images/banners/promotional-bar.webp"
          alt="Compra 1 Lleva 2 - Promoción SNKHOUSE"
          fill
          className="object-cover object-center"
          priority
          quality={100}
        />
      </Link>
    </motion.div>
  )
}

export default PromotionalBanner
