'use client';

import React, { useState } from 'react';
import { X, Heart, ArrowUpRight, FolderPlus, Trash2 } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const LikedDrawer: React.FC = () => {
  const {
    isLikedDrawerOpen,
    setIsLikedDrawerOpen,
    likedProductIds,
    toggleLike,
    products,
    collections,
    createCollection,
    removeFromCollection,
    trackAffiliateClick,
    getAffiliateUrl,
    user,
    setIsAuthModalOpen,
    setAuthModalReason,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'liked' | 'collections'>('liked');
  const [newCollectionName, setNewCollectionName] = useState('');
  const [isCreatingCollection, setIsCreatingCollection] = useState(false);

  if (!isLikedDrawerOpen) return null;

  const likedProducts = products.filter((p) => likedProductIds.includes(p.id));

  const handleCreateCollectionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newCollectionName.trim()) {
      createCollection(newCollectionName.trim());
      setNewCollectionName('');
      setIsCreatingCollection(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Dimmed backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={() => setIsLikedDrawerOpen(false)}
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#FFF9FA] shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 border-b border-[#F4D3DA] bg-white flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 fill-[#BA4A6E] text-[#BA4A6E]" />
              <h2 className="font-serif text-lg font-medium text-[#2D2427]">
                Liked / Wishlist Section
              </h2>
            </div>
            <button
              onClick={() => setIsLikedDrawerOpen(false)}
              className="p-1.5 rounded-full text-[#8C7E83] hover:text-[#BA4A6E] hover:bg-[#FDF0F3]"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#F4D3DA] bg-[#FDF6F7] text-xs font-semibold">
            <button
              onClick={() => setActiveTab('liked')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'liked'
                  ? 'border-[#BA4A6E] text-[#BA4A6E] bg-white'
                  : 'border-transparent text-[#6E6266] hover:text-[#BA4A6E]'
              }`}
            >
              Liked Products ({likedProducts.length})
            </button>
            <button
              onClick={() => setActiveTab('collections')}
              className={`flex-1 py-3 text-center transition-colors border-b-2 ${
                activeTab === 'collections'
                  ? 'border-[#BA4A6E] text-[#BA4A6E] bg-white'
                  : 'border-transparent text-[#6E6266] hover:text-[#BA4A6E]'
              }`}
            >
              Your Collections ({collections.length})
            </button>
          </div>

          {/* Drawer Body */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {activeTab === 'liked' ? (
              likedProducts.length === 0 ? (
                <div className="text-center py-16 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center mx-auto">
                    <Heart className="w-8 h-8 stroke-[1.5]" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-base font-medium text-[#2D2427]">
                      No Saved Finds Yet (0)
                    </h3>
                    <p className="text-xs text-[#8C7E83] max-w-xs mx-auto">
                      Tap the heart icon on any jewellery piece to build your dream Amazon shopping wishlist!
                    </p>
                  </div>
                  {!user ? (
                    <button
                      onClick={() => {
                        setAuthModalReason('Please sign in or create a free account to keep products in your liked section.');
                        setIsAuthModalOpen(true);
                      }}
                      className="btn-mauve px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide"
                    >
                      Sign In / Sign Up to Save Finds
                    </button>
                  ) : (
                    <button
                      onClick={() => setIsLikedDrawerOpen(false)}
                      className="btn-mauve px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide"
                    >
                      Start Exploring Finds
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3.5">
                  {likedProducts.map((prod) => {
                    const finalUrl = getAffiliateUrl(prod);

                    return (
                      <div
                        key={prod.id}
                        className="flex items-center gap-3.5 p-3 rounded-2xl bg-white border border-[#F4D3DA] shadow-xs hover:border-[#BA4A6E]/40 transition-all"
                      >
                        {/* Thumbnail */}
                        <div className="w-16 h-16 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0">
                          <img
                            src={prod.imageUrl}
                            alt={prod.title}
                            onError={(e) => {
                              (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
                            }}
                            className="w-full h-full object-cover"
                          />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-medium text-[#2D2427] truncate">
                            {prod.title}
                          </h4>
                          
                          <div className="flex items-baseline gap-2 mt-1">
                            <span className="text-xs font-bold text-[#2D2427]">
                              ₹{prod.offerPrice.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] text-[#9E9094] line-through">
                              ₹{prod.mrp.toLocaleString('en-IN')}
                            </span>
                            <span className="text-[10px] font-semibold text-[#BA4A6E] bg-[#FCEEF0] px-1 rounded">
                              {prod.discountPercent}% off
                            </span>
                          </div>

                          {/* Native Outbound Anchor */}
                          <div className="mt-2 flex items-center gap-2">
                            <a
                              href={finalUrl}
                              target="_blank"
                              rel="sponsored nofollow noopener"
                              onClick={() => trackAffiliateClick(prod)}
                              className="text-[11px] font-semibold text-[#BA4A6E] hover:text-[#A03B5C] flex items-center gap-0.5 hover:underline"
                            >
                              <span>View on Amazon</span>
                              <ArrowUpRight className="w-3 h-3" />
                            </a>
                          </div>
                        </div>

                        {/* Active Heart Toggle to Remove */}
                        <button
                          onClick={() => toggleLike(prod.id)}
                          title="Remove from saved"
                          className="p-2 rounded-full text-[#BA4A6E] hover:bg-rose-50 transition-colors"
                        >
                          <Heart className="w-4 h-4 fill-[#BA4A6E]" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              )
            ) : (
              /* Collections Tab */
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium text-[#6E6266]">
                    Organize your finds into moodboards
                  </span>
                  <button
                    onClick={() => {
                      if (!user) {
                        setAuthModalReason('Please sign in or create a free account to organize finds into custom moodboards.');
                        setIsAuthModalOpen(true);
                      } else {
                        setIsCreatingCollection(true);
                      }
                    }}
                    className="text-xs font-semibold text-[#BA4A6E] flex items-center gap-1 hover:underline"
                  >
                    <FolderPlus className="w-3.5 h-3.5" />
                    <span>New Collection</span>
                  </button>
                </div>

                {isCreatingCollection && (
                  <form onSubmit={handleCreateCollectionSubmit} className="p-3 bg-white rounded-xl border border-[#F4D3DA] space-y-2">
                    <input
                      type="text"
                      required
                      value={newCollectionName}
                      onChange={(e) => setNewCollectionName(e.target.value)}
                      placeholder="e.g. Minimal Daily Staples"
                      className="w-full text-xs p-2 rounded-lg bg-[#FFF9FA] border border-[#F4D3DA] focus:border-[#BA4A6E] focus:outline-none"
                    />
                    <div className="flex justify-end gap-2 text-xs">
                      <button
                        type="button"
                        onClick={() => setIsCreatingCollection(false)}
                        className="px-3 py-1 rounded text-[#6E6266]"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="btn-mauve px-3 py-1 rounded font-semibold"
                      >
                        Save
                      </button>
                    </div>
                  </form>
                )}

                {/* Collections List */}
                <div className="space-y-3">
                  {collections.length === 0 ? (
                    <div className="text-center py-12 px-4 rounded-2xl bg-white border border-[#F4D3DA] space-y-3 shadow-xs">
                      <div className="w-12 h-12 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center mx-auto">
                        <FolderPlus className="w-6 h-6 stroke-[1.5]" />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-bold text-[#2D2427] font-serif">
                          No Collections Created Yet (0)
                        </h4>
                        <p className="text-[11px] text-[#8C7E83] max-w-xs mx-auto">
                          Organize your favourite jewellery finds into custom moodboards (e.g. "Wedding Moodboard", "Daily Office Wear").
                        </p>
                      </div>
                      <button
                        onClick={() => {
                          if (!user) {
                            setAuthModalReason('Please sign in or create a free account to organize finds into custom moodboards.');
                            setIsAuthModalOpen(true);
                          } else {
                            setIsCreatingCollection(true);
                          }
                        }}
                        className="btn-mauve px-4 py-2 rounded-full text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs"
                      >
                        <FolderPlus className="w-3.5 h-3.5" />
                        <span>Create Your First Collection</span>
                      </button>
                    </div>
                  ) : (
                    collections.map((col) => {
                      const colProducts = products.filter(p => col.productIds.includes(p.id));

                      return (
                        <div key={col.id} className="p-4 rounded-2xl bg-white border border-[#F4D3DA] space-y-2.5">
                          <div className="flex items-center justify-between">
                            <h4 className="text-xs font-bold text-[#2D2427] font-serif">
                              {col.name} ({col.productIds.length})
                            </h4>
                            <span className="text-[10px] text-[#BA4A6E] font-medium bg-[#FCEEF0] px-2 py-0.5 rounded-full">
                              Curated Board
                            </span>
                          </div>
                          {col.description && (
                            <p className="text-[11px] text-[#6E6266]">{col.description}</p>
                          )}

                          {colProducts.length > 0 ? (
                            <div className="flex items-center gap-2 overflow-x-auto py-1">
                              {colProducts.map(cp => (
                                <div key={cp.id} className="relative group w-12 h-12 rounded-lg overflow-hidden border border-pink-100 flex-shrink-0">
                                  <img
                                    src={cp.imageUrl}
                                    alt={cp.title}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
                                    }}
                                    className="w-full h-full object-cover"
                                  />
                                  <button
                                    onClick={() => removeFromCollection(col.id, cp.id)}
                                    className="absolute inset-0 bg-black/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                    title="Remove from board"
                                  >
                                    <Trash2 className="w-3 h-3" />
                                  </button>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <div className="text-[11px] text-gray-400 italic">No products in this collection yet.</div>
                          )}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Drawer Footer */}
          <div className="p-4 pb-[max(1rem,env(safe-area-inset-bottom))] pr-[max(1rem,env(safe-area-inset-right))] bg-white border-t border-[#F4D3DA] space-y-2">
            <div className="text-center text-[11px] text-[#8C7E83]">
              Prices and Prime eligibility are live directly on Amazon.
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
