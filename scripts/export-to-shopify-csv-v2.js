/**
 * Script para exportar produtos do products.json para CSV formato Shopify (CORRIGIDO)
 *
 * Usa o formato EXATO do template oficial da Shopify
 *
 * Como usar:
 * node scripts/export-to-shopify-csv-v2.js
 *
 * Irá gerar: shopify-products-import-v2.csv
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

// Função para limpar HTML
function stripHTML(html) {
  if (!html) return ''
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .trim()
    .substring(0, 5000) // Shopify limit
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

  // Pegar imagens
  const images = []

  // Imagem principal
  if (product.image && !product.image.startsWith('/images/')) {
    images.push(product.image)
  }

  // Gallery
  if (product.gallery && Array.isArray(product.gallery)) {
    product.gallery.forEach(img => {
      if (img && !images.includes(img)) {
        images.push(img)
      }
    })
  }

  // Se não tem imagem, deixar apenas uma linha sem imagem
  if (images.length === 0) {
    images.push('')
  }

  // Descrição (limpar HTML)
  const description = product.description
    ? stripHTML(product.description)
    : `${product.name} - Sneaker exclusivo de alta qualidade`

  // Tags
  const tags = product.tags
    ? (Array.isArray(product.tags) ? product.tags.join(', ') : product.tags)
    : product.category || ''

  // Preço
  const price = product.price || 0
  const compareAtPrice = product.regularPrice || price * 1.4 // 40% de desconto

  // Categoria
  const category = product.category || 'Sneakers'
  const categoryMap = {
    'travis-scott': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-jordan-1': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-jordan-2': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-jordan-3': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-jordan-4': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-jordan-5': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-jordan-6': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-jordan-11': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'yeezy': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'dunk-low': 'Apparel & Accessories > Shoes > Athletic Shoes',
    'air-force-1': 'Apparel & Accessories > Shoes > Athletic Shoes',
  }

  const googleCategory = categoryMap[category] || 'Apparel & Accessories > Shoes > Athletic Shoes'

  // Para cada tamanho, criar linhas
  productSizes.forEach((size, sizeIndex) => {
    // Para cada imagem do produto
    images.forEach((imageUrl, imageIndex) => {
      // Primeira linha tem todos os dados do produto
      // Linhas subsequentes só têm dados de variante/imagem
      const isFirstRow = sizeIndex === 0 && imageIndex === 0
      const isFirstImageOfSize = imageIndex === 0

      const row = [
        // Title
        isFirstRow ? escapeCSV(product.name) : '',

        // URL handle
        isFirstRow ? escapeCSV(product.slug) : '',

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

        // SKU
        isFirstImageOfSize ? escapeCSV(`${product.slug}-${size}`) : '',

        // Barcode
        '',

        // Option1 name
        isFirstImageOfSize ? 'Tamanho' : '',

        // Option1 value
        isFirstImageOfSize ? escapeCSV(size) : '',

        // Option2 name
        '',

        // Option2 value
        '',

        // Option3 name
        '',

        // Option3 value
        '',

        // Price
        isFirstImageOfSize ? escapeCSV(price.toFixed(2)) : '',

        // Compare-at price
        isFirstImageOfSize ? escapeCSV(compareAtPrice.toFixed(2)) : '',

        // Cost per item
        isFirstImageOfSize ? escapeCSV((price * 0.5).toFixed(2)) : '',

        // Charge tax
        isFirstImageOfSize ? 'TRUE' : '',

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
        isFirstImageOfSize ? '100' : '',

        // Continue selling when out of stock
        isFirstImageOfSize ? 'deny' : '',

        // Weight value (grams)
        isFirstImageOfSize ? '800' : '',

        // Weight unit for display
        isFirstImageOfSize ? 'g' : '',

        // Requires shipping
        isFirstImageOfSize ? 'TRUE' : '',

        // Fulfillment service
        isFirstImageOfSize ? 'manual' : '',

        // Product image URL
        escapeCSV(imageUrl),

        // Image position
        escapeCSV(imageIndex + 1),

        // Image alt text
        escapeCSV(`${product.name} - Imagem ${imageIndex + 1}`),

        // Variant image URL
        '',

        // Gift card
        isFirstRow ? 'FALSE' : '',

        // SEO title
        isFirstRow ? escapeCSV(product.name) : '',

        // SEO description
        isFirstRow ? escapeCSV(description.substring(0, 160)) : '',

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
})

// Salvar CSV
const csvContent = csvRows.join('\n')
const csvPath = path.join(__dirname, '../shopify-products-import-v2.csv')

fs.writeFileSync(csvPath, csvContent, 'utf8')

console.log('\n✅ CSV gerado com sucesso!')
console.log(`📁 Arquivo: ${csvPath}`)
console.log(`📊 Total de produtos: ${productsData.products.length}`)
console.log(`📋 Total de linhas CSV: ${csvRows.length - 1}`) // -1 para o header

console.log('\n📤 Próximos passos:')
console.log('1. Acesse seu painel Shopify: https://admin.shopify.com/store/9wurf1-73')
console.log('2. Vá em Products → Import')
console.log('3. Faça upload do arquivo: shopify-products-import-v2.csv')
console.log('4. Marque "Overwrite products with same handle"')
console.log('5. Clique em "Import products"')
console.log('6. Aguarde a importação concluir')
console.log('7. Execute: node scripts/fetch-shopify-variant-ids.js')
console.log('\n🎯 Arquivo pronto para importação!\n')
