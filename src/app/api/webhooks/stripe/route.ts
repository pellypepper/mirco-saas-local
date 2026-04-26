import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import StripeWebhookService from '@/services/stripeWebhookService';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
  console.log('🔔 Webhook received');

  const body = await req.text(); // simplest and correct
  const sig = req.headers.get('stripe-signature');

  console.log('📝 Sig present:', !!sig);
  console.log('📝 Secret present:', !!process.env.STRIPE_WEBHOOK_SECRET);

  if (!sig) {
    console.error('❌ Missing stripe-signature header');
    return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
  }

  if (!process.env.STRIPE_WEBHOOK_SECRET) {
    console.error('❌ STRIPE_WEBHOOK_SECRET not set');
    return NextResponse.json({ error: 'Webhook secret not configured' }, { status: 500 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    console.log('✅ Event verified:', event.type);
  } catch (err: any) {
    // This 400 is what Stripe sees — it will mark the delivery as FAILED
    // and retry. You'll also see it in the Stripe webhook logs now.
    console.error('❌ Signature verification failed:', err.message);
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  try {
    const result = await StripeWebhookService.handleEvent(event);
    console.log('✅ Handled:', result);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('❌ Handler error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}