import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yxvfciewtuvpljaoukyu.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_RY-xubaK5noTlmrlrg0bIw_HahknsC4';

let clientInstance: any = null;

export function getSupabase(): any {
  if (!clientInstance && supabaseUrl && supabaseKey) {
    clientInstance = createSupabaseClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      },
    });
  }
  return clientInstance;
}
