'use client';

import React, { useState, useRef } from 'react';
import Link from 'next/link';
import {
  Package,
  Plus,
  Trash2,
  Edit,
  ExternalLink,
  Save,
  CheckCircle,
  TrendingUp,
  MousePointerClick,
  Sparkles,
  ArrowLeft,
  Search,
  Upload,
  Download,
  Layers,
  Settings,
  BarChart3,
  FileSpreadsheet,
  Share2,
  DollarSign,
  CreditCard,
  CheckCircle2,
  Clock,
  RotateCcw,
  Instagram,
  Youtube,
  AlertTriangle,
  Lock,
  Key,
  LogOut,
  Eye,
  EyeOff,
  ShieldCheck,
  Phone,
  Mail,
  Copy,
  Check,
  User,
  Tag,
  Send,
  Loader2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Product, HomepageSettings, SocialLinks, AmazonCommissionItem } from '../types';

export default function AdminDashboard() {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    clearAllProducts,
    loadSampleProducts,
    importProducts,
    banners,
    guides,
    settings,
    updateSettings,
    updateSocialLinks,
    clickLogs,
    commissions,
    addCommission,
    getAffiliateUrl,
    adminSecurity,
    updateAdminSecurity,
    updateAdminUsername,
    updateAmazonTag,
    subscribers,
    deleteSubscriber,
    notifySubscribersAboutProduct,
    googleClientId,
    setGoogleClientId,
    verifyAdminPasscode,
    verifyAdminContact,
    verifyAdminDualCredentials,
    sendAdminOtp,
    verifyAdminOtp,
    resetAdminPasscode,
  } = useApp();

  const [activeTab, setActiveTab] = useState<'products' | 'cms' | 'social' | 'payments' | 'analytics' | 'import-export' | 'subscribers' | 'security'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddProductModalOpen, setIsAddProductModalOpen] = useState(false);
  const [isAddCommissionModalOpen, setIsAddCommissionModalOpen] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  const [notification, setNotification] = useState<string | null>(null);

  // Amazon Tag Modal State
  const [isAmazonTagModalOpen, setIsAmazonTagModalOpen] = useState(false);
  const [customAmazonTag, setCustomAmazonTag] = useState(settings.amazonTag || '');

  // Admin Username Modal State
  const [isAdminUsernameModalOpen, setIsAdminUsernameModalOpen] = useState(false);
  const [customAdminUsername, setCustomAdminUsername] = useState(adminSecurity.adminUsername || 'Prachi Shukla');

  // Test product alert sending state
  const [isSendingTestAlert, setIsSendingTestAlert] = useState(false);

  // Admin Security Gate State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [passcode, setPasscode] = useState('');
  const [passcodeError, setPasscodeError] = useState(false);
  const [showPasscode, setShowPasscode] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Two-Factor Authentication (2FA) State for Admin Login
  const [is2FAStep, setIs2FAStep] = useState(false);
  const [admin2FACode, setAdmin2FACode] = useState('');
  const [admin2FAError, setAdmin2FAError] = useState('');
  const [isSending2FACode, setIsSending2FACode] = useState(false);
  const [admin2FACountdown, setAdmin2FACountdown] = useState(0);

  // Forgot Passcode Recovery via Real Google Gmail OTP (100% Free Lifetime)
  const [isForgotModalOpen, setIsForgotModalOpen] = useState(false);
  const [recoveryStep, setRecoveryStep] = useState<'send-otp' | 'verify-otp' | 'new-passcode'>('send-otp');
  const [adminEnteredOtp, setAdminEnteredOtp] = useState('');
  const [isSendingAdminOtp, setIsSendingAdminOtp] = useState(false);
  const [adminOtpCountdown, setAdminOtpCountdown] = useState(0);
  const [newAdminPasscode, setNewAdminPasscode] = useState('');
  const [confirmAdminPasscode, setConfirmAdminPasscode] = useState('');
  const [recoveryError, setRecoveryError] = useState('');
  const [showNewPasscode, setShowNewPasscode] = useState(false);

  // Countdown timer for Admin 2FA resend
  React.useEffect(() => {
    if (admin2FACountdown <= 0) return;
    const t = setInterval(() => {
      setAdmin2FACountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [admin2FACountdown]);

  // Countdown timer for Admin OTP resend
  React.useEffect(() => {
    if (adminOtpCountdown <= 0) return;
    const t = setInterval(() => {
      setAdminOtpCountdown(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(t);
  }, [adminOtpCountdown]);

  // Security Tab Form
  const [securityForm, setSecurityForm] = useState({
    adminUsername: adminSecurity.adminUsername || 'Prachi Shukla',
    adminEmail: adminSecurity.adminEmail,
    adminPhone: adminSecurity.adminPhone,
    amazonTag: settings.amazonTag || '',
    googleClientId: adminSecurity.googleClientId || googleClientId || '',
    currentPasscode: '',
    newPasscode: '',
    confirmPasscode: '',
  });
  const [securityTabError, setSecurityTabError] = useState('');
  const [securityTabSuccess, setSecurityTabSuccess] = useState('');
  const [showSecurityPasscode, setShowSecurityPasscode] = useState(false);

  // Keep contact in sync with adminSecurity context
  React.useEffect(() => {
    setSecurityForm(prev => ({
      ...prev,
      adminUsername: adminSecurity.adminUsername || 'Prachi Shukla',
      adminEmail: adminSecurity.adminEmail,
      adminPhone: adminSecurity.adminPhone,
      amazonTag: settings.amazonTag || '',
      googleClientId: adminSecurity.googleClientId || googleClientId || '',
    }));
  }, [adminSecurity, settings.amazonTag, googleClientId]);

  // Check session on mount
  React.useEffect(() => {
    try {
      const auth = sessionStorage.getItem('prachi_admin_auth');
      if (auth === 'true') {
        setIsAuthenticated(true);
      }
    } catch (e) {}
    setIsCheckingAuth(false);
  }, []);

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (verifyAdminPasscode(passcode)) {
      setPasscodeError(false);
      setIs2FAStep(true);
      setAdmin2FAError('');
      setAdmin2FACode('');
      setIsSending2FACode(true);
      setAdmin2FACountdown(60);
      try {
        const res = await sendAdminOtp('admin_2fa');
        if (res.success) {
          showToast('Passcode confirmed. Two-Factor authentication OTP sent to prachishukla921@gmail.com');
        } else {
          setAdmin2FAError(res.message || 'Failed to dispatch 2FA code via Gmail.');
        }
      } catch (err: any) {
        setAdmin2FAError('Failed to dispatch 2FA code. Please check your network connection.');
      } finally {
        setIsSending2FACode(false);
      }
    } else {
      setPasscodeError(true);
    }
  };

  const handleVerify2FACode = (e: React.FormEvent) => {
    e.preventDefault();
    setAdmin2FAError('');
    if (!admin2FACode.trim()) {
      setAdmin2FAError('Please enter the 6-digit OTP code received in your Gmail inbox.');
      return;
    }
    if (verifyAdminOtp(admin2FACode)) {
      setIsAuthenticated(true);
      setIs2FAStep(false);
      setAdmin2FACode('');
      try {
        sessionStorage.setItem('prachi_admin_auth', 'true');
      } catch (e) {}
      showToast('Two-factor authentication verified! Welcome back, Prachi.');
    } else {
      setAdmin2FAError('Invalid or expired 2FA code. Please check your Gmail or request a new code.');
    }
  };

  const handleResend2FACode = async () => {
    if (admin2FACountdown > 0 || isSending2FACode) return;
    setIsSending2FACode(true);
    setAdmin2FAError('');
    try {
      const res = await sendAdminOtp('admin_2fa');
      if (res.success) {
        setAdmin2FACountdown(60);
        showToast('New 2FA code sent from shukladevesh545@gmail.com to prachishukla921@gmail.com');
      } else {
        setAdmin2FAError(res.message || 'Failed to resend code.');
      }
    } catch (e: any) {
      setAdmin2FAError('Failed to communicate with authentication service.');
    } finally {
      setIsSending2FACode(false);
    }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    setIs2FAStep(false);
    setPasscode('');
    setAdmin2FACode('');
    try {
      sessionStorage.removeItem('prachi_admin_auth');
    } catch (e) {}
    showToast('Admin portal locked.');
  };

  // Forgot Passcode Handlers (Real Google Gmail OTP - 100% Free Lifetime)
  const handleSendAdminOtp = async () => {
    setIsSendingAdminOtp(true);
    setRecoveryError('');
    try {
      const res = await sendAdminOtp('admin_reset');
      if (res.success) {
        setRecoveryStep('verify-otp');
        setAdminOtpCountdown(45);
        showToast('Verification OTP dispatched from shukladevesh545@gmail.com to prachishukla921@gmail.com');
      } else {
        setRecoveryError(res.message || 'Failed to dispatch verification code via Gmail.');
      }
    } catch (e: any) {
      setRecoveryError(e?.message || 'Error communicating with Google Gmail service.');
    } finally {
      setIsSendingAdminOtp(false);
    }
  };

  const handleVerifyAdminOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');
    if (!adminEnteredOtp.trim()) {
      setRecoveryError('Please enter the 6-digit OTP code received in your Gmail inbox.');
      return;
    }
    if (verifyAdminOtp(adminEnteredOtp)) {
      setRecoveryStep('new-passcode');
      setRecoveryError('');
      showToast('OTP verified successfully! Now choose your new administrator passcode.');
    } else {
      setRecoveryError('Invalid or expired OTP code. Please check your Gmail or request a new code.');
    }
  };

  const handleSaveNewPasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setRecoveryError('');
    if (newAdminPasscode.trim().length < 4) {
      setRecoveryError('Passcode must be at least 4 characters.');
      return;
    }
    if (newAdminPasscode !== confirmAdminPasscode) {
      setRecoveryError('Passcodes do not match.');
      return;
    }
    resetAdminPasscode(newAdminPasscode);
    setIsAuthenticated(true);
    setPasscode(newAdminPasscode);
    try {
      sessionStorage.setItem('prachi_admin_auth', 'true');
    } catch (e) {}
    setIsForgotModalOpen(false);
    showToast('Administrator passcode updated successfully! Access granted.');
  };

  // Amazon Tag Quick Save Handler
  const handleSaveAmazonTag = (e: React.FormEvent) => {
    e.preventDefault();
    updateAmazonTag(customAmazonTag.trim());
    setIsAmazonTagModalOpen(false);
    showToast(
      customAmazonTag.trim()
        ? `Amazon Tag configured: ${customAmazonTag.trim()}`
        : 'Amazon Tag cleared. Outbound links will connect directly to Amazon safely.'
    );
  };

  // Admin Username Quick Save Handler
  const handleSaveAdminUsername = (e: React.FormEvent) => {
    e.preventDefault();
    const name = customAdminUsername.trim() || 'Prachi Shukla';
    updateAdminUsername(name);
    setIsAdminUsernameModalOpen(false);
    showToast(`Owner display name updated to: ${name}`);
  };

  // Save Admin Contact Details & Store Settings
  const handleSaveContactDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityTabError('');
    setSecurityTabSuccess('');
    if (!securityForm.adminEmail.includes('@')) {
      setSecurityTabError('Please enter a valid admin email address.');
      return;
    }
    const cleanUsername = securityForm.adminUsername.trim() || 'Prachi Shukla';
    const cleanTag = securityForm.amazonTag.trim();
    updateAdminUsername(cleanUsername);
    updateAmazonTag(cleanTag);
    updateAdminSecurity({
      adminUsername: cleanUsername,
      adminEmail: securityForm.adminEmail.trim(),
      adminPhone: securityForm.adminPhone.trim(),
    });
    setSecurityTabSuccess('Admin profile, contacts, and Amazon Tag saved successfully!');
    showToast('Store settings & contacts saved.');
  };

  // Save Google OAuth Client ID
  const handleSaveGoogleClientDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityTabError('');
    setSecurityTabSuccess('');
    const cleanId = securityForm.googleClientId.trim();
    setGoogleClientId(cleanId);
    updateAdminSecurity({ googleClientId: cleanId });
    setSecurityTabSuccess('Google OAuth Client ID saved! Direct accounts.google.com redirect is now active.');
    showToast('Google Client ID saved.');
  };

  // Change Admin Passcode from Dashboard
  const handleChangePasscode = (e: React.FormEvent) => {
    e.preventDefault();
    setSecurityTabError('');
    setSecurityTabSuccess('');

    if (!verifyAdminPasscode(securityForm.currentPasscode)) {
      setSecurityTabError('Current passcode is incorrect.');
      return;
    }
    if (securityForm.newPasscode.trim().length < 4) {
      setSecurityTabError('New passcode must be at least 4 characters.');
      return;
    }
    if (securityForm.newPasscode !== securityForm.confirmPasscode) {
      setSecurityTabError('New passcodes do not match.');
      return;
    }

    updateAdminSecurity({ adminPasscode: securityForm.newPasscode.trim() });
    setSecurityForm(prev => ({ ...prev, currentPasscode: '', newPasscode: '', confirmPasscode: '' }));
    setSecurityTabSuccess('Administrator passcode changed successfully!');
    showToast('Passcode updated!');
  };

  // File input ref for image upload
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Social Links Form
  const [socialForm, setSocialForm] = useState<SocialLinks>(settings.socialLinks || {
    instagram: "https://instagram.com/prachijewelleryfinds",
    pinterest: "https://pinterest.com/prachijewelleryfinds",
    youtube: "https://youtube.com/@prachijewelleryfinds",
    twitter: "https://x.com/prachifinds",
  });

  // Commission Log Form
  const [commissionForm, setCommissionForm] = useState({
    productTitle: '',
    productPrice: 999,
    quantityOrdered: 1,
    commissionRate: 0.08,
    status: 'Approved & Paid' as const,
    amazonOrderId: `402-${Math.floor(1000000 + Math.random() * 9000000)}-${Math.floor(1000000 + Math.random() * 9000000)}`,
  });

  // Form State for New / Edit Product
  const [formData, setFormData] = useState<Partial<Product>>({
    title: '',
    slug: '',
    category: 'Earrings',
    brand: 'Giva',
    style: 'Minimal',
    material: 'Gold Plated',
    occasion: 'Daily Wear',
    mrp: 1499,
    offerPrice: 999,
    discountPercent: 33,
    rating: 4.6,
    reviewsCount: '1.1k',
    imageUrl: '',
    description: '',
    bulletPoints: ['High-Grade Gold Plating', 'Anti-tarnish coating', 'Hypoallergenic design'],
    amazonUrl: '',
    badges: ['Featured'],
    inStock: true,
  });

  // CMS Settings Local Form
  const [cmsSettings, setCmsSettings] = useState<HomepageSettings>(settings);

  const showToast = (msg: string) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  // Open modal to Add Product
  const handleOpenAddModal = () => {
    setEditingProduct(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Earrings',
      brand: 'Giva',
      style: 'Minimal',
      material: 'Gold Plated',
      occasion: 'Daily Wear',
      mrp: 1499,
      offerPrice: 999,
      discountPercent: 33,
      rating: 4.8,
      reviewsCount: '120',
      imageUrl: '',
      description: 'Handcrafted premium quality jewellery on Amazon.',
      bulletPoints: ['Anti-tarnish coating', 'Hypoallergenic', 'Express Prime Delivery'],
      amazonUrl: '',
      badges: ['Featured'],
      inStock: true,
    });
    setIsAddProductModalOpen(true);
  };

  // Open modal to Edit Product
  const handleOpenEditModal = (p: Product) => {
    setEditingProduct(p);
    setFormData({ ...p });
    setIsAddProductModalOpen(true);
  };

  // Handle local image file upload and convert to base64
  const handleImageFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      alert('Image file is too large (max 5MB).');
      return;
    }

    const reader = new FileReader();
    reader.onload = (evt) => {
      const base64 = evt.target?.result as string;
      setFormData((prev) => ({ ...prev, imageUrl: base64 }));
      showToast('Image uploaded successfully!');
    };
    reader.readAsDataURL(file);
  };

  // Auto calculate discount
  const handlePriceChange = (mrpVal: number, offerVal: number) => {
    const disc = mrpVal > 0 ? Math.round(((mrpVal - offerVal) / mrpVal) * 100) : 0;
    setFormData((prev) => ({
      ...prev,
      mrp: mrpVal,
      offerPrice: offerVal,
      discountPercent: disc > 0 ? disc : 0,
    }));
  };

  // Save Product (Create or Update)
  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.offerPrice) {
      alert('Please fill out Product Title and Offer Price.');
      return;
    }

    const img = formData.imageUrl || 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';

    let finalUrl = formData.amazonUrl ? formData.amazonUrl.trim() : '';
    const tag = settings.amazonTag || 'prachifinds-21';

    if (!finalUrl) {
      finalUrl = `https://www.amazon.in/s?k=${encodeURIComponent(formData.title)}&tag=${tag}`;
    } else {
      if (!finalUrl.startsWith('http://') && !finalUrl.startsWith('https://')) {
        finalUrl = 'https://' + finalUrl;
      }
      if (!finalUrl.includes('tag=')) {
        finalUrl += (finalUrl.includes('?') ? '&' : '?') + `tag=${tag}`;
      }
    }

    const payload = {
      ...formData,
      imageUrl: img,
      slug: formData.slug || formData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      amazonUrl: finalUrl,
    } as Product;

    if (editingProduct) {
      updateProduct(editingProduct.id, payload);
      showToast('Product updated successfully!');
    } else {
      addProduct(payload);
      showToast('New product added to catalogue!');
    }

    setIsAddProductModalOpen(false);
  };

  // Delete single product without browser modal popup issues
  const handleDeleteProduct = (id: string) => {
    deleteProduct(id);
    showToast('Product removed from catalogue.');
  };

  // Clear all products directly with inline button confirmation
  const handleConfirmClearAll = () => {
    clearAllProducts();
    setShowClearConfirm(false);
    showToast('All products removed. Catalogue is now 100% empty.');
  };

  // Save Social Accounts
  const handleSaveSocial = (e: React.FormEvent) => {
    e.preventDefault();
    updateSocialLinks(socialForm);
    showToast('Social media accounts updated successfully!');
  };

  // Save Commission Log
  const handleSaveCommission = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = Number((commissionForm.productPrice * commissionForm.quantityOrdered * commissionForm.commissionRate).toFixed(2));
    addCommission({
      productId: `prod-custom-${Date.now()}`,
      productTitle: commissionForm.productTitle || 'Amazon Jewellery Purchase',
      productPrice: Number(commissionForm.productPrice),
      quantityOrdered: Number(commissionForm.quantityOrdered),
      commissionRate: Number(commissionForm.commissionRate),
      commissionAmount: amount,
      date: new Date().toISOString().split('T')[0],
      status: commissionForm.status,
      amazonOrderId: commissionForm.amazonOrderId,
    });
    showToast('Commission recorded successfully!');
    setIsAddCommissionModalOpen(false);
  };

  // Bulk Export JSON / CSV
  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(products, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `prachi_jewellery_products_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast('Products exported as JSON!');
  };

  const handleExportCSV = () => {
    const headers = ['id', 'title', 'category', 'brand', 'offerPrice', 'mrp', 'discountPercent', 'rating', 'amazonUrl'];
    const rows = products.map((p) =>
      headers
        .map((h) => {
          const val = (p as any)[h] || '';
          return `"${String(val).replace(/"/g, '""')}"`;
        })
        .join(',')
    );
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `prachi_jewellery_products_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Products exported as CSV!');
  };

  // Bulk Import
  const handleImportJSON = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const imported = JSON.parse(evt.target?.result as string);
        if (Array.isArray(imported)) {
          importProducts(imported);
          showToast(`Successfully imported ${imported.length} products!`);
        } else {
          alert('Invalid JSON format. Must be an array of products.');
        }
      } catch (err) {
        alert('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  // Subscribers Handlers (100% Free Lifetime)
  const handleExportSubscribersCSV = () => {
    if (subscribers.length === 0) {
      showToast('No subscribers to export.');
      return;
    }
    const headers = ['Email', 'Subscribed At'];
    const rows = subscribers.map(s => `"${s.email}","${new Date(s.subscribedAt).toLocaleString('en-IN')}"`);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `prachi_jewellery_subscribers_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    showToast('Subscribers list exported as CSV!');
  };

  const handleSendTestProductAlert = async () => {
    if (subscribers.length === 0) {
      alert('You currently have 0 subscribers. Subscribe your own email on the homepage first to test!');
      return;
    }
    if (products.length === 0) {
      alert('You have 0 products in the catalogue. Add at least one product first to broadcast an alert.');
      return;
    }
    setIsSendingTestAlert(true);
    try {
      const latestProduct = products[0];
      const res = await notifySubscribersAboutProduct(latestProduct);
      if (res.success) {
        showToast(`Test alert dispatched to ${subscribers.length} subscriber(s)!`);
      } else {
        showToast(res.message || 'Error broadcasting test alert.');
      }
    } catch (err) {
      showToast('Failed to send test product alert.');
    } finally {
      setIsSendingTestAlert(false);
    }
  };

  // Save CMS Settings
  const handleSaveCMS = (e: React.FormEvent) => {
    e.preventDefault();
    updateSettings(cmsSettings);
    showToast('Homepage settings updated successfully!');
  };

  // Analytics Computation
  const totalClicks = clickLogs.length;
  const pinterestClicks = clickLogs.filter((c) => c.referrer === 'Pinterest').length;
  const instagramClicks = clickLogs.filter((c) => c.referrer === 'Instagram').length;

  // Total Commission Calculation
  const totalCommissionEarned = commissions.reduce((sum, item) => sum + item.commissionAmount, 0);
  const paidCommission = commissions
    .filter((c) => c.status === 'Approved & Paid')
    .reduce((sum, item) => sum + item.commissionAmount, 0);
  const pendingCommission = commissions
    .filter((c) => c.status !== 'Approved & Paid')
    .reduce((sum, item) => sum + item.commissionAmount, 0);

  const filteredList = products.filter(
    (p) =>
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.brand.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // If loading session, show neutral background
  if (isCheckingAuth) {
    return <div className="min-h-screen bg-[#FDF6F7]" />;
  }

  // If not authenticated, display secure passcode gateway with Two-Factor Authentication (2FA)
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#FDF6F7] flex flex-col justify-center items-center px-4 sm:px-6 py-6 sm:py-12 overflow-y-auto">
        <div className="w-full max-w-md bg-white rounded-3xl border border-[#F4D3DA] p-6 sm:p-10 shadow-card space-y-5 sm:space-y-6 text-center my-auto">
          {!is2FAStep ? (
            <>
              <div className="w-16 h-16 rounded-full bg-[#FCEEF0] border border-[#F4D3DA] text-[#BA4A6E] flex items-center justify-center mx-auto shadow-soft">
                <Lock className="w-7 h-7 stroke-[1.5]" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-[#FCEEF0] text-[#BA4A6E] text-[10px] font-bold tracking-wider uppercase mb-1">
                  Step 1 of 2
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#2D2427]">
                  Admin Security Gateway
                </h2>
                <p className="text-xs text-[#6E6266] leading-relaxed">
                  This portal is restricted to the store owner. Please enter your administrator passcode to proceed to Two-Factor Verification.
                </p>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-[#2D2427] mb-1.5">
                    Administrator Passcode
                  </label>
                  <div className="relative">
                    <input
                      type={showPasscode ? "text" : "password"}
                      value={passcode}
                      onChange={(e) => {
                        setPasscode(e.target.value);
                        setPasscodeError(false);
                      }}
                      placeholder="Enter administrator passcode"
                      className={`w-full px-4 py-3 rounded-2xl border text-xs bg-[#FFF9FA] focus:outline-none transition-colors ${
                        passcodeError
                          ? 'border-rose-400 focus:border-rose-600 ring-1 ring-rose-300'
                          : 'border-[#F4D3DA] focus:border-[#BA4A6E]'
                      }`}
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasscode(!showPasscode)}
                      className="absolute right-3.5 top-3.5 text-[#A59499] hover:text-[#BA4A6E]"
                    >
                      {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>

                  {passcodeError && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>Incorrect passcode. Please try again or use Forgot Passcode.</span>
                    </p>
                  )}

                  <div className="flex justify-end mt-1.5">
                    <button
                      type="button"
                      onClick={() => {
                        setIsForgotModalOpen(true);
                        setRecoveryStep('send-otp');
                        setRecoveryError('');
                        setAdminEnteredOtp('');
                        setNewAdminPasscode('');
                        setConfirmAdminPasscode('');
                      }}
                      className="text-[11px] font-semibold text-[#BA4A6E] hover:underline"
                    >
                      Forgot Passcode?
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSending2FACode}
                  className="btn-mauve w-full py-3.5 rounded-2xl text-xs font-bold shadow-hover flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isSending2FACode ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying & Sending 2FA Code...</span>
                    </>
                  ) : (
                    <>
                      <Key className="w-4 h-4" />
                      <span>Verify Passcode & Continue</span>
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            <>
              <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
                <ShieldCheck className="w-7 h-7 stroke-[1.5]" />
              </div>

              <div className="space-y-1.5">
                <div className="inline-block px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold tracking-wider uppercase mb-1">
                  Step 2 of 2: Two-Factor Authentication
                </div>
                <h2 className="font-serif text-2xl font-bold text-[#2D2427]">
                  2-Step Verification
                </h2>
                <p className="text-xs text-[#6E6266] leading-relaxed">
                  Passcode verified. For maximum security, enter the 6-digit one-time authentication code sent to your registered Gmail address.
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] text-left text-xs space-y-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#8C7E83]">Sent From:</span>
                  <span className="font-mono font-semibold text-[#BA4A6E]">shukladevesh545@gmail.com</span>
                </div>
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-[#8C7E83]">Recipient Inbox:</span>
                  <span className="font-mono font-semibold text-[#2D2427]">prachishukla921@gmail.com</span>
                </div>
              </div>

              <form onSubmit={handleVerify2FACode} className="space-y-4 text-left">
                <div>
                  <label className="block text-xs font-bold text-[#2D2427] mb-1.5">
                    Enter 6-Digit 2FA Security Code
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={admin2FACode}
                    onChange={(e) => {
                      setAdmin2FACode(e.target.value.replace(/[^0-9]/g, ''));
                      setAdmin2FAError('');
                    }}
                    placeholder="e.g. 123456"
                    className="w-full text-center tracking-[8px] font-mono text-xl py-3 rounded-2xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                    autoFocus
                  />

                  {admin2FAError && (
                    <p className="text-[11px] text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{admin2FAError}</span>
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      setIs2FAStep(false);
                      setAdmin2FACode('');
                      setAdmin2FAError('');
                    }}
                    className="inline-flex items-center gap-1 text-[11px] text-[#8C7E83] hover:text-[#BA4A6E]"
                  >
                    <ArrowLeft className="w-3 h-3" />
                    <span>Back to Passcode</span>
                  </button>

                  <button
                    type="button"
                    disabled={admin2FACountdown > 0 || isSending2FACode}
                    onClick={handleResend2FACode}
                    className="text-[11px] font-semibold text-[#BA4A6E] hover:underline disabled:opacity-50"
                  >
                    {isSending2FACode ? 'Sending...' : admin2FACountdown > 0 ? `Resend in ${admin2FACountdown}s` : 'Resend Code'}
                  </button>
                </div>

                <button
                  type="submit"
                  className="btn-mauve w-full py-3.5 rounded-2xl text-xs font-bold shadow-hover flex items-center justify-center gap-2"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Verify 2FA & Access Dashboard</span>
                </button>
              </form>
            </>
          )}

          <div className="pt-2 border-t border-pink-50 flex items-center justify-between text-xs text-[#8C7E83]">
            <Link
              href="/"
              className="hover:text-[#BA4A6E] inline-flex items-center gap-1 transition-colors"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Return to Storefront</span>
            </Link>
            <span className="text-[10px] text-emerald-600 font-medium">Two-Factor Protected</span>
          </div>
        </div>

        {/* Forgot Passcode Recovery Modal via Google Gmail OTP (100% Free Lifetime) */}
        {isForgotModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-xs"
              onClick={() => setIsForgotModalOpen(false)}
            />

            <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl p-6 sm:p-8 z-10 space-y-5 my-auto max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between border-b border-pink-50 pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center">
                    <ShieldCheck className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base font-bold text-[#2D2427]">Admin Passcode Reset</h3>
                    <p className="text-[10px] text-emerald-600 font-medium">Google Security Verification (100% Free)</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsForgotModalOpen(false)}
                  className="text-gray-400 hover:text-gray-600 p-1 text-sm font-bold"
                >
                  ✕
                </button>
              </div>

              {/* Step 1: Send OTP to Google Gmail */}
              {recoveryStep === 'send-otp' && (
                <div className="space-y-4 text-xs">
                  <p className="text-[#6E6266] text-xs leading-relaxed">
                    To prevent unauthorized access, administrator passcode reset requires a 6-digit one-time security code sent directly to your registered Google email address.
                  </p>

                  <div className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] space-y-1.5 text-left">
                    <span className="text-[10px] uppercase font-bold text-[#8C7E83] tracking-wider block">
                      Email Routing
                    </span>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#8C7E83]">Sent From:</span>
                      <span className="font-mono font-semibold text-[#BA4A6E]">shukladevesh545@gmail.com</span>
                    </div>
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#8C7E83]">Recipient Inbox:</span>
                      <span className="font-mono font-semibold text-[#2D2427]">prachishukla921@gmail.com</span>
                    </div>
                  </div>

                  {recoveryError && (
                    <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{recoveryError}</span>
                    </p>
                  )}

                  <button
                    type="button"
                    disabled={isSendingAdminOtp}
                    onClick={handleSendAdminOtp}
                    className="btn-mauve w-full py-3 rounded-2xl text-xs font-bold shadow-hover flex items-center justify-center gap-2 disabled:opacity-60"
                  >
                    {isSendingAdminOtp ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Connecting with Google Gmail...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Send Security OTP to Gmail</span>
                      </>
                    )}
                  </button>
                </div>
              )}

              {/* Step 2: Enter 6-Digit OTP */}
              {recoveryStep === 'verify-otp' && (
                <form onSubmit={handleVerifyAdminOtp} className="space-y-4 text-xs text-left">
                  <div className="p-3 rounded-xl bg-pink-50/70 border border-[#F4D3DA] text-[#6E6266] text-[11px] leading-relaxed space-y-1">
                    <p>A single-use 6-digit verification code has been dispatched to your Gmail inbox.</p>
                    <div className="text-[10px] text-[#8C7E83] pt-1 space-y-0.5">
                      <div>Sender: <strong className="font-mono text-[#BA4A6E]">shukladevesh545@gmail.com</strong></div>
                      <div>Recipient: <strong className="font-mono text-[#2D2427]">prachishukla921@gmail.com</strong></div>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1.5 text-[#2D2427]">Enter 6-Digit Verification Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={adminEnteredOtp}
                      onChange={(e) => {
                        setAdminEnteredOtp(e.target.value.replace(/[^0-9]/g, ''));
                        setRecoveryError('');
                      }}
                      placeholder="e.g. 123456"
                      className="w-full text-center tracking-[8px] font-mono text-lg py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                      autoFocus
                    />
                  </div>

                  {recoveryError && (
                    <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{recoveryError}</span>
                    </p>
                  )}

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      disabled={adminOtpCountdown > 0 || isSendingAdminOtp}
                      onClick={handleSendAdminOtp}
                      className="text-[11px] font-semibold text-[#BA4A6E] hover:underline disabled:opacity-50"
                    >
                      {adminOtpCountdown > 0 ? `Resend in ${adminOtpCountdown}s` : 'Resend Code'}
                    </button>

                    <button
                      type="submit"
                      className="btn-mauve px-5 py-2.5 rounded-xl text-xs font-bold shadow-hover flex items-center gap-1.5"
                    >
                      <ShieldCheck className="w-4 h-4" />
                      <span>Verify OTP</span>
                    </button>
                  </div>
                </form>
              )}

              {/* Step 2: Set New Passcode */}
              {recoveryStep === 'new-passcode' && (
                <form onSubmit={handleSaveNewPasscode} className="space-y-4 text-xs">
                  <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-[11px] flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>Identity verified. Choose your new administrator passcode below:</span>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-[#2D2427]">New Administrator Passcode</label>
                    <div className="relative">
                      <input
                        type={showNewPasscode ? "text" : "password"}
                        required
                        value={newAdminPasscode}
                        onChange={(e) => {
                          setNewAdminPasscode(e.target.value);
                          setRecoveryError('');
                        }}
                        placeholder="Enter new custom passcode"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                        autoFocus
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPasscode(!showNewPasscode)}
                        className="absolute right-3 top-2.5 text-[#A59499] hover:text-[#BA4A6E]"
                      >
                        {showNewPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-[#2D2427]">Confirm New Passcode</label>
                    <input
                      type={showNewPasscode ? "text" : "password"}
                      required
                      value={confirmAdminPasscode}
                      onChange={(e) => {
                        setConfirmAdminPasscode(e.target.value);
                        setRecoveryError('');
                      }}
                      placeholder="Re-enter new passcode"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                    />
                  </div>

                  {recoveryError && (
                    <p className="text-[11px] text-rose-600 font-semibold flex items-center gap-1">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{recoveryError}</span>
                    </p>
                  )}

                  <button
                    type="submit"
                    className="btn-mauve w-full py-3 rounded-2xl text-xs font-bold shadow-hover flex items-center justify-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    <span>Save Passcode & Unlock Portal</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF6F7] text-[#2D2427]">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed top-6 right-6 z-50 bg-[#2D2427] text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-medium animate-fadeIn">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>{notification}</span>
        </div>
      )}

      {/* Admin Top Navigation */}
      <header className="bg-white border-b border-[#F4D3DA] sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#BA4A6E] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Storefront</span>
            </Link>
            <span className="text-[#E2BDC6]">|</span>
            <div className="flex items-baseline gap-1">
              <span className="font-serif text-xl font-bold text-[#2D2427]">Prachi</span>
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#BA4A6E]">
                CMS & Earnings Portal
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3">
            {/* Store Owner Username Badge */}
            <button
              onClick={() => {
                setCustomAdminUsername(adminSecurity.adminUsername || 'Prachi Shukla');
                setIsAdminUsernameModalOpen(true);
              }}
              className="hidden md:flex items-center gap-1.5 text-xs text-[#4A3E42] bg-[#FDF0F3] hover:bg-[#FCEEF0] px-3 py-1.5 rounded-full border border-[#F4D3DA] hover:border-[#BA4A6E] transition-all cursor-pointer group"
              title="Click to change store owner username"
            >
              <User className="w-3.5 h-3.5 text-[#BA4A6E]" />
              <span>Owner: <strong className="text-[#2D2427]">{adminSecurity.adminUsername || 'Prachi Shukla'}</strong></span>
              <Edit className="w-3 h-3 text-[#A59499] group-hover:text-[#BA4A6E]" />
            </button>

            {/* Amazon Associates Tag Badge (Interactive) */}
            {settings.amazonTag ? (
              <button
                onClick={() => {
                  setCustomAmazonTag(settings.amazonTag || '');
                  setIsAmazonTagModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs text-[#4A3E42] bg-[#FDF0F3] hover:bg-[#FCEEF0] px-3 py-1.5 rounded-full border border-[#F4D3DA] hover:border-[#BA4A6E] transition-all cursor-pointer group"
                title="Click to edit your Amazon Associates Tag"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                <span>Amazon Tag: <strong className="text-[#BA4A6E]">{settings.amazonTag}</strong></span>
                <Edit className="w-3 h-3 text-[#A59499] group-hover:text-[#BA4A6E]" />
              </button>
            ) : (
              <button
                onClick={() => {
                  setCustomAmazonTag('');
                  setIsAmazonTagModalOpen(true);
                }}
                className="flex items-center gap-1.5 text-xs text-amber-900 bg-amber-50 hover:bg-amber-100/80 px-3 py-1.5 rounded-full border border-amber-300 transition-all cursor-pointer group shadow-xs animate-pulse"
                title="Click to enter your Amazon Associates Tag"
              >
                <span className="w-2 h-2 rounded-full bg-amber-500"></span>
                <span>Amazon Tag: <strong className="underline">Not Set (Click to Add)</strong></span>
                <Plus className="w-3 h-3 text-amber-700" />
              </button>
            )}

            <button
              onClick={handleAdminLogout}
              className="text-xs font-semibold px-3.5 py-1.5 rounded-full border border-[#F4D3DA] hover:bg-rose-50 text-rose-600 flex items-center gap-1.5 transition-colors"
              title="Lock Admin Portal"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Lock Portal</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Admin Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Stats Overview Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#F4D3DA] shadow-card">
            <div className="flex items-center justify-between text-xs text-[#8C7E83]">
              <span>Total Products</span>
              <Package className="w-4 h-4 text-[#BA4A6E]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#2D2427] mt-2 font-serif">
              {products.length}
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              {products.length === 0 ? 'Empty (Ready for Upload)' : 'Active Products'}
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#F4D3DA] shadow-card">
            <div className="flex items-center justify-between text-xs text-[#8C7E83]">
              <span>Total Amazon Earnings</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-emerald-600 mt-2 font-serif">
              ₹{totalCommissionEarned.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
            </div>
            <div className="text-[11px] text-[#6E6266] font-medium mt-1">
              ₹{paidCommission.toLocaleString('en-IN')} Paid · ₹{pendingCommission.toLocaleString('en-IN')} Pending
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#F4D3DA] shadow-card">
            <div className="flex items-center justify-between text-xs text-[#8C7E83]">
              <span>Outbound Clicks</span>
              <MousePointerClick className="w-4 h-4 text-[#BA4A6E]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#2D2427] mt-2 font-serif">
              {totalClicks}
            </div>
            <div className="text-[11px] text-[#BA4A6E] font-medium mt-1">
              {pinterestClicks} Pinterest · {instagramClicks} Instagram
            </div>
          </div>

          <div className="p-5 rounded-3xl bg-white border border-[#F4D3DA] shadow-card">
            <div className="flex items-center justify-between text-xs text-[#8C7E83]">
              <span>Amazon Commission Rate</span>
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
            </div>
            <div className="text-2xl sm:text-3xl font-bold text-[#2D2427] mt-2 font-serif">
              8.0% - 9.0%
            </div>
            <div className="text-[11px] text-emerald-600 font-medium mt-1">
              Amazon Jewellery Bounty Tier (Official Amazon India Rate)
            </div>
          </div>
        </div>

        {/* Tab Navigation Controls */}
        <div className="flex items-center gap-2 border-b border-[#F4D3DA] pb-1 overflow-x-auto no-scrollbar text-xs font-semibold">
          <button
            onClick={() => setActiveTab('products')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'products'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Product Management ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('social')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'social'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <Share2 className="w-4 h-4" />
            <span>Social Media Accounts</span>
          </button>

          <button
            onClick={() => setActiveTab('payments')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'payments'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <CreditCard className="w-4 h-4" />
            <span>Amazon Payments & Commission ({commissions.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('cms')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'cms'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Homepage CMS & Guides</span>
          </button>

          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <BarChart3 className="w-4 h-4" />
            <span>Outbound Click Tracker</span>
          </button>

          <button
            onClick={() => setActiveTab('import-export')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'import-export'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <FileSpreadsheet className="w-4 h-4" />
            <span>Bulk CSV / JSON</span>
          </button>

          <button
            onClick={() => setActiveTab('subscribers')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'subscribers'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <Mail className="w-4 h-4" />
            <span>Subscribers ({subscribers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('security')}
            className={`flex items-center gap-2 px-5 py-3 rounded-2xl transition-all ${
              activeTab === 'security'
                ? 'bg-[#BA4A6E] text-white shadow-soft'
                : 'text-[#4A3E42] hover:bg-white'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Security & Passcode</span>
          </button>
        </div>

        {/* Tab 1: Product Management */}
        {activeTab === 'products' && (
          <div className="space-y-6">
            {/* Search and Action Bar */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-80">
                <Search className="w-4 h-4 absolute left-3.5 top-3 text-[#A59499]" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by title, category..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-full text-xs bg-white border border-[#F4D3DA] focus:outline-none focus:border-[#BA4A6E]"
                />
              </div>

              <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end">
                {products.length > 0 && (
                  <>
                    {showClearConfirm ? (
                      <div className="flex items-center gap-1.5 p-1 bg-rose-50 border border-rose-200 rounded-full">
                        <span className="text-[11px] text-rose-700 px-2 font-medium">Delete all {products.length} products?</span>
                        <button
                          onClick={handleConfirmClearAll}
                          className="px-3 py-1 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-[11px] font-bold"
                        >
                          Yes, Delete All
                        </button>
                        <button
                          onClick={() => setShowClearConfirm(false)}
                          className="px-2 py-1 text-gray-500 hover:text-gray-700 text-[11px]"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowClearConfirm(true)}
                        className="px-4 py-2.5 rounded-full text-xs font-semibold text-rose-600 border border-rose-200 hover:bg-rose-50 transition-colors flex items-center gap-1.5"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear All Products</span>
                      </button>
                    )}
                  </>
                )}

                {products.length === 0 && (
                  <button
                    onClick={loadSampleProducts}
                    className="px-4 py-2.5 rounded-full text-xs font-semibold text-[#BA4A6E] border border-[#F4D3DA] hover:bg-[#FDF0F3] transition-colors flex items-center gap-1.5"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Load Demo Samples</span>
                  </button>
                )}

                <button
                  onClick={handleOpenAddModal}
                  className="btn-mauve px-5 py-2.5 rounded-full text-xs font-semibold flex items-center gap-2 shadow-sm"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add New Product</span>
                </button>
              </div>
            </div>

            {/* Products Table or Empty Notice */}
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-3xl border border-[#F4D3DA] p-8 space-y-4 shadow-card">
                <div className="w-16 h-16 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center mx-auto">
                  <Package className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-serif text-lg font-medium text-[#2D2427]">
                    No Products In Catalogue
                  </h3>
                  <p className="text-xs text-[#8C7E83] max-w-md mx-auto">
                    All sample products have been cleared. Click "Add New Product" to upload your jewellery finds with direct Amazon affiliate links.
                  </p>
                </div>
                <button
                  onClick={handleOpenAddModal}
                  className="btn-mauve px-6 py-2.5 rounded-full text-xs font-semibold inline-flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Your First Product</span>
                </button>
              </div>
            ) : (
              <div className="bg-white rounded-3xl border border-[#F4D3DA] overflow-hidden shadow-card">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#FDF0F3] border-b border-[#F4D3DA] text-[#6E6266] uppercase text-[10px] tracking-wider font-bold">
                      <tr>
                        <th className="p-4 whitespace-nowrap">Product</th>
                        <th className="p-4 whitespace-nowrap">Category / Brand</th>
                        <th className="p-4 whitespace-nowrap">Pricing</th>
                        <th className="p-4 whitespace-nowrap">Discount</th>
                        <th className="p-4 whitespace-nowrap">Rating</th>
                        <th className="p-4 whitespace-nowrap">Direct Amazon URL</th>
                        <th className="p-4 text-right whitespace-nowrap">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-pink-50">
                      {filteredList.map((p) => {
                        const directUrl = getAffiliateUrl(p);

                        return (
                          <tr key={p.id} className="hover:bg-[#FFF9FA] transition-colors">
                            <td className="p-4">
                              <div className="flex items-center gap-3">
                                <div className="w-12 h-12 rounded-xl overflow-hidden bg-rose-50 flex-shrink-0 border border-pink-100">
                                  <img
                                    src={p.imageUrl}
                                    alt={p.title}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80';
                                    }}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                                <div className="min-w-0 max-w-xs">
                                  <div className="font-semibold text-[#2D2427] truncate">{p.title}</div>
                                  <div className="text-[11px] text-[#8C7E83] flex items-center gap-1.5 mt-0.5">
                                    {p.badges?.map((b) => (
                                      <span key={b} className="bg-[#FCEEF0] text-[#BA4A6E] px-1.5 py-0.5 rounded text-[9px] font-bold">
                                        {b}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="p-4 whitespace-nowrap text-[#4A3E42]">
                              <div className="font-medium">{p.category}</div>
                              <div className="text-[11px] text-[#8C7E83]">{p.brand}</div>
                            </td>
                            <td className="p-4 whitespace-nowrap text-[#2D2427]">
                              <div className="font-bold">₹{p.offerPrice.toLocaleString('en-IN')}</div>
                              <div className="text-[11px] text-gray-400 line-through">₹{p.mrp.toLocaleString('en-IN')}</div>
                            </td>
                            <td className="p-4 whitespace-nowrap font-bold text-[#BA4A6E]">
                              {p.discountPercent}% OFF
                            </td>
                            <td className="p-4 whitespace-nowrap">
                              <span className="font-semibold text-[#2D2427]">★ {p.rating}</span>
                              <span className="text-[11px] text-[#8C7E83]"> ({p.reviewsCount})</span>
                            </td>
                            <td className="p-4 whitespace-nowrap">
                              <a
                                href={directUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-[#BA4A6E] hover:underline flex items-center gap-1 text-[11px] font-medium"
                              >
                                <span>Test Amazon Link</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            </td>
                            <td className="p-4 text-right whitespace-nowrap">
                              <div className="flex items-center justify-end gap-2">
                                <button
                                  onClick={() => handleOpenEditModal(p)}
                                  className="p-1.5 rounded-lg text-[#6E6266] hover:text-[#BA4A6E] hover:bg-[#FDF0F3]"
                                  title="Edit product"
                                >
                                  <Edit className="w-4 h-4" />
                                </button>
                                <button
                                  onClick={() => handleDeleteProduct(p.id)}
                                  className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50"
                                  title="Delete product"
                                >
                                  <Trash2 className="w-4 h-4" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Social Media Accounts Section */}
        {activeTab === 'social' && (
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSaveSocial} className="bg-white rounded-3xl border border-[#F4D3DA] p-6 sm:p-8 space-y-6 shadow-card">
              <div className="border-b border-pink-50 pb-4 flex items-center justify-between">
                <div>
                  <h3 className="font-serif text-xl font-medium text-[#2D2427]">
                    Social Media Profiles
                  </h3>
                  <p className="text-xs text-[#8C7E83] mt-0.5">
                    Connect your brand accounts. These links update across the header announcement bar, footer, and Pinterest badges.
                  </p>
                </div>
                <button
                  type="submit"
                  className="btn-mauve px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save Social Accounts</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#2D2427] flex items-center gap-2 mb-1.5">
                    <Instagram className="w-4 h-4 text-[#BA4A6E]" />
                    <span>Instagram Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.instagram || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, instagram: e.target.value })}
                    placeholder="https://instagram.com/yourbrand"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] flex items-center gap-2 mb-1.5">
                    <svg className="w-4 h-4 fill-[#E60023]" viewBox="0 0 24 24">
                      <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.747-7.25 7.915-7.25 4.197 0 7.458 2.991 7.458 6.993 0 4.173-2.631 7.525-6.283 7.525-1.226 0-2.379-.637-2.774-1.391l-.755 2.876c-.273 1.045-1.012 2.355-1.508 3.155C10.126 23.834 11.047 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                    </svg>
                    <span>Pinterest Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.pinterest || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, pinterest: e.target.value })}
                    placeholder="https://pinterest.com/yourbrand"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] flex items-center gap-2 mb-1.5">
                    <Youtube className="w-4 h-4 text-red-600" />
                    <span>YouTube Channel URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.youtube || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, youtube: e.target.value })}
                    placeholder="https://youtube.com/@yourchannel"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] flex items-center gap-2 mb-1.5">
                    <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    <span>Twitter / X Profile URL</span>
                  </label>
                  <input
                    type="url"
                    value={socialForm.twitter || ''}
                    onChange={(e) => setSocialForm({ ...socialForm, twitter: e.target.value })}
                    placeholder="https://x.com/yourhandle"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                  />
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="btn-mauve px-6 py-2.5 rounded-xl text-xs font-semibold flex items-center gap-2 shadow-sm"
                >
                  <Save className="w-4 h-4" />
                  <span>Update All Social Links</span>
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 3: Amazon Payments & Commission Section */}
        {activeTab === 'payments' && (
          <div className="space-y-8">
            
            {/* Payment Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="p-6 rounded-3xl bg-white border border-[#F4D3DA] shadow-card">
                <div className="flex items-center justify-between text-xs text-[#8C7E83]">
                  <span>Total Commission Earned</span>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="text-3xl font-serif font-bold text-emerald-600 mt-2">
                  ₹{totalCommissionEarned.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-[#8C7E83] mt-1">
                  Accumulated from customer purchases through your affiliate links.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#F4D3DA] shadow-card">
                <div className="flex items-center justify-between text-xs text-[#8C7E83]">
                  <span>Approved & Paid Payouts</span>
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div className="text-3xl font-serif font-bold text-blue-600 mt-2">
                  ₹{paidCommission.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-[#8C7E83] mt-1">
                  Transferred to your bank account via Amazon NEFT / Direct Deposit.
                </p>
              </div>

              <div className="p-6 rounded-3xl bg-white border border-[#F4D3DA] shadow-card">
                <div className="flex items-center justify-between text-xs text-[#8C7E83]">
                  <span>Processing / Pending Clearance</span>
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div className="text-3xl font-serif font-bold text-amber-600 mt-2">
                  ₹{pendingCommission.toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                </div>
                <p className="text-[11px] text-[#8C7E83] mt-1">
                  Awaiting Amazon 60-day return window completion.
                </p>
              </div>
            </div>

            {/* Commission Log Table */}
            <div className="bg-white rounded-3xl border border-[#F4D3DA] overflow-hidden shadow-card">
              <div className="p-5 border-b border-[#F4D3DA] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <h4 className="font-serif text-lg font-medium text-[#2D2427]">
                    Product Commission Ledger
                  </h4>
                  <p className="text-xs text-[#8C7E83]">
                    See which exact products earned commissions and their Amazon order statuses.
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href="https://affiliate-program.amazon.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] hover:bg-white text-xs font-semibold text-[#BA4A6E] flex items-center gap-1.5"
                  >
                    <span>Amazon Central Portal</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>

                  <button
                    onClick={() => setIsAddCommissionModalOpen(true)}
                    className="btn-mauve px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Record Amazon Payout</span>
                  </button>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FDF0F3] border-b border-[#F4D3DA] text-[#6E6266] uppercase text-[10px] tracking-wider font-bold">
                    <tr>
                      <th className="p-4">Date</th>
                      <th className="p-4">Product Purchased</th>
                      <th className="p-4">Order Price</th>
                      <th className="p-4">Qty</th>
                      <th className="p-4">Bounty Rate</th>
                      <th className="p-4">Commission (₹)</th>
                      <th className="p-4">Amazon Order ID</th>
                      <th className="p-4 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {commissions.length === 0 ? (
                      <tr>
                        <td colSpan={8} className="p-12 text-center text-[#8C7E83]">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center">
                              <DollarSign className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-sm text-[#2D2427]">
                                No Commissions Recorded Yet (₹0.00)
                              </p>
                              <p className="text-xs text-[#8C7E83] max-w-sm">
                                As orders happen through your Amazon affiliate links, you can log them using the "Record Commission" button above or import reports via CSV.
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      commissions.map((item) => (
                        <tr key={item.id} className="hover:bg-[#FFF9FA]">
                          <td className="p-4 text-[#8C7E83] whitespace-nowrap">{item.date}</td>
                          <td className="p-4 font-semibold text-[#2D2427] max-w-xs truncate">
                            {item.productTitle}
                          </td>
                          <td className="p-4 font-bold text-[#2D2427]">
                            ₹{item.productPrice.toLocaleString('en-IN')}
                          </td>
                          <td className="p-4">{item.quantityOrdered}</td>
                          <td className="p-4 font-mono font-medium text-[#BA4A6E]">
                            {(item.commissionRate * 100).toFixed(0)}%
                          </td>
                          <td className="p-4 font-bold text-emerald-600 text-sm">
                            ₹{item.commissionAmount.toFixed(2)}
                          </td>
                          <td className="p-4 font-mono text-[11px] text-[#8C7E83]">
                            {item.amazonOrderId || 'Direct Attribution'}
                          </td>
                          <td className="p-4 text-right">
                            <span
                              className={`inline-block px-2.5 py-1 rounded-full text-[10px] font-bold ${
                                item.status === 'Approved & Paid'
                                  ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                  : item.status === 'Processing (Amazon)'
                                  ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                  : 'bg-amber-50 text-amber-700 border border-amber-200'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        )}

        {/* Tab 4: Homepage CMS & Guides */}
        {activeTab === 'cms' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <form onSubmit={handleSaveCMS} className="bg-white rounded-3xl border border-[#F4D3DA] p-6 sm:p-8 space-y-6 shadow-card">
              <div className="flex items-center justify-between border-b border-pink-50 pb-4">
                <div className="flex items-center gap-2 font-serif text-lg font-medium text-[#2D2427]">
                  <Settings className="w-5 h-5 text-[#BA4A6E]" />
                  <span>Homepage Hero & Branding</span>
                </div>
                <button
                  type="submit"
                  className="btn-mauve px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <Save className="w-3.5 h-3.5" />
                  <span>Save CMS</span>
                </button>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <label className="font-semibold text-[#2D2427] block mb-1">Amazon Associate Affiliate Tag</label>
                  <input
                    type="text"
                    value={cmsSettings.amazonTag}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, amazonTag: e.target.value })}
                    placeholder="e.g. prachifinds-21"
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                  />
                  <p className="text-[11px] text-[#8C7E83] mt-1">This tag is automatically injected into all outbound Amazon clicks.</p>
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] block mb-1">Hero Pill Tag</label>
                  <input
                    type="text"
                    value={cmsSettings.heroTag}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroTag: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] block mb-1">Hero H1 Headline</label>
                  <input
                    type="text"
                    value={cmsSettings.heroHeadline}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroHeadline: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] block mb-1">Hero Subtitle</label>
                  <textarea
                    rows={2}
                    value={cmsSettings.heroSubtitle}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroSubtitle: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] block mb-1">Hero Image URL</label>
                  <input
                    type="text"
                    value={cmsSettings.heroImageUrl}
                    onChange={(e) => setCmsSettings({ ...cmsSettings, heroImageUrl: e.target.value })}
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>

                <div>
                  <label className="font-semibold text-[#2D2427] block mb-1">Announcement Perks (1 per line)</label>
                  <textarea
                    rows={3}
                    value={cmsSettings.announcements.join('\n')}
                    onChange={(e) =>
                      setCmsSettings({
                        ...cmsSettings,
                        announcements: e.target.value.split('\n').filter((x) => x.trim()),
                      })
                    }
                    className="w-full px-3.5 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>
              </div>
            </form>

            <div className="space-y-6">
              <div className="bg-white rounded-3xl border border-[#F4D3DA] p-6 shadow-card space-y-4">
                <h3 className="font-serif text-base font-medium text-[#2D2427]">
                  Published Jewellery Guides ({guides.length})
                </h3>
                <div className="space-y-3">
                  {guides.map((g) => (
                    <div key={g.id} className="p-3 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#BA4A6E] uppercase">{g.category}</span>
                        <h4 className="text-xs font-semibold text-[#2D2427]">{g.title}</h4>
                        <span className="text-[11px] text-[#8C7E83]">{g.readTime}</span>
                      </div>
                      <span className="text-xs text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full font-medium">
                        Live on Site
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-3xl border border-[#F4D3DA] p-6 shadow-card space-y-4">
                <h3 className="font-serif text-base font-medium text-[#2D2427]">
                  Curated Collection Banners ({banners.length})
                </h3>
                <div className="space-y-3">
                  {banners.map((b) => (
                    <div key={b.id} className="p-3 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold text-[#BA4A6E] uppercase">{b.badge}</span>
                        <h4 className="text-xs font-semibold text-[#2D2427]">{b.title}</h4>
                        <p className="text-[11px] text-[#8C7E83]">{b.subtitle}</p>
                      </div>
                      <div className="w-10 h-10 rounded-xl overflow-hidden">
                        <img src={b.imageUrl} alt={b.title} className="w-full h-full object-cover" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Outbound Click Tracker */}
        {activeTab === 'analytics' && (
          <div className="space-y-8">
            <div className="bg-white rounded-3xl border border-[#F4D3DA] overflow-hidden shadow-card">
              <div className="p-5 border-b border-[#F4D3DA] flex items-center justify-between">
                <h4 className="font-serif text-base font-medium text-[#2D2427]">
                  Recent Outbound Amazon Clicks Log ({clickLogs.length})
                </h4>
              </div>

              <div className="overflow-x-auto max-h-96">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FDF0F3] text-[#6E6266] uppercase text-[10px] tracking-wider font-bold sticky top-0">
                    <tr>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Product Title</th>
                      <th className="p-3.5">Price</th>
                      <th className="p-3.5">Referrer Source</th>
                      <th className="p-3.5">Country</th>
                      <th className="p-3.5">Amazon Tag Used</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {clickLogs.length === 0 ? (
                      <tr>
                        <td colSpan={6} className="p-12 text-center text-[#8C7E83]">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center">
                              <MousePointerClick className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-sm text-[#2D2427]">
                                0 Outbound Clicks Logged
                              </p>
                              <p className="text-xs text-[#8C7E83] max-w-sm">
                                Visitor clicks from Pinterest, Instagram, or search to your Amazon affiliate links will appear here in real time with source tracking.
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      clickLogs.map((log) => (
                        <tr key={log.id} className="hover:bg-[#FFF9FA]">
                          <td className="p-3.5 text-[#8C7E83] whitespace-nowrap">
                            {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                          </td>
                          <td className="p-3.5 font-medium text-[#2D2427] max-w-xs truncate">
                            {log.productTitle}
                          </td>
                          <td className="p-3.5 font-bold">₹{log.productPrice}</td>
                          <td className="p-3.5">
                            <span
                              className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                                log.referrer === 'Pinterest'
                                  ? 'bg-red-50 text-[#E60023] border border-red-200'
                                  : log.referrer === 'Instagram'
                                  ? 'bg-purple-50 text-purple-700 border border-purple-200'
                                  : 'bg-gray-100 text-gray-700'
                              }`}
                            >
                              {log.referrer}
                            </span>
                          </td>
                          <td className="p-3.5 text-[#6E6266]">{log.userCountry || 'India'}</td>
                          <td className="p-3.5 font-mono text-[11px] text-[#BA4A6E]">{log.amazonTag}</td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 6: Bulk CSV / JSON Import & Export */}
        {activeTab === 'import-export' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-3xl border border-[#F4D3DA] p-6 sm:p-8 space-y-4 shadow-card">
              <div className="flex items-center gap-2 font-serif text-lg font-medium text-[#2D2427]">
                <Download className="w-5 h-5 text-[#BA4A6E]" />
                <span>Export Product Catalogue</span>
              </div>
              <p className="text-xs text-[#6E6266] leading-relaxed">
                Download your current catalogue with all Amazon affiliate links, image URLs, pricing, and tag facets.
              </p>
              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleExportCSV}
                  className="btn-mauve px-5 py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
                >
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Export as CSV</span>
                </button>
                <button
                  onClick={handleExportJSON}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold text-[#BA4A6E] border border-[#F4D3DA] hover:bg-[#FDF0F3] flex items-center justify-center gap-2"
                >
                  <span>Export as JSON</span>
                </button>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-[#F4D3DA] p-6 sm:p-8 space-y-4 shadow-card">
              <div className="flex items-center gap-2 font-serif text-lg font-medium text-[#2D2427]">
                <Upload className="w-5 h-5 text-[#BA4A6E]" />
                <span>Bulk Import Products</span>
              </div>
              <p className="text-xs text-[#6E6266] leading-relaxed">
                Upload a JSON array file to replace or append products to the catalogue.
              </p>
              <div className="pt-2">
                <label className="border-2 border-dashed border-[#F4D3DA] hover:border-[#BA4A6E] rounded-2xl p-6 flex flex-col items-center justify-center cursor-pointer transition-colors bg-[#FFF9FA]">
                  <Upload className="w-8 h-8 text-[#BA4A6E] mb-2" />
                  <span className="text-xs font-medium text-[#2D2427]">Click to select JSON catalogue file</span>
                  <span className="text-[10px] text-gray-400 mt-1">.json files supported</span>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleImportJSON}
                    className="hidden"
                  />
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Security & Passcode (100% Free Lifetime) */}
        {activeTab === 'security' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2D2427]">
                  Security & Administrator Passcode
                </h3>
                <p className="text-xs text-[#6E6266]">
                  Manage your store login passcode, recovery phone number, and email. 100% Free Lifetime guarantee.
                </p>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>₹0 / $0 Cost Guaranteed</span>
              </div>
            </div>

            {securityTabSuccess && (
              <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>{securityTabSuccess}</span>
              </div>
            )}

            {securityTabError && (
              <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>{securityTabError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Card 1: Change Administrator Passcode */}
              <div className="bg-white rounded-3xl border border-[#F4D3DA] p-6 shadow-card space-y-5">
                <div className="flex items-center gap-2.5 pb-2 border-b border-pink-50">
                  <div className="w-8 h-8 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center">
                    <Key className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#2D2427]">Change Administrator Passcode</h4>
                    <p className="text-[11px] text-[#8C7E83]">Replace current passcode with a new private passcode</p>
                  </div>
                </div>

                <form onSubmit={handleChangePasscode} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold block mb-1 text-[#2D2427]">Current Passcode *</label>
                    <input
                      type={showSecurityPasscode ? "text" : "password"}
                      required
                      value={securityForm.currentPasscode}
                      onChange={(e) => setSecurityForm({ ...securityForm, currentPasscode: e.target.value })}
                      placeholder="Enter existing passcode"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="font-semibold block mb-1 text-[#2D2427]">New Passcode *</label>
                      <input
                        type={showSecurityPasscode ? "text" : "password"}
                        required
                        value={securityForm.newPasscode}
                        onChange={(e) => setSecurityForm({ ...securityForm, newPasscode: e.target.value })}
                        placeholder="At least 4 characters"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                      />
                    </div>
                    <div>
                      <label className="font-semibold block mb-1 text-[#2D2427]">Confirm New Passcode *</label>
                      <input
                        type={showSecurityPasscode ? "text" : "password"}
                        required
                        value={securityForm.confirmPasscode}
                        onChange={(e) => setSecurityForm({ ...securityForm, confirmPasscode: e.target.value })}
                        placeholder="Re-enter new passcode"
                        className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setShowSecurityPasscode(!showSecurityPasscode)}
                      className="text-[11px] text-[#8C7E83] hover:text-[#BA4A6E] flex items-center gap-1"
                    >
                      {showSecurityPasscode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                      <span>{showSecurityPasscode ? 'Hide characters' : 'Show characters'}</span>
                    </button>

                    <button
                      type="submit"
                      className="btn-mauve px-5 py-2.5 rounded-xl text-xs font-bold shadow-hover flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Update Passcode</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 2: Registered Owner & Store Settings */}
              <div className="bg-white rounded-3xl border border-[#F4D3DA] p-6 shadow-card space-y-5">
                <div className="flex items-center gap-2.5 pb-2 border-b border-pink-50">
                  <div className="w-8 h-8 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-[#2D2427]">Owner Profile & Amazon Settings</h4>
                    <p className="text-[11px] text-[#8C7E83]">Display name, Amazon Associates tracking tag & recovery contacts</p>
                  </div>
                </div>

                <form onSubmit={handleSaveContactDetails} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold block mb-1 text-[#2D2427]">Store Owner Display Name</label>
                    <div className="relative">
                      <User className="w-4 h-4 absolute left-3.5 top-3 text-[#A59499]" />
                      <input
                        type="text"
                        required
                        value={securityForm.adminUsername}
                        onChange={(e) => setSecurityForm({ ...securityForm, adminUsername: e.target.value })}
                        placeholder="e.g. Prachi Shukla"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="font-semibold block text-[#2D2427]">Amazon Associates Tracking Tag</label>
                      <span className="text-[10px] text-[#BA4A6E] font-medium">Optional / Update anytime</span>
                    </div>
                    <div className="relative">
                      <Tag className="w-4 h-4 absolute left-3.5 top-3 text-[#A59499]" />
                      <input
                        type="text"
                        value={securityForm.amazonTag}
                        onChange={(e) => setSecurityForm({ ...securityForm, amazonTag: e.target.value })}
                        placeholder="e.g. prachifinds-21 or leave blank"
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] font-mono text-xs"
                      />
                    </div>
                    <p className="text-[10px] text-[#8C7E83] mt-1">
                      Haven&apos;t received your tag from Amazon yet? Leave this blank. All &ldquo;Buy on Amazon&rdquo; links will work seamlessly.
                    </p>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-[#2D2427]">Admin Gmail Address (For Free OTP Recovery)</label>
                    <div className="relative">
                      <Mail className="w-4 h-4 absolute left-3.5 top-3 text-[#A59499]" />
                      <input
                        type="email"
                        required
                        value={securityForm.adminEmail}
                        onChange={(e) => setSecurityForm({ ...securityForm, adminEmail: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold block mb-1 text-[#2D2427]">Admin Mobile Phone Number</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 absolute left-3.5 top-3 text-[#A59499]" />
                      <input
                        type="text"
                        required
                        value={securityForm.adminPhone}
                        onChange={(e) => setSecurityForm({ ...securityForm, adminPhone: e.target.value })}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                      />
                    </div>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="btn-mauve px-5 py-2.5 rounded-xl text-xs font-bold shadow-hover flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Store Settings & Contacts</span>
                    </button>
                  </div>
                </form>
              </div>

              {/* Card 3: Google OAuth 2.0 Client Configuration (100% Free Lifetime) */}
              <div className="bg-white rounded-3xl border border-[#F4D3DA] p-6 shadow-card space-y-5 lg:col-span-2">
                <div className="flex items-center justify-between pb-2 border-b border-pink-50">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#DADCE0] flex items-center justify-center shadow-xs">
                      <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path
                          fill="#4285F4"
                          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                        />
                        <path
                          fill="#34A853"
                          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                        />
                        <path
                          fill="#FBBC05"
                          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                        />
                        <path
                          fill="#EA4335"
                          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                        />
                      </svg>
                    </div>
                    <div>
                      <h4 className="font-semibold text-sm text-[#2D2427]">Google Sign In & OAuth 2.0 (100% Free Lifetime)</h4>
                      <p className="text-[11px] text-[#8C7E83]">Directly connects "Continue with Google" to accounts.google.com with zero fees</p>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2.5 py-1 rounded-full">
                    Zero Cost / Free Forever
                  </span>
                </div>

                <form onSubmit={handleSaveGoogleClientDetails} className="space-y-4 text-xs">
                  <div>
                    <label className="font-semibold block mb-1 text-[#2D2427]">Google Cloud OAuth 2.0 Client ID</label>
                    <input
                      type="text"
                      value={securityForm.googleClientId}
                      onChange={(e) => setSecurityForm({ ...securityForm, googleClientId: e.target.value })}
                      placeholder="e.g. 650100866xxx-xxxxxxxx.apps.googleusercontent.com"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] font-mono text-xs"
                    />
                    <p className="text-[11px] text-[#8C7E83] mt-1.5 leading-relaxed">
                      Google OAuth 2.0 is 100% Free forever from Google Cloud Console. When entered, tapping "Continue with Google" directly redirects visitors to <code className="bg-white px-1 py-0.5 rounded border border-[#F4D3DA]">accounts.google.com</code> to pick their account.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] space-y-1.5 text-[11px] text-[#6E6266]">
                    <div className="font-semibold text-[#BA4A6E]">How to get your Free Google Client ID (2 minutes):</div>
                    <ol className="list-decimal pl-4 space-y-1 leading-relaxed">
                      <li>Visit <a href="https://console.cloud.google.com/apis/credentials" target="_blank" rel="noreferrer" className="text-[#BA4A6E] underline">console.cloud.google.com/apis/credentials</a> (Free, no credit card required).</li>
                      <li>Click <strong>Create Credentials &gt; OAuth client ID &gt; Web Application</strong>.</li>
                      <li>Add Authorized JavaScript origin: <code className="bg-white px-1 py-0.5 rounded border">http://localhost:3000</code>.</li>
                      <li>Add Authorized redirect URI: <code className="bg-white px-1 py-0.5 rounded border">http://localhost:3000/auth/callback</code>.</li>
                      <li>Copy the generated Client ID and paste it here!</li>
                    </ol>
                  </div>

                  <div className="flex justify-end pt-1">
                    <button
                      type="submit"
                      className="btn-mauve px-5 py-2.5 rounded-xl text-xs font-bold shadow-hover flex items-center gap-1.5"
                    >
                      <Save className="w-3.5 h-3.5" />
                      <span>Save Google Client ID</span>
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Card 3: Free-Tier Lifetime Guarantee Info */}
            <div className="p-5 rounded-3xl bg-linear-to-r from-[#FDF0F3] to-[#FFF9FA] border border-[#F4D3DA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#F4D3DA] text-[#BA4A6E] flex items-center justify-center shadow-xs shrink-0">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#2D2427]">Strict ₹0 / $0 Lifetime Free Security</h4>
                  <p className="text-[11px] text-[#6E6266] max-w-xl leading-relaxed mt-0.5">
                    Your security credentials and recovery tokens run entirely on zero-cost, persistent client encrypted storage. No paid Twilio SMS subscriptions, no monthly charges, and no recurring bills forever.
                  </p>
                </div>
              </div>
              <div className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl shrink-0">
                100% Free Forever
              </div>
            </div>
          </div>
        )}

        {/* Tab 8: Subscribers & Automatic Product Alerts (100% Free Lifetime) */}
        {activeTab === 'subscribers' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2D2427] flex items-center gap-2">
                  <Mail className="w-5 h-5 text-[#BA4A6E]" />
                  <span>Subscribers &amp; Automatic Product Alerts</span>
                </h3>
                <p className="text-xs text-[#6E6266] mt-0.5">
                  Subscribers automatically receive an alert email whenever you upload or publish a new jewellery product.
                </p>
              </div>

              <div className="flex items-center gap-2.5 flex-wrap">
                <button
                  type="button"
                  onClick={handleSendTestProductAlert}
                  disabled={isSendingTestAlert || subscribers.length === 0}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-white border border-[#F4D3DA] text-[#BA4A6E] hover:bg-[#FDF0F3] transition-all flex items-center gap-1.5 shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                  title="Send a sample product launch alert to all subscribers"
                >
                  {isSendingTestAlert ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Send className="w-3.5 h-3.5" />
                  )}
                  <span>{isSendingTestAlert ? 'Broadcasting...' : 'Send Test Alert'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleExportSubscribersCSV}
                  disabled={subscribers.length === 0}
                  className="btn-mauve px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 shadow-hover disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Export CSV</span>
                </button>
              </div>
            </div>

            {/* Automation Banner */}
            <div className="p-5 rounded-3xl bg-linear-to-r from-[#FDF0F3] to-[#FFF9FA] border border-[#F4D3DA] flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
              <div className="flex items-start gap-3.5">
                <div className="w-10 h-10 rounded-2xl bg-white border border-[#F4D3DA] text-[#BA4A6E] flex items-center justify-center shadow-xs shrink-0 mt-0.5">
                  <Sparkles className="w-5 h-5 text-[#BA4A6E]" />
                </div>
                <div className="space-y-1">
                  <h4 className="text-xs font-bold text-[#2D2427] flex items-center gap-2">
                    <span>100% Free Lifetime Auto-Dispatch via Google Gmail</span>
                    <span className="text-[10px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
                      Zero Cost Forever
                    </span>
                  </h4>
                  <p className="text-[11px] text-[#6E6266] leading-relaxed max-w-3xl">
                    Every time you click &ldquo;Save &amp; Publish Find&rdquo; in Product Management, an email alert with the product photo, offer price, discount badge, and your direct Amazon link is automatically broadcasted to all subscribers via Gmail SMTP (<code className="text-[#BA4A6E] font-medium">prachishukla921@gmail.com</code>).
                  </p>
                </div>
              </div>

              <div className="text-right shrink-0">
                <span className="text-2xl font-serif font-bold text-[#BA4A6E]">
                  {subscribers.length}
                </span>
                <p className="text-[10px] text-[#8C7E83] uppercase tracking-wider font-semibold">
                  Active Subscribers
                </p>
              </div>
            </div>

            {/* Subscribers Table */}
            <div className="bg-white rounded-3xl border border-[#F4D3DA] overflow-hidden shadow-card">
              <div className="p-5 border-b border-[#F4D3DA] flex items-center justify-between">
                <h4 className="font-serif text-base font-medium text-[#2D2427]">
                  Subscriber Roster ({subscribers.length})
                </h4>
                <span className="text-xs text-[#8C7E83]">
                  Updated live from storefront newsletter and footer signups
                </span>
              </div>

              <div className="overflow-x-auto max-h-[500px]">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FDF0F3] text-[#6E6266] uppercase text-[10px] tracking-wider font-bold sticky top-0">
                    <tr>
                      <th className="p-3.5">#</th>
                      <th className="p-3.5">Subscriber Email</th>
                      <th className="p-3.5">Subscribed Date</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-pink-50">
                    {subscribers.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="p-12 text-center text-[#8C7E83]">
                          <div className="flex flex-col items-center justify-center space-y-3">
                            <div className="w-12 h-12 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center">
                              <Mail className="w-6 h-6 stroke-[1.5]" />
                            </div>
                            <div className="space-y-1">
                              <p className="font-semibold text-sm text-[#2D2427]">
                                0 Subscribers Yet
                              </p>
                              <p className="text-xs text-[#8C7E83] max-w-sm">
                                When visitors enter their email on the storefront newsletter bar or footer, they will appear here and receive automatic product launch notifications.
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    ) : (
                      subscribers.map((sub, idx) => (
                        <tr key={sub.email} className="hover:bg-[#FFF9FA]">
                          <td className="p-3.5 text-[#8C7E83] font-mono text-[11px]">{idx + 1}</td>
                          <td className="p-3.5 font-medium text-[#2D2427]">
                            <div className="flex items-center gap-2">
                              <Mail className="w-3.5 h-3.5 text-[#BA4A6E]" />
                              <span>{sub.email}</span>
                            </div>
                          </td>
                          <td className="p-3.5 text-[#8C7E83] whitespace-nowrap">
                            {new Date(sub.subscribedAt).toLocaleString('en-IN', {
                              day: 'numeric',
                              month: 'short',
                              year: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </td>
                          <td className="p-3.5">
                            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-50 text-emerald-700 border border-emerald-200">
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                              <span>Active</span>
                            </span>
                          </td>
                          <td className="p-3.5 text-right">
                            <button
                              type="button"
                              onClick={() => {
                                if (confirm(`Remove ${sub.email} from subscriber list?`)) {
                                  deleteSubscriber(sub.email);
                                  showToast(`Removed ${sub.email}`);
                                }
                              }}
                              className="p-1.5 rounded-lg text-rose-500 hover:bg-rose-50 hover:text-rose-700 transition-colors cursor-pointer"
                              title="Delete subscriber"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {isAddProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAddProductModalOpen(false)}
          />

          <div className="relative w-full max-w-2xl bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl p-6 sm:p-8 z-10 my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-medium text-[#2D2427] mb-4">
              {editingProduct ? 'Edit Jewellery Find' : 'Add New Amazon Jewellery Find'}
            </h3>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-[#2D2427]">Product Title *</label>
                <input
                  type="text"
                  required
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. 18K Gold Plated Teardrop Earrings"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  >
                    <option value="Earrings">Earrings</option>
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Jewellery Sets">Jewellery Sets</option>
                    <option value="Gift Ideas">Gift Ideas</option>
                  </select>
                </div>

                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Brand</label>
                  <input
                    type="text"
                    value={formData.brand}
                    onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                    placeholder="e.g. Giva, Mia by Tanishq, Yellow Chimes"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">MRP (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.mrp}
                    onChange={(e) => handlePriceChange(Number(e.target.value), Number(formData.offerPrice || 0))}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Offer Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={formData.offerPrice}
                    onChange={(e) => handlePriceChange(Number(formData.mrp || 0), Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Discount %</label>
                  <input
                    type="number"
                    readOnly
                    value={formData.discountPercent}
                    className="w-full px-3 py-2 rounded-xl border border-gray-200 bg-gray-50 text-gray-500"
                  />
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1 text-[#2D2427]">
                  Amazon Affiliate / Product Link
                </label>
                <input
                  type="text"
                  value={formData.amazonUrl}
                  onChange={(e) => setFormData({ ...formData, amazonUrl: e.target.value })}
                  placeholder="https://www.amazon.in/dp/... (Tag will be auto-appended)"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                />
                <p className="text-[11px] text-[#8C7E83] mt-1">
                  Paste any Amazon India product URL. The tag <strong className="text-[#BA4A6E]">{settings.amazonTag}</strong> is appended automatically.
                </p>
              </div>

              <div className="space-y-2">
                <label className="font-semibold block text-[#2D2427]">Product Image</label>
                <div className="flex flex-col sm:flex-row items-center gap-3">
                  <input
                    type="text"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="Paste image URL (https://...)"
                    className="flex-1 w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                  <div className="flex items-center gap-2">
                    <span className="text-gray-400 text-xs">or</span>
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2.5 rounded-xl border border-[#F4D3DA] bg-white hover:bg-[#FDF0F3] text-[#BA4A6E] font-semibold flex items-center gap-1.5 whitespace-nowrap"
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>Upload from PC</span>
                    </button>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileUpload}
                      className="hidden"
                    />
                  </div>
                </div>

                {formData.imageUrl && (
                  <div className="mt-2 flex items-center gap-3 p-2 bg-[#FAF3F5] rounded-xl border border-pink-100">
                    <div className="w-14 h-14 rounded-lg overflow-hidden border border-pink-200 flex-shrink-0">
                      <img src={formData.imageUrl} alt="preview" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-[11px] text-emerald-700 font-medium">
                      ✓ Image preview active
                    </div>
                  </div>
                )}
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Style</label>
                  <select
                    value={formData.style}
                    onChange={(e) => setFormData({ ...formData, style: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  >
                    <option value="Minimal">Minimal</option>
                    <option value="Traditional">Traditional</option>
                    <option value="Trendy">Trendy</option>
                    <option value="Classic">Classic</option>
                    <option value="Boho">Boho</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Material</label>
                  <select
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  >
                    <option value="Gold Plated">Gold Plated</option>
                    <option value="Silver">Silver</option>
                    <option value="Stainless Steel">Stainless Steel</option>
                    <option value="Pearl">Pearl</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Occasion</label>
                  <select
                    value={formData.occasion}
                    onChange={(e) => setFormData({ ...formData, occasion: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  >
                    <option value="Daily Wear">Daily Wear</option>
                    <option value="Office Wear">Office Wear</option>
                    <option value="Party Wear">Party Wear</option>
                    <option value="Wedding">Wedding</option>
                    <option value="Festive">Festive</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1 text-[#2D2427]">Description</label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                />
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-pink-50">
                <button
                  type="button"
                  onClick={() => setIsAddProductModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs text-[#6E6266]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-mauve px-6 py-2 rounded-xl text-xs font-semibold"
                >
                  {editingProduct ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Record Commission / Amazon Payout Modal */}
      {isAddCommissionModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAddCommissionModalOpen(false)}
          />

          <div className="relative w-full max-w-lg bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl p-6 sm:p-8 z-10 my-auto sm:my-8 max-h-[90vh] overflow-y-auto">
            <h3 className="font-serif text-xl font-medium text-[#2D2427] mb-2">
              Record Amazon Associate Payout
            </h3>
            <p className="text-xs text-[#8C7E83] mb-4">
              Enter commission details from your Amazon Associates Central reports.
            </p>

            <form onSubmit={handleSaveCommission} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-[#2D2427]">Product Title / Item Name *</label>
                <input
                  type="text"
                  required
                  value={commissionForm.productTitle}
                  onChange={(e) => setCommissionForm({ ...commissionForm, productTitle: e.target.value })}
                  placeholder="e.g. 18K Gold Plated Hoops"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Product Price (₹) *</label>
                  <input
                    type="number"
                    required
                    value={commissionForm.productPrice}
                    onChange={(e) => setCommissionForm({ ...commissionForm, productPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Quantity Ordered</label>
                  <input
                    type="number"
                    min={1}
                    value={commissionForm.quantityOrdered}
                    onChange={(e) => setCommissionForm({ ...commissionForm, quantityOrdered: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Commission Rate</label>
                  <select
                    value={commissionForm.commissionRate}
                    onChange={(e) => setCommissionForm({ ...commissionForm, commissionRate: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  >
                    <option value={0.08}>8% (Jewellery Standard)</option>
                    <option value={0.09}>9% (Jewellery High Tier)</option>
                    <option value={0.05}>5% (Accessories Tier)</option>
                  </select>
                </div>
                <div>
                  <label className="font-semibold block mb-1 text-[#2D2427]">Payout Status</label>
                  <select
                    value={commissionForm.status}
                    onChange={(e) => setCommissionForm({ ...commissionForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                  >
                    <option value="Approved & Paid">Approved & Paid</option>
                    <option value="Processing (Amazon)">Processing (Amazon)</option>
                    <option value="Pending Verification">Pending Verification</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="font-semibold block mb-1 text-[#2D2427]">Amazon Order ID</label>
                <input
                  type="text"
                  value={commissionForm.amazonOrderId}
                  onChange={(e) => setCommissionForm({ ...commissionForm, amazonOrderId: e.target.value })}
                  placeholder="e.g. 402-8921821-1928312"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA]"
                />
              </div>

              <div className="p-3 bg-[#FDF0F3] rounded-xl border border-[#F4D3DA] flex items-center justify-between">
                <span className="font-semibold text-[#2D2427]">Estimated Bounty:</span>
                <span className="text-sm font-bold text-emerald-600">
                  ₹{(commissionForm.productPrice * commissionForm.quantityOrdered * commissionForm.commissionRate).toFixed(2)}
                </span>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-pink-50">
                <button
                  type="button"
                  onClick={() => setIsAddCommissionModalOpen(false)}
                  className="px-5 py-2 rounded-xl text-xs text-[#6E6266]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-mauve px-6 py-2 rounded-xl text-xs font-semibold"
                >
                  Save Commission Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Amazon Associates Tag Modal */}
      {isAmazonTagModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAmazonTagModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl p-6 sm:p-8 z-10 my-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FCEEF0] border border-[#F4D3DA] text-[#BA4A6E] flex items-center justify-center">
                <Tag className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2D2427]">
                  Amazon Associates Tag
                </h3>
                <p className="text-[11px] text-[#8C7E83]">Custom Affiliate Tracking ID</p>
              </div>
            </div>

            <form onSubmit={handleSaveAmazonTag} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-[#2D2427]">Your Amazon Tracking Tag</label>
                <input
                  type="text"
                  value={customAmazonTag}
                  onChange={(e) => setCustomAmazonTag(e.target.value)}
                  placeholder="e.g. prachifinds-21 or leave blank"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] font-mono text-xs"
                  autoFocus
                />
              </div>

              <div className="p-3.5 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] space-y-1.5 text-[11px] text-[#6E6266] leading-relaxed">
                <p className="font-semibold text-[#BA4A6E]">Haven&apos;t received your tag from Amazon yet?</p>
                <p>
                  No problem! You can leave this completely <strong>blank</strong>. While blank, all &ldquo;Buy on Amazon&rdquo; links will direct visitors straight to Amazon safely without broken tags.
                </p>
                <p>
                  Whenever Amazon approves your Associates account and provides your tag (e.g., <code>yourtag-21</code>), simply enter it here and click Save. All product links will instantly update!
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-pink-50">
                <button
                  type="button"
                  onClick={() => {
                    setCustomAmazonTag('');
                    updateAmazonTag('');
                    setIsAmazonTagModalOpen(false);
                    showToast('Amazon Tag cleared. Outbound links will connect directly to Amazon.');
                  }}
                  className="text-xs text-rose-600 hover:underline cursor-pointer"
                >
                  Clear Tag
                </button>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setIsAmazonTagModalOpen(false)}
                    className="px-4 py-2 rounded-xl text-xs text-[#6E6266] hover:bg-gray-100 cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="btn-mauve px-5 py-2 rounded-xl text-xs font-semibold shadow-hover cursor-pointer"
                  >
                    Save Tag
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Store Owner Display Name Modal */}
      {isAdminUsernameModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-xs"
            onClick={() => setIsAdminUsernameModalOpen(false)}
          />

          <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl p-6 sm:p-8 z-10 my-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-2xl bg-[#FCEEF0] border border-[#F4D3DA] text-[#BA4A6E] flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold text-[#2D2427]">
                  Store Owner Display Name
                </h3>
                <p className="text-[11px] text-[#8C7E83]">Admin identity and profile title</p>
              </div>
            </div>

            <form onSubmit={handleSaveAdminUsername} className="space-y-4 text-xs">
              <div>
                <label className="font-semibold block mb-1 text-[#2D2427]">Store Owner Name</label>
                <input
                  type="text"
                  required
                  value={customAdminUsername}
                  onChange={(e) => setCustomAdminUsername(e.target.value)}
                  placeholder="e.g. Prachi Shukla"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] bg-[#FFF9FA] focus:outline-none focus:border-[#BA4A6E] text-xs font-semibold"
                  autoFocus
                />
              </div>

              <p className="text-[11px] text-[#8C7E83] leading-relaxed">
                This display name appears on your dashboard, admin badges, and subscriber notification headers.
              </p>

              <div className="flex justify-end gap-2 pt-2 border-t border-pink-50">
                <button
                  type="button"
                  onClick={() => setIsAdminUsernameModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs text-[#6E6266] hover:bg-gray-100 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-mauve px-5 py-2 rounded-xl text-xs font-semibold shadow-hover cursor-pointer"
                >
                  Save Name
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
