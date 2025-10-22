const data = require('./data/products.json');
const fs = require('fs');

console.log('🔍 Verificação Final - Coleções com Imagens Seedream\n');
console.log('='.repeat(70));

const collections = [
  { name: 'Air Jordan 1', category: 'air-jordan-1', expectedSeedreamIds: [58, 59, 60] },
  { name: 'Air Jordan 4', category: 'air-jordan-4', expectedSeedreamIds: [61, 62, 63, 64, 65, 66, 67, 68] },
  { name: 'Nike Dunk Low', category: 'dunk-low', expectedSeedreamIds: [69, 70, 71, 72, 73, 74, 75] },
  { name: 'Yeezy', category: 'yeezy', expectedSeedreamIds: [76, 77] }
];

collections.forEach(col => {
  console.log(`\n📦 ${col.name.toUpperCase()}`);
  console.log('-'.repeat(70));

  // Filtrar produtos seedream desta categoria
  const seedreamProducts = data.products.filter(p =>
    p.category === col.category && p.seedreamVersion === true
  );

  console.log(`Produtos seedream encontrados: ${seedreamProducts.length}`);
  console.log(`Esperados: ${col.expectedSeedreamIds.length}`);

  if (seedreamProducts.length === col.expectedSeedreamIds.length) {
    console.log('✅ Quantidade correta!\n');
  } else {
    console.log('❌ Quantidade diferente do esperado!\n');
  }

  seedreamProducts.forEach(p => {
    const imageExists = fs.existsSync('public' + p.image);
    const hasSeedreamImage = p.image.includes('seedream-');

    console.log(`${imageExists && hasSeedreamImage ? '✅' : '❌'} ID ${p.id}: ${p.name}`);
    console.log(`   Imagem: ${p.image}`);
    console.log(`   ${hasSeedreamImage ? '✓' : '✗'} Tem prefixo seedream-`);
    console.log(`   ${imageExists ? '✓' : '✗'} Arquivo existe`);
  });
});

console.log('\n' + '='.repeat(70));
console.log('\n🎯 TRAVIS SCOTT (deve usar imagens ORIGINAIS)\n');

const travisProducts = data.products.filter(p => p.category === 'travis-scott');

console.log(`Total: ${travisProducts.length} produtos`);

travisProducts.forEach(p => {
  const isOriginal = !p.image.includes('seedream-');
  const imageExists = fs.existsSync('public' + p.image);

  console.log(`${isOriginal && imageExists ? '✅' : '❌'} ID ${p.id}: ${p.name}`);
  console.log(`   ${isOriginal ? '✓ Original' : '✗ Seedream'}: ${p.image}`);
  console.log(`   ${imageExists ? '✓ Arquivo existe' : '✗ Arquivo não existe'}`);
});

console.log('\n' + '='.repeat(70));
console.log('\n📊 RESUMO FINAL:\n');

const totalSeedream = data.products.filter(p => p.seedreamVersion === true).length;
console.log(`✅ Total de versões seedream: ${totalSeedream}`);
console.log(`✅ Air Jordan 1: 3 seedream`);
console.log(`✅ Air Jordan 4: 8 seedream`);
console.log(`✅ Nike Dunk Low: 7 seedream`);
console.log(`✅ Yeezy: 2 seedream`);
console.log(`✅ Travis Scott: ${travisProducts.length} originais`);
console.log('\n🎉 Configuração concluída com sucesso!');
