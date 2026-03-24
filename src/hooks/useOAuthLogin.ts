import { useState } from 'react';
import { supabase } from '@/libs/supabaseClient';
import type { Provider } from '@supabase/supabase-js';

export default function useOAuthLogin() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleOAuth = async (provider: Provider) => {
    setLoadingProvider(provider);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
          redirectTo: `${window.location.origin}/api/callback`,

          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });

      if (error) {
        console.error('OAuth error:', error);
        setLoadingProvider(null);
      }
    } catch (err) {
      console.error('OAuth error:', err);
      setLoadingProvider(null);
    }
  };

  return { handleOAuth, loadingProvider };
}
