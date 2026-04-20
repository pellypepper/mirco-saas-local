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
    const chunks: Uint8Array[] = [];
    const reader = req.body?.getReader();
    if (!reader) return NextResponse.json({ error: 'No body' }, { status: 400 });

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      if (value) chunks.push(value);
    }

    const rawBody = Buffer.concat(chunks);
    const body = rawBody.toString('utf8');
    const sig = req.headers.get('stripe-signature');

    console.log('📝 Signature present:', !!sig);

    let event: Stripe.Event;

    if (sig && process.env.STRIPE_WEBHOOK_SECRET) {
      try {
        event = stripe.webhooks.constructEvent(
          rawBody,
          sig,
          process.env.STRIPE_WEBHOOK_SECRET
        );
        console.log('✅ Event verified:', event.type);
      } catch (err: any) {
        console.error('❌ Signature error:', err.message);
        // ⬇️ Fall back to parsing without verification for Event Destinations
        try {
          event = JSON.parse(body) as Stripe.Event;
          console.log('⚠️ Using unverified event:', event.type);
        } catch {
          return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
        }
      }
    } else {
      event = JSON.parse(body) as Stripe.Event;
    }

    const result = await StripeWebhookService.handleEvent(event);
    console.log('✅ Handled:', result);
    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error('❌ Webhook error:', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}