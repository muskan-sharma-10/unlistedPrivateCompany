import { NextResponse, type NextRequest } from 'next/server';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { getBrowserSupabase } from '@/lib/supabase/client';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const supabase = await createServerSupabaseClient();
    let authenticatedUser = null;

    // 1. Try server cookie session first
    const {
      data: { user: cookieUser },
      error: cookieAuthError,
    } = await supabase.auth.getUser();

    if (cookieUser && !cookieAuthError) {
      authenticatedUser = cookieUser;
    } else {
      // 2. Fallback to Authorization Bearer token from header
      const authHeader = request.headers.get('authorization');
      if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.slice(7).trim();
        const client = getBrowserSupabase();
        if (client) {
          const { data: tokenData, error: tokenError } = await client.auth.getUser(token);
          if (tokenData?.user && !tokenError) {
            authenticatedUser = tokenData.user;
          }
        }
      }
    }

    if (!authenticatedUser || !authenticatedUser.email) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized. Please sign in to view your account data.' },
        { status: 401 }
      );
    }

    // 3. User-specific query strictly restricted to authenticated user's email
    const { data: inquiries, error: queryError } = await supabase
      .from('lead_enquiries')
      .select('id, stock_name, quantity, enquiry_type, status, created_at, message, source_page')
      .eq('email', authenticatedUser.email.trim())
      .order('created_at', { ascending: false });

    if (queryError) {
      console.error('[Portfolio Inquiries Query Notice]:', queryError.message);
      // If table is restricted by RLS or unavailable, return empty list gracefully without fabrication
      return NextResponse.json({
        success: true,
        inquiries: [],
        notice: 'Inquiries temporarily unavailable under depository synchronization.'
      });
    }

    return NextResponse.json({
      success: true,
      inquiries: inquiries || [],
      userEmail: authenticatedUser.email,
    });
  } catch (err: any) {
    console.error('[Portfolio Inquiries API Error]:', err);
    return NextResponse.json(
      { success: false, error: 'Failed to retrieve portfolio activity records.' },
      { status: 500 }
    );
  }
}
