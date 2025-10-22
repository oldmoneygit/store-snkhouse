'use client'

import Link from 'next/link'
import { ChevronLeft, Heart, ShoppingCart, Trash2 } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import Image from '@/components/OptimizedImage'
import { useWishlist } from '@/context/WishlistContext'
import { useCart } from '@/context/CartContext'
import { useState } from 'react'

export default function FavoritosPage() {
  const { wishlistItems, removeFromWishlist, clearWishlist } = useWishlist()
  const { addToCart } = useCart()
  const [removingId, setRemovingId] = useState(null)

  const handleRemove = (productId) => {
    setRemovingId(productId)
    setTimeout(() => {
      removeFromWishlist(productId)
      setRemovingId(null)
    }, 300)
  }

  const handleAddToCart = (product) => {
    // Add with default size (will need to select size on product page)
    // For now, we'll redirect to product page
    window.location.href = `/product/${product.slug}`
  }

  const handleClearAll = () => {
    if (confirm('¿Estás seguro de que quieres eliminar todos los favoritos?')) {
      clearWishlist()
    }
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-black">
        {/* Back Button */}
        <div className="container mx-auto px-4 pt-6 md:pt-8 pb-4 md:pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-white/60 hover:text-brand-yellow transition-colors text-sm md:text-base"
          >
            <ChevronLeft className="w-4 h-4" />
            Volver a la tienda
          </Link>
        </div>

        {/* Page Content */}
        <div className="container mx-auto px-4 pb-12">
          <div className="max-w-6xl mx-auto">
            {/* Page Title */}
            <div className="mb-8 md:mb-12 flex items-center justify-between">
              <div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-black text-white mb-2 flex items-center gap-3">
                  <Heart className="w-8 h-8 md:w-10 md:h-10 text-red-500 fill-red-500" />
                  Mis Favoritos
                </h1>
                <p className="text-white/60 text-sm md:text-base">
                  {wishlistItems.length === 0
                    ? 'Aún no tienes productos favoritos'
                    : `${wishlistItems.length} ${wishlistItems.length === 1 ? 'producto' : 'productos'} guardados`}
                </p>
              </div>

              {/* Clear All Button */}
              {wishlistItems.length > 0 && (
                <motion.button
                  onClick={handleClearAll}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-semibold"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Trash2 className="w-4 h-4" />
                  Limpiar Todo
                </motion.button>
              )}
            </div>

            {wishlistItems.length === 0 ? (
              /* Empty Wishlist State */
              <div className="text-center py-16 md:py-20">
                <div className="flex justify-center mb-6">
                  <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center">
                    <Heart className="w-12 h-12 text-red-500/50" />
                  </div>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
                  Tu lista de favoritos está vacía
                </h2>
                <p className="text-white/60 mb-8 max-w-md mx-auto">
                  Explora nuestra colección y guarda los sneakers que más te gusten
                </p>
                <Link
                  href="/"
                  className="inline-flex items-center justify-center gap-2 bg-brand-yellow text-black px-8 py-3 rounded-lg font-bold text-base md:text-lg uppercase tracking-wide hover:bg-yellow-400 transition-all duration-300 hover:scale-105 shadow-lg shadow-brand-yellow/20"
                >
                  Explorar Productos
                </Link>
              </div>
            ) : (
              /* Wishlist with Items */
              <>
                {/* Clear All Button Mobile */}
                <div className="md:hidden mb-6">
                  <motion.button
                    onClick={handleClearAll}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500/10 border border-red-500/30 text-red-500 rounded-lg hover:bg-red-500/20 transition-colors text-sm font-semibold"
                    whileTap={{ scale: 0.98 }}
                  >
                    <Trash2 className="w-4 h-4" />
                    Limpiar Todo
                  </motion.button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  <AnimatePresence mode="popLayout">
                    {wishlistItems.map((product) => (
                      <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{
                          opacity: removingId === product.id ? 0 : 1,
                          scale: removingId === product.id ? 0.9 : 1,
                        }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
                        className="group relative bg-white/5 border-2 border-white/10 rounded-xl overflow-hidden hover:border-brand-yellow/50 transition-all duration-300"
                      >
                        {/* Product Image */}
                        <Link href={`/product/${product.slug}`} className="block">
                          <div className="relative aspect-square bg-black p-4">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        </Link>

                        {/* Remove Button */}
                        <motion.button
                          onClick={() => handleRemove(product.id)}
                          className="absolute top-3 right-3 w-10 h-10 bg-red-500/90 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-sm transition-colors z-10"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>

                        {/* Product Info */}
                        <div className="p-4 space-y-3">
                          <Link href={`/product/${product.slug}`}>
                            <h3 className="text-white font-bold text-sm md:text-base line-clamp-2 hover:text-brand-yellow transition-colors">
                              {product.name}
                            </h3>
                          </Link>

                          {/* Tags */}
                          {product.tags && product.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1">
                              {product.tags.slice(0, 2).map((tag, index) => (
                                <span
                                  key={index}
                                  className="px-2 py-0.5 bg-brand-yellow/10 text-brand-yellow text-[11px] font-semibold rounded uppercase"
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}

                          {/* Price */}
                          <div className="flex items-baseline gap-2">
                            <span className="text-brand-yellow text-xl md:text-2xl font-black">
                              {product.currency === 'USD' ? '$' : 'AR$'} {product.price.toLocaleString()}
                            </span>
                          </div>

                          {/* Action Button */}
                          <Link
                            href={`/product/${product.slug}`}
                            className="w-full flex items-center justify-center gap-2 bg-brand-yellow text-black py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-yellow-400 transition-all duration-300 shadow-lg shadow-brand-yellow/20"
                          >
                            <ShoppingCart className="w-4 h-4" />
                            Ver Producto
                          </Link>
                        </div>

                        {/* Added date */}
                        <div className="px-4 pb-3">
                          <p className="text-white/40 text-xs">
                            Agregado {new Date(product.addedAt).toLocaleDateString('es-ES', {
                              day: 'numeric',
                              month: 'short'
                            })}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
