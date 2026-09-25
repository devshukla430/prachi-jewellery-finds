'use client';

import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const HeroSection: React.FC = () => {
  const { settings, products } = useApp();

  const handleExploreClick = () => {
    const el = document.getElementById('featured-finds');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFF9FA] via-[#FDF3F5] to-[#FFF9FA] py-8 sm:py-12 lg:py-20 border-b border-[#F4D3DA]/50">
      
      {/* Decorative Botanical Doodles / Leaf SVG background accents */}
      <div className="absolute top-6 left-4 pointer-events-none opacity-20 hidden md:block">
        <svg width="120" height="180" viewBox="0 0 100 150" fill="none" stroke="#BA4A6E" strokeWidth="1.5">
          <path d="M50 140 C50 140, 48 80, 50 10" />
          <path d="M50 110 C35 100, 20 105, 15 95 C25 85, 45 95, 50 100" />
          <path d="M50 90 C65 80, 80 85, 85 75 C75 65, 55 75, 50 80" />
          <path d="M50 60 C35 50, 20 55, 15 45 C25 35, 45 45, 50 50" />
          <path d="M50 40 C65 30, 80 35, 85 25 C75 15, 55 25, 50 30" />
        </svg>
      </div>

      <div className="absolute bottom-4 right-10 pointer-events-none opacity-20 hidden lg:block">
        <svg width="100" height="140" viewBox="0 0 100 140" fill="none" stroke="#D4AF37" strokeWidth="1.5">
          <path d="M50 130 Q50 60 70 10" />
          <path d="M50 100 Q20 90 25 75 Q45 75 52 90" />
          <path d="M55 70 Q85 60 80 45 Q60 45 57 60" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Headline & Value Proposition */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left z-10">
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FCEEF0] border border-[#F4D3DA] text-[#BA4A6E] text-xs font-semibold tracking-wider uppercase shadow-soft">
              <Sparkles className="w-3.5 h-3.5 text-[#BA4A6E]" />
              <span>{settings.heroTag || "CURATED WITH LOVE ♡"}</span>
            </div>

            {/* H1 Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-medium text-[#2D2427] leading-[1.15] tracking-tight">
              {settings.heroHeadline || "Discover Jewellery You'll Love"}
            </h1>

            {/* Subtitle */}
            <p className="text-base sm:text-lg text-[#6E6266] max-w-xl mx-auto lg:mx-0 font-light leading-relaxed">
              {settings.heroSubtitle || "Handpicked styles, latest trends and timeless pieces — all from Amazon, just for you!"}
            </p>

            {/* Action Button */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <button
                onClick={handleExploreClick}
                className="btn-mauve px-8 py-3.5 rounded-full text-sm font-semibold tracking-wide flex items-center gap-2 shadow-hover group"
              >
                <span>{settings.heroCtaText || "Explore Finds →"}</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <div className="flex items-center gap-2 text-xs text-[#8C7E83]">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Curated Finds • Discover • Compare • Choose</span>
              </div>
            </div>

            {/* Highlights ticker pills */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-2.5 text-xs text-[#6E6266]">
              <span className="px-3 py-1 rounded-full bg-white/70 border border-[#F4D3DA]/60">Anti-Tarnish Finishes</span>
              <span className="px-3 py-1 rounded-full bg-white/70 border border-[#F4D3DA]/60">925 Sterling Silver</span>
              <span className="px-3 py-1 rounded-full bg-white/70 border border-[#F4D3DA]/60">Gift Ready Packaging</span>
            </div>
          </div>

          {/* Right Column: High-Res Lifestyle Imagery */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Soft decorative glow background behind photo */}
              <div className="absolute -inset-2 bg-gradient-to-tr from-[#F4D3DA] to-[#FCEEF0] rounded-[2.5rem] transform -rotate-1 opacity-70 blur-sm"></div>

              {/* Main Image Container with luxury border & shadow */}
              <div className="relative overflow-hidden rounded-[2rem] border-2 border-white/80 shadow-card bg-[#FDF0F3]">
                <img
                  src={settings.heroImageUrl || "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=80"}
                  alt="Model wearing curated minimalist gold and pearl jewellery"
                  className="w-full h-[280px] sm:h-[380px] lg:h-[460px] object-cover object-center transform hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Romantic Overlay Card / Badge */}
                {/* Dynamic Overlay Card / Badge */}
                {products.length > 0 ? (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-soft flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
                        <img
                          src={products[0].imageUrl}
                          alt={products[0].title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="max-w-[170px] truncate">
                        <div className="text-xs font-semibold text-[#2D2427] truncate">{products[0].title}</div>
                        <div className="text-[11px] text-[#BA4A6E] font-medium">★ {products[0].rating} · {products[0].reviewsCount} Reviews</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#2D2427] bg-[#FCEEF0] px-2.5 py-1 rounded-lg flex-shrink-0">
                      ₹{products[0].offerPrice}
                    </span>
                  </div>
                ) : (
                  <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-3.5 rounded-2xl border border-white/60 shadow-soft flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#BA4A6E] to-[#F4D3DA] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
                        <Sparkles className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-[#2D2427]">Prachi Jewellery Finds</div>
                        <div className="text-[11px] text-[#BA4A6E] font-medium">Handpicked Amazon Curation</div>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-[#BA4A6E] bg-[#FCEEF0] px-2.5 py-1 rounded-lg">
                      100% Genuine
                    </span>
                  </div>
                )}
              </div>

              {/* Small floating Pinterest Pin badge on the hero photo */}
              <div className="absolute -top-3 -right-3 bg-white text-[#E60023] p-2 rounded-full shadow-lg border border-pink-100 flex items-center gap-1 text-[11px] font-bold px-3">
                <svg className="w-3.5 h-3.5 fill-[#E60023]" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.747-7.25 7.915-7.25 4.197 0 7.458 2.991 7.458 6.993 0 4.173-2.631 7.525-6.283 7.525-1.226 0-2.379-.637-2.774-1.391l-.755 2.876c-.273 1.045-1.012 2.355-1.508 3.155C10.126 23.834 11.047 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                <span>Trending on Pinterest</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
