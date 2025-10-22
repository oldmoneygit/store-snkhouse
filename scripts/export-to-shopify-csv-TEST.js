/**
 * Script de TESTE para exportar apenas 5 produtos para Shopify
 *
 * Use este para validar se tudo está correto antes de importar os 653 produtos!
 *
 * Como usar:
 * node scripts/export-to-shopify-csv-TEST.js
 *
 * Irá gerar: shopify-products-TEST.csv (apenas 5 produtos)
 */

const fs = require('fs')
const path = require('path')

// Carregar produtos
const productsPath = path.join(__dirname, '../data/products.json')
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

// PEGAR APENAS OS PRIMEIROS 5 PRODUTOS
const testProducts = productsData.products.slice(0, 5)

console.log(`📦 Gerando CSV DE TESTE com ${testProducts.length} produtos...`)
console.log('\n📝 Produtos selecionados para teste:')
testProducts.forEach((p, i) => {
  console.log(`   ${i + 1}. ${p.name}`)
})

// Headers EXATOS do template Shopify
const HEADERS = [
  'Title',
  'URL handle',
  'Description',
  'Vendor',
  'Product category',
  'Type',
  'Tags',
  'Published on online store',
  'Status',
  'SKU',
  'Barcode',
  'Option1 name',
  'Option1 value',
  'Option2 name',
  'Option2 value',
  'Option3 name',
  'Option3 value',
  'Price',
  'Compare-at price',
  'Cost per item',
  'Charge tax',
  'Tax code',
  'Unit price total measure',
  'Unit price total measure unit',
  'Unit price base measure',
  'Unit price base measure unit',
  'Inventory tracker',
  'Inventory quantity',
  'Continue selling when out of stock',
  'Weight value (grams)',
  'Weight unit for display',
  'Requires shipping',
  'Fulfillment service',
  'Product image URL',
  'Image position',
  'Image alt text',
  'Variant image URL',
  'Gift card',
  'SEO title',
  'SEO description',
  'Google Shopping / Google product category',
  'Google Shopping / Gender',
  'Google Shopping / Age group',
  'Google Shopping / MPN',
  'Google Shopping / AdWords Grouping',
  'Google Shopping / AdWords labels',
  'Google Shopping / Condition',
  'Google Shopping / Custom product',
  'Google Shopping / Custom label 0',
  'Google Shopping / Custom label 1',
  'Google Shopping / Custom label 2',
  'Google Shopping / Custom label 3',
  'Google Shopping / Custom label 4',
]

/**
 * Abreviar nomes de marcas
 */
function abbreviateBrandNames(productName) {
  let abbreviated = productName

  const brandReplacements = {
    'Nike Air Jordan': 'AJ',
    'Air Jordan': 'AJ',
    'Nike': 'NK',
    'Adidas': 'AD',
    'Yeezy': 'YZY',
    'Jordan': 'JD',
    'Travis Scott': 'TS',
    'Air Force': 'AF',
    'Dunk Low': 'DK Low',
    'Dunk': 'DK',
    'Retro': 'RT',
    'Boost': 'BST',
  }

  Object.entries(brandReplacements).forEach(([original, abbrev]) => {
    const regex = new RegExp(original, 'gi')
    abbreviated = abbreviated.replace(regex, abbrev)
  })

  abbreviated = abbreviated.replace(/\s+/g, ' ').trim()

  return abbreviated
}

/**
 * Abreviar SKU
 */
function abbreviateSKU(slug) {
  let abbreviated = slug

  const skuReplacements = {
    'nike-air-jordan': 'aj',
    'air-jordan': 'aj',
    'nike': 'nk',
    'adidas': 'ad',
    'yeezy': 'yzy',
    'jordan': 'jd',
    'travis-scott': 'ts',
    'air-force': 'af',
    'dunk-low': 'dk-low',
    'dunk': 'dk',
    'retro': 'rt',
    'boost': 'bst',
  }

  Object.entries(skuReplacements).forEach(([original, abbrev]) => {
    const regex = new RegExp(original, 'gi')
    abbreviated = abbreviated.replace(regex, abbrev)
  })

  return abbreviated
}

function escapeCSV(value) {
  if (value === null || value === undefined) return ''

  const stringValue = String(value)

  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

// Gerar linhas CSV
const csvRows = []

// Header
csvRows.push(HEADERS.join(','))

let totalVariants = 0

// Processar cada produto DE TESTE
testProducts.forEach((product) => {
  const abbreviatedName = abbreviateBrandNames(product.name)

  // Pegar tamanhos
  const sizes = Array.isArray(product.sizes)
    ? product.sizes.map(s => typeof s === 'object' ? s.size : s)
    : []

  const productSizes = sizes.length > 0 ? sizes : ['Default']

  totalVariants += productSizes.length

  // Imagem principal
  let mainImage = ''

  if (product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0) {
    mainImage = product.gallery[0]
  } else if (product.image && !product.image.startsWith('/images/')) {
    mainImage = product.image
  }

  const description = 'Sneaker exclusivo de alta qualidade'

  const tags = product.tags
    ? (Array.isArray(product.tags) ? product.tags.join(', ') : product.tags)
    : product.category || ''

  const price = product.price || 0
  const compareAtPrice = product.regularPrice || price * 1.4

  const googleCategory = 'Apparel & Accessories > Shoes > Athletic Shoes'

  // Para cada tamanho, criar uma linha
  productSizes.forEach((size, sizeIndex) => {
    const isFirstRow = sizeIndex === 0

    const row = [
      // Title (ABREVIADO)
      isFirstRow ? escapeCSV(abbreviatedName) : '',

      // URL handle (ABREVIADO) - PRECISA EM TODAS AS LINHAS!
      escapeCSV(abbreviateSKU(product.slug)),

      // Description
      isFirstRow ? escapeCSV(description) : '',

      // Vendor
      isFirstRow ? 'SNKHOUSE' : '',

      // Product category
      isFirstRow ? escapeCSV(googleCategory) : '',

      // Type
      isFirstRow ? 'Sneakers' : '',

      // Tags
      isFirstRow ? escapeCSV(tags) : '',

      // Published on online store
      isFirstRow ? 'TRUE' : '',

      // Status
      isFirstRow ? 'active' : '',

      // SKU (ABREVIADO)
      escapeCSV(`${abbreviateSKU(product.slug)}-${size}`),

      // Barcode
      '',

      // Option1 name
      'Tamanho',

      // Option1 value
      escapeCSV(size),

      // Option2 name
      '',

      // Option2 value
      '',

      // Option3 name
      '',

      // Option3 value
      '',

      // Price
      escapeCSV(price.toFixed(2)),

      // Compare-at price
      escapeCSV(compareAtPrice.toFixed(2)),

      // Cost per item
      escapeCSV((price * 0.5).toFixed(2)),

      // Charge tax
      'TRUE',

      // Tax code
      '',

      // Unit price total measure
      '',

      // Unit price total measure unit
      '',

      // Unit price base measure
      '',

      // Unit price base measure unit
      '',

      // Inventory tracker
      '',

      // Inventory quantity
      '100',

      // Continue selling when out of stock
      'deny',

      // Weight value (grams)
      '800',

      // Weight unit for display
      'g',

      // Requires shipping
      'TRUE',

      // Fulfillment service
      'manual',

      // Product image URL
      isFirstRow ? escapeCSV(mainImage) : '',

      // Image position
      isFirstRow ? '1' : '',

      // Image alt text
      isFirstRow ? escapeCSV(abbreviatedName) : '',

      // Variant image URL
      '',

      // Gift card
      isFirstRow ? 'FALSE' : '',

      // SEO title
      isFirstRow ? escapeCSV(abbreviatedName) : '',

      // SEO description
      isFirstRow ? escapeCSV(description) : '',

      // Google Shopping / Google product category
      isFirstRow ? escapeCSV(googleCategory) : '',

      // Google Shopping / Gender
      isFirstRow ? 'Unisex' : '',

      // Google Shopping / Age group
      isFirstRow ? 'Adult' : '',

      // Google Shopping / MPN
      '',

      // Google Shopping / AdWords Grouping
      isFirstRow ? 'Sneakers' : '',

      // Google Shopping / AdWords labels
      isFirstRow ? escapeCSV(tags) : '',

      // Google Shopping / Condition
      isFirstRow ? 'new' : '',

      // Google Shopping / Custom product
      isFirstRow ? 'FALSE' : '',

      // Google Shopping / Custom label 0
      '',

      // Google Shopping / Custom label 1
      '',

      // Google Shopping / Custom label 2
      '',

      // Google Shopping / Custom label 3
      '',

      // Google Shopping / Custom label 4
      '',
    ]

    csvRows.push(row.join(','))
  })
})

// Salvar CSV
const csvContent = csvRows.join('\n')
const csvPath = path.join(__dirname, '../shopify-products-TEST.csv')

fs.writeFileSync(csvPath, csvContent, 'utf8')

const fileSize = (csvContent.length / 1024).toFixed(2)

console.log('\n✅ CSV DE TESTE gerado com sucesso!')
console.log(`📁 Arquivo: ${csvPath}`)
console.log(`💾 Tamanho: ${fileSize} KB`)
console.log(`📊 Produtos: ${testProducts.length}`)
console.log(`🔢 Total de variantes: ${totalVariants}`)
console.log(`📋 Total de linhas CSV: ${csvRows.length - 1}`)

console.log('\n🧪 TESTE PRIMEIRO:')
console.log('1. Acesse: https://admin.shopify.com/store/9wurf1-73')
console.log('2. Products → Import')
console.log('3. Upload: shopify-products-TEST.csv')
console.log('4. Marque "Overwrite products with same handle"')
console.log('5. Import products')
console.log('6. VERIFIQUE se tudo está correto:')
console.log('   - Títulos abreviados ✅')
console.log('   - SKUs abreviados ✅')
console.log('   - 11 variantes por produto (35-45) ✅')
console.log('   - Imagens carregadas ✅')
console.log('   - Preços corretos ✅')
console.log('\n✅ Se tudo estiver OK, execute: node scripts/export-to-shopify-csv-final.js')
console.log('\n🎯 CSV de teste pronto!\n')
