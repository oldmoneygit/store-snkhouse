const fs = require('fs');
const path = require('path');

const sourceDir = './referencias/seedream';
const targetDir = './public/images/bestsellers';

fs.readdir(sourceDir, (err, files) => {
  if (err) {
    console.error('Error reading source directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.png')) {
      // Remove all types of quotes
      const newName = file
        .replace(/"/g, '')  // Left double quotation mark
        .replace(/"/g, '')  // Right double quotation mark
        .replace(/'/g, '')  // Left single quotation mark
        .replace(/'/g, '')  // Right single quotation mark
        .replace(/"/g, '')  // Regular double quote
        .replace(/'/g, ''); // Regular single quote

      const sourcePath = path.join(sourceDir, file);
      const targetPath = path.join(targetDir, newName);

      fs.copyFile(sourcePath, targetPath, (err) => {
        if (err) {
          console.error(`Error copying ${file}:`, err);
        } else {
          console.log(`Copied: ${file} -> ${newName}`);
        }
      });
    }
  });
});
