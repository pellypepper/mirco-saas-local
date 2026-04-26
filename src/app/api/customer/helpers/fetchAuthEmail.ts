import { supabaseAdmin} from '@/libs/supabaseAdmin';

export async function fetchAuthEmails(): Promise<Record<string, string>> {



  const emailMap: Record<string, string> = {};
  let page = 1;
  const perPage = 1000;

  try {
    while (true) {
      const { data, error } = await supabaseAdmin.auth.admin.listUsers({
        page,
        perPage,
      });

      if (error) {
      
        throw error;
      }

      if (!data || !data.users) break;

      data.users.forEach((u) => {
        emailMap[u.id] = u.email ?? '';
      });

      if (data.users.length < perPage) break;
      page++;
    }

    return emailMap;
  } catch (authError) {
    

    return {};
  }
}
