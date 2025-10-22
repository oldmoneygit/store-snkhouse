'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { Truck, Clock, MapPin, Package, CheckCircle, Info } from 'lucide-react'
import { motion } from 'framer-motion'

export default function PlazoEntregaPage() {
  const deliveryTimes = [
    {
      region: 'CABA y GBA',
      icon: '🏙️',
      days: '2-4 días hábiles',
      color: 'from-green-500/20 to-green-500/0 border-green-500/30',
      iconColor: 'text-green-500',
    },
    {
      region: 'Provincia de Buenos Aires',
      icon: '🌆',
      days: '4-7 días hábiles',
      color: 'from-blue-500/20 to-blue-500/0 border-blue-500/30',
      iconColor: 'text-blue-500',
    },
    {
      region: 'Interior del país',
      icon: '🗺️',
      days: '5-10 días hábiles',
      color: 'from-orange-500/20 to-orange-500/0 border-orange-500/30',
      iconColor: 'text-orange-500',
    },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <div className="container mx-auto px-4 pt-6 md:pt-8 pb-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 md:mb-12"
          >
            <div className="flex items-center gap-3 mb-4">
              <Truck className="w-8 h-8 md:w-10 md:h-10 text-brand-yellow" />
              <h1 className="text-3xl md:text-5xl font-black text-white">
                Plazo de Entrega
              </h1>
            </div>
            <p className="text-white/60 text-base md:text-lg">
              Conoce los tiempos de entrega según tu ubicación
            </p>
          </motion.div>

          {/* Free Shipping Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 bg-gradient-to-r from-brand-yellow/20 to-yellow-500/20 border border-brand-yellow/50 rounded-xl p-6 md:p-8"
          >
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-brand-yellow flex items-center justify-center flex-shrink-0">
                <Truck className="w-8 h-8 text-black" />
              </div>
              <div>
                <h2 className="text-2xl md:text-3xl font-black text-white mb-2">
                  ¡Envío GRATIS a todo Argentina!
                </h2>
                <p className="text-white/80">
                  Sin mínimo de compra • Sin costos ocultos • Rastreo incluido
                </p>
              </div>
            </div>
          </motion.div>

          {/* Delivery Times by Region */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Tiempos de entrega por región
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {deliveryTimes.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  className={`bg-gradient-to-br ${item.color} backdrop-blur-sm rounded-xl p-6 border`}
                >
                  <div className="text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-white font-bold text-lg mb-2">{item.region}</h3>
                  <p className={`${item.iconColor} font-black text-2xl`}>{item.days}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Proceso de envío */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              ¿Cómo funciona el proceso de envío?
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
              <div className="space-y-6">
                {[
                  {
                    step: '1',
                    title: 'Confirmación de pedido',
                    desc: 'Recibes un email confirmando tu compra con todos los detalles',
                    time: 'Inmediato',
                  },
                  {
                    step: '2',
                    title: 'Preparación del pedido',
                    desc: 'Verificamos stock y empacamos tu producto con cuidado',
                    time: '24-48 horas',
                  },
                  {
                    step: '3',
                    title: 'Despacho',
                    desc: 'Tu pedido sale de nuestro centro de distribución',
                    time: '2-3 días hábiles',
                  },
                  {
                    step: '4',
                    title: 'En tránsito',
                    desc: 'Puedes rastrear tu envío en tiempo real con el número de seguimiento',
                    time: 'Según tu ubicación',
                  },
                  {
                    step: '5',
                    title: '¡Entregado!',
                    desc: 'Recibes tu pedido en la puerta de tu casa',
                    time: '🎉',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex flex-col items-center">
                      <div className="w-12 h-12 rounded-full bg-brand-yellow text-black font-black text-lg flex items-center justify-center flex-shrink-0">
                        {item.step}
                      </div>
                      {index < 4 && (
                        <div className="w-0.5 h-full bg-brand-yellow/30 mt-2"></div>
                      )}
                    </div>
                    <div className="flex-1 pb-6">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h3 className="text-white font-bold text-lg">{item.title}</h3>
                        <span className="text-brand-yellow text-sm font-bold whitespace-nowrap">
                          {item.time}
                        </span>
                      </div>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Información importante */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Información importante sobre entregas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <Clock className="w-6 h-6 text-brand-yellow" />,
                  title: 'Días hábiles',
                  desc: 'Los tiempos de entrega se cuentan en días hábiles (lunes a viernes), excluyendo fines de semana y feriados.',
                },
                {
                  icon: <Package className="w-6 h-6 text-brand-yellow" />,
                  title: 'Empaque seguro',
                  desc: 'Todos nuestros productos son embalados con materiales de calidad para garantizar que lleguen en perfecto estado.',
                },
                {
                  icon: <MapPin className="w-6 h-6 text-brand-yellow" />,
                  title: 'Dirección correcta',
                  desc: 'Asegúrate de proporcionar una dirección completa y correcta. Incluye referencias si es necesario.',
                },
                {
                  icon: <CheckCircle className="w-6 h-6 text-brand-yellow" />,
                  title: 'Rastreo incluido',
                  desc: 'Todos los envíos incluyen número de seguimiento para que puedas rastrear tu pedido en tiempo real.',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start gap-3 mb-3">
                    {item.icon}
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Demoras y problemas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-8 bg-gradient-to-br from-orange-500/10 to-orange-500/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-500/30"
          >
            <div className="flex items-start gap-4">
              <Info className="w-8 h-8 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  ¿Qué pasa si hay demoras?
                </h3>
                <p className="text-white/80 mb-4">
                  Aunque trabajamos con las mejores empresas de logística, ocasionalmente pueden ocurrir demoras por:
                </p>
                <ul className="space-y-2 text-white/80 text-sm mb-4">
                  <li className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Condiciones climáticas adversas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Feriados nacionales o locales</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Alta demanda en temporada de ventas</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Problemas con la dirección de entrega</span>
                  </li>
                </ul>
                <p className="text-white/80">
                  Si tu pedido se demora más de lo esperado, <strong className="text-brand-yellow">contáctanos inmediatamente</strong> y lo solucionaremos.
                </p>
              </div>
            </div>
          </motion.div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="bg-gradient-to-r from-brand-yellow/10 to-yellow-500/10 border border-brand-yellow/30 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Tienes preguntas sobre tu envío?
            </h3>
            <p className="text-white/80 mb-6">
              Nuestro equipo de soporte está disponible para ayudarte con cualquier consulta sobre entregas.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="/seguimiento-de-pedido"
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <Package className="w-5 h-5" />
                Rastrear mi pedido
              </a>
              <a
                href="/contactanos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Contactar Soporte
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
