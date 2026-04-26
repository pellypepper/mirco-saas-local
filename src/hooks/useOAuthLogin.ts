import { useState } from 'react';
import { createClient } from '@/libs/supabaseClient';
import type { Provider } from '@supabase/supabase-js';

const supabase = createClient();

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
        throw new Error('OAuth login failed. Please try again.');
        setLoadingProvider(null);
      }
    } catch (err) {
     throw new Error('An unexpected error occurred during OAuth login. Please try again.');
      setLoadingProvider(null);
    }
  };

  return { handleOAuth, loadingProvider };
}
