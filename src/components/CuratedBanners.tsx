'use client';

import React from 'react';
import { ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CuratedBanners: React.FC = () => {
  const { banners, setFilter } = useApp();

  const handleBannerClick = (banner: { title: string; badge?: string }) => {
    const text = `${banner.badge || ''} ${banner.title}`.toLowerCase();
    if (text.includes('99') && !text.includes('499') && !text.includes('999')) {
      setFilter('priceRange', 'Under ₹99');
    } else if (text.includes('499')) {
      setFilter('priceRange', 'Under ₹499');
    } else if (text.includes('999')) {
      setFilter('priceRange', 'Under ₹999');
    } else if (text.includes('trending')) {
      setFilter('sortBy', 'popularity');
    } else if (text.includes('gift')) {
      setFilter('category', 'Gift Ideas');
    }

    const el = document.getElementById('featured-finds');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="py-10 bg-[#FFF9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <span className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.25em] text-[#BA4A6E]">
              Curated Collections
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2D2427] mt-0.5">
              Shop by Budget & Style
            </h2>
          </div>
          <span className="hidden sm:inline-block text-xs text-[#8C7E83]">
            {banners.length} Curated Categories
          </span>
        </div>

        {/* Responsive Track: Smooth Swipe on Mobile & Multi-col Grid on Desktop */}
        <div className="flex sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 overflow-x-auto no-scrollbar pb-3 pt-1 px-1 snap-x">
          {banners.map((banner) => {
            const badgeText = banner.badge || banner.tagline;
            const is99 = badgeText.includes('99') && !badgeText.includes('499') && !badgeText.includes('999');
            const is499 = badgeText.includes('499');
            const is999 = badgeText.includes('999');

            return (
              <div
                key={banner.id}
                onClick={() => handleBannerClick(banner)}
                className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#FDF0F3] via-[#FCEEF0] to-[#F8E2E6] border border-[#F4D3DA] p-6 sm:p-7 shadow-card hover:shadow-hover hover:border-[#BA4A6E]/50 transition-all duration-300 cursor-pointer flex flex-col justify-between min-w-[280px] sm:min-w-0 snap-center shrink-0 sm:shrink"
              >
                {/* Subtle background decoration circle */}
                <div className="absolute -top-10 -right-10 w-36 h-36 bg-white/40 rounded-full blur-xl pointer-events-none"></div>

                <div className="relative z-10 space-y-2">
                  <span
                    className={`inline-block text-[10px] font-bold uppercase tracking-[0.2em] px-3 py-1 rounded-full shadow-xs ${
                      is99
                        ? 'bg-[#BA4A6E] text-white'
                        : is499
                        ? 'bg-[#D4AF37] text-white'
                        : is999
                        ? 'bg-[#2D2427] text-white'
                        : 'bg-white/90 text-[#BA4A6E]'
                    }`}
                  >
                    {badgeText}
                  </span>

                  <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#2D2427] pt-1">
                    {banner.title}
                  </h3>

                  <p className="text-xs text-[#6E6266] leading-relaxed max-w-[230px]">
                    {banner.subtitle}
                  </p>
                </div>

                {/* Bottom Row: CTA Link + Circular image thumbnail */}
                <div className="relative z-10 flex items-end justify-between mt-6 pt-2">
                  <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BA4A6E] group-hover:text-[#A03B5C]">
                    <span>{banner.ctaText}</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>

                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden bg-white/90 p-1 border border-white shadow-soft flex-shrink-0">
                    <img
                      src={banner.imageUrl}
                      alt={banner.title}
                      className="w-full h-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500 ease-out"
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
