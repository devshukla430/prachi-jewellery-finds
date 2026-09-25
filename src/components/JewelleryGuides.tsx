'use client';

import React from 'react';
import { Sparkles, ArrowRight, Clock } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const JewelleryGuides: React.FC = () => {
  const { guides, setActiveGuide } = useApp();

  return (
    <section id="guides" className="py-12 bg-[#FFF9FA] border-t border-[#F4D3DA]/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#BA4A6E]" />
            <h2 className="text-2xl sm:text-3xl font-serif font-medium text-[#2D2427]">
              Latest Jewellery Guides
            </h2>
          </div>

          <button
            onClick={() => setActiveGuide(guides[0])}
            className="inline-flex items-center gap-1 text-xs sm:text-sm font-semibold text-[#BA4A6E] hover:text-[#A03B5C] transition-colors"
          >
            <span>View All Articles</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4-Card Editorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {guides.map((guide) => (
            <div
              key={guide.id}
              onClick={() => setActiveGuide(guide)}
              className="group bg-white rounded-2xl border border-[#F4D3DA]/70 overflow-hidden shadow-card hover:shadow-hover hover:border-[#BA4A6E]/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
            >
              {/* Image thumbnail with zoom */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-rose-50">
                <img
                  src={guide.imageUrl}
                  alt={guide.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                />
                
                {/* Category Pill */}
                <div className="absolute top-2.5 left-2.5 bg-white/90 backdrop-blur-sm text-[#BA4A6E] px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider shadow-xs">
                  {guide.category}
                </div>

                {/* Read Time */}
                <div className="absolute bottom-2 right-2 bg-black/60 backdrop-blur-xs text-white px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                  <Clock className="w-2.5 h-2.5" />
                  <span>{guide.readTime}</span>
                </div>
              </div>

              {/* Guide Content */}
              <div className="p-4 flex flex-col flex-grow justify-between">
                <div>
                  <h3 className="font-serif text-sm sm:text-base font-medium text-[#2D2427] group-hover:text-[#BA4A6E] transition-colors line-clamp-2 leading-snug">
                    {guide.title}
                  </h3>
                  <p className="mt-1.5 text-xs text-[#6E6266] line-clamp-2 font-light leading-relaxed">
                    {guide.excerpt}
                  </p>
                </div>

                {/* Read More Link */}
                <div className="mt-4 pt-3 border-t border-pink-50 flex items-center justify-between text-xs font-semibold text-[#BA4A6E]">
                  <span className="group-hover:underline">Read More →</span>
                  <span className="text-[10px] text-[#A59499] font-normal">Amazon Picks Included</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
