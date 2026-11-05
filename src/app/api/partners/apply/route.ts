import { NextResponse, type NextRequest } from 'next/server';
import { getSupabase } from '@/lib/supabase/client';
import { sendDealingInquiryEmail, DEFAULT_DEALING_RECIPIENT } from '@/lib/email';

// In-memory rate limiter: maximum 5 submissions per minute per IP address
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);
  if (!entry || now > entry.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + 60_000 });
    return true;
  }
  if (entry.count >= 5) {
    return false;
  }
  entry.count += 1;
  return true;
}

const ALLOWED_PARTNER_TYPES: Record<string, string> = {
  'sub-broker': 'sub_broker',
  'sub_broker': 'sub_broker',
  'wealth-manager': 'wealth_manager',
  'wealth_manager': 'wealth_manager',
  'esop-liquidity': 'esop_liquidity',
  'esop_liquidity': 'esop_liquidity',
  'fintech-api': 'fintech_api',
  'fintech_api': 'fintech_api',
  'investment_advisor': 'investment_advisor',
  'chartered_accountant': 'chartered_accountant',
  'esop_trust': 'esop_trust',
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[+]?[\d\s\-()]{7,20}$/;

export async function POST(request: NextRequest) {
  try {
    // 1. IP Rate Limiting Check
    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown';
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { success: false, error: 'Too many requests. Please wait a minute before submitting again.' },
        { status: 429 }
      );
    }

    const body = await request.json();
    const {
      name,
      full_name,
      email,
      phone,
      partnerType,
      partner_type,
      city,
      message,
      organization_name,
      honeypot,
    } = body;

    // Spam honeypot trap
    if (honeypot && String(honeypot).trim().length > 0) {
      return NextResponse.json({
        success: true,
        message: 'Your partner application has been recorded successfully.',
      });
    }

    const applicantName = (full_name || name || '').trim();
    const applicantEmail = (email || '').trim().toLowerCase();
    const applicantPhone = (phone || '').trim();
    const rawType = (partner_type || partnerType || 'sub_broker').trim();
    const applicantCity = (city || '').trim();
    const applicantMessage = (message || '').trim();
    const applicantOrg = (organization_name || '').trim();

    // 2. Server-side validation
    if (!applicantName || applicantName.length < 2) {
      return NextResponse.json(
        { success: false, error: 'Please enter a valid Full Name (at least 2 characters).' },
        { status: 400 }
      );
    }

    if (applicantName.length > 100) {
      return NextResponse.json(
        { success: false, error: 'Full Name cannot exceed 100 characters.' },
        { status: 400 }
      );
    }

    if (!applicantEmail || !EMAIL_REGEX.test(applicantEmail)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid official email address.' },
        { status: 400 }
      );
    }

    if (!applicantPhone || !PHONE_REGEX.test(applicantPhone)) {
      return NextResponse.json(
        { success: false, error: 'Please provide a valid phone number (at least 7 digits).' },
        { status: 400 }
      );
    }

    const normalizedPartnerType = ALLOWED_PARTNER_TYPES[rawType] || 'sub_broker';

    // 3. Database Persistence to Supabase
    let dbSuccess = false;
    let dbRecordId: string | null = null;
    let dbErrorMsg: string | null = null;

    try {
      const supabase = getSupabase();
      if (supabase) {
        const { data, error } = await supabase
          .from('partner_applications')
          .insert([
            {
              full_name: applicantName,
              email: applicantEmail,
              phone: applicantPhone,
              partner_type: normalizedPartnerType,
              organization_name: applicantOrg || null,
              city: applicantCity || null,
              message: applicantMessage || null,
              status: 'new',
            },
          ])
          .select('id')
          .single();

        if (error) {
          dbErrorMsg = error.message;
          console.warn('[Partner Application DB Notice]:', error.message);
        } else {
          dbSuccess = true;
          dbRecordId = data?.id || null;
          console.log('[Partner Application Stored in Supabase]:', dbRecordId);
        }
      }
    } catch (dbErr: any) {
      dbErrorMsg = dbErr?.message || 'DB Exception';
      console.warn('[Partner Application DB Exception]:', dbErr);
    }

    // 4. Send notification email to Dealing Desk
    let emailSuccess = false;
    try {
      const emailResult = await sendDealingInquiryEmail(
        {
          inquiryType: 'Partner With Us',
          name: applicantName,
          phone: applicantPhone,
          email: applicantEmail,
          stockName: `Partner Application - ${normalizedPartnerType.replace(/_/g, ' ').toUpperCase()}`,
          message: [
            applicantCity ? `City / Base of Operations: ${applicantCity}` : null,
            applicantOrg ? `Organization Name: ${applicantOrg}` : null,
            applicantMessage ? `Collaboration Details: ${applicantMessage}` : null,
          ]
            .filter(Boolean)
            .join('\n'),
          sourcePage: '/partners',
        },
        DEFAULT_DEALING_RECIPIENT
      );
      emailSuccess = emailResult?.success ?? false;
    } catch (mailErr: any) {
      console.warn('[Partner Application Email Warning]:', mailErr);
    }

    // Always log full lead securely on server
    console.log('[Partner Application Processed]:', {
      name: applicantName,
      phone: applicantPhone,
      email: applicantEmail,
      category: normalizedPartnerType,
      city: applicantCity,
      dbLogged: dbSuccess,
      emailSent: emailSuccess,
    });

    return NextResponse.json({
      success: true,
      id: dbRecordId || undefined,
      dbLogged: dbSuccess,
      emailDelivered: emailSuccess,
      message: 'Thank you! Your partnership application has been sent to our desk. We will call you within 2 business hours.',
    });
  } catch (err: any) {
    console.error('[Partner Application API Exception]', err);
    return NextResponse.json(
      { success: false, error: 'An unexpected error occurred while processing your application. Please try again.' },
      { status: 500 }
    );
  }
}

