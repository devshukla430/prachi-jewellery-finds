'use client';

import React from 'react';
import { ShieldCheck, Truck, RotateCcw, Lock } from 'lucide-react';

const BADGES = [
  {
    icon: ShieldCheck,
    title: '100% Genuine',
    subtitle: '(Through Amazon)',
  },
  {
    icon: Truck,
    title: 'Free & Fast',
    subtitle: 'Delivery (Amazon)',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    subtitle: '(As per Amazon policy)',
  },
  {
    icon: Lock,
    title: 'Secure Payments',
    subtitle: '(Through Amazon)',
  },
];

export const TrustBadges: React.FC = () => {
  return (
    <section className="py-6 bg-[#FFF9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          {BADGES.map((badge, idx) => {
            const Icon = badge.icon;
            return (
              <div
                key={idx}
                className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA]/70 shadow-sm hover:border-[#BA4A6E]/40 hover:shadow-soft transition-all group"
              >
                <div className="w-10 h-10 rounded-xl bg-[#FCEEF0] flex items-center justify-center text-[#BA4A6E] flex-shrink-0 group-hover:bg-[#BA4A6E] group-hover:text-white transition-colors">
                  <Icon className="w-5 h-5 stroke-[1.8]" />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs sm:text-sm font-semibold text-[#2D2427] leading-tight">
                    {badge.title}
                  </h4>
                  <p className="text-[11px] text-[#8C7E83] leading-tight mt-0.5 truncate">
                    {badge.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
