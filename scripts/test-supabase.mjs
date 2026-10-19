import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yxvfciewtuvpljaoukyu.supabase.co';
const supabaseKey = 'sb_publishable_RY-xubaK5noTlmrlrg0bIw_HahknsC4';

const supabase = createClient(supabaseUrl, supabaseKey);

async function test() {
  console.log('Testing Supabase connection...');
  
  const tables = ['unlisted_shares', 'drhp_companies', 'blogs', 'research_reports', 'videos', 'testimonials', 'homepage_content', 'website_settings', 'lead_enquiries', 'partner_applications'];
  
  for (const table of tables) {
    const res = await supabase.from(table).select('*').limit(1);
    if (res.error) {
      console.log(`Table [${table}]: ERROR - ${res.error.message} (code: ${res.error.code})`);
    } else {
      console.log(`Table [${table}]: SUCCESS (found ${res.data?.length} rows)`);
    }
  }

  // Also test fetching one record from unlisted_shares
  const { data: shares, error: sharesErr } = await supabase.from('unlisted_shares').select('id, name, symbol, slug, current_price, lot_size').limit(3);
  if (sharesErr) {
    console.log('Error fetching shares sample:', sharesErr.message);
  } else {
    console.log('Shares sample (count ' + shares.length + '):', JSON.stringify(shares, null, 2));
  }
}

test().catch(console.error);
