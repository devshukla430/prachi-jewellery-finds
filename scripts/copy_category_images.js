const fs = require('fs');
const path = require('path');

const targetDir = path.join(__dirname, '..', 'public', 'categories');
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });

const necklaceSrc = 'C:\\Users\\Harsh\\.gemini\\antigravity-ide\\brain\\c6d21c2b-3f68-43ef-a715-61a3d538bf6b\\luxury_gold_necklace_1789809350604.jpg';
const braceletSrc = 'C:\\Users\\Harsh\\.gemini\\antigravity-ide\\brain\\c6d21c2b-3f68-43ef-a715-61a3d538bf6b\\luxury_gold_bracelet_1789809333086.jpg';

fs.copyFileSync(necklaceSrc, path.join(targetDir, 'necklace.jpg'));
fs.copyFileSync(braceletSrc, path.join(targetDir, 'bracelet.jpg'));

console.log('Successfully copied necklace.jpg and bracelet.jpg to public/categories/');
