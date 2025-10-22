import { notFound } from 'next/navigation'
import { getCollectionBySlug, getProductsByCollection, getAllCollectionSlugs } from '@/utils/getCollectionData'
import Header from '@/components/store/Header'
import StoreFooter from '@/components/store/StoreFooter'
import CollectionHeader from '@/components/collection/CollectionHeader'
import CollectionGrid from '@/components/collection/CollectionGrid'
import Link from 'next/link'
import { ChevronLeft } from 'lucide-react'

// Generate static params for all collections (SSG)
export async function generateStaticParams() {
  const slugs = getAllCollectionSlugs()
  return slugs
}

// Generate metadata for SEO
export async function generateMetadata({ params }) {
  const collection = getCollectionBySlug(params.slug)

  if (!collection) {
    return {
      title: 'Colección no encontrada - SNKHOUSE',
    }
  }

  const products = getProductsByCollection(params.slug)

  return {
    title: `${collection.name} - SNKHOUSE`,
    description: `Descubre nuestra colección exclusiva de ${collection.name}. ${products.length} productos disponibles. Calidad Premium 1:1.`,
    openGraph: {
      title: `${collection.name} - SNKHOUSE`,
      description: `${products.length} productos disponibles`,
      images: [
        {
          url: collection.image,
          width: 1200,
          height: 630,
          alt: collection.name,
        },
      ],
    },
  }
}

export default function CollectionPage({ params }) {
  const collection = getCollectionBySlug(params.slug)

  if (!collection) {
    notFound()
  }

  const products = getProductsByCollection(params.slug)

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

        {/* Collection Header */}
        <CollectionHeader
          name={collection.name}
          image={collection.image}
          productsCount={products.length}
          slug={params.slug}
        />

        {/* Products Grid */}
        <div className="container mx-auto px-4 pb-12">
          <CollectionGrid products={products} collectionName={collection.name} />
        </div>
      </main>
      <StoreFooter />
    </>
  )
}
