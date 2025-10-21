const sharp = require('sharp');
const fs = require('fs');

async function optimize() {
  const input = 'public/images/banners/need-help-banner.png';
  const output = 'public/images/banners/need-help-banner.webp';

  const inputStats = fs.statSync(input);
  const inputSize = (inputStats.size / 1024).toFixed(1);

  console.log('🔧 Otimizando banner de ajuda...\n');

  await sharp(input)
    .webp({ quality: 90 })
    .toFile(output);

  const outputStats = fs.statSync(output);
  const outputSize = (outputStats.size / 1024).toFixed(1);
  const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

  console.log('✅ need-help-banner.png');
  console.log('   ' + inputSize + 'KB → ' + outputSize + 'KB (redução de ' + reduction + '%)');

  fs.unlinkSync(input);
  console.log('\n✅ Otimização concluída!');
}

optimize();
