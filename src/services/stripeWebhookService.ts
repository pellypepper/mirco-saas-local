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
      default:
        console.log('Unhandled event:', event.type);
    }
    return { received: true };
  }

  // PAYMENT HANDLING LOGIC
 static async handlePayment(payment: Stripe.PaymentIntent) {
  console.log('💳 handlePayment called, payment id:', payment.id);
  const metadata = payment.metadata as unknown as PaymentMetadata;
  console.log('📋 metadata:', metadata);

  ValidateMetaService.validateMetadata(metadata);

  const exists = await BookingService.bookingExists(payment.id);
  console.log('🔍 booking exists:', exists);
  if (exists) return;

  const provider = await getEmail(metadata.provider_id);
  const customer = await getEmail(metadata.customer_id);
  console.log('👤 provider:', provider?.email, 'customer:', customer?.email);

  const service = await fetchServiceById(metadata.services_id);
  console.log('🛎 service:', service?.title);

  const available = await checkAvailabilitySlotExists(metadata.availability_id);
  console.log('📅 slot available:', available);
  if (!available) {
    console.error('❌ Slot not available, stopping');
    return;
  }

  const customer_email = await customerEmailService.getCustomerEmail(payment.id);
  console.log('📧 customer_email:', customer_email);
  if (!customer_email) {
    console.error('❌ No customer email found');
    return;
  }

  console.log('📨 Sending emails...');
  await EmailService.sendCustomerEmail({ to: customer_email!, paymentId: payment.id, metadata, provider, service });
  await EmailService.sendProviderEmail({ to: provider.email!, paymentId: payment.id, metadata, customer, service, customer_email });

  const fixedMetadata = { ...metadata, amount: Number(metadata.amount) };

  console.log('💾 Creating booking...');
  await createBookingAction({ paymentId: payment.id, metadata: fixedMetadata, customer_email });
  console.log('✅ Booking created');

  await markAvailabilityAsBooked(metadata.availability_id);
  console.log('✅ Availability marked as booked');
}
}

export default StripeWebhookService;
