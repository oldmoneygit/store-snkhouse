const fs = require('fs');
const path = require('path');

const productsDir = 'public/images/products';

// Ler todos os arquivos no diretório
const files = fs.readdirSync(productsDir);

console.log('🔄 Normalizando aspas nos nomes dos arquivos...\n');

files.forEach(file => {
  // Substituir aspas curvas por aspas retas
  const normalized = file
    .replace(/\u201c/g, '"')  // left double quotation mark (U+201C) → straight quote
    .replace(/\u201d/g, '"')  // right double quotation mark (U+201D) → straight quote
    .replace(/\u2018/g, "'")  // left single quotation mark (U+2018) → straight apostrophe
    .replace(/\u2019/g, "'")  // right single quotation mark (U+2019) → straight apostrophe
    .replace(/″/g, '"');      // double prime (U+2033) → straight quote

  if (file !== normalized) {
    const oldPath = path.join(productsDir, file);
    const newPath = path.join(productsDir, normalized);

    // Verificar se o arquivo de destino já existe
    if (!fs.existsSync(newPath)) {
      fs.renameSync(oldPath, newPath);
      console.log(`✓ Renomeado:`);
      console.log(`  De: ${file}`);
      console.log(`  Para: ${normalized}\n`);
    } else {
      console.log(`⚠ Destino já existe, removendo duplicata:`);
      console.log(`  Removendo: ${file}\n`);
      fs.unlinkSync(oldPath);
    }
  }
});

console.log('✅ Normalização concluída!');
