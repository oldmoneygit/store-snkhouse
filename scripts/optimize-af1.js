const sharp = require('sharp');
const fs = require('fs');

async function optimize() {
  const files = fs.readdirSync('public/images/products');
  const af1File = files.find(f => f.includes('seedream') && f.includes('Air Force') && f.includes('Travis'));

  if (!af1File) {
    console.log('❌ Arquivo não encontrado');
    return;
  }

  const inputPath = `public/images/products/${af1File}`;
  const tempPath = `public/images/products/temp-af1-optimized.jpg`;

  const inputStats = fs.statSync(inputPath);
  const inputSize = (inputStats.size / 1024).toFixed(1);

  await sharp(inputPath)
    .resize(800, null, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(tempPath);

  // Replace original with optimized
  fs.unlinkSync(inputPath);
  fs.renameSync(tempPath, inputPath);

  const outputStats = fs.statSync(inputPath);
  const outputSize = (outputStats.size / 1024).toFixed(1);
  const reduction = ((1 - outputStats.size / inputStats.size) * 100).toFixed(1);

  console.log(`✅ ${af1File}`);
  console.log(`   ${inputSize}KB → ${outputSize}KB (redução de ${reduction}%)`);
}

optimize();
