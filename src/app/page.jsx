import Header from '@/components/store/Header'
import StoreHero from '@/components/store/StoreHero'
import BestSellers from '@/components/store/BestSellers'
import HowItWorks from '@/components/store/HowItWorks'
import SeedreamGallery from '@/components/store/SeedreamGallery'
import FeaturedProducts from '@/components/store/FeaturedProducts'
import Categories from '@/components/store/Categories'
import TravisScottSection from '@/components/store/TravisScottSection'
import DualBannerSection from '@/components/store/DualBannerSection'
import AirJordan1Section from '@/components/store/AirJordan1Section'
import AirJordan4Section from '@/components/store/AirJordan4Section'
import DunkLowSection from '@/components/store/DunkLowSection'
import YeezySection from '@/components/store/YeezySection'
import CustomerFeedbacks from '@/components/store/CustomerFeedbacks'
import NeedHelpSection from '@/components/store/NeedHelpSection'
import StoreFooter from '@/components/store/StoreFooter'

export const metadata = {
  title: 'SNKHOUSE - Sneakers Exclusivos',
  description: 'Descubre los sneakers más exclusivos del mercado. Air Jordan, Nike Dunk, Yeezy y más. Autenticidad garantizada.',
  keywords: 'sneakers, jordan, nike, yeezy, tenis exclusivos, snkhouse, argentina',
  openGraph: {
    title: 'SNKHOUSE - Sneakers Exclusivos',
    description: 'Descubre los sneakers más exclusivos del mercado',
    images: ['/images/hero/interior-symmetric-fisheye.jpg'],
    locale: 'es_AR',
    type: 'website',
  },
}

export default function HomePage() {
  return (
    <main className="min-h-screen bg-black text-white">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <StoreHero />

      {/* Best Sellers Carousel */}
      <BestSellers />

      {/* How It Works - COMPRA 1 LLEVA 2 */}
      <HowItWorks />

      {/* Categories - Nuestras Colecciones */}
      <Categories />

      {/* Travis Scott Collection */}
      <TravisScottSection />

      {/* Dual Banner Section */}
      <DualBannerSection />

      {/* Air Jordan 1 Collection */}
      <AirJordan1Section />

      {/* Air Jordan 4 Collection */}
      <AirJordan4Section />

      {/* Nike Dunk Low Collection */}
      <DunkLowSection />

      {/* Yeezy Collection */}
      <YeezySection />

      {/* Seedream Gallery */}
      <SeedreamGallery />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Customer Feedbacks */}
      <CustomerFeedbacks />

      {/* Need Help Banner */}
      <NeedHelpSection />

      {/* Footer */}
      <StoreFooter />
    </main>
  )
}
