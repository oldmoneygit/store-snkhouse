const data = require('./data/products.json');

// IDs atuais na seção bestsellers
const currentBestsellers = [26, 6, 27, 2, 29, 30, 31, 32, 9, 12, 33, 34, 35, 10, 36, 11, 8, 22, 38, 15, 16, 39, 40, 17, 13, 41];

// IDs dos produtos que têm imagens na pasta seedream (mapeamento manual)
const seedreamProductIds = [
  18,  // Adidas Yeezy Boost 350 V2 "Onyx"
  19,  // Adidas Yeezy Boost 350 V2 Static
  14,  // Neckface x Nike SB Dunk Low "Halloween"
  21,  // Nike Air Force 1 Low x Louis Vuitton x Off-White "Triple White"
  23,  // Nike Air Force 1 x Louis Vuitton Low "By Virgil Abloh Black"
  20,  // Nike Air Force 1 x Travis Scott "White"
  27,  // Nike Air Jordan 1 High "Bred Banned (2016)"
  26,  // Nike Air Jordan 1 Low x Dior "Grey"
  6,   // Nike Air Jordan 1 Mid "Euro Tour" / "Chicago"
  2,   // Nike Air Jordan 1 Retro High x Travis Scott
  29,  // Nike Air Jordan 11 Retro High Space Jam
  30,  // Nike Air Jordan 11 Retro Low Legend Blue
  31,  // Nike Air Jordan 2 x J Balvin High
  33,  // Nike Air Jordan 3 "Pure White" (confundido com Paris Saint Germain)
  9,   // Nike Air Jordan 4 "Black Cat"
  12,  // Nike Air Jordan 4 Military Black
  34,  // Nike Air Jordan 4 Retro "Black Canvas"
  35,  // Nike Air Jordan 4 Retro "Thunder"
  10,  // Nike Air Jordan 4 Retro Kaws "Grey"
  36,  // Nike Air Jordan 4 Retro Off-White Sail
  11,  // Nike Air Jordan 4 Retro Red Thunder
  8,   // Nike Air Jordan 4 Retro Travis Scott Cactus Jack
  22,  // Nike Air Jordan 6 Travis Scott "British Khaki"
  38,  // Nike Dunk Low 5 Undefeated "On It"
  15,  // Nike Dunk Low Retro "Panda"
  16,  // Nike Dunk Low SB "Jarritos"
  39,  // Nike Dunk Low x Kasina 'Road Sign'
  40,  // Nike Dunk Winter Themed Low "Ice"
  17,  // Nike SB Dunk Low Strange Love Skateboards
  13,  // Nike SB Dunk Low x Travis Scott
  41   // NOCTA x NK Air Force 1 Certified Lover Boy
];

// Remover duplicatas
const uniqueSeedreamIds = [...new Set(seedreamProductIds)];

// Encontrar os que faltam
const missing = uniqueSeedreamIds.filter(id => !currentBestsellers.includes(id));

console.log('═'.repeat(80));
console.log('📊 ANÁLISE DOS PRODUTOS SEEDREAM');
console.log('═'.repeat(80));

console.log(`\n📁 Total de produtos com imagens na seedream: ${uniqueSeedreamIds.length}`);
console.log(`✅ Já estão na seção bestsellers: ${currentBestsellers.length}`);
console.log(`❌ Faltam adicionar: ${missing.length}`);

if (missing.length > 0) {
  console.log('\n' + '═'.repeat(80));
  console.log('❌ PRODUTOS DA SEEDREAM QUE FALTAM NA SEÇÃO:');
  console.log('═'.repeat(80));
  console.log('');

  missing.forEach(id => {
    const p = data.products.find(x => x.id === id);
    console.log(`   ID ${id}: ${p.name}`);
  });

  console.log('\n' + '═'.repeat(80));
  console.log('📋 NOVA LISTA COMPLETA (26 + ' + missing.length + ' = ' + (currentBestsellers.length + missing.length) + ' produtos):');
  console.log('═'.repeat(80));

  const newList = [...currentBestsellers, ...missing].sort((a, b) => a - b);
  console.log(`\nconst bestSellerIds = [${newList.join(', ')}]`);
} else {
  console.log('\n✅ Todos os produtos da seedream já estão na seção bestsellers!');
}
