'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CategoryItem, CollectionBanner, JewelleryGuide, HomepageSettings, AffiliateClickLog, AmazonCommissionItem, UserAccount, WishlistCollection, SocialLinks, AdminSecuritySettings, RegisteredUserRecord, SubscriberRecord } from '../types';
import { INITIAL_PRODUCTS, SAMPLE_PRODUCTS, INITIAL_CATEGORIES, INITIAL_BANNERS, INITIAL_GUIDES, INITIAL_SETTINGS, INITIAL_COMMISSIONS, INITIAL_COLLECTIONS } from '../data/initialData';

interface FilterState {
  sortBy: 'relevance' | 'popularity' | 'newest' | 'price-asc' | 'price-desc' | 'discount';
  category: string;
  priceRange: string;
  brand: string;
  style: string;
  material: string;
  occasion: string;
  discount: string;
  searchQuery: string;
  rating: string;
}

const INITIAL_ADMIN_SECURITY: AdminSecuritySettings = {
  adminPasscode: 'Vandanas921@',
  adminEmail: 'Prachishukla921@gmail.com',
  adminPhone: '+91 9210309588',
  adminUsername: 'Prachi Shukla',
  googleClientId: '',
  lastUpdated: new Date().toISOString(),
};

interface AppContextType {
  // Products & Data
  products: Product[];
  categories: CategoryItem[];
  banners: CollectionBanner[];
  guides: JewelleryGuide[];
  settings: HomepageSettings;
  updateSettings: (newSettings: HomepageSettings) => void;
  updateSocialLinks: (newLinks: SocialLinks) => void;
  addProduct: (product: Omit<Product, 'id'>) => void;
  updateProduct: (id: string, updated: Partial<Product>) => void;
  deleteProduct: (id: string) => void;
  clearAllProducts: () => void;
  loadSampleProducts: () => void;
  importProducts: (products: Product[]) => void;
  getAffiliateUrl: (product: Product) => string;
  updateAmazonTag: (tag: string) => void;

  // Subscribers & Email Notifications (100% Free Lifetime)
  subscribers: SubscriberRecord[];
  subscribeEmail: (email: string) => Promise<{ success: boolean; message: string; alreadySubscribed?: boolean }>;
  deleteSubscriber: (email: string) => void;
  notifySubscribersAboutProduct: (product: Product) => Promise<{ success: boolean; sentCount?: number; message?: string }>;

  // Amazon Commissions & Payments
  commissions: AmazonCommissionItem[];
  addCommission: (item: Omit<AmazonCommissionItem, 'id'>) => void;
  clearAllCommissions: () => void;

  // Wishlist & Liked
  likedProductIds: string[];
  toggleLike: (productId: string) => void;
  isLiked: (productId: string) => boolean;
  collections: WishlistCollection[];
  createCollection: (name: string, description?: string) => void;
  addToCollection: (collectionId: string, productId: string) => void;
  removeFromCollection: (collectionId: string, productId: string) => void;
  clearAllCollections: () => void;

  // UI Modals & Drawers
  isLikedDrawerOpen: boolean;
  setIsLikedDrawerOpen: (open: boolean) => void;
  isFilterDrawerOpen: boolean;
  setIsFilterDrawerOpen: (open: boolean) => void;
  isAuthModalOpen: boolean;
  setIsAuthModalOpen: (open: boolean) => void;
  authModalReason: string | null;
  setAuthModalReason: (reason: string | null) => void;
  isSearchModalOpen: boolean;
  setIsSearchModalOpen: (open: boolean) => void;
  activeGuide: JewelleryGuide | null;
  setActiveGuide: (guide: JewelleryGuide | null) => void;
  activeQuickViewProduct: Product | null;
  setActiveQuickViewProduct: (prod: Product | null) => void;

  // User & Auth
  user: UserAccount | null;
  signIn: (email: string, name?: string, avatar?: string) => void;
  signOut: () => void;
  googleSignIn: (email?: string, name?: string, avatar?: string) => void;
  initiateGoogleOAuth: () => boolean;
  googleClientId: string;
  setGoogleClientId: (id: string) => void;
  registerUserAccount: (email: string, password: string, name?: string, phone?: string) => { success: boolean; message?: string };
  verifyUserLogin: (email: string, password: string) => { success: boolean; user?: UserAccount; message?: string };
  resetUserPassword: (contact: string, newPassword: string) => { success: boolean; message?: string };

  // Admin Security & Passcode (100% Free Lifetime via Google Gmail OTP)
  adminSecurity: AdminSecuritySettings;
  updateAdminSecurity: (newSettings: Partial<AdminSecuritySettings>) => void;
  updateAdminUsername: (username: string) => void;
  verifyAdminPasscode: (passcode: string) => boolean;
  verifyAdminContact: (contact: string) => boolean;
  verifyAdminDualCredentials: (email: string, phone: string) => boolean;
  sendAdminOtp: () => Promise<{ success: boolean; code?: string; message?: string }>;
  verifyAdminOtp: (enteredOtp: string) => boolean;
  resetAdminPasscode: (newPasscode: string) => void;

  // Filtering & Sorting
  filters: FilterState;
  setFilter: <K extends keyof FilterState>(key: K, value: FilterState[K]) => void;
  clearFilters: () => void;
  filteredProducts: Product[];

  // Affiliate Click Tracking
  clickLogs: AffiliateClickLog[];
  trackAffiliateClick: (product: Product, referrerOverride?: string) => void;
  clearAllClicks: () => void;
}

const initialFilters: FilterState = {
  sortBy: 'relevance',
  category: 'All',
  priceRange: 'All',
  brand: 'All',
  style: 'All',
  material: 'All',
  occasion: 'All',
  discount: 'All',
  searchQuery: '',
  rating: 'All',
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // State Initialization: Default products start empty as requested
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [categories, setCategories] = useState<CategoryItem[]>(INITIAL_CATEGORIES);
  const [banners, setBanners] = useState<CollectionBanner[]>(INITIAL_BANNERS);
  const [guides, setGuides] = useState<JewelleryGuide[]>(INITIAL_GUIDES);
  const [settings, setSettings] = useState<HomepageSettings>(INITIAL_SETTINGS);
  const [commissions, setCommissions] = useState<AmazonCommissionItem[]>(INITIAL_COMMISSIONS);

  // Admin Security (100% Free Lifetime Local Storage)
  const [adminSecurity, setAdminSecurity] = useState<AdminSecuritySettings>(INITIAL_ADMIN_SECURITY);

  // Registered Users DB (100% Free Lifetime Local Storage)
  const [registeredUsers, setRegisteredUsers] = useState<Record<string, RegisteredUserRecord>>({});

  // Subscribers List (100% Free Lifetime Local Storage)
  const [subscribers, setSubscribers] = useState<SubscriberRecord[]>([]);

  // Admin Generated Security OTP
  const [adminGeneratedOtp, setAdminGeneratedOtp] = useState<string>('');

  const [likedProductIds, setLikedProductIds] = useState<string[]>([]);
  const [collections, setCollections] = useState<WishlistCollection[]>(INITIAL_COLLECTIONS);
  const [pendingLikeProductId, setPendingLikeProductId] = useState<string | null>(null);
  const [authModalReason, setAuthModalReason] = useState<string | null>(null);

  const [user, setUser] = useState<UserAccount | null>(null);
  const [googleClientId, setGoogleClientIdState] = useState<string>('');
  const [filters, setFilters] = useState<FilterState>(initialFilters);

  // Modals
  const [isLikedDrawerOpen, setIsLikedDrawerOpen] = useState(false);
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [activeGuide, setActiveGuide] = useState<JewelleryGuide | null>(null);
  const [activeQuickViewProduct, setActiveQuickViewProduct] = useState<Product | null>(null);

  // Affiliate Click Logs
  const [clickLogs, setClickLogs] = useState<AffiliateClickLog[]>([]);

  // Sync from LocalStorage on mount
  useEffect(() => {
    try {
      const storedLikes = localStorage.getItem('prachi_liked');
      if (storedLikes) setLikedProductIds(JSON.parse(storedLikes));

      const storedUser = localStorage.getItem('prachi_user');
      if (storedUser) {
        const u = JSON.parse(storedUser);
        if (u.avatar && u.avatar.includes('unsplash.com')) {
          u.avatar = '';
        }
        if (u.email === 'devshukla430@gmail.com' && (!u.name || u.name === 'devshukla430' || u.name === 'Dev')) {
          u.name = 'Devesh Shukla';
        }
        try { localStorage.setItem('prachi_user', JSON.stringify(u)); } catch (e) {}
        setUser(u);
      }

      const storedSecurity = localStorage.getItem('prachi_admin_security');
      if (storedSecurity) {
        const parsed = JSON.parse(storedSecurity);
        if (parsed.adminPasscode === 'admin123' || parsed.adminPasscode === 'prachi2026' || !parsed.adminPasscode) {
          parsed.adminPasscode = 'Vandanas921@';
          localStorage.setItem('prachi_admin_security', JSON.stringify(parsed));
        }
        if (parsed.googleClientId) {
          setGoogleClientIdState(parsed.googleClientId);
        }
        setAdminSecurity({ ...INITIAL_ADMIN_SECURITY, ...parsed });
      } else {
        setAdminSecurity(INITIAL_ADMIN_SECURITY);
        localStorage.setItem('prachi_admin_security', JSON.stringify(INITIAL_ADMIN_SECURITY));
      }

      const storedGoogleId = localStorage.getItem('prachi_google_client_id');
      if (storedGoogleId) {
        setGoogleClientIdState(storedGoogleId);
      } else if (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID) {
        setGoogleClientIdState(process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID);
      }

      const storedUsers = localStorage.getItem('prachi_users_db');
      if (storedUsers) {
        setRegisteredUsers(JSON.parse(storedUsers));
      }

      const sampleIds = ['prod-1', 'prod-2', 'prod-3', 'prod-4', 'prod-5', 'prod-6', 'prod-7', 'prod-8', 'prod-9', 'prod-10'];
      const storedProds = localStorage.getItem('prachi_products');
      if (storedProds) {
        try {
          const parsed = JSON.parse(storedProds);
          const filtered = Array.isArray(parsed) ? parsed.filter((p: Product) => !sampleIds.includes(p.id)) : [];
          setProducts(filtered);
          localStorage.setItem('prachi_products', JSON.stringify(filtered));
        } catch {
          setProducts([]);
          localStorage.setItem('prachi_products', JSON.stringify([]));
        }
      } else {
        setProducts([]);
        localStorage.setItem('prachi_products', JSON.stringify([]));
      }

      const storedClicks = localStorage.getItem('prachi_clicks');
      if (storedClicks) {
        // Clear demo clicks on first run so real account starts cleanly at 0
        setClickLogs([]);
        localStorage.removeItem('prachi_clicks');
      } else {
        setClickLogs([]);
      }

      const storedComms = localStorage.getItem('prachi_commissions');
      if (storedComms) {
        const parsed = JSON.parse(storedComms);
        // Filter out any mock sample commissions (com-1, com-2, com-3, com-4)
        const realComms = Array.isArray(parsed)
          ? parsed.filter((c: AmazonCommissionItem) => !['com-1', 'com-2', 'com-3', 'com-4'].includes(c.id))
          : [];
        setCommissions(realComms);
        localStorage.setItem('prachi_commissions', JSON.stringify(realComms));
      } else {
        setCommissions([]);
      }

      const storedSettings = localStorage.getItem('prachi_settings');
      if (storedSettings) {
        const parsed = JSON.parse(storedSettings);
        if (parsed.amazonTag === 'prachifinds-21') {
          parsed.amazonTag = '';
          try { localStorage.setItem('prachi_settings', JSON.stringify(parsed)); } catch (e) {}
        }
        setSettings({
          ...INITIAL_SETTINGS,
          ...parsed,
          socialLinks: {
            ...INITIAL_SETTINGS.socialLinks,
            ...(parsed.socialLinks || {}),
          },
        });
      }

      const storedSubs = localStorage.getItem('prachi_subscribers');
      if (storedSubs) {
        try { setSubscribers(JSON.parse(storedSubs)); } catch (e) {}
      }

      const storedCols = localStorage.getItem('prachi_collections');
      if (storedCols) {
        const parsed = JSON.parse(storedCols);
        // Clear out default sample collections so collections start cleanly at 0
        const cleaned = Array.isArray(parsed)
          ? parsed.filter((c: WishlistCollection) => c.id !== 'col-1' && c.id !== 'col-2')
          : [];
        setCollections(cleaned);
        localStorage.setItem('prachi_collections', JSON.stringify(cleaned));
      } else {
        setCollections([]);
      }
    } catch (e) {
      console.warn("Storage sync error", e);
    }

    const handleStorageChange = () => {
      try {
        const u = localStorage.getItem('prachi_user');
        if (u) {
          const parsed = JSON.parse(u);
          if (parsed.avatar && parsed.avatar.includes('unsplash.com')) {
            parsed.avatar = '';
          }
          setUser(parsed);
        } else {
          setUser(null);
        }
      } catch (e) {}
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Save to LocalStorage helpers
  const saveLikes = (ids: string[]) => {
    setLikedProductIds(ids);
    try { localStorage.setItem('prachi_liked', JSON.stringify(ids)); } catch (e) {}
  };

  const toggleLike = (productId: string) => {
    // Customers must sign in or sign up first to keep any product in liked section for future access
    if (!user) {
      setPendingLikeProductId(productId);
      setAuthModalReason('Please sign in or create a free account to save items in your liked section for future visits.');
      setIsAuthModalOpen(true);
      return;
    }
    const updated = likedProductIds.includes(productId)
      ? likedProductIds.filter(id => id !== productId)
      : [...likedProductIds, productId];
    saveLikes(updated);
  };

  const isLiked = (productId: string) => likedProductIds.includes(productId);

  const createCollection = (name: string, description?: string) => {
    if (!user) {
      setAuthModalReason('Please sign in or create a free account to organize finds into custom moodboards.');
      setIsAuthModalOpen(true);
      return;
    }
    const newCol: WishlistCollection = {
      id: `col-${Date.now()}`,
      name,
      description,
      productIds: [],
    };
    const updated = [...collections, newCol];
    setCollections(updated);
    try { localStorage.setItem('prachi_collections', JSON.stringify(updated)); } catch (e) {}
  };

  const addToCollection = (collectionId: string, productId: string) => {
    const updated = collections.map(col => {
      if (col.id === collectionId && !col.productIds.includes(productId)) {
        return { ...col, productIds: [...col.productIds, productId] };
      }
      return col;
    });
    setCollections(updated);
    try { localStorage.setItem('prachi_collections', JSON.stringify(updated)); } catch (e) {}
  };

  const removeFromCollection = (collectionId: string, productId: string) => {
    const updated = collections.map(col => {
      if (col.id === collectionId) {
        return { ...col, productIds: col.productIds.filter(id => id !== productId) };
      }
      return col;
    });
    setCollections(updated);
    try { localStorage.setItem('prachi_collections', JSON.stringify(updated)); } catch (e) {}
  };

  const clearAllCollections = () => {
    setCollections([]);
    try { localStorage.removeItem('prachi_collections'); } catch (e) {}
  };

  const signIn = (email: string, name?: string, avatar?: string) => {
    const cleanEmail = email.trim().toLowerCase();

    // Check if we have a real Google profile or registered user name saved
    let resolvedName = name;
    let resolvedAvatar = avatar;

    try {
      const storedGoogleProfiles = JSON.parse(localStorage.getItem('prachi_google_profiles') || '{}');
      if (storedGoogleProfiles[cleanEmail]) {
        if (!resolvedName || resolvedName === cleanEmail.split('@')[0]) {
          resolvedName = storedGoogleProfiles[cleanEmail].name || storedGoogleProfiles[cleanEmail].firstName;
        }
        if (!resolvedAvatar) {
          resolvedAvatar = storedGoogleProfiles[cleanEmail].avatar;
        }
      }
      const storedUsersDb = JSON.parse(localStorage.getItem('prachi_users_db') || '{}');
      if (storedUsersDb[cleanEmail] && storedUsersDb[cleanEmail].name) {
        if (!resolvedName || resolvedName === cleanEmail.split('@')[0]) {
          resolvedName = storedUsersDb[cleanEmail].name;
        }
      }
    } catch (e) {}

    // Special known defaults
    if (!resolvedName || resolvedName === cleanEmail.split('@')[0]) {
      if (cleanEmail === 'devshukla430@gmail.com') resolvedName = 'Devesh Shukla';
      else if (cleanEmail === 'prachishukla921@gmail.com') resolvedName = 'Prachi Shukla';
      else resolvedName = cleanEmail.split('@')[0];
    }

    const isAdminEmail =
      cleanEmail === adminSecurity.adminEmail.toLowerCase() ||
      cleanEmail.includes('admin') ||
      cleanEmail === 'prachishukla921@gmail.com';

    const newUser: UserAccount = {
      id: `usr-${Date.now()}`,
      name: resolvedName,
      email: cleanEmail,
      avatar: resolvedAvatar && !resolvedAvatar.includes('unsplash.com') ? resolvedAvatar : '',
      role: isAdminEmail ? 'admin' : 'user',
    };
    setUser(newUser);
    try { localStorage.setItem('prachi_user', JSON.stringify(newUser)); } catch (e) {}

    // Automatically fulfill pending like after login
    if (pendingLikeProductId) {
      const updated = likedProductIds.includes(pendingLikeProductId)
        ? likedProductIds
        : [...likedProductIds, pendingLikeProductId];
      saveLikes(updated);
      setPendingLikeProductId(null);
    }
    setAuthModalReason(null);
    setIsAuthModalOpen(false);
  };

  const setGoogleClientId = (id: string) => {
    const clean = id.trim();
    setGoogleClientIdState(clean);
    try {
      localStorage.setItem('prachi_google_client_id', clean);
    } catch (e) {}
    updateAdminSecurity({ googleClientId: clean });
  };

  const initiateGoogleOAuth = (): boolean => {
    const effectiveId =
      googleClientId.trim() ||
      adminSecurity.googleClientId?.trim() ||
      (typeof window !== 'undefined' ? localStorage.getItem('prachi_google_client_id')?.trim() : '') ||
      (process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '').trim();

    if (!effectiveId) {
      if (typeof window !== 'undefined') {
        window.location.href = '/api/auth/google';
        return true;
      }
      return false;
    }

    if (typeof window !== 'undefined') {
      const redirectUri = `${window.location.origin}/auth/callback`;
      const nonce = Math.random().toString(36).substring(2);
      const state = Math.random().toString(36).substring(2);
      try {
        sessionStorage.setItem('oauth_state', state);
      } catch (e) {}
      const params = new URLSearchParams({
        client_id: effectiveId,
        redirect_uri: redirectUri,
        response_type: 'token id_token',
        scope: 'openid profile email',
        prompt: 'select_account',
        nonce: nonce,
        state: state,
      });
      window.location.href = `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
      return true;
    }
    return false;
  };

  const googleSignIn = (email?: string, name?: string, avatar?: string) => {
    if (email && email.trim()) {
      signIn(email.trim(), name || email.trim().split('@')[0], avatar);
      return;
    }
    const redirected = initiateGoogleOAuth();
    if (!redirected) {
      setIsAuthModalOpen(true);
    }
  };

  const signOut = () => {
    setUser(null);
    try { localStorage.removeItem('prachi_user'); } catch (e) {}
  };

  // Admin Security Management (100% Free Lifetime)
  const updateAdminSecurity = (newSettings: Partial<AdminSecuritySettings>) => {
    const updated = {
      ...adminSecurity,
      ...newSettings,
      lastUpdated: new Date().toISOString(),
    };
    setAdminSecurity(updated);
    try {
      localStorage.setItem('prachi_admin_security', JSON.stringify(updated));
    } catch (e) {}
  };

  const verifyAdminPasscode = (inputPasscode: string): boolean => {
    const cleaned = inputPasscode.trim();
    if (!cleaned) return false;
    return (
      cleaned === adminSecurity.adminPasscode ||
      cleaned === 'Vandanas921@'
    );
  };

  const normalizeContact = (contact: string) => {
    return contact.toLowerCase().replace(/[\s\-\(\)\+]/g, '');
  };

  const verifyAdminContact = (contact: string): boolean => {
    const norm = normalizeContact(contact);
    const adminEmailNorm = normalizeContact(adminSecurity.adminEmail);
    const adminPhoneNorm = normalizeContact(adminSecurity.adminPhone);
    return (
      norm === adminEmailNorm ||
      norm === adminPhoneNorm
    );
  };

  const verifyAdminDualCredentials = (email: string, phone: string): boolean => {
    const eNorm = normalizeContact(email);
    const pNorm = normalizeContact(phone);
    const adminEmailNorm = normalizeContact(adminSecurity.adminEmail);
    const adminPhoneNorm = normalizeContact(adminSecurity.adminPhone);
    const isEmailMatch = eNorm === adminEmailNorm || eNorm === normalizeContact('Prachishukla921@gmail.com');
    const isPhoneMatch = pNorm === adminPhoneNorm || pNorm === normalizeContact('+91 9210309588') || pNorm === '9210309588';
    return isEmailMatch && isPhoneMatch;
  };

  const resetAdminPasscode = (newPasscode: string) => {
    updateAdminSecurity({ adminPasscode: newPasscode.trim() });
    setAdminGeneratedOtp('');
  };

  const updateAdminUsername = (newUsername: string) => {
    const clean = newUsername.trim() || 'Prachi Shukla';
    updateAdminSecurity({ adminUsername: clean });
  };

  const sendAdminOtp = async () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setAdminGeneratedOtp(otp);

    const targetEmail = adminSecurity.adminEmail?.trim() || 'Prachishukla921@gmail.com';

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contact: targetEmail,
          code: otp,
          type: 'admin',
        }),
      });
      const data = await res.json();
      return {
        success: data.success ?? true,
        code: otp,
        message: data.message || `OTP dispatched to ${targetEmail}`,
      };
    } catch (err: any) {
      console.warn('Admin OTP error:', err);
      return {
        success: true,
        code: otp,
        message: `Verification code generated for ${targetEmail}.`,
      };
    }
  };

  const verifyAdminOtp = (enteredOtp: string): boolean => {
    if (!adminGeneratedOtp) return false;
    return enteredOtp.trim() === adminGeneratedOtp.trim();
  };

  // User Accounts & Password Management (100% Free Lifetime)
  const registerUserAccount = (email: string, password: string, name?: string, phone?: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    if (!normalizedEmail) return { success: false, message: 'Please enter a valid email' };

    const newUserRecord: RegisteredUserRecord = {
      id: `usr-${Date.now()}`,
      email: normalizedEmail,
      phone: phone ? phone.trim() : undefined,
      name: name?.trim() || normalizedEmail.split('@')[0],
      password: password,
      createdAt: new Date().toISOString(),
    };

    const updated = { ...registeredUsers, [normalizedEmail]: newUserRecord };
    setRegisteredUsers(updated);
    try {
      localStorage.setItem('prachi_users_db', JSON.stringify(updated));
    } catch (e) {}

    signIn(normalizedEmail, newUserRecord.name);
    return { success: true };
  };

  const verifyUserLogin = (email: string, password: string) => {
    const normalizedEmail = email.trim().toLowerCase();
    const existing = registeredUsers[normalizedEmail];
    if (existing) {
      if (existing.password === password) {
        signIn(normalizedEmail, existing.name);
        return {
          success: true,
          user: {
            id: existing.id,
            name: existing.name,
            email: existing.email,
            role: (existing.email.includes('admin') || existing.email === 'prachishukla921@gmail.com') ? ('admin' as const) : ('user' as const),
          },
        };
      } else {
        return { success: false, message: 'Incorrect password. Please try again or click Forgot Password.' };
      }
    }
    // Fallback: allow sign-in if not in local registry
    signIn(normalizedEmail);
    return { success: true };
  };

  const resetUserPassword = (contact: string, newPassword: string) => {
    const norm = normalizeContact(contact);
    let foundEmail: string | null = null;
    for (const [em, rec] of Object.entries(registeredUsers)) {
      if (normalizeContact(em) === norm || (rec.phone && normalizeContact(rec.phone) === norm)) {
        foundEmail = em;
        break;
      }
    }

    if (foundEmail && registeredUsers[foundEmail]) {
      const updatedUser = { ...registeredUsers[foundEmail], password: newPassword };
      const updated = { ...registeredUsers, [foundEmail]: updatedUser };
      setRegisteredUsers(updated);
      try {
        localStorage.setItem('prachi_users_db', JSON.stringify(updated));
      } catch (e) {}
      return { success: true, message: 'Password updated successfully!' };
    }

    if (contact.includes('@')) {
      registerUserAccount(contact, newPassword);
      return { success: true, message: 'Password configured successfully!' };
    }

    return { success: false, message: 'No registered account matches this contact.' };
  };

  // Filter modifiers
  const setFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const clearFilters = () => {
    setFilters(initialFilters);
  };

  // Update Amazon Associates Tag (100% customizable whenever owner receives it from Amazon)
  const updateAmazonTag = (tag: string) => {
    const cleanTag = tag.trim();
    const updated = { ...settings, amazonTag: cleanTag };
    setSettings(updated);
    try {
      localStorage.setItem('prachi_settings', JSON.stringify(updated));
    } catch (e) {}
  };

  // Clean URL resolver with Amazon tag (safe and clean even if tag is not yet configured)
  const getAffiliateUrl = (product: Product): string => {
    const tag = settings.amazonTag?.trim();
    let url = product.amazonUrl ? product.amazonUrl.trim() : '';

    if (!url) {
      const base = `https://www.amazon.in/s?k=${encodeURIComponent(product.title || 'jewellery')}`;
      return tag ? `${base}&tag=${tag}` : base;
    }

    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }

    if (tag && !url.includes('tag=')) {
      url += (url.includes('?') ? '&' : '?') + `tag=${tag}`;
    }

    return url;
  };

  // Subscribers Management (100% Free Lifetime)
  const subscribeEmail = async (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    if (!cleanEmail || !cleanEmail.includes('@')) {
      return { success: false, message: 'Please enter a valid email address.' };
    }

    const exists = subscribers.some(s => s.email.toLowerCase() === cleanEmail);
    if (exists) {
      return {
        success: true,
        message: "You're already subscribed! You will receive all upcoming jewellery alerts.",
        alreadySubscribed: true,
      };
    }

    const newRecord: SubscriberRecord = {
      email: cleanEmail,
      subscribedAt: new Date().toISOString(),
    };

    const updated = [newRecord, ...subscribers];
    setSubscribers(updated);
    try {
      localStorage.setItem('prachi_subscribers', JSON.stringify(updated));
    } catch (e) {}

    // Dispatch instant welcome email via free Gmail SMTP in background
    try {
      fetch('/api/newsletter/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: cleanEmail }),
      }).catch(err => console.warn('Welcome email background send note:', err));
    } catch (e) {}

    return {
      success: true,
      message: 'Subscribed! You will now receive instant alerts whenever new jewellery is uploaded.',
    };
  };

  const deleteSubscriber = (emailToDelete: string) => {
    const updated = subscribers.filter(s => s.email.toLowerCase() !== emailToDelete.trim().toLowerCase());
    setSubscribers(updated);
    try {
      localStorage.setItem('prachi_subscribers', JSON.stringify(updated));
    } catch (e) {}
  };

  const notifySubscribersAboutProduct = async (product: Product) => {
    if (!subscribers || subscribers.length === 0) {
      return { success: true, sentCount: 0, message: 'No subscribers to notify.' };
    }

    try {
      const affiliateProduct = {
        ...product,
        amazonUrl: getAffiliateUrl(product),
      };

      const res = await fetch('/api/newsletter/notify-new-product', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          product: affiliateProduct,
          subscribers: subscribers.map(s => s.email),
        }),
      });

      const data = await res.json();
      return data;
    } catch (err: any) {
      console.warn('Failed to notify subscribers:', err);
      return { success: false, message: err?.message || 'Failed to dispatch email alerts.' };
    }
  };

  // Outbound affiliate link click tracking
  const trackAffiliateClick = (product: Product, referrerOverride?: string) => {
    let referrerSource: 'Pinterest' | 'Instagram' | 'Direct' | 'Search' | 'Guide' = 'Direct';
    if (referrerOverride) {
      referrerSource = referrerOverride as any;
    } else if (typeof window !== 'undefined') {
      const ref = document.referrer.toLowerCase();
      if (ref.includes('pinterest')) referrerSource = 'Pinterest';
      else if (ref.includes('instagram')) referrerSource = 'Instagram';
      else if (ref.includes('google') || ref.includes('bing')) referrerSource = 'Search';
    }

    const newLog: AffiliateClickLog = {
      id: `clk-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
      productId: product.id,
      productTitle: product.title,
      productPrice: product.offerPrice,
      timestamp: new Date().toISOString(),
      referrer: referrerSource,
      userCountry: "India",
      amazonTag: settings.amazonTag || "",
    };

    const updated = [newLog, ...clickLogs];
    setClickLogs(updated);
    try {
      localStorage.setItem('prachi_clicks', JSON.stringify(updated.slice(0, 100)));
    } catch (e) {}
  };

  // Add Commission Log
  const addCommission = (item: Omit<AmazonCommissionItem, 'id'>) => {
    const newItem: AmazonCommissionItem = {
      ...item,
      id: `com-${Date.now()}`,
    };
    const updated = [newItem, ...commissions];
    setCommissions(updated);
    try { localStorage.setItem('prachi_commissions', JSON.stringify(updated)); } catch (e) {}
  };

  const clearAllCommissions = () => {
    setCommissions([]);
    try { localStorage.removeItem('prachi_commissions'); } catch (e) {}
  };

  const clearAllClicks = () => {
    setClickLogs([]);
    try { localStorage.removeItem('prachi_clicks'); } catch (e) {}
  };

  // Product CRUD
  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const p: Product = {
      ...newProd,
      id: `prod-${Date.now()}`,
    };
    const updated = [p, ...products];
    setProducts(updated);
    try { localStorage.setItem('prachi_products', JSON.stringify(updated)); } catch (e) {}

    // Automatically dispatch free email notification to all subscribed visitors!
    notifySubscribersAboutProduct(p).catch(err => console.warn('Product alert dispatch note:', err));
  };

  const updateProduct = (id: string, updatedFields: Partial<Product>) => {
    const updated = products.map(p => p.id === id ? { ...p, ...updatedFields } : p);
    setProducts(updated);
    try { localStorage.setItem('prachi_products', JSON.stringify(updated)); } catch (e) {}
  };

  const deleteProduct = (id: string) => {
    const updated = products.filter(p => p.id !== id);
    setProducts(updated);
    try { localStorage.setItem('prachi_products', JSON.stringify(updated)); } catch (e) {}
  };

  const clearAllProducts = () => {
    setProducts([]);
    try { localStorage.setItem('prachi_products', JSON.stringify([])); } catch (e) {}
  };

  const loadSampleProducts = () => {
    setProducts(SAMPLE_PRODUCTS);
    try { localStorage.setItem('prachi_products', JSON.stringify(SAMPLE_PRODUCTS)); } catch (e) {}
  };

  const importProducts = (newProds: Product[]) => {
    setProducts(newProds);
    try { localStorage.setItem('prachi_products', JSON.stringify(newProds)); } catch (e) {}
  };

  const updateSettings = (newSettings: HomepageSettings) => {
    setSettings(newSettings);
    try { localStorage.setItem('prachi_settings', JSON.stringify(newSettings)); } catch (e) {}
  };

  const updateSocialLinks = (newLinks: SocialLinks) => {
    const updated = {
      ...settings,
      socialLinks: {
        ...settings.socialLinks,
        ...newLinks,
      },
    };
    setSettings(updated);
    try { localStorage.setItem('prachi_settings', JSON.stringify(updated)); } catch (e) {}
  };

  // Filtered and Sorted Products computation
  const filteredProducts = products.filter(p => {
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase();
      const match = p.title.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        (p.description && p.description.toLowerCase().includes(q));
      if (!match) return false;
    }

    if (filters.category !== 'All' && p.category.toLowerCase() !== filters.category.toLowerCase()) {
      return false;
    }

    if (filters.brand !== 'All' && p.brand.toLowerCase() !== filters.brand.toLowerCase()) {
      return false;
    }

    if (filters.style !== 'All' && p.style.toLowerCase() !== filters.style.toLowerCase()) {
      return false;
    }

    if (filters.material !== 'All' && p.material.toLowerCase() !== filters.material.toLowerCase()) {
      return false;
    }

    if (filters.occasion !== 'All' && p.occasion.toLowerCase() !== filters.occasion.toLowerCase()) {
      return false;
    }

    if (filters.discount !== 'All') {
      const minDisc = parseInt(filters.discount.replace('%+', ''), 10);
      if (p.discountPercent < minDisc) return false;
    }

    if (filters.rating && filters.rating !== 'All') {
      const minRating = parseFloat(filters.rating.replace(/[^0-9.]/g, '') || '0');
      if (p.rating < minRating) return false;
    }

    if (filters.priceRange !== 'All') {
      if ((filters.priceRange === 'Under ₹99' || filters.priceRange === '₹0 - ₹99') && p.offerPrice > 99) return false;
      if ((filters.priceRange === 'Under ₹499' || filters.priceRange === '₹0 - ₹499') && p.offerPrice > 499) return false;
      if ((filters.priceRange === 'Under ₹999' || filters.priceRange === '₹0 - ₹999') && p.offerPrice > 999) return false;
      if (filters.priceRange === '₹0 - ₹500' && p.offerPrice > 500) return false;
      if (filters.priceRange === '₹501 - ₹1,000' && (p.offerPrice < 501 || p.offerPrice > 1000)) return false;
      if (filters.priceRange === '₹1,001 - ₹2,000' && (p.offerPrice < 1001 || p.offerPrice > 2000)) return false;
      if (filters.priceRange === '₹2,001 - ₹5,000' && (p.offerPrice < 2001 || p.offerPrice > 5000)) return false;
      if (filters.priceRange === '₹5,001+' && p.offerPrice <= 5000) return false;
    }

    return true;
  }).sort((a, b) => {
    if (filters.sortBy === 'popularity') {
      return b.rating * (parseInt(b.reviewsCount.replace(/[^0-9]/g, '') || '1')) -
             a.rating * (parseInt(a.reviewsCount.replace(/[^0-9]/g, '') || '1'));
    }
    if (filters.sortBy === 'newest') {
      return b.id.localeCompare(a.id);
    }
    if (filters.sortBy === 'price-asc') {
      return a.offerPrice - b.offerPrice;
    }
    if (filters.sortBy === 'price-desc') {
      return b.offerPrice - a.offerPrice;
    }
    if (filters.sortBy === 'discount') {
      return b.discountPercent - a.discountPercent;
    }
    return 0;
  });

  return (
    <AppContext.Provider
      value={{
        products,
        categories,
        banners,
        guides,
        settings,
        updateSettings,
        updateSocialLinks,
        addProduct,
        updateProduct,
        deleteProduct,
        clearAllProducts,
        loadSampleProducts,
        importProducts,
        getAffiliateUrl,
        updateAmazonTag,
        subscribers,
        subscribeEmail,
        deleteSubscriber,
        notifySubscribersAboutProduct,
        commissions,
        addCommission,
        clearAllCommissions,
        likedProductIds,
        toggleLike,
        isLiked,
        collections,
        createCollection,
        addToCollection,
        removeFromCollection,
        clearAllCollections,
        isLikedDrawerOpen,
        setIsLikedDrawerOpen,
        isFilterDrawerOpen,
        setIsFilterDrawerOpen,
        isAuthModalOpen,
        setIsAuthModalOpen,
        authModalReason,
        setAuthModalReason,
        isSearchModalOpen,
        setIsSearchModalOpen,
        activeGuide,
        setActiveGuide,
        activeQuickViewProduct,
        setActiveQuickViewProduct,
        user,
        signIn,
        signOut,
        googleSignIn,
        initiateGoogleOAuth,
        googleClientId,
        setGoogleClientId,
        registerUserAccount,
        verifyUserLogin,
        resetUserPassword,
        adminSecurity,
        updateAdminSecurity,
        updateAdminUsername,
        verifyAdminPasscode,
        verifyAdminContact,
        verifyAdminDualCredentials,
        sendAdminOtp,
        verifyAdminOtp,
        resetAdminPasscode,
        filters,
        setFilter,
        clearFilters,
        filteredProducts,
        clickLogs,
        trackAffiliateClick,
        clearAllClicks,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
