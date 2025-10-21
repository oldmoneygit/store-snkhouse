'use client'

import { motion } from 'framer-motion'
import { ShoppingCart, Tag, CheckCircle2, Gift, Shield } from 'lucide-react'
import Image from '@/components/OptimizedImage'

const HowItWorks = () => {
  const steps = [
    {
      icon: ShoppingCart,
      title: 'Adiciona 2 Productos',
      description: 'Elige tus 2 sneakers favoritos y agrégalos al carrito',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: Gift,
      title: '1 Sale GRATIS',
      description: 'El producto de menor valor sale completamente gratis',
      color: 'from-brand-yellow to-yellow-500'
    },
    {
      icon: Shield,
      title: 'Sin Pegadinhas',
      description: 'No hay trucos, no hay condiciones ocultas. Es así de simple',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: CheckCircle2,
      title: 'Desconto Automático',
      description: 'El descuento se aplica automáticamente en el checkout',
      color: 'from-green-500 to-emerald-500'
    }
  ]

  return (
    <section className="relative py-20 bg-gradient-to-b from-black via-zinc-950 to-black overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle, #FAB800 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-brand-yellow to-yellow-500 rounded-full mb-6">
            <Tag className="w-5 h-5 text-black" />
            <span className="text-black text-sm font-black uppercase tracking-wider">PROMOCIÓN ACTIVA</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-black text-white mb-6">
            ¿Cómo Funciona el{' '}
            <span className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">
              COMPRA 1 LLEVA 2
            </span>
            ?
          </h2>

          <p className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto">
            Es simple: compra 2 productos y 1 sale completamente GRATIS.
            <span className="text-lg md:text-xl text-brand-yellow font-bold"> ¡Sin pegadinhas, sin trucos!</span>
          </p>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto mb-12">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8 }}
              className="relative group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4 w-12 h-12 bg-gradient-to-br from-brand-yellow to-yellow-500 rounded-full flex items-center justify-center z-10">
                <span className="text-black font-black text-xl">{index + 1}</span>
              </div>

              {/* Card */}
              <div className="bg-gradient-to-br from-zinc-900 to-black rounded-2xl p-8 border border-zinc-800 hover:border-brand-yellow/50 transition-all duration-300 h-full">
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                {/* Content */}
                <h3 className="text-white font-black text-xl mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Highlight Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-gradient-to-r from-brand-yellow/10 via-yellow-500/10 to-brand-yellow/10 rounded-2xl p-8 md:p-12 border-2 border-brand-yellow/30 relative overflow-hidden">
            {/* Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-yellow/5 to-transparent" />

            <div className="relative z-10 text-center">
              <div className="mb-6">
                <h3 className="text-2xl md:text-3xl font-black text-white">
                  Válido para{' '}
                  <span className="text-2xl md:text-3xl font-black text-brand-yellow">TODOS LOS PRODUCTOS</span>
                </h3>
              </div>

              <p className="text-gray-300 text-lg mb-8">
                No importa qué sneakers elijas, la promoción se aplica automáticamente.
                <span className="text-white font-bold"> ¡Así de fácil!</span>
              </p>

              <div className="flex flex-col md:flex-row items-center justify-center gap-4">
                <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 font-bold">Sin Códigos</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 font-bold">Sin Pegadinhas</span>
                </div>
                <div className="flex items-center gap-2 px-6 py-3 bg-green-500/10 border border-green-500/30 rounded-full">
                  <CheckCircle2 className="w-5 h-5 text-green-500" />
                  <span className="text-green-400 font-bold">100% Automático</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-brand-yellow/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl" />
    </section>
  )
}

export default HowItWorks
