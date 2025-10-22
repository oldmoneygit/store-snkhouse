'use client'

import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import { Mail } from 'lucide-react'

const StoreFooter = () => {
  const quickAccessLinks = [
    { name: 'Inicio', href: '/' },
    { name: 'Seguimiento de Pedido', href: '/seguimiento-de-pedido' },
    { name: 'Guía de Tallas', href: '/guia-de-tallas' },
    { name: 'Preguntas Frecuentes', href: '/preguntas-frecuentes' },
    { name: 'Política de Cambios y Devoluciones', href: '/politica-de-cambios-y-devoluciones' },
    { name: 'Contáctanos', href: '/contactanos' },
    { name: 'Plazo de Entrega', href: '/plazo-de-entrega' },
    { name: 'Política de Seguridad y Privacidad', href: '/politica-de-seguridad-y-privacidad' },
  ]

  return (
    <footer className="relative bg-zinc-950 border-t border-brand-yellow/10">
      {/* Top Yellow Border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-8">
          {/* Column 1 - Brand Info */}
          <div className="text-center md:text-left flex flex-col items-center md:items-start">
            <Link href="/" className="block relative w-48 h-12 mb-6 group">
              <Image
                src="/images/logo/snkhouse-logo-white.png"
                alt="SNKHOUSE"
                fill
                className="object-contain transition-all duration-300 group-hover:brightness-110"
              />
            </Link>

            <div className="space-y-4">
              <p className="text-white text-sm">
                <span className="font-semibold">Horario de apertura:</span> Lunes a Sábado - 9:00 am a 6:00 pm
              </p>

              <div className="flex items-center justify-center md:justify-start gap-2 text-white text-sm">
                <Mail size={16} className="text-brand-yellow flex-shrink-0" />
                <span className="font-semibold">E-mail:</span>
                <a href="mailto:contacto@snkhouse.com" className="hover:text-brand-yellow transition-colors">
                  contacto@snkhouse.com
                </a>
              </div>

              {/* Payment Icons */}
              <div className="pt-4 flex justify-center md:justify-start">
                <div className="relative w-48 h-6">
                  <Image
                    src="/images/payment-methods.png"
                    alt="Métodos de pago"
                    fill
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Column 2 - Quick Access */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-6">ACCESO RÁPIDO</h3>
            <ul className="space-y-2.5">
              {quickAccessLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-white/70 hover:text-brand-yellow transition-colors text-sm block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3 - Legal Info */}
          <div>
            <h3 className="text-white font-bold uppercase tracking-wide mb-6">INFORMACIÓN LEGAL</h3>
            <div className="space-y-3 text-sm">
              <p className="text-white/70">
                <span className="text-brand-yellow font-semibold">Empresa:</span> JLJ ECOM LLC
              </p>
              <p className="text-white/70">
                <span className="text-brand-yellow font-semibold">Tipo:</span> Sociedad de responsabilidad limitada (LLC)
              </p>
              <p className="text-white/70">
                <span className="text-brand-yellow font-semibold">EIN:</span> 35-2880148
              </p>
              <p className="text-white/70">
                <span className="text-brand-yellow font-semibold">Dirección:</span> 127 N Higgins Ave, Suite 307D 1238, Missoula, MT 59802, EUA.
              </p>
              <p className="text-white/70">
                <span className="text-brand-yellow font-semibold">Registro:</span> Registrada en el estado de Montana, EE. UU.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10">
          <div className="text-center space-y-4">
            <p className="text-white/50 text-sm">
              Basado en el diseño exclusivo de <span className="text-white font-semibold">Sneaker House</span> 2025. Reservados todos los derechos.
            </p>

            {/* Payment Cards Icons */}
            <div className="flex justify-center items-center">
              <div className="relative w-64 h-8">
                <Image
                  src="/images/payment-methods.png"
                  alt="Métodos de pago aceptados: Visa, Mastercard, PayPal, American Express, Visa Electron, Maestro"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Background Decoration */}
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-brand-yellow/5 blur-[100px] pointer-events-none" />
    </footer>
  )
}

export default StoreFooter
