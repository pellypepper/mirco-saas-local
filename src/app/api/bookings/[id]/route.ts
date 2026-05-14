import { supabaseAdmin } from '@/libs/supabaseAdmin';
import { createClient } from '@/libs/supabaseServer';
import { NextResponse } from 'next/server';

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const { role } = await request.json(); // 'customer' or 'provider'

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const field = role === 'provider' ? 'deleted_by_provider' : 'deleted_by_customer';

  const { error } = await supabaseAdmin
    .from('bookings')
    .update({ [field]: true })
    .eq('id', id);

  if (error) return NextResponse.json({ error: error.message }, { status: 400 });
  return NextResponse.json({ success: true });
}