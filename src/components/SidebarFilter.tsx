'use client';

import React from 'react';
import { X, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

interface SidebarFilterProps {
  isDrawer?: boolean;
}

export const SidebarFilter: React.FC<SidebarFilterProps> = ({ isDrawer = false }) => {
  const {
    filters,
    setFilter,
    clearFilters,
    isFilterDrawerOpen,
    setIsFilterDrawerOpen,
    categories,
    products,
  } = useApp();

  const sortOptions = [
    { value: 'relevance', label: 'Relevance' },
    { value: 'popularity', label: 'Popularity (Most Viewed)' },
    { value: 'newest', label: 'Newest First' },
    { value: 'price-asc', label: 'Price: Low to High' },
    { value: 'price-desc', label: 'Price: High to Low' },
    { value: 'discount', label: 'Highest Discount' },
  ];

  const priceRanges = [
    'All',
    'Under ₹99',
    'Under ₹499',
    'Under ₹999',
    '₹1,001 - ₹2,000',
    '₹2,001 - ₹5,000',
    '₹5,001+',
  ];

  const customerRatings = [
    'All',
    '4★ & above',
    '3★ & above',
  ];

  const styles = ['All', 'Minimal', 'Traditional', 'Trendy', 'Classic', 'Boho'];
  const materials = ['All', 'Gold Plated', 'Silver', 'Stainless Steel', 'Pearl', 'Other'];
  const occasions = ['All', 'Daily Wear', 'Office Wear', 'Party Wear', 'Wedding', 'Festive'];
  const discounts = ['All', '10%+', '20%+', '30%+', '50%+'];

  // Extract unique brands from products
  const brands = ['All', ...Array.from(new Set(products.map(p => p.brand))).filter(Boolean)];

  const content = (
    <div className="space-y-6 text-[#2D2427]">
      {/* Title & Clear All Header (for drawer or desktop) */}
      <div className="flex items-center justify-between pb-3 border-b border-[#F4D3DA]">
        <div className="flex items-center gap-2 font-serif text-lg font-medium text-[#2D2427]">
          <SlidersHorizontal className="w-4 h-4 text-[#BA4A6E]" />
          <span>Filters & Sort Options</span>
        </div>
        {isDrawer && (
          <button
            onClick={() => setIsFilterDrawerOpen(false)}
            className="p-1 rounded-full text-[#8C7E83] hover:text-[#BA4A6E] hover:bg-[#FDF0F3]"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* 1. Sort By Radio / Pill Group */}
      <div className="space-y-2.5">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Sort By
        </label>
        <div className="space-y-1.5">
          {sortOptions.map((opt) => (
            <label
              key={opt.value}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs cursor-pointer transition-colors ${
                filters.sortBy === opt.value
                  ? 'bg-[#FCEEF0] text-[#BA4A6E] font-semibold border border-[#F4D3DA]'
                  : 'text-[#4A3E42] hover:bg-pink-50/50'
              }`}
            >
              <input
                type="radio"
                name="sortBy"
                value={opt.value}
                checked={filters.sortBy === opt.value}
                onChange={() => setFilter('sortBy', opt.value as any)}
                className="text-[#BA4A6E] focus:ring-[#BA4A6E] accent-[#BA4A6E]"
              />
              <span>{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 2. Category Facet */}
      <div className="space-y-2.5 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Category
        </label>
        <div className="space-y-1.5 max-h-44 overflow-y-auto pr-1">
          <label
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
              filters.category === 'All' ? 'font-semibold text-[#BA4A6E]' : 'text-[#6E6266]'
            }`}
          >
            <input
              type="radio"
              name="category"
              checked={filters.category === 'All'}
              onChange={() => setFilter('category', 'All')}
              className="accent-[#BA4A6E]"
            />
            <span>All Categories</span>
          </label>
          {categories.map((cat) => (
            <label
              key={cat.id}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
                filters.category.toLowerCase() === cat.name.toLowerCase()
                  ? 'font-semibold text-[#BA4A6E]'
                  : 'text-[#6E6266] hover:text-[#BA4A6E]'
              }`}
            >
              <input
                type="radio"
                name="category"
                checked={filters.category.toLowerCase() === cat.name.toLowerCase()}
                onChange={() => setFilter('category', cat.name)}
                className="accent-[#BA4A6E]"
              />
              <span>{cat.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 3. Price Range Facet */}
      <div className="space-y-2.5 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Price Range
        </label>
        <div className="space-y-1.5">
          {priceRanges.map((range) => (
            <label
              key={range}
              className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
                filters.priceRange === range ? 'font-semibold text-[#BA4A6E]' : 'text-[#6E6266]'
              }`}
            >
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange === range}
                onChange={() => setFilter('priceRange', range)}
                className="accent-[#BA4A6E]"
              />
              <span>{range === 'All' ? 'Any Price' : range}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 4. Brand Dropdown Selector */}
      <div className="space-y-2 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Brand
        </label>
        <select
          value={filters.brand}
          onChange={(e) => setFilter('brand', e.target.value)}
          className="w-full text-xs px-3 py-2 rounded-xl bg-[#FFF9FA] border border-[#F4D3DA] text-[#2D2427] focus:outline-none focus:border-[#BA4A6E]"
        >
          {brands.map((b) => (
            <option key={b} value={b}>
              {b === 'All' ? 'All Brands' : b}
            </option>
          ))}
        </select>
      </div>

      {/* 5. Style Facet */}
      <div className="space-y-2 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Style
        </label>
        <div className="grid grid-cols-2 gap-1.5">
          {styles.map((style) => (
            <button
              key={style}
              type="button"
              onClick={() => setFilter('style', style)}
              className={`px-2.5 py-1.5 rounded-lg text-xs text-center border transition-all ${
                filters.style === style
                  ? 'bg-[#BA4A6E] text-white border-[#BA4A6E] font-medium'
                  : 'bg-white border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
              }`}
            >
              {style}
            </button>
          ))}
        </div>
      </div>

      {/* 6. Material Facet */}
      <div className="space-y-2 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Material
        </label>
        <div className="space-y-1.5">
          {materials.map((mat) => (
            <label
              key={mat}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
                filters.material === mat ? 'font-semibold text-[#BA4A6E]' : 'text-[#6E6266]'
              }`}
            >
              <input
                type="radio"
                name="material"
                checked={filters.material === mat}
                onChange={() => setFilter('material', mat)}
                className="accent-[#BA4A6E]"
              />
              <span>{mat === 'All' ? 'All Materials' : mat}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 7. Occasion Facet */}
      <div className="space-y-2 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Occasion
        </label>
        <div className="space-y-1.5">
          {occasions.map((occ) => (
            <label
              key={occ}
              className={`flex items-center gap-2 px-2.5 py-1 rounded-lg text-xs cursor-pointer ${
                filters.occasion === occ ? 'font-semibold text-[#BA4A6E]' : 'text-[#6E6266]'
              }`}
            >
              <input
                type="radio"
                name="occasion"
                checked={filters.occasion === occ}
                onChange={() => setFilter('occasion', occ)}
                className="accent-[#BA4A6E]"
              />
              <span>{occ === 'All' ? 'All Occasions' : occ}</span>
            </label>
          ))}
        </div>
      </div>

      {/* 8. Discount Facet */}
      <div className="space-y-2 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Discount
        </label>
        <div className="flex flex-wrap gap-1.5">
          {discounts.map((disc) => (
            <button
              key={disc}
              type="button"
              onClick={() => setFilter('discount', disc)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                filters.discount === disc
                  ? 'bg-[#BA4A6E] text-white border-[#BA4A6E]'
                  : 'bg-white border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
              }`}
            >
              {disc === 'All' ? 'Any' : disc}
            </button>
          ))}
        </div>
      </div>

      {/* 9. Customer Rating Facet (Flipkart Style) */}
      <div className="space-y-2 pt-2 border-t border-pink-50">
        <label className="text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
          Customer Ratings
        </label>
        <div className="flex flex-wrap gap-1.5">
          {customerRatings.map((rat) => (
            <button
              key={rat}
              type="button"
              onClick={() => setFilter('rating', rat)}
              className={`px-3 py-1 rounded-full text-xs font-medium border transition-colors ${
                (filters.rating || 'All') === rat
                  ? 'bg-[#BA4A6E] text-white border-[#BA4A6E]'
                  : 'bg-white border-[#F4D3DA] text-[#6E6266] hover:border-[#BA4A6E]'
              }`}
            >
              {rat === 'All' ? 'Any' : rat}
            </button>
          ))}
        </div>
      </div>

      {/* Controls: Apply Filters & Clear All */}
      <div className="pt-4 space-y-2 border-t border-[#F4D3DA]">
        <button
          type="button"
          onClick={() => {
            if (isDrawer) setIsFilterDrawerOpen(false);
            const el = document.getElementById('featured-finds');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          className="w-full btn-mauve py-2.5 rounded-xl text-xs font-semibold tracking-wide shadow-sm"
        >
          Apply Filters
        </button>

        <button
          type="button"
          onClick={clearFilters}
          className="w-full py-2.5 rounded-xl text-xs font-semibold text-[#BA4A6E] border border-[#F4D3DA] hover:bg-[#FDF0F3] transition-colors flex items-center justify-center gap-1.5"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Clear All</span>
        </button>
      </div>
    </div>
  );

  if (isDrawer) {
    if (!isFilterDrawerOpen) return null;

    return (
      <div className="fixed inset-0 z-50 overflow-hidden">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity animate-fadeIn"
          onClick={() => setIsFilterDrawerOpen(false)}
        />
        {/* Slide-over Drawer Panel */}
        <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
          <div className="w-screen max-w-sm bg-[#FFF9FA] p-6 pb-[max(2rem,env(safe-area-inset-bottom))] pr-[max(1.5rem,env(safe-area-inset-right))] shadow-2xl overflow-y-auto overscroll-contain">
            {content}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="filters-sidebar" className="bg-white rounded-3xl border border-[#F4D3DA]/80 p-6 shadow-card sticky top-24">
      {content}
    </div>
  );
};
