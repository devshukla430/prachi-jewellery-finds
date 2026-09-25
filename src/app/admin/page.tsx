'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import AdminDashboard from '../../components/AdminDashboard';

function AdminGate() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isAuthorized, setIsAuthorized] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(true);

  useEffect(() => {
    try {
      // 1. Check if the admin is already authenticated in this session
      const auth = sessionStorage.getItem('prachi_admin_auth');
      
      // 2. Check for private access secret in URL query parameter
      const key = searchParams.get('access') || searchParams.get('key');
      const hasSecretKey = key === 'prachi921' || key === 'prachi-vault-gateway';

      if (auth === 'true' || hasSecretKey) {
        setIsAuthorized(true);
      } else {
        // Public visitor typed /admin directly: bounce immediately to homepage storefront
        router.replace('/');
      }
    } catch {
      router.replace('/');
    } finally {
      setIsVerifying(false);
    }
  }, [router, searchParams]);

  // While verifying or if unauthorized, render nothing so no admin screen or passcode prompt is ever visible
  if (isVerifying || !isAuthorized) {
    return <div className="min-h-screen bg-[#FDF6F7]" />;
  }

  return <AdminDashboard />;
}

export default function AdminPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#FDF6F7]" />}>
      <AdminGate />
    </Suspense>
  );
}
