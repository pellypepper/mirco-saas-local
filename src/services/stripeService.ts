import Stripe from "stripe";
import { supabase } from "@/libs/supabaseClient";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

class StripeService {
  static async createCheckoutSession({
    availability_id,
    provider_id,
    customer_id,
    services_id,
    amount,
    currency,
    stripeAccount,
    fees
  }: any) {
    return await stripe.checkout.sessions.create({
      locale: "auto",
      payment_method_types: ["card"],
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/payment-success?session_id={CHECKOUT_SESSION_ID}&customer_id=${customer_id}`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/providers/${provider_id}`,
      customer_creation: "always",

      line_items: [
        {
          price_data: {
            currency,
            unit_amount: Math.round(amount * 100),
            product_data: {
              name: "Booking Session",
              description: "Service booking payment",
            },
          },
          quantity: 1,
        },
      ],

      payment_intent_data: {
        application_fee_amount: fees.platformFee,
        transfer_data: { destination: stripeAccount },
        metadata: {
          availability_id,
          provider_id,
          customer_id,
          services_id,
          amount,
          currency,
          admin_fee: fees.adminFee,
          provider_amount: fees.providerAmount,
        },
      },

      metadata: {
        availability_id,
        provider_id,
        customer_id,
        services_id,
        amount,
        currency,
        admin_fee: fees.adminFee,
        provider_amount: fees.providerAmount,
      },
    });
  }

  static async updateStripeAccount(account: any) {
    const { error } = await supabase
      .from("profiles")
      .update({
        payout_enabled: account.charges_enabled,
        details_submitted: account.details_submitted,
      })
      .eq("stripe_account_id", account.id);

    if (error) throw error;
  }
}

export default StripeService;
