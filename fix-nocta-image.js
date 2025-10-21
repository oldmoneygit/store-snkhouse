const fs = require('fs');
const path = require('path');

const productsDir = 'public/images/products';

// Listar todos os arquivos NOCTA
const files = fs.readdirSync(productsDir);
const noctaFiles = files.filter(f => f.includes('NOCTA'));

console.log('Arquivos NOCTA encontrados:\n');
noctaFiles.forEach(f => {
  const filePath = path.join(productsDir, f);
  const stats = fs.statSync(filePath);
  console.log(`📁 ${f}`);
  console.log(`   Tamanho: ${(stats.size / 1024).toFixed(1)}KB`);
  console.log(`   Bytes do nome: ${[...f].map(c => c.charCodeAt(0).toString(16)).join(',')}`);
  console.log('');
});

// O arquivo da seedream é o maior (72KB)
const seedreamFile = noctaFiles.find(f => {
  const stats = fs.statSync(path.join(productsDir, f));
  return stats.size > 50000; // > 50KB
});

if (seedreamFile) {
  console.log(`✓ Imagem da seedream identificada: ${seedreamFile}`);
  console.log(`  Tamanho: ${(fs.statSync(path.join(productsDir, seedreamFile)).size / 1024).toFixed(1)}KB`);

  // Nome esperado pelo products.json: NOCTA x NK Air Force 1"Certified Lover Boy".jpg
  // com aspas curvas U+201D e U+201C
  const expectedName = 'NOCTA x NK Air Force 1\u201dCertified Lover Boy\u201c.jpg';

  const sourcePath = path.join(productsDir, seedreamFile);
  const destPath = path.join(productsDir, expectedName);

  // Copiar arquivo
  fs.copyFileSync(sourcePath, destPath);
  console.log(`\n✅ Arquivo copiado com sucesso!`);
  console.log(`   Para: ${expectedName}`);

  // Verificar
  if (fs.existsSync(destPath)) {
    const size = fs.statSync(destPath).size;
    console.log(`   Tamanho: ${(size / 1024).toFixed(1)}KB`);
    console.log('\n✅ Imagem NOCTA corrigida com sucesso!');
  }
} else {
  console.log('❌ Arquivo da seedream não encontrado');
}
