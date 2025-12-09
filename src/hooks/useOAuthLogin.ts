import { useState } from "react";
import { supabase } from "@/libs/supabaseClient";
import type { Provider } from "@supabase/auth-js";

export default function useOAuthLogin() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null);

  const handleOAuth = async (provider: Provider) => {
    setLoadingProvider(provider);
    try {
      await supabase.auth.signInWithOAuth({
        provider,
        options: { redirectTo: `${window.location.origin}/auth/callback` },
      });
    } catch (error) {
      console.error("OAuth error:", error);
      setLoadingProvider(null);
    }
  };

  return { handleOAuth, loadingProvider };
}
