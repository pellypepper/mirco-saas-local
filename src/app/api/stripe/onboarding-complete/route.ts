import Stripe from 'stripe';
import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/libs/supabaseAdmin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const accountId = searchParams.get('accountId');

  if (!accountId) {
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
  }

    await stripe.accounts.update(accountId);

  // Fetch the real current state directly from Stripe
  const account = await stripe.accounts.retrieve(accountId);

 
  

  await supabaseAdmin
    .from('profiles')
    .update({
      payout_enabled: account.charges_enabled,   
      details_submitted: account.details_submitted,
      default_currency: account.default_currency,
    })
    .eq('stripe_account_id', accountId);

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/dashboard`);
}