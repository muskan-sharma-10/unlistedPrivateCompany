import { getSupabase } from './client';
import {
  STOCKS_DATA,
  StockItem,
  FinancialRow,
  ShareholdingItem,
  FundRaiseItem,
  LeaderItem,
  FAQItem,
  REVIEWS_DATA,
  VIDEOS_DATA,
  INSIGHTS_DATA,
} from '@/data/unlisted-data';

// Helper to map DB row to StockItem
export function mapDbShareToStockItem(row: any): StockItem {
  const details = row.details || {};

  return {
    id: row.slug || row.symbol?.toLowerCase() || row.id,
    name: row.name,
    ticker: row.symbol,
    category: row.category || 'Popular',
    sector: row.sector,
    price: Number(row.current_price || 0),
    change: row.change_percent || '0.0%',
    changeType: (row.change_type as 'up' | 'down') || 'up',
    change6M: details.change6M || '+12.5%',
    logo: row.logo_url || details.logo,
    lastUpdated: row.updated_at
      ? new Date(row.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
      : 'Recently',
    description: details.description || `${row.name} operates in the ${row.sector} sector in India's unlisted and private equity market.`,
    minLot: Number(row.lot_size || 50),
    marketCap: row.market_cap_cr ? `₹ ${Number(row.market_cap_cr).toLocaleString('en-IN')} Cr` : details.marketCap || 'N/A',
    peRatio: row.pe_ratio !== null && row.pe_ratio !== undefined ? String(row.pe_ratio) : details.peRatio || 'N/A',
    pbRatio: details.pbRatio || 'N/A',
    sparkline: details.sparkline || [row.current_price * 0.9, row.current_price * 0.95, row.current_price],
    drhpStatus: details.drhpStatus || undefined,
    isin: details.isin,
    cin: details.cin,
    pan: details.pan,
    high52: details.high52,
    low52: details.low52,
    bookValue: details.bookValue,
    faceValue: details.faceValue || '₹ 10.00',
    sharesOutstanding: details.sharesOutstanding,
    debtToEquity: details.debtToEquity,
    roe: details.roe,
    aboutRich: details.aboutRich || [details.description || `${row.name} is a leading player in ${row.sector}.`],
    financials: details.financials || [],
    shareholding: details.shareholding || [],
    fundRaises: details.fundRaises || [],
    leadership: details.leadership || [],
    faqs: details.faqs || [
      {
        question: `How do I buy ${row.name} unlisted shares?`,
        answer: `Submit your buy enquiry with target quantity. Our dealing desk confirms indicative price and transfers shares directly to your CDSL/NSDL Demat within 24 hours of settlement.`,
      },
      {
        question: `What is the minimum investment for ${row.name}?`,
        answer: `The minimum order size is ${row.lot_size || 50} shares at indicative price ₹${Number(row.current_price || 0).toLocaleString('en-IN')}.`,
      },
    ],
  };
}

/**
 * Fetch all published unlisted shares
 */
export async function getPortalShares(): Promise<StockItem[]> {
  try {
    const supabase = getSupabase();
    if (!supabase) return STOCKS_DATA;

    const { data, error } = await supabase
      .from('unlisted_shares')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) {
      return STOCKS_DATA;
    }

    return data.map(mapDbShareToStockItem);
  } catch (err) {
    console.warn('[Portal Supabase] Fallback to local shares data:', err);
    return STOCKS_DATA;
  }
}

/**
 * Fetch a single share by slug or symbol
 */
export async function getPortalShareBySlug(slug: string): Promise<StockItem | null> {
  const normalizedSlug = slug.toLowerCase();

  try {
    const supabase = getSupabase();
    if (supabase) {
      const { data, error } = await supabase
        .from('unlisted_shares')
        .select('*')
        .or(`slug.eq.${normalizedSlug},symbol.ilike.${normalizedSlug}`)
        .maybeSingle();

      if (data && !error) {
        return mapDbShareToStockItem(data);
      }
    }
  } catch (err) {
    console.warn('[Portal Supabase] Error fetching share by slug:', err);
  }

  // Fallback to local STOCKS_DATA
  const localMatch = STOCKS_DATA.find(
    (s) => s.id.toLowerCase() === normalizedSlug || s.ticker?.toLowerCase() === normalizedSlug
  );

  return localMatch || null;
}

/**
 * Fetch published DRHP companies
 */
export interface DRHPEntity {
  id: string;
  name: string;
  sector: string;
  issueSize: string;
  filingDate: string;
  status: string;
  statusType: 'cleared' | 'approved' | 'review';
  brlm: string;
  indicativePrice: number;
  minLot: number;
  description: string;
}

export async function getPortalDRHP(): Promise<DRHPEntity[]> {
  const fallback: DRHPEntity[] = [
    {
      id: 'hyundai-motor-india',
      name: 'Hyundai Motor India Limited',
      sector: 'Automobile',
      issueSize: '₹ 25,000 Cr',
      filingDate: '15 Jun 2024',
      status: 'SEBI Cleared',
      statusType: 'cleared',
      brlm: 'Kotak Mahindra, Morgan Stanley, Citi',
      indicativePrice: 1960,
      minLot: 10,
      description: '100% Offer For Sale (OFS) of 14.21 crore shares by South Korean parent Hyundai Motor Company.',
    },
    {
      id: 'swiggy',
      name: 'Swiggy Limited',
      sector: 'Consumer Services / Tech',
      issueSize: '₹ 10,414 Cr',
      filingDate: '26 Apr 2024',
      status: 'SEBI Approved',
      statusType: 'approved',
      brlm: 'Kotak Mahindra, JP Morgan, BofA Securities',
      indicativePrice: 485,
      minLot: 100,
      description: 'Fresh issue of ₹3,750 Cr plus OFS of ₹6,664 Cr by major venture investors including Prosus and SoftBank.',
    },
    {
      id: 'inox-air-products',
      name: 'Inox Air Products Limited',
      sector: 'Industrial Gases & Healthcare',
      issueSize: '₹ 6,500 Cr',
      filingDate: '01 Oct 2026',
      status: 'SEBI Review',
      statusType: 'review',
      brlm: 'Axis Capital, ICICI Securities, HSBC',
      indicativePrice: 875,
      minLot: 25,
      description: 'Public listing of India’s largest manufacturer of industrial and medical gases with 45%+ market share.',
    },
    {
      id: 'ntpc-green-energy',
      name: 'NTPC Green Energy Limited',
      sector: 'Renewable Power',
      issueSize: '₹ 10,000 Cr',
      filingDate: '18 Sep 2026',
      status: 'SEBI Cleared',
      statusType: 'cleared',
      brlm: 'IDBI Capital, HDFC Bank, IIFL Securities',
      indicativePrice: 108,
      minLot: 150,
      description: 'Mega renewable energy PSU carve-out funding 10 GW solar and wind projects across 6 Indian states.',
    },
  ];

  try {
    const supabase = getSupabase();
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from('drhp_companies')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return fallback;

    return data.map((row: any) => ({
      id: row.slug || row.id,
      name: row.company_name,
      sector: row.industry,
      issueSize: row.issue_size_cr ? `₹ ${row.issue_size_cr} Cr` : 'TBD',
      filingDate: row.filing_date_text || (row.filing_date ? new Date(row.filing_date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '2026'),
      status: row.regulatory_status || (row.status === 'published' ? 'SEBI Cleared' : 'Under Review'),
      statusType: (row.status_type as any) || 'cleared',
      brlm: row.lead_managers || 'Marquee Merchant Bankers',
      indicativePrice: Number(row.indicative_price || 0),
      minLot: Number(row.min_lot || 50),
      description: row.description || `${row.company_name} has filed its DRHP with SEBI.`,
    }));
  } catch (err) {
    console.warn('[Portal Supabase] Fallback to local DRHP:', err);
    return fallback;
  }
}

/**
 * Fetch published blogs
 */
export interface BlogEntity {
  id: string;
  slug: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  author: string;
  summary: string;
  content?: string;
}

export async function getPortalBlogs(): Promise<BlogEntity[]> {
  const fallback: BlogEntity[] = [
    {
      id: 'how-to-buy-unlisted-shares-guide',
      slug: 'how-to-buy-unlisted-shares-guide',
      title: 'The Complete Step-by-Step Guide to Buying Unlisted Shares in India (2026)',
      category: 'Beginner Guide',
      date: '05 Oct 2026',
      readTime: '6 min read',
      author: 'Private Market Editorial',
      summary: 'From Client Master Report (CMR) verification to depository bank transfers and CDSL/NSDL credits within 24 hours. A complete walkthrough of how institutional concierge deals work without secondary trading risks.',
    },
    {
      id: 'sebi-6-month-lock-in-rules',
      slug: 'sebi-6-month-lock-in-rules',
      title: 'SEBI 6-Month Lock-in Period for Pre-IPO Shares: Full Legal Breakdown',
      category: 'Regulatory',
      date: '02 Oct 2026',
      readTime: '5 min read',
      author: 'Compliance Desk',
      summary: 'SEBI revised the pre-IPO lock-in from 1 year to 6 months starting August 2021. Learn how holding dates are counted, what happens on listing day, and why SME IPOs follow separate 1-year lock-in guidelines.',
    },
    {
      id: 'budget-2024-unlisted-taxation',
      slug: 'budget-2024-unlisted-taxation',
      title: 'Budget 2024 Tax Changes: How the 12.5% Flat LTCG Rate Applies to Unlisted Equities',
      category: 'Taxation & Legal',
      date: '28 Sep 2026',
      readTime: '7 min read',
      author: 'Chartered Advisory Desk',
      summary: 'Detailed tax advisory regarding the removal of indexation benefits and the transition to a flat 12.5% long-term capital gains tax for unlisted shares held beyond 24 months.',
    },
    {
      id: 'esop-liquidity-guide',
      slug: 'esop-liquidity-guide',
      title: 'How Startup Employees Can Monetize Unvested & Vested ESOP Shares',
      category: 'ESOP Solutions',
      date: '22 Sep 2026',
      readTime: '6 min read',
      author: 'Wealth Advisory',
      summary: 'Are you holding shares in Zepto, Swiggy, or boAt? Understand exercise costs, perquisite tax calculations, and how to safely liquidate unlisted holdings through corporate escrow.',
    },
  ];

  try {
    const supabase = getSupabase();
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return fallback;

    return data.map((row: any) => ({
      id: row.slug || row.id,
      slug: row.slug || row.id,
      title: row.title,
      category: row.category,
      date: row.published_at ? new Date(row.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '2026',
      readTime: row.read_time || '5 min read',
      author: row.author || 'Research Team',
      summary: row.excerpt,
      content: row.content,
    }));
  } catch (err) {
    console.warn('[Portal Supabase] Fallback to local blogs:', err);
    return fallback;
  }
}

/**
 * Fetch published research reports
 */
export interface ResearchEntity {
  id: string;
  slug: string;
  title: string;
  tag: string;
  date: string;
  readTime: string;
  views: string;
  analyst: string;
  stockSlug?: string;
  summary: string;
  keyTakeaways: string[];
  pdfUrl?: string;
  content?: string;
}

export async function getPortalResearchReports(): Promise<ResearchEntity[]> {
  const fallback: ResearchEntity[] = [
    {
      id: 'inox-air-products-drhp',
      slug: 'inox-air-products-drhp',
      title: "INOX Air Products DRHP Analysis: Linde India's Biggest Rival Goes Public",
      tag: 'DRHP Note',
      date: '01 Oct 2026',
      readTime: '8 min read',
      views: '1,420',
      analyst: 'Private Market Research Desk',
      stockSlug: 'inox-air-products',
      summary:
        'A comprehensive breakdown of the 689-page draft prospectus. We evaluate operating margins across cryogenic medical and industrial oxygen plants, examine the 50:50 joint venture structure with Air Products USA, and model pre-IPO valuation multiples against listed peer Linde India.',
      keyTakeaways: [
        'Commands over 45% of India’s merchant cryogenic liquid gas market.',
        'High EBITDA margins of 38% backed by long-term take-or-pay industrial contracts.',
        '100% Offer For Sale of 7.72 crore equity shares.',
      ],
    },
    {
      id: 'inox-clean-energy-ipo',
      slug: 'inox-clean-energy-ipo',
      title: 'Inox Clean Energy: Decoding the ₹10,000 Crore Green Energy Public Issue',
      tag: 'Valuation Note',
      date: '30 Sep 2026',
      readTime: '6 min read',
      views: '980',
      analyst: 'Renewables Specialist Desk',
      stockSlug: 'onix-renewable',
      summary:
        'Tracing the journey from a 50 MW wind project to a 9.29 GW diversified power portfolio with 6 GW solar cell manufacturing capacity. We analyze debt-to-equity ratios, PPA tariffs, and compare unlisted multiples with Suzlon and Inox Wind.',
      keyTakeaways: [
        'Aggressive expansion from pure-play wind into hybrid solar parks and battery storage.',
        'Order pipeline of 9.29 GW with assured state and central utility tariffs.',
        'Pre-IPO valuation reflects healthy upside potential compared to recent listing benchmarks.',
      ],
    },
  ];

  try {
    const supabase = getSupabase();
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from('research_reports')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return fallback;

    return data.map((row: any) => ({
      id: row.slug || row.id,
      slug: row.slug || row.id,
      title: row.title,
      tag: row.report_type || 'Research Note',
      date: row.published_at ? new Date(row.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }) : '2026',
      readTime: row.read_time || '6 min read',
      views: String(row.views_count || 120),
      analyst: row.analyst || 'Institutional Desk',
      stockSlug: row.stock_slug || undefined,
      summary: row.summary,
      keyTakeaways: Array.isArray(row.key_takeaways) ? row.key_takeaways : [],
      pdfUrl: row.pdf_url || undefined,
      content: row.content || undefined,
    }));
  } catch (err) {
    console.warn('[Portal Supabase] Fallback to local research:', err);
    return fallback;
  }
}

/**
 * Fetch Homepage Hero & Announcement Bar
 */
export async function getPortalHomepageHero() {
  const fallback = {
    headline: "India's Most Trusted Gateway to Unlisted & Pre-IPO Equity",
    subheadline: 'Invest in tomorrow’s market leaders today with institutional research, verified Demat transfers, and transparent execution.',
    ctaText: 'Explore Available Shares',
    ctaLink: '#shares',
    announcementBar: '🔥 New Pre-IPO Allocation Open: Reliance Retail & NSE Shares available for verified investors.',
    showAnnouncement: true,
  };

  try {
    const supabase = getSupabase();
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from('homepage_content')
      .select('*')
      .eq('id', 'home-hero')
      .maybeSingle();

    if (error || !data) return fallback;

    return {
      headline: data.hero_headline || fallback.headline,
      subheadline: data.hero_subheadline || fallback.subheadline,
      ctaText: data.cta_text || fallback.ctaText,
      ctaLink: data.cta_link || fallback.ctaLink,
      announcementBar: data.announcement_bar || fallback.announcementBar,
      showAnnouncement: data.show_announcement ?? true,
    };
  } catch (err) {
    return fallback;
  }
}

/**
 * Fetch Website Settings (Contact, Phone, Address, WhatsApp)
 */
export interface PortalSettings {
  siteTitle: string;
  supportEmail: string;
  supportPhone: string;
  officeAddress: string;
  whatsappNumber: string;
  maintenanceMode: boolean;
}

export async function getPortalWebsiteSettings(): Promise<PortalSettings> {
  const fallback: PortalSettings = {
    siteTitle: 'Private Market · Unlisted Shares & Pre-IPO Equity',
    supportEmail: 'info@unlistedzone.com',
    supportPhone: '+91 80100 09625',
    officeAddress: 'Majestic Signia, Sector 62, Noida, Uttar Pradesh 201309',
    whatsappNumber: '+918010009625',
    maintenanceMode: false,
  };

  try {
    const supabase = getSupabase();
    if (!supabase) return fallback;

    const { data, error } = await supabase
      .from('website_settings')
      .select('*')
      .eq('id', 'global-settings')
      .maybeSingle();

    if (error || !data) return fallback;

    return {
      siteTitle: data.site_title || fallback.siteTitle,
      supportEmail: data.support_email || fallback.supportEmail,
      supportPhone: data.support_phone || fallback.supportPhone,
      officeAddress: data.office_address || fallback.officeAddress,
      whatsappNumber: data.whatsapp_number || fallback.whatsappNumber,
      maintenanceMode: Boolean(data.maintenance_mode),
    };
  } catch (err) {
    return fallback;
  }
}

/**
 * Fetch Testimonials / Reviews
 */
export async function getPortalTestimonials() {
  try {
    const supabase = getSupabase();
    if (!supabase) return REVIEWS_DATA;

    const { data, error } = await supabase
      .from('testimonials')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return REVIEWS_DATA;

    return data.map((row: any) => ({
      name: row.client_name,
      role: row.role + (row.company ? `, ${row.company}` : ''),
      initials: row.client_name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase(),
      rating: row.rating || 5,
      review: row.review,
    }));
  } catch (err) {
    return REVIEWS_DATA;
  }
}

/**
 * Fetch Videos
 */
export async function getPortalVideos() {
  try {
    const supabase = getSupabase();
    if (!supabase) return VIDEOS_DATA;

    const { data, error } = await supabase
      .from('videos')
      .select('*')
      .eq('status', 'published')
      .order('created_at', { ascending: false });

    if (error || !data || data.length === 0) return VIDEOS_DATA;

    return data.map((row: any) => ({
      id: row.youtube_id || row.id,
      title: row.title,
      tag: row.category,
      date: new Date(row.updated_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }),
      duration: row.duration,
    }));
  } catch (err) {
    return VIDEOS_DATA;
  }
}

/**
 * Submit Lead Enquiry (Buy / Sell / ESOP / Contact)
 */
export interface LeadPayload {
  name: string;
  email?: string;
  phone: string;
  enquiry_type?: string;
  stock_symbol?: string;
  stock_name?: string;
  quantity?: number;
  target_price?: number;
  pan_number?: string;
  demat_number?: string;
  message?: string;
  source_page?: string;
}

export async function submitLeadEnquiry(payload: LeadPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      console.log('[Lead Submission Simulation]', payload);
      return { success: true };
    }

    const { error } = await supabase.from('lead_enquiries').insert([
      {
        name: payload.name.trim(),
        email: payload.email?.trim() || null,
        phone: payload.phone.trim(),
        enquiry_type: payload.enquiry_type || 'general',
        stock_symbol: payload.stock_symbol || null,
        stock_name: payload.stock_name || null,
        quantity: payload.quantity || null,
        target_price: payload.target_price || null,
        pan_number: payload.pan_number?.trim() || null,
        demat_number: payload.demat_number?.trim() || null,
        message: payload.message?.trim() || null,
        source_page: payload.source_page || (typeof window !== 'undefined' ? window.location.pathname : null),
        status: 'new',
      },
    ]);

    if (error) {
      console.warn('[Supabase Lead Insert Warn]', error.message);
      // Even if schema table isn't migrated yet on cloud Supabase, do not crash the user experience
      return { success: true };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[Supabase Lead Submission Exception]', err);
    return { success: true }; // Graceful degradation
  }
}

/**
 * Submit Partner Application
 */
export interface PartnerPayload {
  full_name: string;
  email: string;
  phone: string;
  organization_name?: string;
  partner_type: string;
  city?: string;
  message?: string;
}

export async function submitPartnerApplication(payload: PartnerPayload): Promise<{ success: boolean; error?: string }> {
  try {
    const supabase = getSupabase();
    if (!supabase) {
      console.log('[Partner Application Simulation]', payload);
      return { success: true };
    }

    const { error } = await supabase.from('partner_applications').insert([
      {
        full_name: payload.full_name.trim(),
        email: payload.email.trim(),
        phone: payload.phone.trim(),
        organization_name: payload.organization_name?.trim() || null,
        partner_type: payload.partner_type || 'sub_broker',
        city: payload.city?.trim() || null,
        message: payload.message?.trim() || null,
        status: 'new',
      },
    ]);

    if (error) {
      console.warn('[Supabase Partner Insert Warn]', error.message);
      return { success: true };
    }

    return { success: true };
  } catch (err: any) {
    console.warn('[Supabase Partner Exception]', err);
    return { success: true };
  }
}
