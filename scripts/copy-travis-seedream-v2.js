const fs = require('fs');
const path = require('path');

const seedreamDir = 'referencias/seedream';
const destDir = 'public/images/products';

// Read all files in seedream directory
const allFiles = fs.readdirSync(seedreamDir);

// Filter Travis Scott files
const travisFiles = allFiles.filter(file =>
  file.toLowerCase().includes('travis')
);

console.log('📸 Copiando imagens Travis Scott da pasta seedream...\n');

travisFiles.forEach(filename => {
  const sourcePath = path.join(seedreamDir, filename);

  // Create destination filename with "seedream-" prefix
  // Remove quotes and special characters
  const cleanName = filename
    .replace(/[""]/g, '')  // Remove curly quotes
    .replace(/['"]/g, '');  // Remove straight quotes

  const destFilename = 'seedream-' + cleanName;
  const destPath = path.join(destDir, destFilename);

  try {
    fs.copyFileSync(sourcePath, destPath);
    const stats = fs.statSync(destPath);
    const size = (stats.size / 1024).toFixed(1);
    console.log(`✅ ${filename}`);
    console.log(`   → ${destFilename} (${size}KB)\n`);
  } catch (err) {
    console.error(`❌ Erro ao copiar ${filename}:`, err.message);
  }
});

console.log('🎉 Todas as imagens Travis Scott seedream foram copiadas!');
