const sharp = require('sharp');
const fs = require('fs');

async function optimize() {
  const inputPath = 'public/images/banners/dunk-low-banner.png';
  const outputPath = 'public/images/banners/dunk-low-banner.webp';

  const inputStats = fs.statSync(inputPath);
  const inputSize = (inputStats.size / 1024).toFixed(1);

  console.log('🔧 Otimizando banner Nike Dunk Low...\n');

  await sharp(inputPath)
    .webp({ quality: 90 })
    .toFile(outputPath);

  const outputStats = fs.statSync(outputPath);
  const outputSize = (outputStats.size / 1024).toFixed(1);
  const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

  console.log(`✅ dunk-low-banner.png`);
  console.log(`   ${inputSize}KB → ${outputSize}KB (redução de ${reduction}%)`);
  console.log(`\n🗑️  Removendo PNG original...`);

  fs.unlinkSync(inputPath);

  console.log('✅ Otimização concluída!');
}

optimize();
