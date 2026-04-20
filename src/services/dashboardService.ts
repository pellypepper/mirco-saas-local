import { createClient } from '@/libs/supabaseClient';

// Fetch authenticated user's object from Supabase
export async function fetchAuthUser() {
  const supabase = createClient();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();
  return { user, userError };
}

// Fetch the user's profile row from Supabase
export async function fetchUserProfile(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  return { data, error };
}

// Log out the user
export async function logoutUser() {  const supabase = createClient();
  return await supabase.auth.signOut();
}
