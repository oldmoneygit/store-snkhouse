'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Search, Menu, X, ChevronDown, Heart } from 'lucide-react'
import Image from '@/components/OptimizedImage'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import PromotionalBanner from './PromotionalBanner'
import productsData from '../../../data/products.json'
import { useCart } from '@/context/CartContext'
import { useWishlist } from '@/context/WishlistContext'
import { useCountry } from '@/hooks/useCountry'
import { convertPrice, formatCurrency } from '@/utils/currency'

const Header = () => {
  const { getItemCount } = useCart()
  const { getItemCount: getWishlistCount } = useWishlist()
  const country = useCountry()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [airJordanOpen, setAirJordanOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [showSearchResults, setShowSearchResults] = useState(false)
  const searchRef = useRef(null)

  const cartItemCount = getItemCount()
  const wishlistItemCount = getWishlistCount()

  const airJordanSubMenu = [
    { name: 'Air Jordan 1 Low', href: '/collection/jordan-low' },
    { name: 'Air Jordan 1 Mid', href: '/collection/jordan-mid' },
    { name: 'Air Jordan 1 High', href: '/collection/jordan-high' },
    { name: 'Air Jordan 3', href: '/collection/air-jordan-3' },
    { name: 'Air Jordan 4', href: '/collection/air-jordan-4' },
    { name: 'Air Jordan 5', href: '/collection/air-jordan-5' },
    { name: 'Air Jordan 6', href: '/collection/air-jordan-6' },
    { name: 'Air Jordan 11', href: '/collection/air-jordan-11' },
  ]

  const menuItems = [
    { name: 'TRAVIS SCOTT', href: '/collection/travis-scott' },
    { name: 'MÁS VENDIDOS', href: '/#bestsellers' },
    { name: 'AIR JORDAN', href: '/collection/air-jordan-1', hasSubmenu: true },
    { name: 'NIKE DUNK', href: '/collection/dunk-low' },
    { name: 'AIR FORCE', href: '/collection/air-force-1' },
    { name: 'YEEZY', href: '/collection/yeezy' },
    { name: 'SEGUIMIENTO DE PEDIDO', href: '/seguimiento-de-pedido' },
    { name: 'CONTACTO', href: '/contactanos' },
  ]

  // Pesquisa dinâmica
  useEffect(() => {
    if (searchQuery.trim().length > 2) {
      const filtered = productsData.products
        .filter(product =>
          product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
        .slice(0, 5) // Limitar a 5 resultados
      setSearchResults(filtered)
      setShowSearchResults(true)
    } else {
      setSearchResults([])
      setShowSearchResults(false)
    }
  }, [searchQuery])

  // Fechar dropdown ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  // Função de pesquisa
  const handleSearch = (e) => {
    e?.preventDefault()
    if (searchQuery.trim()) {
      const encodedQuery = encodeURIComponent(searchQuery.trim())
      window.location.href = `/search?q=${encodedQuery}`
    }
  }

  // Pressionar Enter na busca
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <>
      <PromotionalBanner />
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="relative z-50 bg-black backdrop-blur-xl border-b-2 border-brand-yellow/30 shadow-lg shadow-brand-yellow/5"
      >
        {/* Top Bar - Logo, Search Bar, Cart - All Centered */}
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between lg:justify-center gap-6 max-w-6xl mx-auto">
            {/* Mobile Menu Button - Left */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-white hover:text-brand-yellow transition-colors duration-200 order-1"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - Center on mobile, left on desktop */}
            <Link href="/" className="flex items-center group flex-shrink-0 order-2 lg:order-1">
              <div className="relative w-40 h-12 md:w-48 md:h-13 transition-all duration-300 group-hover:scale-105 group-hover:brightness-110">
                <Image
                  src="/images/logo/snkhouse-logo-white.png"
                  alt="SNKHOUSE Logo"
                  fill
                  className="object-contain"
                  priority
                />
                <div className="absolute inset-0 bg-brand-yellow/0 group-hover:bg-brand-yellow/5 transition-all duration-300 blur-xl" />
              </div>
            </Link>

            {/* Search Bar - Center (Expanded) */}
            <div className="hidden lg:flex flex-1 max-w-xl order-3 lg:order-2" ref={searchRef}>
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 bg-zinc-900 border-2 border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-brand-yellow transition-colors duration-200"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-full px-4 bg-brand-yellow text-black rounded-r-lg hover:bg-brand-yellow/90 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>

                {/* Dropdown de resultados */}
                <AnimatePresence>
                  {showSearchResults && searchResults.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 right-0 mt-2 bg-zinc-900 border-2 border-brand-yellow/30 rounded-lg shadow-xl shadow-brand-yellow/10 overflow-hidden z-50"
                    >
                      {searchResults.map((product) => (
                        <Link
                          key={product.id}
                          href={`/product/${product.slug}`}
                          onClick={() => {
                            setShowSearchResults(false)
                            setSearchQuery('')
                          }}
                          className="flex items-center gap-3 px-4 py-3 hover:bg-brand-yellow/10 transition-colors border-b border-zinc-800 last:border-0"
                        >
                          <div className="relative w-12 h-12 bg-white rounded flex-shrink-0">
                            <Image
                              src={product.image}
                              alt={product.name}
                              fill
                              className="object-contain p-1"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-semibold truncate">{product.name}</p>
                            <p className="text-brand-yellow text-sm font-bold">
                              {formatCurrency(convertPrice(product.price, country.currency.code), country.currency)}
                            </p>
                          </div>
                        </Link>
                      ))}
                      <button
                        onClick={handleSearch}
                        className="w-full px-4 py-3 bg-brand-yellow/10 hover:bg-brand-yellow/20 text-brand-yellow font-semibold text-sm transition-colors"
                      >
                        Ver todos los resultados para &ldquo;{searchQuery}&rdquo;
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            {/* Wishlist & Cart Icons - Right */}
            <div className="flex items-center gap-3 flex-shrink-0 order-3 lg:order-3">
              {/* Wishlist Icon */}
              <Link
                href="/favoritos"
                className="relative p-2 text-white hover:text-red-500 transition-colors duration-200 group"
                aria-label="Favoritos"
              >
                <Heart size={24} className={wishlistItemCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>

              {/* Cart Icon */}
              <Link
                href="/carrito"
                className="relative p-2 text-white hover:text-brand-yellow transition-colors duration-200"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-yellow text-black text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar - Menu Centered */}
        <nav className="hidden lg:block border-t border-brand-yellow/20">
          <ul className="container mx-auto px-6 flex items-center justify-center space-x-2 py-3">
            {menuItems.map((item) => (
              <li
                key={item.name}
                className="relative"
                onMouseEnter={() => item.hasSubmenu && setAirJordanOpen(true)}
                onMouseLeave={() => item.hasSubmenu && setAirJordanOpen(false)}
              >
                {item.hasSubmenu ? (
                  <>
                    <button
                      className="flex items-center gap-1.5 px-4 py-2 text-white font-black text-[13px] tracking-wider uppercase hover:text-brand-yellow transition-colors duration-200"
                    >
                      {item.name}
                      <ChevronDown size={16} className={`transition-transform duration-200 ${airJordanOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {airJordanOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 10 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-56 bg-black border-2 border-brand-yellow/30 rounded-lg shadow-xl shadow-brand-yellow/10 py-2 z-50"
                        >
                          {airJordanSubMenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              className="block px-4 py-2.5 text-white text-sm font-semibold hover:bg-brand-yellow/10 hover:text-brand-yellow transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center gap-1.5 px-4 py-2 text-white font-black text-[13px] tracking-wider uppercase hover:text-brand-yellow transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </li>
            ))}
          </ul>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          className="absolute inset-x-0 z-40 bg-black lg:hidden overflow-y-auto max-h-screen"
        >
          <div className="flex flex-col items-center justify-start h-full space-y-4 px-6 py-8">
            {menuItems.map((item, index) => (
              <motion.div
                key={item.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="w-full"
              >
                {item.hasSubmenu ? (
                  <div className="w-full">
                    <button
                      onClick={() => setAirJordanOpen(!airJordanOpen)}
                      className="flex items-center justify-center gap-2 w-full text-white hover:text-brand-yellow text-xl font-bold tracking-[0.15em] transition-colors duration-200"
                    >
                      {item.name}
                      <ChevronDown size={20} className={`transition-transform duration-200 ${airJordanOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {airJordanOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          className="overflow-hidden mt-3 space-y-2"
                        >
                          {airJordanSubMenu.map((subItem) => (
                            <Link
                              key={subItem.name}
                              href={subItem.href}
                              onClick={() => setMobileMenuOpen(false)}
                              className="block text-center py-2 text-white/80 hover:text-brand-yellow text-base font-medium transition-colors duration-200"
                            >
                              {subItem.name}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                  <Link
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-center gap-1.5 text-white hover:text-brand-yellow text-xl font-bold tracking-[0.15em] transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                )}
              </motion.div>
            ))}

            {/* Barra de pesquisa mobile */}
            <div className="w-full pt-6">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="w-full px-4 py-3 pr-12 bg-zinc-900 border-2 border-zinc-800 rounded-lg text-white placeholder-zinc-500 focus:outline-none focus:border-brand-yellow transition-colors duration-200"
                />
                <button
                  onClick={handleSearch}
                  className="absolute right-0 top-0 h-full px-4 bg-brand-yellow text-black rounded-r-lg hover:bg-brand-yellow/90 transition-colors duration-200"
                  aria-label="Search"
                >
                  <Search size={20} />
                </button>
              </div>

              {/* Resultados mobile */}
              {showSearchResults && searchResults.length > 0 && (
                <div className="mt-3 bg-zinc-900 border-2 border-brand-yellow/30 rounded-lg overflow-hidden">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/product/${product.slug}`}
                      onClick={() => {
                        setShowSearchResults(false)
                        setSearchQuery('')
                        setMobileMenuOpen(false)
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-brand-yellow/10 transition-colors border-b border-zinc-800 last:border-0"
                    >
                      <div className="relative w-12 h-12 bg-white rounded flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-contain p-1"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-semibold truncate">{product.name}</p>
                        <p className="text-brand-yellow text-sm font-bold">
                          {formatCurrency(convertPrice(product.price, country.currency.code), country.currency)}
                        </p>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-6 pt-4">
              <Link
                href="/favoritos"
                onClick={() => setMobileMenuOpen(false)}
                className="relative p-3 text-white hover:text-red-500 transition-colors duration-200"
                aria-label="Favoritos"
              >
                <Heart size={24} className={wishlistItemCount > 0 ? 'fill-red-500 text-red-500' : ''} />
                {wishlistItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                    {wishlistItemCount}
                  </span>
                )}
              </Link>
              <Link
                href="/carrito"
                onClick={() => setMobileMenuOpen(false)}
                className="relative p-3 text-white hover:text-brand-yellow transition-colors duration-200"
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={24} />
                {cartItemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-brand-yellow text-black text-[10px] font-black w-4 h-4 flex items-center justify-center rounded-full">
                    {cartItemCount}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </>
  )
}

export default Header
