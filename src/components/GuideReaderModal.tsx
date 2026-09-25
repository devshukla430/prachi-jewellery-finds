'use client';

import React from 'react';
import { X, Clock, Sparkles, ArrowUpRight, Heart } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const GuideReaderModal: React.FC = () => {
  const { activeGuide, setActiveGuide, products, isLiked, toggleLike, trackAffiliateClick } = useApp();

  if (!activeGuide) return null;

  // Retrieve products recommended in this guide
  const recommendedProducts = products.filter(p =>
    activeGuide.recommendedProductIds?.includes(p.id)
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveGuide(null)}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl overflow-hidden z-10 my-auto sm:my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveGuide(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 backdrop-blur-sm text-[#2D2427] hover:text-[#BA4A6E] shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Hero Cover Image */}
        <div className="relative aspect-[21/9] w-full overflow-hidden bg-rose-50">
          <img
            src={activeGuide.imageUrl}
            alt={activeGuide.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
          
          <div className="absolute bottom-4 left-6 right-6 text-white space-y-1">
            <span className="bg-[#BA4A6E] text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-0.5 rounded-full">
              {activeGuide.category}
            </span>
            <h2 className="text-xl sm:text-2xl font-serif font-medium leading-tight">
              {activeGuide.title}
            </h2>
            <div className="flex items-center gap-3 text-xs text-white/80 pt-1">
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>{activeGuide.readTime}</span>
              </span>
              <span>•</span>
              <span>Curated by Prachi Style Team</span>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <div className="p-6 sm:p-8 max-h-[60vh] overflow-y-auto space-y-6">
          <p className="text-sm text-[#6E6266] italic border-l-2 border-[#BA4A6E] pl-4 font-light leading-relaxed">
            {activeGuide.excerpt}
          </p>

          <div className="text-xs sm:text-sm text-[#3E3437] space-y-4 leading-relaxed whitespace-pre-line font-light">
            {activeGuide.content}
          </div>

          {/* Embedded Amazon Product Recommendations */}
          {recommendedProducts.length > 0 && (
            <div className="mt-8 pt-6 border-t border-[#F4D3DA] space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BA4A6E]">
                <Sparkles className="w-4 h-4" />
                <span>Featured Amazon Picks in this Guide</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {recommendedProducts.map((prod) => (
                  <div
                    key={prod.id}
                    className="flex items-center gap-3 p-3 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] hover:border-[#BA4A6E]/40 shadow-xs transition-all"
                  >
                    <div className="w-16 h-16 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
                      <img src={prod.imageUrl} alt={prod.title} className="w-full h-full object-cover" />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-medium text-[#2D2427] truncate">
                        {prod.title}
                      </h4>
                      <div className="flex items-baseline gap-2 mt-0.5">
                        <span className="text-xs font-bold text-[#2D2427]">₹{prod.offerPrice}</span>
                        <span className="text-[10px] text-gray-400 line-through">₹{prod.mrp}</span>
                        <span className="text-[10px] text-[#BA4A6E] font-semibold">{prod.discountPercent}% off</span>
                      </div>
                      <button
                        onClick={() => trackAffiliateClick(prod)}
                        className="mt-1.5 inline-flex items-center gap-1 text-[11px] font-semibold text-[#BA4A6E] hover:underline"
                      >
                        <span>View on Amazon</span>
                        <ArrowUpRight className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => toggleLike(prod.id)}
                      className="p-1.5 rounded-full text-[#8C7E83] hover:text-[#BA4A6E]"
                    >
                      <Heart className={`w-4 h-4 ${isLiked(prod.id) ? 'fill-[#BA4A6E] text-[#BA4A6E]' : ''}`} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-[#FDF6F7] border-t border-[#F4D3DA] flex items-center justify-between text-xs text-[#6E6266]">
          <span>Found this helpful? Share on Pinterest or explore more guides.</span>
          <button
            onClick={() => setActiveGuide(null)}
            className="btn-mauve px-4 py-1.5 rounded-lg text-xs font-semibold"
          >
            Close Guide
          </button>
        </div>

      </div>
    </div>
  );
};
