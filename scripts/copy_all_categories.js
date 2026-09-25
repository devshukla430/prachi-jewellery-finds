const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'categories');
const testDir = path.join(__dirname, '..', 'public', 'test_imgs');

const mapping = [
  { from: 'earrings.jpg', to: 'earrings.jpg' },
  { from: 'rings.jpg', to: 'rings.jpg' },
  { from: 'cand_1535632066927.jpg', to: 'jewellery-sets.jpg' },
  { from: 'cand_1549465220.jpg', to: 'gift-ideas.jpg' }
];

for (const m of mapping) {
  const src = path.join(testDir, m.from);
  const dest = path.join(targetDir, m.to);
  if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log(`Copied ${m.from} -> ${m.to}`);
  }
}
