'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Search, Heart, User, ChevronDown, Menu, X, Shield, LogOut } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { extractFirstName, getUserInitial } from '../utils/userUtils';

export const Navbar: React.FC = () => {
  const {
    likedProductIds,
    setIsLikedDrawerOpen,
    setIsAuthModalOpen,
    setIsSearchModalOpen,
    user,
    signOut,
    setFilter,
    categories,
    products,
  } = useApp();

  const [isJewelleryDropdownOpen, setIsJewelleryDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const firstName = user ? extractFirstName(user.name, user.email) : '';
  const userInitial = user ? getUserInitial(user.name, user.email) : 'D';

  const handleCategoryClick = (catName: string) => {
    setFilter('category', catName);
    setIsJewelleryDropdownOpen(false);
    setIsMobileMenuOpen(false);
    // Smooth scroll to product grid
    const el = document.getElementById('featured-finds');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-[#FFF9FA]/95 backdrop-blur-md border-b border-[#F4D3DA]/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[4.5rem] sm:h-20">
          
          {/* Brand Logo & Tagline */}
          <Link href="/" className="flex flex-col group py-1 shrink-0">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <span className="font-serif text-2xl sm:text-3xl tracking-tight text-[#2D2427] group-hover:text-[#BA4A6E] transition-colors font-medium leading-none">
                Prachi
              </span>
              <div className="flex flex-col items-center justify-center leading-none select-none">
                <span className="text-[10px] sm:text-xs tracking-[0.22em] font-semibold text-[#BA4A6E] uppercase whitespace-nowrap">
                  JEWELLERY
                </span>
                <span className="text-[8.5px] sm:text-[10px] tracking-[0.34em] font-semibold text-[#BA4A6E] uppercase text-center whitespace-nowrap mt-0.5 w-full">
                  FINDS
                </span>
              </div>
            </div>
            <span className="text-[8.5px] sm:text-[11px] text-[#8C7E83] italic tracking-tight sm:tracking-wide mt-1 whitespace-nowrap">
              Find It. Love It. Wear It.
            </span>
          </Link>

          {/* Desktop Center Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-7 text-sm font-medium text-[#4A3E42]">
            <Link
              href="/"
              onClick={() => setFilter('category', 'All')}
              className="text-[#BA4A6E] font-semibold transition-colors"
            >
              Home
            </Link>

            {/* Jewellery Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setIsJewelleryDropdownOpen(true)}
              onMouseLeave={() => setIsJewelleryDropdownOpen(false)}
            >
              <button
                className="flex items-center gap-1 hover:text-[#BA4A6E] transition-colors py-2"
                onClick={() => {
                  setFilter('category', 'All');
                  const el = document.getElementById('featured-finds');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                <span>Jewellery</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isJewelleryDropdownOpen ? 'rotate-180 text-[#BA4A6E]' : ''}`} />
              </button>

              {isJewelleryDropdownOpen && (
                <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-card border border-[#F4D3DA] py-2 z-50 animate-fadeIn">
                  <div className="px-3 py-1 text-[11px] uppercase tracking-wider text-[#A59499] font-semibold border-b border-pink-50 mb-1">
                    Explore Categories
                  </div>
                  {categories.map((cat) => {
                    const count = products.filter((p) => p.category.toLowerCase() === cat.name.toLowerCase()).length;
                    return (
                      <button
                        key={cat.id}
                        onClick={() => handleCategoryClick(cat.name)}
                        className="w-full text-left px-4 py-2 text-xs text-[#4A3E42] hover:bg-[#FDF0F3] hover:text-[#BA4A6E] flex items-center justify-between transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-[10px] text-[#A59499]">{count} items</span>
                      </button>
                    );
                  })}
                  <div className="border-t border-pink-50 mt-1 pt-1">
                    <button
                      onClick={() => handleCategoryClick('All')}
                      className="w-full text-left px-4 py-2 text-xs text-[#BA4A6E] font-semibold hover:bg-[#FDF0F3]"
                    >
                      View All Jewellery →
                    </button>
                  </div>
                </div>
              )}
            </div>

            <a
              href="#guides"
              className="hover:text-[#BA4A6E] transition-colors"
            >
              Styling Ideas
            </a>

            <button
              onClick={() => handleCategoryClick('Gift Ideas')}
              className="hover:text-[#BA4A6E] transition-colors"
            >
              Gift Ideas
            </button>

            <button
              onClick={() => {
                const el = document.getElementById('filters-sidebar');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-[#BA4A6E] transition-colors"
            >
              Brands
            </button>

            <a
              href="#footer-brand"
              className="hover:text-[#BA4A6E] transition-colors"
            >
              About
            </a>
          </nav>

          {/* Right Action Bar */}
          <div className="flex items-center gap-1.5 sm:gap-4 shrink-0">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchModalOpen(true)}
              className="p-1.5 sm:p-2 text-[#4A3E42] hover:text-[#BA4A6E] hover:bg-[#FDF0F3] rounded-full transition-colors"
              aria-label="Search Jewellery"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Wishlist Trigger */}
            <button
              onClick={() => setIsLikedDrawerOpen(true)}
              className="relative p-1.5 sm:p-2 text-[#4A3E42] hover:text-[#BA4A6E] hover:bg-[#FDF0F3] rounded-full transition-colors"
              aria-label="View Liked Items"
            >
              <Heart className="w-5 h-5" />
              {likedProductIds.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 bg-[#BA4A6E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-sm">
                  {likedProductIds.length}
                </span>
              )}
            </button>

            {/* Auth Trigger Button */}
            {user ? (
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 text-xs font-semibold text-[#2D2427] bg-[#FDF0F3] border border-[#F4D3DA] px-3 py-1.5 rounded-full hover:border-[#BA4A6E] transition-all shadow-xs cursor-pointer"
                  title="View Account Information"
                >
                  <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-[#BA4A6E] to-[#D96B8F] text-white flex items-center justify-center font-bold text-[11px] shadow-xs uppercase">
                    {userInitial}
                  </div>
                  <span className="hidden sm:inline font-medium">{firstName}</span>
                  <ChevronDown className={`w-3.5 h-3.5 text-[#8C7E83] transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-60 bg-white border border-[#F4D3DA] rounded-2xl shadow-2xl py-2 z-50 animate-fadeIn">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-[#FCEEF0] flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#BA4A6E] to-[#D96B8F] text-white flex items-center justify-center font-bold text-sm shadow-xs shrink-0 uppercase">
                          {userInitial}
                        </div>
                        <div className="overflow-hidden text-left">
                          <div className="font-semibold text-xs text-[#2D2427] truncate">
                            {firstName}
                          </div>
                          <div className="text-[11px] text-[#8C7E83] truncate">
                            {user.email}
                          </div>
                          <div className="text-[10px] text-emerald-600 font-medium mt-0.5 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                            <span>{user.role === 'admin' ? 'Store Administrator' : 'Logged In Member'}</span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Actions */}
                      <div className="py-1 text-xs text-[#2D2427]">
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            setIsLikedDrawerOpen(true);
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 hover:bg-[#FDF0F3] text-left transition-colors"
                        >
                          <Heart className="w-4 h-4 text-[#BA4A6E]" />
                          <span>My Wishlist ({likedProductIds.length})</span>
                        </button>

                        {user.role === 'admin' && (
                          <Link
                            href="/prachi-studio-gateway"
                            onClick={() => setIsUserMenuOpen(false)}
                            className="flex items-center gap-2.5 px-4 py-2 hover:bg-[#FDF0F3] text-left text-[#BA4A6E] font-semibold transition-colors"
                          >
                            <Shield className="w-4 h-4 text-[#BA4A6E]" />
                            <span>Admin Portal</span>
                          </Link>
                        )}
                      </div>

                      {/* Sign Out */}
                      <div className="border-t border-[#FCEEF0] pt-1">
                        <button
                          type="button"
                          onClick={() => {
                            setIsUserMenuOpen(false);
                            signOut();
                          }}
                          className="w-full flex items-center gap-2.5 px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 text-left transition-colors font-medium cursor-pointer"
                        >
                          <LogOut className="w-4 h-4 text-rose-500" />
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="flex items-center gap-1.5 text-xs font-medium text-[#2D2427] hover:text-[#BA4A6E] px-2.5 py-1.5 rounded-full transition-colors"
              >
                <User className="w-4 h-4 text-[#BA4A6E]" />
                <span className="hidden sm:inline">Sign In / Sign Up</span>
              </button>
            )}

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 text-[#4A3E42] hover:text-[#BA4A6E] focus:outline-none"
              aria-label="Toggle navigation"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#F4D3DA] px-4 pt-2 pb-6 space-y-3 shadow-lg animate-fadeIn max-h-[75vh] overflow-y-auto">
          <div className="flex flex-col space-y-2 text-sm font-medium text-[#4A3E42]">
            <Link
              href="/"
              onClick={() => {
                setFilter('category', 'All');
                setIsMobileMenuOpen(false);
              }}
              className="py-2 px-3 rounded-lg hover:bg-[#FDF0F3] text-[#BA4A6E] font-semibold"
            >
              Home
            </Link>

            <div className="py-1">
              <span className="px-3 text-xs uppercase tracking-wider text-[#A59499] font-semibold">
                Categories
              </span>
              <div className="grid grid-cols-2 gap-1.5 mt-2 px-2">
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => handleCategoryClick(cat.name)}
                    className="text-left py-1.5 px-2.5 text-xs rounded-md bg-[#FFF9FA] hover:bg-[#FDF0F3] hover:text-[#BA4A6E]"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            <a
              href="#guides"
              onClick={() => setIsMobileMenuOpen(false)}
              className="py-2 px-3 rounded-lg hover:bg-[#FDF0F3]"
            >
              Styling Ideas
            </a>

            <button
              onClick={() => handleCategoryClick('Gift Ideas')}
              className="text-left py-2 px-3 rounded-lg hover:bg-[#FDF0F3]"
            >
              Gift Ideas
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
