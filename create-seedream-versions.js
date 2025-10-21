const fs = require('fs');

// Read products.json
const productsPath = './data/products.json';
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Mapping of original product IDs to seedream images
const seedreamVersions = [
  {
    originalId: 2,  // Nike Air Jordan 1 Retro High x Travis Scott
    seedreamImage: '/images/products/seedream-Nike Air Jordan 1 Retro High x Travis Scott.jpg'
  },
  {
    originalId: 8,  // Nike Air Jordan 4 Retro Travis Scott Cactus Jack
    seedreamImage: '/images/products/seedream-Nike Air Jordan 4 Retro Travis Scott Cactus Jack.jpg'
  },
  {
    originalId: 13, // Nike SB Dunk Low x Travis Scott
    seedreamImage: '/images/products/seedream-Nike SB Dunk Low x Travis Scott.jpg'
  },
  {
    originalId: 20, // Nike Air Force 1 x Travis Scott "White"
    seedreamImage: '/images/products/seedream-Nike Air Force 1 x Travis Scott "White".jpg'
  },
  {
    originalId: 22, // Nike Air Jordan 6 Travis Scott "British Khaki"
    seedreamImage: '/images/products/seedream-Nike Air Jordan 6 Travis Scott "British Khaki".jpg'
  }
];

// Get the highest ID
const maxId = Math.max(...productsData.products.map(p => p.id));
let nextId = maxId + 1;

console.log('📦 Criando versões seedream dos produtos Travis Scott...\n');

seedreamVersions.forEach(mapping => {
  // Find the original product
  const originalProduct = productsData.products.find(p => p.id === mapping.originalId);

  if (!originalProduct) {
    console.log(`❌ Produto original ID ${mapping.originalId} não encontrado`);
    return;
  }

  // Create seedream version
  const seedreamProduct = {
    ...originalProduct,
    id: nextId++,
    slug: originalProduct.slug + '-seedream',
    image: mapping.seedreamImage,
    // Mark this as a seedream version (for internal use)
    seedreamVersion: true
  };

  productsData.products.push(seedreamProduct);
  console.log(`✅ Criada versão seedream do produto:`);
  console.log(`   ID ${originalProduct.id} → ID ${seedreamProduct.id}`);
  console.log(`   ${originalProduct.name}`);
  console.log(`   Imagem: ${seedreamProduct.image}\n`);
});

// Save updated products.json
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8');

console.log('🎉 Products.json atualizado!');
console.log(`📊 Total de produtos: ${productsData.products.length}`);
console.log(`📊 Versões seedream criadas: ${seedreamVersions.length}`);
