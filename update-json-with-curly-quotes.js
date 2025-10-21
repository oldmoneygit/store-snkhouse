const fs = require('fs');
const path = require('path');

// Ler products.json
const productsPath = 'data/products.json';
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Lista os produtos dos bestsellers
const bestSellerIds = [26, 6, 27, 2, 29, 30, 31, 32, 9, 12, 33, 34, 35, 10, 36, 11, 8, 22, 38, 15, 16, 39, 40, 17, 13, 41];

// Função para converter aspas retas para aspas curvas
function convertToCurlyQuotes(str) {
  return str
    .replace(/"/g, '\u201c') // Replace opening quotes
    .replace(/"/g, '\u201d') // This will replace all, but we'll fix it
    .replace(/\u201c([^\u201c]*)\u201c/g, '\u201c$1\u201d'); // Fix to have proper opening and closing
}

// Simplificar: apenas substituir todas as aspas por curvas
function toCurly(str) {
  // Replace all straight quotes with curly quotes
  // For simplicity, use left quote at start and right quote at end
  return str.replace(/"([^"]*)"/g, (match, p1) => `\u201c${p1}\u201d`);
}

const productsDir = 'public/images/products';

console.log('\uD83D\uDD04 Atualizando products.json para usar aspas curvas...\n');

bestSellerIds.forEach(id => {
  const product = productsData.products.find(p => p.id === id);

  if (product) {
    // Converter o nome do produto para usar aspas curvas
    const nameWithCurlyQuotes = toCurly(product.name);

    // Tentar encontrar o arquivo com aspas curvas
    const extensions = ['.png', '.jpg', '.jpeg'];
    let found = false;

    for (const ext of extensions) {
      const filePath = path.join(productsDir, nameWithCurlyQuotes + ext);

      if (fs.existsSync(filePath)) {
        const newImage = `/images/products/${nameWithCurlyQuotes}${ext}`;

        if (product.image !== newImage) {
          console.log(`\u2713 ID ${id}: ${product.name}`);
          console.log(`  De: ${product.image}`);
          console.log(`  Para: ${newImage}\n`);
          product.image = newImage;
        } else {
          console.log(`\u2713 ID ${id}: ${product.name} - j\u00E1 correto\n`);
        }

        found = true;
        break;
      }
    }

    if (!found) {
      console.log(`\u26A0 ID ${id}: ${product.name} - IMAGEM N\u00C3O ENCONTRADA\n`);
    }
  }
});

// Salvar products.json atualizado
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8');

console.log('\u2705 Arquivo products.json atualizado com sucesso!');
