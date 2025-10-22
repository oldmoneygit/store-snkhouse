const fs = require('fs');
const data = require('./data/products.json');

const seedreamDir = 'referencias/seedream';
const bestsellerIds = [26, 6, 27, 2, 29, 30, 31, 32, 9, 12, 33, 34, 35, 10, 36, 11, 8, 22, 38, 15, 16, 39, 40, 17, 13, 41];

// Listar imagens da seedream (excluir replicate e logos)
const seedreamFiles = fs.readdirSync(seedreamDir)
  .filter(f => /\.(jpg|png)$/i.test(f))
  .filter(f => !f.startsWith('replicate-'))
  .filter(f => !f.includes('Sem nome'));

console.log('🔍 MAPEAMENTO MANUAL DAS IMAGENS SEEDREAM → PRODUTOS\n');

// Mapeamento manual baseado nos nomes das imagens
const mapping = {
  'Adidas Yeezy Boost 350 V2 "Onyx".jpg': 18,
  'Adidas Yeezy Boost 350 V2 Static.jpg': 19,
  'Neckface x Nike SB Dunk Low "Halloween".jpg': 14,
  'Nike Air Force 1 Low x Louis Vuitton x Off-White "Triple White".jpg': 21,
  'Nike Air Force 1 x Louis Vuitton Low "By Virgil Abloh Black".jpg': 23,
  'Nike Air Force 1 x Travis Scott "White".jpg': 20,
  'Nike Air Jordan 1 High "Bred Banned (2016)".jpg': 27,
  'Nike Air Jordan 1 Low x Dior "Grey".png': 26,
  'Nike Air Jordan 1 Mid "Chicago".png': 6,
  'Nike Air Jordan 1 Mid "Euro Tour".png': 6,
  'Nike Air Jordan 1 Retro High x Travis Scott.png': 2,
  'Nike Air Jordan 11 Retro High Space Jam.png': 29,
  'Nike Air Jordan 11 Retro Low Legend Blue.png': 30,
  'Nike Air Jordan 2 x J Balvin High.png': 31,
  'Nike Air Jordan 3 "Pure White".png': 33,
  'Nike Air Jordan 4 "Black Cat".png': 9,
  'Nike Air Jordan 4 Military Black.png': 12,
  'Nike Air Jordan 4 Paris Saint Germain.png': 33,
  'Nike Air Jordan 4 Retro "Black Canvas".png': 34,
  'Nike Air Jordan 4 Retro "Thunder".png': 35,
  'Nike Air Jordan 4 Retro Kaws "Grey".png': 10,
  'Nike Air Jordan 4 Retro Off-White Sail.png': 36,
  'Nike Air Jordan 4 Retro Red Thunder.png': 11,
  'Nike Air Jordan 4 Retro Travis Scott Cactus Jack.png': 8,
  'Nike Air Jordan 6 Travis Scott "British Khaki".png': 22,
  'Nike Dunk Low 5 Undefeated "On It".png': 38,
  'Nike Dunk Low Retro "Panda".png': 15,
  'Nike Dunk Low SB "Jarritos".png': 16,
  'Nike Dunk Low x Kasina \'Road Sign\'.png': 39,
  'Nike Dunk Winter Themed Low "Ice".png': 40,
  'Nike SB Dunk Low Strange Love Skateboards.png': 17,
  'Nike SB Dunk Low x Travis Scott.png': 13,
  'NOCTA x NK Air Force 1″Certified Lover Boy".png': 41
};

const productsFromSeedream = [];

seedreamFiles.forEach(imageName => {
  const productId = mapping[imageName];

  if (productId) {
    const product = data.products.find(p => p.id === productId);
    if (product) {
      productsFromSeedream.push({
        imageName,
        productId: product.id,
        productName: product.name,
        inBestsellers: bestsellerIds.includes(product.id)
      });
    }
  } else {
    console.log(`⚠ Sem mapeamento: ${imageName}`);
  }
});

// Remover duplicatas (por ID de produto)
const uniqueProducts = productsFromSeedream.filter((product, index, self) =>
  index === self.findIndex(p => p.productId === product.productId)
);

console.log('═'.repeat(80));
console.log('📊 PRODUTOS DA SEEDREAM');
console.log('═'.repeat(80));

const inBestsellers = uniqueProducts.filter(p => p.inBestsellers);
const notInBestsellers = uniqueProducts.filter(p => !p.inBestsellers);

console.log(`\n✅ JÁ ESTÃO NA SEÇÃO "MAIS VENDIDOS" (${inBestsellers.length} produtos):\n`);
inBestsellers.forEach(p => {
  console.log(`   ✓ ID ${p.productId}: ${p.productName}`);
});

console.log(`\n❌ NÃO ESTÃO NA SEÇÃO "MAIS VENDIDOS" (${notInBestsellers.length} produtos):\n`);
notInBestsellers.forEach(p => {
  console.log(`   ✗ ID ${p.productId}: ${p.productName}`);
});

// IDs dos produtos faltantes
const missingIds = notInBestsellers.map(p => p.productId);

console.log('\n' + '═'.repeat(80));
console.log('📋 LISTA COMPLETA PARA BESTSELLERS (COM PRODUTOS DA SEEDREAM):');
console.log('═'.repeat(80));

const allIds = [...new Set([...bestsellerIds, ...missingIds])].sort((a, b) => a - b);

console.log(`\nconst bestSellerIds = [${allIds.join(', ')}]`);
console.log(`\n📊 Total de produtos únicos da seedream: ${uniqueProducts.length}`);
console.log(`📊 Total com todos incluídos: ${allIds.length} produtos`);
