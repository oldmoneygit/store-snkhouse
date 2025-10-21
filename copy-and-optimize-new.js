const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const backupDir = 'public/images/products-backup';
const productsDir = 'public/images/products';

// Buscar arquivos no backup que precisamos
const filesToCopy = [
  'Adidas Yeezy Boost 350 V2',
  'Neckface x Nike SB Dunk Low',
  'Nike Air Force 1 Low x Louis Vuitton x Off-White',
  'Nike Air Force 1 x Louis Vuitton Low',
  'Nike Air Force 1 x Travis Scott'
];

async function findAndOptimize() {
  console.log('🔍 Buscando e otimizando imagens...\n');

  const backupFiles = fs.readdirSync(backupDir);

  for (const searchTerm of filesToCopy) {
    // Encontrar arquivo no backup
    const file = backupFiles.find(f => f.includes(searchTerm) && f.endsWith('.jpg'));

    if (!file) {
      console.log(`❌ Não encontrado: ${searchTerm}`);
      continue;
    }

    const inputPath = path.join(backupDir, file);
    const outputPath = path.join(productsDir, file);

    try {
      const metadata = await sharp(inputPath).metadata();
      const sizeBefore = fs.statSync(inputPath).size;
      const sizeMB = (sizeBefore / (1024 * 1024)).toFixed(2);

      console.log(`📸 ${file}`);
      console.log(`   Original: ${sizeMB}MB (${metadata.width}x${metadata.height})`);

      // Otimizar e salvar
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

      console.log(`   ✅ Otimizado: ${sizeAfterMB}MB (redução de ${reduction}%)\n`);

    } catch (error) {
      console.error(`   ❌ Erro: ${error.message}\n`);
    }
  }

  console.log('✅ Processo concluído!');
}

findAndOptimize().catch(console.error);
