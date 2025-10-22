const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function smartCopy() {
  console.log('📸 Listando e copiando imagens seedream inteligentemente...\n');

  const seedreamDir = 'referencias/seedream';
  const targetDir = 'public/images/products';

  // Ler TODOS os arquivos que realmente existem na pasta seedream
  const allFiles = fs.readdirSync(seedreamDir);

  // Filtrar apenas Jordan, Dunk e Yeezy
  const relevantFiles = allFiles.filter(f =>
    (f.includes('Jordan') || f.includes('Dunk') || f.includes('Yeezy')) &&
    (f.endsWith('.jpg') || f.endsWith('.png'))
  );

  console.log(`Found ${relevantFiles.length} relevant files in seedream folder:\n`);

  let processed = 0;
  let skipped = 0;

  for (const filename of relevantFiles) {
    // Nome sem extensão
    const baseName = path.parse(filename).name;
    const ext = path.parse(filename).ext;

    const sourcePath = path.join(seedreamDir, filename);
    const targetPath = path.join(targetDir, `seedream-${baseName}.jpg`);

    // Verificar se já existe
    if (fs.existsSync(targetPath)) {
      console.log(`✓ Skip (exists): seedream-${baseName}.jpg`);
      skipped++;
      continue;
    }

    try {
      // Sempre converter/otimizar para JPG
      await sharp(sourcePath)
        .jpeg({ quality: 90, mozjpeg: true })
        .toFile(targetPath);

      const stats = fs.statSync(targetPath);
      const size = (stats.size / 1024).toFixed(1);

      console.log(`✅ ${ext === '.png' ? 'PNG→JPG' : 'Copied'}: seedream-${baseName}.jpg (${size}KB)`);
      processed++;
    } catch (error) {
      console.log(`❌ Error: ${filename} - ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Processadas: ${processed}`);
  console.log(`   ✓ Já existiam: ${skipped}`);
  console.log(`   📁 Total: ${processed + skipped}/${relevantFiles.length}`);
}

smartCopy();
