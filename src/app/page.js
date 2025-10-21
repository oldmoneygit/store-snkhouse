import BackToStoreBar from '@/components/BackToStoreBar'
import Hero from '@/components/Hero'
import Stats from '@/components/Stats'
import Countdown from '@/components/Countdown'
import ExteriorShowcase from '@/components/ExteriorShowcase'
import Products from '@/components/Products'
import InteriorShowcase from '@/components/InteriorShowcase'
import Gallery from '@/components/Gallery'
import Experience from '@/components/Experience'
import Features from '@/components/Features'
import BrandStory from '@/components/BrandStory'
import Timeline from '@/components/Timeline'
import CardStack from '@/components/CardStack'
import Location from '@/components/Location'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Back to Store Bar - Fixed Top */}
      <BackToStoreBar />

      {/* Main Content with Top Padding */}
      <div className="pt-14">
        {/* Hero Section */}
        <Hero />

      {/* Stats + Countdown */}
      <section className="relative py-12">
        <Stats />
        <Countdown />
      </section>

      {/* Exterior Showcase - NEW! Vista Aérea Dedicada */}
      <ExteriorShowcase />

      {/* Products Section */}
      <Products />

      {/* Interior Showcase - NEW! Panorâmica Dedicada */}
      <InteriorShowcase />

      {/* Gallery Grid - NEW! Grid com 4 Imagens */}
      <Gallery />

      {/* Experience POV - NEW! Seção Imersiva */}
      <Experience />

      {/* Features Section */}
      <Features />

      {/* Brand Story Section */}
      <BrandStory />

      {/* Timeline Section */}
      <Timeline />

      {/* CardStack - Reduzido para 3 Imagens Essenciais */}
      <CardStack />

      {/* Location Section */}
      <Location />

      {/* CTA Section */}
      <CTA />

      {/* Footer */}
      <Footer />
      </div>
    </main>
  )
}
