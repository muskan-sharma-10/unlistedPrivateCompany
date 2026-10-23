import { createBrowserClient } from '@supabase/ssr';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://yxvfciewtuvpljaoukyu.supabase.co';
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  'sb_publishable_RY-xubaK5noTlmrlrg0bIw_HahknsC4';

let browserClientInstance: any = null;

/**
 * Creates or retrieves a singleton browser Supabase client with SSR cookie support.
 */
export function getBrowserSupabase(): any {
  if (typeof window === 'undefined') {
    return createSupabaseClient(supabaseUrl, supabaseKey);
  }
  if (!browserClientInstance && supabaseUrl && supabaseKey) {
    browserClientInstance = createBrowserClient(supabaseUrl, supabaseKey);
  }
  return browserClientInstance;
}

/**
 * Backward-compatible export for existing query modules
 */
export function getSupabase(): any {
  return getBrowserSupabase();
}
