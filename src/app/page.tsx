'use client';

import React, { useState } from 'react';
import { Sparkles, SlidersHorizontal, ArrowUpDown, Star, X } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { AnnouncementBar } from '../components/AnnouncementBar';
import { Navbar } from '../components/Navbar';
import { HeroSection } from '../components/HeroSection';
import { CategoryCarousel } from '../components/CategoryCarousel';
import { TrustBadges } from '../components/TrustBadges';
import { ProductCard } from '../components/ProductCard';
import { CuratedBanners } from '../components/CuratedBanners';
import { JewelleryGuides } from '../components/JewelleryGuides';
import { NewsletterBar } from '../components/NewsletterBar';
import { Footer } from '../components/Footer';
import { SidebarFilter } from '../components/SidebarFilter';
import { LikedDrawer } from '../components/LikedDrawer';
import { AuthModal } from '../components/AuthModal';
import { SearchModal } from '../components/SearchModal';
import { GuideReaderModal } from '../components/GuideReaderModal';
import { QuickViewModal } from '../components/QuickViewModal';
import { MobileBottomNav } from '../components/MobileBottomNav';

export default function HomePage() {
  const {
    products,
    filteredProducts,
    filters,
    setFilter,
    clearFilters,
    setIsFilterDrawerOpen,
  } = useApp();

  const [showDesktopSidebar, setShowDesktopSidebar] = useState(false);

  const flipkartSortOptions: { id: 'relevance' | 'popularity' | 'newest' | 'price-asc' | 'price-desc' | 'discount'; label: string }[] = [
    { id: 'relevance', label: 'Relevance' },
    { id: 'popularity', label: 'Popularity' },
    { id: 'price-asc', label: 'Price -- Low to High' },
    { id: 'price-desc', label: 'Price -- High to Low' },
    { id: 'newest', label: 'Newest First' },
    { id: 'discount', label: 'Discount' },
  ];

  const categoryPills = [
    'All',
    'Earrings',
    'Rings',
    'Necklaces',
    'Bracelets',
    'Jewellery Sets',
    'Gift Ideas',
  ];

  const activeFiltersCount = [
    filters.category !== 'All',
    filters.priceRange !== 'All',
    filters.brand !== 'All',
    filters.style !== 'All',
    filters.material !== 'All',
    filters.occasion !== 'All',
    filters.discount !== 'All',
    filters.rating && filters.rating !== 'All',
    Boolean(filters.searchQuery?.trim()),
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF9FA] pb-16 lg:pb-0">
      
      {/* 1. Top Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Main Navigation Header */}
      <Navbar />

      <main className="flex-grow">
        {/* 3. Luxury Hero Section */}
        <HeroSection />

        {/* 4. Circular Category Quick-Nav Carousel */}
        <CategoryCarousel />

        {/* 5. Trust & Assurance Badges */}
        <TrustBadges />

        {/* 6. Featured Jewellery Finds Section */}
        <section id="featured-finds" className="py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto scroll-mt-24">
          
          {/* Header row & Flipkart-Style Sorting / Quick Filters */}
          <div className="space-y-4 mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-5 h-5 text-[#BA4A6E]" />
                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2D2427]">
                  Featured Jewellery Finds
                </h2>
                <span className="text-xs text-[#8C7E83] bg-[#FCEEF0] border border-[#F4D3DA] px-2.5 py-0.5 rounded-full font-medium">
                  {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {/* Desktop Category Filter Pills */}
                <div className="hidden lg:flex items-center gap-1.5 overflow-x-auto no-scrollbar">
                  {categoryPills.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setFilter('category', cat)}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-colors whitespace-nowrap ${
                        filters.category.toLowerCase() === cat.toLowerCase()
                          ? 'bg-[#BA4A6E] text-white shadow-xs'
                          : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:text-[#BA4A6E]'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Sidebar toggle button (only if products exist) */}
                {products.length > 0 && (
                  <button
                    onClick={() => setShowDesktopSidebar(!showDesktopSidebar)}
                    className={`hidden lg:flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-xl border transition-colors ${
                      showDesktopSidebar
                        ? 'bg-[#BA4A6E] text-white border-[#BA4A6E]'
                        : 'bg-white text-[#2D2427] border-[#F4D3DA] hover:border-[#BA4A6E]'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>{showDesktopSidebar ? 'Hide Filters' : 'Show Filters'}</span>
                  </button>
                )}

                {/* Mobile Filter Trigger (Flipkart Style) */}
                {products.length > 0 && (
                  <button
                    onClick={() => setIsFilterDrawerOpen(true)}
                    className="lg:hidden flex items-center gap-1.5 text-xs font-semibold px-3.5 py-2 rounded-xl bg-white text-[#BA4A6E] border border-[#F4D3DA] shadow-xs active:scale-95 transition-transform"
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
                  </button>
                )}
              </div>
            </div>

            {/* Flipkart-Style Sort by Bar */}
            <div className="bg-white rounded-2xl border border-[#F4D3DA] p-2.5 sm:px-4 sm:py-3 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div className="flex items-center gap-2 overflow-x-auto no-scrollbar text-xs">
                <span className="font-bold uppercase tracking-wider text-[#BA4A6E] flex items-center gap-1 whitespace-nowrap shrink-0 text-[11px]">
                  <ArrowUpDown className="w-3.5 h-3.5" />
                  <span>Sort By:</span>
                </span>
                <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar">
                  {flipkartSortOptions.map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() => setFilter('sortBy', opt.id)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                        filters.sortBy === opt.id
                          ? 'bg-[#BA4A6E] text-white font-semibold shadow-xs'
                          : 'bg-[#FFF9FA] hover:bg-[#FDF0F3] text-[#4A3E42] border border-[#F4D3DA]/60'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="hidden md:flex items-center text-xs text-[#8C7E83] whitespace-nowrap">
                <span>Showing <strong>{filteredProducts.length}</strong> of {products.length} finds</span>
              </div>
            </div>

            {/* Flipkart-Style Quick Filter Strip */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
              <span className="text-[11px] font-semibold text-[#8C7E83] whitespace-nowrap shrink-0 hidden sm:inline">
                Quick Picks:
              </span>

              {/* Under ₹99 Quick Chip */}
              <button
                onClick={() => setFilter('priceRange', filters.priceRange === 'Under ₹99' ? 'All' : 'Under ₹99')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  filters.priceRange === 'Under ₹99'
                    ? 'bg-[#BA4A6E] text-white shadow-xs'
                    : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
                }`}
              >
                <span>Under ₹99</span>
                {filters.priceRange === 'Under ₹99' && <X className="w-3 h-3" />}
              </button>

              {/* Under ₹499 Quick Chip */}
              <button
                onClick={() => setFilter('priceRange', filters.priceRange === 'Under ₹499' ? 'All' : 'Under ₹499')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  filters.priceRange === 'Under ₹499'
                    ? 'bg-[#BA4A6E] text-white shadow-xs'
                    : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
                }`}
              >
                <span>Under ₹499</span>
                {filters.priceRange === 'Under ₹499' && <X className="w-3 h-3" />}
              </button>

              {/* Under ₹999 Quick Chip */}
              <button
                onClick={() => setFilter('priceRange', filters.priceRange === 'Under ₹999' ? 'All' : 'Under ₹999')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  filters.priceRange === 'Under ₹999'
                    ? 'bg-[#BA4A6E] text-white shadow-xs'
                    : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
                }`}
              >
                <span>Under ₹999</span>
                {filters.priceRange === 'Under ₹999' && <X className="w-3 h-3" />}
              </button>

              {/* 4★ & above Rating Quick Chip */}
              <button
                onClick={() => setFilter('rating', (filters.rating || 'All') === '4★ & above' ? 'All' : '4★ & above')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  filters.rating === '4★ & above'
                    ? 'bg-[#BA4A6E] text-white shadow-xs'
                    : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
                }`}
              >
                <Star className={`w-3 h-3 ${filters.rating === '4★ & above' ? 'fill-white' : 'fill-[#D4AF37] text-[#D4AF37]'}`} />
                <span>4★ & above</span>
                {filters.rating === '4★ & above' && <X className="w-3 h-3" />}
              </button>

              {/* 50%+ OFF Quick Chip */}
              <button
                onClick={() => setFilter('discount', filters.discount === '50%+' ? 'All' : '50%+')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  filters.discount === '50%+'
                    ? 'bg-[#BA4A6E] text-white shadow-xs'
                    : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
                }`}
              >
                <span>50%+ OFF</span>
                {filters.discount === '50%+' && <X className="w-3 h-3" />}
              </button>

              {/* Gold Plated Quick Chip */}
              <button
                onClick={() => setFilter('material', filters.material === 'Gold Plated' ? 'All' : 'Gold Plated')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  filters.material === 'Gold Plated'
                    ? 'bg-[#BA4A6E] text-white shadow-xs'
                    : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
                }`}
              >
                <span>Gold Plated</span>
                {filters.material === 'Gold Plated' && <X className="w-3 h-3" />}
              </button>

              {/* Silver Quick Chip */}
              <button
                onClick={() => setFilter('material', filters.material === 'Silver' ? 'All' : 'Silver')}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1 ${
                  filters.material === 'Silver'
                    ? 'bg-[#BA4A6E] text-white shadow-xs'
                    : 'bg-white border border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
                }`}
              >
                <span>925 Silver</span>
                {filters.material === 'Silver' && <X className="w-3 h-3" />}
              </button>
            </div>
          </div>

          {/* Active Filter Chips bar (if any applied) */}
          {(filters.category !== 'All' ||
            filters.priceRange !== 'All' ||
            filters.brand !== 'All' ||
            filters.style !== 'All' ||
            filters.material !== 'All' ||
            filters.occasion !== 'All' ||
            filters.discount !== 'All' ||
            (filters.rating && filters.rating !== 'All') ||
            filters.searchQuery) && (
            <div className="mb-6 p-3 rounded-2xl bg-[#FDF0F3] border border-[#F4D3DA] flex flex-wrap items-center gap-2 text-xs">
              <span className="font-semibold text-[#BA4A6E]">Active Filters:</span>
              {filters.searchQuery && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Search: "{filters.searchQuery}"</span>
                  <button onClick={() => setFilter('searchQuery', '')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {filters.category !== 'All' && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Category: {filters.category}</span>
                  <button onClick={() => setFilter('category', 'All')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {filters.priceRange !== 'All' && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Price: {filters.priceRange}</span>
                  <button onClick={() => setFilter('priceRange', 'All')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {filters.rating && filters.rating !== 'All' && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Rating: {filters.rating}</span>
                  <button onClick={() => setFilter('rating', 'All')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {filters.brand !== 'All' && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Brand: {filters.brand}</span>
                  <button onClick={() => setFilter('brand', 'All')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {filters.material !== 'All' && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Material: {filters.material}</span>
                  <button onClick={() => setFilter('material', 'All')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {filters.style !== 'All' && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Style: {filters.style}</span>
                  <button onClick={() => setFilter('style', 'All')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              {filters.discount !== 'All' && (
                <span className="bg-white px-2.5 py-0.5 rounded-full border border-pink-200 flex items-center gap-1">
                  <span>Discount: {filters.discount}</span>
                  <button onClick={() => setFilter('discount', 'All')} className="text-gray-400 hover:text-gray-600">✕</button>
                </span>
              )}
              <button
                onClick={clearFilters}
                className="text-xs font-bold text-[#BA4A6E] hover:underline ml-2"
              >
                Reset All
              </button>
            </div>
          )}

          {/* Grid Layout or Customer-facing Drop Announcement */}
          {products.length === 0 ? (
            <div className="text-center py-16 sm:py-20 bg-gradient-to-b from-white via-[#FFF9FA] to-white rounded-3xl border border-[#F4D3DA] p-8 sm:p-12 space-y-4 shadow-card max-w-xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center mx-auto shadow-sm">
                <Sparkles className="w-7 h-7 stroke-[1.5] text-[#BA4A6E]" />
              </div>
              
              <div className="space-y-2">
                <h3 className="font-serif text-2xl font-medium text-[#2D2427]">
                  New Curated Finds Dropping Soon
                </h3>
                <p className="text-xs sm:text-sm text-[#6E6266] max-w-md mx-auto font-light leading-relaxed">
                  We are handpicking the newest anti-tarnish, waterproof, and viral jewellery trends from Amazon. Explore our styling guides below or check back soon for our latest drops!
                </p>
              </div>

              <div className="pt-2 flex items-center justify-center">
                <a
                  href="#guides"
                  className="btn-mauve px-7 py-3 rounded-full text-xs font-semibold shadow-hover inline-flex items-center gap-2"
                >
                  <span>Explore Jewellery Guides & Tips</span>
                </a>
              </div>
            </div>
          ) : filteredProducts.length === 0 ? (
            /* Empty Filter Results */
            <div className="text-center py-20 bg-white rounded-3xl border border-[#F4D3DA] p-8 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center mx-auto">
                <Sparkles className="w-8 h-8" />
              </div>
              <h3 className="font-serif text-xl font-medium text-[#2D2427]">
                No Matching Jewellery Finds Found
              </h3>
              <p className="text-xs text-[#8C7E83] max-w-sm mx-auto">
                Try adjusting or clearing your filters to see your added Amazon pieces.
              </p>
              <button
                onClick={clearFilters}
                className="btn-mauve px-6 py-2.5 rounded-full text-xs font-semibold"
              >
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Products Grid */}
              <div className={showDesktopSidebar ? "lg:col-span-9" : "lg:col-span-12"}>
                <div
                  className={`grid grid-cols-2 gap-3 sm:gap-5 ${
                    showDesktopSidebar
                      ? 'sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4'
                      : 'sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5'
                  }`}
                >
                  {filteredProducts.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>

              {/* Desktop Filter Sidebar */}
              {showDesktopSidebar && (
                <div className="hidden lg:block lg:col-span-3">
                  <SidebarFilter isDrawer={false} />
                </div>
              )}

            </div>
          )}

        </section>

        {/* 7. Curated Collection Banners (Trio Grid) */}
        <CuratedBanners />

        {/* 8. Latest Jewellery Guides (Editorial Section) */}
        <JewelleryGuides />

        {/* 9. Newsletter Lead Capture Bar */}
        <NewsletterBar />

      </main>

      {/* 10. Footer with Amazon Compliance Disclosures */}
      <Footer />

      {/* Fixed Mobile Bottom Navigation Bar */}
      <MobileBottomNav />

      {/* Modals & Slide-over Drawers */}
      <SidebarFilter isDrawer={true} />
      <LikedDrawer />
      <AuthModal />
      <SearchModal />
      <GuideReaderModal />
      <QuickViewModal />

    </div>
  );
}
