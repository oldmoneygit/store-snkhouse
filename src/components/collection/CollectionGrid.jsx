'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ProductCard from '@/components/store/ProductCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const PRODUCTS_PER_PAGE = 20

const CollectionGrid = ({ products, collectionName }) => {
  const [currentPage, setCurrentPage] = useState(1)

  if (products.length === 0) {
    return (
      <div className="text-center py-20">
        <p className="text-white/60 text-lg">
          No hay productos disponibles en esta colección
        </p>
      </div>
    )
  }

  // Calcular paginação
  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE)
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE
  const endIndex = startIndex + PRODUCTS_PER_PAGE
  const currentProducts = products.slice(startIndex, endIndex)

  // Funções de navegação
  const goToPage = (page) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const goToPrevPage = () => {
    if (currentPage > 1) {
      goToPage(currentPage - 1)
    }
  }

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      goToPage(currentPage + 1)
    }
  }

  // Gerar array de páginas para mostrar
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // Mostrar todas as páginas se forem poucas
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Mostrar páginas com ellipsis
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) pages.push(i)
        pages.push('...')
        pages.push(totalPages)
      } else if (currentPage >= totalPages - 2) {
        pages.push(1)
        pages.push('...')
        for (let i = totalPages - 3; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        pages.push('...')
        pages.push(currentPage - 1)
        pages.push(currentPage)
        pages.push(currentPage + 1)
        pages.push('...')
        pages.push(totalPages)
      }
    }

    return pages
  }

  return (
    <section className="py-8">
      <div className="max-w-7xl mx-auto">
        {/* Info de paginação */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-white/60 text-sm md:text-base">
            Mostrando{' '}
            <span className="text-brand-yellow font-bold">{startIndex + 1}</span>
            {' '}-{' '}
            <span className="text-brand-yellow font-bold">{Math.min(endIndex, products.length)}</span>
            {' '}de{' '}
            <span className="text-brand-yellow font-bold">{products.length}</span>
            {' '}{products.length === 1 ? 'producto' : 'productos'}
          </p>

          {totalPages > 1 && (
            <p className="text-white/60 text-sm">
              Página <span className="text-brand-yellow font-bold">{currentPage}</span> de{' '}
              <span className="text-brand-yellow font-bold">{totalPages}</span>
            </p>
          )}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {currentProducts.map((product, index) => (
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

        {/* Paginação */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mt-12 pt-8 border-t border-white/10"
          >
            <div className="flex items-center justify-center gap-2">
              {/* Botão Anterior */}
              <button
                onClick={goToPrevPage}
                disabled={currentPage === 1}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === 1
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-brand-yellow hover:text-black'
                }`}
                aria-label="Página anterior"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Números de página */}
              {getPageNumbers().map((page, index) => (
                page === '...' ? (
                  <span key={`ellipsis-${index}`} className="px-2 text-white/40">
                    ...
                  </span>
                ) : (
                  <button
                    key={page}
                    onClick={() => goToPage(page)}
                    className={`min-w-[40px] h-10 rounded-lg font-bold transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-brand-yellow text-black scale-110'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    {page}
                  </button>
                )
              ))}

              {/* Botão Próximo */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className={`p-2 rounded-lg transition-all duration-200 ${
                  currentPage === totalPages
                    ? 'bg-white/5 text-white/30 cursor-not-allowed'
                    : 'bg-white/10 text-white hover:bg-brand-yellow hover:text-black'
                }`}
                aria-label="Próxima página"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </motion.div>
        )}

        {/* Products Count Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-white/60 text-sm md:text-base">
            Total de{' '}
            <span className="text-brand-yellow font-bold">{products.length}</span>{' '}
            {products.length === 1 ? 'producto' : 'productos'} en{' '}
            <span className="text-white font-semibold">{collectionName}</span>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default CollectionGrid
