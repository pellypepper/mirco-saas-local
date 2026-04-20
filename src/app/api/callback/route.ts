import { createClient } from '@/libs/supabaseServer';
import { NextResponse } from 'next/server';
import { insertProfile } from '@/services/authService.server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');

 

  const supabase = await createClient();

  if (code) {
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('OAuth error:', error);
      return NextResponse.redirect(new URL('/login?error=auth_failed', requestUrl.origin));
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data: existingProfile } = await supabase
        .from('profiles')
        .select('id, role')
        .eq('id', user.id)
        .maybeSingle();

      //  No profile exists
      if (!existingProfile) {
        const meta = user.user_metadata || {};
        const fullName = meta.full_name || user.email?.split('@')[0] || 'User';

        const { error: insertError } = await insertProfile(user.id, null, fullName, undefined);

        if (insertError) {
          console.error('Failed to insert profile:', insertError);
          return NextResponse.redirect(
            new URL('/login?error=profile_creation_failed', requestUrl.origin),
          );
        }

        // Profile created with null role
        return NextResponse.redirect(new URL('/select-role', requestUrl.origin));
      }

      //  Profile exists but no role selected yet
      if (!existingProfile.role) {
        return NextResponse.redirect(new URL('/select-role', requestUrl.origin));
      }

      //  dashboard
      const dashboardUrl =
        existingProfile.role === 'customer' ? '/dashboard/Customer' : '/dashboard/Providers';

      return NextResponse.redirect(new URL(dashboardUrl, requestUrl.origin));
    }
  }

  return NextResponse.redirect(new URL('/', requestUrl.origin));
}
