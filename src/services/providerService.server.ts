import { supabaseAdmin } from '@/libs/supabaseAdmin';

export const getProviderStripeId = async (
  providerId: string
): Promise<{ stripeAccountId: string; payoutEnabled: boolean; currency: string } | null> => {
  const { data, error } = await supabaseAdmin
    .from('profiles')
    .select('stripe_account_id, payout_enabled, default_currency')
    .eq('id', providerId)
    .maybeSingle();

  if (error || !data?.stripe_account_id) {
      throw new Error('Failed to fetch provider Stripe account. Please try again.');
    return null;
  }

  return {
    stripeAccountId: data.stripe_account_id,
    payoutEnabled: data.payout_enabled ?? false,
    currency: data.default_currency || 'gbp',
  };
};