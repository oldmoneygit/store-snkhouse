const fs = require('fs');
const path = require('path');

// Mapeamento de imagens para copiar da pasta seedream
const imagesToCopy = [
  'Nike Air Jordan 1 Low x Dior "Grey".png',
  'Nike Air Jordan 1 Mid "Euro Tour".png',
  'Nike Air Jordan 1 High "Bred Banned (2016)".jpg',
  'Nike Air Jordan 1 Retro High x Travis Scott.png',
  'Nike Air Jordan 1 Mid "Chicago".png',
  'Nike Air Jordan 11 Retro High Space Jam.png',
  'Nike Air Jordan 11 Retro Low Legend Blue.png',
  'Nike Air Jordan 2 x J Balvin High.png',
  'Nike Air Jordan 3 "Pure White".png',
  'Nike Air Jordan 4 "Black Cat".png',
  'Nike Air Jordan 4 Military Black.png',
  'Nike Air Jordan 4 Paris Saint Germain.png',
  'Nike Air Jordan 4 Retro "Black Canvas".png',
  'Nike Air Jordan 4 Retro "Thunder".png',
  'Nike Air Jordan 4 Retro Kaws "Grey".png',
  'Nike Air Jordan 4 Retro Off-White Sail.png',
  'Nike Air Jordan 4 Retro Red Thunder.png',
  'Nike Air Jordan 4 Retro Travis Scott Cactus Jack.png',
  'Nike Air Jordan 6 Travis Scott "British Khaki".png',
  'Nike Dunk Low 5 Undefeated "On It".png',
  'Nike Dunk Low Retro "Panda".png',
  'Nike Dunk Low SB "Jarritos".png',
  'Nike Dunk Low x Kasina \'Road Sign\'.png',
  'Nike Dunk Winter Themed Low "Ice".png',
  'Nike SB Dunk Low Strange Love Skateboards.png',
  'Nike SB Dunk Low x Travis Scott.png',
  'NOCTA x NK Air Force 1″Certified Lover Boy".png',
  'Adidas Yeezy Boost 350 V2 "Onyx".jpg',
  'Adidas Yeezy Boost 350 V2 Static.jpg',
  'Nike Air Force 1 x Travis Scott "White".jpg',
  'Neckface x Nike SB Dunk Low "Halloween".jpg',
  'Nike Air Force 1 Low x Louis Vuitton x Off-White "Triple White".jpg',
  'Nike Air Force 1 x Louis Vuitton Low "By Virgil Abloh Black".jpg'
];

const sourcePath = 'referencias/seedream';
const destPath = 'public/images/products';

// Copiar imagens
imagesToCopy.forEach(image => {
  const source = path.join(sourcePath, image);
  const dest = path.join(destPath, image);

  if (fs.existsSync(source)) {
    fs.copyFileSync(source, dest);
    console.log(`✓ Copiado: ${image}`);
  } else {
    console.log(`✗ Não encontrado: ${image}`);
  }
});

console.log('\n✅ Cópia de imagens concluída!');

// Atualizar products.json
const productsPath = 'data/products.json';
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Mapear extensões corretas para cada produto
const imageExtensions = {
  26: '.png', // Nike Air Jordan 1 Low x Dior "Grey"
  6: '.png',  // Nike Air Jordan 1 Mid "Euro Tour"
  27: '.jpg', // Nike Air Jordan 1 High "Bred Banned (2016)"
  2: '.png',  // Nike Air Jordan 1 Retro High x Travis Scott
  29: '.png', // Nike Air Jordan 11 Retro High Space Jam
  30: '.png', // Nike Air Jordan 11 Retro Low Legend Blue
  31: '.png', // Nike Air Jordan 2 x J Balvin High
  32: '.png', // Nike Air Jordan 3 "Pure White"
  9: '.png',  // Nike Air Jordan 4 "Black Cat"
  12: '.png', // Nike Air Jordan 4 Military Black
  33: '.png', // Nike Air Jordan 4 Paris Saint Germain
  34: '.png', // Nike Air Jordan 4 Retro "Black Canvas"
  35: '.png', // Nike Air Jordan 4 Retro "Thunder"
  10: '.png', // Nike Air Jordan 4 Retro Kaws "Grey"
  36: '.png', // Nike Air Jordan 4 Retro Off-White Sail
  11: '.png', // Nike Air Jordan 4 Retro Red Thunder
  8: '.png',  // Nike Air Jordan 4 Retro Travis Scott Cactus Jack
  22: '.png', // Nike Air Jordan 6 Travis Scott "British Khaki"
  38: '.png', // Nike Dunk Low 5 Undefeated "On It"
  15: '.png', // Nike Dunk Low Retro "Panda"
  16: '.png', // Nike Dunk Low SB "Jarritos"
  39: '.png', // Nike Dunk Low x Kasina 'Road Sign'
  40: '.png', // Nike Dunk Winter Themed Low "Ice"
  17: '.png', // Nike SB Dunk Low Strange Love Skateboards
  13: '.png', // Nike SB Dunk Low x Travis Scott
  41: '.png'  // NOCTA x NK Air Force 1 Certified Lover Boy
};

// Atualizar imagens dos produtos
productsData.products.forEach(product => {
  if (imageExtensions[product.id]) {
    const ext = imageExtensions[product.id];
    const newImage = `/images/products/${product.name}${ext}`;
    product.image = newImage;
    console.log(`✓ Atualizado produto ID ${product.id}: ${product.name}`);
  }
});

// Salvar products.json atualizado
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8');
console.log('\n✅ Arquivo products.json atualizado!');
