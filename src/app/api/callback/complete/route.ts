// app/api/callback/complete/route.ts
import { createClient } from '@/libs/supabaseServer';
import { NextResponse } from 'next/server';
import { insertProfile } from '@/services/authService.server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));

  const { data: existingProfile } = await supabase
    .from('profiles')
    .select('id, role')
    .eq('id', user.id)
    .maybeSingle();

  if (!existingProfile) {
    const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'User';
    const { error } = await insertProfile(user.id, null, fullName, undefined);
    if (error) return NextResponse.redirect(new URL('/login?error=profile_creation_failed', requestUrl.origin));
    return NextResponse.redirect(new URL('/select-role', requestUrl.origin));
  }

  if (!existingProfile.role) return NextResponse.redirect(new URL('/select-role', requestUrl.origin));

  const dashboardUrl = existingProfile.role === 'customer' ? '/dashboard/Customer' : '/dashboard/Providers';
  return NextResponse.redirect(new URL(dashboardUrl, requestUrl.origin));
}