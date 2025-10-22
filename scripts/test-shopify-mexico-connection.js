/**
 * Script para testar conexão com Shopify México
 */

const SHOPIFY_DOMAIN = 'pago-snkhouse-mexico.myshopify.com'
const STOREFRONT_TOKEN = '820828ea60d749b4c1c341d989a92a98'
const API_VERSION = '2024-10'

async function testConnection() {
  console.log('🧪 Testando conexão com Shopify México...\n')

  const url = `https://${SHOPIFY_DOMAIN}/api/${API_VERSION}/graphql.json`

  const query = `
    {
      shop {
        name
        primaryDomain {
          url
        }
        paymentSettings {
          currencyCode
        }
      }
    }
  `

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': STOREFRONT_TOKEN,
      },
      body: JSON.stringify({ query })
    })

    const data = await response.json()

    if (data.errors) {
      console.error('❌ Erro na consulta:', data.errors)
      return
    }

    if (data.data && data.data.shop) {
      console.log('✅ Conexão bem-sucedida!\n')
      console.log('📊 Dados da loja:')
      console.log(`   Nome: ${data.data.shop.name}`)
      console.log(`   URL: ${data.data.shop.primaryDomain.url}`)

      const currencyCode = data.data.shop.paymentSettings?.currencyCode || 'N/A'
      console.log(`   Moeda: ${currencyCode}`)
      console.log('\n✅ Token Storefront API está funcionando corretamente!')

      if (currencyCode !== 'MXN' && currencyCode !== 'N/A') {
        console.warn('\n⚠️  ATENÇÃO: A moeda da loja não é MXN!')
        console.warn(`   Moeda atual: ${currencyCode}`)
        console.warn('   Você precisa configurar a moeda para MXN no painel do Shopify.')
      }
    } else {
      console.error('❌ Resposta inesperada:', data)
    }

  } catch (error) {
    console.error('❌ Erro ao conectar:', error.message)

    if (error.message.includes('getaddrinfo ENOTFOUND')) {
      console.log('\n💡 O domínio não foi encontrado.')
      console.log('   Verifique se o domínio está correto.')
      console.log(`   Domínio testado: ${SHOPIFY_DOMAIN}`)
    }
  }
}

testConnection()
