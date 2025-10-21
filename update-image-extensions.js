const fs = require('fs');

// Ler products.json
const productsPath = 'data/products.json';
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log('🔄 Atualizando extensões das imagens para .jpg...\n');

let updated = 0;

productsData.products.forEach(product => {
  if (product.image && product.image.endsWith('.png')) {
    const oldImage = product.image;
    product.image = product.image.replace(/\.png$/, '.jpg');
    console.log(`✓ ID ${product.id}: ${product.name}`);
    console.log(`  ${oldImage} → ${product.image}\n`);
    updated++;
  }
});

// Salvar products.json atualizado
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8');

console.log(`✅ ${updated} produtos atualizados!`);
console.log('✅ Arquivo products.json salvo com sucesso!');
