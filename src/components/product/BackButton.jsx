'use client'

import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'
import { useTranslation } from '@/hooks/useCountry'

export default function BackButton() {
  const t = useTranslation()

  return (
    <Link
      href="/"
      className="inline-flex items-center gap-2 text-white/60 hover:text-brand-yellow transition-colors text-sm md:text-base"
    >
      <ChevronLeft className="w-4 h-4" />
      {t.backToStore}
    </Link>
  )
}
