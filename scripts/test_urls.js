const urls = [
  { name: 'necklace', url: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80' },
  { name: 'bracelet_1', url: 'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=300&q=80' },
  { name: 'bracelet_2', url: 'https://images.unsplash.com/photo-1611591475825-f72674e2d3df?auto=format&fit=crop&w=300&q=80' },
  { name: 'bracelet_3', url: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=300&q=80' }
];

async function check() {
  for (const item of urls) {
    try {
      const res = await fetch(item.url, { method: 'HEAD' });
      console.log(item.name, res.status);
    } catch (e) {
      console.log(item.name, 'ERR:', e.message);
    }
  }
}
check();
