'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Crown, Mail, User, Phone, Send, CheckCircle2, AlertCircle } from 'lucide-react'

export default function VIPForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  })
  const [status, setStatus] = useState('idle') // idle, loading, success, error

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    // Simulate API call (replace with your actual backend endpoint)
    setTimeout(() => {
      console.log('VIP Form Submission:', formData)
      setStatus('success')

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: '', email: '', phone: '' })
        setStatus('idle')
      }, 3000)
    }, 1500)
  }

  return (
    <section className="relative py-24 px-4 bg-gradient-to-b from-black via-brand-yellow/5 to-black">
      <div className="max-w-2xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 glass-yellow mb-4">
            <Crown className="w-4 h-4 text-brand-yellow" />
            <span className="text-xs font-bold tracking-widest text-brand-yellow">
              ACCESO EXCLUSIVO
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-4">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">
              Lista VIP
            </span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Registrate para recibir acceso prioritario a drops exclusivos y el evento de inauguración
          </p>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative"
        >
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-br from-brand-yellow/20 to-purple-500/10 blur-2xl opacity-30" />

          {/* Form Card */}
          <div className="relative glass p-8 md:p-10">
            {status === 'success' ? (
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="text-center py-8"
              >
                <div className="w-20 h-20 bg-green-500/20 border-2 border-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle2 className="w-10 h-10 text-green-400" />
                </div>
                <h3 className="text-2xl font-black text-white mb-2">
                  ¡Bienvenido a la Lista VIP!
                </h3>
                <p className="text-gray-400 text-sm">
                  Te contactaremos pronto con novedades exclusivas
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Nombre Completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-yellow/50" />
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      placeholder="Juan Pérez"
                      className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-brand-yellow focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-yellow/50" />
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      placeholder="juan@example.com"
                      className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-brand-yellow focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-bold text-gray-300 mb-2 uppercase tracking-wider">
                    WhatsApp <span className="text-gray-600">(Opcional)</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-brand-yellow/50" />
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+54 11 1234-5678"
                      className="w-full bg-black/40 border border-white/10 pl-12 pr-4 py-4 text-white placeholder-gray-600 focus:border-brand-yellow focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  disabled={status === 'loading'}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-gradient-to-r from-brand-yellow to-yellow-500 text-black py-5 font-black text-base uppercase tracking-wider flex items-center justify-center gap-3 hover:shadow-glow-yellow-strong transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {status === 'loading' ? (
                    <>
                      <div className="w-5 h-5 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      PROCESANDO...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      UNIRME A LA LISTA VIP
                    </>
                  )}
                </motion.button>

                {/* Privacy Note */}
                <p className="text-center text-gray-600 text-xs font-mono">
                  No spam. Solo contenido exclusivo para VIPs.
                </p>
              </form>
            )}
          </div>
        </motion.div>

        {/* Benefits List */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 grid md:grid-cols-3 gap-4"
        >
          {[
            { icon: Crown, text: "Acceso Prioritario" },
            { icon: Mail, text: "Drops Exclusivos" },
            { icon: CheckCircle2, text: "Invitación Opening" }
          ].map((benefit, idx) => (
            <div key={idx} className="glass p-4 flex items-center gap-3 group hover:border-brand-yellow/50 transition-all duration-300">
              <benefit.icon className="w-5 h-5 text-brand-yellow flex-shrink-0" />
              <span className="text-sm text-gray-300 font-medium">{benefit.text}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
