'use client';

import React, { useState, useEffect } from 'react';
import { Search, X, ArrowUpRight, TrendingUp, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const SearchModal: React.FC = () => {
  const {
    isSearchModalOpen,
    setIsSearchModalOpen,
    products,
    categories,
    setFilter,
    setActiveQuickViewProduct,
    trackAffiliateClick,
    getAffiliateUrl,
  } = useApp();

  const [query, setQuery] = useState('');

  useEffect(() => {
    if (!isSearchModalOpen) {
      setQuery('');
    }
  }, [isSearchModalOpen]);

  if (!isSearchModalOpen) return null;

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.title.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.brand.toLowerCase().includes(query.toLowerCase()) ||
          (p.description && p.description.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSelectProduct = (prod: any) => {
    setIsSearchModalOpen(false);
    setActiveQuickViewProduct(prod);
  };

  const handleCategoryShortcut = (catName: string) => {
    setFilter('category', catName);
    setIsSearchModalOpen(false);
    const el = document.getElementById('featured-finds');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-4 sm:pt-12 md:pt-20 px-4 animate-fadeIn overflow-y-auto">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsSearchModalOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl overflow-hidden z-10 my-auto sm:my-0">
        
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#F4D3DA] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#BA4A6E] flex-shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search gold hoops, solitaire rings, butterfly sets, Giva..."
            className="w-full text-sm sm:text-base text-[#2D2427] placeholder:text-[#A59499] focus:outline-none bg-transparent"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full text-gray-400 hover:text-gray-600 text-xs"
            >
              Clear
            </button>
          )}
          <button
            onClick={() => setIsSearchModalOpen(false)}
            className="p-1.5 rounded-full text-[#8C7E83] hover:text-[#BA4A6E] hover:bg-[#FDF0F3]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-5">
          {query.trim() === '' ? (
            <div className="space-y-5">
              {/* Quick Trending Searches */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A59499]">
                  <TrendingUp className="w-3.5 h-3.5 text-[#BA4A6E]" />
                  <span>Trending Searches</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Gold Hoop Earrings', 'Solitaire Ring', 'Pearl Bracelet', 'Butterfly Set', 'Mia by Tanishq', 'Gift Ideas'].map((tag) => (
                    <button
                      key={tag}
                      onClick={() => setQuery(tag)}
                      className="px-3 py-1.5 rounded-full text-xs bg-[#FFF9FA] hover:bg-[#FDF0F3] border border-[#F4D3DA] text-[#4A3E42] hover:text-[#BA4A6E] transition-colors"
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Browse by Categories */}
              <div className="space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#A59499]">
                  <Sparkles className="w-3.5 h-3.5 text-[#BA4A6E]" />
                  <span>Browse Categories</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryShortcut(cat.name)}
                      className="flex items-center gap-2.5 p-2 rounded-xl border border-[#F4D3DA]/60 hover:border-[#BA4A6E] bg-white hover:bg-[#FDF0F3] transition-colors text-left"
                    >
                      <div className="w-8 h-8 rounded-lg overflow-hidden bg-rose-50 flex-shrink-0">
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=300&q=80';
                          }}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <span className="text-xs font-medium text-[#2D2427]">{cat.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : results.length === 0 ? (
            <div className="text-center py-12 space-y-2">
              <p className="text-sm font-medium text-[#2D2427]">No jewellery finds found for "{query}"</p>
              <p className="text-xs text-[#8C7E83]">Try searching for earrings, rings, necklaces, or brands like Giva.</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="text-xs font-semibold text-[#8C7E83]">
                Found {results.length} jewellery finds
              </div>
              <div className="space-y-2.5">
                {results.map((prod) => {
                  const finalUrl = getAffiliateUrl(prod);

                  return (
                    <div
                      key={prod.id}
                      onClick={() => handleSelectProduct(prod)}
                      className="flex items-center justify-between p-3 rounded-2xl bg-[#FFF9FA] hover:bg-[#FDF0F3] border border-[#F4D3DA] cursor-pointer transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-xl overflow-hidden bg-white flex-shrink-0">
                          <img
                            src={prod.imageUrl}
                            alt={prod.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-xs font-medium text-[#2D2427] group-hover:text-[#BA4A6E] line-clamp-1">
                            {prod.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-xs font-bold text-[#2D2427]">₹{prod.offerPrice}</span>
                            <span className="text-[11px] text-gray-400 line-through">₹{prod.mrp}</span>
                            <span className="text-[10px] text-[#BA4A6E] font-medium">{prod.category}</span>
                          </div>
                        </div>
                      </div>

                      <a
                        href={finalUrl}
                        target="_blank"
                        rel="sponsored nofollow noopener"
                        onClick={(e) => {
                          e.stopPropagation();
                          trackAffiliateClick(prod);
                        }}
                        className="btn-mauve px-3 py-1.5 rounded-lg text-[11px] font-semibold flex items-center gap-1 flex-shrink-0"
                      >
                        <span>Amazon</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </a>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
