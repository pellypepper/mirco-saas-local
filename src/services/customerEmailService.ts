import Stripe from "stripe";

class customerEmailService {
    
  static async getCustomerEmail(payment_intent: string) {
   const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});


    const sessions = await stripe.checkout.sessions.list({
      payment_intent,
      limit: 1,
    });

    return sessions.data[0]?.customer_details?.email || null;
  }
}

export default customerEmailService;