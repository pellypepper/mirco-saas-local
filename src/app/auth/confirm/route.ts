import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const type = requestUrl.searchParams.get('type');

  if (code) {
    const supabase = createRouteHandlerClient({ cookies });
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (error) {
      console.error('Email confirmation error:', error);
      return NextResponse.redirect(
        new URL(`/login?error=${encodeURIComponent('Email confirmation failed')}`, request.url)
      );
    }

    // If it's an email change confirmation
    if (type === 'email_change') {
      return NextResponse.redirect(
        new URL('/profile?message=Email changed successfully', request.url)
      );
    }
  }

  // Default redirect
  return NextResponse.redirect(new URL('/profile', request.url));
}