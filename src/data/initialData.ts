import { Product, CategoryItem, CollectionBanner, JewelleryGuide, HomepageSettings, AmazonCommissionItem, WishlistCollection } from '../types';

export const INITIAL_SETTINGS: HomepageSettings = {
  announcements: [
    "Curated Jewellery Finds from Amazon",
    "Discover, Compare and Choose Timeless Styles",
    "Handpicked Daily Trends, Styling Guides and Gift Ideas"
  ],
  heroTag: "CURATED FINDS",
  heroHeadline: "Discover Jewellery You'll Love",
  heroSubtitle: "Handpicked styles, latest trends and timeless pieces — all curated from Amazon for your everyday wardrobe.",
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

// Catalogue starts completely empty so the owner can add all products manually via admin portal
export const INITIAL_PRODUCTS: Product[] = [];

export const SAMPLE_PRODUCTS: Product[] = [];

export const INITIAL_BANNERS: CollectionBanner[] = [
  {
    id: "banner-under-99",
    title: "Steal Finds Under ₹99",
    tagline: "SUPER SAVER",
    subtitle: "Cute studs, nose pins, minimal ear cuffs and rings at steal prices.",
    ctaText: "Shop Under ₹99 →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    badge: "Under ₹99",
  },
  {
    id: "banner-under-499",
    title: "Daily Luxury Under ₹499",
    tagline: "POCKET-FRIENDLY",
    subtitle: "Anti-tarnish, everyday chic pieces that look luxurious.",
    ctaText: "Shop Under ₹499 →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
    badge: "Under ₹499",
  },
  {
    id: "banner-under-999",
    title: "Best Value Under ₹999",
    tagline: "STATEMENT FINDS",
    subtitle: "925 sterling silver, luxury zirconia and curated gift sets.",
    ctaText: "Shop Under ₹999 →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    badge: "Under ₹999",
  },
  {
    id: "banner-trending",
    title: "Trending Sensation",
    tagline: "HOT PICKS",
    subtitle: "Most loved Instagram and Pinterest jewellery picks.",
    ctaText: "Explore Trending →",
    ctaLink: "#featured-finds",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    badge: "Trending",
  },
  {
    id: "banner-gift",
    title: "Curated Gift Picks",
    tagline: "GIFT READY",
    subtitle: "Thoughtful jewellery gift boxes for birthdays, anniversaries and festivals.",
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
    recommendedProductIds: ["prod-1"],
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
    recommendedProductIds: ["prod-3", "prod-5"],
  },
  {
    id: "guide-3",
    category: "Gift Ideas",
    title: "10 Jewellery Gift Ideas for Women Under ₹2,000",
    excerpt: "Thoughtful, high-perceived-value jewellery gifts under ₹2,000 that look luxurious and memorable.",
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
    recommendedProductIds: ["prod-2", "prod-10"],
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
    recommendedProductIds: ["prod-10"],
  },
  {
    id: "guide-5",
    category: "Jewellery Styling",
    title: "5 Ring Styles Every Woman Should Have in Her Collection",
    excerpt: "From classic solitaires to textured stackers and cocktail centerpieces, build a versatile ring wardrobe for every mood.",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80",
    content: `
### Building Your Personal Ring Wardrobe

Rings are the one piece of jewellery you get to admire yourself throughout the day. Curating distinct styles gives you infinite versatility:

#### 1. The Classic Solitaire
Timeless, graceful, and sparkling. A brilliant round or cushion-cut solitaire worn on the ring finger or index finger adds instant refinement to any manicure.

#### 2. Dainty Stackable Bands
Micro-twisted, pavé, or textured gold bands are made to be layered. Mix metals or stack two on one finger with a gap ring above the knuckle.

#### 3. The Statement Cocktail Ring
Featuring an emerald-cut or baguette stone, cocktail rings command attention and serve as conversation starters for celebrations and dinner parties.

#### 4. The Signet or Dome Ring
Smooth, sculptural gold dome rings bring a bold vintage 90s aesthetic that balances soft, feminine dresses with modern structure.

#### 5. Adjustable Tension Bands
Eliminate ring-sizing guesswork with flexible bands that comfortably shift between index, middle, or thumb depending on your daily mood.
    `,
    recommendedProductIds: ["prod-2", "prod-7"],
  },
  {
    id: "guide-6",
    category: "Buying Guides",
    title: "Gold vs. Silver: Which Metal Best Matches Your Skin Undertone?",
    excerpt: "Learn how to identify cool, warm, and neutral undertones to choose pieces that make your complexion glow.",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80",
    content: `
### Finding Your Signature Metal

Ever wonder why some jewellery makes your skin illuminate while other metals look dull? The secret lies in your skin's natural undertones.

#### 1. The Quick Vein Test
- **Cool Undertones**: If the veins on your inner wrist appear blue or purple, platinum, rhodium, and 925 sterling silver will naturally complement your radiance.
- **Warm Undertones**: If your veins appear green or olive, warm 14K/18K yellow gold and rich brass tones bring out your sun-kissed warmth.
- **Neutral Undertones**: If your veins appear blue-green, you can effortlessly rock both gold and silver, making mixed-metal looks your superpower.

#### 2. The White Fabric Contrast
Drape a pure stark white shirt near your neck, then a soft off-white cream scarf. If stark white looks best, silver is your match. If warm cream enhances your face, yellow gold is your hero.

#### 3. Breaking the Rules: Mixed Metals
Modern styling embraces mixing silver and gold together. Anchor the combination with a dual-toned watch or interlocking two-tone ring for intentional cohesion.
    `,
    recommendedProductIds: ["prod-1", "prod-2"],
  },
  {
    id: "guide-7",
    category: "Jewellery Styling",
    title: "The Minimalist Jewellery Blueprint for Everyday Office Wear",
    excerpt: "Look polished and professional with work-friendly accessories that never distract, snag, or make noise during meetings.",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=600&q=80",
    content: `
### Professional Polish: Workplace Jewellery Etiquette

In workplace settings, jewellery should elevate your authority and polish without becoming a noisy distraction.

#### The No-Clank Rule
Skip jangling arm stacks or loose charm bracelets that clatter against laptops and conference tables during presentations. Opt instead for a snug cuff or a sleek leather-strap watch.

#### Understated Studs & Huggies
Small gold huggies or crystal studs frame your face during Zoom video calls and face-to-face meetings while remaining completely comfortable under headsets.

#### Low-Profile Necklaces
A 16-inch solitaire pendant or thin snake chain peeking through a crisp button-down or collar blazer adds intentional sophistication without overpowering business formal attire.
    `,
    recommendedProductIds: ["prod-1", "prod-3"],
  },
  {
    id: "guide-8",
    category: "Buying Guides",
    title: "How to Build an Affordable Capsule Jewellery Collection on a Budget",
    excerpt: "The seven foundational pieces that pair with 90 percent of your wardrobe without overspending.",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1573408301185-9146fe634ad0?auto=format&fit=crop&w=600&q=80",
    content: `
### The 7 Essential Capsule Pieces

Just like a capsule wardrobe of white shirts and trench coats, a thoughtful capsule jewellery box saves you time every morning:

1. **A Pair of Small Gold Huggie Hoops**: Your daily morning go-to that looks chic with gym wear or tailored suits.
2. **A Solitaire Pendant Necklace**: Subtle sparkle that rests comfortably at your collarbone.
3. **A 925 Silver or Gold Stacking Ring**: Clean lines that add effortless detail to your hands.
4. **A Textured Chain Bracelet**: Adds structure when rolling up shirt sleeves.
5. **Freshwater Pearl Drops**: The effortless bridge between daywear and evening gatherings.
6. **A Statement Cocktail Ring**: When your outfit is basic, this adds instant personality.
7. **A Protective Storage Case**: Keeps your core collection dust-free, organized, and ready for travel.
    `,
    recommendedProductIds: ["prod-1", "prod-2", "prod-5", "prod-10"],
  },
  {
    id: "guide-9",
    category: "Jewellery Care",
    title: "Demystifying Anti-Tarnish & Waterproof Jewellery: PVD vs Flash Plating",
    excerpt: "Understand physical vapor deposition, stainless steel bases, and why anti-tarnish coating makes affordable pieces last.",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80",
    content: `
### Behind the Science of Modern Jewellery Plating

Traditional costume jewellery often turns green or discolors after light sweat or moisture. Modern technology has changed that:

#### What is PVD Coating?
PVD (Physical Vapor Deposition) is a high-tech vacuum process where 18K gold vapor is bonded molecularly to durable 316L surgical stainless steel. This creates a surface hardness ten times more durable than conventional electroplating.

#### Flash Plating vs. PVD
- **Standard Electroplating**: A thin layer of gold (0.1 to 0.5 microns) dipped over brass. Prone to wear if exposed to soaps or water.
- **PVD Vacuum Plating**: Bonds deeply with stainless steel, making it sweat-proof, shower-safe, and resistant to corrosion.

#### Caring for PVD Pieces
While PVD is remarkably resilient against water, avoid harsh bleach, chlorine pools, and abrasive cleaning pads to protect the mirror-like finish indefinitely.
    `,
    recommendedProductIds: ["prod-1", "prod-4", "prod-8"],
  },
  {
    id: "guide-10",
    category: "Jewellery Styling",
    title: "The Art of Layering Necklaces and Chains Without Tangling",
    excerpt: "The 3-layer proportion guide, chain thickness balance, and clasp tricks to keep layered necklaces untangled all day.",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80",
    content: `
### Master the Layered Neckline

Layering necklaces creates visual depth and elevates basic sweaters, tank tops, and dresses. Here is how to achieve the look without the tangle:

#### The 2-Inch Golden Rule
Always separate each chain by at least 2 inches in length:
- **Base Layer**: 14" to 15" Choker (flat herringbone or collar chain)
- **Mid Layer**: 16" to 18" Medium Link (paperclip or rope chain)
- **Drop Layer**: 20" to 22" Pendant (coin, locket, or gemstone drop)

#### Mix Different Textures
Never layer two identical delicate cable chains together, as their links naturally weave into knots. Instead, combine a flat wide chain with a round link and a pendant.

#### Use Multi-Strand Magnetic Detanglers
Inexpensive layered necklace spacer clasps hold two or three chains at fixed intervals behind your neck, preventing rotation and twists throughout the day.
    `,
    recommendedProductIds: ["prod-3", "prod-5", "prod-9"],
  },
  {
    id: "guide-11",
    category: "Jewellery Styling",
    title: "How to Choose Earrings That Flatter Your Face Shape",
    excerpt: "Match drops, studs, chandeliers, and hoops to Round, Oval, Square, and Heart face shapes for balance.",
    readTime: "5 min read",
    imageUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    content: `
### Complementing Your Natural Bone Structure

The right earring silhouette can highlight your cheekbones, soften jawlines, and elongate your neck:

#### 1. Round Face Shapes
Elongate your features with linear drops, dangling geometric silhouettes, and slim chandeliers that draw the eye downward. Avoid wide circular studs.

#### 2. Oval Face Shapes
Oval faces enjoy natural symmetry and can wear almost any earring silhouette, especially teardrops, oval hoops, and sculptural huggies.

#### 3. Square Face Shapes
Soften angular cheekbones and jawlines with circular hoops, curving teardrops, and flowing rounded drops.

#### 4. Heart Face Shapes
Heart faces with wider foreheads and tapered chins look stunning with wider triangular drops and chandeliers that add gentle volume near the jawline.
    `,
    recommendedProductIds: ["prod-1", "prod-6"],
  },
  {
    id: "guide-12",
    category: "Jewellery Styling",
    title: "Statement Party Jewellery Trends: Glamour Ideas for Celebrations",
    excerpt: "From sparkling crystal cuffs to bold drop earrings, discover festive jewellery combinations for cocktail parties and weddings.",
    readTime: "4 min read",
    imageUrl: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=600&q=80",
    content: `
### Party Season: Shine With Intention

When attending weddings, dinner parties, or festival soirees, make your accessories do the talking with these styling combinations:

#### 1. The Single Statement Focal Point
If wearing oversized chandelier earrings, skip heavy necklaces and wear a delicate tennis bracelet and cocktail ring instead. Balancing focal points creates sophisticated elegance.

#### 2. Crystal & Emerald Accents
Deep bottle-green and rich ruby cubic zirconia stones set in yellow gold replicate the timeless grandeur of royal heritage jewellery at a fraction of the cost.

#### 3. Stacked Ear Cuffs
No extra piercings needed: clip-on ear cuffs allow you to construct an edgy constellation ear stack that pairs sensationally with slicked-back buns and evening gowns.
    `,
    recommendedProductIds: ["prod-6", "prod-7", "prod-9"],
  },
];

export const INITIAL_COMMISSIONS: AmazonCommissionItem[] = [];

export const INITIAL_COLLECTIONS: WishlistCollection[] = [];
