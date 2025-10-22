'use client'

import { createContext, useContext, useState, useEffect } from 'react'

const WishlistContext = createContext()

export const useWishlist = () => {
  const context = useContext(WishlistContext)
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider')
  }
  return context
}

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem('snkhouse_wishlist')
      if (savedWishlist) {
        setWishlistItems(JSON.parse(savedWishlist))
      }
    } catch (error) {
      console.error('Error loading wishlist from localStorage:', error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem('snkhouse_wishlist', JSON.stringify(wishlistItems))
      } catch (error) {
        console.error('Error saving wishlist to localStorage:', error)
      }
    }
  }, [wishlistItems, isLoaded])

  // Add product to wishlist
  const addToWishlist = (product) => {
    setWishlistItems((prevItems) => {
      // Check if product already exists in wishlist
      const exists = prevItems.some((item) => item.id === product.id)

      if (exists) {
        console.log('Product already in wishlist:', product.name)
        return prevItems
      }

      // Add new product to wishlist
      const newItem = {
        id: product.id,
        name: product.name,
        slug: product.slug,
        price: product.price,
        currency: product.currency,
        image: product.image,
        tags: product.tags,
        addedAt: new Date().toISOString(),
      }

      console.log('Added to wishlist:', newItem)
      return [...prevItems, newItem]
    })
  }

  // Remove product from wishlist
  const removeFromWishlist = (productId) => {
    setWishlistItems((prevItems) => {
      const filtered = prevItems.filter((item) => item.id !== productId)
      console.log('Removed from wishlist:', productId)
      return filtered
    })
  }

  // Toggle product in wishlist (add if not exists, remove if exists)
  const toggleWishlist = (product) => {
    const exists = wishlistItems.some((item) => item.id === product.id)

    if (exists) {
      removeFromWishlist(product.id)
      return false // Removed
    } else {
      addToWishlist(product)
      return true // Added
    }
  }

  // Check if product is in wishlist
  const isInWishlist = (productId) => {
    return wishlistItems.some((item) => item.id === productId)
  }

  // Get total number of items in wishlist
  const getItemCount = () => {
    return wishlistItems.length
  }

  // Clear entire wishlist
  const clearWishlist = () => {
    setWishlistItems([])
    console.log('Wishlist cleared')
  }

  const value = {
    wishlistItems,
    addToWishlist,
    removeFromWishlist,
    toggleWishlist,
    isInWishlist,
    getItemCount,
    clearWishlist,
    isLoaded,
  }

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  )
}
