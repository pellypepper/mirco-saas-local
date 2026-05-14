import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { NextResponse } from 'next/server';

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const { newDate, availabilityId, oldAvailabilityId } = await request.json();

  // 1. Free up the old slot
  const { error: oldSlotError } = await supabaseAdmin
    .from('availability')
    .update({ is_booked: false })
    .eq('id', oldAvailabilityId);

  if (oldSlotError) return NextResponse.json({ error: oldSlotError.message }, { status: 400 });

  // 2. Book the new slot
  const { error: newSlotError } = await supabaseAdmin
    .from('availability')
    .update({ is_booked: true })
    .eq('id', availabilityId);

  if (newSlotError) return NextResponse.json({ error: newSlotError.message }, { status: 400 });

  // 3. Update the booking with new date, new availability, and reset to pending
  const { error: bookingError } = await supabaseAdmin
    .from('bookings')
    .update({
      booking_date: newDate,
      availability_id: availabilityId,
      status: 'pending',        // ✅ reset so provider must confirm again
    })
    .eq('id', id);

  if (bookingError) return NextResponse.json({ error: bookingError.message }, { status: 400 });

  return NextResponse.json({ success: true });
}