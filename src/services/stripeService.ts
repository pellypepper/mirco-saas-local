import Stripe from 'stripe';
import { supabaseAdmin} from '@/libs/supabaseAdmin';

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error('Missing STRIPE_SECRET_KEY in environment variables');
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

// Detect test mode
const isTestMode = process.env.STRIPE_SECRET_KEY?.startsWith('sk_test');

class StripeService {
  static async createCheckoutSession({
    availability_id,
    provider_id,
    customer_id,
    services_id,
    amount,
    currency,
    stripeAccount,
    fees,
  }: any) {
    // Common metadata
    const paymentMetadata = {
      availability_id,
      provider_id,
      customer_id,
      services_id,
      amount,
      currency,
      admin_fee: fees.adminFee,
      provider_amount: fees.providerAmount,
    };

    // Base session params
    const sessionParams: any = {
      locale: 'auto',
      payment_method_types: ['card'],
      mode: 'payment',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&customer_id=${customer_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/providers/${provider_id}`,
      customer_creation: 'always',
      line_items: [
        {
          price_data: {
            currency,
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: 'Booking Session',
              description: 'Service booking payment',
            },
          },
          quantity: 1,
        },
      ],
      metadata: paymentMetadata,
      payment_intent_data: {
        metadata: paymentMetadata, // Always include metadata for webhooks
        ...( !isTestMode && stripeAccount
          ? {
              application_fee_amount: fees.platformFee,
              transfer_data: { destination: stripeAccount },
            }
          : {}
        ),
      },
    };

    // Create Checkout Session
    const session = await stripe.checkout.sessions.create(sessionParams);
    return session;
  }

  static async updateStripeAccount(account: any) {
    
    const { error } = await supabaseAdmin
      .from('profiles')
      .update({
        payout_enabled: account.charges_enabled,
        details_submitted: account.details_submitted,
        default_currency: account.default_currency,
      })
      .eq('stripe_account_id', account.id);

    if (error) throw error;
  }
}

export default StripeService;