export interface SocialLinks {
  instagram?: string;
  pinterest?: string;
  youtube?: string;
  twitter?: string;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  category: 'Earrings' | 'Rings' | 'Necklaces' | 'Bracelets' | 'Jewellery Sets' | 'Gift Ideas' | string;
  brand: string;
  style: 'Minimal' | 'Traditional' | 'Trendy' | 'Classic' | 'Boho' | string;
  material: 'Gold Plated' | 'Silver' | 'Stainless Steel' | 'Pearl' | 'Rose Gold' | 'Other' | string;
  occasion: 'Daily Wear' | 'Office Wear' | 'Party Wear' | 'Wedding' | 'Festive' | string;
  mrp: number;
  offerPrice: number;
  discountPercent: number;
  rating: number;
  reviewsCount: string;
  imageUrl: string;
  gallery?: string[];
  description: string;
  bulletPoints?: string[];
  amazonUrl: string;
  badges?: ('Featured' | 'Trending Now' | 'Best Value' | 'Gift Pick')[];
  inStock?: boolean;
}

export interface CategoryItem {
  id: string;
  name: string;
  slug: string;
  imageUrl: string;
  count?: number;
}

export interface CollectionBanner {
  id: string;
  title: string;
  tagline: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  imageUrl: string;
  badge?: string;
}

export interface JewelleryGuide {
  id: string;
  category: string;
  title: string;
  excerpt: string;
  readTime: string;
  imageUrl: string;
  content: string;
  recommendedProductIds?: string[];
}

export interface AffiliateClickLog {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  timestamp: string;
  referrer: 'Pinterest' | 'Instagram' | 'Direct' | 'Search' | 'Guide' | string;
  userCountry?: string;
  amazonTag: string;
}

export interface AmazonCommissionItem {
  id: string;
  productId: string;
  productTitle: string;
  productPrice: number;
  quantityOrdered: number;
  commissionRate: number; // e.g. 0.08 for 8%
  commissionAmount: number;
  date: string;
  status: 'Approved & Paid' | 'Processing (Amazon)' | 'Pending Verification';
  amazonOrderId?: string;
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  role: 'user' | 'admin';
}

export interface WishlistCollection {
  id: string;
  name: string;
  description?: string;
  productIds: string[];
}

export interface HomepageSettings {
  announcements: string[];
  heroTag: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  heroImageUrl: string;
  amazonTag: string;
  socialLinks: SocialLinks;
}

export interface AdminSecuritySettings {
  adminPasscode: string;
  adminEmail: string;
  adminPhone: string;
  adminUsername?: string;
  googleClientId?: string;
  lastUpdated?: string;
}

export interface SubscriberRecord {
  email: string;
  subscribedAt: string;
}

export interface RegisteredUserRecord {
  id: string;
  email: string;
  phone?: string;
  name: string;
  password: string;
  createdAt: string;
}

