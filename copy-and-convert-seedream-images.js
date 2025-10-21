const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

async function copyAndConvert() {
  console.log('📸 Copiando e convertendo imagens seedream...\n');

  const imagesToProcess = [
    { base: 'Nike Air Jordan 1 Mid "Euro Tour"', ext: 'png' },
    { base: 'Nike Air Jordan 1 Low x Dior "Grey"', ext: 'png' },
    { base: 'Nike Air Jordan 1 High "Bred Banned (2016)"', ext: 'jpg' },
    { base: 'Nike Air Jordan 4 "Black Cat"', ext: 'png' },
    { base: 'Nike Air Jordan 4 Retro Kaws "Grey"', ext: 'png' },
    { base: 'Nike Air Jordan 4 Retro Red Thunder', ext: 'png' },
    { base: 'Nike Air Jordan 4 Military Black', ext: 'png' },
    { base: 'Nike Air Jordan 3 "Pure White"', ext: 'png' },
    { base: 'Nike Air Jordan 4 Retro "Black Canvas"', ext: 'png' },
    { base: 'Nike Air Jordan 4 Retro "Thunder"', ext: 'png' },
    { base: 'Nike Air Jordan 4 Retro Off-White Sail', ext: 'png' },
    { base: 'Neckface x Nike SB Dunk Low "Halloween"', ext: 'jpg' },
    { base: 'Nike Dunk Low Retro "Panda"', ext: 'png' },
    { base: 'Nike Dunk Low SB "Jarritos"', ext: 'png' },
    { base: 'Nike SB Dunk Low Strange Love Skateboards', ext: 'png' },
    { base: 'Nike Dunk Low 5 Undefeated "On It"', ext: 'png' },
    { base: 'Nike Dunk Low x Kasina \'Road Sign\'', ext: 'png' },
    { base: 'Nike Dunk Winter Themed Low "Ice"', ext: 'png' },
    { base: 'Adidas Yeezy Boost 350 V2 "Onyx"', ext: 'jpg' },
    { base: 'Adidas Yeezy Boost 350 V2 Static', ext: 'jpg' }
  ];

  const seedreamDir = 'referencias/seedream';
  const targetDir = 'public/images/products';

  let copied = 0;
  let converted = 0;
  let alreadyExists = 0;
  let notFound = 0;

  for (const img of imagesToProcess) {
    const sourcePath = path.join(seedreamDir, `${img.base}.${img.ext}`);
    const targetPath = path.join(targetDir, `seedream-${img.base}.jpg`);

    // Verificar se já existe
    if (fs.existsSync(targetPath)) {
      console.log(`✓ Já existe: seedream-${img.base}.jpg`);
      alreadyExists++;
      continue;
    }

    // Verificar se fonte existe
    if (!fs.existsSync(sourcePath)) {
      console.log(`⚠️  Não encontrado: ${img.base}.${img.ext}`);
      notFound++;
      continue;
    }

    try {
      // Se for PNG, converter para JPG
      if (img.ext === 'png') {
        await sharp(sourcePath)
          .jpeg({ quality: 90, mozjpeg: true })
          .toFile(targetPath);
        console.log(`✅ Convertido PNG→JPG: seedream-${img.base}.jpg`);
        converted++;
      } else {
        // Se já for JPG, apenas copiar
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`✅ Copiado: seedream-${img.base}.jpg`);
        copied++;
      }
    } catch (error) {
      console.log(`❌ Erro: ${img.base} - ${error.message}`);
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log(`\n📊 Resumo:`);
  console.log(`   ✅ Copiados (JPG): ${copied}`);
  console.log(`   🔄 Convertidos (PNG→JPG): ${converted}`);
  console.log(`   ✓ Já existiam: ${alreadyExists}`);
  console.log(`   ⚠️  Não encontrados: ${notFound}`);
  console.log(`   📁 Total processado: ${copied + converted + alreadyExists}/${imagesToProcess.length}`);
}

copyAndConvert();
