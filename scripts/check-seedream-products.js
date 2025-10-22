const fs = require('fs');
const path = require('path');

const data = require('./data/products.json');
const seedreamDir = 'referencias/seedream';
const bestsellerIds = [26, 6, 27, 2, 29, 30, 31, 32, 9, 12, 33, 34, 35, 10, 36, 11, 8, 22, 38, 15, 16, 39, 40, 17, 13, 41];

// Listar imagens da seedream
const seedreamFiles = fs.readdirSync(seedreamDir)
  .filter(f => /\.(jpg|png)$/i.test(f))
  .filter(f => !f.startsWith('replicate-')) // Ignorar imagens de ambiente
  .filter(f => !f.includes('Sem nome')); // Ignorar logo

console.log('🔍 ANÁLISE DAS IMAGENS DA PASTA SEEDREAM\n');
console.log(`📁 Total de imagens de produtos: ${seedreamFiles.length}\n`);

// Mapear cada imagem com o produto correspondente
const seedreamProducts = [];

seedreamFiles.forEach(imageName => {
  // Normalizar o nome para comparação
  const normalizedName = imageName
    .replace(/\.(jpg|png)$/i, '')
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/'/g, "'");

  // Buscar produto no JSON
  const product = data.products.find(p => {
    const productName = p.name
      .replace(/"/g, '"')
      .replace(/"/g, '"')
      .replace(/'/g, "'")
      .replace(/'/g, "'");

    return normalizedName.includes(productName) || productName.includes(normalizedName);
  });

  if (product) {
    seedreamProducts.push({
      imageName,
      productId: product.id,
      productName: product.name,
      inBestsellers: bestsellerIds.includes(product.id),
      isBestseller: product.bestSeller
    });
  } else {
    console.log(`⚠ Imagem sem produto correspondente: ${imageName}`);
  }
});

console.log('═'.repeat(80));
console.log('📊 PRODUTOS DA SEEDREAM NA SEÇÃO "MAIS VENDIDOS"');
console.log('═'.repeat(80));

const inBestsellers = seedreamProducts.filter(p => p.inBestsellers);
const notInBestsellers = seedreamProducts.filter(p => !p.inBestsellers);

console.log(`\n✅ JÁ ESTÃO NA SEÇÃO (${inBestsellers.length} produtos):\n`);
inBestsellers.forEach(p => {
  console.log(`   ✓ ID ${p.productId}: ${p.productName}`);
});

console.log(`\n❌ NÃO ESTÃO NA SEÇÃO (${notInBestsellers.length} produtos):\n`);
notInBestsellers.forEach(p => {
  console.log(`   ✗ ID ${p.productId}: ${p.productName}`);
});

// IDs dos produtos faltantes
const missingIds = notInBestsellers.map(p => p.productId);

console.log('\n' + '═'.repeat(80));
console.log('📋 LISTA ATUALIZADA DE IDs PARA BESTSELLERS:');
console.log('═'.repeat(80));

const allIds = [...bestsellerIds, ...missingIds].sort((a, b) => a - b);

console.log(`\nconst bestSellerIds = [${allIds.join(', ')}]`);
console.log(`\n📊 Total: ${allIds.length} produtos`);
