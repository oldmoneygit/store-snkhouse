'use client'

import { useState } from 'react'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import { HelpCircle, ChevronDown, Search } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'

export default function PreguntasFrecuentesPage() {
  const [openIndex, setOpenIndex] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const faqs = [
    {
      category: 'Productos',
      questions: [
        {
          q: '¿Los productos son originales?',
          a: 'Nuestros productos son réplicas AAA+ de calidad 1:1, fabricadas con los mismos materiales y técnicas que las versiones originales. Ofrecemos la mejor calidad del mercado a precios accesibles.',
        },
        {
          q: '¿Qué significa calidad AAA+ o 1:1?',
          a: 'AAA+ o 1:1 significa que son réplicas de máxima calidad, idénticas a los originales en apariencia, materiales y construcción. Son prácticamente indistinguibles de las versiones retail.',
        },
        {
          q: '¿Tienen garantía los productos?',
          a: 'Sí, todos nuestros productos cuentan con garantía contra defectos de fabricación. Si tu producto llega con algún defecto, lo cambiamos sin costo adicional.',
        },
        {
          q: '¿Tienen todas las tallas disponibles?',
          a: 'Trabajamos con un amplio rango de tallas desde US 6 hasta US 13 en hombres, y US 5 hasta US 12 en mujeres. Si no ves tu talla disponible, contáctanos y verificaremos stock.',
        },
      ],
    },
    {
      category: 'Envíos y Entregas',
      questions: [
        {
          q: '¿Hacen envíos a todo Argentina?',
          a: 'Sí, realizamos envíos a todo el territorio argentino sin costo adicional. El plazo de entrega varía según la ubicación: CABA y GBA (2-4 días), Interior (5-10 días).',
        },
        {
          q: '¿Cuánto tarda el envío?',
          a: 'Los tiempos de entrega son: CABA y GBA: 2-4 días hábiles, Provincia de Buenos Aires: 4-7 días hábiles, Interior del país: 5-10 días hábiles.',
        },
        {
          q: '¿Puedo rastrear mi pedido?',
          a: 'Sí, una vez despachado tu pedido recibirás un número de seguimiento para que puedas rastrear tu envío en tiempo real.',
        },
        {
          q: '¿El envío tiene costo?',
          a: 'No, todos nuestros envíos son GRATIS a toda Argentina. No hay costos ocultos ni cargos adicionales.',
        },
      ],
    },
    {
      category: 'Pagos',
      questions: [
        {
          q: '¿Qué métodos de pago aceptan?',
          a: 'Aceptamos tarjetas de crédito y débito (Visa, Mastercard, American Express), Mercado Pago, transferencia bancaria y efectivo (en algunos puntos de entrega).',
        },
        {
          q: '¿Puedo pagar en cuotas?',
          a: 'Sí, aceptamos pagos en cuotas a través de Mercado Pago y tarjetas de crédito. La cantidad de cuotas depende de tu banco.',
        },
        {
          q: '¿Es seguro comprar en SNKHOUSE?',
          a: 'Completamente seguro. Utilizamos encriptación SSL y procesadores de pago certificados. Tus datos están protegidos en todo momento.',
        },
      ],
    },
    {
      category: 'Cambios y Devoluciones',
      questions: [
        {
          q: '¿Puedo cambiar o devolver mi pedido?',
          a: 'Sí, aceptamos cambios y devoluciones dentro de los 15 días de recibido el producto. El artículo debe estar sin uso, con etiquetas originales y en su caja.',
        },
        {
          q: '¿Cómo hago un cambio de talla?',
          a: 'Contáctanos por WhatsApp o email con tu número de pedido. Coordinamos el retiro del producto y te enviamos la nueva talla sin costo adicional.',
        },
        {
          q: '¿Quién paga el envío de la devolución?',
          a: 'Si el cambio es por error de talla, nosotros nos hacemos cargo del envío. Si es por cambio de modelo o devolución, el costo del envío es compartido.',
        },
        {
          q: '¿Cuándo recibo mi reembolso?',
          a: 'Una vez que recibamos y verifiquemos el producto devuelto, procesamos el reembolso en 5-7 días hábiles al mismo método de pago original.',
        },
      ],
    },
    {
      category: 'Cuenta y Pedidos',
      questions: [
        {
          q: '¿Necesito crear una cuenta para comprar?',
          a: 'No es obligatorio, pero te recomendamos crear una cuenta para rastrear tus pedidos fácilmente y recibir ofertas exclusivas.',
        },
        {
          q: '¿Cómo puedo modificar mi pedido?',
          a: 'Si tu pedido aún no fue despachado, contáctanos inmediatamente por WhatsApp y lo modificaremos sin problema.',
        },
        {
          q: '¿Puedo cancelar mi pedido?',
          a: 'Sí, puedes cancelar tu pedido sin costo si aún no fue despachado. Una vez despachado, aplican las políticas de devolución.',
        },
      ],
    },
    {
      category: 'Otros',
      questions: [
        {
          q: '¿Tienen tienda física?',
          a: 'Actualmente operamos 100% online para ofrecerte los mejores precios. Realizamos entregas a domicilio en toda Argentina.',
        },
        {
          q: '¿Hacen mayoreo o ventas al por mayor?',
          a: 'Sí, ofrecemos precios especiales para compras al por mayor. Contáctanos por WhatsApp para más información sobre precios y cantidades mínimas.',
        },
        {
          q: '¿Cómo puedo contactarlos?',
          a: 'Puedes contactarnos por WhatsApp, email (contacto@snkhouse.com), o a través de nuestras redes sociales. Respondemos todos los días de 9:00 a 21:00hs.',
        },
      ],
    },
  ]

  const toggleQuestion = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  // Filter FAQs based on search
  const filteredFaqs = faqs.map((category) => ({
    ...category,
    questions: category.questions.filter(
      (item) =>
        item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.a.toLowerCase().includes(searchQuery.toLowerCase())
    ),
  })).filter((category) => category.questions.length > 0)

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
              <HelpCircle className="w-8 h-8 md:w-10 md:h-10 text-brand-yellow" />
              <h1 className="text-3xl md:text-5xl font-black text-white">
                Preguntas Frecuentes
              </h1>
            </div>
            <p className="text-white/60 text-base md:text-lg">
              Encuentra respuestas rápidas a las preguntas más comunes
            </p>
          </motion.div>

          {/* Search */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="relative max-w-2xl">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Buscar pregunta..."
                className="w-full bg-white/5 backdrop-blur-sm border border-white/10 rounded-xl pl-12 pr-4 py-4 text-white placeholder:text-white/40 focus:border-brand-yellow focus:outline-none transition-colors"
              />
            </div>
          </motion.div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {filteredFaqs.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + categoryIndex * 0.1 }}
              >
                <h2 className="text-2xl font-bold text-brand-yellow mb-4">
                  {category.category}
                </h2>
                <div className="space-y-3">
                  {category.questions.map((item, questionIndex) => {
                    const globalIndex = `${categoryIndex}-${questionIndex}`
                    const isOpen = openIndex === globalIndex

                    return (
                      <div
                        key={questionIndex}
                        className="bg-gradient-to-br from-white/5 to-white/0 backdrop-blur-sm rounded-xl border border-white/10 overflow-hidden"
                      >
                        <button
                          onClick={() => toggleQuestion(globalIndex)}
                          className="w-full px-6 py-4 flex items-center justify-between text-left hover:bg-white/5 transition-colors"
                        >
                          <span className="text-white font-bold pr-4">
                            {item.q}
                          </span>
                          <ChevronDown
                            className={`w-5 h-5 text-brand-yellow flex-shrink-0 transition-transform duration-200 ${
                              isOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>

                        <AnimatePresence>
                          {isOpen && (
                            <motion.div
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: 'auto', opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              transition={{ duration: 0.2 }}
                            >
                              <div className="px-6 pb-4 text-white/80 leading-relaxed border-t border-white/10 pt-4">
                                {item.a}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    )
                  })}
                </div>
              </motion.div>
            ))}
          </div>

          {/* No results */}
          {filteredFaqs.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <HelpCircle className="w-20 h-20 text-white/20 mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-white mb-2">
                No encontramos resultados
              </h3>
              <p className="text-white/60 mb-6">
                Intenta con otros términos de búsqueda
              </p>
              <button
                onClick={() => setSearchQuery('')}
                className="bg-brand-yellow text-black px-6 py-3 rounded-lg font-bold hover:bg-yellow-500 transition-colors"
              >
                Ver todas las preguntas
              </button>
            </motion.div>
          )}

          {/* Ayuda adicional */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12 bg-gradient-to-r from-brand-yellow/10 to-yellow-500/10 border border-brand-yellow/30 rounded-xl p-6 md:p-8"
          >
            <h3 className="text-2xl font-bold text-white mb-4">
              ¿No encontraste lo que buscabas?
            </h3>
            <p className="text-white/80 mb-6">
              Nuestro equipo de soporte está disponible para ayudarte. Contáctanos y te responderemos a la brevedad.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="https://wa.me/5519319937944?text=Hola!%20Tengo%20una%20pregunta"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black font-bold px-6 py-3 rounded-lg hover:bg-yellow-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
                WhatsApp
              </a>
              <a
                href="mailto:contacto@snkhouse.com"
                className="inline-flex items-center justify-center gap-2 bg-white/10 text-white font-bold px-6 py-3 rounded-lg hover:bg-white/20 transition-colors"
              >
                Email
              </a>
            </div>
          </motion.div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
