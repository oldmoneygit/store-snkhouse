const fs = require('fs');
const path = require('path');

const productsDir = 'public/images/products';

// Mapeamento de arquivos com aspas tipográficas para aspas retas
const renameMap = [
  // Nike Air Jordan 1
  { from: 'Nike Air Jordan 1 Low x Dior "Grey".png', to: 'Nike Air Jordan 1 Low x Dior "Grey".png' },
  { from: 'Nike Air Jordan 1 Mid "Euro Tour".png', to: 'Nike Air Jordan 1 Mid "Euro Tour".png' },
  { from: 'Nike Air Jordan 1 Mid "Chicago".png', to: 'Nike Air Jordan 1 Mid "Chicago".png' },
  { from: 'Nike Air Jordan 1 High "Bred Banned (2016)".jpg', to: 'Nike Air Jordan 1 High "Bred Banned (2016)".jpg' },

  // Nike Air Jordan 3
  { from: 'Nike Air Jordan 3 "Pure White".png', to: 'Nike Air Jordan 3 "Pure White".png' },

  // Nike Air Jordan 4
  { from: 'Nike Air Jordan 4 "Black Cat".png', to: 'Nike Air Jordan 4 "Black Cat".png' },
  { from: 'Nike Air Jordan 4 Retro "Black Canvas".png', to: 'Nike Air Jordan 4 Retro "Black Canvas".png' },
  { from: 'Nike Air Jordan 4 Retro "Thunder".png', to: 'Nike Air Jordan 4 Retro "Thunder".png' },
  { from: 'Nike Air Jordan 4 Retro Kaws "Grey".png', to: 'Nike Air Jordan 4 Retro Kaws "Grey".png' },

  // Nike Air Jordan 6
  { from: 'Nike Air Jordan 6 Travis Scott "British Khaki".png', to: 'Nike Air Jordan 6 Travis Scott "British Khaki".png' },

  // Nike Dunk
  { from: 'Nike Dunk Low 5 Undefeated "On It".png', to: 'Nike Dunk Low 5 Undefeated "On It".png' },
  { from: 'Nike Dunk Low Retro "Panda".png', to: 'Nike Dunk Low Retro "Panda".png' },
  { from: 'Nike Dunk Low SB "Jarritos".png', to: 'Nike Dunk Low SB "Jarritos".png' },
  { from: 'Nike Dunk Winter Themed Low "Ice".png', to: 'Nike Dunk Winter Themed Low "Ice".png' },

  // Yeezy
  { from: 'Adidas Yeezy Boost 350 V2 "Onyx".jpg', to: 'Adidas Yeezy Boost 350 V2 "Onyx".jpg' },

  // Nike Air Force 1
  { from: 'Nike Air Force 1 x Travis Scott "White".jpg', to: 'Nike Air Force 1 x Travis Scott "White".jpg' },
  { from: 'Nike Air Force 1 Low x Louis Vuitton x Off-White "Triple White".jpg', to: 'Nike Air Force 1 Low x Louis Vuitton x Off-White "Triple White".jpg' },
  { from: 'Nike Air Force 1 x Louis Vuitton Low "By Virgil Abloh Black".jpg', to: 'Nike Air Force 1 x Louis Vuitton Low "By Virgil Abloh Black".jpg' },

  // Neckface
  { from: 'Neckface x Nike SB Dunk Low "Halloween".jpg', to: 'Neckface x Nike SB Dunk Low "Halloween".jpg' },

  // NOCTA
  { from: 'NOCTA x NK Air Force 1″Certified Lover Boy".png', to: 'NOCTA x NK Air Force 1 Certified Lover Boy.jpg' }
];

console.log('🔄 Renomeando arquivos para usar aspas corretas...\n');

renameMap.forEach(({ from, to }) => {
  const fromPath = path.join(productsDir, from);
  const toPath = path.join(productsDir, to);

  if (fs.existsSync(fromPath)) {
    if (fromPath !== toPath) {
      fs.renameSync(fromPath, toPath);
      console.log(`✓ Renomeado: ${from} → ${to}`);
    } else {
      console.log(`✓ Já correto: ${to}`);
    }
  } else {
    console.log(`✗ Não encontrado: ${from}`);
  }
});

console.log('\n✅ Renomeação concluída!');
