'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/UserContext';

export default function DashboardPage() {
  const { profile, loading } = useUser(); 
  
  const router = useRouter();

  useEffect(() => {
    if (loading) return; 
    


     if (!profile?.role) {
      router.replace('/select-role');
      return;
    }

       switch (profile.role) {
      case 'customer':
        router.replace('/dashboard/Customer');
        break;

      case 'provider':
        router.replace('/dashboard/Providers');
        break;

      case 'admin':
        router.replace('/dashboard/Admin');
        break;

      default:
        router.replace('/select-role');
    }

    
  }, [profile, loading, router]);

  return null;
}