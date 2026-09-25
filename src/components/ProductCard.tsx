'use client';

import React, { useState } from 'react';
import { Heart, Star, ArrowUpRight, Check, Eye } from 'lucide-react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';

interface ProductCardProps {
  product: Product;
  compact?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, compact = false }) => {
  const { isLiked, toggleLike, trackAffiliateClick, setActiveQuickViewProduct, getAffiliateUrl } = useApp();
  const liked = isLiked(product.id);
  const [pinnedNotification, setPinnedNotification] = useState(false);
  const [imgSrc, setImgSrc] = useState(product.imageUrl || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80');

  const finalAmazonUrl = getAffiliateUrl(product);

  const handlePinterestPin = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();

    const pinUrl = `https://www.pinterest.com/pin/create/button/?url=${encodeURIComponent(
      typeof window !== 'undefined' ? window.location.href : 'https://prachi-jewellery-finds.vercel.app'
    )}&media=${encodeURIComponent(imgSrc)}&description=${encodeURIComponent(
      `${product.title} - Only ₹${product.offerPrice} on Amazon via Prachi Jewellery Finds`
    )}`;

    if (typeof window !== 'undefined') {
      window.open(pinUrl, '_blank', 'width=750,height=600,toolbar=no,menubar=no');
    }

    setPinnedNotification(true);
    setTimeout(() => setPinnedNotification(false), 2500);
  };

  const handleHeartClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    toggleLike(product.id);
  };

  const handleAmazonLinkClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Log outbound affiliate click for analytics
    trackAffiliateClick(product);
  };

  return (
    <div
      onClick={() => setActiveQuickViewProduct(product)}
      className="group relative flex flex-col bg-white rounded-2xl border border-[#F4D3DA]/70 overflow-hidden shadow-card hover:shadow-hover hover:border-[#BA4A6E]/40 transition-all duration-300 cursor-pointer"
    >
      {/* Product Image Container */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#FAF3F5]">
        <img
          src={imgSrc}
          alt={product.title}
          onError={() => setImgSrc('https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80')}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Floating Heart Button (Top Right) */}
        <button
          onClick={handleHeartClick}
          aria-label={liked ? 'Remove from wishlist' : 'Save to wishlist'}
          className={`absolute top-2.5 right-2.5 z-10 p-2 rounded-full transition-all duration-200 backdrop-blur-md ${
            liked
              ? 'bg-rose-50 text-[#BA4A6E] shadow-sm'
              : 'bg-white/80 text-[#8C7E83] hover:text-[#BA4A6E] hover:bg-white'
          }`}
        >
          <Heart
            className={`w-4 h-4 transition-transform active:scale-75 ${
              liked ? 'fill-[#BA4A6E] stroke-[#BA4A6E]' : 'stroke-current'
            }`}
          />
        </button>

        {/* Pinterest "Save" Pin Badge (Shows on hover) */}
        <button
          onClick={handlePinterestPin}
          title="Save to Pinterest"
          className="absolute top-2.5 left-2.5 z-10 opacity-0 group-hover:opacity-100 transition-all duration-200 bg-[#E60023] hover:bg-[#b8001c] text-white px-2.5 py-1 rounded-full text-[11px] font-bold flex items-center gap-1 shadow-md"
        >
          <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24">
            <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.747-7.25 7.915-7.25 4.197 0 7.458 2.991 7.458 6.993 0 4.173-2.631 7.525-6.283 7.525-1.226 0-2.379-.637-2.774-1.391l-.755 2.876c-.273 1.045-1.012 2.355-1.508 3.155C10.126 23.834 11.047 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
          </svg>
          <span>Save</span>
        </button>

        {/* Quick View trigger on hover */}
        <div className="absolute inset-x-0 bottom-2 flex justify-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          <span className="bg-black/60 text-white text-[11px] font-medium px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1">
            <Eye className="w-3 h-3" />
            <span>Quick View</span>
          </span>
        </div>

        {/* Pin feedback badge */}
        {pinnedNotification && (
          <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] flex items-center justify-center z-20 animate-fadeIn">
            <div className="bg-white text-xs font-semibold text-[#2D2427] px-3.5 py-1.5 rounded-full shadow-lg flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Saved to Pinterest!</span>
            </div>
          </div>
        )}
      </div>

      {/* Product Content Details */}
      <div className="p-3 sm:p-4 flex flex-col flex-grow justify-between bg-white">
        <div>
          {/* Star Rating & Reviews */}
          <div className="flex items-center gap-1 text-[11px] text-[#D4AF37] font-semibold mb-1">
            <Star className="w-3.5 h-3.5 fill-[#D4AF37] stroke-[#D4AF37]" />
            <span className="text-[#2D2427]">{product.rating.toFixed(1)}</span>
            <span className="text-[#8C7E83] font-normal">({product.reviewsCount})</span>
          </div>

          {/* Product Title */}
          <h3 className="text-xs sm:text-[13px] font-medium text-[#2D2427] line-clamp-2 leading-snug group-hover:text-[#BA4A6E] transition-colors mb-2">
            {product.title}
          </h3>
        </div>

        {/* Pricing & CTA */}
        <div className="pt-2 border-t border-pink-50 space-y-2.5">
          {/* Prices */}
          <div className="flex items-baseline flex-wrap gap-1.5 sm:gap-2">
            <span className="text-sm sm:text-base font-bold text-[#2D2427]">
              ₹{product.offerPrice.toLocaleString('en-IN')}
            </span>
            <span className="text-[11px] sm:text-xs text-[#9E9094] line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
            <span className="text-[10px] sm:text-[11px] font-semibold text-[#BA4A6E] bg-[#FCEEF0] px-1.5 py-0.5 rounded">
              {product.discountPercent}% off
            </span>
          </div>

          {/* Native HTML Link Outbound Amazon Button - 100% Reliable Redirection */}
          <a
            href={finalAmazonUrl}
            target="_blank"
            rel="sponsored nofollow noopener"
            onClick={handleAmazonLinkClick}
            className="w-full btn-mauve py-2 sm:py-2.5 px-3 rounded-xl text-xs font-semibold tracking-wide flex items-center justify-center gap-1 shadow-sm text-center"
          >
            <span>View on Amazon</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
};
