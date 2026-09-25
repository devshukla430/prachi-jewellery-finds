const fs = require('fs');
const path = require('path');

const candidates = [
  { name: 'earrings', url: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=300&q=80' },
  { name: 'rings', url: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=300&q=80' },
  { name: 'necklace', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80' },
  { name: 'bracelet_curr', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=300&q=80' },
  { name: 'cand_1602751584552', url: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=300&q=80' },
  { name: 'cand_1598560917505', url: 'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=300&q=80' },
  { name: 'cand_1535632066927', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80' },
  { name: 'cand_1549465220', url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=300&q=80' }
];

async function download() {
  const dir = path.join(__dirname, '..', 'public', 'test_imgs');
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

  for (const c of candidates) {
    try {
      const res = await fetch(c.url);
      if (res.ok) {
        const buffer = Buffer.from(await res.arrayBuffer());
        fs.writeFileSync(path.join(dir, `${c.name}.jpg`), buffer);
        console.log(`Saved ${c.name}, size: ${buffer.length}`);
      } else {
        console.log(`Failed ${c.name}: ${res.status}`);
      }
    } catch (e) {
      console.log(`Error ${c.name}: ${e.message}`);
    }
  }
}
download();
