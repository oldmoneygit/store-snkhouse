'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import ProductCard from '@/components/store/ProductCard'
import { Search, Filter } from 'lucide-react'
import { motion } from 'framer-motion'
import productsData from '../../../data/products.json'

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')

  // Buscar produtos
  useEffect(() => {
    setLoading(true)

    if (!query || query.trim().length < 2) {
      setResults([])
      setLoading(false)
      return
    }

    // Filtrar produtos (excluir seedream IDs 53-77)
    const searchTerm = query.toLowerCase().trim()
    const filtered = productsData.products.filter(product => {
      // Excluir produtos seedream
      if (product.id >= 53 && product.id <= 77) return false

      // Filtrar por categoria se selecionada
      if (selectedCategory !== 'all' && product.category !== selectedCategory) {
        return false
      }

      // Buscar no nome
      const matchName = product.name.toLowerCase().includes(searchTerm)

      // Buscar nas tags
      const matchTags = product.tags && product.tags.some(tag =>
        tag.toLowerCase().includes(searchTerm)
      )

      // Buscar na categoria
      const matchCategory = product.category && product.category.toLowerCase().includes(searchTerm)

      return matchName || matchTags || matchCategory
    })

    setResults(filtered)
    setLoading(false)
  }, [query, selectedCategory])

  // Categorias disponíveis
  const categories = [
    { slug: 'all', name: 'Todos' },
    { slug: 'travis-scott', name: 'Travis Scott' },
    { slug: 'air-jordan-1', name: 'Air Jordan 1' },
    { slug: 'air-jordan-4', name: 'Air Jordan 4' },
    { slug: 'dunk-low', name: 'Dunk Low' },
    { slug: 'yeezy', name: 'Yeezy' },
    { slug: 'air-force-1', name: 'Air Force 1' },
  ]

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        <div className="container mx-auto px-4 pt-6 md:pt-8 pb-12">
          {/* Header da busca */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-4">
              <Search className="w-8 h-8 text-brand-yellow" />
              <h1 className="text-3xl md:text-4xl font-black text-white">
                Resultados de búsqueda
              </h1>
            </div>

            {query && (
              <p className="text-white/60 text-lg">
                Buscando por: <span className="text-brand-yellow font-bold">"{query}"</span>
              </p>
            )}
          </motion.div>

          {/* Filtros por categoria */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-brand-yellow" />
              <h2 className="text-xl font-bold text-white">Filtrar por categoría</h2>
            </div>

            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.slug}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`px-4 py-2 rounded-full text-sm font-bold transition-all duration-200 ${
                    selectedCategory === cat.slug
                      ? 'bg-brand-yellow text-black'
                      : 'bg-white/10 text-white hover:bg-white/20'
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Loading */}
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-brand-yellow"></div>
            </div>
          )}

          {/* Resultados */}
          {!loading && query && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="mb-6"
              >
                <p className="text-white text-lg">
                  {results.length === 0 ? (
                    <>No se encontraron productos</>
                  ) : (
                    <>
                      <span className="text-brand-yellow font-bold">{results.length}</span>{' '}
                      {results.length === 1 ? 'producto encontrado' : 'productos encontrados'}
                    </>
                  )}
                </p>
              </motion.div>

              {results.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                  {results.map((product, index) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.05 }}
                    >
                      <ProductCard product={product} index={index} />
                    </motion.div>
                  ))}
                </div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <div className="text-6xl mb-4">😢</div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    No encontramos nada
                  </h3>
                  <p className="text-white/60 mb-6">
                    Intenta buscar con otros términos
                  </p>
                  <button
                    onClick={() => window.location.href = '/'}
                    className="bg-brand-yellow text-black px-6 py-3 rounded-full font-bold hover:bg-yellow-500 transition-colors"
                  >
                    Volver a la tienda
                  </button>
                </motion.div>
              )}
            </>
          )}

          {/* Estado inicial */}
          {!loading && !query && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-white mb-2">
                ¿Qué estás buscando?
              </h3>
              <p className="text-white/60">
                Escribe en la barra de búsqueda para encontrar tus sneakers favoritos
              </p>
            </motion.div>
          )}
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
