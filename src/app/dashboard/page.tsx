'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/UserContext';

export default function DashboardPage() {
  const { profile, loading } = useUser(); // ← get loading state
  const router = useRouter();

  useEffect(() => {
    if (loading) return; // ← wait for profile to load
    if (!profile) {
      router.push('/');
      return;
    }

    if (profile.role === 'customer') router.push('/dashboard/Customer');
    else if (profile.role === 'provider') router.push('/dashboard/Providers');
    else if (profile.role === 'admin') router.push('/dashboard/Admin');
    else router.push('/select-role'); // no role yet
  }, [profile, loading, router]);

  return null;
}