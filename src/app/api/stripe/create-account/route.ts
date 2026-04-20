import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { supabaseAdmin} from '@/libs/supabaseAdmin';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
   

  try {
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 });
    }

    const supabase = supabaseAdmin;

    // Fetch provider profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('stripe_account_id')
      .eq('id', userId)
      .maybeSingle();

    if (profileError || !profile) {
      return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
    }

    let accountId = profile.stripe_account_id;

    // Create Stripe account if it doesn't exist
    if (!accountId) {
      const account = await stripe.accounts.create({
        type: 'express',
        metadata: { userId },
      });

      accountId = account.id;

      const { error: updateError } = await supabase
        .from('profiles')
        .update({
          stripe_account_id: accountId,
        })
        .eq('id', userId);

      if (updateError) {
    
        return NextResponse.json(
          { error: 'Failed to store Stripe account' },
          { status: 500 }
        );
      }
    }

    // Generate onboarding link (always regenerated)
    const link = await stripe.accountLinks.create({
      account: accountId,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/onboarding-complete?accountId=${accountId}`,
    return_url: `${process.env.NEXT_PUBLIC_APP_URL}/api/stripe/onboarding-complete?accountId=${accountId}`,
      type: 'account_onboarding',
    });

    return NextResponse.json({ url: link.url });
  } catch (error: any) {
    console.error('Stripe Connect API error:', error);
    return NextResponse.json(
      { error: error.message || 'Stripe onboarding failed' },
      { status: 500 }
    );
  }
}