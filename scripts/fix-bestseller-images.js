const fs = require('fs');
const path = require('path');

// Ler products.json
const productsPath = 'data/products.json';
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// IDs dos bestsellers
const bestSellerIds = [26, 6, 27, 2, 29, 30, 31, 32, 9, 12, 33, 34, 35, 10, 36, 11, 8, 22, 38, 15, 16, 39, 40, 17, 13, 41];

// Função para verificar se arquivo existe
function findImageFile(productName, productsDir) {
  const extensions = ['.png', '.jpg', '.jpeg'];

  for (const ext of extensions) {
    const filePath = path.join(productsDir, productName + ext);
    if (fs.existsSync(filePath)) {
      return ext;
    }
  }
  return null;
}

const productsDir = 'public/images/products';

console.log('🔍 Verificando e atualizando imagens dos bestsellers...\n');

bestSellerIds.forEach(id => {
  const product = productsData.products.find(p => p.id === id);

  if (product) {
    const ext = findImageFile(product.name, productsDir);

    if (ext) {
      const newImage = `/images/products/${product.name}${ext}`;
      const oldImage = product.image;

      if (oldImage !== newImage) {
        product.image = newImage;
        console.log(`✓ ID ${id}: ${product.name}`);
        console.log(`  De: ${oldImage}`);
        console.log(`  Para: ${newImage}\n`);
      } else {
        console.log(`✓ ID ${id}: ${product.name} - já está correto\n`);
      }
    } else {
      console.log(`⚠ ID ${id}: ${product.name} - IMAGEM NÃO ENCONTRADA\n`);
    }
  }
});

// Salvar products.json atualizado
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8');

console.log('✅ Arquivo products.json atualizado com sucesso!');
