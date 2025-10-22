/**
 * Script para exportar produtos do products.json para CSV formato Shopify
 *
 * Como usar:
 * node scripts/export-to-shopify-csv.js
 *
 * Irá gerar: shopify-products-import.csv
 */

const fs = require('fs')
const path = require('path')

// Carregar produtos
const productsPath = path.join(__dirname, '../data/products.json')
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

console.log(`📦 Carregando ${productsData.products.length} produtos...`)

// Formato CSV que Shopify aceita
// Docs: https://help.shopify.com/en/manual/products/import-export/using-csv
const CSV_HEADERS = [
  'Handle', // slug do produto (único)
  'Title', // nome do produto
  'Body (HTML)', // descrição
  'Vendor', // fornecedor
  'Product Category', // categoria
  'Type', // tipo de produto
  'Tags', // tags separadas por vírgula
  'Published', // TRUE/FALSE
  'Option1 Name', // Nome da opção 1 (ex: Tamanho)
  'Option1 Value', // Valor da opção 1 (ex: 35)
  'Option2 Name', // Nome da opção 2 (deixar vazio)
  'Option2 Value', // Valor da opção 2 (deixar vazio)
  'Option3 Name', // Nome da opção 3 (deixar vazio)
  'Option3 Value', // Valor da opção 3 (deixar vazio)
  'Variant SKU', // SKU da variante
  'Variant Grams', // Peso (opcional)
  'Variant Inventory Tracker', // shopify
  'Variant Inventory Qty', // Quantidade em estoque
  'Variant Inventory Policy', // deny (não vender sem estoque)
  'Variant Fulfillment Service', // manual
  'Variant Price', // Preço
  'Variant Compare At Price', // Preço "de" (antes do desconto)
  'Variant Requires Shipping', // TRUE
  'Variant Taxable', // TRUE
  'Variant Barcode', // Código de barras (opcional)
  'Image Src', // URL da imagem
  'Image Position', // Posição da imagem (1, 2, 3...)
  'Image Alt Text', // Texto alternativo
  'Gift Card', // FALSE
  'SEO Title', // Título SEO
  'SEO Description', // Descrição SEO
  'Google Shopping / Google Product Category', // Categoria Google
  'Google Shopping / Gender', // Gênero
  'Google Shopping / Age Group', // Faixa etária
  'Google Shopping / MPN', // Número de peça do fabricante
  'Google Shopping / AdWords Grouping', // Agrupamento AdWords
  'Google Shopping / AdWords Labels', // Labels AdWords
  'Google Shopping / Condition', // new/used/refurbished
  'Google Shopping / Custom Product', // TRUE/FALSE
  'Google Shopping / Custom Label 0', // Label customizado 0
  'Google Shopping / Custom Label 1', // Label customizado 1
  'Google Shopping / Custom Label 2', // Label customizado 2
  'Google Shopping / Custom Label 3', // Label customizado 3
  'Google Shopping / Custom Label 4', // Label customizado 4
  'Variant Image', // URL da imagem da variante
  'Variant Weight Unit', // kg/lb/oz/g
  'Variant Tax Code', // Código de imposto
  'Cost per item', // Custo por item
  'Status', // active/draft/archived
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

// Função para limpar HTML e pegar apenas texto
function stripHTML(html) {
  if (!html) return ''
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

// Gerar linhas CSV
const csvRows = []

// Header
csvRows.push(CSV_HEADERS.join(','))

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

  // Se não tem imagem, deixar vazio
  if (images.length === 0) {
    images.push('')
  }

  // Descrição
  const description = product.description
    ? stripHTML(product.description).substring(0, 5000) // Shopify limit
    : `${product.name} - Sneaker exclusivo de alta qualidade`

  // Tags
  const tags = product.tags
    ? (Array.isArray(product.tags) ? product.tags.join(', ') : product.tags)
    : product.category || ''

  // Preço
  const price = product.price || 0
  const regularPrice = product.regularPrice || price * 1.4 // 40% de desconto padrão

  // Para cada tamanho, criar uma linha (variante)
  productSizes.forEach((size, sizeIndex) => {
    // Para cada imagem, criar uma linha (Shopify agrupa por Handle)
    images.forEach((imageUrl, imageIndex) => {
      // Primeira linha de cada produto tem todos os dados
      // Linhas subsequentes só têm dados de variante/imagem
      const isFirstRow = sizeIndex === 0 && imageIndex === 0

      const row = [
        escapeCSV(product.slug), // Handle
        isFirstRow ? escapeCSV(product.name) : '', // Title
        isFirstRow ? escapeCSV(description) : '', // Body (HTML)
        isFirstRow ? 'SNKHOUSE' : '', // Vendor
        isFirstRow ? escapeCSV(product.category || 'Sneakers') : '', // Product Category
        isFirstRow ? 'Sneakers' : '', // Type
        isFirstRow ? escapeCSV(tags) : '', // Tags
        isFirstRow ? 'TRUE' : '', // Published
        imageIndex === 0 ? 'Tamanho' : '', // Option1 Name (só primeira imagem de cada tamanho)
        imageIndex === 0 ? escapeCSV(size) : '', // Option1 Value
        '', // Option2 Name
        '', // Option2 Value
        '', // Option3 Name
        '', // Option3 Value
        imageIndex === 0 ? escapeCSV(`${product.slug}-${size}`) : '', // Variant SKU
        imageIndex === 0 ? '800' : '', // Variant Grams (800g = peso médio sneaker)
        imageIndex === 0 ? 'shopify' : '', // Variant Inventory Tracker
        imageIndex === 0 ? '100' : '', // Variant Inventory Qty (100 unidades)
        imageIndex === 0 ? 'deny' : '', // Variant Inventory Policy
        imageIndex === 0 ? 'manual' : '', // Variant Fulfillment Service
        imageIndex === 0 ? escapeCSV(price.toFixed(2)) : '', // Variant Price
        imageIndex === 0 ? escapeCSV(regularPrice.toFixed(2)) : '', // Variant Compare At Price
        imageIndex === 0 ? 'TRUE' : '', // Variant Requires Shipping
        imageIndex === 0 ? 'TRUE' : '', // Variant Taxable
        '', // Variant Barcode
        escapeCSV(imageUrl), // Image Src
        escapeCSV(imageIndex + 1), // Image Position
        escapeCSV(`${product.name} - Imagem ${imageIndex + 1}`), // Image Alt Text
        isFirstRow ? 'FALSE' : '', // Gift Card
        isFirstRow ? escapeCSV(product.name) : '', // SEO Title
        isFirstRow ? escapeCSV(description.substring(0, 160)) : '', // SEO Description (160 chars)
        '', // Google Shopping / Google Product Category
        '', // Google Shopping / Gender
        '', // Google Shopping / Age Group
        '', // Google Shopping / MPN
        '', // Google Shopping / AdWords Grouping
        '', // Google Shopping / AdWords Labels
        isFirstRow ? 'new' : '', // Google Shopping / Condition
        '', // Google Shopping / Custom Product
        '', // Google Shopping / Custom Label 0
        '', // Google Shopping / Custom Label 1
        '', // Google Shopping / Custom Label 2
        '', // Google Shopping / Custom Label 3
        '', // Google Shopping / Custom Label 4
        '', // Variant Image
        imageIndex === 0 ? 'g' : '', // Variant Weight Unit
        '', // Variant Tax Code
        imageIndex === 0 ? escapeCSV((price * 0.5).toFixed(2)) : '', // Cost per item (50% do preço)
        isFirstRow ? 'active' : '', // Status
      ]

      csvRows.push(row.join(','))
    })
  })
})

// Salvar CSV
const csvContent = csvRows.join('\n')
const csvPath = path.join(__dirname, '../shopify-products-import.csv')

fs.writeFileSync(csvPath, csvContent, 'utf8')

console.log('\n✅ CSV gerado com sucesso!')
console.log(`📁 Arquivo: ${csvPath}`)
console.log(`📊 Total de produtos: ${productsData.products.length}`)
console.log(`📋 Total de linhas CSV: ${csvRows.length - 1}`) // -1 para o header

console.log('\n📤 Próximos passos:')
console.log('1. Acesse seu painel Shopify: https://admin.shopify.com/store/9wurf1-73')
console.log('2. Vá em Products → Import')
console.log('3. Faça upload do arquivo: shopify-products-import.csv')
console.log('4. Aguarde a importação concluir')
console.log('5. Execute: node scripts/fetch-shopify-variant-ids.js')
console.log('\n🎯 Arquivo pronto para importação!\n')
