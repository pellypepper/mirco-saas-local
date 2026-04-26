import { createClient } from '@/libs/supabaseServer';
import { NextResponse } from 'next/server';
import { insertProfile } from '@/services/authService.server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const token_hash = requestUrl.searchParams.get('token_hash');
  const type = requestUrl.searchParams.get('type');

  const supabase = await createClient();

  if (token_hash && type) {
    const { data, error } = await supabase.auth.verifyOtp({
      token_hash,
      type: type as any,
    });



    if (error) {

      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
    }

    // ✅ Use user from verifyOtp response directly
    const user = data?.user;

    if (user) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        const meta = user.user_metadata || {};
        const fullName = meta.full_name || user.email?.split('@')[0] || 'User';

        const { error: insertError } = await insertProfile(user.id, null, fullName, undefined);

        if (insertError) {
    
          return NextResponse.redirect(new URL('/login?error=profile_creation_failed', requestUrl.origin));
        }

        return NextResponse.redirect(new URL('/select-role', requestUrl.origin));
      }

      if (!existingProfile.role) {
        return NextResponse.redirect(new URL('/select-role', requestUrl.origin));
      }

      const dashboardUrl = existingProfile.role === 'customer' ? '/dashboard/Customer' : '/dashboard/Providers';
      return NextResponse.redirect(new URL(dashboardUrl, requestUrl.origin));
    }
  }

  // Handle PKCE code flow (desktop)
  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {

      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
    }

    const { data: { user } } = await supabase.auth.getUser();

    if (user) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .maybeSingle();

      if (!existingProfile) {
        const meta = user.user_metadata || {};
        const fullName = meta.full_name || user.email?.split('@')[0] || 'User';

        const { error: insertError } = await insertProfile(user.id, null, fullName, undefined);

        if (insertError) {
          return NextResponse.redirect(new URL('/login?error=profile_creation_failed', requestUrl.origin));
        }

        return NextResponse.redirect(new URL('/select-role', requestUrl.origin));
      }

      if (!existingProfile.role) {
        return NextResponse.redirect(new URL('/select-role', requestUrl.origin));
      }

      const dashboardUrl = existingProfile.role === 'customer' ? '/dashboard/Customer' : '/dashboard/Providers';
      return NextResponse.redirect(new URL(dashboardUrl, requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
}