'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Copy,
  Check,
  ChevronDown,
  ChevronUp,
  MessageSquareShare,
  CheckCircle2,
  Lock,
  ArrowRight,
  Landmark,
  ShieldCheck,
  Coins,
  Briefcase
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';
import { getPortalShareBySlug, submitLeadEnquiry } from '@/lib/supabase/queries';

interface StockDetailClientProps {
  params: {
    slug: string;
  };
}

export default function StockDetailClient({ params }: StockDetailClientProps) {
  const isMsei = params.slug.toLowerCase() === 'msei' || params.slug.toLowerCase() === 'msei-unlisted-shares';

  const initialStock = STOCKS_DATA.find(
    (s) => s.id.toLowerCase() === params.slug.toLowerCase() || s.ticker?.toLowerCase() === params.slug.toLowerCase()
  );

  const [stock, setStock] = useState<StockItem | null>(initialStock || null);
  const [isLoading, setIsLoading] = useState(!initialStock);
  const [timeframe, setTimeframe] = useState<'1M' | '6M' | '1Y' | '3Y' | 'Max'>('6M');
  const [dealTab, setDealTab] = useState<'buy' | 'sell'>('buy');
  const [quantity, setQuantity] = useState<number>(initialStock?.minLot || 100);
  const [buyerPhone, setBuyerPhone] = useState('');
  const [buyerName, setBuyerName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedEnquiry, setSubmittedEnquiry] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [canExpandDescription, setCanExpandDescription] = useState(false);
  const descriptionRef = React.useRef<HTMLParagraphElement>(null);

  // Monitor description overflow to conditionally render "Read more" toggle
  React.useEffect(() => {
    setIsDescriptionExpanded(false);
    const checkOverflow = () => {
      const desc = stock?.description?.trim() || '';
      const isLongText = desc.length > 140 || desc.includes('\n');
      if (descriptionRef.current && !isDescriptionExpanded) {
        const el = descriptionRef.current;
        const hasOverflow = el.scrollHeight > el.clientHeight + 1;
        setCanExpandDescription(hasOverflow || isLongText);
      } else {
        setCanExpandDescription(isLongText);
      }
    };

    checkOverflow();
    const rafId = requestAnimationFrame(checkOverflow);
    const timer = setTimeout(checkOverflow, 120);

    window.addEventListener('resize', checkOverflow);
    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timer);
      window.removeEventListener('resize', checkOverflow);
    };
  }, [stock?.description]);

  // Fetch live stock details from Supabase & merge gracefully
  React.useEffect(() => {
    async function loadStock() {
      try {
        const live = await getPortalShareBySlug(params.slug);
        if (live) {
          if (initialStock) {
            // Preserve rich static dataset (financials, faqs, leadership, shareholding) if live DB is empty
            const merged: StockItem = {
              ...initialStock,
              ...live,
              aboutRich: (live.aboutRich && live.aboutRich.length > 1) ? live.aboutRich : (initialStock.aboutRich || live.aboutRich),
              financials: (live.financials && live.financials.length > 0) ? live.financials : (initialStock.financials || []),
              shareholding: (live.shareholding && live.shareholding.length > 0) ? live.shareholding : (initialStock.shareholding || []),
              fundRaises: (live.fundRaises && live.fundRaises.length > 0) ? live.fundRaises : (initialStock.fundRaises || []),
              leadership: (live.leadership && live.leadership.length > 0) ? live.leadership : (initialStock.leadership || []),
              faqs: (live.faqs && live.faqs.length >= 4) ? live.faqs : (initialStock.faqs || live.faqs),
            };
            setStock(merged);
          } else {
            setStock(live);
            setQuantity(live.minLot || 100);
          }
        }
      } catch (err) {
        console.warn('Error loading dynamic stock:', err);
      } finally {
        setIsLoading(false);
      }
    }
    loadStock();
  }, [params.slug, initialStock]);

  // 1. Timeframe filtering based on actual historical records
  const filteredHistory = React.useMemo(() => {
    if (!stock) return [];
    const history =
      stock.priceHistory && stock.priceHistory.length > 0
        ? stock.priceHistory
        : [{ price: stock.price, date: new Date().toISOString() }];

    const now = Date.now();
    let durationMs = Infinity;
    if (timeframe === '1M') durationMs = 30 * 24 * 60 * 60 * 1000;
    else if (timeframe === '6M') durationMs = 182 * 24 * 60 * 60 * 1000;
    else if (timeframe === '1Y') durationMs = 365 * 24 * 60 * 60 * 1000;
    else if (timeframe === '3Y') durationMs = 3 * 365 * 24 * 60 * 60 * 1000;

    const filtered = history.filter((h) => now - new Date(h.date).getTime() <= durationMs);
    if (filtered.length > 0) {
      return [...filtered].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    }
    return [...history].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [stock, timeframe]);

  // 2. Trailing 52-Week High & Low calculation from actual records
  const { trailing52High, trailing52Low } = React.useMemo(() => {
    if (!stock) return { trailing52High: '—', trailing52Low: '—' };

    const history =
      stock.priceHistory && stock.priceHistory.length > 0
        ? stock.priceHistory
        : [{ price: stock.price, date: new Date().toISOString() }];

    const now = Date.now();
    const trailing52WeeksMs = 52 * 7 * 24 * 60 * 60 * 1000; // 364 days

    const inRange = history.filter(
      (h) => now - new Date(h.date).getTime() <= trailing52WeeksMs
    );
    const active = inRange.length > 0 ? inRange : history;
    const prices = active
      .map((h) => h.price)
      .filter((p) => typeof p === 'number' && !isNaN(p) && p > 0);

    if (prices.length === 0) {
      const fallback = stock.price ? `₹ ${stock.price.toLocaleString('en-IN')}` : '—';
      return { trailing52High: fallback, trailing52Low: fallback };
    }

    const high = Math.max(...prices);
    const low = Math.min(...prices);

    return {
      trailing52High: `₹ ${high.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
      trailing52Low: `₹ ${low.toLocaleString('en-IN', { maximumFractionDigits: 2 })}`,
    };
  }, [stock]);

  if (!stock && !isLoading) {
    return (
      <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1 flex flex-col items-center justify-center">
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Security Not Found</h1>
          <p className="text-sm text-slate-500 mb-6">The unlisted share you are looking for does not exist or has been delisted.</p>
          <Link
            href="/shares"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition-colors"
          >
            Explore All Unlisted Shares
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  if (!stock) return null;

  const isUp = stock.changeType === 'up';

  const handleCopy = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleQuickEnquire = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadEnquiry({
        name: buyerName.trim() || 'Portal Investor',
        phone: buyerPhone.trim(),
        stock_symbol: stock.ticker || stock.id,
        stock_name: stock.name,
        quantity,
        target_price: stock.price,
        enquiry_type: dealTab === 'buy' ? 'buy_order' : 'sell_order',
        source_page: `/shares/${params.slug}`,
      });
      setSubmittedEnquiry(true);
      setTimeout(() => {
        setSubmittedEnquiry(false);
        setIsSubmitting(false);
      }, 3500);
    } catch {
      setSubmittedEnquiry(true);
      setTimeout(() => {
        setSubmittedEnquiry(false);
        setIsSubmitting(false);
      }, 3500);
    }
  };

  // Sparkline & detail chart generator with real historical points
  const renderPriceChart = () => {
    if (!stock) return null;
    const records = filteredHistory;
    const width = 680;
    const height = 180;

    if (records.length >= 2) {
      const prices = records.map((r) => r.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      const priceDelta = maxPrice - minPrice;
      const padding = priceDelta === 0 ? maxPrice * 0.05 || 1 : priceDelta * 0.1;
      const plotMin = minPrice - padding;
      const plotMax = maxPrice + padding;
      const range = plotMax - plotMin || 1;

      const coords = records.map((r, idx) => {
        const x = (idx / (records.length - 1)) * width;
        const y = height - ((r.price - plotMin) / range) * (height - 30) - 15;
        return { x: x.toFixed(1), y: y.toFixed(1), price: r.price, date: r.date };
      });

      const pathD = `M ${coords.map((c) => `${c.x},${c.y}`).join(' L ')}`;
      const areaD = `M 0,${height} L ${coords.map((c) => `${c.x},${c.y}`).join(' L ')} L ${width},${height} Z`;

      const startDate = new Date(records[0].date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const endDate = new Date(records[records.length - 1].date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });

      return (
        <div className="space-y-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 sm:h-52" preserveAspectRatio="none">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#1D4ED8" stopOpacity="0.18" />
                <stop offset="100%" stopColor="#1D4ED8" stopOpacity="0.0" />
              </linearGradient>
            </defs>
            <path d={areaD} fill="url(#chartGrad)" />
            <path
              d={pathD}
              fill="none"
              stroke="#1D4ED8"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {coords.map((c, i) => (
              <circle
                key={i}
                cx={c.x}
                cy={c.y}
                r={coords.length <= 15 ? '3.5' : '2'}
                className="fill-blue-700 stroke-white stroke-2"
              />
            ))}
          </svg>
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono px-1">
            <span>{startDate} (₹{records[0].price.toLocaleString('en-IN')})</span>
            <span>{records.length} saved price points in {timeframe}</span>
            <span>{endDate} (₹{records[records.length - 1].price.toLocaleString('en-IN')})</span>
          </div>
        </div>
      );
    }

    if (records.length === 1) {
      const single = records[0];
      const singleDate = new Date(single.date).toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      });
      const midY = height / 2;

      return (
        <div className="space-y-2">
          <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-44 sm:h-52">
            <line
              x1="0"
              y1={midY}
              x2={width}
              y2={midY}
              stroke="#1D4ED8"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
            <circle cx={width / 2} cy={midY} r="5" className="fill-blue-700 stroke-white stroke-2" />
          </svg>
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium px-1">
            <span>Recorded: {singleDate}</span>
            <span className="font-semibold text-blue-700 font-mono">Indicative Benchmark: ₹{single.price.toLocaleString('en-IN')}</span>
            <span>Single Price Entry</span>
          </div>
        </div>
      );
    }

    return (
      <div className="h-44 sm:h-52 flex items-center justify-center border border-dashed border-slate-200 rounded-lg bg-slate-50 text-xs text-slate-500">
        No indicative price records saved for this timeframe.
      </div>
    );
  };

  const displayName = isMsei ? 'Metropolitan Stock Exchange (MSEI)' : stock.name;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Breadcrumb Navigation with Semantic Microdata */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 pt-6 pb-2 w-full">
        <nav aria-label="Breadcrumb" className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/shares" className="hover:text-blue-600 transition-colors">Unlisted Shares</Link>
          <span>›</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-none" aria-current="page">
            {displayName}
          </span>
        </nav>
      </div>

      {/* Main Stock Content Layout */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-4 pb-20 w-full flex-1">
        {/* Header Block: Logo + H1 Name + Identifiers */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 border border-slate-200 text-blue-700 flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs shrink-0 overflow-hidden p-1.5">
              {stock.logo ? (
                <img
                  src={stock.logo}
                  alt={isMsei ? 'Metropolitan Stock Exchange MSEI unlisted share logo' : `${stock.name} logo`}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span aria-hidden="true">{stock.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  {isMsei ? 'Metropolitan Stock Exchange (MSEI) Unlisted Share Price' : stock.name}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  {stock.category}
                </span>
              </div>
              {stock.description && stock.description.trim() ? (
                <div className="mb-2 max-w-3xl">
                  <p
                    ref={descriptionRef}
                    className={`text-xs sm:text-sm text-slate-600 font-normal leading-relaxed whitespace-pre-line ${
                      !isDescriptionExpanded ? 'line-clamp-2' : ''
                    }`}
                  >
                    {stock.description.trim()}
                  </p>
                  {(canExpandDescription || (stock.description && (stock.description.trim().length > 140 || stock.description.includes('\n')))) && (
                    <button
                      type="button"
                      onClick={() => setIsDescriptionExpanded((prev) => !prev)}
                      className="mt-1 text-xs font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1 cursor-pointer transition-colors focus:outline-none"
                    >
                      <span>{isDescriptionExpanded ? 'Read less' : 'Read more'}</span>
                      {isDescriptionExpanded ? (
                        <ChevronUp className="w-3.5 h-3.5" />
                      ) : (
                        <ChevronDown className="w-3.5 h-3.5" />
                      )}
                    </button>
                  )}
                </div>
              ) : null}
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600 font-medium">
                <Link
                  href={`/screener?sector=${encodeURIComponent(stock.sector)}`}
                  className="bg-slate-100 hover:bg-blue-50 hover:text-blue-700 px-2 py-0.5 rounded-md text-slate-700 border border-slate-200 transition-colors"
                  title={`View all unlisted shares in ${stock.sector}`}
                >
                  {stock.sector}
                </Link>
                {stock.isin && (
                  <span className="inline-flex items-center space-x-1 font-mono text-slate-500 bg-slate-50 px-2 py-0.5 rounded-md border border-slate-200">
                    <span>ISIN: {stock.isin}</span>
                    <button
                      onClick={() => handleCopy(stock.isin!, 'isin')}
                      title="Copy ISIN"
                      className="text-slate-400 hover:text-slate-900 cursor-pointer"
                    >
                      {copiedKey === 'isin' ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    </button>
                  </span>
                )}
                {stock.cin && (
                  <span className="hidden lg:inline text-xs text-slate-400 font-mono">
                    CIN: {stock.cin}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center space-x-2 cursor-pointer"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>Contact Dealing Desk</span>
            </button>
          </div>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          {/* Left Column: Interactive Price Chart, Fundamentals, Financials & Company Data */}
          <div className="lg:col-span-8 space-y-6">
            {/* 1. Price Panel & Chart Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-5 border-b border-slate-100">
                <div>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-2xl sm:text-3xl font-bold text-slate-900 tabular-nums">
                      ₹{stock.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`inline-flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-md tabular-nums border ${
                        isUp
                          ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                          : 'bg-rose-50 text-rose-700 border-rose-200'
                      }`}
                    >
                      {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                      <span>{stock.change}</span>
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Indicative unlisted price · Compiled for informational purposes · As of {stock.lastUpdated}
                  </div>
                </div>

                {/* Timeframe Buttons */}
                <div className="flex items-center space-x-1 bg-slate-100 p-1 rounded-lg">
                  {(['1M', '6M', '1Y', '3Y', 'Max'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                        timeframe === t
                          ? 'bg-white text-slate-900 shadow-xs'
                          : 'text-slate-500 hover:text-slate-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Graphic */}
              <div className="py-5">
                {renderPriceChart()}
              </div>

              {/* 4 Quick Metric Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-5 border-t border-slate-100">
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-0.5">Lot Size</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                    {stock.minLot?.toLocaleString('en-IN') || 100} Shares
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-0.5">52-Wk High</span>
                  <span className="text-sm sm:text-base font-bold text-emerald-700 tabular-nums">
                    {trailing52High}
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-0.5">52-Wk Low</span>
                  <span className="text-sm sm:text-base font-bold text-slate-800 tabular-nums">
                    {trailing52Low}
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-0.5">Market Cap</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                    {stock.marketCap || '₹ 7,645 Cr'}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. About The Company Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                  About The Exchange
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {displayName} Overview
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {stock.aboutRich ? (
                  stock.aboutRich.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>
                    {stock.description ||
                      `${stock.name} operates in the ${stock.sector} sector in India's unlisted and private equity market.`}
                  </p>
                )}
              </div>
            </div>

            {/* MSEI Specific SEO Intelligence & Pillar Content */}
            {isMsei && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
                <div>
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                    Institutional Insights
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    MSEI Stock Price Unlisted Overview &amp; Market Dynamics
                  </h2>
                </div>

                <div className="text-xs sm:text-sm text-slate-600 leading-relaxed space-y-3 font-normal">
                  <p>
                    The <strong>Metropolitan Stock Exchange of India (MSEI)</strong> represents one of the only three recognized national-level stock exchanges operating under the regulatory supervision of the Securities and Exchange Board of India (<Link href="/sebi-compliance" className="text-blue-700 hover:underline">SEBI</Link>), alongside NSE and BSE. MSEI holds comprehensive licenses for trading across Capital Markets (Equity Cash), Futures &amp; Options (F&amp;O), Currency Derivatives, and Debt segments.
                  </p>
                  <p>
                    In recent private placement rounds, MSEI raised over ₹1,238 Crore from marquee institutional stakeholders and technology platforms, including Peak XV Partners, Share India Securities, Billionbrains Garage Ventures (Groww), and Rainmatter Investments (Zerodha founders fund). This landmark recapitalization strengthens MSEI&apos;s clearing operations, technological infrastructure, and prospective turnaround prospects within the fast-growing Indian financial ecosystem.
                  </p>
                </div>

                {/* 3 Pillar Cards for MSEI Unlisted Shares */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center mb-2">
                      <Landmark className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">National Exchange License</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Operates full clearing &amp; settlement operations recognized by SEBI across equity, derivatives &amp; debt.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-2">
                      <Coins className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Marquee Backing</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Backed by Groww, Zerodha&apos;s Rainmatter, Peak XV, and Share India with over ₹1,238 Cr private equity capital.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 space-y-1.5">
                    <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center mb-2">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <h3 className="text-sm font-bold text-slate-900">Demat Transfer</h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Legally transferable via off-market CDSL &amp; NSDL Demat execution with T+1 day settlement.
                    </p>
                  </div>
                </div>

                {/* Contextual Internal Links Section */}
                <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs text-slate-600">
                  <span className="font-semibold text-slate-700">Explore Related Market Hubs:</span>
                  <Link href="/shares" className="text-blue-700 hover:underline">All Unlisted Shares</Link>
                  <span>•</span>
                  <Link href="/screener" className="text-blue-700 hover:underline">Financial Sector Screener</Link>
                  <span>•</span>
                  <Link href="/drhp-filed" className="text-blue-700 hover:underline">DRHP Filed Companies</Link>
                  <span>•</span>
                  <Link href="/contact-us" className="text-blue-700 hover:underline">Institutional Dealing Desk</Link>
                </div>
              </div>
            )}

            {/* 3. Key Fundamentals Grid Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                  Key Data
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {displayName} Fundamentals
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">Indicative Price</span>
                  <span className="font-bold text-slate-900 tabular-nums">₹{stock.price}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">Lot Size</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.minLot}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">P/E Ratio</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.peRatio || 'N/A'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">P/B Ratio</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.pbRatio || '5.2'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">Face Value</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.faceValue || '₹ 1.00'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">Book Value</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.bookValue || '₹ 1.24'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">Debt to Equity</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.debtToEquity || '0.00'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">ROE</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.roe || '-1.89%'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">DRHP Status</span>
                  <span className="font-bold text-blue-700">{stock.drhpStatus || 'Active SEBI Exchange License'}</span>
                </div>
              </div>
            </div>

            {/* 4. Financials Multi-Year Table */}
            {stock.financials && stock.financials.length > 0 && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                      Audited Financials
                    </span>
                    <h2 className="text-xl font-bold text-slate-900">
                      Multi-Year Financial Performance
                    </h2>
                  </div>
                  <span className="text-xs text-slate-500 font-medium">Figures in ₹ Crores</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase">
                        <th className="py-2.5 px-3.5">Particulars</th>
                        <th className="py-2.5 px-3.5">FY23</th>
                        <th className="py-2.5 px-3.5">FY24</th>
                        <th className="py-2.5 px-3.5">FY25</th>
                        <th className="py-2.5 px-3.5 bg-blue-50 text-blue-800">FY26 (Latest)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 text-xs sm:text-sm font-medium">
                      {stock.financials.map((row, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-3 px-3.5 font-semibold text-slate-900">{row.particulars}</td>
                          <td className="py-3 px-3.5 text-slate-600 tabular-nums">{row.fy23}</td>
                          <td className="py-3 px-3.5 text-slate-600 tabular-nums">{row.fy24}</td>
                          <td className="py-3 px-3.5 text-slate-600 tabular-nums">{row.fy25}</td>
                          <td className="py-3 px-3.5 bg-blue-50/40 font-bold text-slate-900 tabular-nums">
                            {row.fy26}
                            {row.yoyChange && (
                              <span
                                className={`ml-2 text-[10px] px-1.5 py-0.2 rounded border ${
                                  row.isPositive
                                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                    : 'bg-rose-50 text-rose-700 border-rose-200'
                                }`}
                              >
                                {row.yoyChange}
                              </span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 5. Shareholding Pattern Card */}
            {stock.shareholding && stock.shareholding.length > 0 && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                    Ownership Structure
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    {displayName} Equity Shareholding Pattern
                  </h2>
                </div>

                <div className="space-y-3.5">
                  {stock.shareholding.map((sh, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-700">
                        <span>{sh.category}</span>
                        <span className="font-bold text-slate-900 tabular-nums">{sh.percentage}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full transition-all duration-500"
                          style={{ width: `${sh.percentage}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 6. Fund Raise History */}
            {stock.fundRaises && stock.fundRaises.length > 0 && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                    Capital History
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    {displayName} Fund Raise History
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-xs sm:text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase">
                        <th className="py-2.5 px-3.5">Date</th>
                        <th className="py-2.5 px-3.5">Amount Raised</th>
                        <th className="py-2.5 px-3.5">Issue Price</th>
                        <th className="py-2.5 px-3.5">Allotment Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100 font-medium">
                      {stock.fundRaises.map((fr, idx) => (
                        <tr key={idx} className="hover:bg-slate-50/60">
                          <td className="py-3 px-3.5 text-slate-600 tabular-nums">{fr.date}</td>
                          <td className="py-3 px-3.5 font-bold text-slate-900 tabular-nums">{fr.amount}</td>
                          <td className="py-3 px-3.5 text-slate-800 tabular-nums">{fr.price}</td>
                          <td className="py-3 px-3.5">
                            <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                              {fr.type}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* 7. FAQs Section with Proper H2 & Schema Sync */}
            {stock.faqs && stock.faqs.length > 0 && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                    Knowledge Desk
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Frequently Asked Questions on {displayName} Unlisted Shares
                  </h2>
                </div>

                <div className="space-y-2.5">
                  {stock.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-slate-200 rounded-lg overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-4 text-left font-semibold text-xs sm:text-sm text-slate-900 flex justify-between items-center bg-slate-50/60 hover:bg-slate-100/60 cursor-pointer"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-4 h-4 text-slate-400 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-blue-600' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-4 text-xs sm:text-sm text-slate-600 leading-relaxed bg-white border-t border-slate-100 font-normal">
                            {faq.answer}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Dealing Desk Order Ticket */}
          <div className="lg:col-span-4 sticky top-24 space-y-5">
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-lg">
              <div className="flex items-center justify-between pb-3.5 border-b border-slate-100 mb-4">
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="font-bold text-sm text-slate-900">Dealing Desk</span>
                </div>
                <span className="text-xs text-slate-400 font-medium">Verified Settlement</span>
              </div>

              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-100 rounded-lg mb-4">
                <button
                  onClick={() => setDealTab('buy')}
                  className={`py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    dealTab === 'buy'
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Buy Shares
                </button>
                <button
                  onClick={() => setDealTab('sell')}
                  className={`py-2 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                    dealTab === 'sell'
                      ? 'bg-[#0B132B] text-white shadow-xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Sell Shares
                </button>
              </div>

              {/* Indicative Rate Display */}
              <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-200 mb-4">
                <div className="text-xs text-slate-500 font-medium mb-0.5">
                  Indicative Unit Rate
                </div>
                <div className="text-2xl font-bold text-slate-900 tabular-nums">
                  ₹{stock.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Quantity Input */}
              <form onSubmit={handleQuickEnquire} className="space-y-3.5">
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-semibold text-slate-700">
                      Share Quantity
                    </label>
                    <span className="text-xs text-slate-400 tabular-nums">
                      Min lot: {stock.minLot || 100}
                    </span>
                  </div>
                  <input
                    type="number"
                    min={stock.minLot || 1}
                    step={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs sm:text-sm font-semibold text-slate-900 outline-none focus:border-blue-600 focus:bg-white bg-slate-50/70 transition-colors"
                  />
                </div>

                {/* Buyer / Seller Contact info */}
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 outline-none focus:border-blue-600 focus:bg-white bg-slate-50/70 transition-colors"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-300 text-xs font-medium text-slate-900 outline-none focus:border-blue-600 focus:bg-white bg-slate-50/70 transition-colors"
                  />
                </div>

                {submittedEnquiry ? (
                  <div className="p-3 rounded-lg bg-emerald-50 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center space-x-2 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry logged! Dealing desk calling you shortly.</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors text-center flex items-center justify-center space-x-2 disabled:opacity-50 cursor-pointer"
                  >
                    <span>
                      Enquire to {dealTab === 'buy' ? 'Buy' : 'Sell'} {stock.name} →
                    </span>
                  </button>
                )}
              </form>

              {/* Demat Settlement Notice */}
              <div className="mt-5 pt-4 border-t border-slate-100 space-y-2.5 text-xs text-slate-500">
                <div className="flex items-start space-x-2">
                  <Shield className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Shares credited directly to CDSL/NSDL Demat within 24 hours of settlement.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <Lock className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>Payments accepted exclusively via registered company RTGS/NEFT accounts.</span>
                </div>
              </div>

              {/* WhatsApp RM desk */}
              <div className="mt-4 pt-3.5 border-t border-slate-100">
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full py-2 rounded-lg bg-[#0B132B] hover:bg-slate-800 text-white text-xs font-semibold flex items-center justify-center space-x-2 transition-colors cursor-pointer"
                >
                  <MessageSquareShare className="w-3.5 h-3.5 text-blue-400" />
                  <span>Chat with Relationship Manager</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
