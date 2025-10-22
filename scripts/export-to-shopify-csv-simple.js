/**
 * Script SIMPLIFICADO para exportar produtos do products.json para CSV formato Shopify
 *
 * OTIMIZAÇÕES:
 * - Apenas 1 imagem por produto (a principal)
 * - Descrição simples sem HTML
 * - Arquivo muito menor e importação mais rápida
 *
 * Como usar:
 * node scripts/export-to-shopify-csv-simple.js
 *
 * Irá gerar: shopify-products-import-simple.csv
 */

const fs = require('fs')
const path = require('path')

// Carregar produtos
const productsPath = path.join(__dirname, '../data/products.json')
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

console.log(`📦 Carregando ${productsData.products.length} produtos...`)

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

// Função para escapar valores CSV
function escapeCSV(value) {
  if (value === null || value === undefined) return ''

  const stringValue = String(value)

  // Se contém vírgula, aspas duplas ou quebra de linha, precisa escapar
  if (stringValue.includes(',') || stringValue.includes('"') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }

  return stringValue
}

// Gerar linhas CSV
const csvRows = []

// Header
csvRows.push(HEADERS.join(','))

// Processar cada produto
productsData.products.forEach((product) => {
  // Pegar tamanhos
  const sizes = Array.isArray(product.sizes)
    ? product.sizes.map(s => typeof s === 'object' ? s.size : s)
    : []

  // Se não tem tamanhos, criar uma variante padrão
  const productSizes = sizes.length > 0 ? sizes : ['Default']

  // Pegar APENAS a imagem principal
  let mainImage = ''

  if (product.gallery && Array.isArray(product.gallery) && product.gallery.length > 0) {
    mainImage = product.gallery[0]
  } else if (product.image && !product.image.startsWith('/images/')) {
    mainImage = product.image
  }

  // Descrição SIMPLES
  const description = 'Sneaker exclusivo de alta qualidade'

  // Tags
  const tags = product.tags
    ? (Array.isArray(product.tags) ? product.tags.join(', ') : product.tags)
    : product.category || ''

  // Preço
  const price = product.price || 0
  const compareAtPrice = product.regularPrice || price * 1.4 // 40% de desconto

  // Categoria Google
  const googleCategory = 'Apparel & Accessories > Shoes > Athletic Shoes'

  // Para cada tamanho, criar UMA linha apenas
  productSizes.forEach((size, sizeIndex) => {
    // Primeira linha tem todos os dados do produto
    const isFirstRow = sizeIndex === 0

    const row = [
      // Title
      isFirstRow ? escapeCSV(product.name) : '',

      // URL handle
      isFirstRow ? escapeCSV(product.slug) : '',

      // Description (SIMPLES)
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

      // SKU
      escapeCSV(`${product.slug}-${size}`),

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

      // Product image URL (APENAS UMA IMAGEM)
      isFirstRow ? escapeCSV(mainImage) : '',

      // Image position
      isFirstRow ? '1' : '',

      // Image alt text
      isFirstRow ? escapeCSV(product.name) : '',

      // Variant image URL
      '',

      // Gift card
      isFirstRow ? 'FALSE' : '',

      // SEO title
      isFirstRow ? escapeCSV(product.name) : '',

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
const csvPath = path.join(__dirname, '../shopify-products-import-simple.csv')

fs.writeFileSync(csvPath, csvContent, 'utf8')

// Calcular tamanho em MB
const fileSize = (csvContent.length / 1024 / 1024).toFixed(2)

console.log('\n✅ CSV SIMPLIFICADO gerado com sucesso!')
console.log(`📁 Arquivo: ${csvPath}`)
console.log(`💾 Tamanho: ${fileSize} MB`)
console.log(`📊 Total de produtos: ${productsData.products.length}`)
console.log(`📋 Total de linhas CSV: ${csvRows.length - 1}`) // -1 para o header

// Calcular redução
const oldLines = 90761
const newLines = csvRows.length - 1
const reduction = ((1 - newLines / oldLines) * 100).toFixed(1)

console.log(`\n📉 Otimização:`)
console.log(`   Antes: 90,761 linhas (~20 MB)`)
console.log(`   Agora: ${newLines.toLocaleString()} linhas (~${fileSize} MB)`)
console.log(`   Redução: ${reduction}% 🚀`)

console.log('\n📤 Próximos passos:')
console.log('1. Acesse seu painel Shopify: https://admin.shopify.com/store/9wurf1-73')
console.log('2. Vá em Products → Import')
console.log('3. Faça upload do arquivo: shopify-products-import-simple.csv')
console.log('4. Marque "Overwrite products with same handle"')
console.log('5. Clique em "Import products"')
console.log('6. Aguarde a importação concluir (mais rápido agora!)')
console.log('7. Execute: node scripts/fetch-shopify-variant-ids.js')
console.log('\n🎯 Arquivo otimizado e pronto para importação!\n')
