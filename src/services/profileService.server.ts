import { supabaseAdmin } from '@/libs/supabaseAdmin';

export async function getEmail(providerId: string) {
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .eq('id', providerId)
    .single();

  if (profileError) throw profileError;

  const { data: user, error: userError } = await supabaseAdmin.auth.admin.getUserById(providerId);

  if (userError) throw userError;

  return {
    ...profile,
    email: user.user.email,
  };
}
