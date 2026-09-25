'use client';

import React, { useState } from 'react';
import { Mail, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const NewsletterBar: React.FC = () => {
  const { subscribeEmail } = useApp();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;

    setIsSubmitting(true);
    try {
      const res = await subscribeEmail(email);
      setSuccessMessage(res.message || 'Subscribed! You will receive email alerts for every new jewellery find.');
      setEmail('');
      setTimeout(() => setSuccessMessage(null), 6000);
    } catch (err) {
      setSuccessMessage('Subscribed to free style alerts!');
      setTimeout(() => setSuccessMessage(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-10 bg-[#FFF9FA]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-r from-[#FDF0F3] via-[#FCEEF0] to-[#FDF0F3] border border-[#F4D3DA] p-6 sm:p-10 shadow-soft">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            
            {/* Left Description */}
            <div className="space-y-1.5 text-center lg:text-left max-w-xl">
              <div className="flex items-center justify-center lg:justify-start gap-2 text-[#BA4A6E] font-semibold text-xs uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                <span>Instant New Find Alerts (100% Free)</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-medium text-[#2D2427]">
                Never Miss a Trending Amazon Find
              </h3>
              <p className="text-xs sm:text-sm text-[#6E6266] font-light">
                Subscribe for free. Every time a new jewellery piece, budget steal or Amazon verified deal is uploaded, you get an instant alert!
              </p>
            </div>

            {/* Right Input Form */}
            <div className="w-full lg:w-auto flex-shrink-0">
              {successMessage ? (
                <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-6 py-3 rounded-full shadow-xs animate-fadeIn">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{successMessage}</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="w-full sm:w-80 px-4 py-3 rounded-full text-xs bg-white border border-[#F4D3DA] focus:border-[#BA4A6E] focus:ring-2 focus:ring-[#BA4A6E]/20 focus:outline-none placeholder:text-[#A59499] text-[#2D2427]"
                  />
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn-mauve px-7 py-3 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap shadow-sm flex items-center justify-center gap-1.5 disabled:opacity-60"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-3.5 h-3.5 animate-spin" />
                        <span>Subscribing...</span>
                      </>
                    ) : (
                      <span>Subscribe</span>
                    )}
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};
