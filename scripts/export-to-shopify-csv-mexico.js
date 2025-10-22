/**
 * Script para exportar produtos para Shopify MÉXICO
 *
 * - Converte preços de ARS para MXN (1 ARS = 0.012 MXN)
 * - Mantém estrutura idêntica aos produtos da Argentina
 * - Gera CSV formatado para importação no Shopify México
 *
 * Como usar:
 * node scripts/export-to-shopify-csv-mexico.js
 *
 * Irá gerar: shopify-products-mexico.csv
 */

const fs = require('fs')
const path = require('path')

// Taxa de conversão: 1 ARS = 0.012 MXN
const CONVERSION_RATE = 0.012

// Carregar produtos
const productsPath = path.join(__dirname, '../data/products.json')
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

console.log(`📦 Carregando ${productsData.products.length} produtos...`)
console.log(`💱 Taxa de conversão: 1 ARS = ${CONVERSION_RATE} MXN`)

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
 * Converter preço de ARS para MXN
 */
function convertPrice(priceARS) {
  const priceMXN = Math.round(priceARS * CONVERSION_RATE)
  return priceMXN
}

/**
 * Escapar CSV (aspas duplas e quebras de linha)
 */
function escapeCSV(value) {
  if (value === null || value === undefined) return ''
  const stringValue = String(value)
  if (stringValue.includes('"') || stringValue.includes(',') || stringValue.includes('\n')) {
    return `"${stringValue.replace(/"/g, '""')}"`
  }
  return stringValue
}

/**
 * Obter URL completa da imagem
 */
function getFullImageUrl(imagePath) {
  const baseUrl = 'https://snkhouseargentina.com'
  if (!imagePath) return ''
  if (imagePath.startsWith('http')) return imagePath
  return `${baseUrl}${imagePath}`
}

/**
 * Gerar descrição do produto
 */
function generateDescription(product) {
  return `${product.name}\n\nRéplica AAA+ de alta calidad.\nTalles disponibles: 38-44 BR.\nEnvío a todo México.\n\nCaracterísticas:\n- Materiales premium\n- Acabado 1:1\n- Incluye caja original\n- Garantía de calidad\n\n#Sneakers #Tenis #México`
}

// Array para armazenar as linhas do CSV
const csvRows = []

// Adicionar header
csvRows.push(HEADERS.join(','))

console.log('\n🔄 Convertendo produtos...\n')

// Processar cada produto
let productCount = 0
let variantCount = 0

productsData.products.forEach((product, index) => {
  productCount++

  const {
    id,
    name,
    slug,
    price: priceARS,
    regularPrice: regularPriceARS,
    image,
    tags = [],
    variants = []
  } = product

  // Converter preços para MXN
  const priceMXN = convertPrice(priceARS)
  const regularPriceMXN = regularPriceARS ? convertPrice(regularPriceARS) : null

  console.log(`${index + 1}. ${name}`)
  console.log(`   ARS $${priceARS.toLocaleString('es-AR')} → MXN $${priceMXN.toLocaleString('es-MX')}`)

  const description = generateDescription(product)
  const imageUrl = getFullImageUrl(image)

  // Talles BR padrão (38-44)
  const sizes = ['38', '39', '40', '41', '42', '43', '44']

  sizes.forEach((size, sizeIndex) => {
    variantCount++

    const row = Array(HEADERS.length).fill('')

    // Primeira variante tem título e imagem
    if (sizeIndex === 0) {
      row[0] = escapeCSV(name) // Title
      row[2] = escapeCSV(description) // Description
      row[5] = escapeCSV('Sneakers') // Type
      row[6] = escapeCSV(tags.join(', ')) // Tags
      row[7] = 'TRUE' // Published
      row[8] = 'active' // Status
      row[32] = escapeCSV(imageUrl) // Product image URL
      row[33] = '1' // Image position
      row[34] = escapeCSV(name) // Image alt text
    }

    row[1] = escapeCSV(slug) // URL handle
    row[3] = escapeCSV('SNKHOUSE') // Vendor
    row[4] = escapeCSV('Apparel & Accessories > Shoes') // Product category
    row[9] = escapeCSV(`${slug}-${size}`) // SKU
    row[11] = 'Talla' // Option1 name (México: "Talla")
    row[12] = escapeCSV(size) // Option1 value
    row[17] = priceMXN // Price (em MXN)
    row[18] = regularPriceMXN || '' // Compare-at price
    row[20] = 'TRUE' // Charge tax
    row[26] = 'shopify' // Inventory tracker
    row[27] = '100' // Inventory quantity
    row[28] = 'TRUE' // Continue selling when out of stock
    row[29] = '500' // Weight (grams)
    row[30] = 'g' // Weight unit
    row[31] = 'TRUE' // Requires shipping
    row[35] = sizeIndex === 0 ? escapeCSV(imageUrl) : '' // Variant image (apenas primeira)
    row[36] = '' // Gift card (vazio = não é gift card)
    row[37] = escapeCSV(name) // SEO title
    row[38] = escapeCSV(`${name} - Réplica AAA+ - Envío a todo México`) // SEO description
    row[39] = escapeCSV('Apparel & Accessories > Shoes') // Google Shopping category
    row[40] = 'unisex' // Gender
    row[41] = 'adult' // Age group
    row[46] = 'new' // Condition

    csvRows.push(row.join(','))
  })

  console.log('')
})

// Salvar CSV
const outputPath = path.join(__dirname, '../shopify-products-mexico.csv')
fs.writeFileSync(outputPath, csvRows.join('\n'), 'utf8')

console.log('✅ SUCESSO!\n')
console.log(`📊 Estatísticas:`)
console.log(`   - Produtos processados: ${productCount}`)
console.log(`   - Variantes criadas: ${variantCount}`)
console.log(`   - Taxa de conversão: 1 ARS = ${CONVERSION_RATE} MXN`)
console.log(`\n📁 Arquivo gerado: ${outputPath}`)
console.log(`\n🚀 Próximos passos:`)
console.log(`   1. Abrir Shopify Admin México`)
console.log(`   2. Ir em Products > Import`)
console.log(`   3. Fazer upload de: shopify-products-mexico.csv`)
console.log(`   4. Revisar e confirmar a importação`)
console.log(`\n💡 Dica: Configure os preços em MXN na Shopify antes de importar\n`)
