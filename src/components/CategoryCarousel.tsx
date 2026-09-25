'use client';

import React, { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const CategoryCarousel: React.FC = () => {
  const { categories, filters, setFilter } = useApp();
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  // Check scroll bounds to toggle chevron arrows and fade masks
  const checkScroll = () => {
    const el = scrollContainerRef.current;
    if (!el) return;
    const { scrollLeft, scrollWidth, clientWidth } = el;
    setCanScrollLeft(scrollLeft > 8);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 8);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollContainerRef.current;
    if (!el) return;

    el.addEventListener('scroll', checkScroll, { passive: true });
    window.addEventListener('resize', checkScroll);

    // Initial check after images/DOM paint
    const timer = setTimeout(checkScroll, 300);

    return () => {
      el.removeEventListener('scroll', checkScroll);
      window.removeEventListener('resize', checkScroll);
      clearTimeout(timer);
    };
  }, [categories]);

  // Smooth slide on button click
  const handleScroll = (direction: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const container = scrollContainerRef.current;
    const scrollAmount = Math.max(container.clientWidth * 0.65, 200);
    container.scrollBy({
      left: direction === 'left' ? -scrollAmount : scrollAmount,
      behavior: 'smooth',
    });
  };

  const handleSelectCategory = (catName: string) => {
    if (filters.category.toLowerCase() === catName.toLowerCase()) {
      setFilter('category', 'All');
    } else {
      setFilter('category', catName);
    }

    const el = document.getElementById('featured-finds');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative py-4 sm:py-6 lg:py-8 bg-[#FFF9FA] border-b border-[#F4D3DA]/40 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8 relative">
        
        {/* Subtle mobile slide hint / header in landscape */}
        <div className="flex items-center justify-between px-3 mb-2 sm:hidden text-[11px] text-[#8C7E83]">
          <span className="font-semibold text-[#BA4A6E] flex items-center gap-1">
            <Sparkles className="w-3 h-3" />
            <span>Categories</span>
          </span>
          <span className="text-[10px] text-[#A59499]">Slide to explore →</span>
        </div>

        {/* Carousel Container with Absolute Slide Buttons */}
        <div className="relative group/carousel">
          
          {/* Left Slide Arrow */}
          <button
            type="button"
            onClick={() => handleScroll('left')}
            disabled={!canScrollLeft}
            aria-label="Slide categories left"
            className={`absolute -left-1 sm:left-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#F4D3DA] shadow-md flex items-center justify-center text-[#BA4A6E] hover:bg-[#FDF0F3] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
              canScrollLeft
                ? 'opacity-90 hover:opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Left Gradient Fade Mask */}
          <div
            className={`absolute left-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-r from-[#FFF9FA] via-[#FFF9FA]/80 to-transparent z-20 pointer-events-none transition-opacity duration-200 ${
              canScrollLeft ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Right Gradient Fade Mask */}
          <div
            className={`absolute right-0 top-0 bottom-0 w-8 sm:w-12 bg-gradient-to-l from-[#FFF9FA] via-[#FFF9FA]/80 to-transparent z-20 pointer-events-none transition-opacity duration-200 ${
              canScrollRight ? 'opacity-100' : 'opacity-0'
            }`}
          />

          {/* Right Slide Arrow */}
          <button
            type="button"
            onClick={() => handleScroll('right')}
            disabled={!canScrollRight}
            aria-label="Slide categories right"
            className={`absolute -right-1 sm:right-1 top-1/2 -translate-y-1/2 z-30 w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/95 border border-[#F4D3DA] shadow-md flex items-center justify-center text-[#BA4A6E] hover:bg-[#FDF0F3] hover:scale-105 active:scale-95 transition-all duration-200 cursor-pointer ${
              canScrollRight
                ? 'opacity-90 hover:opacity-100 pointer-events-auto'
                : 'opacity-0 pointer-events-none'
            }`}
          >
            <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
          </button>

          {/* Horizontal Scrollable Track */}
          <div
            ref={scrollContainerRef}
            className="overflow-x-auto scroll-smooth overscroll-x-contain touch-pan-x py-2 px-3 sm:px-6 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden snap-x snap-mandatory"
          >
            <div className="w-max min-w-full flex items-center justify-start md:justify-center gap-4 sm:gap-6 lg:gap-8">
              {categories.map((cat) => {
                const isSelected = filters.category.toLowerCase() === cat.name.toLowerCase();

                return (
                  <button
                    key={cat.id}
                    onClick={() => handleSelectCategory(cat.name)}
                    className="group flex flex-col items-center shrink-0 focus:outline-none snap-start sm:snap-center transition-transform active:scale-95 cursor-pointer"
                  >
                    {/* Circular image container */}
                    <div
                      className={`w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full p-1 sm:p-1.5 transition-all duration-300 ${
                        isSelected
                          ? 'bg-gradient-to-tr from-[#BA4A6E] to-[#F4D3DA] shadow-hover scale-105 ring-2 ring-[#BA4A6E] ring-offset-2 ring-offset-[#FFF9FA]'
                          : 'bg-[#FCEEF0] border border-[#F4D3DA] hover:border-[#BA4A6E] hover:shadow-soft group-hover:scale-105'
                      }`}
                    >
                      <div className="w-full h-full rounded-full overflow-hidden bg-white shadow-inner">
                        <img
                          src={cat.imageUrl}
                          alt={cat.name}
                          onError={(e) => {
                            const target = e.target as HTMLImageElement;
                            if (!target.src.includes(cat.slug)) {
                              target.src = `/categories/${cat.slug}.jpg`;
                            }
                          }}
                          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500 ease-out"
                        />
                      </div>
                    </div>

                    {/* Category label */}
                    <span
                      className={`mt-2 sm:mt-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors ${
                        isSelected
                          ? 'text-[#BA4A6E] font-bold'
                          : 'text-[#4A3E42] group-hover:text-[#BA4A6E]'
                      }`}
                    >
                      {cat.name}
                    </span>

                    {/* Active indicator dot */}
                    {isSelected ? (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#BA4A6E] mt-1"></span>
                    ) : (
                      <span className="w-1.5 h-1.5 rounded-full bg-transparent mt-1"></span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
