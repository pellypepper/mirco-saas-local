import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY); 

export async function sendConfirmationEmail({
  to,
  bookingId,
  amount,
  formattedDate,
  bookingTime,
  serviceName,
  providerName,
  serviceDescription,
  duration_minutes,
  location,
  phone_number,
  email,
  country
}: {
  to: string;
  bookingId: string;
  amount: string;
  formattedDate: string;
  bookingTime: string;
  serviceName: string;
  serviceDescription: string;
  duration_minutes: number;
  providerName: string;
  location: string;
  phone_number: string;
  email: string;
  country: string;
}) {
    console.log('Preparing to send confirmation email to', to);


  const subject = 'Booking Confirmation';
  const html = `
    <h2>Your Booking is Confirmed!</h2>
    <p>Hi,</p>
    <p>Thank you for your booking. Here are your details:</p>
    <ul>
      <li><strong>Booking Reference:</strong> ${bookingId}</li>
      <li><strong>Service:</strong> ${serviceName} with ${providerName}</li>
      <li><strong>Description:</strong> ${serviceDescription}</li>
      <li><strong>Duration:</strong> ${duration_minutes} minutes</li>
      <li><strong>Date & Time:</strong> ${formattedDate}, ${bookingTime}</li>
      <li><strong>Location:</strong> ${location}, ${country}</li>
      <li><strong>Phone Number:</strong> ${phone_number}</li>
      <li><strong>Email:</strong> ${email}</li>
      <li><strong>Amount Paid:</strong> ${amount}</li>
    </ul>
    <p>We look forward to seeing you!</p>
  `;

  return await resend.emails.send({
  from: 'booking@ppeliance.co.uk', // Your sender address
    to,
    subject,
    html
  });
}

export async function sendProviderNotificationEmail({
  to,
  bookingId,
  amount,
  formattedDate,
  bookingTime,
  customerName,
  serviceName,
  serviceDescription,
  duration_minutes,
  customerEmail,
  customerPhone,
}: {
  to: string;
  bookingId: string;
  amount: string;
  formattedDate: string;
  bookingTime: string;
  customerName: string;
  serviceName: string;
  serviceDescription: string;
  duration_minutes: number;
  customerEmail: string;
  customerPhone: string;
}) {
  console.log('Preparing to send provider notification email to', to);

  console.log('Provider email details:', {
    bookingId,
    amount,
    formattedDate,
    bookingTime,
    serviceName,
    customerEmail,

  });

  const subject = 'New Booking Received';
  const html = `
    <h2>You Have a New Booking!</h2>
    <p>Hello,</p>
    <p>A customer has booked your service. Here are the details:</p>
    <ul>
      <li><strong>Booking Reference:</strong> ${bookingId}</li>
      <li><strong>Service Booked:</strong> ${serviceName}</li>
      <li><strong>Description:</strong> ${serviceDescription}</li>
      <li><strong>Duration:</strong> ${duration_minutes} minutes</li>
      <li><strong>Date & Time:</strong> ${formattedDate}, ${bookingTime}</li>

      <li><strong>Amount Earned:</strong> ${amount}</li>
      <li><strong>Customer Email:</strong> ${customerEmail}</li>
      <li><strong>Customer Name:</strong> ${customerName}</li>
      <li><strong>Customer Phone:</strong> ${customerPhone}</li>
    </ul>
    <p>Please contact the customer if you need more information.</p>
  `;

  return await resend.emails.send({
    from: 'booking@ppeliance.co.uk',
    to,
    subject,
    html
  });
}