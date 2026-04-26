// app/auth/confirm/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { createClient } from '@/libs/supabaseClient';
import { Suspense } from 'react';
import Loader from "@/component/Spinner"

function ConfirmPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token_hash = searchParams.get('token_hash');
    const type = searchParams.get('type');

    if (!token_hash || !type) {
      router.push('/login?error=auth_failed');
      return;
    }

    const supabase = createClient();

    supabase.auth.verifyOtp({ token_hash, type: type as any })
      .then(({ error }) => {
        if (error) {
          router.push('/login?error=auth_failed');
        } else {
          router.push('/api/callback/complete'); 
        }
      });
  }, []);

  return <Loader message='Confirming your email...' />;
}

export default function Page() {
  return (
    <Suspense fallback={<p>Loading...</p>}>
      <ConfirmPage />
    </Suspense>
  );
}