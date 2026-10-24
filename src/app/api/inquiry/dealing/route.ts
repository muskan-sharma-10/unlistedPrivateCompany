import { NextResponse, type NextRequest } from 'next/server';
import { sendDealingInquiryEmail, DEFAULT_DEALING_RECIPIENT } from '@/lib/email';
import { getSupabase } from '@/lib/supabase/client';

const ALLOWED_TYPES = [
  'buy',
  'sell',
  'esop',
  'partner',
  'Buy Shares',
  'Sell Shares',
  'Sell ESOPs',
  'Partner With Us',
  'Liquidate ESOPs'
];

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, phone, email, stockName, quantity, message, sourcePage } = body;

    // 1. Server-side validation
    if (!inquiryType || !ALLOWED_TYPES.includes(inquiryType)) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please select a valid Inquiry Type (Buy Shares, Sell Shares, Sell ESOPs, or Partner With Us).'
        },
        { status: 400 }
      );
    }

    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid Full Name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (!phone || typeof phone !== 'string' || phone.trim().length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid Contact Number (at least 7 digits).' },
        { status: 400 }
      );
    }

    if (!stockName || typeof stockName !== 'string' || stockName.trim().length < 1) {
      return NextResponse.json(
        { success: false, error: 'Please enter the Company / Unlisted Stock name.' },
        { status: 400 }
      );
    }

    if (email && (typeof email !== 'string' || !email.includes('@'))) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address or leave it blank.' },
        { status: 400 }
      );
    }

    // 2. Persist to Supabase lead_enquiries database table FIRST (Preserve lead data)
    let dbSuccess = false;
    let dbErrorMsg: string | null = null;
    let leadRecordId: string | null = null;

    try {
      const supabase = getSupabase();
      if (supabase) {
        const mappedEnquiryType =
          inquiryType === 'buy' || inquiryType === 'Buy Shares'
            ? 'buy_order'
            : inquiryType === 'sell' || inquiryType === 'Sell Shares'
            ? 'sell_order'
            : inquiryType === 'esop' || inquiryType === 'Sell ESOPs' || inquiryType === 'Liquidate ESOPs'
            ? 'esop_liquidity'
            : inquiryType === 'partner' || inquiryType === 'Partner With Us'
            ? 'partner_desk'
            : 'contact_inquiry';

        const parsedQuantity = quantity
          ? parseInt(String(quantity).replace(/\D/g, ''), 10) || null
          : null;

        const { data: insertedData, error: insertError } = await supabase
          .from('lead_enquiries')
          .insert([
            {
              name: name.trim(),
              phone: phone.trim(),
              email: email?.trim() || null,
              stock_name: stockName.trim(),
              quantity: parsedQuantity,
              message: message?.trim() || null,
              enquiry_type: mappedEnquiryType,
              source_page: sourcePage || '/contact-us',
              status: 'new',
            },
          ])
          .select('id')
          .single();

        if (insertError) {
          dbErrorMsg = insertError.message;
          console.error('[Supabase Insert Error in lead_enquiries]:', insertError);
        } else {
          dbSuccess = true;
          leadRecordId = insertedData?.id || null;
          console.log(`[Database Log] Lead inquiry stored successfully (ID: ${leadRecordId || 'generated'})`);
        }
      } else {
        dbErrorMsg = 'Supabase client unavailable';
      }
    } catch (dbErr: any) {
      dbErrorMsg = dbErr?.message || 'Database exception';
      console.error('[Database Exception in lead_enquiries]:', dbErr);
    }

    // 3. Dispatch Email Notification directly to Dealing Desk
    const emailData = {
      inquiryType,
      name: name.trim(),
      phone: phone.trim(),
      email: email?.trim(),
      stockName: stockName.trim(),
      quantity: quantity ? String(quantity).trim() : undefined,
      message: message?.trim(),
      sourcePage: sourcePage || '/contact-us',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const emailResult = await sendDealingInquiryEmail(emailData, DEFAULT_DEALING_RECIPIENT);

    // 4. Handle combined outcomes safely and transparently
    if (emailResult.success) {
      // Email was genuinely delivered via SMTP
      return NextResponse.json({
        success: true,
        emailDelivered: true,
        dbLogged: dbSuccess,
        message: 'Your inquiry has been received and emailed to our dealing desk. An executive will reach out shortly.',
        recipient: DEFAULT_DEALING_RECIPIENT,
      });
    }

    if (dbSuccess) {
      // Lead is safely recorded in the database, but email delivery was unconfigured or failed
      console.warn(
        `[Dealing Inquiry Notice] Inquiry recorded in DB (ID: ${leadRecordId}), but email delivery failed/unconfigured: ${emailResult.error}`
      );

      return NextResponse.json({
        success: true,
        emailDelivered: false,
        dbLogged: true,
        message: 'Your inquiry has been securely logged with our dealing desk. Our team will contact you within 2 business hours.',
        notice: emailResult.configured === false ? 'Email service awaiting SMTP configuration.' : undefined,
      });
    }

    // Both Database and Email failed
    console.error(
      `[Dealing Inquiry Failure] Both DB insert (${dbErrorMsg}) and email delivery (${emailResult.error}) failed.`
    );

    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process your inquiry at this moment. Please contact our dealing desk directly at +91 99908 65659 or via WhatsApp.'
      },
      { status: 500 }
    );
  } catch (err: any) {
    console.error('[Dealing Inquiry API Server Error]:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your inquiry. Please try again or call our dealing desk.'
      },
      { status: 500 }
    );
  }
}
