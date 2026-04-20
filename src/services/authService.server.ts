import { supabaseAdmin } from '@/libs/supabaseAdmin';

export async function insertProfile(
  userId: string,
  role: 'customer' | 'provider' | null,
  fullName: string,
  extraFields: Record<string, any> = {},
) {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .insert({
      id: userId,
      full_name: fullName,
      role,
      ...extraFields,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    })
    .select()
    .maybeSingle();

  if (error) {
    console.error('Profile insertion error:', error);
    return { data: null, error };
  }
  return { data, error };
}