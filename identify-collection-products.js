const data = require('./data/products.json');
const fs = require('fs');

console.log('📊 Análise de Produtos por Coleção\n');
console.log('='.repeat(60));

// IDs dos produtos em Featured e BestSellers (que já usam seedream)
const featuredIds = [9, 19, 14, 12, 53, 36, 10, 16, 39, 40, 17, 55, 41];
const bestSellerIds = [53, 6, 54, 9, 10, 11, 12, 55, 14, 15, 16, 17, 18, 19, 56, 21, 57, 23, 26, 27, 29, 30, 31, 32, 33, 34, 35, 36, 38, 39, 40, 41];
const usedInSeedreamSections = [...new Set([...featuredIds, ...bestSellerIds])];

// Coleções que usarão imagens originais
const collections = [
  { name: 'Air Jordan 1', category: 'air-jordan-1' },
  { name: 'Air Jordan 4', category: 'air-jordan-4' },
  { name: 'Nike Dunk Low', category: 'dunk-low' },
  { name: 'Yeezy', category: 'yeezy' }
];

let productsNeedingDuplicates = [];

collections.forEach(collection => {
  console.log(`\n${collection.name} (${collection.category})`);
  console.log('-'.repeat(60));

  const products = data.products.filter(p => p.category === collection.category);

  console.log(`Total de produtos: ${products.length}\n`);

  products.forEach(p => {
    const inFeatured = featuredIds.includes(p.id);
    const inBestSellers = bestSellerIds.includes(p.id);
    const needsDuplicate = inFeatured || inBestSellers;

    if (needsDuplicate) {
      productsNeedingDuplicates.push({
        id: p.id,
        name: p.name,
        category: collection.name,
        image: p.image,
        inFeatured,
        inBestSellers
      });
    }

    const status = needsDuplicate ? '⚠️  PRECISA DUPLICAR' : '✓';
    console.log(`${status} ID ${p.id}: ${p.name}`);
    if (inFeatured) console.log('   → Usado em Featured Products');
    if (inBestSellers) console.log('   → Usado em BestSellers');
  });
});

console.log('\n' + '='.repeat(60));
console.log(`\n📋 RESUMO: ${productsNeedingDuplicates.length} produtos precisam de duplicatas\n`);

productsNeedingDuplicates.forEach((p, i) => {
  console.log(`${i + 1}. ID ${p.id} (${p.category}): ${p.name}`);
  console.log(`   Imagem atual: ${p.image}`);
});

console.log('\n' + '='.repeat(60));
console.log('\n📸 Verificando imagens originais disponíveis...\n');

const originalImages = fs.readdirSync('public/images/products')
  .filter(f => !f.startsWith('seedream-'))
  .filter(f => f.endsWith('.jpg') || f.endsWith('.png') || f.endsWith('.webp'));

console.log(`Total de imagens originais: ${originalImages.length}`);

// Verificar se existem imagens originais correspondentes
productsNeedingDuplicates.forEach(p => {
  const imageName = p.image.replace('/images/products/', '').replace('seedream-', '');
  const hasOriginal = originalImages.some(img => img === imageName);
  console.log(`\n${hasOriginal ? '✅' : '❌'} ID ${p.id}: ${p.name}`);
  console.log(`   Procurando: ${imageName}`);
});
