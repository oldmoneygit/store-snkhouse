const fs = require('fs');
const path = require('path');

// Função para calcular similaridade entre strings (Levenshtein Distance)
function stringSimilarity(str1, str2) {
  str1 = str1.toLowerCase().trim();
  str2 = str2.toLowerCase().trim();

  if (str1 === str2) return 1.0;

  const len1 = str1.length;
  const len2 = str2.length;

  if (len1 === 0 || len2 === 0) return 0.0;

  const matrix = [];

  for (let i = 0; i <= len2; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= len1; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= len2; i++) {
    for (let j = 1; j <= len1; j++) {
      const cost = str2.charAt(i - 1) === str1.charAt(j - 1) ? 0 : 1;
      matrix[i][j] = Math.min(
        matrix[i - 1][j] + 1,
        matrix[i][j - 1] + 1,
        matrix[i - 1][j - 1] + cost
      );
    }
  }

  const maxLen = Math.max(len1, len2);
  return (maxLen - matrix[len2][len1]) / maxLen;
}

// Função para normalizar nomes de produtos
function normalizeName(name) {
  return name
    .toLowerCase()
    .replace(/['"''""]/g, '') // Remove aspas
    .replace(/\s+/g, ' ') // Normaliza espaços
    .trim();
}

// Função para criar slug a partir do nome
function createSlug(name) {
  return name
    .toLowerCase()
    .normalize('NFD') // Normaliza caracteres Unicode
    .replace(/[\u0300-\u036f]/g, '') // Remove acentos
    .replace(/["''""]/g, '') // Remove aspas
    .replace(/[\/&]/g, ' ') // Substitui barras e ampersands por espaços (evita palavras grudadas)
    .replace(/[^\w\s-]/g, '') // Remove caracteres especiais exceto palavras, espaços e hífens
    .replace(/\s+/g, '-') // Substitui espaços por hífens
    .replace(/-+/g, '-') // Remove múltiplos hífens consecutivos
    .replace(/^-+|-+$/g, '') // Remove hífens do início e fim
    .trim();
}

// Função para encontrar melhor match
function findBestMatch(localProduct, wcProducts) {
  let bestMatch = null;
  let bestScore = 0;

  const localName = normalizeName(localProduct.name);

  for (const wcProduct of wcProducts) {
    const wcName = normalizeName(wcProduct.Nombre);

    // Calcula similaridade direta
    const directScore = stringSimilarity(localName, wcName);

    // Verifica se um nome contém o outro (boost de score)
    const containsScore = localName.includes(wcName) || wcName.includes(localName) ? 0.2 : 0;

    // Verifica palavras-chave importantes (modelo, marca, etc)
    const keywords = ['jordan', 'dunk', 'yeezy', 'air force', 'travis scott', 'dior', 'kaws', 'off-white'];
    let keywordMatchBonus = 0;

    for (const keyword of keywords) {
      if (localName.includes(keyword) && wcName.includes(keyword)) {
        keywordMatchBonus += 0.1;
      }
    }

    const totalScore = directScore + containsScore + keywordMatchBonus;

    if (totalScore > bestScore) {
      bestScore = totalScore;
      bestMatch = wcProduct;
    }
  }

  return { match: bestMatch, confidence: bestScore };
}

// Parse CSV line by line
function parseCSV(csvPath) {
  let content = fs.readFileSync(csvPath, 'utf8');

  // Remove BOM se existir
  if (content.charCodeAt(0) === 0xFEFF) {
    content = content.substring(1);
  }

  const lines = content.split('\n').filter(line => line.trim());

  // Primeira linha não vazia é o header
  const headerLine = lines.find(line => line.includes('Nombre'));
  if (!headerLine) {
    throw new Error('Header line with "Nombre" not found');
  }

  const headerIndex = lines.indexOf(headerLine);
  const headers = parseCSVLine(headerLine);

  const products = [];

  for (let i = headerIndex + 1; i < lines.length; i++) {
    if (!lines[i].trim()) continue;

    const values = parseCSVLine(lines[i]);

    const product = {};
    headers.forEach((header, index) => {
      product[header] = values[index] || '';
    });

    // Só adiciona produtos publicados com nome
    if (product.Nombre && product.Nombre.trim()) {
      products.push(product);
    }
  }

  return products;
}

// Função para parsear linha CSV corretamente
function parseCSVLine(line) {
  const values = [];
  let current = '';
  let inQuotes = false;

  for (let i = 0; i < line.length; i++) {
    const char = line[i];

    if (char === '"') {
      if (inQuotes && line[i + 1] === '"') {
        // Aspas duplas dentro de campo quoted
        current += '"';
        i++;
      } else {
        // Toggle quote mode
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      values.push(current);
      current = '';
    } else {
      current += char;
    }
  }

  values.push(current);
  return values.map(v => v.trim());
}

async function mapProducts() {
  console.log('🔄 Iniciando mapeamento inteligente de produtos...\n');

  try {
    // Carrega CSV do WooCommerce
    const csvPath = path.join(__dirname, '../wc-product-export-20-10-2025-1760999879805.csv');
    console.log('📄 Lendo CSV do WooCommerce...');
    const wcProducts = parseCSV(csvPath);
    console.log(`✅ ${wcProducts.length} produtos encontrados no CSV\n`);

    // Carrega products.json atual
    const productsJsonPath = path.join(__dirname, '../data/products.json');
    const currentData = JSON.parse(fs.readFileSync(productsJsonPath, 'utf8'));

    const results = {
      matched: [],
      lowConfidence: [],
      notMatched: []
    };

    console.log('🔍 Buscando matches...\n');

    const updatedProducts = currentData.products.map(localProduct => {
      const { match, confidence } = findBestMatch(localProduct, wcProducts);

      if (!match) {
        console.log(`❌ SEM MATCH: "${localProduct.name}"`);
        results.notMatched.push({ name: localProduct.name });
        return localProduct;
      }

      // Confiança alta (>=0.6) = match automático
      if (confidence >= 0.6) {
        // Pega o preço de oferta como preço principal e o preço normal como regularPrice
        const salePrice = parseFloat(match['Precio de oferta']) || 0;
        const regularPrice = parseFloat(match['Precio normal']) || 0;

        console.log(`✅ MATCH (${(confidence * 100).toFixed(0)}%): "${localProduct.name}" → "${match.Nombre}"`);
        if (salePrice > 0) {
          console.log(`   Preço: ${salePrice.toFixed(2)} ARS (oferta) | Regular: ${regularPrice.toFixed(2)} ARS`);
        } else {
          console.log(`   Preço: ${regularPrice.toFixed(2)} ARS`);
        }
        console.log(`   SKU: ${match.SKU}\n`);

        results.matched.push({
          local: localProduct.name,
          woocommerce: match.Nombre,
          confidence: confidence
        });

        // Constrói slug baseado no nome do produto (formato WooCommerce)
        const slug = createSlug(match.Nombre);
        const permalink = `https://www.snkhouse.com/product/${slug}/`;

        return {
          ...localProduct,
          price: salePrice > 0 ? salePrice : regularPrice, // Usa sale price se existir, senão regular
          regularPrice: regularPrice > 0 ? regularPrice : undefined, // Preço riscado
          currency: 'ARS',
          slug: slug,
          permalink: permalink,
          stock: match.Stock === 'instock' ? 'available' :
                 match.Stock === 'outofstock' ? 'soldout' : 'limited',
          woocommerceId: match.ID
        };
      }
      // Confiança média (0.4-0.6) = revisar manualmente
      else if (confidence >= 0.4) {
        console.log(`⚠️  BAIXA CONFIANÇA (${(confidence * 100).toFixed(0)}%): "${localProduct.name}" → "${match.Nombre}"`);
        console.log(`   Revisar manualmente!\n`);

        results.lowConfidence.push({
          local: localProduct.name,
          woocommerce: match.Nombre,
          confidence: confidence
        });

        return localProduct;
      }
      // Confiança muito baixa (<0.4) = sem match
      else {
        console.log(`❌ SEM MATCH CONFIÁVEL: "${localProduct.name}" (melhor: "${match.Nombre}" - ${(confidence * 100).toFixed(0)}%)`);
        results.notMatched.push({ name: localProduct.name });
        return localProduct;
      }
    });

    // Salva arquivo atualizado
    const updatedData = {
      ...currentData,
      products: updatedProducts
    };

    fs.writeFileSync(
      productsJsonPath,
      JSON.stringify(updatedData, null, 2),
      'utf8'
    );

    // Gera relatório
    console.log('\n' + '='.repeat(60));
    console.log('📊 RELATÓRIO DE MAPEAMENTO');
    console.log('='.repeat(60));
    console.log(`✅ Matches automáticos: ${results.matched.length}`);
    console.log(`⚠️  Baixa confiança (revisar): ${results.lowConfidence.length}`);
    console.log(`❌ Sem match: ${results.notMatched.length}`);
    console.log('='.repeat(60));

    // Salva relatório detalhado
    const reportPath = path.join(__dirname, '../mapping-report.json');
    fs.writeFileSync(
      reportPath,
      JSON.stringify(results, null, 2),
      'utf8'
    );

    console.log(`\n📝 Relatório detalhado salvo em: ${reportPath}`);
    console.log(`✅ Arquivo atualizado: ${productsJsonPath}`);

    if (results.lowConfidence.length > 0) {
      console.log('\n⚠️  ATENÇÃO: Alguns produtos precisam de revisão manual!');
      console.log('Verifique o arquivo mapping-report.json para detalhes.');
    }

  } catch (error) {
    console.error('❌ Erro no mapeamento:', error.message);
    console.error(error.stack);
  }
}

mapProducts();
