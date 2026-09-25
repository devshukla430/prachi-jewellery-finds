'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import { UserAccount } from '../../../types';

export default function AuthCallbackPage() {
  const router = useRouter();
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [message, setMessage] = useState('Connecting to Google and verifying your credentials...');
  const [accountName, setAccountName] = useState('');

  useEffect(() => {
    const handleGoogleCallback = async () => {
      try {
        if (typeof window === 'undefined') return;

        // Parse hash fragment (Google Implicit OAuth 2.0 flow: #access_token=...&id_token=...) and search query
        const hash = window.location.hash.substring(1);
        const search = window.location.search.substring(1);
        const hashParams = new URLSearchParams(hash);
        const searchParams = new URLSearchParams(search);

        const error = hashParams.get('error') || searchParams.get('error');
        if (error) {
          setStatus('error');
          setMessage(`Google Authentication cancelled or failed: ${error}`);
          return;
        }

        const idToken = hashParams.get('id_token') || searchParams.get('id_token');
        const accessToken = hashParams.get('access_token') || searchParams.get('access_token');

        let profile: { name?: string; email?: string; picture?: string; sub?: string } = {};

        if (idToken) {
          try {
            const base64Url = idToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
              atob(base64)
                .split('')
                .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                .join('')
            );
            profile = JSON.parse(jsonPayload);
          } catch (e) {
            console.warn('Failed to parse Google id_token, attempting userInfo fetch:', e);
          }
        }

        if ((!profile.email || !profile.name) && accessToken) {
          try {
            const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
              headers: { Authorization: `Bearer ${accessToken}` },
            });
            if (res.ok) {
              const userInfo = await res.json();
              profile = { ...profile, ...userInfo };
            }
          } catch (e) {
            console.warn('Failed to fetch userinfo from Google API:', e);
          }
        }

        if (profile.email) {
          const cleanEmail = profile.email.toLowerCase().trim();
          const fullName = profile.name || cleanEmail.split('@')[0];
          const firstName = (profile as any).given_name || (profile.name ? profile.name.trim().split(' ')[0] : cleanEmail.split('@')[0]);
          setAccountName(firstName || fullName);

          const isAdmin =
            cleanEmail === 'prachishukla921@gmail.com' ||
            cleanEmail.includes('admin');

          const newUser: UserAccount = {
            id: `usr-g-${profile.sub || Date.now()}`,
            name: fullName,
            email: cleanEmail,
            avatar: profile.picture || '',
            role: isAdmin ? 'admin' : 'user',
          };

          // Save to local storage for immediate persistence
          localStorage.setItem('prachi_user', JSON.stringify(newUser));

          // Save into Google Profiles registry so subsequent email logins always use their real Google first name
          try {
            const storedGoogleProfiles = JSON.parse(localStorage.getItem('prachi_google_profiles') || '{}');
            storedGoogleProfiles[cleanEmail] = {
              name: fullName,
              firstName: firstName,
              email: cleanEmail,
              avatar: profile.picture || '',
              updatedAt: new Date().toISOString(),
            };
            localStorage.setItem('prachi_google_profiles', JSON.stringify(storedGoogleProfiles));

            // Also sync to registered users database
            const storedDb = JSON.parse(localStorage.getItem('prachi_users_db') || '{}');
            if (storedDb[cleanEmail]) {
              storedDb[cleanEmail].name = fullName;
            } else {
              storedDb[cleanEmail] = {
                id: newUser.id,
                email: cleanEmail,
                name: fullName,
                createdAt: new Date().toISOString(),
              };
            }
            localStorage.setItem('prachi_users_db', JSON.stringify(storedDb));
          } catch (e) {}

          window.dispatchEvent(new Event('storage'));

          setStatus('success');
          setMessage(`Successfully signed in as ${firstName || fullName} (${cleanEmail})`);

          // Redirect to home page after brief confirmation
          setTimeout(() => {
            window.location.href = '/';
          }, 1200);
        } else {
          setStatus('error');
          setMessage('No Google account credentials were received. Please try again.');
        }
      } catch (err: any) {
        setStatus('error');
        setMessage(err?.message || 'An unexpected error occurred during Google sign-in.');
      }
    };

    handleGoogleCallback();
  }, [router]);

  return (
    <div className="min-h-screen bg-[#FFF9FA] flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white rounded-3xl border border-[#F4D3DA] shadow-xl p-8 text-center space-y-6">
        {/* Google G Logo */}
        <div className="w-14 h-14 rounded-2xl bg-[#FFF9FA] border border-[#F4D3DA] flex items-center justify-center mx-auto shadow-xs">
          <svg className="w-7 h-7" viewBox="0 0 24 24">
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
          <h1 className="text-xl font-serif font-medium text-[#2D2427]">
            {status === 'loading' && 'Signing in with Google...'}
            {status === 'success' && 'Welcome Back!'}
            {status === 'error' && 'Authentication Issue'}
          </h1>
          <p className="text-xs text-[#6E6266] mt-2 leading-relaxed max-w-xs mx-auto">
            {message}
          </p>
        </div>

        {status === 'loading' && (
          <div className="flex justify-center py-4">
            <Loader2 className="w-8 h-8 text-[#BA4A6E] animate-spin" />
          </div>
        )}

        {status === 'success' && (
          <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-800 flex items-center justify-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
            <span className="font-medium">Redirecting you to Prachi Jewellery Finds...</span>
          </div>
        )}

        {status === 'error' && (
          <div className="space-y-4">
            <div className="p-3.5 rounded-2xl bg-rose-50 border border-rose-200 text-xs text-rose-800 flex items-center gap-2 text-left">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{message}</span>
            </div>
            <button
              onClick={() => { window.location.href = '/'; }}
              className="w-full py-2.5 px-4 rounded-full bg-[#BA4A6E] text-white font-medium text-xs hover:bg-[#A33D5E] transition-colors"
            >
              Return to Home Page
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
