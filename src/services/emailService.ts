import { sendConfirmationEmail, sendProviderNotificationEmail } from "@/lib/emailSender";

class EmailService {
  static async sendCustomerEmail({ to, paymentId, metadata, provider, service }: { to: string; paymentId: string; metadata: any; provider: any; service: any }) {
    if (!to) return;

    await sendConfirmationEmail({
      to,
      bookingId: paymentId,
      amount: metadata.amount,
      formattedDate: new Date().toLocaleDateString("en-GB"),
      bookingTime: new Date().toLocaleTimeString("en-GB"),
      serviceName: service.title,
      serviceDescription: service.description,
      providerName: provider.full_name,
      duration_minutes: service.duration_minutes,
      phone_number: provider.phone_number,
      email: provider.email,
      location: provider.location,
      country: provider.country,
    });
  }

  static async sendProviderEmail({
    to,
    paymentId,
    metadata,
    customer,
    service,
    customer_email,
  }: { to: string; paymentId: string; metadata: any; customer: any; service: any; customer_email: string }) {
    if (!to) return;

    await sendProviderNotificationEmail({
      to,
      bookingId: paymentId,
      amount: metadata.provider_amount.toString(),
      formattedDate: new Date().toLocaleDateString("en-GB"),
      bookingTime: new Date().toLocaleTimeString("en-GB"),
      serviceName: service.title,
      serviceDescription: service.description,
      customerName: customer.full_name,
      duration_minutes: service.duration_minutes,
      customerEmail: customer_email,
      customerPhone: customer.phone_number,
    });
  }
}

export default EmailService;
