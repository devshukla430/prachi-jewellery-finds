'use client';

import React, { useState, useEffect } from 'react';
import {
  X,
  Shield,
  FileText,
  RotateCcw,
  Mail,
  Send,
  Loader2,
  CheckCircle,
  ExternalLink,
  Lock,
  Sparkles,
  Copyright,
  AlertCircle,
} from 'lucide-react';

export type LegalTabType = 'affiliate' | 'privacy' | 'terms' | 'returns' | 'contact';

interface LegalModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialTab?: LegalTabType;
}

export const LegalModal: React.FC<LegalModalProps> = ({
  isOpen,
  onClose,
  initialTab = 'affiliate',
}) => {
  const [activeTab, setActiveTab] = useState<LegalTabType>(initialTab);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: 'Styling & Product Recommendation',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactSuccess, setContactSuccess] = useState<string | null>(null);
  const [contactError, setContactError] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab, isOpen]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setContactError(null);
    setContactSuccess(null);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(contactForm),
      });
      const data = await res.json();
      if (data.success) {
        setContactSuccess(data.message || 'Message sent! We will reply to your email shortly.');
        setContactForm({
          name: '',
          email: '',
          subject: 'Styling & Product Recommendation',
          message: '',
        });
      } else {
        setContactError(data.message || 'Failed to send message. Please try again.');
      }
    } catch (err: any) {
      setContactError('Network error while sending message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto animate-fadeIn">
      {/* Dark backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="relative w-full max-w-3xl bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl overflow-hidden z-10 my-auto max-h-[92vh] flex flex-col">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-6 bg-gradient-to-r from-[#FFF9FA] via-[#FDF0F3] to-[#FFF9FA] border-b border-[#F4D3DA] flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#F4D3DA] text-[#BA4A6E] flex items-center justify-center shadow-xs">
              <Shield className="w-5 h-5 stroke-[1.8]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-serif text-lg font-bold text-[#2D2427]">
                  Prachi Jewellery Finds
                </span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-[#BA4A6E] text-white">
                  Official Legal &amp; Policies
                </span>
              </div>
              <p className="text-[11px] text-[#8C7E83] flex items-center gap-1 mt-0.5">
                <Copyright className="w-3 h-3" />
                <span>© {new Date().getFullYear()} All Rights &amp; Copyrights Reserved</span>
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full bg-white border border-[#F4D3DA] text-[#6E6266] hover:text-[#BA4A6E] hover:border-[#BA4A6E] transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Strip */}
        <div className="flex items-center gap-1 sm:gap-2 px-4 sm:px-6 pt-3 pb-2 border-b border-[#F4D3DA]/70 bg-white overflow-x-auto no-scrollbar shrink-0 text-xs font-semibold">
          <button
            onClick={() => setActiveTab('affiliate')}
            className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'affiliate'
                ? 'bg-[#BA4A6E] text-white shadow-xs'
                : 'text-[#6E6266] hover:bg-[#FFF9FA] hover:text-[#BA4A6E]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Affiliate Disclosure</span>
          </button>

          <button
            onClick={() => setActiveTab('privacy')}
            className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'privacy'
                ? 'bg-[#BA4A6E] text-white shadow-xs'
                : 'text-[#6E6266] hover:bg-[#FFF9FA] hover:text-[#BA4A6E]'
            }`}
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Privacy Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('terms')}
            className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'terms'
                ? 'bg-[#BA4A6E] text-white shadow-xs'
                : 'text-[#6E6266] hover:bg-[#FFF9FA] hover:text-[#BA4A6E]'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>Terms &amp; Copyrights</span>
          </button>

          <button
            onClick={() => setActiveTab('returns')}
            className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'returns'
                ? 'bg-[#BA4A6E] text-white shadow-xs'
                : 'text-[#6E6266] hover:bg-[#FFF9FA] hover:text-[#BA4A6E]'
            }`}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Amazon Return Policy</span>
          </button>

          <button
            onClick={() => setActiveTab('contact')}
            className={`px-3 py-2 rounded-xl transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'contact'
                ? 'bg-[#BA4A6E] text-white shadow-xs'
                : 'text-[#6E6266] hover:bg-[#FFF9FA] hover:text-[#BA4A6E]'
            }`}
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Contact Curators</span>
          </button>
        </div>

        {/* Modal Scrollable Content Area */}
        <div className="p-5 sm:p-8 overflow-y-auto flex-1 text-xs sm:text-sm text-[#4A3E42] leading-relaxed space-y-6">
          
          {/* TAB 1: Affiliate Disclosure */}
          {activeTab === 'affiliate' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] flex items-start gap-3">
                <Sparkles className="w-5 h-5 text-[#BA4A6E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-[#2D2427] text-sm">
                    Amazon Associates Operating Agreement Disclosure
                  </h4>
                  <p className="text-xs text-[#6E6266] leading-relaxed">
                    <strong>Prachi Jewellery Finds</strong> is an independent digital curation portal and a participant in the Amazon Services LLC Associates Program.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  1. How Our Curation &amp; Commissions Work
                </h5>
                <p>
                  Prachi Jewellery Finds curates, reviews, and organizes the highest-rated jewellery pieces, anti-tarnish items, and gift ideas available on Amazon. When you click on any product link or button marked &ldquo;Buy on Amazon&rdquo;, you are redirected directly to Amazon&apos;s official marketplace (<code className="bg-[#FFF9FA] px-1 py-0.5 rounded border border-[#F4D3DA]">amazon.in</code>).
                </p>
                <p>
                  If you choose to complete a purchase on Amazon after clicking our links, Amazon pays us a small referral commission (typically 8% to 9% on jewellery categories).
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-900 space-y-1">
                <h5 className="font-bold text-xs uppercase tracking-wide flex items-center gap-1.5">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  <span>Zero Additional Cost to You Guaranteed</span>
                </h5>
                <p className="text-xs text-emerald-800 leading-relaxed">
                  This referral commission comes at <strong>zero extra cost</strong> to you. The prices, coupons, lightning deals, and delivery fees you pay on Amazon are exactly identical whether you use our curated links or visit Amazon directly.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  2. Pricing &amp; Stock Availability
                </h5>
                <p>
                  All product prices, ratings, discount percentages, and availability displayed on this website are referenced from Amazon and are accurate at the time of publication. Because Amazon sellers update prices, inventory, and lightning deals dynamically, the exact price shown in your Amazon checkout cart at the moment of purchase will govern the sale.
                </p>
              </div>

              <div className="space-y-2 pt-2 border-t border-[#F4D3DA]/60 text-[11px] text-[#8C7E83]">
                <p>
                  <em>Trademark Notice:</em> Amazon, the Amazon logo, and Amazon Prime are trademarks of Amazon.com, Inc. or its affiliates. Prachi Jewellery Finds is an independent affiliate publisher and is not owned, operated, or endorsed by Amazon.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: Privacy Policy */}
          {activeTab === 'privacy' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="space-y-1">
                <h3 className="font-serif text-lg font-bold text-[#2D2427]">
                  Privacy Policy &amp; Data Protection
                </h3>
                <p className="text-xs text-[#8C7E83]">
                  Last Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                </p>
              </div>

              <p>
                At <strong>Prachi Jewellery Finds</strong>, your privacy and trust are paramount. This Privacy Policy details what minimal information we collect, how it is handled, and your complete rights to data privacy.
              </p>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  1. Information We Collect
                </h5>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6E6266]">
                  <li>
                    <strong>Voluntary Newsletter Subscription:</strong> When you enter your email to receive free jewellery launch alerts, your email is stored securely solely to deliver these updates.
                  </li>
                  <li>
                    <strong>Contact Form Inquiries:</strong> When you message our styling team, your name, email, and inquiry are transmitted directly to our inbox (<code className="bg-[#FFF9FA] px-1 py-0.5 rounded border border-[#F4D3DA]">prachishukla921@gmail.com</code>) to respond to you.
                  </li>
                  <li>
                    <strong>Local Wishlist &amp; Liked Finds:</strong> Your saved jewellery finds are stored solely inside your own browser&apos;s local memory (<code className="bg-[#FFF9FA] px-1 py-0.5 rounded border">localStorage</code>) and are never uploaded to any remote advertising servers.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  2. Strict No-Spam &amp; No-Selling Policy
                </h5>
                <p>
                  We have a strict <strong>100% Zero-Spam Policy</strong>. We will never sell, lease, rent, monetize, or disclose your personal contact information to any third-party marketers, data brokers, or advertisers. You may unsubscribe from jewellery notifications at any time with a single click.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  3. Outbound Links to Amazon
                </h5>
                <p>
                  Our site features links to products on Amazon.in. Once you click through to Amazon, your transactions, payment details, and shipping address are governed entirely by Amazon&apos;s own Privacy Notice and SSL-encrypted payment infrastructure. Prachi Jewellery Finds never collects or has access to your credit card, bank details, or physical shipping address.
                </p>
              </div>
            </div>
          )}

          {/* TAB 3: Terms & Conditions & Intellectual Property Rights */}
          {activeTab === 'terms' && (
            <div className="space-y-5 animate-fadeIn">
              
              {/* Highlighted Copyright Banner */}
              <div className="p-4 rounded-2xl bg-gradient-to-r from-[#FDF0F3] to-[#FFF9FA] border-2 border-[#F4D3DA] space-y-2">
                <div className="flex items-center gap-2 text-[#BA4A6E] font-bold text-xs uppercase tracking-wider">
                  <Copyright className="w-4 h-4" />
                  <span>All Rights Reserved &amp; Intellectual Property Protection</span>
                </div>
                <p className="text-xs text-[#2D2427] font-medium leading-relaxed">
                  © {new Date().getFullYear()} <strong>Prachi Jewellery Finds</strong>. Founded and owned by <strong>Prachi Shukla</strong>. All worldwide rights, title, and intellectual property are strictly reserved.
                </p>
                <p className="text-[11px] text-[#6E6266] leading-relaxed">
                  The brand name &ldquo;Prachi Jewellery Finds&rdquo;, the logo marks, custom aesthetic typography, curated collection layouts, editorial styling guides, and site architecture are protected under applicable copyright, trademark, and unfair competition laws.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  1. Acceptance of Terms
                </h5>
                <p>
                  By accessing and browsing <strong>prachijewelleryfinds.com</strong>, you agree to comply with and be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our website.
                </p>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  2. Copyright Restrictions &amp; Prohibited Actions
                </h5>
                <ul className="list-disc pl-5 space-y-1.5 text-xs text-[#6E6266]">
                  <li>
                    <strong>No Commercial Reproduction:</strong> You may not copy, reproduce, scrape, duplicate, sell, or exploit any portion of this website or its curated listings without express prior written permission from Prachi Shukla.
                  </li>
                  <li>
                    <strong>No Automated Scraping:</strong> Automated web scraping, data mining, or extraction of our curated product collections or styling guides is strictly forbidden.
                  </li>
                  <li>
                    <strong>Personal, Non-Commercial Use:</strong> Visitors are granted a limited license to browse, bookmark, and share links to our curated finds for personal, non-commercial fashion inspiration.
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  3. Disclaimer of Product Warranties &amp; Liability
                </h5>
                <p>
                  Prachi Jewellery Finds serves strictly as a curator and affiliate reviewer. We do not manufacture, inspect, package, warehouse, ship, or warrant physical products. Any warranty claims, defective product complaints, or delivery queries must be directed to Amazon and the respective merchant selling the product on Amazon.
                </p>
              </div>
            </div>
          )}

          {/* TAB 4: Amazon Return Policies */}
          {activeTab === 'returns' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="p-4 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] flex items-start gap-3">
                <RotateCcw className="w-5 h-5 text-[#BA4A6E] shrink-0 mt-0.5" />
                <div className="space-y-1">
                  <h4 className="font-bold text-[#2D2427] text-sm">
                    Amazon Official Return &amp; Replacement Policy
                  </h4>
                  <p className="text-xs text-[#6E6266] leading-relaxed">
                    Because all purchases are processed directly on Amazon, every single order placed through our links enjoys the full protection of <strong>Amazon&apos;s Official Customer Return Policy</strong> and the <strong>Amazon A-to-Z Guarantee</strong>.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  1. Return Windows for Jewellery on Amazon.in
                </h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  <div className="p-3.5 rounded-xl bg-white border border-[#F4D3DA] space-y-1">
                    <span className="font-bold text-xs text-[#2D2427]">Fashion Jewellery:</span>
                    <p className="text-xs text-[#6E6266]">
                      Eligible for <strong>7 to 10 Days Replacement or Refund</strong> if damaged, defective, or different from described upon delivery.
                    </p>
                  </div>
                  <div className="p-3.5 rounded-xl bg-white border border-[#F4D3DA] space-y-1">
                    <span className="font-bold text-xs text-[#2D2427]">Precious &amp; Silver Jewellery:</span>
                    <p className="text-xs text-[#6E6266]">
                      Eligible for <strong>Free Replacement / Refund</strong> with verified certificate and original security seal intact.
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  2. Easy 3-Step Return Process on Amazon
                </h5>
                <ol className="list-decimal pl-5 space-y-1.5 text-xs text-[#6E6266]">
                  <li>
                    Log in to your <strong>Amazon.in</strong> account and open <strong>Your Orders</strong>.
                  </li>
                  <li>
                    Locate the jewellery item you purchased and click <strong>Return or Replace Items</strong>.
                  </li>
                  <li>
                    Select your reason, choose whether you prefer a replacement or instant refund to your Amazon Pay balance / bank account, and schedule free doorstep pickup.
                  </li>
                </ol>
              </div>

              <div className="pt-2">
                <a
                  href="https://www.amazon.in/gp/help/customer/display.html?nodeId=202111770"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-mauve inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold shadow-hover"
                >
                  <span>View Official Amazon Returns Center</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          )}

          {/* TAB 5: Contact Curators */}
          {activeTab === 'contact' && (
            <div className="space-y-5 animate-fadeIn">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-4 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA]">
                <div>
                  <h4 className="font-serif text-base font-bold text-[#2D2427]">
                    Get in Touch with Our Curators
                  </h4>
                  <p className="text-xs text-[#6E6266]">
                    Have a styling question, need a custom jewellery recommendation, or looking to collaborate?
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    Replies in &lt; 24h
                  </span>
                </div>
              </div>

              {/* Direct Contact Email Card */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <a
                  href="mailto:prachishukla921@gmail.com"
                  className="p-3.5 rounded-xl bg-white border border-[#F4D3DA] hover:border-[#BA4A6E] flex items-center gap-3 transition-colors group cursor-pointer"
                >
                  <div className="w-9 h-9 rounded-xl bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center group-hover:bg-[#BA4A6E] group-hover:text-white transition-colors shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#8C7E83] block">Official Email</span>
                    <span className="text-xs font-semibold text-[#2D2427] truncate block">prachishukla921@gmail.com</span>
                  </div>
                </a>

                <div className="p-3.5 rounded-xl bg-white border border-[#F4D3DA] flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center shrink-0">
                    <Sparkles className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <span className="text-[10px] uppercase font-bold text-[#8C7E83] block">Response Time</span>
                    <span className="text-xs font-semibold text-[#2D2427] truncate block">Under 24 Hours • Free Support</span>
                  </div>
                </div>
              </div>

              {/* Interactive Contact Form */}
              <form onSubmit={handleContactSubmit} className="space-y-4 pt-2 border-t border-[#F4D3DA]/70">
                <h5 className="font-bold text-[#2D2427] text-xs uppercase tracking-wider text-[#BA4A6E]">
                  Send a Direct Message
                </h5>

                {contactSuccess && (
                  <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{contactSuccess}</span>
                  </div>
                )}

                {contactError && (
                  <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                    <span>{contactError}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="font-semibold block mb-1 text-xs text-[#2D2427]">Your Name</label>
                    <input
                      type="text"
                      required
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      placeholder="e.g. Priya Sharma"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] text-xs"
                    />
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-xs text-[#2D2427]">Your Email Address *</label>
                    <input
                      type="email"
                      required
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      placeholder="e.g. priya@example.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] text-xs"
                    />
                  </div>
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-xs text-[#2D2427]">Subject</label>
                  <select
                    value={contactForm.subject}
                    onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] text-xs"
                  >
                    <option value="Styling & Product Recommendation">Styling &amp; Product Recommendation</option>
                    <option value="Question About a Product on Amazon">Question About a Product on Amazon</option>
                    <option value="Report Broken Amazon Link">Report Broken Amazon Link</option>
                    <option value="Brand Collaboration & PR">Brand Collaboration &amp; PR</option>
                    <option value="General Feedback">General Feedback</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-xs text-[#2D2427]">Message *</label>
                  <textarea
                    required
                    rows={3}
                    value={contactForm.message}
                    onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                    placeholder="Tell us what you're looking for or how we can help..."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] text-xs resize-none"
                  />
                </div>

                <div className="flex justify-end pt-1">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-mauve px-6 py-2.5 rounded-xl text-xs font-bold shadow-hover flex items-center gap-2 cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Send className="w-3.5 h-3.5" />
                    )}
                    <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
                  </button>
                </div>
              </form>
            </div>
          )}

        </div>

        {/* Modal Footer with Copyright Guarantee */}
        <div className="p-4 bg-[#FAF2F4] border-t border-[#F4D3DA] flex flex-col sm:flex-row items-center justify-between gap-2 shrink-0 text-[11px] text-[#8C7E83]">
          <div className="flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-[#BA4A6E]" />
            <span>Official Legal Notice • Prachi Shukla • All Rights Reserved</span>
          </div>
          <button
            onClick={onClose}
            className="text-xs font-semibold text-[#BA4A6E] hover:underline cursor-pointer"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
