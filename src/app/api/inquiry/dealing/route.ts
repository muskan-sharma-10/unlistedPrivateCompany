import { NextResponse, type NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendDealingInquiryEmail, DEFAULT_DEALING_RECIPIENT } from '@/lib/email';
import { getSupabase } from '@/lib/supabase/client';

const ALLOWED_TYPES = [
  'buy',
  'sell',
  'esop',
  'partner',
  'general',
  'Buy Shares',
  'Sell Shares',
  'Sell ESOPs',
  'Partner With Us',
  'Liquidate ESOPs',
  'buy_order',
  'sell_order',
  'esop_liquidity',
  'partner_desk',
  'contact_inquiry',
  'general_inquiry',
];

function appendLocalBackup(lead: Record<string, any>) {
  try {
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }
    const filePath = path.join(dataDir, 'lead_inquiries.json');
    let list: any[] = [];
    if (fs.existsSync(filePath)) {
      try {
        const raw = fs.readFileSync(filePath, 'utf8');
        list = JSON.parse(raw);
        if (!Array.isArray(list)) list = [];
      } catch {
        list = [];
      }
    }
    list.unshift(lead);
    // Keep last 500 inquiries
    if (list.length > 500) list = list.slice(0, 500);
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Local Backup Notice] Could not append inquiry locally:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      inquiryType,
      name,
      phone,
      email,
      stockName,
      quantity,
      targetPrice,
      message,
      sourcePage,
    } = body;

    // 1. Normalize inquiry type
    const rawType = String(inquiryType || 'buy_order').trim();
    if (!ALLOWED_TYPES.includes(rawType) && !ALLOWED_TYPES.some((t) => t.toLowerCase() === rawType.toLowerCase())) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please select a valid Inquiry Type (Buy Shares, Sell Shares, Sell ESOPs, or Partner With Us).',
        },
        { status: 400 }
      );
    }

    const cleanName = typeof name === 'string' && name.trim().length >= 1 ? name.trim() : 'Portal Investor';
    const cleanPhone = typeof phone === 'string' ? phone.trim() : '';

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid Contact Number (at least 7 digits).' },
        { status: 400 }
      );
    }

    const cleanStockName = typeof stockName === 'string' && stockName.trim().length >= 1 ? stockName.trim() : 'Unlisted Share';

    if (email && (typeof email !== 'string' || !email.includes('@'))) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid email address or leave it blank.' },
        { status: 400 }
      );
    }

    const mappedEnquiryType =
      rawType === 'buy' || rawType === 'Buy Shares' || rawType === 'buy_order'
        ? 'buy_order'
        : rawType === 'sell' || rawType === 'Sell Shares' || rawType === 'sell_order'
        ? 'sell_order'
        : rawType === 'esop' || rawType === 'Sell ESOPs' || rawType === 'Liquidate ESOPs' || rawType === 'esop_liquidity'
        ? 'esop_liquidity'
        : rawType === 'partner' || rawType === 'Partner With Us' || rawType === 'partner_desk'
        ? 'partner_desk'
        : 'contact_inquiry';

    const parsedQuantity = quantity
      ? parseInt(String(quantity).replace(/\D/g, ''), 10) || null
      : null;

    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      phone: cleanPhone,
      email: email?.trim() || null,
      stock_name: cleanStockName,
      quantity: parsedQuantity,
      target_price: targetPrice ? Number(targetPrice) || null : null,
      message: message?.trim() || null,
      enquiry_type: mappedEnquiryType,
      source_page: sourcePage || '/shares',
      status: 'new',
      created_at: new Date().toISOString(),
    };

    // 2. Persist to local backup on server so leads are NEVER lost
    appendLocalBackup(leadRecord);

    // 3. Persist to Supabase if table is present
    let dbSuccess = false;
    let dbErrorMsg: string | null = null;
    let leadRecordId: string | null = leadRecord.id;

    try {
      const supabase = getSupabase();
      if (supabase) {
        const { data: insertedData, error: insertError } = await supabase
          .from('lead_enquiries')
          .insert([
            {
              name: cleanName,
              phone: cleanPhone,
              email: email?.trim() || null,
              stock_name: cleanStockName,
              quantity: parsedQuantity,
              target_price: leadRecord.target_price,
              message: message?.trim() || null,
              enquiry_type: mappedEnquiryType,
              source_page: sourcePage || '/shares',
              status: 'new',
            },
          ])
          .select('id')
          .single();

        if (insertError) {
          dbErrorMsg = insertError.message;
          console.warn('[Supabase Insert Notice in lead_enquiries]:', insertError.message);
        } else {
          dbSuccess = true;
          leadRecordId = insertedData?.id || leadRecordId;
          console.log(`[Database Log] Lead inquiry stored successfully in Supabase (ID: ${leadRecordId})`);
        }
      }
    } catch (dbErr: any) {
      dbErrorMsg = dbErr?.message || 'Database exception';
      console.warn('[Database Notice in lead_enquiries]:', dbErr?.message);
    }

    // 4. Dispatch Email Notification directly to Dealing Desk via SMTP
    const emailData = {
      inquiryType: mappedEnquiryType,
      name: cleanName,
      phone: cleanPhone,
      email: email?.trim(),
      stockName: cleanStockName,
      quantity: parsedQuantity ? `${parsedQuantity} Shares` : undefined,
      targetPrice: targetPrice || undefined,
      message: message?.trim(),
      sourcePage: sourcePage || '/shares',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    const emailResult = await sendDealingInquiryEmail(emailData, DEFAULT_DEALING_RECIPIENT);

    // 5. Handle combined outcomes
    if (emailResult.success) {
      return NextResponse.json({
        success: true,
        emailDelivered: true,
        dbLogged: dbSuccess,
        message: 'Your inquiry has been received and emailed to our dealing desk. An executive will reach out shortly.',
        recipient: DEFAULT_DEALING_RECIPIENT,
      });
    }

    // Fallback: If email delivery had an issue, local lead was safely saved
    return NextResponse.json({
      success: true,
      emailDelivered: false,
      dbLogged: dbSuccess,
      message: 'Your inquiry has been securely logged with our dealing desk. An executive will reach out shortly.',
    });
  } catch (err: any) {
    console.error('[Dealing Inquiry API Server Error]:', err);
    return NextResponse.json(
      {
        success: false,
        error: 'An unexpected error occurred while processing your inquiry. Please try again or call our dealing desk.',
      },
      { status: 500 }
    );
  }
}
