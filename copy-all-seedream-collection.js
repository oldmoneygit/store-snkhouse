const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function copyAll() {
  console.log('📸 Procurando e copiando TODAS as imagens seedream disponíveis...\n');

  const productNames = [
    'Nike Air Jordan 1 Mid "Euro Tour"',
    'Nike Air Jordan 1 Low x Dior "Grey"',
    'Nike Air Jordan 1 High "Bred Banned (2016)"',
    'Nike Air Jordan 4 "Black Cat"',
    'Nike Air Jordan 4 Retro Kaws "Grey"',
    'Nike Air Jordan 4 Retro Red Thunder',
    'Nike Air Jordan 4 Military Black',
    'Nike Air Jordan 3 "Pure White"',
    'Nike Air Jordan 4 Retro "Black Canvas"',
    'Nike Air Jordan 4 Retro "Thunder"',
    'Nike Air Jordan 4 Retro Off-White Sail',
    'Neckface x Nike SB Dunk Low "Halloween"',
    'Nike Dunk Low Retro "Panda"',
    'Nike Dunk Low SB "Jarritos"',
    'Nike SB Dunk Low Strange Love Skateboards',
    'Nike Dunk Low 5 Undefeated "On It"',
    'Nike Dunk Low x Kasina \'Road Sign\'',
    'Nike Dunk Winter Themed Low "Ice"',
    'Adidas Yeezy Boost 350 V2 "Onyx"',
    'Adidas Yeezy Boost 350 V2 Static'
  ];

  const seedreamDir = 'referencias/seedream';
  const targetDir = 'public/images/products';

  let processed = 0;
  let alreadyExists = 0;
  let notFound = 0;

  for (const name of productNames) {
    const targetPath = path.join(targetDir, `seedream-${name}.jpg`);

    // Check if already exists
    if (fs.existsSync(targetPath)) {
      console.log(`✓ Já existe: seedream-${name}.jpg`);
      alreadyExists++;
      continue;
    }

    // Try both .jpg and .png
    let sourcePath = null;
    let sourceExt = null;

    if (fs.existsSync(path.join(seedreamDir, `${name}.jpg`))) {
      sourcePath = path.join(seedreamDir, `${name}.jpg`);
      sourceExt = 'jpg';
    } else if (fs.existsSync(path.join(seedreamDir, `${name}.png`))) {
      sourcePath = path.join(seedreamDir, `${name}.png`);
      sourceExt = 'png';
    }

    if (!sourcePath) {
      console.log(`⚠️  Não encontrado: ${name} (.jpg ou .png)`);
      notFound++;
      continue;
    }

    try {
      if (sourceExt === 'png') {
        await sharp(sourcePath)
          .jpeg({ quality: 90, mozjpeg: true })
          .toFile(targetPath);
        console.log(`✅ Convertido PNG→JPG: seedream-${name}.jpg`);
      } else {
        await sharp(sourcePath)
          .jpeg({ quality: 90, mozjpeg: true })
          .toFile(targetPath);
        console.log(`✅ Processado: seedream-${name}.jpg`);
      }
      processed++;
    } catch (error) {
      console.log(`❌ Erro: ${name} - ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Processadas: ${processed}`);
  console.log(`   ✓ Já existiam: ${alreadyExists}`);
  console.log(`   ⚠️  Não encontradas: ${notFound}`);
  console.log(`   📁 Total: ${processed + alreadyExists}/${productNames.length}`);
}

copyAll();
