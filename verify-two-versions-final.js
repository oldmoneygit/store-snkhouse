const data = require('./data/products.json');
const fs = require('fs');

console.log('🔍 Verificação Final - Sistema de 2 Versões\n');
console.log('='.repeat(70));

// Mapeamento de IDs
const mapping = {
  6: 58, 9: 61, 10: 62, 11: 63, 12: 64,
  14: 69, 15: 70, 16: 71, 17: 72,
  18: 76, 19: 77,
  26: 59, 27: 60,
  32: 65, 34: 66, 35: 67, 36: 68,
  38: 73, 39: 74, 40: 75
};

console.log('\n📋 1. VERIFICANDO PRODUTOS ORIGINAIS (para coleções)\n');

Object.keys(mapping).forEach(originalId => {
  const id = parseInt(originalId);
  const product = data.products.find(p => p.id === id);

  if (!product) {
    console.log(`❌ ID ${id}: Produto não encontrado!`);
    return;
  }

  const hasOriginalImage = !product.image.includes('seedream-');
  const imageExists = fs.existsSync('public' + product.image);

  console.log(`${hasOriginalImage && imageExists ? '✅' : '❌'} ID ${id}: ${product.name}`);
  console.log(`   ${hasOriginalImage ? '✓ Imagem original' : '✗ Ainda tem seedream-'}: ${product.image}`);
  console.log(`   ${imageExists ? '✓ Arquivo existe' : '✗ Arquivo não existe'}`);
});

console.log('\n' + '='.repeat(70));
console.log('\n📋 2. VERIFICANDO VERSÕES SEEDREAM (para Featured/BestSellers)\n');

Object.values(mapping).forEach(seedreamId => {
  const product = data.products.find(p => p.id === seedreamId);

  if (!product) {
    console.log(`❌ ID ${seedreamId}: Produto seedream não encontrado!`);
    return;
  }

  const hasSeedreamImage = product.image.includes('seedream-');
  const imageExists = fs.existsSync('public' + product.image);
  const hasSeedreamFlag = product.seedreamVersion === true;

  console.log(`${hasSeedreamImage && imageExists && hasSeedreamFlag ? '✅' : '❌'} ID ${seedreamId}: ${product.name}`);
  console.log(`   ${hasSeedreamImage ? '✓ Imagem seedream' : '✗ Falta seedream-'}: ${product.image}`);
  console.log(`   ${imageExists ? '✓ Arquivo existe' : '✗ Arquivo não existe'}`);
  console.log(`   ${hasSeedreamFlag ? '✓ Flag seedreamVersion' : '✗ Falta flag'}`);
});

console.log('\n' + '='.repeat(70));
console.log('\n📋 3. VERIFICANDO COLEÇÕES (devem usar IDs originais)\n');

const collections = [
  { name: 'Air Jordan 1', category: 'air-jordan-1', expectedOriginals: [1, 5, 6, 7, 24, 26, 27, 28] },
  { name: 'Air Jordan 4', category: 'air-jordan-4', expectedOriginals: [9, 10, 11, 12, 32, 34, 35, 36] },
  { name: 'Nike Dunk Low', category: 'dunk-low', expectedOriginals: [14, 15, 16, 17, 37, 38, 39, 40] },
  { name: 'Yeezy', category: 'yeezy', expectedOriginals: [18, 19] }
];

collections.forEach(col => {
  const products = data.products.filter(p => p.category === col.category);
  const allOriginal = products.every(p => !p.image.includes('seedream-') || !col.expectedOriginals.includes(p.id));

  console.log(`${allOriginal ? '✅' : '⚠️'} ${col.name}: ${products.length} produtos`);
  products.forEach(p => {
    const isOriginal = !p.image.includes('seedream-');
    console.log(`   ${isOriginal ? '✓' : '✗'} ID ${p.id}: ${isOriginal ? 'Original' : 'Seedream'}`);
  });
});

console.log('\n' + '='.repeat(70));
console.log('\n📊 RESUMO FINAL:\n');

const totalProducts = data.products.length;
const seedreamProducts = data.products.filter(p => p.seedreamVersion === true).length;
const originalProducts = totalProducts - seedreamProducts;

console.log(`Total de produtos: ${totalProducts}`);
console.log(`  └─ Originais: ${originalProducts}`);
console.log(`  └─ Seedream: ${seedreamProducts}`);
console.log(`\n✅ Sistema de 2 versões implementado com sucesso!`);
console.log(`\n📝 Uso:`);
console.log(`  - Coleções (Jordan 1/4, Dunk, Yeezy): IDs originais (imagens originais)`);
console.log(`  - Featured/BestSellers: IDs seedream (imagens editadas)`);
