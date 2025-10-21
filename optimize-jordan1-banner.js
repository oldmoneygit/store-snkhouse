const sharp = require('sharp');
const fs = require('fs');

async function optimize() {
  const inputPath = 'public/images/banners/air-jordan-1-banner.png';
  const outputPath = 'public/images/banners/air-jordan-1-banner.webp';

  const inputStats = fs.statSync(inputPath);
  const inputSize = (inputStats.size / 1024).toFixed(1);

  console.log('🔧 Otimizando banner Air Jordan 1...\n');

  await sharp(inputPath)
    .webp({ quality: 90 })
    .toFile(outputPath);

  const outputStats = fs.statSync(outputPath);
  const outputSize = (outputStats.size / 1024).toFixed(1);
  const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

  console.log(`✅ air-jordan-1-banner.png`);
  console.log(`   ${inputSize}KB → ${outputSize}KB (redução de ${reduction}%)`);
  console.log(`\n🗑️  Removendo PNG original...`);

  fs.unlinkSync(inputPath);

  console.log('✅ Otimização concluída!');
}

optimize();
