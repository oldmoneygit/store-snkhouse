const data = require('./data/products.json');

const bestsellerIds = [26, 6, 27, 2, 29, 30, 31, 32, 9, 12, 33, 34, 35, 10, 36, 11, 8, 22, 38, 15, 16, 39, 40, 17, 13, 41];
const allBestsellers = data.products.filter(p => p.bestSeller === true);
const notInList = allBestsellers.filter(p => !bestsellerIds.includes(p.id));

console.log('📊 RESUMO DOS BESTSELLERS\n');
console.log('✓ Sendo exibidos na seção:', bestsellerIds.length, 'produtos');
console.log('✓ Marcados como bestseller no JSON:', allBestsellers.length, 'produtos');

if (notInList.length > 0) {
  console.log('\n❌ Produtos bestseller NÃO sendo exibidos (' + notInList.length + '):');
  notInList.forEach(p => {
    console.log(`   ID ${p.id}: ${p.name}`);
  });
} else {
  console.log('\n✅ Todos os produtos bestseller estão sendo exibidos!');
}

// Verificar se há produtos na lista que não são bestsellers
const inListButNotBestseller = bestsellerIds.filter(id => {
  const product = data.products.find(p => p.id === id);
  return product && !product.bestSeller;
});

if (inListButNotBestseller.length > 0) {
  console.log('\n⚠ Produtos na lista que NÃO são bestsellers (' + inListButNotBestseller.length + '):');
  inListButNotBestseller.forEach(id => {
    const p = data.products.find(x => x.id === id);
    console.log(`   ID ${id}: ${p.name}`);
  });
}
