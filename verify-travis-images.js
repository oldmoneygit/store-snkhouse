const data = require('./data/products.json');
const fs = require('fs');

const travis = data.products.filter(p => p.category === 'travis-scott');

console.log('📸 Verificando', travis.length, 'imagens Travis Scott:\n');

let allFound = true;
travis.forEach((p, i) => {
  const imagePath = 'public' + p.image;
  const exists = fs.existsSync(imagePath);
  const status = exists ? '✅' : '❌';

  if (!exists) allFound = false;

  const size = exists ? (fs.statSync(imagePath).size / 1024).toFixed(1) + 'KB' : 'N/A';

  console.log(status + ' ' + (i+1) + '. ' + p.name);
  console.log('   ' + p.image.split('/').pop() + ' (' + size + ')\n');
});

console.log(allFound ? '🎉 Todas as imagens encontradas!' : '⚠️ Algumas imagens faltando');
