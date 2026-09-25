export function extractFirstName(name?: string, email?: string): string {
  // 1. Check if we have a real Google profile or registered user name saved in localStorage
  if (typeof window !== 'undefined' && email) {
    try {
      const cleanEm = email.trim().toLowerCase();
      const storedGoogleProfiles = JSON.parse(localStorage.getItem('prachi_google_profiles') || '{}');
      if (storedGoogleProfiles[cleanEm]?.firstName) {
        const fn = storedGoogleProfiles[cleanEm].firstName.trim();
        return fn.charAt(0).toUpperCase() + fn.slice(1).toLowerCase();
      }
      if (storedGoogleProfiles[cleanEm]?.name) {
        const first = storedGoogleProfiles[cleanEm].name.trim().split(' ')[0];
        return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
      }

      const storedDb = JSON.parse(localStorage.getItem('prachi_users_db') || '{}');
      if (storedDb[cleanEm]?.name && storedDb[cleanEm].name !== cleanEm.split('@')[0]) {
        const first = storedDb[cleanEm].name.trim().split(' ')[0];
        return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
      }
    } catch (e) {}
  }

  // 2. Specific mapping for known store users
  const cleanEmail = (email || '').trim().toLowerCase();
  if (cleanEmail === 'devshukla430@gmail.com' || (name && name.toLowerCase().includes('devshukla'))) {
    return 'Devesh';
  }
  if (cleanEmail === 'prachishukla921@gmail.com' || (name && name.toLowerCase().includes('prachishukla'))) {
    return 'Prachi';
  }

  // 3. If full name with space is provided (e.g. "Devesh Shukla")
  if (name && name.includes(' ') && name.trim() !== 'Prachi Finds Member') {
    const first = name.trim().split(' ')[0];
    return first.charAt(0).toUpperCase() + first.slice(1).toLowerCase();
  }

  // 4. Fallback heuristic from email prefix
  const source = (email ? email.split('@')[0] : (name || '')).trim();
  if (!source || source === 'Prachi Finds Member') return 'Member';

  const surnames = [
    'shukla', 'sharma', 'singh', 'kumar', 'patel', 'gupta', 'verma', 'jain',
    'yadav', 'mishra', 'tiwari', 'pandey', 'dubey', 'tripathi', 'rao', 'reddy',
    'nair', 'das', 'roy', 'sen', 'khan', 'ali', 'bose', 'ghosh', 'joshi',
    'mehta', 'shah', 'kapoor', 'malhotra', 'bhatia', 'chopra', 'saxena', 'agarwal'
  ];

  let clean = source.replace(/[0-9_.-]/g, '').toLowerCase();

  for (const surname of surnames) {
    if (clean.endsWith(surname) && clean.length > surname.length) {
      clean = clean.substring(0, clean.length - surname.length);
      break;
    }
  }

  if (clean.length > 0) {
    return clean.charAt(0).toUpperCase() + clean.slice(1).toLowerCase();
  }

  return source.charAt(0).toUpperCase() + source.slice(1).toLowerCase();
}

export function getUserInitial(name?: string, email?: string): string {
  const firstName = extractFirstName(name, email);
  if (firstName && firstName !== 'Member') {
    return firstName.charAt(0).toUpperCase();
  }
  if (email) {
    return email.charAt(0).toUpperCase();
  }
  return 'D';
}
