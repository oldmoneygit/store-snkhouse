const fs = require('fs');
const path = require('path');

// Read the current products.json
const productsPath = './data/products.json';
const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));

// Mapping of existing products to their new original images
const updateExistingProducts = [
  { id: 2, image: '/images/products/26087-Nike-Air-Jordan-1-Retro-High-x-Travis-Scott.jpg' },
  { id: 3, image: '/images/products/25983-Nike-Air-Jordan-1-Low-Travis-Scott-Reverse-Mocha.jpg' },
  { id: 4, image: '/images/products/25982-Nike-Air-Jordan-1-Low-Travis-Scott-Olive.jpg' },
  { id: 8, image: '/images/products/26155-Nike-Air-Jordan-4-Retro-Travis-Scott-Cactus-Jack.jpg' },
  { id: 13, image: '/images/products/26414-Nike-SB-Dunk-Low-x-Travis-Scott.jpg' },
  { id: 20, image: '/images/products/25896-Nike-Air-Force-1-x-Travis-Scott-White.jpg' },
  { id: 22, image: '/images/products/26184-Nike-Air-Jordan-6-Travis-Scott-British-Khaki.jpg' },
  { id: 25, image: '/images/products/25981-Nike-Air-Jordan-1-Low-Travis-Scott.jpg' }
];

// Update existing products
updateExistingProducts.forEach(update => {
  const product = productsData.products.find(p => p.id === update.id);
  if (product) {
    product.image = update.image;
    console.log(`✅ Atualizado ID ${update.id}: ${product.name}`);
  }
});

// Get the highest ID to start from
const maxId = Math.max(...productsData.products.map(p => p.id));
let nextId = maxId + 1;

// New Travis Scott products to add
const newProducts = [
  {
    name: 'Nike Air Force 1 X Travis Scott Cactus Jack',
    slug: 'nike-air-force-1-x-travis-scott-cactus-jack',
    price: 1100,
    image: '/images/products/25897-Nike-Air-Force-1-X-Travis-Scott-Cactus-jack.jpg',
    category: 'travis-scott',
    tags: ['air-force-1', 'travis-scott', 'cactus-jack']
  },
  {
    name: 'Nike Air Jordan 1 High Travis Scott Reverse',
    slug: 'nike-air-jordan-1-high-travis-scott-reverse',
    price: 1400,
    image: '/images/products/25920-Nike-Air-Jordan-1-High-Travis-Scott-Reverse.jpg',
    category: 'travis-scott',
    tags: ['jordan-1', 'travis-scott', 'high']
  },
  {
    name: 'Nike Air Jordan 1 High Travis Scott x Fragment',
    slug: 'nike-air-jordan-1-high-travis-scott-x-fragment',
    price: 2200,
    image: '/images/products/25921-Nike-Air-Jordan-1-High-Travis-Scott-x-Fragment.jpg',
    category: 'travis-scott',
    tags: ['jordan-1', 'travis-scott', 'fragment', 'high']
  },
  {
    name: 'Nike Air Jordan 1 Low Travis Scott x Fragment',
    slug: 'nike-air-jordan-1-low-travis-scott-x-fragment',
    price: 1800,
    image: '/images/products/25984-Nike-Air-Jordan-1-Low-Travis-Scott-x-Fragment.jpg',
    category: 'travis-scott',
    tags: ['jordan-1', 'travis-scott', 'fragment', 'low']
  },
  {
    name: 'Nike Air Jordan 1 Low Travis Scott x Fragment Red',
    slug: 'nike-air-jordan-1-low-travis-scott-x-fragment-red',
    price: 1850,
    image: '/images/products/25985-Nike-Air-Jordan-1-Low-Travis-Scott-x-Fragment-Red.jpg',
    category: 'travis-scott',
    tags: ['jordan-1', 'travis-scott', 'fragment', 'low', 'red']
  },
  {
    name: 'Nike Air Jordan 1 Low Travis Scott x Fragment White/Blue',
    slug: 'nike-air-jordan-1-low-travis-scott-x-fragment-white-blue',
    price: 1750,
    image: '/images/products/25986-Nike-Air-Jordan-1-Low-Travis-Scott-x-Fragment-WhiteBlue.jpg',
    category: 'travis-scott',
    tags: ['jordan-1', 'travis-scott', 'fragment', 'low']
  },
  {
    name: 'Nike Air Jordan 6 Travis Scott Medium Olive',
    slug: 'nike-air-jordan-6-travis-scott-medium-olive',
    price: 1350,
    image: '/images/products/26185-Nike-Air-Jordan-6-Travis-Scott-Medium-Olive.jpg',
    category: 'travis-scott',
    tags: ['jordan-6', 'travis-scott', 'olive']
  },
  {
    name: 'Nike Air Jordan X Travis Scott Jumpman Jack University Red',
    slug: 'nike-air-jordan-x-travis-scott-jumpman-jack-university-red',
    price: 1550,
    image: '/images/products/26188-Nike-Air-Jordan-X-Travis-Scott-Jumpman-Jack-University-Red.jpg',
    category: 'travis-scott',
    tags: ['jordan', 'travis-scott', 'jumpman-jack', 'red']
  },
  {
    name: 'Nike Air Jordan X Travis Scott Jumpman Jack',
    slug: 'nike-air-jordan-x-travis-scott-jumpman-jack',
    price: 1500,
    image: '/images/products/26189-Nike-Air-Jordan-X-Travis-Scott-Jumpman-Jack.jpg',
    category: 'travis-scott',
    tags: ['jordan', 'travis-scott', 'jumpman-jack']
  },
  {
    name: 'Nike Air Max 1 x Travis Scott Cactus Jack',
    slug: 'nike-air-max-1-x-travis-scott-cactus-jack',
    price: 1300,
    image: '/images/products/26190-Nike-Air-Max-1-x-Travis-Scott-Cactus-Jack.jpg',
    category: 'travis-scott',
    tags: ['air-max-1', 'travis-scott', 'cactus-jack']
  },
  {
    name: 'Nike Dunk Low Travis Scott x Playstation',
    slug: 'nike-dunk-low-travis-scott-x-playstation',
    price: 1650,
    image: '/images/products/26255-Nike-Dunk-Low-Travis-Scott-x-Playstation.jpg',
    category: 'travis-scott',
    tags: ['dunk-low', 'travis-scott', 'playstation', 'collaboration']
  }
];

// Add new products
newProducts.forEach(newProduct => {
  const product = {
    id: nextId++,
    ...newProduct,
    currency: 'USD',
    featured: false,
    bestSeller: false,
    stock: 'available'
  };

  productsData.products.push(product);
  console.log(`✅ Adicionado ID ${product.id}: ${product.name}`);
});

// Save updated products.json
fs.writeFileSync(productsPath, JSON.stringify(productsData, null, 2), 'utf8');

console.log('\n🎉 Products.json atualizado com sucesso!');
console.log(`📊 Total de produtos Travis Scott: ${productsData.products.filter(p => p.category === 'travis-scott').length}`);
