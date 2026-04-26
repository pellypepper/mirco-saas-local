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

  // Guard: skip incomplete metadata (CLI test events, etc.)
  if (!metadata?.provider_id || !metadata?.customer_id || 
      !metadata?.availability_id || !metadata?.services_id) {
    console.warn('⚠️ Skipping - missing required metadata fields:', metadata);
    return { received: true, skipped: true };
  }

  try {
    ValidateMetaService.validateMetadata(metadata);
  } catch (err: any) {
    console.error('❌ Metadata validation failed:', err.message);
    return { received: true, skipped: true };
  }

  const exists = await BookingService.bookingExists(payment.id);
  console.log('🔍 booking exists:', exists);
  if (exists) {
    console.log('⚠️ Booking already exists, skipping');
    return { received: true, skipped: true };
  }

  const [provider, customer] = await Promise.all([
    getEmail(metadata.provider_id),
    getEmail(metadata.customer_id),
  ]);
  console.log('👤 provider:', provider?.email, 'customer:', customer?.email);

  if (!provider?.email) {
    console.error('❌ Provider email not found for id:', metadata.provider_id);
    return;
  }

  if (!customer?.email) {
    console.error('❌ Customer email not found for id:', metadata.customer_id);
    return;
  }

  const [service, available] = await Promise.all([
    fetchServiceById(metadata.services_id),
    checkAvailabilitySlotExists(metadata.availability_id),
  ]);
  console.log('🛎 service:', service?.title, '📅 slot available:', available);

  if (!available) {
    console.error('❌ Slot not available, stopping');
    return;
  }

  // Get customer email from Stripe session — falls back to profile email
  let customer_email: string | null = null;
  try {
    customer_email = await customerEmailService.getCustomerEmail(payment.id);
  } catch (err) {
    console.warn('⚠️ Could not fetch Stripe customer email, using profile email');
  }

  // Fallback to profile email if Stripe lookup fails
  customer_email = customer_email || customer.email;
  console.log('📧 customer_email:', customer_email);

  if (!customer_email) {
    console.error('❌ No customer email found from any source');
    return;
  }

  console.log('📨 Sending emails...');
  await Promise.all([
    EmailService.sendCustomerEmail({ 
      to: customer_email, 
      paymentId: payment.id, 
      metadata, 
      provider, 
      service 
    }),
    EmailService.sendProviderEmail({ 
      to: provider.email, 
      paymentId: payment.id, 
      metadata, 
      customer, 
      service, 
      customer_email 
    }),
  ]);
  console.log('✅ Emails sent');

  const fixedMetadata = { ...metadata, amount: Number(metadata.amount) };

  console.log('💾 Creating booking...');
  await createBookingAction({ paymentId: payment.id, metadata: fixedMetadata, customer_email });
  console.log('✅ Booking created');

  await markAvailabilityAsBooked(metadata.availability_id);
  console.log('✅ Availability marked as booked');

  return { received: true };
}
}

export default StripeWebhookService;
