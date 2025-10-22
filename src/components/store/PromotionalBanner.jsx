'use client'

import { motion } from 'framer-motion'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'

const PromotionalBanner = () => {
  return (
    <motion.div
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="w-full z-[60] bg-black pb-2 md:pb-3"
    >
      <Link
        href="/#products"
        className="block w-full h-14 md:h-16 bg-center bg-no-repeat"
        style={{
          backgroundImage: 'url(/images/banners/promotional-bar.webp)',
          backgroundSize: 'cover',
          backgroundPosition: 'center center'
        }}
        aria-label="Compra 1 Lleva 2 - Promoción SNKHOUSE"
      >
      </Link>
    </motion.div>
  )
}

export default PromotionalBanner
