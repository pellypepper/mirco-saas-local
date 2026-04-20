import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { newDate, availabilityId, oldAvailabilityId } = await request.json();

  await supabaseAdmin.from('bookings').update({ booking_date: newDate, availability_id: availabilityId }).eq('id', id);
  await supabaseAdmin.from('availability').update({ is_booked: false }).eq('id', oldAvailabilityId);
  await supabaseAdmin.from('availability').update({ is_booked: true }).eq('id', availabilityId);

  return NextResponse.json({ success: true });
}