const fs = require('fs');

// Ler products.json
const productsPath = 'data/products.json';
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

console.log('🔧 Atualizando referências das imagens dos 6 novos produtos...\n');

// Mapeamento: ID → nome do arquivo com aspas curvas corretas
const updates = [
  {
    id: 18,
    image: '/images/products/Adidas Yeezy Boost 350 V2 \u201cOnyx\u201d.jpg'
  },
  {
    id: 19,
    image: '/images/products/Adidas Yeezy Boost 350 V2 Static.jpg'
  },
  {
    id: 14,
    image: '/images/products/Neckface x Nike SB Dunk Low \u201cHalloween\u201d.jpg'
  },
  {
    id: 21,
    image: '/images/products/Nike Air Force 1 Low x Louis Vuitton x Off-White \u201cTriple White\u201d.jpg'
  },
  {
    id: 23,
    image: '/images/products/Nike Air Force 1 x Louis Vuitton Low \u201cBy Virgil Abloh Black\u201d.jpg'
  },
  {
    id: 20,
    image: '/images/products/Nike Air Force 1 x Travis Scott \u201cWhite\u201d.jpg'
  }
];

updates.forEach(update => {
  const product = productsData.products.find(p => p.id === update.id);

  if (product) {
    const oldImage = product.image;
    product.image = update.image;

    console.log(`✓ ID ${update.id}: ${product.name}`);
    console.log(`  De: ${oldImage}`);
    console.log(`  Para: ${update.image}`);

    // Verificar se arquivo existe
    const imagePath = 'public' + update.image;
    if (fs.existsSync(imagePath)) {
      const stats = fs.statSync(imagePath);
      console.log(`  ✅ Arquivo encontrado (${(stats.size / 1024).toFixed(1)}KB)\n`);
    } else {
      console.log(`  ❌ Arquivo NÃO encontrado!\n`);
    }
  }
});

// Salvar products.json
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8');

console.log('✅ Arquivo products.json atualizado!');
