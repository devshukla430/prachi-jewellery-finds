import { Product, CategoryItem, CollectionBanner, JewelleryGuide, HomepageSettings, AmazonCommissionItem, WishlistCollection } from '../types';

export const INITIAL_SETTINGS: HomepageSettings = {
  announcements: [
    "🌸 Free Shipping on Selected Products",
    "100% Original Products via Amazon",
    "Earn Cashback on Amazon Purchases"
  ],
  heroTag: "CURATED WITH LOVE ♡",
  heroHeadline: "Discover Jewellery You'll Love",
  heroSubtitle: "Handpicked styles, latest trends and timeless pieces — all from Amazon, just for you!",
  heroCtaText: "Explore Finds →",
  heroCtaLink: "#featured-finds",
  heroImageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80",
  amazonTag: "",
  socialLinks: {
    instagram: "https://instagram.com/prachijewelleryfinds",
    pinterest: "https://pinterest.com/prachijewelleryfinds",
    youtube: "https://youtube.com/@prachijewelleryfinds",
    twitter: "https://x.com/prachifinds",
  },
};

export const INITIAL_CATEGORIES: CategoryItem[] = [
  {
    id: "cat-1",
    name: "Earrings",
    slug: "earrings",
    imageUrl: "/categories/earrings.jpg",
    count: 0,
  },
  {
    id: "cat-2",
    name: "Rings",
    slug: "rings",
    imageUrl: "/categories/rings.jpg",
    count: 0,
  },
  {
    id: "cat-3",
    name: "Necklaces",
    slug: "necklaces",
    imageUrl: "/categories/necklace.jpg",
    count: 0,
  },
  {
    id: "cat-4",
    name: "Bracelets",
    slug: "bracelets",
    imageUrl: "/categories/bracelet.jpg",
    count: 0,
  },
  {
    id: "cat-5",
    name: "Jewellery Sets",
    slug: "jewellery-sets",
    imageUrl: "/categories/jewellery-sets.jpg",
    count: 0,
  },
  {
    id: "cat-6",
    name: "Gift Ideas",
    slug: "gift-ideas",
    imageUrl: "/categories/gift-ideas.jpg",
    count: 0,
  },
];

// Catalogue starts completely clean with 0 products so user can add manually!
export const INITIAL_PRODUCTS: Product[] = [];

// Optional sample products that can be restored with a single click in Admin CMS if desired
export const SAMPLE_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Gold Hoop Earrings (Everyday Wear)",
    slug: "gold-hoop-earrings-everyday-wear",
    category: "Earrings",
    brand: "Giva",
    style: "Minimal",
    material: "Gold Plated",
    occasion: "Daily Wear",
    mrp: 1499,
    offerPrice: 999,
    discountPercent: 35,
    rating: 4.5,
    reviewsCount: "1.2k",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=800&q=80",
    description: "Classic lightweight 18K gold-plated chunky huggie hoops crafted for sensitive ears and effortless everyday elegance.",
    bulletPoints: [
      "18K High-Grade Gold Plating with Anti-Tarnish Coating",
      "Hypoallergenic, Lead-free, and Nickel-free for all-day comfort",
      "Secure click-top clasp that won't snag hair or clothes"
    ],
    amazonUrl: "https://www.amazon.in/s?k=gold+hoop+earrings+for+women&tag=prachifinds-21",
    badges: ["Featured", "Trending Now"],
    inStock: true,
  },
  {
    id: "prod-2",
    title: "Solitaire Ring for Women (Minimal Style)",
    slug: "solitaire-ring-for-women-minimal-style",
    category: "Rings",
    brand: "Mia by Tanishq",
    style: "Minimal",
    material: "Silver",
    occasion: "Daily Wear",
    mrp: 1999,
    offerPrice: 1299,
    discountPercent: 35,
    rating: 4.6,
    reviewsCount: "856",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80",
    description: "Dainty 925 sterling silver solitaire ring featuring a brilliant round cubic zirconia prong-set for maximum fire and sparkle.",
    bulletPoints: [
      "Authentic 925 Hallmark Sterling Silver band",
      "AAA+ Swiss Grade Cubic Zirconia stone",
      "Tarnish resistant rhodium flash plating"
    ],
    amazonUrl: "https://www.amazon.in/s?k=solitaire+ring+for+women&tag=prachifinds-21",
    badges: ["Featured", "Best Value"],
    inStock: true,
  },
  {
    id: "prod-3",
    title: "Heart Pendant Necklace (Trendy & Elegant)",
    slug: "heart-pendant-necklace-trendy-elegant",
    category: "Necklaces",
    brand: "Yellow Chimes",
    style: "Trendy",
    material: "Gold Plated",
    occasion: "Office Wear",
    mrp: 1299,
    offerPrice: 899,
    discountPercent: 31,
    rating: 4.7,
    reviewsCount: "2.3k",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80",
    description: "Delicate micro-paved crystal heart necklace hanging gracefully on a gleaming cable chain. Perfect for layering or wearing solo.",
    bulletPoints: [
      "Rose-gold plated over surgical stainless steel",
      "16-inch chain with a 2-inch extender",
      "Sweat and water-resistant finish"
    ],
    amazonUrl: "https://www.amazon.in/s?k=heart+pendant+necklace+women&tag=prachifinds-21",
    badges: ["Featured", "Trending Now"],
    inStock: true,
  },
];

export const INITIAL_BANNERS: CollectionBanner[] = [
  {
    id: "banner-under-99",
    title: "Steal Finds Under ₹99",
    tagline: "SUPER SAVER",
    subtitle: "Cute studs, nose pins, minimal ear cuffs & rings at steal prices.",
    ctaText: "Shop Under ₹99 →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    badge: "Under ₹99",
  },
  {
    id: "banner-under-499",
    title: "Daily Luxury Under ₹499",
    tagline: "POCKET-FRIENDLY",
    subtitle: "Anti-tarnish, everyday chic pieces that look ₹5,000+.",
    ctaText: "Shop Under ₹499 →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
    badge: "Under ₹499",
  },
  {
    id: "banner-under-999",
    title: "Best Value Under ₹999",
    tagline: "STATEMENT FINDS",
    subtitle: "925 sterling silver, luxury zirconia & royal gift sets.",
    ctaText: "Shop Under ₹999 →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    badge: "Under ₹999",
  },
  {
    id: "banner-trending",
    title: "Trending Sensation",
    tagline: "HOT PICKS",
    subtitle: "Most loved Instagram & Pinterest jewellery picks.",
    ctaText: "Explore Trending →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    badge: "Trending",
  },
  {
    id: "banner-gift",
    title: "Curated Gift Picks",
    tagline: "GIFT READY",
    subtitle: "Perfect jewellery gift boxes for every special occasion.",
    ctaText: "Explore Gifts →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    badge: "Gift Ready",
  },
];

export const INITIAL_GUIDES: JewelleryGuide[] = [
  {
    id: "guide-1",
    category: "Jewellery Styling",
    title: "How to Style Hoop Earrings for Different Outfits",
    excerpt: "From boardroom blazers to weekend sundresses, master the art of pairing hoop sizes with collars, hair, and necklines.",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    content: `
### The Timeless Allure of Gold Hoops

Hoop earrings are the ultimate chameleon of jewellery. Whether you are dressing up a relaxed weekend look or accessorizing an Indian silk kurta, the right pair immediately frames your face with warm, flattering light.

#### 1. Everyday Minimal (15mm - 20mm Huggies)
Small, thick huggie hoops sit snug against the earlobe. They are ideal for high collars, sweaters, and office attire because they never get caught in hair or phones.

#### 2. Casual Weekend (25mm - 35mm Classic Hoops)
Mid-sized hoops provide just enough drama to elevate a plain white tee or denim jacket. Wear your hair in a sleek low bun or soft waves to let them catch the light.

#### 3. Evening Glam (40mm+ or Chunky Drops)
Make a bold statement with oversized chunky hoops or sculptural teardrops. Keep neck jewellery minimal to keep the focus centered on your cheekbones and jawline.
    `,
    recommendedProductIds: [],
  },
  {
    id: "guide-2",
    category: "Jewellery Styling",
    title: "How to Choose a Necklace for Different Necklines",
    excerpt: "Demystify V-necks, scoop collars, turtlenecks, and sweetheart cuts with our foolproof layering blueprint.",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    content: `
### Perfect Proportions: Necklines Meets Chains

Pairing your necklace to your shirt's neckline is the easiest way to look instantly styled and polished.

#### The V-Neck Formula
V-necks naturally draw the eye downward. Complement this silhouette with an angular or pendant necklace that echoes the triangle shape.

#### Crew Necks & High Collars
Crew collars look best when either framed by a short collarbone choker or contrasted with an elongated 20-inch paperclip chain.

#### Sweetheart & Square Necklines
Geometric necklines crave softer curves or statement collar pieces. Try a layered set that combines a 14-inch choker with a 16-inch coin charm.
    `,
    recommendedProductIds: [],
  },
  {
    id: "guide-3",
    category: "Gift Ideas",
    title: "10 Jewellery Gift Ideas for Women",
    excerpt: "Thoughtful, high-perceived-value jewellery gifts under ₹2,000 that look like a million bucks.",
    readTime: "6 min read",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    content: `
### Gifting Made Simple & Meaningful

Jewellery is one of the most cherished gifts, but guessing ring sizes or bold tastes can feel risky. Here are universal winners guaranteed to impress:

1. **Adjustable Solitaire Rings**: Solitaires with discreet sizing bands eliminate size anxiety while delivering timeless sparkle.
2. **Pearl Strand Bracelets**: Fresh, youthful, and timeless. Suits teens, working professionals, and mothers alike.
3. **Pendant Jewellery Sets**: Coordinated sets save time in the morning and arrive packaged in presentation-ready gift boxes.
4. **Velvet Travel Organizers**: If she already loves jewellery, a blush pink lockable jewelry case is the most thoughtful companion gift.
    `,
    recommendedProductIds: [],
  },
  {
    id: "guide-4",
    category: "Jewellery Care",
    title: "Tips to Keep Your Jewellery Shiny for Longer",
    excerpt: "Simple at-home habits to preserve gold plating, prevent tarnishing, and maintain diamond-like brilliance.",
    readTime: "3 min read",
    imageUrl: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=600&q=80",
    content: `
### The 3 Golden Rules of Jewellery Longevity

Fashion and fine gold-plated jewellery can last for years with just a little mindful care.

#### Rule 1: The 'Last On, First Off' Habit
Perfumes, hairsprays, and body lotions contain chemicals that degrade protective topcoats. Always put your jewellery on after makeup and perfume.

#### Rule 2: Keep Away from Moisture
Never store jewellery in damp bathrooms. Keep pieces in airtight zip pouches or velvet organizer boxes.

#### Rule 3: Quick Microfiber Wipe
After each wear, gently wipe away skin oils with a soft cloth before storing.
    `,
    recommendedProductIds: [],
  },
];

// Commissions data starts empty for a new account (user records real payouts as they occur)
export const INITIAL_COMMISSIONS: AmazonCommissionItem[] = [];

// Collections start clean at 0 (customers create their own moodboard collections)
export const INITIAL_COLLECTIONS: WishlistCollection[] = [];


