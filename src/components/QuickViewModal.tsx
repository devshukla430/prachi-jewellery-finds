'use client';

import React, { useState } from 'react';
import { X, Heart, Star, ArrowUpRight, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const QuickViewModal: React.FC = () => {
  const { activeQuickViewProduct, setActiveQuickViewProduct, isLiked, toggleLike, trackAffiliateClick, getAffiliateUrl } = useApp();
  const [imgSrc, setImgSrc] = useState(activeQuickViewProduct?.imageUrl || '');

  if (!activeQuickViewProduct) return null;

  const liked = isLiked(activeQuickViewProduct.id);
  const finalAmazonUrl = getAffiliateUrl(activeQuickViewProduct);

  const handlePinterestPin = () => {
    const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      typeof window !== 'undefined' ? window.location.href : 'https://prachi-jewellery-finds.vercel.app'
    )}&media=${encodeURIComponent(imgSrc || activeQuickViewProduct.imageUrl)}&description=${encodeURIComponent(
      `${activeQuickViewProduct.title} - Only ₹${activeQuickViewProduct.offerPrice} on Amazon via Prachi Jewellery Finds`
    )}`;

    if (typeof window !== 'undefined') {
      window.open(pinUrl, '_blank', 'width=750,height=600,toolbar=no,menubar=no');
    }
  };

  const handleAmazonLinkClick = () => {
    trackAffiliateClick(activeQuickViewProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity"
        onClick={() => setActiveQuickViewProduct(null)}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl overflow-hidden z-10 my-auto sm:my-8 max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={() => setActiveQuickViewProduct(null)}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-white/90 text-[#2D2427] hover:text-[#BA4A6E] shadow-sm transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Image */}
          <div className="relative bg-[#FAF3F5] p-6 flex flex-col items-center justify-center">
            <div className="relative aspect-square w-full rounded-2xl overflow-hidden shadow-card border border-white">
              <img
                src={imgSrc || activeQuickViewProduct.imageUrl}
                alt={activeQuickViewProduct.title}
                onError={() => setImgSrc('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80')}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Pinterest Share Button */}
            <div className="mt-4 flex items-center gap-3">
              <button
                onClick={handlePinterestPin}
                className="btn-pinterest bg-[#E60023] hover:bg-[#b8001c] text-white px-4 py-2 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.747-7.25 7.915-7.25 4.197 0 7.458 2.991 7.458 6.993 0 4.173-2.631 7.525-6.283 7.525-1.226 0-2.379-.637-2.774-1.391l-.755 2.876c-.273 1.045-1.012 2.355-1.508 3.155C10.126 23.834 11.047 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
                <span>Save to Pinterest</span>
              </button>

              <button
                onClick={() => toggleLike(activeQuickViewProduct.id)}
                className={`p-2 rounded-full border border-[#F4D3DA] ${
                  liked ? 'bg-rose-50 text-[#BA4A6E]' : 'bg-white text-gray-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${liked ? 'fill-[#BA4A6E]' : ''}`} />
              </button>
            </div>
          </div>

          {/* Right Column: Product Specs & Amazon CTA */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-4">
            <div className="space-y-3">
              {/* Badges & Category */}
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase font-bold tracking-wider text-[#BA4A6E] bg-[#FCEEF0] px-2.5 py-0.5 rounded-full">
                  {activeQuickViewProduct.category}
                </span>
                <span className="text-xs text-[#8C7E83]">• Brand: {activeQuickViewProduct.brand}</span>
              </div>

              {/* Title */}
              <h2 className="text-lg sm:text-xl font-serif font-medium text-[#2D2427] leading-snug">
                {activeQuickViewProduct.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 text-xs">
                <div className="flex items-center text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-[#D4AF37]" />
                  <span className="font-bold ml-1 text-[#2D2427]">{activeQuickViewProduct.rating}</span>
                </div>
                <span className="text-[#8C7E83]">({activeQuickViewProduct.reviewsCount} reviews)</span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-2.5 py-2 border-y border-pink-50">
                <span className="text-2xl font-bold text-[#2D2427]">
                  ₹{activeQuickViewProduct.offerPrice.toLocaleString('en-IN')}
                </span>
                <span className="text-sm text-gray-400 line-through">
                  ₹{activeQuickViewProduct.mrp.toLocaleString('en-IN')}
                </span>
                <span className="text-xs font-bold text-[#BA4A6E] bg-[#FCEEF0] px-2 py-0.5 rounded-full">
                  {activeQuickViewProduct.discountPercent}% OFF
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-[#6E6266] leading-relaxed font-light">
                {activeQuickViewProduct.description}
              </p>

              {/* Bullet Points */}
              {activeQuickViewProduct.bulletPoints && (
                <ul className="text-xs text-[#4A3E42] space-y-1.5 pt-1">
                  {activeQuickViewProduct.bulletPoints.map((bp, idx) => (
                    <li key={idx} className="flex items-start gap-1.5">
                      <span className="text-[#BA4A6E] font-bold">✓</span>
                      <span>{bp}</span>
                    </li>
                  ))}
                </ul>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 pt-2 text-[11px] text-[#6E6266]">
                <span className="bg-[#FFF9FA] border border-[#F4D3DA] px-2 py-0.5 rounded">Style: {activeQuickViewProduct.style}</span>
                <span className="bg-[#FFF9FA] border border-[#F4D3DA] px-2 py-0.5 rounded">Material: {activeQuickViewProduct.material}</span>
                <span className="bg-[#FFF9FA] border border-[#F4D3DA] px-2 py-0.5 rounded">Occasion: {activeQuickViewProduct.occasion}</span>
              </div>
            </div>

            {/* Native HTML Link Outbound Amazon Button */}
            <div className="pt-4 space-y-2">
              <a
                href={finalAmazonUrl}
                target="_blank"
                rel="sponsored nofollow noopener"
                onClick={handleAmazonLinkClick}
                className="w-full btn-mauve py-3.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide flex items-center justify-center gap-2 shadow-hover text-center"
              >
                <span>View Product on Amazon</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>

              <div className="flex items-center justify-between text-[11px] text-[#8C7E83] px-2">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3 h-3 text-emerald-600" /> Amazon Genuine
                </span>
                <span className="flex items-center gap-1">
                  <Truck className="w-3 h-3 text-[#BA4A6E]" /> Prime Fast Shipping
                </span>
                <span className="flex items-center gap-1">
                  <RotateCcw className="w-3 h-3 text-amber-600" /> Easy Returns
                </span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
