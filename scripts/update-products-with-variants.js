/**
 * Script para atualizar products.json com Shopify Variant IDs
 *
 * Pré-requisito: shopify-variant-mapping.json gerado
 *
 * Como usar:
 * node scripts/update-products-with-variants.js
 *
 * Irá atualizar: data/products.json
 */

const fs = require('fs')
const path = require('path')

// Caminhos
const productsPath = path.join(__dirname, '../data/products.json')
const mappingPath = path.join(__dirname, '../shopify-variant-mapping.json')
const backupPath = path.join(__dirname, '../data/products.backup.json')

// Verificar se mapeamento existe
if (!fs.existsSync(mappingPath)) {
  console.error('❌ Erro: shopify-variant-mapping.json não encontrado!')
  console.error('Execute primeiro: node scripts/fetch-shopify-variant-ids.js')
  process.exit(1)
}

console.log('📦 Carregando dados...')

// Carregar arquivos
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))
const mapping = JSON.parse(fs.readFileSync(mappingPath, 'utf8'))

console.log(`   Produtos: ${productsData.products.length}`)
console.log(`   Mapeamento: ${Object.keys(mapping).length} produtos`)

// Fazer backup
console.log('\n💾 Criando backup...')
fs.writeFileSync(backupPath, JSON.stringify(productsData, null, 2), 'utf8')
console.log(`   Backup salvo: ${backupPath}`)

// Atualizar produtos
console.log('\n🔄 Atualizando produtos...')

let updatedCount = 0
let skippedCount = 0

productsData.products = productsData.products.map((product) => {
  const productMapping = mapping[product.id]

  if (!productMapping) {
    console.warn(`⚠️  Produto ${product.id} (${product.name}) não encontrado no mapeamento`)
    skippedCount++
    return product
  }

  // Converter array de tamanhos para nova estrutura
  const currentSizes = Array.isArray(product.sizes)
    ? product.sizes.map(s => (typeof s === 'object' ? s.size : s))
    : []

  const newSizes = currentSizes.map((size) => {
    const variantData = productMapping.variants[size]

    if (!variantData) {
      console.warn(`   ⚠️  Tamanho ${size} não encontrado para ${product.name}`)
      return {
        size: size,
        shopifyVariantId: null,
      }
    }

    return {
      size: size,
      shopifyVariantId: variantData.shopifyVariantId,
      availableForSale: variantData.availableForSale,
    }
  })

  // Atualizar produto
  updatedCount++

  return {
    ...product,
    sizes: newSizes,
    shopifyProductId: productMapping.shopifyProductId,
    shopifyHandle: productMapping.shopifyHandle,
  }
})

// Salvar produtos atualizados
console.log('\n💾 Salvando products.json...')
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8')

console.log('\n✅ Atualização concluída!')
console.log(`📊 Produtos atualizados: ${updatedCount}`)
console.log(`⚠️  Produtos pulados: ${skippedCount}`)
console.log(`📁 Arquivo: ${productsPath}`)
console.log(`💾 Backup: ${backupPath}`)

// Estatísticas
console.log('\n📈 Estatísticas:')

let totalVariants = 0
let variantsWithIds = 0
let variantsWithoutIds = 0

productsData.products.forEach((product) => {
  if (Array.isArray(product.sizes)) {
    product.sizes.forEach((sizeObj) => {
      totalVariants++
      if (sizeObj.shopifyVariantId) {
        variantsWithIds++
      } else {
        variantsWithoutIds++
      }
    })
  }
})

console.log(`   Total de variantes: ${totalVariants}`)
console.log(`   ✅ Com Shopify ID: ${variantsWithIds} (${((variantsWithIds / totalVariants) * 100).toFixed(1)}%)`)
console.log(`   ❌ Sem Shopify ID: ${variantsWithoutIds} (${((variantsWithoutIds / totalVariants) * 100).toFixed(1)}%)`)

if (variantsWithoutIds > 0) {
  console.log('\n⚠️  Atenção: Algumas variantes não têm Shopify ID!')
  console.log('Isso pode acontecer se:')
  console.log('  1. Os tamanhos no Shopify não correspondem aos locais')
  console.log('  2. Alguns produtos não foram importados')
  console.log('  3. Houve erro na importação do CSV')
}

console.log('\n✅ products.json atualizado com sucesso!')
console.log('\n📤 Próximo passo:')
console.log('1. Teste localmente: npm run dev')
console.log('2. Adicione ao carrinho e clique em "Finalizar Compra"')
console.log('3. Você deve ser redirecionado para checkout.shopify.com')
console.log('\n🎯 Migração completa!\n')
