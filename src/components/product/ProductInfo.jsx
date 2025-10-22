'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from '@/components/OptimizedImage'
import SizeSelector from './SizeSelector'
import SizeGuideModal from './SizeGuideModal'
import AddToCartToast from './AddToCartToast'
import QuantitySelector from './QuantitySelector'
import WishlistButton from '@/components/wishlist/WishlistButton'
import { ShoppingCart, Package, Shield, Truck, Check } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { triggerAddToCart } from '@/components/MetaPixelEvents'
import { useCountry, useTranslation } from '@/hooks/useCountry'
import { convertPrice, formatCurrency } from '@/utils/currency'

const ProductInfo = ({ product }) => {
  const router = useRouter()
  const { addToCart } = useCart()
  const country = useCountry()
  const t = useTranslation()
  const [selectedSize, setSelectedSize] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [addedToCart, setAddedToCart] = useState(false)
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false)
  const [toastOpen, setToastOpen] = useState(false)

  const {
    name,
    slug,
    price: priceARS,
    regularPrice: regularPriceARS,
    currency = 'USD',
    sizes = [],
    stock = 'available',
    tags = [],
  } = product

  // Convert prices to country currency
  const price = convertPrice(priceARS, country.currency.code)
  const regularPrice = regularPriceARS ? convertPrice(regularPriceARS, country.currency.code) : null

  // Format prices
  const formattedPrice = formatCurrency(price, country.currency)
  const formattedRegularPrice = regularPrice ? formatCurrency(regularPrice, country.currency) : null

  const hasDiscount = regularPrice && regularPrice > price
  const discountPercentage = hasDiscount
    ? Math.round(((regularPrice - price) / regularPrice) * 100)
    : 0

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert(t.selectSize)
      return
    }

    // Add product to cart
    addToCart(product, selectedSize, quantity)

    // Track Meta Pixel AddToCart event
    triggerAddToCart(product, quantity)

    // Show success feedback - button turns green
    setAddedToCart(true)

    // Show toast notification
    setToastOpen(true)

    // Reset button after 2 seconds
    setTimeout(() => {
      setAddedToCart(false)
    }, 2000)
  }

  return (
    <div className="space-y-4 md:space-y-6">
      {/* Product Title */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight">
          {name}
        </h1>

        {/* Tags */}
        {tags.length > 0 && (
          <div className="flex gap-2 flex-wrap">
            {tags.map((tag) => (
              <span
                key={tag}
                className="text-xs text-brand-yellow/80 bg-brand-yellow/10 px-2 py-1 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Promotional Banner */}
      <div className="relative w-full max-w-sm md:max-w-md">
        <Image
          src="/images/banners/promo-2x1.png"
          alt="Compra 1 Lleva 2"
          width={400}
          height={120}
          className="w-full h-auto"
          priority
        />
      </div>

      {/* Price */}
      <div className="space-y-2 border-t border-b border-white/10 py-3 md:py-4">
        <div className="flex items-baseline gap-2 md:gap-3">
          <p className="text-2xl md:text-4xl font-bold text-brand-yellow flex-shrink-0">
            {formattedPrice}
          </p>
          {hasDiscount && (
            <>
              <p className="text-base md:text-xl text-white/40 line-through flex-shrink-0">
                {formattedRegularPrice}
              </p>
              <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded flex-shrink-0">
                -{discountPercentage}%
              </span>
            </>
          )}
        </div>
      </div>

      {/* Size Selector */}
      <SizeSelector
        sizes={sizes}
        selectedSize={selectedSize}
        onSizeChange={setSelectedSize}
        onOpenSizeGuide={() => setSizeGuideOpen(true)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={sizeGuideOpen}
        onClose={() => setSizeGuideOpen(false)}
      />

      {/* Quantity Selector */}
      <QuantitySelector
        quantity={quantity}
        onQuantityChange={setQuantity}
        min={1}
        max={10}
      />

      {/* Action Buttons - Add to Cart & Wishlist */}
      <div className="flex gap-3">
        {/* Add to Cart Button - Takes most space */}
        <button
          onClick={handleAddToCart}
          disabled={stock === 'soldout' || addedToCart}
          className={`
            flex-1 py-3 md:py-4 rounded-lg font-bold text-base md:text-lg uppercase tracking-wide
            flex items-center justify-center gap-2 md:gap-3
            transition-all duration-300
            ${
              stock === 'soldout'
                ? 'bg-white/10 text-white/40 cursor-not-allowed'
                : addedToCart
                ? 'bg-green-500 text-white'
                : 'bg-brand-yellow text-black hover:bg-yellow-400 active:scale-95 md:hover:scale-105 shadow-lg shadow-brand-yellow/20'
            }
          `}
        >
          {addedToCart ? (
            <>
              <Check className="w-5 h-5 md:w-6 md:h-6" />
              {t.added}
            </>
          ) : (
            <>
              <ShoppingCart className="w-5 h-5 md:w-6 md:h-6" />
              {stock === 'soldout' ? t.soldOut : t.addToCart}
            </>
          )}
        </button>

        {/* Wishlist Button - Smaller */}
        <div className="flex-shrink-0">
          <WishlistButton product={product} variant="full" size="lg" className="h-full px-4" />
        </div>
      </div>

      {/* Product Features */}
      <div className="space-y-3 pt-4 border-t border-white/10">
        <div className="flex items-start gap-3">
          <Package className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-semibold text-sm">{t.premiumQuality}</p>
            <p className="text-white/60 text-xs">{t.premiumQualityDesc}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Truck className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-semibold text-sm">{t.fastShipping}</p>
            <p className="text-white/60 text-xs">{t.fastShippingDesc}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <Shield className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-white font-semibold text-sm">{t.securePurchase}</p>
            <p className="text-white/60 text-xs">{t.securePurchaseDesc}</p>
          </div>
        </div>
      </div>

      {/* Add to Cart Toast Notification */}
      <AddToCartToast
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
        product={product}
        size={selectedSize}
        quantity={quantity}
      />
    </div>
  )
}

export default ProductInfo
