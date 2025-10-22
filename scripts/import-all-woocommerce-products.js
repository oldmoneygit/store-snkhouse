/**
 * Script para importar TODOS os produtos do CSV do WooCommerce
 * Cria products.json completo com todos os 620 produtos
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

// Taxa de conversão USD para ARS (aproximada)
const USD_TO_ARS = 1250;

/**
 * Determina categoria baseada no nome do produto
 */
function categorizeProduct(name) {
  const nameLower = name.toLowerCase();

  // Travis Scott
  if (nameLower.includes('travis scott') || nameLower.includes('cactus jack')) {
    return 'travis-scott';
  }

  // Air Jordan 1
  if (nameLower.includes('air jordan 1') || nameLower.includes('jordan 1')) {
    return 'air-jordan-1';
  }

  // Air Jordan 2
  if (nameLower.includes('air jordan 2') || nameLower.includes('jordan 2')) {
    return 'air-jordan-2';
  }

  // Air Jordan 3
  if (nameLower.includes('air jordan 3') || nameLower.includes('jordan 3')) {
    return 'air-jordan-3';
  }

  // Air Jordan 4
  if (nameLower.includes('air jordan 4') || nameLower.includes('jordan 4')) {
    return 'air-jordan-4';
  }

  // Air Jordan 5
  if (nameLower.includes('air jordan 5') || nameLower.includes('jordan 5')) {
    return 'air-jordan-5';
  }

  // Air Jordan 6
  if (nameLower.includes('air jordan 6') || nameLower.includes('jordan 6')) {
    return 'air-jordan-6';
  }

  // Air Jordan 11
  if (nameLower.includes('air jordan 11') || nameLower.includes('jordan 11')) {
    return 'air-jordan-11';
  }

  // Air Jordan 12
  if (nameLower.includes('air jordan 12') || nameLower.includes('jordan 12')) {
    return 'air-jordan-12';
  }

  // Air Jordan 13
  if (nameLower.includes('air jordan 13') || nameLower.includes('jordan 13')) {
    return 'air-jordan-13';
  }

  // Dunk Low
  if (nameLower.includes('dunk low') || nameLower.includes('dunk sb')) {
    return 'dunk-low';
  }

  // Air Force 1
  if (nameLower.includes('air force') || nameLower.includes('af1')) {
    return 'air-force-1';
  }

  // Yeezy
  if (nameLower.includes('yeezy')) {
    return 'yeezy';
  }

  // Air Max
  if (nameLower.includes('air max')) {
    return 'air-max';
  }

  // New Balance
  if (nameLower.includes('new balance')) {
    return 'new-balance';
  }

  // Default
  return 'outros';
}

/**
 * Gera tags baseadas no nome do produto
 */
function generateTags(name, category) {
  const tags = [];
  const nameLower = name.toLowerCase();

  // Altura
  if (nameLower.includes('low')) tags.push('low');
  if (nameLower.includes('mid')) tags.push('mid');
  if (nameLower.includes('high')) tags.push('high');

  // Colaborações
  if (nameLower.includes('travis scott')) tags.push('travis-scott');
  if (nameLower.includes('dior')) tags.push('dior');
  if (nameLower.includes('off-white') || nameLower.includes('virgil')) tags.push('off-white');
  if (nameLower.includes('fragment')) tags.push('fragment');
  if (nameLower.includes('union')) tags.push('union');
  if (nameLower.includes('supreme')) tags.push('supreme');

  // Categoria
  if (category) tags.push(category);

  return tags;
}

/**
 * Cria slug a partir do nome
 */
function createSlug(name) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

/**
 * Processa CSV e retorna todos os produtos
 */
function importAllProducts() {
  console.log('🔄 Lendo CSV do WooCommerce...');

  // Lê o CSV
  let csvContent = fs.readFileSync(CSV_PATH, 'utf-8');
  if (csvContent.charCodeAt(0) === 0xFEFF) {
    csvContent = csvContent.slice(1);
  }

  // Parse CSV
  const results = Papa.parse(csvContent, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (header) => header.replace(/^\uFEFF/, '').trim()
  });

  console.log(`✅ CSV parseado: ${results.data.length} linhas`);

  // Filtra apenas produtos simples com nome
  const wooProducts = results.data.filter(row =>
    row.Tipo === 'simple' && row.Nombre && row.Nombre.trim().length > 0
  );

  console.log(`✅ Produtos válidos: ${wooProducts.length}`);

  // Converte para o formato products.json
  let nextId = 86; // Próximo ID após os produtos existentes (1-85)

  const newProducts = wooProducts.map((row, index) => {
    const name = row.Nombre.trim();
    const category = categorizeProduct(name);
    const slug = createSlug(name);
    const wooId = row.ID;

    // Preço - usa "Precio de oferta" (sale price) como preço principal
    let salePrice = parseFloat(row['Precio de oferta'] || 0);
    let regularPrice = parseFloat(row['Precio normal'] || 0);

    // Se não tem preço de oferta, usa o preço normal
    if (salePrice === 0 || isNaN(salePrice)) {
      salePrice = regularPrice;
    }

    // Se ainda não tem preço, usar padrão
    if (salePrice === 0 || isNaN(salePrice)) {
      salePrice = 100000; // Preço padrão em ARS
    }

    const hasDiscount = regularPrice > salePrice && regularPrice > 0;

    // Imagens
    const imagesStr = row['Imágenes'] || '';
    const gallery = imagesStr
      ? imagesStr.split(',').map(url => url.trim()).filter(url => url.length > 0)
      : [];

    const image = gallery.length > 0
      ? gallery[0]
      : `/images/products/${name}.jpg`;

    // Descrição
    const description = row['Descripción'] || '';

    // Stock - SEMPRE disponível com 100 unidades
    let stock = 'available';

    // Tags
    const tags = generateTags(name, category);

    // Permalink
    const permalink = `https://www.snkhouse.com/product/${slug}/`;

    return {
      id: nextId++,
      name,
      slug,
      price: Math.round(salePrice * 100) / 100,
      currency: 'ARS',
      image,
      category,
      tags,
      featured: false,
      bestSeller: false,
      stock,
      permalink,
      woocommerceId: wooId,
      regularPrice: hasDiscount ? Math.round(regularPrice * 100) / 100 : undefined,
      gallery,
      description,
      sizes: DEFAULT_SIZES
    };
  });

  console.log(`✅ Convertidos ${newProducts.length} produtos`);

  return newProducts;
}

/**
 * Atualiza products.json mantendo seedream e categorias
 */
function updateProductsJSON() {
  console.log('\n🔄 Atualizando products.json...');

  // Backup
  const oldData = JSON.parse(fs.readFileSync(PRODUCTS_JSON_PATH, 'utf-8'));
  fs.writeFileSync(PRODUCTS_JSON_BACKUP, JSON.stringify(oldData, null, 2));
  console.log(`✅ Backup criado`);

  // Importa todos os produtos do CSV
  const allProducts = importAllProducts();

  // Mantém apenas produtos seedream (IDs 53-77) dos produtos antigos
  const seedreamProducts = oldData.products.filter(p => p.id >= 53 && p.id <= 77);

  console.log(`\n📊 Resumo:`);
  console.log(`   - Produtos seedream mantidos: ${seedreamProducts.length}`);
  console.log(`   - Produtos novos importados: ${allProducts.length}`);
  console.log(`   - Total final: ${seedreamProducts.length + allProducts.length}`);

  // Combina produtos: seedream + todos do CSV
  const finalProducts = [...seedreamProducts, ...allProducts];

  // Conta produtos por categoria
  const categoryCounts = {};
  finalProducts.forEach(p => {
    if (p.id >= 53 && p.id <= 77) return; // Ignora seedream na contagem
    categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
  });

  console.log(`\n📦 Produtos por categoria (sem seedream):`);
  Object.entries(categoryCounts)
    .sort((a, b) => b[1] - a[1])
    .forEach(([cat, count]) => {
      console.log(`   - ${cat}: ${count} produtos`);
    });

  // Atualiza categories se necessário
  const existingCategorySlugs = oldData.categories.map(c => c.id);
  const newCategorySlugs = Object.keys(categoryCounts).filter(
    slug => !existingCategorySlugs.includes(slug)
  );

  const newCategories = newCategorySlugs.map(slug => ({
    id: slug,
    name: slug.toUpperCase().replace(/-/g, ' '),
    slug,
    image: '/images/categories/default.webp',
    woocommerceUrl: `https://www.snkhouse.com/product-category/${slug}/`
  }));

  const finalCategories = [...oldData.categories, ...newCategories];

  if (newCategories.length > 0) {
    console.log(`\n➕ Novas categorias adicionadas: ${newCategories.length}`);
    newCategories.forEach(c => console.log(`   - ${c.name}`));
  }

  // Salva JSON final
  const finalData = {
    products: finalProducts,
    categories: finalCategories
  };

  fs.writeFileSync(PRODUCTS_JSON_PATH, JSON.stringify(finalData, null, 2));

  console.log(`\n✅ products.json atualizado com sucesso!`);
  console.log(`📁 Arquivo: ${PRODUCTS_JSON_PATH}`);
  console.log(`📁 Backup: ${PRODUCTS_JSON_BACKUP}`);
}

// Executa
try {
  updateProductsJSON();
  console.log('\n🎉 Importação concluída com sucesso!');
} catch (error) {
  console.error('\n❌ Erro durante importação:');
  console.error(error);
  process.exit(1);
}
