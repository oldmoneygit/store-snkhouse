const fs = require('fs');
const path = require('path');

const dir = './public/images/bestsellers';

fs.readdir(dir, (err, files) => {
  if (err) {
    console.error('Error reading directory:', err);
    return;
  }

  files.forEach(file => {
    if (file.endsWith('.png')) {
      const newName = file
        .replace(/"/g, '')
        .replace(/"/g, '')
        .replace(/'/g, '')
        .replace(/'/g, '');

      if (file !== newName) {
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, newName);

        fs.rename(oldPath, newPath, (err) => {
          if (err) {
            console.error(`Error renaming ${file}:`, err);
          } else {
            console.log(`Renamed: ${file} -> ${newName}`);
          }
        });
      }
    }
  });
});
