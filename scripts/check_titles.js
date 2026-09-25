const ids = [
  'photo-1602751584552-8ba73aad10e1',
  'photo-1598560917505-59a3ad559071',
  'photo-1600003014755-ba31aa59c4b6',
  'photo-1506630448388-4e683c67ddb0',
  'photo-1573408301185-9146fe634ad0',
  'photo-1599643478518-a784e5dc4c8f'
];

async function check() {
  for (const id of ids) {
    try {
      const code = id.replace('photo-', '');
      const res = await fetch(`https://unsplash.com/photos/${code}`);
      const text = await res.text();
      const match = text.match(/<title>(.*?)<\/title>/);
      console.log(id, match ? match[1].slice(0, 70) : 'no title');
    } catch (e) {
      console.log(id, 'ERR', e.message);
    }
  }
}
check();
