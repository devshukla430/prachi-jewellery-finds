const testCandidates = [
  'photo-1602751584552-8ba73aad10e1',
  'photo-1598560917505-59a3ad559071',
  'photo-1600003014755-ba31aa59c4b6',
  'photo-1506630448388-4e683c67ddb0',
  'photo-1535632066927-ab7c9ab60908',
  'photo-1611591475825-f72674e2d3df',
  'photo-1573408301185-9146fe634ad0',
  'photo-1599643478518-a784e5dc4c8f'
];

async function run() {
  for (const id of testCandidates) {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=300&q=80`;
    try {
      const res = await fetch(url, { method: 'HEAD' });
      console.log(id, res.status);
    } catch (e) {
      console.log(id, 'ERR');
    }
  }
}
run();
