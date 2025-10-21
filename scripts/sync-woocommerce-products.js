const WooCommerceRestApi = require("@woocommerce/woocommerce-rest-api").default;
const fs = require('fs');
const path = require('path');

// Carrega variáveis de ambiente
require('dotenv').config({ path: '.env.local' });

const api = new WooCommerceRestApi({
  url: process.env.WOOCOMMERCE_URL,
  consumerKey: process.env.WOOCOMMERCE_CONSUMER_KEY,
  consumerSecret: process.env.WOOCOMMERCE_CONSUMER_SECRET,
  version: "wc/v3"
});

// Carrega o products.json atual
const productsJsonPath = path.join(__dirname, '../data/products.json');
const currentProducts = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

async function syncProducts() {
  console.log('🔄 Iniciando sincronização com WooCommerce...\n');

  try {
    // Busca todos os produtos do WooCommerce
    const response = await api.get("products", {
      per_page: 100,
      status: 'publish'
    });

    console.log(`✅ Encontrados ${response.data.length} produtos no WooCommerce\n`);

    const updatedProducts = currentProducts.products.map(product => {
      // Busca produto correspondente no WooCommerce pelo nome
      const wcProduct = response.data.find(wp =>
        wp.name.toLowerCase().includes(product.name.toLowerCase()) ||
        product.name.toLowerCase().includes(wp.name.toLowerCase())
      );

      if (wcProduct) {
        console.log(`✓ Match encontrado: "${product.name}" -> "${wcProduct.name}"`);
        console.log(`  Preço: ${wcProduct.price} ARS`);
        console.log(`  URL: ${wcProduct.permalink}\n`);

        return {
          ...product,
          price: parseFloat(wcProduct.price) || product.price,
          currency: 'ARS',
          slug: wcProduct.slug,
          permalink: wcProduct.permalink,
          stock: wcProduct.stock_status === 'instock' ? 'available' :
                 wcProduct.stock_status === 'outofstock' ? 'soldout' : 'limited'
        };
      } else {
        console.log(`⚠ Sem match: "${product.name}" - mantendo dados atuais\n`);
        return product;
      }
    });

    // Salva o arquivo atualizado
    const updatedData = {
      ...currentProducts,
      products: updatedProducts
    };

    fs.writeFileSync(
      productsJsonPath,
      JSON.stringify(updatedData, null, 2),
      'utf8'
    );

    console.log('\n✅ Sincronização concluída!');
    console.log(`📝 Arquivo atualizado: ${productsJsonPath}`);

  } catch (error) {
    console.error('❌ Erro na sincronização:', error.message);
    if (error.response) {
      console.error('Resposta:', error.response.data);
    }
  }
}

syncProducts();
