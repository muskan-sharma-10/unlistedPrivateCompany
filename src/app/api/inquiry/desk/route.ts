import { NextResponse, type NextRequest } from 'next/server';
import fs from 'fs';
import path from 'path';
import { sendDealingInquiryEmail, DEFAULT_DEALING_RECIPIENT } from '@/lib/email';
import { getSupabase } from '@/lib/supabase/client';

const ALLOWED_DESK_TYPES = [
  'buy',
  'sell',
  'esop',
  'Buy Shares',
  'Sell Shares',
  'Liquidate ESOPs',
  'buy_order',
  'sell_order',
  'esop_liquidity',
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
    if (list.length > 500) list = list.slice(0, 500);
    fs.writeFileSync(filePath, JSON.stringify(list, null, 2), 'utf8');
  } catch (err) {
    console.warn('[Local Backup Notice] Could not append desk inquiry locally:', err);
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { inquiryType, name, phone, email, stockName, message, sourcePage } = body;

    const rawType = String(inquiryType || 'buy').trim();
    if (!ALLOWED_DESK_TYPES.includes(rawType) && !ALLOWED_DESK_TYPES.some((t) => t.toLowerCase() === rawType.toLowerCase())) {
      return NextResponse.json(
        { success: false, error: 'Please select a valid Inquiry Type (Buy Shares, Sell Shares, or Liquidate ESOPs).' },
        { status: 400 }
      );
    }

    const cleanName = typeof name === 'string' && name.trim().length >= 1 ? name.trim() : 'Portal Investor';
    const cleanPhone = typeof phone === 'string' ? phone.trim() : '';

    if (!cleanPhone || cleanPhone.replace(/\D/g, '').length < 7) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid Mobile Number (at least 7 digits).' },
        { status: 400 }
      );
    }

    const cleanStockName = typeof stockName === 'string' && stockName.trim().length >= 1 ? stockName.trim() : 'Unlisted Share';

    const mappedType =
      rawType === 'buy' || rawType === 'Buy Shares' || rawType === 'buy_order'
        ? 'buy_order'
        : rawType === 'sell' || rawType === 'Sell Shares' || rawType === 'sell_order'
        ? 'sell_order'
        : 'esop_liquidity';

    const leadRecord = {
      id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
      name: cleanName,
      phone: cleanPhone,
      email: email?.trim() || null,
      stock_name: cleanStockName,
      message: message?.trim() || null,
      enquiry_type: mappedType,
      source_page: sourcePage || 'modal',
      status: 'new',
      created_at: new Date().toISOString(),
    };

    appendLocalBackup(leadRecord);

    // Persist to Supabase if table is present
    try {
      const supabase = getSupabase();
      if (supabase) {
        await supabase.from('lead_enquiries').insert([
          {
            name: cleanName,
            phone: cleanPhone,
            email: email?.trim() || null,
            stock_name: cleanStockName,
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

    // Dispatch Email Notification via SMTP
    const emailData = {
      inquiryType: mappedType,
      name: cleanName,
      phone: cleanPhone,
      email: email?.trim(),
      stockName: cleanStockName,
      message: message?.trim(),
      sourcePage: sourcePage || 'modal',
      submittedAt: new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' }),
    };

    await sendDealingInquiryEmail(emailData, DEFAULT_DEALING_RECIPIENT);

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
