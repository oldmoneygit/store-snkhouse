/**
 * Script para processar CSV do WooCommerce e enriquecer products.json
 * Adiciona gallery, description e sizes aos produtos
 */

const fs = require('fs');
const path = require('path');
const Papa = require('papaparse');

// Paths
const CSV_PATH = path.join(__dirname, '../wc-product-export-20-10-2025-1760999879805.csv');
const PRODUCTS_JSON_PATH = path.join(__dirname, '../data/products.json');
const PRODUCTS_JSON_BACKUP = path.join(__dirname, '../data/products.backup.json');

// Tamanhos padrão de calçados
const DEFAULT_SIZES = [35, 36, 37, 38, 39, 40, 41, 42, 43, 44, 45];

/**
 * Processa o CSV do WooCommerce usando PapaParse
 */
function processWooCommerceCSV() {
  console.log('🔄 Processando CSV do WooCommerce...');

  // Lê o CSV e remove BOM se existir
  let csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  if (csvContent.charCodeAt(0) === 0xFEFF) {
    csvContent = csvContent.slice(1);
  }

  // Parse CSV com PapaParse
  const results = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    delimiter: ',',
    quoteChar: '"',
    escapeChar: '"',
    transformHeader: (header) => {
      // Remove BOM e espaços em branco dos headers
      return header.replace(/^\uFEFF/, '').trim();
    }
  });

  console.log(`✅ CSV parseado: ${results.data.length} linhas`);

  if (results.errors.length > 0) {
    console.log(`⚠️  Erros encontrados: ${results.errors.length}`);
    results.errors.slice(0, 5).forEach(err => {
      console.log(`   - ${err.message} (linha ${err.row})`);
    });
  }

  // Mapeia produtos do CSV por ID
  const woocommerceProducts = {};

  results.data.forEach((row, index) => {
    const id = row['ID'];
    const name = row['Nombre'];
    const imagesStr = row['Imágenes'];
    const description = row['Descripción'];

    if (!id || !name) {
      return;
    }

    // Parse gallery (URLs separadas por vírgula e espaço)
    const gallery = imagesStr
      ? imagesStr.split(',').map(url => url.trim()).filter(url => url.length > 0)
      : [];

    woocommerceProducts[id] = {
      id,
      name,
      gallery,
      description: description || '',
      sizes: DEFAULT_SIZES
    };
  });

  console.log(`✅ Processados ${Object.keys(woocommerceProducts).length} produtos do CSV`);

  // Log alguns exemplos
  const sampleIds = Object.keys(woocommerceProducts).slice(0, 3);
  console.log(`\n📋 Exemplos de produtos processados:`);
  sampleIds.forEach(id => {
    const p = woocommerceProducts[id];
    console.log(`   - ID ${id}: ${p.name} (${p.gallery.length} imagens)`);
  });

  return woocommerceProducts;
}

/**
 * Atualiza products.json com dados do CSV
 */
function updateProductsJSON() {
  console.log('\n🔄 Atualizando products.json...');

  // Backup do JSON original
  const productsData = JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8'));
  fs.writeFileSync(PRODUCTS_JSON_BACKUP, JSON.stringify(productsData, null, 2));
  console.log(`✅ Backup criado em ${PRODUCTS_JSON_BACKUP}`);

  // Processa CSV
  const woocommerceProducts = processWooCommerceCSV();

  // Atualiza cada produto
  let updated = 0;
  let skipped = 0;

  productsData.products = productsData.products.map(product => {
    const wooId = product.woocommerceId;

    if (!wooId) {
      skipped++;
      return {
        ...product,
        gallery: product.gallery || [product.image],
        description: product.description || '',
        sizes: product.sizes || DEFAULT_SIZES
      };
    }

    const wooData = woocommerceProducts[wooId];

    if (!wooData) {
      console.log(`⚠️  Produto ${product.name} (ID: ${wooId}) não encontrado no CSV`);
      skipped++;
      return {
        ...product,
        gallery: product.gallery || [product.image],
        description: product.description || '',
        sizes: product.sizes || DEFAULT_SIZES
      };
    }

    updated++;
    return {
      ...product,
      gallery: wooData.gallery.length > 0 ? wooData.gallery : [product.image],
      description: wooData.description,
      sizes: wooData.sizes
    };
  });

  // Salva JSON atualizado
  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(productsData, null, 2));

  console.log(`\n✅ Atualização concluída!`);
  console.log(`   - Produtos atualizados: ${updated}`);
  console.log(`   - Produtos ignorados: ${skipped}`);
  console.log(`   - Total: ${productsData.products.length}`);
  console.log(`\n📁 Arquivo atualizado: ${PRODUCTS_JSON_PATH}`);
  console.log(`📁 Backup disponível: ${PRODUCTS_JSON_BACKUP}`);
}

// Executa o script
try {
  updateProductsJSON();
  console.log('\n🎉 Script executado com sucesso!');
} catch (error) {
  console.error('\n❌ Erro ao processar dados:');
  console.error(error);
  process.exit(1);
}
