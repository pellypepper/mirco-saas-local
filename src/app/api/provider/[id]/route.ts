import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET(
  _: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;

  // Fetch profile from profiles table
  const { data: profile, error: profileError } = await supabaseAdmin
    .from('profiles')
    .select('id, full_name, phone_number, location, country')
    .eq('id', id)
    .single();

  if (profileError) return NextResponse.json({ error: profileError.message }, { status: 400 });
  if (!profile) return NextResponse.json({ error: 'Profile not found' }, { status: 404 });

  // Fetch email from Supabase Auth
  const { data: authUser, error: authError } = await supabaseAdmin.auth.admin.getUserById(id);

  if (authError) return NextResponse.json({ error: authError.message }, { status: 400 });

  return NextResponse.json({
    ...profile,
    email: authUser.user.email ?? '',
  });
}