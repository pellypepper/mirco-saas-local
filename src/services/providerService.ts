import { createClient as supabaseClient} from '@/libs/supabaseClient';



export const fetchServiceTypes = async (): Promise<string[]> => {
  const supabase =  supabaseClient();
  const { data, error } = await supabase.from('profiles').select('service_type');
  if (error) {
   throw new Error('Failed to fetch service types. Please try again.');
    return [];
  }
  const uniqueTypes = Array.from(
    new Set(
      data
        .map((item: any) => item.service_type)
        .filter((type: string | null) => type && type.trim() !== ''),
    ),
  ).sort();
  return uniqueTypes;
};

export const upsertProviderProfile = async ({
  id,
  name,
  service_type,
  address,
  country,
}: {
  id: string;
  name: string;
  service_type: string;
  address: string;
  country: string;
}) => {
  const supabase =  supabaseClient();
  return await supabase.from('profiles').upsert({
    id,
    role: 'provider',
    full_name: name,
    service_type,
    location: address,
    country,
  });
};

export const fetchProviderProfile = async () => {
 const supabase =  supabaseClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('role', 'provider');

  if (!error) return data || [];
};

export const fetchProviderById = async (providerId: string) => {
  const supabase =  supabaseClient();
  const { data, error } = await supabase.from('profiles').select('*').eq('id', providerId).single();

  if (!error) return data || [];
};
