const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const inputDir = 'public/images/products';
const outputDir = 'public/images/products-optimized';

// Criar diretório de saída se não existir
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

async function optimizeImage(filePath, fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const baseName = path.basename(fileName, ext);

  try {
    // Ler metadados da imagem
    const metadata = await sharp(filePath).metadata();
    const sizeMB = (fs.statSync(filePath).size / (1024 * 1024)).toFixed(2);

    console.log(`\nProcessando: ${fileName}`);
    console.log(`  Tamanho original: ${sizeMB}MB`);
    console.log(`  Dimensões: ${metadata.width}x${metadata.height}`);

    // Configurações de otimização
    const maxWidth = 800; // Largura máxima para produtos
    const quality = 85;   // Qualidade de compressão

    let outputPath;

    if (ext === '.png') {
      // Converter PNG para JPG (muito mais leve para fotos de produtos)
      outputPath = path.join(outputDir, `${baseName}.jpg`);

      await sharp(filePath)
        .resize(maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputPath);
    } else if (ext === '.jpg' || ext === '.jpeg') {
      // Otimizar JPG
      outputPath = path.join(outputDir, fileName);

      await sharp(filePath)
        .resize(maxWidth, null, {
          fit: 'inside',
          withoutEnlargement: true
        })
        .jpeg({ quality, mozjpeg: true })
        .toFile(outputPath);
    } else {
      console.log(`  ⚠ Formato não suportado: ${ext}`);
      return;
    }

    const newSizeMB = (fs.statSync(outputPath).size / (1024 * 1024)).toFixed(2);
    const reduction = ((1 - newSizeMB / sizeMB) * 100).toFixed(1);

    console.log(`  ✓ Otimizado: ${newSizeMB}MB (redução de ${reduction}%)`);

  } catch (error) {
    console.error(`  ✗ Erro ao processar ${fileName}:`, error.message);
  }
}

async function optimizeAllImages() {
  console.log('🚀 Iniciando otimização de imagens...\n');

  const files = fs.readdirSync(inputDir);
  const imageFiles = files.filter(file =>
    /\.(png|jpg|jpeg)$/i.test(file)
  );

  console.log(`📁 Encontradas ${imageFiles.length} imagens para otimizar\n`);

  let totalOriginal = 0;
  let totalOptimized = 0;

  for (const file of imageFiles) {
    const filePath = path.join(inputDir, file);
    totalOriginal += fs.statSync(filePath).size;
    await optimizeImage(filePath, file);
  }

  // Calcular economia total
  const optimizedFiles = fs.readdirSync(outputDir);
  for (const file of optimizedFiles) {
    totalOptimized += fs.statSync(path.join(outputDir, file)).size;
  }

  const originalMB = (totalOriginal / (1024 * 1024)).toFixed(2);
  const optimizedMB = (totalOptimized / (1024 * 1024)).toFixed(2);
  const savedMB = (originalMB - optimizedMB).toFixed(2);
  const reductionPercent = ((1 - optimizedMB / originalMB) * 100).toFixed(1);

  console.log('\n' + '='.repeat(60));
  console.log('✅ Otimização concluída!');
  console.log('='.repeat(60));
  console.log(`📊 Tamanho original:  ${originalMB}MB`);
  console.log(`📊 Tamanho otimizado: ${optimizedMB}MB`);
  console.log(`💾 Economia:          ${savedMB}MB (${reductionPercent}%)`);
  console.log('='.repeat(60));
  console.log(`\n📁 Imagens otimizadas salvas em: ${outputDir}`);
  console.log('\n💡 Próximos passos:');
  console.log('   1. Verifique as imagens otimizadas');
  console.log('   2. Se estiverem OK, substitua as originais:');
  console.log('      - Faça backup da pasta original');
  console.log('      - Copie as imagens de products-optimized para products');
}

optimizeAllImages().catch(console.error);
