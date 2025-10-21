'use client'

import { motion } from 'framer-motion'
import { MapPin } from 'lucide-react'
import { LOCATION_DATA } from '@/utils/constants'

const locationDetails = [
  { label: "Dirección", value: LOCATION_DATA.address },
  { label: "Barrio", value: LOCATION_DATA.neighborhood },
  { label: "Ciudad", value: `${LOCATION_DATA.city}, ${LOCATION_DATA.country}` }
]

export default function Location() {
  return (
    <section className="relative py-24 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-8 bg-gradient-to-br from-brand-yellow/20 to-purple-500/10 blur-3xl opacity-30" />

          {/* Card */}
          <div className="relative glass p-8 md:p-12">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 glass-yellow mb-6">
                  <MapPin className="w-4 h-4 text-brand-yellow" />
                  <span className="text-xs font-bold tracking-widest text-brand-yellow">
                    UBICACIÓN
                  </span>
                </div>

                <h3 className="text-4xl md:text-5xl font-black mb-8 leading-tight">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-yellow to-yellow-500">
                    {LOCATION_DATA.neighborhood}
                  </span>
                  <br />
                  <span className="text-white">{LOCATION_DATA.city}</span>
                </h3>

                <div className="space-y-4">
                  {locationDetails.map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.1 }}
                      className="flex items-start gap-4 group"
                    >
                      <div className="w-10 h-10 glass-yellow flex items-center justify-center flex-shrink-0 group-hover:border-brand-yellow group-hover:bg-brand-yellow/10 transition-all duration-300">
                        <MapPin className="w-5 h-5 text-brand-yellow" />
                      </div>
                      <div>
                        <p className="font-bold text-white text-sm uppercase tracking-wide mb-1">
                          {item.label}
                        </p>
                        <p className="text-gray-400 text-sm">{item.value}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Right Map - Google Maps Embed */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="relative aspect-video overflow-hidden rounded-2xl border-2 border-white/10 hover:border-brand-yellow/50 transition-all duration-300 group"
              >
                {/* Map Container */}
                <div className="absolute inset-0">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.483076429934!2d-58.42662492425144!3d-34.59063205729849!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb59c771eb933%3A0x6b3113b596d78c69!2sGodoy%20Cruz%202539%2C%20C1425FQD%20CABA%2C%20Argentina!5e0!3m2!1spt-BR!2sbr!4v1710000000000!5m2!1spt-BR!2sbr"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="grayscale hover:grayscale-0 transition-all duration-500"
                  ></iframe>
                </div>

                {/* Overlay Badge */}
                <div className="absolute top-4 left-4 glass-yellow px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-brand-yellow" />
                    <span className="text-xs font-bold text-brand-yellow">
                      Palermo, Buenos Aires
                    </span>
                  </div>
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-brand-yellow/30 pointer-events-none"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-brand-yellow/30 pointer-events-none"></div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
