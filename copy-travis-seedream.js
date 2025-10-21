const fs = require('fs');
const path = require('path');

// Travis Scott seedream images to copy
const travisImages = [
  {
    source: 'referencias/seedream/Nike Air Force 1 x Travis Scott "White".jpg',
    dest: 'public/images/products/seedream-Nike Air Force 1 x Travis Scott White.jpg'
  },
  {
    source: 'referencias/seedream/Nike Air Jordan 1 Retro High x Travis Scott.png',
    dest: 'public/images/products/seedream-Nike Air Jordan 1 Retro High x Travis Scott.png'
  },
  {
    source: 'referencias/seedream/Nike Air Jordan 4 Retro Travis Scott Cactus Jack.png',
    dest: 'public/images/products/seedream-Nike Air Jordan 4 Retro Travis Scott Cactus Jack.png'
  },
  {
    source: 'referencias/seedream/Nike Air Jordan 6 Travis Scott "British Khaki".png',
    dest: 'public/images/products/seedream-Nike Air Jordan 6 Travis Scott British Khaki.png'
  },
  {
    source: 'referencias/seedream/Nike SB Dunk Low x Travis Scott.png',
    dest: 'public/images/products/seedream-Nike SB Dunk Low x Travis Scott.png'
  }
];

console.log('📸 Copiando imagens Travis Scott da pasta seedream...\n');

travisImages.forEach(img => {
  try {
    if (fs.existsSync(img.source)) {
      fs.copyFileSync(img.source, img.dest);
      const stats = fs.statSync(img.dest);
      const size = (stats.size / 1024).toFixed(1);
      console.log(`✅ Copiado: ${path.basename(img.dest)} (${size}KB)`);
    } else {
      console.log(`❌ Não encontrado: ${img.source}`);
    }
  } catch (err) {
    console.error(`❌ Erro ao copiar ${img.source}:`, err.message);
  }
});

console.log('\n🎉 Imagens seedream copiadas com sucesso!');
