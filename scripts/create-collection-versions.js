const fs = require('fs');
const data = require('./data/products.json');

console.log('🔄 Criando versões seedream e originais para coleções...\n');

// IDs que precisam de duplicatas
const productsToDuplicate = [
  6, 26, 27,           // Air Jordan 1
  9, 10, 11, 12, 32, 34, 35, 36,  // Air Jordan 4
  14, 15, 16, 17, 38, 39, 40,     // Nike Dunk Low
  18, 19                           // Yeezy
];

// Mapeamento: ID original → ID seedream
const idMapping = {};
let newProducts = [];
let nextId = 58; // Começar do ID 58

console.log('📋 Criando duplicatas seedream...\n');

productsToDuplicate.forEach(originalId => {
  const product = data.products.find(p => p.id === originalId);

  if (!product) {
    console.log(`❌ Produto ID ${originalId} não encontrado!`);
    return;
  }

  // Criar versão seedream (duplicata)
  const seedreamProduct = {
    ...product,
    id: nextId,
    slug: `${product.slug}-seedream`,
    seedreamVersion: true
  };

  // Se a imagem já começa com seedream-, mantém
  // Se não, adiciona o prefixo
  if (!seedreamProduct.image.includes('seedream-')) {
    seedreamProduct.image = seedreamProduct.image.replace('/images/products/', '/images/products/seedream-');
  }

  newProducts.push(seedreamProduct);
  idMapping[originalId] = nextId;

  console.log(`✅ ID ${originalId} → Seedream ID ${nextId}`);
  console.log(`   ${product.name}`);
  console.log(`   Original: ${product.image}`);
  console.log(`   Seedream: ${seedreamProduct.image}\n`);

  nextId++;
});

console.log('📝 Atualizando produtos originais para usar imagens originais...\n');

// Atualizar produtos originais para usar imagens sem prefixo seedream-
data.products = data.products.map(p => {
  if (productsToDuplicate.includes(p.id)) {
    // Remover prefixo seedream- se existir
    if (p.image.includes('seedream-')) {
      const originalImage = p.image.replace('seedream-', '');
      console.log(`✅ ID ${p.id}: ${p.name}`);
      console.log(`   ${p.image} → ${originalImage}\n`);
      return { ...p, image: originalImage };
    }
  }
  return p;
});

// Adicionar novos produtos seedream
data.products = [...data.products, ...newProducts];

// Salvar
fs.writeFileSync('data/products.json', JSON.stringify(data, null, 2));

console.log('='.repeat(60));
console.log('\n✅ Arquivo atualizado!');
console.log(`\n📊 Resumo:`);
console.log(`   - ${productsToDuplicate.length} produtos originais atualizados`);
console.log(`   - ${newProducts.length} versões seedream criadas`);
console.log(`   - Total de produtos: ${data.products.length}`);

console.log('\n📋 Mapeamento ID Original → ID Seedream:\n');
Object.entries(idMapping).forEach(([original, seedream]) => {
  console.log(`   ${original} → ${seedream}`);
});

// Salvar mapeamento para usar depois
fs.writeFileSync('id-mapping-collections.json', JSON.stringify(idMapping, null, 2));
console.log('\n💾 Mapeamento salvo em: id-mapping-collections.json');
