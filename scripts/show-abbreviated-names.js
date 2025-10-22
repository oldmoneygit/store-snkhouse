const fs = require('fs')
const path = require('path')

const productsPath = path.join(__dirname, '../data/products.json')
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'))

function abbreviateBrandNames(productName) {
  let abbreviated = productName

  const brandReplacements = {
    'Nike Air Jordan': 'AJ',
    'Air Jordan': 'AJ',
    'Nike': 'NK',
    'Adidas': 'AD',
    'Yeezy': 'YZY',
    'Jordan': 'JD',
    'Travis Scott': 'TS',
    'Air Force': 'AF',
    'Dunk Low': 'DK Low',
    'Dunk': 'DK',
    'Retro': 'RT',
    'Boost': 'BST',
  }

  Object.entries(brandReplacements).forEach(([original, abbrev]) => {
    const regex = new RegExp(original, 'gi')
    abbreviated = abbreviated.replace(regex, abbrev)
  })

  abbreviated = abbreviated.replace(/\s+/g, ' ').trim()

  return abbreviated
}

console.log('\n🔤 Exemplos de Nomes Abreviados:\n')

const examples = productsData.products.slice(0, 15)

examples.forEach((product) => {
  const original = product.name
  const abbreviated = abbreviateBrandNames(original)

  if (original !== abbreviated) {
    console.log(`ANTES: ${original}`)
    console.log(`AGORA: ${abbreviated}`)
    console.log('')
  }
})
