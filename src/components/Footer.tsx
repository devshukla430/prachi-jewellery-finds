'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Instagram, Youtube, ArrowRight, Shield } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { LegalModal, LegalTabType } from './LegalModal';

export const Footer: React.FC = () => {
  const { setFilter, settings, subscribeEmail } = useApp();
  const [footerEmail, setFooterEmail] = useState('');
  const [subscribeMessage, setSubscribeMessage] = useState<string | null>(null);

  // Legal Policies Modal State
  const [legalModalOpen, setLegalModalOpen] = useState(false);
  const [legalModalTab, setLegalModalTab] = useState<LegalTabType>('affiliate');

  const openLegalModal = (tab: LegalTabType) => {
    setLegalModalTab(tab);
    setLegalModalOpen(true);
  };

  const social = settings.socialLinks || {};

  const handleFooterSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!footerEmail.trim() || !footerEmail.includes('@')) return;

    try {
      const res = await subscribeEmail(footerEmail);
      setSubscribeMessage(res.message || 'Subscribed! You will get alerts for new jewellery finds.');
      setFooterEmail('');
      setTimeout(() => setSubscribeMessage(null), 5000);
    } catch (err) {
      setSubscribeMessage('Subscribed to new find alerts!');
      setTimeout(() => setSubscribeMessage(null), 4000);
    }
  };

  return (
    <footer id="footer-brand" className="bg-[#FAF2F4] border-t border-[#F4D3DA] text-[#4A3E42] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 4-Column Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 pb-12 border-b border-[#F4D3DA]/60">
          
          {/* Brand Column (Col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <Link href="/" className="inline-block">
              <div className="flex items-center gap-2">
                <span className="font-serif text-3xl font-medium tracking-tight text-[#2D2427] leading-none">
                  Prachi
                </span>
                <div className="flex flex-col items-center justify-center leading-none select-none">
                  <span className="text-xs tracking-[0.22em] font-semibold text-[#BA4A6E] uppercase whitespace-nowrap">
                    JEWELLERY
                  </span>
                  <span className="text-[10px] tracking-[0.34em] font-semibold text-[#BA4A6E] uppercase text-center whitespace-nowrap mt-0.5 w-full">
                    FINDS
                  </span>
                </div>
              </div>
              <p className="text-xs text-[#8C7E83] italic mt-1">
                Find It. Love It. Wear It.
              </p>
            </Link>

            <p className="text-xs text-[#6E6266] leading-relaxed max-w-sm font-light">
              Your premier aesthetic destination for handpicked jewellery finds on Amazon. We curate timeless essentials, trending TikTok & Pinterest sensations, and budget-friendly luxury designed to elevate everyday life.
            </p>

            {/* Dynamic Social Icons Configured in Admin Portal */}
            <div className="flex items-center gap-3 pt-2 text-[#6E6266]">
              {social.instagram && (
                <a
                  href={social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Instagram"
                  className="w-8 h-8 rounded-full bg-white border border-[#F4D3DA] flex items-center justify-center hover:text-[#BA4A6E] hover:border-[#BA4A6E] transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {social.pinterest && (
                <a
                  href={social.pinterest}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Pinterest"
                  className="w-8 h-8 rounded-full bg-white border border-[#F4D3DA] flex items-center justify-center hover:text-[#BA4A6E] hover:border-[#BA4A6E] transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.747-7.25 7.915-7.25 4.197 0 7.458 2.991 7.458 6.993 0 4.173-2.631 7.525-6.283 7.525-1.226 0-2.379-.637-2.774-1.391l-.755 2.876c-.273 1.045-1.012 2.355-1.508 3.155C10.126 23.834 11.047 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                  </svg>
                </a>
              )}
              {social.twitter && (
                <a
                  href={social.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="X / Twitter"
                  className="w-8 h-8 rounded-full bg-white border border-[#F4D3DA] flex items-center justify-center hover:text-[#BA4A6E] hover:border-[#BA4A6E] transition-colors"
                >
                  <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
              )}
              {social.youtube && (
                <a
                  href={social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="YouTube"
                  className="w-8 h-8 rounded-full bg-white border border-[#F4D3DA] flex items-center justify-center hover:text-[#BA4A6E] hover:border-[#BA4A6E] transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links (Col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2427]">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-[#6E6266]">
              <li>
                <Link href="/" className="hover:text-[#BA4A6E] transition-colors">Home</Link>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilter('category', 'All');
                    const el = document.getElementById('featured-finds');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#BA4A6E] transition-colors"
                >
                  Jewellery
                </button>
              </li>
              <li>
                <a href="#guides" className="hover:text-[#BA4A6E] transition-colors">Styling Ideas</a>
              </li>
              <li>
                <button
                  onClick={() => {
                    setFilter('category', 'Gift Ideas');
                    const el = document.getElementById('featured-finds');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#BA4A6E] transition-colors"
                >
                  Gift Ideas
                </button>
              </li>
            </ul>
          </div>

          {/* Useful Links & Policy (Col 7-8) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2427]">
              Useful Links
            </h4>
            <ul className="space-y-2 text-xs text-[#6E6266]">
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('affiliate')}
                  className="hover:text-[#BA4A6E] transition-colors font-medium text-left cursor-pointer"
                >
                  Affiliate Disclosure
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('privacy')}
                  className="hover:text-[#BA4A6E] transition-colors text-left cursor-pointer"
                >
                  Privacy Policy
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('terms')}
                  className="hover:text-[#BA4A6E] transition-colors text-left cursor-pointer"
                >
                  Terms &amp; Conditions
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('returns')}
                  className="hover:text-[#BA4A6E] transition-colors text-left cursor-pointer"
                >
                  Amazon Return Policies
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => openLegalModal('contact')}
                  className="hover:text-[#BA4A6E] transition-colors text-left cursor-pointer"
                >
                  Contact Curators
                </button>
              </li>
            </ul>
          </div>

          {/* Stay Connected (Col 9-12) */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#2D2427]">
              Stay Connected
            </h4>
            <p className="text-xs text-[#6E6266] font-light">
              Follow for more jewellery finds, tips and style inspiration.
            </p>

            <form onSubmit={handleFooterSubscribe} className="relative mt-2">
              <input
                type="email"
                required
                value={footerEmail}
                onChange={(e) => setFooterEmail(e.target.value)}
                placeholder="Enter your email address"
                className="w-full pr-10 pl-3.5 py-2.5 rounded-xl text-xs bg-white border border-[#F4D3DA] focus:border-[#BA4A6E] focus:outline-none placeholder:text-[#A59499] text-[#2D2427]"
              />
              <button
                type="submit"
                aria-label="Submit email"
                className="absolute right-1.5 top-1.5 bottom-1.5 px-2.5 bg-[#BA4A6E] hover:bg-[#A03B5C] text-white rounded-lg flex items-center justify-center transition-colors cursor-pointer"
              >
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {subscribeMessage && (
              <p className="text-[11px] text-emerald-600 font-medium">{subscribeMessage}</p>
            )}
          </div>

        </div>

        {/* Mandatory Amazon Affiliate Disclaimer Banner & All Rights Reserved */}
        <div id="affiliate-disclosure" className="pt-8 text-center space-y-3">
          <div className="inline-block px-4 py-2 rounded-xl bg-white/70 border border-[#F4D3DA] text-[11px] sm:text-xs text-[#6E6266] max-w-2xl mx-auto leading-relaxed">
            <span className="font-semibold text-[#BA4A6E]">Amazon Affiliate Disclaimer: </span>
            As an Amazon Associate I earn from qualifying purchases. Product prices, availability, and ratings are accurate as of the date/time indicated and are subject to change by Amazon.
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 text-[11px] text-[#8C7E83]">
            <p>
              © {new Date().getFullYear()} <strong>Prachi Jewellery Finds</strong>. All Rights &amp; Copyrights Reserved.
            </p>
            <span className="hidden sm:inline text-[#E2BDC6]">•</span>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => openLegalModal('terms')}
                className="hover:text-[#BA4A6E] underline cursor-pointer"
              >
                Terms &amp; Copyright
              </button>
              <button
                type="button"
                onClick={() => openLegalModal('privacy')}
                className="hover:text-[#BA4A6E] underline cursor-pointer"
              >
                Privacy Policy
              </button>
              <button
                type="button"
                onClick={() => openLegalModal('affiliate')}
                className="hover:text-[#BA4A6E] underline cursor-pointer"
              >
                Affiliate Agreement
              </button>
            </div>
          </div>
        </div>

      </div>

      {/* Global Legal & Contact Policy Modal */}
      <LegalModal
        isOpen={legalModalOpen}
        onClose={() => setLegalModalOpen(false)}
        initialTab={legalModalTab}
      />
    </footer>
  );
};
