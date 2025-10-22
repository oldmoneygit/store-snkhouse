/**
 * Script para buscar IDs de variantes do Shopify México
 * e criar mapeamento para atualizar products.json
 */

const fs = require('fs')
const path = require('path')

const SHOPIFY_DOMAIN = 'pago-snkhouse-mexico.myshopify.com'
const STOREFRONT_TOKEN = '820828ea60d749b4c1c341d989a92a98'
const API_VERSION = '2024-10'

/**
 * Busca produtos do Shopify usando GraphQL
 */
async function fetchProducts(cursor = null) {
  const url = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`

  const query = `
    query GetProducts($cursor: String) {
      products(first: 50, after: $cursor) {
        pageInfo {
          hasNextPage
          endCursor
        }
        edges {
          node {
            id
            handle
            title
            variants(first: 50) {
              edges {
                node {
                  id
                  title
                  sku
                  price {
                    amount
                  }
                }
              }
            }
          }
        }
      }
    }
  `

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
    },
    body: JSON.stringify({
      query,
      variables: { cursor }
    })
  })

  const json = await response.json()

  if (json.errors) {
    throw new Error(`GraphQL errors: ${JSON.stringify(json.errors)}`)
  }

  return json.data.products
}

/**
 * Busca todos os produtos do Shopify
 */
async function fetchAllProducts() {
  console.log('🔍 Buscando produtos do Shopify México...\n')

  let allProducts = []
  let hasNextPage = true
  let cursor = null
  let page = 1

  while (hasNextPage) {
    console.log(`   Página ${page}...`)

    const products = await fetchProducts(cursor)

    allProducts = allProducts.concat(
      products.edges.map(edge => edge.node)
    )

    hasNextPage = products.pageInfo.hasNextPage
    cursor = products.pageInfo.endCursor
    page++

    // Pequeno delay para não sobrecarregar a API
    await new Promise(resolve => setTimeout(resolve, 500))
  }

  console.log(`\n✅ Total de produtos encontrados: ${allProducts.length}\n`)
  return allProducts
}

/**
 * Cria mapeamento de handle → variantes do México
 */
function createVariantMapping(shopifyProducts) {
  const mapping = {}

  shopifyProducts.forEach(product => {
    const variants = product.variants.edges.map(edge => ({
      id: edge.node.id,
      title: edge.node.title,
      sku: edge.node.sku,
      price: parseFloat(edge.node.price.amount)
    }))

    mapping[product.handle] = {
      shopifyId: product.id,
      title: product.title,
      variants
    }
  })

  return mapping
}

/**
 * Main execution
 */
async function main() {
  console.log('🇲🇽 BUSCAR IDS DE VARIANTES DO SHOPIFY MÉXICO\n')
  console.log('=' .repeat(60))

  try {
    // Buscar produtos do Shopify México
    const shopifyProducts = await fetchAllProducts()

    // Criar mapeamento
    console.log('📊 Criando mapeamento de variantes...')
    const mapping = createVariantMapping(shopifyProducts)

    // Salvar mapeamento
    const outputPath = path.join(__dirname, '..', 'shopify-mexico-variant-mapping.json')
    fs.writeFileSync(outputPath, JSON.stringify(mapping, null, 2))

    console.log(`\n✅ Mapeamento salvo em: shopify-mexico-variant-mapping.json`)
    console.log(`📦 Total de produtos mapeados: ${Object.keys(mapping).length}`)

    // Estatísticas
    let totalVariants = 0
    Object.values(mapping).forEach(product => {
      totalVariants += product.variants.length
    })

    console.log(`🔢 Total de variantes: ${totalVariants}`)
    console.log('\n' + '='.repeat(60))
    console.log('\n✅ Concluído! Próximo passo: atualizar products.json\n')

  } catch (error) {
    console.error('\n❌ Erro:', error.message)
    process.exit(1)
  }
}

main()
