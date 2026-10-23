import { NextResponse, type NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';

const ALLOWED_DESK_TYPES = ['buy', 'sell', 'esop', 'Buy Shares', 'Sell Shares', 'Liquidate ESOPs'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, phone, email, stockName, message, sourcePage } = body;

    // Server-side validation
    if (!inquiryType || !ALLOWED_DESK_TYPES.includes(inquiryType)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid Inquiry Type (Buy Shares, Sell Shares, or Liquidate ESOPs).' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid Full Name.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid Mobile Number.' },
        { status: 400 }
      );
    }

    // Persist to Supabase
    try {
      const supabase = getSupabase();
      if (supabase) {
        const mappedType =
          inquiryType === 'buy' || inquiryType === 'Buy Shares'
            ? 'buy_order'
            : inquiryType === 'sell' || inquiryType === 'Sell Shares'
            ? 'sell_order'
            : 'esop_liquidity';

        await supabase.from('lead_enquiries').insert([
          {
            name: name.trim(),
            phone: phone.trim(),
            email: email?.trim() || null,
            stock_name: stockName?.trim() || null,
            message: message?.trim() || null,
            enquiry_type: mappedType,
            source_page: sourcePage || 'modal',
            status: 'new',
          },
        ]);
      }
    } catch (dbErr) {
      console.warn('[Desk Inquiry DB Notice]', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Dealing desk enquiry logged successfully! An executive will reach out shortly.',
    });
  } catch (err: any) {
    console.error('[Desk Inquiry API Error]', err);
    return NextResponse.json(
      { success: false, error: 'Failed to process inquiry submission.' },
      { status: 500 }
    );
  }
}
