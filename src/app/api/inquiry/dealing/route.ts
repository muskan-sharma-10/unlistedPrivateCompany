import { NextResponse, type NextRequest } from 'next/server';
import { sendDealingInquiryEmail, DEFAULT_DEALING_RECIPIENT } from '@/lib/email';
import { getSupabase } from '@/lib/supabase/client';

const ALLOWED_TYPES = ['buy', 'sell', 'esop', 'partner', 'Buy Shares', 'Sell Shares', 'Sell ESOPs', 'Partner With Us'];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, phone, email, stockName, quantity, message, sourcePage } = body;

    // Server-side validation
    if (!inquiryType || !ALLOWED_TYPES.includes(inquiryType)) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid Inquiry Type (Buy Shares, Sell Shares, Sell ESOPs, or Partner With Us).' },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid Full Name.' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid Mobile Number.' },
        { status: 400 }
      );
    }

    if (!stockName || typeof stockName !== 'string' || stockName.trim().length < 1) {
      return NextResponse.json(
        { success: false, error: 'Please enter the Company / Unlisted Stock name.' },
        { status: 400 }
      );
    }

    // 1. Send Email Notification directly to info.biswal01@gmail.com
    const emailResult = await sendDealingInquiryEmail({
      inquiryType,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      stockName: stockName.trim(),
      quantity: quantity ? String(quantity).trim() : undefined,
      message: message?.trim(),
      sourcePage: sourcePage || '/contact-us',
    }, DEFAULT_DEALING_RECIPIENT);

    if (!emailResult.success) {
      return NextResponse.json(
        {
          success: false,
          error: emailResult.error || 'Failed to dispatch email to the dealing desk. Please try again.',
        },
        { status: 502 }
      );
    }

    // 2. Persist to Supabase lead_enquiries database table
    try {
      const supabase = getSupabase();
      if (supabase) {
        const mappedEnquiryType =
          inquiryType === 'buy' || inquiryType === 'Buy Shares'
            ? 'buy_order'
            : inquiryType === 'sell' || inquiryType === 'Sell Shares'
            ? 'sell_order'
            : inquiryType === 'esop' || inquiryType === 'Sell ESOPs'
            ? 'esop_liquidity'
            : 'partner_desk';

        await supabase.from('lead_enquiries').insert([
          {
            name: name.trim(),
            phone: phone.trim(),
            email: email?.trim() || null,
            stock_name: stockName.trim(),
            quantity: quantity ? parseInt(String(quantity).replace(/\D/g, ''), 10) || null : null,
            message: message?.trim() || null,
            enquiry_type: mappedEnquiryType,
            source_page: sourcePage || '/contact-us',
            status: 'new',
          },
        ]);
      }
    } catch (dbErr) {
      console.warn('[Database Insert Notice] Lead logged via email but Supabase table unavailable:', dbErr);
    }

    return NextResponse.json({
      success: true,
      message: 'Inquiry received successfully! The dealing desk has been notified.',
      recipient: DEFAULT_DEALING_RECIPIENT,
      simulated: emailResult.simulated,
    });
  } catch (err: any) {
    console.error('[Dealing Inquiry API Error]', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your inquiry.' },
      { status: 500 }
    );
  }
}
