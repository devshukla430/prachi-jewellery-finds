'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, Lock, Eye, EyeOff, User, Sparkles, ShieldCheck, CheckCircle, ArrowLeft, Key, ExternalLink, Loader2, Send } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AuthModal: React.FC = () => {
  const {
    isAuthModalOpen,
    setIsAuthModalOpen,
    user,
    signOut,
    signIn,
    googleSignIn,
    initiateGoogleOAuth,
    googleClientId,
    setGoogleClientId,
    registerUserAccount,
    verifyUserLogin,
    resetUserPassword,
    authModalReason,
    setAuthModalReason,
  } = useApp();

  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>('signin');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  // Forgot password state (100% Free Lifetime)
  const [forgotStep, setForgotStep] = useState<'contact' | 'otp' | 'new-password'>('contact');
  const [forgotContact, setForgotContact] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [enteredOtp, setEnteredOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [resendSeconds, setResendSeconds] = useState(0);
  const [devToastCode, setDevToastCode] = useState('');

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = setInterval(() => {
      setResendSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [resendSeconds]);

  if (!isAuthModalOpen || user) return null;

  const resetAllForms = () => {
    setError('');
    setSuccessMsg('');
    setDevToastCode('');
    setEmail('');
    setName('');
    setPassword('');
    setConfirmPassword('');
    setForgotContact('');
    setEnteredOtp('');
    setNewPassword('');
    setConfirmNewPassword('');
    setForgotStep('contact');
    setMode('signin');
  };

  const handleClose = () => {
    resetAllForms();
    setMode('signin');
    setAuthModalReason(null);
    setIsAuthModalOpen(false);
  };

  const handleGoogleSignInClick = () => {
    setError('');
    const redirected = initiateGoogleOAuth();
    if (!redirected) {
      setError('Google Sign-In is not configured yet. Please add NEXT_PUBLIC_GOOGLE_CLIENT_ID to .env.local or paste your Google Client ID in the Admin Portal (Security settings).');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    if (mode === 'signup') {
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      const res = registerUserAccount(email, password, name || 'Prachi Finds Member');
      if (!res.success) {
        setError(res.message || 'Failed to create account');
        return;
      }
      setIsAuthModalOpen(false);
    } else {
      const res = verifyUserLogin(email, password);
      if (!res.success) {
        setError(res.message || 'Incorrect credentials');
        return;
      }
      setIsAuthModalOpen(false);
    }
  };

  // Forgot Password Steps (Email-Only)
  const handleForgotContactSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError('');
    const clean = forgotContact.trim();
    if (!clean || !clean.includes('@')) {
      setError('Please enter a valid registered email address');
      return;
    }
    const code = String(Math.floor(100000 + Math.random() * 900000));
    setGeneratedOtp(code);
    setIsSendingOtp(true);

    try {
      const res = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contact: clean, code }),
      });
      const data = await res.json();
      if (data.needsSmtpSetup) {
        setDevToastCode(code);
      }
    } catch (err) {
      console.warn('Could not call send-otp API:', err);
    } finally {
      setIsSendingOtp(false);
      setForgotStep('otp');
      setResendSeconds(30);
    }
  };

  const handleForgotOtpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (enteredOtp.trim() === generatedOtp) {
      setForgotStep('new-password');
    } else {
      setError('Invalid 6-digit code. Please enter the verification code.');
    }
  };

  const handleForgotResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (newPassword.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setError('Passwords do not match');
      return;
    }

    const res = resetUserPassword(forgotContact, newPassword);
    if (res.success) {
      setSuccessMsg('Password updated successfully! Signing you in...');
      setTimeout(() => {
        setIsAuthModalOpen(false);
        resetAllForms();
      }, 1200);
    } else {
      setError(res.message || 'Failed to reset password');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fadeIn overflow-y-auto">
      {/* Dimmed backdrop */}
      <div
        className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        onClick={handleClose}
      />

      {/* Modal Window */}
      <div className="relative w-full max-w-md bg-white rounded-3xl border border-[#F4D3DA] shadow-2xl p-6 sm:p-8 z-10 space-y-6 my-auto max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={handleClose}
          className="absolute top-5 right-5 p-1.5 rounded-full text-[#8C7E83] hover:text-[#BA4A6E] hover:bg-[#FDF0F3] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center mx-auto shadow-xs">
            {mode === 'forgot' ? (
              <Key className="w-6 h-6 stroke-[1.8]" />
            ) : (
              <Mail className="w-6 h-6 stroke-[1.8]" />
            )}
          </div>
          
          <h2 className="text-2xl font-serif font-medium text-[#2D2427]">
            {mode === 'signin' && (authModalReason ? 'Sign In to Save Finds' : 'Welcome Back')}
            {mode === 'signup' && (authModalReason ? 'Sign Up to Save Finds' : 'Create an Account')}
            {mode === 'forgot' && 'Reset Your Password'}
          </h2>

          <p className="text-xs text-[#6E6266] leading-relaxed max-w-xs mx-auto">
            {authModalReason ? (
              <span className="text-[#BA4A6E] font-medium">{authModalReason}</span>
            ) : (
              <>
                {mode === 'signin' && 'Sign in to save liked items, moodboards, and track your Amazon jewellery recommendations.'}
                {mode === 'signup' && 'Join Prachi Jewellery Finds to curate your personal style wishlist across devices.'}
                {mode === 'forgot' && 'Enter your registered email address to receive a recovery code.'}
              </>
            )}
          </p>
        </div>

        {error && (
          <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700">
            {error}
          </div>
        )}

        {successMsg && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-700 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>{successMsg}</span>
          </div>
        )}

        {/* Sign In & Sign Up Form */}
        {(mode === 'signin' || mode === 'signup') && (
          <>
            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2D2427] flex items-center gap-1">
                    <User className="w-3.5 h-3.5 text-[#BA4A6E]" />
                    <span>Full Name</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Priya Sharma"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:ring-1 focus:ring-[#BA4A6E] focus:outline-none bg-[#FFF9FA]"
                  />
                </div>
              )}

              <div className="space-y-1.5">
                <label className="font-semibold text-[#2D2427] flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5 text-[#BA4A6E]" />
                  <span>Email Address</span>
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:ring-1 focus:ring-[#BA4A6E] focus:outline-none bg-[#FFF9FA]"
                />
              </div>

              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="font-semibold text-[#2D2427] flex items-center gap-1">
                    <Lock className="w-3.5 h-3.5 text-[#BA4A6E]" />
                    <span>Password</span>
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => {
                        setMode('forgot');
                        setForgotStep('contact');
                        setForgotContact(email);
                        setError('');
                      }}
                      className="text-[11px] text-[#BA4A6E] hover:underline"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:ring-1 focus:ring-[#BA4A6E] focus:outline-none bg-[#FFF9FA] pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-2.5 text-[#8C7E83] hover:text-[#BA4A6E]"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'signup' && (
                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2D2427]">Confirm Password</label>
                  <input
                    type="password"
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:ring-1 focus:ring-[#BA4A6E] focus:outline-none bg-[#FFF9FA]"
                  />
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full btn-mauve py-3 rounded-full text-xs font-semibold tracking-wide shadow-hover"
              >
                {mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>

            {/* Divider */}
            <div className="relative flex items-center justify-center">
              <div className="border-t border-[#F4D3DA] w-full"></div>
              <span className="bg-white px-3 text-[11px] font-medium text-[#A59499] uppercase tracking-wider">
                OR
              </span>
            </div>

            {/* Google OAuth Button */}
            <button
              onClick={handleGoogleSignInClick}
              type="button"
              className="w-full py-2.5 px-4 rounded-full border border-[#F4D3DA] bg-[#FFF9FA] hover:bg-white text-xs font-medium text-[#2D2427] flex items-center justify-center gap-2.5 shadow-xs transition-colors"
            >
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
              <span>Continue with Google</span>
            </button>

            {/* Footer switcher */}
            <div className="text-center text-xs text-[#6E6266] pt-1">
              {mode === 'signin' ? (
                <p>
                  Don't have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signup'); setError(''); }}
                    className="font-bold text-[#BA4A6E] hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              ) : (
                <p>
                  Already have an account?{' '}
                  <button
                    type="button"
                    onClick={() => { setMode('signin'); setError(''); }}
                    className="font-bold text-[#BA4A6E] hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
            </div>
          </>
        )}

        {/* Forgot Password Flow (100% Free Lifetime) */}
        {mode === 'forgot' && (
          <div className="space-y-4 text-xs">
            {forgotStep === 'contact' && (
              <form onSubmit={handleForgotContactSubmit} className="space-y-4">
                <p className="text-[#6E6266] leading-relaxed">
                  Enter your registered email address to receive a secure recovery code.
                </p>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2D2427]">Registered Email Address</label>
                  <input
                    type="email"
                    required
                    value={forgotContact}
                    onChange={(e) => {
                      setForgotContact(e.target.value);
                      setError('');
                    }}
                    placeholder="you@example.com"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:outline-none bg-[#FFF9FA]"
                    autoFocus
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSendingOtp}
                  className="w-full btn-mauve py-3 rounded-full font-semibold shadow-hover flex items-center justify-center gap-2 disabled:opacity-75"
                >
                  {isSendingOtp ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Recovery Code...</span>
                    </>
                  ) : (
                    <>
                      <ShieldCheck className="w-4 h-4" />
                      <span>Send Recovery Code</span>
                    </>
                  )}
                </button>
              </form>
            )}

            {forgotStep === 'otp' && (
              <form onSubmit={handleForgotOtpSubmit} className="space-y-4">
                <div className="p-4 rounded-2xl bg-[#FFF5F7] border border-[#FAD2DC] text-center space-y-1.5">
                  <div className="w-10 h-10 rounded-full bg-[#FCEEF0] text-[#BA4A6E] flex items-center justify-center mx-auto shadow-xs">
                    <Mail className="w-5 h-5 stroke-[1.8]" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-[#2D2427]">
                      Verification Code Sent
                    </h3>
                    <p className="text-[11px] text-[#6E6266] mt-0.5">
                      We dispatched a 6-digit security code to:
                    </p>
                    <p className="text-xs font-bold text-[#BA4A6E] mt-0.5 break-all">
                      {forgotContact}
                    </p>
                  </div>
                  <p className="text-[10.5px] text-[#8C7E83] pt-0.5 leading-relaxed">
                    Please check your email inbox (and Spam/Junk folder). Code expires in 10 minutes.
                  </p>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="font-semibold text-[#2D2427]">Enter 6-Digit Code</label>
                    <button
                      type="button"
                      disabled={resendSeconds > 0 || isSendingOtp}
                      onClick={() => handleForgotContactSubmit()}
                      className="text-[11px] font-semibold text-[#BA4A6E] hover:underline disabled:text-gray-400 disabled:no-underline"
                    >
                      {isSendingOtp
                        ? 'Sending...'
                        : resendSeconds > 0
                        ? `Resend in ${resendSeconds}s`
                        : 'Resend Code'}
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={6}
                    value={enteredOtp}
                    onChange={(e) => {
                      setEnteredOtp(e.target.value.trim());
                      setError('');
                    }}
                    placeholder="Enter 6-digit code"
                    className="w-full text-center font-mono tracking-widest text-sm px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:outline-none bg-[#FFF9FA]"
                    autoFocus
                  />
                </div>

                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForgotStep('contact')}
                    className="w-1/3 py-2.5 rounded-full border border-[#F4D3DA] text-[#6E6266] font-semibold hover:bg-gray-50"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn-mauve flex-1 py-2.5 rounded-full font-semibold shadow-hover flex items-center justify-center gap-1.5"
                  >
                    <span>Verify Code</span>
                  </button>
                </div>
              </form>
            )}

            {forgotStep === 'new-password' && (
              <form onSubmit={handleForgotResetPasswordSubmit} className="space-y-4">
                <p className="text-[#6E6266]">
                  Choose your new password below:
                </p>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2D2427]">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Minimum 6 characters"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:outline-none bg-[#FFF9FA]"
                    autoFocus
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="font-semibold text-[#2D2427]">Confirm New Password</label>
                  <input
                    type="password"
                    required
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    placeholder="Re-enter password"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-[#F4D3DA] focus:border-[#BA4A6E] focus:outline-none bg-[#FFF9FA]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full btn-mauve py-3 rounded-full font-semibold shadow-hover"
                >
                  Save New Password & Sign In
                </button>
              </form>
            )}

            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => {
                  setMode('signin');
                  resetAllForms();
                }}
                className="inline-flex items-center gap-1 text-xs text-[#8C7E83] hover:text-[#BA4A6E]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Sign In</span>
              </button>
            </div>
          </div>
        )}

        {/* Development simulated inbox notification (only appears if SMTP credentials are not yet added to .env.local) */}
        {devToastCode && (
          <div className="fixed bottom-6 right-6 z-60 bg-[#2D2427] text-white px-4 py-3 rounded-2xl shadow-2xl border border-[#BA4A6E]/40 flex items-center gap-3 animate-slideUp max-w-sm">
            <div className="w-8 h-8 rounded-full bg-[#BA4A6E] flex items-center justify-center text-white shrink-0 shadow-xs">
              <Mail className="w-4 h-4" />
            </div>
            <div className="text-left text-xs">
              <div className="font-semibold text-pink-200 flex items-center gap-1.5">
                <span>Simulated Inbox Notification</span>
                <span className="text-[10px] bg-pink-900/60 text-pink-300 px-1.5 py-0.2 rounded font-mono">Dev</span>
              </div>
              <div className="text-gray-300 text-[11px] mt-0.5">
                Your code is <strong className="text-white font-mono text-sm tracking-widest">{devToastCode}</strong>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setDevToastCode('')}
              className="ml-auto text-gray-400 hover:text-white p-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
