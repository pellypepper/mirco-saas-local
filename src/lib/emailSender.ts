'use server';

import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

// ─────────────────────────────────────────────────────────────
// CUSTOMER – Booking Pending
// ─────────────────────────────────────────────────────────────
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
  const subject = 'Booking Request Received – Pending Confirmation';

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Booking Pending Confirmation</title></head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
    <tr><td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Welcome to ServiceHub!</h1>
      <p style="margin:10px 0 0;color:#ffffff;font-size:16px;opacity:0.92;">Your booking request has been received</p>
    </td></tr>
    <tr><td style="padding:24px 40px 0;text-align:center;">
      <span style="display:inline-block;padding:8px 20px;background-color:#fff8e1;border:1px solid #f59e0b;border-radius:20px;font-size:14px;font-weight:600;color:#b45309;">⏳ Pending Provider Confirmation</span>
    </td></tr>
    <tr><td style="padding:28px 40px 40px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#24292f;font-weight:600;">Booking Request Details</h2>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#57606a;">Thank you for booking with <strong>${providerName}</strong> through ServiceHub. Your request is currently <strong>awaiting confirmation</strong> from the provider. You will receive a notification as soon as your booking is confirmed — please allow up to 24 hours.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d0d7de;border-radius:6px;overflow:hidden;font-size:15px;">
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;width:40%;border-bottom:1px solid #d0d7de;">Booking Reference</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${bookingId}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Service</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceName}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Description</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceDescription}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Duration</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${duration_minutes} minutes</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Date &amp; Time</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${formattedDate}, ${bookingTime}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Location</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${location}, ${country}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Phone</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${phone_number}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Email</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${email}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;">Amount</td><td style="padding:10px 16px;color:#24292f;">${amount}</td></tr>
      </table>
      <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#57606a;">If you have any questions in the meantime, please contact the provider directly or reach out to ServiceHub support.</p>
    </td></tr>
    <tr><td style="padding:20px 40px;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
      <p style="margin:0 0 6px;font-size:13px;color:#57606a;">You will be notified by email once the provider confirms or updates your booking.</p>
      <p style="margin:0;font-size:13px;color:#8c959f;">Please do not treat this email as a confirmed booking until you receive a confirmation notice.</p>
    </td></tr>
  </table>
  <table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td align="center" style="padding:20px;"><p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p></td></tr></table>
  </td></tr></table>
  </body></html>
  `;

  return await resend.emails.send({ from: 'booking@ppeliance.co.uk', to, subject, html });
};

// ─────────────────────────────────────────────────────────────
// PROVIDER – New Booking Request (Pending)
// ─────────────────────────────────────────────────────────────
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
  to: string;
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
  const subject = 'New Booking Request – Action Required';

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>New Booking Request</title></head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
    <tr><td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Welcome to ServiceHub!</h1>
      <p style="margin:10px 0 0;color:#ffffff;font-size:16px;opacity:0.92;">You have a new booking request from ${customerName}</p>
    </td></tr>
    <tr><td style="padding:24px 40px 0;text-align:center;">
      <span style="display:inline-block;padding:8px 20px;background-color:#fff8e1;border:1px solid #f59e0b;border-radius:20px;font-size:14px;font-weight:600;color:#b45309;">⏳ Awaiting Your Confirmation</span>
    </td></tr>
    <tr><td style="padding:28px 40px 40px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#24292f;font-weight:600;">Booking Request Details</h2>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#57606a;">A customer has submitted a booking request through ServiceHub. This booking is currently <strong>pending your confirmation</strong>. The customer is waiting to hear from you — please review the details below and confirm or contact them at your earliest convenience.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d0d7de;border-radius:6px;overflow:hidden;font-size:15px;">
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;width:40%;border-bottom:1px solid #d0d7de;">Booking Reference</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${bookingId}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Name</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerName}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Email</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerEmail}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Phone</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerPhone}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Service</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceName}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Description</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceDescription}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Duration</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${duration_minutes} minutes</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Date &amp; Time</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${formattedDate}, ${bookingTime}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;">Amount</td><td style="padding:10px 16px;color:#24292f;">${amount}</td></tr>
      </table>
      <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#57606a;">Once you confirm the booking, the customer will be automatically notified. If you need to discuss details, please contact the customer directly using the information above.</p>
    </td></tr>
    <tr><td style="padding:20px 40px;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
      <p style="margin:0 0 6px;font-size:13px;color:#57606a;">The customer is waiting for your confirmation before this booking is considered active.</p>
      <p style="margin:0;font-size:13px;color:#8c959f;">Please confirm or respond within 24 hours to avoid the request expiring.</p>
    </td></tr>
  </table>
  <table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td align="center" style="padding:20px;"><p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p></td></tr></table>
  </td></tr></table>
  </body></html>
  `;

  return await resend.emails.send({ from: 'booking@ppeliance.co.uk', to, subject, html });
};

// ─────────────────────────────────────────────────────────────
// CUSTOMER – Booking Confirmed
// ─────────────────────────────────────────────────────────────
export const sendCustomerBookingConfirmedEmail = async ({
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
  const subject = 'Your Booking is Confirmed! 🎉';

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Booking Confirmed</title></head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
    <tr><td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Welcome to ServiceHub!</h1>
      <p style="margin:10px 0 0;color:#ffffff;font-size:16px;opacity:0.92;">Great news — your booking has been confirmed</p>
    </td></tr>
    <tr><td style="padding:24px 40px 0;text-align:center;">
      <span style="display:inline-block;padding:8px 20px;background-color:#ecfdf5;border:1px solid #10b981;border-radius:20px;font-size:14px;font-weight:600;color:#047857;">✅ Booking Confirmed</span>
    </td></tr>
    <tr><td style="padding:28px 40px 40px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#24292f;font-weight:600;">Your Booking Details</h2>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#57606a;">Your booking with <strong>${providerName}</strong> has been confirmed. Everything is set — please review the details below and make note of your appointment time.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d0d7de;border-radius:6px;overflow:hidden;font-size:15px;">
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;width:40%;border-bottom:1px solid #d0d7de;">Booking Reference</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${bookingId}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Service</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceName}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Description</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceDescription}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Duration</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${duration_minutes} minutes</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Date &amp; Time</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${formattedDate}, ${bookingTime}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Location</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${location}, ${country}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Phone</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${phone_number}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Email</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${email}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;">Amount Paid</td><td style="padding:10px 16px;color:#24292f;">${amount}</td></tr>
      </table>
      <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#57606a;">We look forward to seeing you! If you need to make any changes, please contact <strong>${providerName}</strong> or reach out to ServiceHub support in advance.</p>
    </td></tr>
    <tr><td style="padding:20px 40px;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
      <p style="margin:0 0 6px;font-size:13px;color:#57606a;">Please save this email as your booking confirmation record.</p>
      <p style="margin:0;font-size:13px;color:#8c959f;">Need help? Contact us at support@servicehub.com</p>
    </td></tr>
  </table>
  <table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td align="center" style="padding:20px;"><p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p></td></tr></table>
  </td></tr></table>
  </body></html>
  `;

  return await resend.emails.send({ from: 'booking@ppeliance.co.uk', to, subject, html });
};

// ─────────────────────────────────────────────────────────────
// PROVIDER – Booking Confirmed
// ─────────────────────────────────────────────────────────────
export const sendProviderBookingConfirmedEmail = async ({
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
  to: string;
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
  const subject = 'Booking Confirmed – Appointment Scheduled';

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Booking Confirmed</title></head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
    <tr><td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Welcome to ServiceHub!</h1>
      <p style="margin:10px 0 0;color:#ffffff;font-size:16px;opacity:0.92;">You've confirmed a booking from ${customerName}</p>
    </td></tr>
    <tr><td style="padding:24px 40px 0;text-align:center;">
      <span style="display:inline-block;padding:8px 20px;background-color:#ecfdf5;border:1px solid #10b981;border-radius:20px;font-size:14px;font-weight:600;color:#047857;">✅ Booking Confirmed</span>
    </td></tr>
    <tr><td style="padding:28px 40px 40px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#24292f;font-weight:600;">Confirmed Booking Details</h2>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#57606a;">You've successfully confirmed the booking from <strong>${customerName}</strong>. The customer has been notified. Please review the appointment details below and ensure you're prepared ahead of the scheduled time.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d0d7de;border-radius:6px;overflow:hidden;font-size:15px;">
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;width:40%;border-bottom:1px solid #d0d7de;">Booking Reference</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${bookingId}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Name</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerName}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Email</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerEmail}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Phone</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerPhone}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Service</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceName}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Description</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceDescription}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Duration</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${duration_minutes} minutes</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Date &amp; Time</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${formattedDate}, ${bookingTime}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;">Amount Earned</td><td style="padding:10px 16px;color:#24292f;">${amount}</td></tr>
      </table>
      <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#57606a;">If you need to make any changes or cancel this appointment, please contact the customer directly or manage the booking through your ServiceHub dashboard.</p>
    </td></tr>
    <tr><td style="padding:20px 40px;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
      <p style="margin:0 0 6px;font-size:13px;color:#57606a;">The customer has been notified that their booking is confirmed.</p>
      <p style="margin:0;font-size:13px;color:#8c959f;">Need help? Contact us at support@servicehub.com</p>
    </td></tr>
  </table>
  <table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td align="center" style="padding:20px;"><p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p></td></tr></table>
  </td></tr></table>
  </body></html>
  `;

  return await resend.emails.send({ from: 'booking@ppeliance.co.uk', to, subject, html });
};

// ─────────────────────────────────────────────────────────────
// CUSTOMER – Booking Cancelled
// ─────────────────────────────────────────────────────────────
export const sendCustomerBookingCancelledEmail = async ({
  to,
  bookingId,
  serviceName,
  providerName,
  formattedDate,
  bookingTime,
  amount,
  cancelledBy,
  cancellationReason,
}: {
  to: string;
  bookingId: string;
  serviceName: string;
  providerName: string;
  formattedDate: string;
  bookingTime: string;
  amount: string;
  cancelledBy: 'provider' | 'customer' | 'system';
  cancellationReason?: string;
}) => {
  const subject = 'Your Booking Has Been Cancelled';
  const cancelledByLabel =
  
    cancelledBy === 'customer' ? 'you' : 'provider';

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Booking Cancelled</title></head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
    <tr><td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Welcome to ServiceHub!</h1>
      <p style="margin:10px 0 0;color:#ffffff;font-size:16px;opacity:0.92;">Your booking has been cancelled</p>
    </td></tr>
    <tr><td style="padding:24px 40px 0;text-align:center;">
      <span style="display:inline-block;padding:8px 20px;background-color:#fef2f2;border:1px solid #f87171;border-radius:20px;font-size:14px;font-weight:600;color:#b91c1c;">❌ Booking Cancelled</span>
    </td></tr>
    <tr><td style="padding:28px 40px 40px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#24292f;font-weight:600;">Cancellation Notice</h2>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#57606a;">We're sorry to let you know that your booking with <strong>${providerName}</strong> has been cancelled by <strong>${cancelledByLabel}</strong>.${cancellationReason ? ` The reason provided was: <em>"${cancellationReason}"</em>.` : ''} Please see the cancelled booking details below.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d0d7de;border-radius:6px;overflow:hidden;font-size:15px;">
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;width:40%;border-bottom:1px solid #d0d7de;">Booking Reference</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${bookingId}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Service</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceName}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Provider</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${providerName}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Original Date &amp; Time</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${formattedDate}, ${bookingTime}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Amount Paid</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${amount}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;">Cancelled By</td><td style="padding:10px 16px;color:#24292f;">${cancelledByLabel}</td></tr>
      </table>
      <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#57606a;">If a refund is applicable, it will be processed within 5–7 business days to your original payment method. For refund queries or to rebook, please contact ServiceHub support.</p>
    </td></tr>
    <tr><td style="padding:20px 40px;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
      <p style="margin:0 0 6px;font-size:13px;color:#57606a;">We're sorry for any inconvenience caused. We hope to serve you again soon.</p>
      <p style="margin:0;font-size:13px;color:#8c959f;">Need help? Contact us at support@servicehub.com</p>
    </td></tr>
  </table>
  <table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td align="center" style="padding:20px;"><p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p></td></tr></table>
  </td></tr></table>
  </body></html>
  `;

  return await resend.emails.send({ from: 'booking@ppeliance.co.uk', to, subject, html });
};

// ─────────────────────────────────────────────────────────────
// PROVIDER – Booking Cancelled
// ─────────────────────────────────────────────────────────────
export const sendProviderBookingCancelledEmail = async ({
  to,
  bookingId,
  customerName,
  serviceName,
  formattedDate,
  bookingTime,
  customerEmail,
  customerPhone,
  amount,
  cancelledBy,
  cancellationReason,
}: {
  to: string;
  bookingId: string;
  customerName: string;
  serviceName: string;
  formattedDate: string;
  bookingTime: string;
  customerEmail: string;
  customerPhone: string;
  amount: string;
  cancelledBy: 'provider' | 'customer' | 'system';
  cancellationReason?: string;
}) => {
  const subject = 'Booking Cancelled – Appointment Removed';
  const cancelledByLabel =
    
    cancelledBy === 'provider' ? 'you' : 'customer';

  const html = `
  <!DOCTYPE html>
  <html lang="en">
  <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Booking Cancelled</title></head>
  <body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;background-color:#f6f8fa;color:#24292f;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f6f8fa;padding:40px 0;">
  <tr><td align="center">
  <table width="600" cellpadding="0" cellspacing="0" style="background-color:#ffffff;border-radius:8px;box-shadow:0 1px 3px rgba(0,0,0,0.1);overflow:hidden;">
    <tr><td style="padding:40px 40px 20px;text-align:center;background:linear-gradient(135deg, #0077b6 0%, #8ecae6 100%);">
      <h1 style="margin:0;color:#ffffff;font-size:28px;font-weight:600;">Welcome to ServiceHub!</h1>
      <p style="margin:10px 0 0;color:#ffffff;font-size:16px;opacity:0.92;">A booking has been cancelled</p>
    </td></tr>
    <tr><td style="padding:24px 40px 0;text-align:center;">
      <span style="display:inline-block;padding:8px 20px;background-color:#fef2f2;border:1px solid #f87171;border-radius:20px;font-size:14px;font-weight:600;color:#b91c1c;">❌ Booking Cancelled</span>
    </td></tr>
    <tr><td style="padding:28px 40px 40px;">
      <h2 style="margin:0 0 12px;font-size:20px;color:#24292f;font-weight:600;">Cancellation Notice</h2>
      <p style="margin:0 0 20px;font-size:16px;line-height:1.6;color:#57606a;">The following booking has been cancelled by <strong>${cancelledByLabel}</strong>.${cancellationReason ? ` The reason provided was: <em>"${cancellationReason}"</em>.` : ''} Please review the details below and update your schedule accordingly.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #d0d7de;border-radius:6px;overflow:hidden;font-size:15px;">
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;width:40%;border-bottom:1px solid #d0d7de;">Booking Reference</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${bookingId}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Name</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerName}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Email</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerEmail}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Customer Phone</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${customerPhone}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Service</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${serviceName}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Original Date &amp; Time</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${formattedDate}, ${bookingTime}</td></tr>
        <tr style="background-color:#f6f8fa;"><td style="padding:10px 16px;font-weight:600;color:#57606a;border-bottom:1px solid #d0d7de;">Amount</td><td style="padding:10px 16px;color:#24292f;border-bottom:1px solid #d0d7de;">${amount}</td></tr>
        <tr><td style="padding:10px 16px;font-weight:600;color:#57606a;">Cancelled By</td><td style="padding:10px 16px;color:#24292f;">${cancelledByLabel}</td></tr>
      </table>
      <p style="margin:24px 0 0;font-size:14px;line-height:1.6;color:#57606a;">This time slot is now free in your schedule. If you have any questions about this cancellation, please contact ServiceHub support or reach out to the customer directly.</p>
    </td></tr>
    <tr><td style="padding:20px 40px;background-color:#f6f8fa;border-top:1px solid #d0d7de;">
      <p style="margin:0 0 6px;font-size:13px;color:#57606a;">Your availability has been updated to reflect this cancellation.</p>
      <p style="margin:0;font-size:13px;color:#8c959f;">Need help? Contact us at support@servicehub.com</p>
    </td></tr>
  </table>
  <table width="600" cellpadding="0" cellspacing="0" style="margin-top:20px;"><tr><td align="center" style="padding:20px;"><p style="margin:0;font-size:12px;color:#8c959f;">© 2026 ServiceHub. All rights reserved.</p></td></tr></table>
  </td></tr></table>
  </body></html>
  `;

  return await resend.emails.send({ from: 'booking@ppeliance.co.uk', to, subject, html });
};