'use client'

import { useState } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { Package, Search, AlertCircle, CheckCircle2, Truck, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SeguimientoPedidoPage() {
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [tracking, setTracking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    // Simulación de búsqueda (aquí conectarías con tu API real)
    setTimeout(() => {
      if (orderNumber.length < 5) {
        setError('Por favor ingresa un número de pedido válido')
        setTracking(null)
      } else {
        // Datos de ejemplo - en producción esto vendría de tu API
        setTracking({
          orderNumber: orderNumber,
          status: 'in_transit',
          estimatedDelivery: '3-5 días hábiles',
          currentLocation: 'Centro de distribución - Buenos Aires',
          history: [
            { date: '2025-10-20 14:30', status: 'En tránsito', location: 'Buenos Aires' },
            { date: '2025-10-19 09:15', status: 'Procesando', location: 'Centro de distribución' },
            { date: '2025-10-18 16:45', status: 'Pedido confirmado', location: 'SNKHOUSE' },
          ]
        })
      }
      setLoading(false)
    }, 1500)
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed':
        return <CheckCircle2 className="w-6 h-6 text-green-500" />
      case 'in_transit':
        return <Truck className="w-6 h-6 text-brand-yellow" />
      case 'delivered':
        return <Package className="w-6 h-6 text-green-500" />
      default:
        return <AlertCircle className="w-6 h-6 text-orange-500" />
    }
  }

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
              <Package className="w-8 h-8 md:w-10 md:h-10 text-brand-yellow" />
              <h1 className="text-3xl md:text-5xl font-black text-white">
                Seguimiento de Pedido
              </h1>
            </div>
            <p className="text-white/60 text-base md:text-lg">
              Rastrea tu pedido en tiempo real ingresando tu número de orden
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Form */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
                <h2 className="text-2xl font-bold text-white mb-6">
                  Ingresa tus datos
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">
                      Número de Pedido *
                    </label>
                    <input
                      type="text"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      placeholder="Ej: #1234567"
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-brand-yellow focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white text-sm font-bold mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tucorreo@ejemplo.com"
                      className="w-full bg-black/50 border border-white/20 rounded-lg px-4 py-3 text-white placeholder:text-white/40 focus:border-brand-yellow focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-4 flex items-start gap-3">
                      <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-to-r from-brand-yellow to-yellow-500 text-black font-black py-4 rounded-lg hover:shadow-lg hover:shadow-brand-yellow/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-black"></div>
                        Buscando...
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        Rastrear Pedido
                      </>
                    )}
                  </button>
                </form>

                {/* Info adicional */}
                <div className="mt-8 p-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-lg">
                  <p className="text-white/80 text-sm">
                    💡 <strong>Tip:</strong> Encontrarás tu número de pedido en el email de confirmación que te enviamos al realizar la compra.
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Tracking Results */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              {tracking ? (
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
                  <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">
                      Estado del Pedido
                    </h2>
                    {getStatusIcon(tracking.status)}
                  </div>

                  {/* Order Info */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 text-sm mb-1">Pedido</p>
                        <p className="text-white font-bold">{tracking.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">Entrega estimada</p>
                        <p className="text-brand-yellow font-bold">{tracking.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="mb-6 p-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <div>
                        <p className="text-white/60 text-sm mb-1">Ubicación actual</p>
                        <p className="text-white font-bold">{tracking.currentLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tracking History */}
                  <div>
                    <h3 className="text-white font-bold mb-4">Historial de rastreo</h3>
                    <div className="space-y-4">
                      {tracking.history.map((item, index) => (
                        <div key={index} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <div className={`w-3 h-3 rounded-full ${index === 0 ? 'bg-brand-yellow' : 'bg-white/30'}`}></div>
                            {index < tracking.history.length - 1 && (
                              <div className="w-0.5 h-full bg-white/20 mt-2"></div>
                            )}
                          </div>
                          <div className="flex-1 pb-4">
                            <p className="text-white font-bold mb-1">{item.status}</p>
                            <p className="text-white/60 text-sm">{item.location}</p>
                            <p className="text-white/40 text-xs mt-1">{item.date}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10 flex flex-col items-center justify-center min-h-[400px]">
                  <Package className="w-20 h-20 text-white/20 mb-4" />
                  <h3 className="text-xl font-bold text-white mb-2">
                    Ingresa tu número de pedido
                  </h3>
                  <p className="text-white/60 text-center">
                    Completa el formulario para ver el estado de tu pedido
                  </p>
                </div>
              )}
            </motion.div>
          </div>

          {/* Ayuda adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-gradient-to-r from-brand-yellow/10 to-yellow-500/10 border border-brand-yellow/30 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">¿Necesitas ayuda?</h3>
            <p className="text-white/80 mb-6">
              Si tienes algún problema con tu pedido o el seguimiento, nuestro equipo está listo para ayudarte.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contactanos"
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                Contactar Soporte
              </Link>
              <Link
                href="/preguntas-frecuentes"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Ver Preguntas Frecuentes
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
