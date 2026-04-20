
import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function GET() {
  const { data: bookings, error: bookingError } = await supabaseAdmin
    .from('bookings').select('*');
  if (bookingError) return NextResponse.json({ error: bookingError.message }, { status: 400 });
  if (!bookings?.length) return NextResponse.json({ bookings: [] });

  const [{ data: profiles }, { data: services }] = await Promise.all([
    supabaseAdmin.from('profiles').select('id, full_name, location'),
    supabaseAdmin.from('services').select('id, title, description, duration_minutes'),
  ]);

  const profileMap: Record<string, any> = {};
  profiles?.forEach((p) => (profileMap[p.id] = p));
  const serviceMap: Record<string, any> = {};
  services?.forEach((s) => (serviceMap[s.id] = s));

  const formattedBookings = bookings.map((b, index) => {
    const customer = profileMap[b.customer_id];
    const provider = profileMap[b.provider_id];
    const service = serviceMap[b.services_id];
    const bookingDate = new Date(b.booking_date);
    return {
      id: b.id,
      bookingRef: `BK-${bookingDate.getFullYear()}-${String(index + 1).padStart(3, '0')}`,
      clientName: customer?.full_name ?? 'Unknown',
      clientEmail: b?.email ?? b.customer_email,
      providerName: provider?.full_name ?? 'Unknown',
      serviceName: service?.title ?? 'Unknown',
      serviceDescription: service?.description ?? '',
      date: bookingDate.toISOString().split('T')[0],
      time: bookingDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: service?.duration_minutes ?? null,
      amount: b.amount,
      status: b.status,
      location: customer?.location ?? null,
      paymentStatus: b.payment_id ? 'paid' : 'unpaid',
      createdAt: b.created_at,
    };
  });

  return NextResponse.json({ bookings: formattedBookings });
}