import Stripe from "stripe";
import ValidateMetaService from "./validateMetaService";
import {fetchServiceById} from "./Services";
import { markAvailabilityAsBooked, checkAvailabilitySlotExists} from "./availabilityService";
import customerEmailService from "./customerEmailService";
import { getProviderWithEmail } from "./profileService";
import EmailService from "./emailService";
import { PaymentMetadata } from "@/types/type";
import BookingService from "./bookingService";
import { createBookingAction } from "@/app/actions/createBooking";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2022-11-15",
});

class StripeWebhookService {
  static async handleRequest(req: Request) {
    const body = await req.text();
    const sig = req.headers.get("stripe-signature");

    if (!sig) throw new Error("Missing stripe-signature");

    let event: Stripe.Event;

    try {
      event = stripe.webhooks.constructEvent(
        body,
        sig,
        process.env.STRIPE_WEBHOOK_SECRET!
      );
    } catch (err: any) {
      console.error("Stripe signature error:", err.message);
      throw err;
    }

    switch (event.type) {
      case "payment_intent.succeeded":
        await this.handlePayment(event.data.object as Stripe.PaymentIntent);
        break;

      case "account.updated":
        await ProviderService.updateStripeAccount(
          event.data.object as Stripe.Account
        );
        break;

      default:
        console.log("Unhandled event:", event.type);
    }

    return { received: true };
  }


  // PAYMENT HANDLING LOGIC
  static async handlePayment(payment: Stripe.PaymentIntent) {
    const metadata = payment.metadata as unknown as PaymentMetadata;

    //Validate metadata
   ValidateMetaService.validateMetadata(metadata);

    // Check if booking already exists
    const exists = await BookingService.bookingExists(payment.id);
    if (exists) return;

    // Fetch provider, customer, service
    const provider = await getProviderWithEmail(metadata.provider_id);
    const customer = await getProviderWithEmail(metadata.customer_id);
    const service = await fetchServiceById(metadata.services_id);

    //Set provider email
    const provider_email = provider?.email;

    //Check availability slot
    const available = await checkAvailabilitySlotExists(metadata.availability_id);
    if (!available) return;

    //Fetch customer email from Checkout Session
    const customer_email = await customerEmailService.getCustomerEmail(payment.id);
    
    if (!customer_email) {
      console.error("Customer email not found for payment:", payment.id);
      return;
    }

    // 7. Send emails
    await EmailService.sendCustomerEmail({
      to: customer_email!,
      paymentId: payment.id,
      metadata,
      provider,
      service,
    });

    await EmailService.sendProviderEmail({
      to: provider_email!,
      paymentId: payment.id,
      metadata,
      customer,
      service,
      customer_email,
    });

    // 8. Save booking & update availability
    await createBookingAction({
      paymentId: payment.id,
      metadata,
      customer_email,
    });

    await markAvailabilityAsBooked(metadata.availability_id);
  }
}

export default StripeWebhookService;
