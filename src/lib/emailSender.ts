import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);



export const sendConfirmationEmail = async ({
  to,
  bookingId,
  serviceName,
  serviceDescription,
  duration_minutes,
  providerName,
  formattedDate,
  bookingTime,
  location,
  phone_number,
  email,
  country,
  amount,
}: {
  to: string;
  bookingId: string;
  serviceName: string;
  serviceDescription: string;
  duration_minutes: number;
  providerName: string;
  formattedDate: string;
  bookingTime: string;
  location: string;
  phone_number: string;
  email: string;
  country: string;
  amount: string;
}) => {
  const subject = 'Booking Confirmation';
  
  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Booking Confirmation</title>
  </head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr>
  <td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

  <tr>
  <td style="padding:40px;text-align:center;background: linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
  <h1 style="margin:0;color:#fff;font-size:28px;font-weight:600;">Booking Confirmed!</h1>
  <p style="margin:8px 0 0;color:#fff;font-size:16px;">Your booking is confirmed with ${providerName}</p>
  </td>
  </tr>

  <tr>
  <td style="padding:40px;">
  <h2 style="margin:0 0 20px;font-size:20px;color:#24292f;font-weight:600;">Booking Details</h2>
  <ul style="margin:0;padding-left:20px;font-size:16px;line-height:1.6;color:#24292f;">
    <li><strong>Booking Reference:</strong> ${bookingId}</li>
    <li><strong>Service:</strong> ${serviceName}</li>
    <li><strong>Description:</strong> ${serviceDescription}</li>
    <li><strong>Duration:</strong> ${duration_minutes} minutes</li>
    <li><strong>Date & Time:</strong> ${formattedDate}, ${bookingTime}</li>
    <li><strong>Location:</strong> ${location}, ${country}</li>
    <li><strong>Phone:</strong> ${phone_number}</li>
    <li><strong>Email:</strong> ${email}</li>
    <li><strong>Amount Paid:</strong> ${amount}</li>
  </ul>

  <p style="margin:20px 0 0;font-size:16px;line-height:1.5;color:#57606a;">
  We look forward to seeing you at your booking!
  </p>
  </td>
  </tr>

  <tr>
  <td style="padding:30px;text-align:center;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
  <p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p>
  </td>
  </tr>

  </table>
  </td>
  </tr>
  </table>
  </body>
  </html>
  `;

  return await resend.emails.send({
    from: 'booking@ppeliance.co.uk',
    to,
    subject,
    html,
  });
};


export const sendProviderNotificationEmail = async ({
  to,
  bookingId,
  customerName,
  serviceName,
  serviceDescription,
  duration_minutes,
  formattedDate,
  bookingTime,
  customerEmail,
  customerPhone,
  amount,
}: {
  to: string; // provider email
  bookingId: string;
  customerName: string;
  serviceName: string;
  serviceDescription: string;
  duration_minutes: number;
  formattedDate: string;
  bookingTime: string;
  customerEmail: string;
  customerPhone: string;
  amount: string;
}) => {
  const subject = 'New Booking Received';

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Booking Received</title>
  </head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr>
  <td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 3px rgba(0,0,0,0.1);">

  <tr>
  <td style="padding:40px;text-align:center;background: linear-gradient(135deg, #ff7f50 0%, #ffb347 100%);">
  <h1 style="margin:0;color:#fff;font-size:28px;font-weight:600;">New Booking Received!</h1>
  <p style="margin:8px 0 0;color:#fff;font-size:16px;">You have a new booking from ${customerName}</p>
  </td>
  </tr>

  <tr>
  <td style="padding:40px;">
  <h2 style="margin:0 0 20px;font-size:20px;color:#24292f;font-weight:600;">Booking Details</h2>
  <ul style="margin:0;padding-left:20px;font-size:16px;line-height:1.6;color:#24292f;">
    <li><strong>Booking Reference:</strong> ${bookingId}</li>
    <li><strong>Service:</strong> ${serviceName}</li>
    <li><strong>Description:</strong> ${serviceDescription}</li>
    <li><strong>Duration:</strong> ${duration_minutes} minutes</li>
    <li><strong>Date & Time:</strong> ${formattedDate}, ${bookingTime}</li>
    <li><strong>Amount Earned:</strong> ${amount}</li>
    <li><strong>Customer Email:</strong> ${customerEmail}</li>
    <li><strong>Customer Name:</strong> ${customerName}</li>
    <li><strong>Customer Phone:</strong> ${customerPhone}</li>
  </ul>

  <p style="margin:20px 0 0;font-size:16px;line-height:1.5;color:#57606a;">
  Please contact the customer if you require additional information.
  </p>
  </td>
  </tr>

  <tr>
  <td style="padding:30px;text-align:center;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
  <p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p>
  </td>
  </tr>

  </table>
  </td>
  </tr>
  </table>
  </body>
  </html>
  `;

  return await resend.emails.send({
    from: 'booking@ppeliance.co.uk',
    to,
    subject,
    html,
  });
};