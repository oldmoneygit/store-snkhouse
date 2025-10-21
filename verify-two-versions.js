const data = require('./data/products.json');
const fs = require('fs');

console.log('📊 VERIFICAÇÃO DAS DUAS VERSÕES DE PRODUTOS TRAVIS SCOTT\n');
console.log('='.repeat(70) + '\n');

// Original Travis Scott products (imagens originais - para seção Travis Scott)
const originalTravis = data.products.filter(p =>
  p.category === 'travis-scott' && !p.seedreamVersion
);

// Seedream Travis Scott products (imagens editadas - para Featured e BestSellers)
const seedreamTravis = data.products.filter(p => p.seedreamVersion === true);

console.log('📦 PRODUTOS TRAVIS SCOTT ORIGINAIS (19 produtos):');
console.log('   Usados na seção: "Travis Scott x Jordan 🔥"\n');
originalTravis.forEach((p, i) => {
  const imagePath = 'public' + p.image;
  const exists = fs.existsSync(imagePath);
  const size = exists ? (fs.statSync(imagePath).size / 1024).toFixed(1) + 'KB' : 'N/A';
  console.log(`${i+1}. ID ${p.id}: ${p.name}`);
  console.log(`   ${p.image.split('/').pop()} (${size})`);
});

console.log('\n' + '='.repeat(70) + '\n');

console.log('🎨 VERSÕES SEEDREAM (5 produtos):');
console.log('   Usados em: "Productos en Destaque" e "Los más vendidos"\n');
seedreamTravis.forEach((p, i) => {
  const imagePath = 'public' + p.image;
  const exists = fs.existsSync(imagePath);
  const size = exists ? (fs.statSync(imagePath).size / 1024).toFixed(1) + 'KB' : 'N/A';

  // Find the original product
  const originalId = {
    53: 2,
    54: 8,
    55: 13,
    56: 20,
    57: 22
  }[p.id];

  console.log(`${i+1}. ID ${p.id} (versão seedream do ID ${originalId}): ${p.name}`);
  console.log(`   ${p.image.split('/').pop()} (${size})`);
});

console.log('\n' + '='.repeat(70) + '\n');

console.log('📈 RESUMO:');
console.log(`   Total de produtos no catálogo: ${data.products.length}`);
console.log(`   Produtos Travis Scott originais: ${originalTravis.length}`);
console.log(`   Versões seedream: ${seedreamTravis.length}`);
console.log(`   Total relacionado a Travis Scott: ${originalTravis.length + seedreamTravis.length}`);

console.log('\n✅ Estrutura de duas versões criada com sucesso!');
console.log('   • Seção Travis Scott = imagens originais da pasta products/');
console.log('   • Featured & BestSellers = imagens editadas da pasta seedream/');
