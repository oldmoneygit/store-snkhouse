const fs = require('fs');
const path = require('path');

console.log('📸 Copiando imagens seedream para versões duplicadas...\n');

const mapping = require('./id-mapping-collections.json');

// Lista de imagens que precisam de versão seedream
const imagesToCopy = [
  'Nike Air Jordan 1 Mid "Euro Tour".jpg',
  'Nike Air Jordan 1 Low x Dior "Grey".jpg',
  'Nike Air Jordan 1 High "Bred Banned (2016)".jpg',
  'Nike Air Jordan 4 "Black Cat".jpg',
  'Nike Air Jordan 4 Retro Kaws "Grey".jpg',
  'Nike Air Jordan 4 Retro Red Thunder.jpg',
  'Nike Air Jordan 4 Military Black.jpg',
  'Nike Air Jordan 3 "Pure White".jpg',
  'Nike Air Jordan 4 Retro "Black Canvas".jpg',
  'Nike Air Jordan 4 Retro "Thunder".jpg',
  'Nike Air Jordan 4 Retro Off-White Sail.jpg',
  'Neckface x Nike SB Dunk Low "Halloween".jpg',
  'Nike Dunk Low Retro "Panda".jpg',
  'Nike Dunk Low SB "Jarritos".jpg',
  'Nike SB Dunk Low Strange Love Skateboards.jpg',
  'Nike Dunk Low 5 Undefeated "On It".jpg',
  'Nike Dunk Low x Kasina \'Road Sign\'.jpg',
  'Nike Dunk Winter Themed Low "Ice".jpg',
  'Adidas Yeezy Boost 350 V2 "Onyx".jpg',
  'Adidas Yeezy Boost 350 V2 Static.jpg'
];

const seedreamDir = 'referencias/seedream';
const targetDir = 'public/images/products';

let copied = 0;
let alreadyExists = 0;

imagesToCopy.forEach(imageName => {
  const sourcePath = path.join(seedreamDir, imageName);
  const targetPath = path.join(targetDir, `seedream-${imageName}`);

  if (!fs.existsSync(sourcePath)) {
    console.log(`⚠️  Fonte não encontrada: ${imageName}`);
    return;
  }

  if (fs.existsSync(targetPath)) {
    console.log(`✓ Já existe: seedream-${imageName}`);
    alreadyExists++;
    return;
  }

  try {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`✅ Copiado: seedream-${imageName}`);
    copied++;
  } catch (error) {
    console.log(`❌ Erro ao copiar ${imageName}: ${error.message}`);
  }
});

console.log('\n' + '='.repeat(60));
console.log(`\n📊 Resumo:`);
console.log(`   ✅ Copiadas: ${copied}`);
console.log(`   ✓ Já existiam: ${alreadyExists}`);
console.log(`   📁 Total: ${copied + alreadyExists}/${imagesToCopy.length}`);
