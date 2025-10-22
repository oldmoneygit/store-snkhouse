const data = require('./data/products.json');

// Lista de produtos solicitados
const requestedProducts = [
  'Nike Air Jordan 4 "Black Cat"',
  'Adidas Yeezy Boost 350 V2 Static',
  'Neckface x Nike SB Dunk Low "Halloween"',
  'Nike Air Jordan 4 Military Black',
  'Nike Air Jordan 1 Retro High x Travis Scott',
  'Nike Air Jordan 4 Retro Off-White Sail',
  'Nike Air Jordan 4 Retro Kaws "Grey"',
  'Nike Dunk Low SB "Jarritos"',
  'Nike Dunk Low x Kasina \'Road Sign\'',
  'Nike Dunk Winter Themed Low "Ice"',
  'Nike SB Dunk Low Strange Love Skateboards',
  'Nike SB Dunk Low x Travis Scott',
  'NOCTA x NK Air Force 1 Certified Lover Boy'
];

console.log('🔍 Buscando IDs dos produtos solicitados:\n');

const foundProducts = [];

requestedProducts.forEach(searchName => {
  // Normalizar nome para comparação
  const normalized = searchName
    .replace(/"/g, '"')
    .replace(/"/g, '"')
    .replace(/'/g, "'")
    .replace(/'/g, "'")
    .toLowerCase();

  const product = data.products.find(p => {
    const productName = p.name
      .replace(/"/g, '"')
      .replace(/"/g, '"')
      .replace(/'/g, "'")
      .replace(/'/g, "'")
      .toLowerCase();

    return productName.includes(normalized) || normalized.includes(productName);
  });

  if (product) {
    foundProducts.push({
      id: product.id,
      name: product.name,
      image: product.image
    });
    console.log(`✓ ID ${product.id}: ${product.name}`);
  } else {
    console.log(`✗ NÃO ENCONTRADO: ${searchName}`);
  }
});

console.log('\n' + '═'.repeat(80));
console.log('📋 ARRAY DE IDs PARA O COMPONENTE:');
console.log('═'.repeat(80));

const ids = foundProducts.map(p => p.id);
console.log(`\nconst featuredIds = [${ids.join(', ')}]`);
console.log(`\nTotal: ${ids.length} produtos`);
