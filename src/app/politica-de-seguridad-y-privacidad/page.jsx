'use client'

import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { Shield, Lock, Eye, UserCheck, Database, CreditCard, FileText, AlertCircle } from 'lucide-react'
import { motion } from 'framer-motion'
import { useTranslation } from '@/hooks/useCountry'

export default function PoliticaSeguridadPage() {
  const t = useTranslation()
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
              <Shield className="w-8 h-8 md:w-10 md:h-10 text-brand-yellow" />
              <h1 className="text-3xl md:text-5xl font-black text-white">
                {t.privacyPolicyTitle}
              </h1>
            </div>
            <p className="text-white/60 text-base md:text-lg">
              {t.privacyPolicySubtitle}
            </p>
            <p className="text-white/40 text-sm mt-2">
              Última actualización: Octubre 2025
            </p>
          </motion.div>

          {/* Security Banner */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-12 bg-gradient-to-r from-green-500/20 to-green-500/0 border border-green-500/30 rounded-xl p-6 md:p-8"
          >
            <div className="flex items-start gap-4">
              <Lock className="w-12 h-12 text-green-500 flex-shrink-0" />
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  Tu información está protegida
                </h2>
                <p className="text-white/80">
                  Utilizamos encriptación SSL de 256 bits y las mejores prácticas de seguridad para proteger tus datos personales y financieros.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Recopilación de datos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Database className="w-7 h-7 text-brand-yellow" />
              Información que recopilamos
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
              <div className="space-y-6">
                <div>
                  <h3 className="text-white font-bold mb-3">Datos personales:</h3>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Nombre completo y datos de contacto (email, teléfono)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Dirección de envío y facturación</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Información de cuenta (si creas una)</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-3">Datos de transacción:</h3>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Historial de compras y pedidos</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Métodos de pago (encriptados y tokenizados)</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Información de envío y seguimiento</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-white font-bold mb-3">Datos técnicos:</h3>
                  <ul className="space-y-2 text-white/80 text-sm">
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Dirección IP y tipo de navegador</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Cookies y datos de navegación</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-brand-yellow">•</span>
                      <span>Dispositivo y sistema operativo</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Uso de la información */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Eye className="w-7 h-7 text-brand-yellow" />
              ¿Cómo usamos tu información?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  icon: <UserCheck className="w-6 h-6 text-brand-yellow" />,
                  title: 'Procesar pedidos',
                  desc: 'Para gestionar tus compras, envíos y comunicaciones relacionadas',
                },
                {
                  icon: <CreditCard className="w-6 h-6 text-brand-yellow" />,
                  title: 'Procesamiento de pagos',
                  desc: 'Para procesar transacciones de forma segura con nuestros proveedores',
                },
                {
                  icon: <Shield className="w-6 h-6 text-brand-yellow" />,
                  title: 'Prevención de fraude',
                  desc: 'Para detectar y prevenir actividades fraudulentas o sospechosas',
                },
                {
                  icon: <FileText className="w-6 h-6 text-brand-yellow" />,
                  title: 'Mejorar servicios',
                  desc: 'Para personalizar tu experiencia y mejorar nuestros productos',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <div className="flex items-start gap-3 mb-2">
                    {item.icon}
                    <h3 className="text-white font-bold">{item.title}</h3>
                  </div>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Seguridad de datos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
              <Lock className="w-7 h-7 text-brand-yellow" />
              Medidas de seguridad
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
              <div className="space-y-4">
                {[
                  {
                    title: 'Encriptación SSL/TLS',
                    desc: 'Toda la información sensible se transmite mediante encriptación de 256 bits.',
                  },
                  {
                    title: 'Tokenización de pagos',
                    desc: 'No almacenamos información completa de tarjetas de crédito. Usamos tokens seguros.',
                  },
                  {
                    title: 'Servidores protegidos',
                    desc: 'Nuestros servidores están protegidos con firewalls y sistemas de detección de intrusos.',
                  },
                  {
                    title: 'Acceso limitado',
                    desc: 'Solo personal autorizado tiene acceso a datos personales, bajo estrictas políticas.',
                  },
                  {
                    title: 'Auditorías regulares',
                    desc: 'Realizamos auditorías de seguridad periódicas y actualizaciones constantes.',
                  },
                  {
                    title: 'Cumplimiento normativo',
                    desc: 'Cumplimos con las regulaciones de protección de datos vigentes en Argentina.',
                  },
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <div className="w-2 h-2 rounded-full bg-brand-yellow flex-shrink-0 mt-2"></div>
                    <div>
                      <h3 className="text-white font-bold mb-1">{item.title}</h3>
                      <p className="text-white/60 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Compartir información */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Compartir información con terceros
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
              <p className="text-white/80 mb-4">
                Solo compartimos tu información con terceros en los siguientes casos:
              </p>
              <div className="space-y-3">
                {[
                  'Proveedores de envío para entregar tu pedido',
                  'Procesadores de pago para completar transacciones',
                  'Servicios de marketing (solo con tu consentimiento explícito)',
                  'Autoridades legales cuando sea requerido por ley',
                ].map((item, index) => (
                  <div key={index} className="flex gap-3 items-start">
                    <span className="text-brand-yellow text-xl">→</span>
                    <p className="text-white/80 text-sm">{item}</p>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                <p className="text-white/80 text-sm">
                  <strong className="text-green-400">Garantía:</strong> Nunca vendemos ni alquilamos tu información personal a terceros con fines comerciales.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Tus derechos */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Tus derechos sobre tus datos
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                {
                  title: 'Acceso',
                  desc: 'Puedes solicitar una copia de todos los datos que tenemos sobre ti',
                },
                {
                  title: 'Rectificación',
                  desc: 'Puedes actualizar o corregir información incorrecta en cualquier momento',
                },
                {
                  title: 'Eliminación',
                  desc: 'Puedes solicitar la eliminación de tus datos personales',
                },
                {
                  title: 'Portabilidad',
                  desc: 'Puedes solicitar tus datos en formato legible por máquina',
                },
                {
                  title: 'Oposición',
                  desc: 'Puedes oponerte al procesamiento de tus datos con fines de marketing',
                },
                {
                  title: 'Limitación',
                  desc: 'Puedes solicitar limitar el procesamiento de tus datos en ciertos casos',
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 border border-white/10"
                >
                  <h3 className="text-brand-yellow font-bold mb-2">{item.title}</h3>
                  <p className="text-white/60 text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Cookies */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mb-12"
          >
            <h2 className="text-2xl font-bold text-white mb-6">
              Uso de Cookies
            </h2>
            <div className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-white/10">
              <p className="text-white/80 mb-4">
                Utilizamos cookies para mejorar tu experiencia de navegación. Las cookies son pequeños archivos que se almacenan en tu dispositivo y nos ayudan a:
              </p>
              <ul className="space-y-2 text-white/80 text-sm mb-6">
                <li className="flex gap-2">
                  <span className="text-brand-yellow">✓</span>
                  <span>Recordar tus preferencias y configuración</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-yellow">✓</span>
                  <span>Mantener tu sesión iniciada</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-yellow">✓</span>
                  <span>Analizar el tráfico y uso del sitio</span>
                </li>
                <li className="flex gap-2">
                  <span className="text-brand-yellow">✓</span>
                  <span>Personalizar contenido y anuncios</span>
                </li>
              </ul>
              <p className="text-white/60 text-sm">
                Puedes configurar tu navegador para rechazar cookies, aunque esto puede afectar la funcionalidad del sitio.
              </p>
            </div>
          </motion.div>

          {/* Cambios en la política */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mb-8 bg-gradient-to-br from-orange-500/10 to-orange-500/0 backdrop-blur-sm rounded-xl p-6 md:p-8 border border-orange-500/30"
          >
            <div className="flex items-start gap-4">
              <AlertCircle className="w-8 h-8 text-orange-500 flex-shrink-0" />
              <div>
                <h3 className="text-2xl font-bold text-white mb-3">
                  Cambios en esta política
                </h3>
                <p className="text-white/80 mb-3">
                  Nos reservamos el derecho de actualizar esta política de privacidad en cualquier momento. Los cambios importantes serán notificados a través de:
                </p>
                <ul className="space-y-2 text-white/80 text-sm">
                  <li className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Email a tu dirección registrada</span>
                  </li>
                  <li className="flex gap-2">
                    <span className="text-orange-500">•</span>
                    <span>Aviso destacado en nuestro sitio web</span>
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Contacto */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="bg-gradient-to-r from-brand-yellow/10 to-yellow-500/10 border border-brand-yellow/30 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿Preguntas sobre privacidad?
            </h3>
            <p className="text-white/80 mb-6">
              Si tienes preguntas sobre esta política o sobre cómo manejamos tus datos, no dudes en contactarnos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="mailto:contacto@snkhouse.com"
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <Shield className="w-5 h-5" />
                Contactar sobre privacidad
              </a>
              <a
                href="/contactanos"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Soporte general
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
