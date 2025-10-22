import { notFound } from 'next/navigation'
import { getProductBySlug, getRelatedProducts, getAllProductSlugs } from '@/utils/getProductBySlug'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import ProductGallery from '@/components/product/ProductGallery'
import ProductInfo from '@/components/product/ProductInfo'
import ProductDescription from '@/components/product/ProductDescription'
import RelatedProducts from '@/components/product/RelatedProducts'
import { ViewContent } from '@/components/MetaPixelEvents'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

// Generate static params for all products (SSG)
export async function generateStaticParams() {
  const slugs = getAllProductSlugs()
  return slugs
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    return {
      title: 'Producto no encontrado - SNKHOUSE',
    }
  }

  return {
    title: `${product.name} - SNKHOUSE`,
    description: product.description
      ? product.description.replace(/<[^>]*>/g, '').substring(0, 160)
      : `Compra ${product.name} en SNKHOUSE. Sneakers exclusivos y auténticos.`,
    openGraph: {
      title: product.name,
      description: `${product.currency === 'USD' ? '$' : 'AR$'}${product.price.toLocaleString()}`,
      images: [
        {
          url: product.gallery?.[0] || product.image,
          width: 1200,
          height: 1200,
          alt: product.name,
        },
      ],
    },
  }
}

export default function ProductPage({ params }) {
  const product = getProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

  // Get gallery images (use gallery if available, fallback to single image)
  const galleryImages = product.gallery && product.gallery.length > 0
    ? product.gallery
    : [product.image]

  // Get related products
  const relatedProducts = getRelatedProducts(product.slug, product.category, 8)

  // Category name mapping
  const categoryNames = {
    'air-jordan-1': 'Air Jordan 1',
    'air-jordan-4': 'Air Jordan 4',
    'dunk-low': 'Nike Dunk Low',
    'yeezy': 'Yeezy',
    'travis-scott': 'Travis Scott',
  }

  return (
    <>
      {/* Meta Pixel - ViewContent Event */}
      <ViewContent product={product} />

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

        {/* Product Section */}
        <div className="container mx-auto px-4 pb-8 md:pb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 lg:gap-12">
            {/* Left Column - Gallery */}
            <div>
              <ProductGallery images={galleryImages} productName={product.name} />
            </div>

            {/* Right Column - Product Info */}
            <div>
              <ProductInfo product={product} />
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="container mx-auto px-4 pb-8 md:pb-12">
          <ProductDescription description={product.description} />
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="container mx-auto px-4 pb-8 md:pb-12">
            <RelatedProducts
              products={relatedProducts}
              categoryName={categoryNames[product.category]}
            />
          </div>
        )}
      </main>
      <StoreFooter />
    </>
  )
}
