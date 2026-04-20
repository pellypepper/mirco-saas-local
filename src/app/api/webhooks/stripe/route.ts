import { NextResponse } from 'next/server';
import Stripe from 'stripe';
import StripeWebhookService from '@/services/stripeWebhookService';

export const runtime = 'nodejs';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

export async function POST(req: Request) {
  console.log('🔔 Webhook received');
  try {
    const body = await req.text();
    const sig = req.headers.get('stripe-signature');
    console.log('📝 Signature present:', !!sig);
    console.log('📦 Body length:', body.length);

    if (!sig) {
      console.error('❌ Missing stripe-signature');
      return NextResponse.json({ error: 'Missing signature' }, { status: 400 });
    }

    let event: Stripe.Event;
    try {
      event = await stripe.webhooks.constructEventAsync(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
      console.log('✅ Event constructed:', event.type);
    } catch (err: any) {
      console.error('❌ Signature error:', err.message);
      return NextResponse.json({ error: err.message }, { status: 400 });
    }

    const result = await StripeWebhookService.handleEvent(event);
    console.log('✅ Event handled:', result);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('❌ Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}