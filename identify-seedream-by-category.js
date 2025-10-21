const data = require('./data/products.json');

console.log('📋 IDs Seedream por Categoria\n');
console.log('='.repeat(60));

// Filtrar apenas produtos seedream
const seedreamProducts = data.products.filter(p => p.seedreamVersion === true);

// Agrupar por categoria
const byCategory = {};

seedreamProducts.forEach(p => {
  if (!byCategory[p.category]) {
    byCategory[p.category] = [];
  }
  byCategory[p.category].push(p);
});

// Mostrar IDs para cada coleção
console.log('\n🎯 AIR JORDAN 1:');
if (byCategory['air-jordan-1']) {
  const ids = byCategory['air-jordan-1'].map(p => p.id).sort((a, b) => a - b);
  console.log(`   IDs: [${ids.join(', ')}]`);
  console.log(`   Total: ${ids.length} produtos\n`);
  byCategory['air-jordan-1'].forEach(p => {
    console.log(`   ${p.id}: ${p.name}`);
  });
}

console.log('\n🎯 AIR JORDAN 4:');
if (byCategory['air-jordan-4']) {
  const ids = byCategory['air-jordan-4'].map(p => p.id).sort((a, b) => a - b);
  console.log(`   IDs: [${ids.join(', ')}]`);
  console.log(`   Total: ${ids.length} produtos\n`);
  byCategory['air-jordan-4'].forEach(p => {
    console.log(`   ${p.id}: ${p.name}`);
  });
}

console.log('\n🎯 NIKE DUNK LOW:');
if (byCategory['dunk-low']) {
  const ids = byCategory['dunk-low'].map(p => p.id).sort((a, b) => a - b);
  console.log(`   IDs: [${ids.join(', ')}]`);
  console.log(`   Total: ${ids.length} produtos\n`);
  byCategory['dunk-low'].forEach(p => {
    console.log(`   ${p.id}: ${p.name}`);
  });
}

console.log('\n🎯 YEEZY:');
if (byCategory['yeezy']) {
  const ids = byCategory['yeezy'].map(p => p.id).sort((a, b) => a - b);
  console.log(`   IDs: [${ids.join(', ')}]`);
  console.log(`   Total: ${ids.length} produtos\n`);
  byCategory['yeezy'].forEach(p => {
    console.log(`   ${p.id}: ${p.name}`);
  });
}

console.log('\n' + '='.repeat(60));
console.log('\n📊 RESUMO:');
console.log(`   Total de produtos seedream: ${seedreamProducts.length}`);
console.log('\n✅ Estas seções vão usar IDs seedream');
console.log('✅ Travis Scott continuará usando IDs originais');
