/**
 * Script para atualizar products.json com suporte multi-país
 * Mescla IDs do Shopify Argentina e México
 */

const fs = require('fs')
const path = require('path')

console.log('🌎 ATUALIZAR PRODUCTS.JSON - MULTI-PAÍS\n')
console.log('=' .repeat(60))

// Ler arquivos
const productsPath = path.join(__dirname, '..', 'data', 'products.json')
const mexicoMappingPath = path.join(__dirname, '..', 'shopify-mexico-variant-mapping.json')

console.log('📂 Lendo arquivos...')
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf-8'))
const products = productsData.products || productsData // Suporta ambos os formatos
const mexicoMapping = JSON.parse(fs.readFileSync(mexicoMappingPath, 'utf-8'))

console.log(`   ✅ ${products.length} produtos carregados`)
console.log(`   ✅ ${Object.keys(mexicoMapping).length} produtos do México mapeados\n`)

// Estatísticas
let updated = 0
let notFound = 0
let errors = 0

console.log('🔄 Atualizando produtos...\n')

// Backup do arquivo original
const backupPath = path.join(__dirname, '..', 'data', 'products.backup.json')
fs.writeFileSync(backupPath, JSON.stringify(productsData, null, 2))
console.log('💾 Backup criado: data/products.backup.json\n')

// Processar cada produto
products.forEach((product, index) => {
  const handle = product.shopifyHandle

  if (!handle) {
    console.warn(`⚠️  Produto ${index + 1}: Sem shopifyHandle - ${product.name}`)
    errors++
    return
  }

  // Buscar produto correspondente no México
  const mexicoProduct = mexicoMapping[handle]

  if (!mexicoProduct) {
    console.warn(`⚠️  Produto ${index + 1}: Não encontrado no México - ${handle}`)
    notFound++
    return
  }

  // Atualizar shopifyProductId para estrutura multi-país
  if (product.shopifyProductId && typeof product.shopifyProductId === 'string') {
    product.shopifyProductId = {
      AR: product.shopifyProductId,
      MX: mexicoProduct.shopifyId
    }
  }

  // Atualizar cada variante (tamanho)
  if (product.sizes && Array.isArray(product.sizes)) {
    product.sizes.forEach(sizeObj => {
      if (!sizeObj.shopifyVariantId) return

      // Se já for objeto multi-país, pular
      if (typeof sizeObj.shopifyVariantId === 'object') return

      const argentinaVariantId = sizeObj.shopifyVariantId

      // Buscar variante correspondente no México pelo tamanho/SKU
      const mexicoVariant = mexicoProduct.variants.find(v => {
        // Tentar match por título da variante (tamanho)
        const size = sizeObj.size.toString()
        return v.title === size || v.title === `Talla ${size}` || v.title === `Size ${size}`
      })

      if (mexicoVariant) {
        sizeObj.shopifyVariantId = {
          AR: argentinaVariantId,
          MX: mexicoVariant.id
        }
      } else {
        // Se não encontrar, manter apenas o ID da Argentina
        sizeObj.shopifyVariantId = {
          AR: argentinaVariantId,
          MX: null
        }
      }
    })
  }

  updated++
})

console.log('\n' + '='.repeat(60))
console.log('📊 ESTATÍSTICAS:\n')
console.log(`   ✅ Produtos atualizados: ${updated}`)
console.log(`   ⚠️  Não encontrados no México: ${notFound}`)
console.log(`   ❌ Erros: ${errors}`)
console.log('=' .repeat(60))

// Salvar arquivo atualizado (mantendo estrutura original)
productsData.products = products
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2))

console.log('\n✅ Arquivo atualizado: data/products.json')
console.log('\n💡 IMPORTANTE: O app agora usa IDs por país automaticamente!')
console.log('   - Argentina: usa os IDs de AR')
console.log('   - México: usa os IDs de MX\n')
