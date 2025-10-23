'use client'

import { useState } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { Package, Search, AlertCircle, CheckCircle2, Truck, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslation } from '@/hooks/useCountry'

export default function SeguimientoPedidoPage() {
  const t = useTranslation()
  const [orderNumber, setOrderNumber] = useState('')
  const [email, setEmail] = useState('')
  const [tracking, setTracking] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validação básica
      if (!orderNumber || orderNumber.trim().length < 3) {
        setError('Por favor ingresa un número de pedido válido')
        setTracking(null)
        setLoading(false)
        return
      }

      if (!email || !email.includes('@')) {
        setError('Por favor ingresa un email válido')
        setTracking(null)
        setLoading(false)
        return
      }

      // Buscar pedido na API
      const response = await fetch('/api/orders/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email.trim(),
          orderNumber: orderNumber.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'No se encontró el pedido con los datos proporcionados')
        setTracking(null)
        setLoading(false)
        return
      }

      // Formatear dados do pedido para exibição
      setTracking({
        orderNumber: data.order.orderNumber,
        orderId: data.order.orderId,
        status: data.order.status,
        statusText: data.order.statusText,
        estimatedDelivery: data.order.estimatedDelivery,
        currentLocation: data.order.currentLocation,
        trackingInfo: data.order.trackingInfo || [],
        history: data.order.history || [],
        total: data.order.total,
        currency: data.order.currency,
        lineItems: data.order.lineItems || [],
      })

      setError('')
    } catch (err) {
      console.error('Error searching order:', err)
      setError('Ocurrió un error al buscar el pedido. Por favor, intenta nuevamente.')
      setTracking(null)
    } finally {
      setLoading(false)
    }
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
                {t.orderTrackingTitle}
              </h1>
            </div>
            <p className="text-white/60 text-base md:text-lg">
              {t.trackYourOrder}
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
                  {t.enterYourData}
                </h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-white text-sm font-bold mb-2">
                      {t.orderNumberLabel} *
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
                        {t.searching}
                      </>
                    ) : (
                      <>
                        <Search className="w-5 h-5" />
                        {t.trackOrderButton}
                      </>
                    )}
                  </button>
                </form>

                {/* Info adicional */}
                <div className="mt-8 p-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-lg">
                  <p className="text-white/80 text-sm">
                    {t.orderNumberTip}
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
                    <div>
                      <h2 className="text-2xl font-bold text-white mb-1">
                        {t.orderStatus}
                      </h2>
                      <p className="text-brand-yellow font-semibold">
                        {tracking.statusText || 'Procesando'}
                      </p>
                    </div>
                    {getStatusIcon(tracking.status)}
                  </div>

                  {/* Order Info */}
                  <div className="mb-6 pb-6 border-b border-white/10">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-white/60 text-sm mb-1">{t.order}</p>
                        <p className="text-white font-bold">{tracking.orderNumber}</p>
                      </div>
                      <div>
                        <p className="text-white/60 text-sm mb-1">{t.estimatedDelivery}</p>
                        <p className="text-brand-yellow font-bold">{tracking.estimatedDelivery}</p>
                      </div>
                    </div>
                  </div>

                  {/* Current Location */}
                  <div className="mb-6 p-4 bg-brand-yellow/10 border border-brand-yellow/30 rounded-lg">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-white/60 text-sm mb-1">{t.currentLocation}</p>
                        <p className="text-white font-bold">{tracking.currentLocation}</p>
                      </div>
                    </div>
                  </div>

                  {/* Tracking Information */}
                  {tracking.trackingInfo && tracking.trackingInfo.length > 0 && (
                    <div className="mb-6 space-y-3">
                      <h3 className="text-white font-bold mb-3">Información de Rastreo</h3>
                      {tracking.trackingInfo.map((info, index) => (
                        <div
                          key={index}
                          className="p-4 bg-white/5 border border-white/10 rounded-lg"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white/60 text-sm">Transportadora</p>
                            <p className="text-white font-bold">{info.company}</p>
                          </div>
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-white/60 text-sm">Número de Rastreo</p>
                            <p className="text-brand-yellow font-mono text-sm">
                              {info.number}
                            </p>
                          </div>
                          {info.url && (
                            <a
                              href={info.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 text-brand-yellow hover:text-yellow-400 text-sm font-semibold mt-2 transition-colors"
                            >
                              <Truck className="w-4 h-4" />
                              Rastrear en {info.company}
                            </a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Tracking History */}
                  <div>
                    <h3 className="text-white font-bold mb-4">{t.trackingHistory}</h3>
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
                    {t.enterOrderNumber}
                  </h3>
                  <p className="text-white/60 text-center">
                    {t.completeFormToTrack}
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
            <h3 className="text-2xl font-bold text-white mb-4">{t.needHelp}</h3>
            <p className="text-white/80 mb-6">
              {t.needHelpDescription}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contactanos"
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                {t.contactSupport}
              </Link>
              <Link
                href="/preguntas-frecuentes"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                {t.viewFaqs}
              </Link>
            </div>
          </motion.div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
