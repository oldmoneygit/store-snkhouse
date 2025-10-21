const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const productsDir = 'public/images/products';

// Imagens dos 6 novos produtos que precisam ser otimizadas
const imagesToOptimize = [
  'Adidas Yeezy Boost 350 V2 "Onyx".jpg',
  'Adidas Yeezy Boost 350 V2 Static.jpg',
  'Neckface x Nike SB Dunk Low "Halloween".jpg',
  'Nike Air Force 1 Low x Louis Vuitton x Off-White "Triple White".jpg',
  'Nike Air Force 1 x Louis Vuitton Low "By Virgil Abloh Black".jpg',
  'Nike Air Force 1 x Travis Scott "White".jpg'
];

async function optimizeImage(fileName) {
  const inputPath = path.join(productsDir, fileName);
  const tempPath = path.join(productsDir, `temp_${fileName}`);

  try {
    const metadata = await sharp(inputPath).metadata();
    const sizeBefore = fs.statSync(inputPath).size;
    const sizeMB = (sizeBefore / (1024 * 1024)).toFixed(2);

    console.log(`\n🔄 Processando: ${fileName}`);
    console.log(`   Tamanho atual: ${sizeMB}MB`);
    console.log(`   Dimensões: ${metadata.width}x${metadata.height}`);

    // Otimizar
    await sharp(inputPath)
      .resize(800, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(tempPath);

    const sizeAfter = fs.statSync(tempPath).size;
    const sizeAfterMB = (sizeAfter / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - sizeAfter / sizeBefore) * 100).toFixed(1);

    // Substituir arquivo original
    fs.renameSync(tempPath, inputPath);

    console.log(`   ✅ Otimizado: ${sizeAfterMB}MB (redução de ${reduction}%)`);

  } catch (error) {
    console.error(`   ❌ Erro ao processar ${fileName}:`, error.message);
    // Limpar arquivo temp se existir
    if (fs.existsSync(tempPath)) {
      fs.unlinkSync(tempPath);
    }
  }
}

async function optimizeAll() {
  console.log('🚀 Otimizando 6 novos produtos...\n');

  for (const image of imagesToOptimize) {
    await optimizeImage(image);
  }

  console.log('\n✅ Otimização concluída!');
}

optimizeAll().catch(console.error);
