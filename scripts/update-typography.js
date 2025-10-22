const fs = require('fs')
const path = require('path')

const files = [
  'src/components/store/FeaturedProducts.jsx',
  'src/components/store/TravisScottSection.jsx',
  'src/components/store/SeedreamGallery.jsx',
  'src/components/store/CollectionCarousel.jsx',
]

files.forEach(file => {
  const filePath = path.join(process.cwd(), file)

  try {
    let content = fs.readFileSync(filePath, 'utf8')

    // Reduce heading sizes from text-4xl md:text-6xl to text-3xl md:text-5xl
    content = content.replace(/text-4xl md:text-6xl/g, 'text-3xl md:text-5xl')

    // Reduce subtitle sizes from text-lg to text-base
    content = content.replace(/text-gray-400 text-lg/g, 'text-gray-400 text-base')

    // Reduce product title sizes from text-lg to text-base, text-xl to text-lg
    content = content.replace(/font-bold text-xl/g, 'font-semibold text-lg')
    content = content.replace(/font-bold text-lg/g, 'font-semibold text-base')

    // Reduce price sizes from text-3xl to text-2xl, text-2xl to text-xl
    content = content.replace(/text-brand-yellow font-bold text-3xl/g, 'text-brand-yellow font-bold text-2xl')
    content = content.replace(/text-brand-yellow font-bold text-2xl/g, 'text-brand-yellow font-bold text-xl')

    fs.writeFileSync(filePath, content, 'utf8')
    console.log(`✅ Updated: ${file}`)
  } catch (error) {
    console.error(`❌ Error processing ${file}:`, error.message)
  }
})

console.log('\n✅ All files updated!')
