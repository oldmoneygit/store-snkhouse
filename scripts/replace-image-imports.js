const fs = require('fs')
const path = require('path')

// Files that use next/image
const files = [
  'src/components/Hero.jsx',
  'src/components/CardStack.jsx',
  'src/components/Gallery.jsx',
  'src/components/Experience.jsx',
  'src/components/ExteriorShowcase.jsx',
  'src/components/InteriorShowcase.jsx',
  'src/components/BrandStory.jsx',
  'src/components/Products.jsx',
  'src/components/store/StoreHero.jsx',
  'src/components/store/SeedreamGallery.jsx',
  'src/components/store/Categories.jsx',
  'src/components/store/ProductCard.jsx',
  'src/components/store/DualBannerSection.jsx',
  'src/components/store/NeedHelpSection.jsx',
  'src/components/store/StoreFooter.jsx',
  'src/components/store/CollectionCarousel.jsx',
  'src/components/store/BestSellers.jsx',
  'src/components/store/PromotionalBanner.jsx',
  'src/components/store/Header.jsx',
  'src/components/store/TravisScottSection.jsx',
  'src/components/store/AirJordan1Section.jsx',
  'src/components/store/AirJordan4Section.jsx',
  'src/components/store/DunkLowSection.jsx',
  'src/components/store/YeezySection.jsx',
  'src/components/store/FeaturedProducts.jsx',
]

files.forEach(file => {
  const filePath = path.join(process.cwd(), file)

  try {
    let content = fs.readFileSync(filePath, 'utf8')

    // Replace import
    content = content.replace(
      /import Image from ['"]next\/image['"]/g,
      "import Image from '@/components/OptimizedImage'"
    )

    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`✅ Updated: ${file}`)
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message)
  }
})

console.log('\n✅ All files updated successfully!')
