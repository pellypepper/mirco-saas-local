import { createClient } from '@/libs/supabaseClient';

const supabase = createClient();

export const fetchBookingByPayment = async (paymentId: string, customerId: string) => {
  try {
    const { data, error } = await supabase
      .from('bookings')
      .select('*')
      .or(`payment_id.eq.${paymentId},payment_id.like.pi_%`)
      .eq('customer_id', customerId)
      .order('created_at', { ascending: false })
      .limit(1)
      .maybeSingle();

    if (error) throw error;
    return data;
  } catch (err) {
     throw new Error('Failed to fetch booking by payment. Please try again.');
    return null;
  }
};

export const fetchService = async (serviceId: string) => {
  const { data, error } = await supabase.from('services').select('*').eq('id', serviceId).single();
  if (error) {
     throw new Error('Failed to fetch service. Please try again.');
  }
  return data;
};

export const fetchProfile = async (userId: string) => {
  const { data, error } = await supabase.from('profiles').select('*').eq('id', userId).single();
  if (error) {
     throw new Error('Failed to fetch profile. Please try again.');
  }
  return data;
};
