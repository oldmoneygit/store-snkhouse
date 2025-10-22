'use client'

import { createContext, useContext, useState, useEffect } from 'react'
import { getCheckoutUrl } from '@/lib/shopify'
import { getShopifyVariantId } from '@/utils/getShopifyVariantId'
import { useCountry } from '@/hooks/useCountry'

const CartContext = createContext()

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([])
  const [isLoaded, setIsLoaded] = useState(false)
  const country = useCountry()

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('snkhouse_cart')
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart))
      } catch (error) {
        console.error('Error loading cart from localStorage:', error)
      }
    }
    setIsLoaded(true)
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('snkhouse_cart', JSON.stringify(cartItems))
    }
  }, [cartItems, isLoaded])

  // Add item to cart or update quantity if already exists
  const addToCart = (product, size, quantity = 1) => {
    setCartItems((prevItems) => {
      // Check if item with same product and size already exists
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === product.id && item.size == size // Use == for type coercion
      )

      if (existingItemIndex > -1) {
        // Update quantity of existing item
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex].quantity += quantity
        return updatedItems
      } else {
        // Find shopifyVariantId for this size
        let shopifyVariantId = null

        if (product.sizes && Array.isArray(product.sizes)) {
          // Check if sizes is new structure: [{size: 35, shopifyVariantId: "..."}]
          const sizeObj = product.sizes.find((s) =>
            typeof s === 'object' ? s.size == size : s == size // Use == for type coercion
          )

          if (sizeObj && typeof sizeObj === 'object') {
            // Get the correct variant ID for current country
            shopifyVariantId = getShopifyVariantId(
              sizeObj.shopifyVariantId,
              country.code
            )
          }
        }

        // Add new item
        return [
          ...prevItems,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            image: product.gallery?.[0] || product.image,
            price: product.price,
            currency: product.currency,
            size: size,
            quantity: quantity,
            shopifyVariantId: shopifyVariantId, // Will be null if not migrated yet
          },
        ]
      }
    })
  }

  // Update quantity of an item
  const updateQuantity = (id, size, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(id, size)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id && item.size == size // Use == for type coercion
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  // Remove item from cart
  const removeFromCart = (id, size) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => !(item.id === id && item.size == size)) // Use == for type coercion
    )
  }

  // Clear all items from cart
  const clearCart = () => {
    setCartItems([])
  }

  // Get total number of items in cart
  const getItemCount = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0)
  }

  // Get cart subtotal
  const getSubtotal = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  // Proceed to Shopify checkout
  const proceedToCheckout = async () => {
    if (cartItems.length === 0) {
      alert('Seu carrinho está vazio')
      return
    }

    try {
      console.log('🛒 Iniciando checkout com items:', cartItems)

      // Get Shopify checkout URL
      const checkoutUrl = await getCheckoutUrl(cartItems)

      console.log('✅ Checkout URL recebido:', checkoutUrl)

      // Redirect to Shopify checkout
      if (checkoutUrl && checkoutUrl.includes('shopify')) {
        console.log('🚀 Redirecionando para Shopify checkout...')
        window.location.href = checkoutUrl
      } else {
        throw new Error(`URL de checkout inválido: ${checkoutUrl}`)
      }
    } catch (error) {
      console.error('❌ Error creating checkout:', error)
      alert(`Erro ao criar checkout: ${error.message}\n\nVerifique o console para mais detalhes.`)
    }
  }

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getItemCount,
    getSubtotal,
    proceedToCheckout,
    isLoaded,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
