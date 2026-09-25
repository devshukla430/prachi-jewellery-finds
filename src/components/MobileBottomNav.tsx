'use client';

import React from 'react';
import { Home, LayoutGrid, Heart, User } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { extractFirstName } from '../utils/userUtils';

export const MobileBottomNav: React.FC = () => {
  const {
    likedProductIds,
    setIsLikedDrawerOpen,
    setIsFilterDrawerOpen,
    setIsAuthModalOpen,
    user,
    setFilter,
  } = useApp();

  const handleHomeClick = () => {
    setFilter('category', 'All');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="lg:hidden fixed bottom-0 inset-x-0 z-40 bg-white/95 backdrop-blur-md border-t border-[#F4D3DA] shadow-lg pt-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pl-[max(1.5rem,env(safe-area-inset-left))] pr-[max(1.5rem,env(safe-area-inset-right))]">
      <div className="flex items-center justify-between max-w-md mx-auto text-[#4A3E42]">
        
        {/* 1. Home */}
        <button
          onClick={handleHomeClick}
          className="flex flex-col items-center gap-1 text-[11px] font-medium hover:text-[#BA4A6E] transition-colors"
        >
          <Home className="w-5 h-5 stroke-[1.8]" />
          <span>Home</span>
        </button>

        {/* 2. Categories / Filters */}
        <button
          onClick={() => setIsFilterDrawerOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-medium hover:text-[#BA4A6E] transition-colors"
        >
          <LayoutGrid className="w-5 h-5 stroke-[1.8]" />
          <span>Categories</span>
        </button>

        {/* 3. Liked */}
        <button
          onClick={() => setIsLikedDrawerOpen(true)}
          className="relative flex flex-col items-center gap-1 text-[11px] font-medium hover:text-[#BA4A6E] transition-colors"
        >
          <Heart className="w-5 h-5 stroke-[1.8]" />
          {likedProductIds.length > 0 && (
            <span className="absolute -top-1 right-2 bg-[#BA4A6E] text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
              {likedProductIds.length}
            </span>
          )}
          <span>Liked</span>
        </button>

        {/* 4. Profile */}
        <button
          onClick={() => setIsAuthModalOpen(true)}
          className="flex flex-col items-center gap-1 text-[11px] font-medium hover:text-[#BA4A6E] transition-colors"
        >
          <User className="w-5 h-5 stroke-[1.8]" />
          <span>{user ? (extractFirstName(user.name, user.email) || 'Profile') : 'Profile'}</span>
        </button>

      </div>
    </div>
  );
};
