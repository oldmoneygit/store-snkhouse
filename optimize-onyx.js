const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const backupDir = 'public/images/products-backup';
const productsDir = 'public/images/products';

async function optimizeOnyx() {
  const backupFiles = fs.readdirSync(backupDir);
  const file = backupFiles.find(f => f.includes('Onyx') && f.endsWith('.jpg'));

  if (!file) {
    console.log('❌ Arquivo Onyx não encontrado no backup');
    return;
  }

  const inputPath = path.join(backupDir, file);
  const outputPath = path.join(productsDir, file);

  console.log('📸 Otimizando:', file);

  const metadata = await sharp(inputPath).metadata();
  const sizeBefore = fs.statSync(inputPath).size;
  const sizeMB = (sizeBefore / (1024 * 1024)).toFixed(2);

  console.log(`   Original: ${sizeMB}MB (${metadata.width}x${metadata.height})`);

  await sharp(inputPath)
    .resize(800, null, {
      fit: 'inside',
      withoutEnlargement: true
    })
    .jpeg({ quality: 85, mozjpeg: true })
    .toFile(outputPath);

  const sizeAfter = fs.statSync(outputPath).size;
  const sizeAfterMB = (sizeAfter / (1024 * 1024)).toFixed(2);
  const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

  console.log(`   ✅ Otimizado: ${sizeAfterMB}MB (redução de ${reduction}%)`);
}

optimizeOnyx().catch(console.error);
