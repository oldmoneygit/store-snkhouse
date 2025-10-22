const fs = require('fs');
const path = require('path');

const dir = './public/images/products';

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.jpg')) {
      // Remove all types of special quotes and replace with nothing
      const newName = file
        .replace(/[""]/g, '')  // Remove left and right double quotation marks
        .replace(/['']/g, '')  // Remove left and right single quotation marks
        .replace(/"/g, '')     // Remove regular double quotes
        .replace(/'/g, '');    // Remove regular single quotes

      if (file !== newName) {
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, newName);

        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(`Error renaming ${file}:`, err.message);
          } else {
            console.log(`✓ ${file} -> ${newName}`);
          }
        });
      }
    }
  });
});
