const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images/products';

// Find all seedream Travis Scott images
const allFiles = fs.readdirSync(inputDir);
const seedreamTravisFiles = allFiles.filter(file =>
  file.startsWith('seedream-') && file.toLowerCase().includes('travis')
);

console.log('🔧 Otimizando imagens Travis Scott seedream...\n');

async function optimizeImages() {
  for (const filename of seedreamTravisFiles) {
    const inputPath = path.join(inputDir, filename);

    // Change extension to .jpg
    const outputFilename = filename.replace(/\.(png|jpg|jpeg)$/i, '.jpg');
    const outputPath = path.join(inputDir, outputFilename);

    try {
      const inputStats = fs.statSync(inputPath);
      const inputSize = (inputStats.size / 1024).toFixed(1);

      await sharp(inputPath)
        .resize(800, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality: 85, mozjpeg: true })
        .toFile(outputPath);

      const outputStats = fs.statSync(outputPath);
      const outputSize = (outputStats.size / 1024).toFixed(1);
      const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

      console.log(`✅ ${filename}`);
      console.log(`   ${inputSize}KB → ${outputSize}KB (redução de ${reduction}%)`);

      // Remove original PNG if we created a new JPG
      if (filename !== outputFilename) {
        fs.unlinkSync(inputPath);
        console.log(`   🗑️  Removido: ${filename}\n`);
      } else {
        console.log('');
      }
    } catch (err) {
      console.error(`❌ Erro ao otimizar ${filename}:`, err.message);
    }
  }

  console.log('🎉 Otimização concluída!');
}

optimizeImages();
