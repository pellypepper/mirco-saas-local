import Stripe from 'stripe';
import ValidateMetaService from './validateMetaService';
import { fetchServiceById } from './Services';
import { markAvailabilityAsBooked, checkAvailabilitySlotExists } from './availabilityService';
import customerEmailService from './customerEmailService';
import { getEmail } from './profileService.server';
import EmailService from './emailService';
import { PaymentMetadata } from '@/types/type';
import BookingService from './bookingService';
import { createBookingAction } from '@/app/actions/createBooking';
import StripeService from "@/services/stripeService";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2022-11-15',
});

class StripeWebhookService {
  static async handleEvent(event: Stripe.Event) {
    switch (event.type) {
      case 'payment_intent.succeeded':
        await this.handlePayment(event.data.object as Stripe.PaymentIntent);
        break;
      case 'account.updated':
        await StripeService.updateStripeAccount(event.data.object as Stripe.Account);
        break;
    }
    return { received: true };
  }

  static async handlePayment(payment: Stripe.PaymentIntent) {
    const metadata = payment.metadata as unknown as PaymentMetadata;

    if (!metadata?.provider_id || !metadata?.customer_id ||
        !metadata?.availability_id || !metadata?.services_id) {
      return { received: true, skipped: true };
    }

    try {
      ValidateMetaService.validateMetadata(metadata);
    } catch {
      return { received: true, skipped: true };
    }

    const exists = await BookingService.bookingExists(payment.id);
    if (exists) return { received: true, skipped: true };

    const [provider, customer] = await Promise.all([
      getEmail(metadata.provider_id),
      getEmail(metadata.customer_id),
    ]);

    if (!provider?.email || !customer?.email) return;

    const [service, available] = await Promise.all([
      fetchServiceById(metadata.services_id),
      checkAvailabilitySlotExists(metadata.availability_id),
    ]);

    if (!available) return;

    let customer_email: string | null = null;
    try {
      customer_email = await customerEmailService.getCustomerEmail(payment.id);
    } catch {
      // fall through to profile email
    }

    customer_email = customer_email || customer.email;
    if (!customer_email) return;

    await Promise.all([
      EmailService.sendCustomerEmail({ to: customer_email, paymentId: payment.id, metadata, provider, service }),
      EmailService.sendProviderEmail({ to: provider.email, paymentId: payment.id, metadata, customer, service, customer_email }),
    ]);

    const fixedMetadata = { ...metadata, amount: Number(metadata.amount) };
    await createBookingAction({ paymentId: payment.id, metadata: fixedMetadata, customer_email });
    await markAvailabilityAsBooked(metadata.availability_id);

    return { received: true };
  }
}

export default StripeWebhookService;