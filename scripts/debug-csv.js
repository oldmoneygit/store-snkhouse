const fs = require('fs');
const path = require('path');

const csvPath = path.join(__dirname, '../wc-product-export-20-10-2025-1760999879805.csv');
const content = fs.readFileSync(csvPath, 'utf8');
const lines = content.split('\n');

console.log('Total lines:', lines.length);
console.log('\nFirst 5 lines:\n');

for (let i = 0; i < Math.min(5, lines.length); i++) {
  console.log(`Line ${i}:`);
  console.log(lines[i]);
  console.log('---');
}

// Check header
console.log('\nHeaders (split by comma):');
const headers = lines[0].split(',');
console.log('Number of columns:', headers.length);
headers.forEach((h, i) => {
  console.log(`${i}: "${h}"`);
});
