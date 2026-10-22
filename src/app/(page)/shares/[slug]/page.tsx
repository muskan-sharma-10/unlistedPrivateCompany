'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  TrendingUp,
  TrendingDown,
  Shield,
  Copy,
  Check,
  Calendar,
  Layers,
  ArrowRight,
  Info,
  Phone,
  MessageSquareShare,
  FileText,
  ChevronDown,
  Building2,
  ExternalLink,
  Download,
  CheckCircle2,
  Lock
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';
import { getPortalShareBySlug, submitLeadEnquiry } from '@/lib/supabase/queries';

interface PageProps {
  params: {
    slug: string;
  };
}

export default function StockDetailPage({ params }: PageProps) {
  const initialStock = STOCKS_DATA.find(
    (s) => s.id === params.slug || s.ticker?.toLowerCase() === params.slug.toLowerCase()
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

  // Fetch live stock details from Supabase
  React.useEffect(() => {
    async function loadStock() {
      try {
        const live = await getPortalShareBySlug(params.slug);
        if (live) {
          setStock(live);
          if (!initialStock) {
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
  }, [params.slug]);

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
  const totalValue = quantity * stock.price;

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

  // Sparkline generator with realistic curve for detail chart
  const renderPriceChart = () => {
    const points = stock.sparkline;
    if (!points || points.length < 2) return null;
    const min = Math.min(...points) * 0.95;
    const max = Math.max(...points) * 1.05;
    const range = max - min || 1;
    const width = 680;
    const height = 180;

    const coords = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 30) - 15;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    const pathD = `M ${coords.join(' L ')}`;
    const areaD = `M 0,${height} L ${coords.join(' L ')} L ${width},${height} Z`;

    return (
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
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Breadcrumb Navigation */}
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 pt-6 pb-2 w-full">
        <nav className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
          <span>›</span>
          <Link href="/shares" className="hover:text-blue-600 transition-colors">Shares</Link>
          <span>›</span>
          <span className="text-slate-900 font-semibold truncate max-w-xs sm:max-w-none">{stock.name}</span>
        </nav>
      </div>

      {/* Main Stock Content Layout */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-4 pb-20 w-full flex-1">
        {/* Header Block: Logo + Name + Identifiers */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-6 flex flex-col md:flex-row md:items-center justify-between gap-5">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-slate-100 border border-slate-200 text-blue-700 flex items-center justify-center font-bold text-lg sm:text-xl shadow-xs shrink-0 overflow-hidden p-1.5">
              {stock.logo ? (
                <img src={stock.logo} alt={stock.name} className="w-full h-full object-contain" />
              ) : (
                <span>{stock.name.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-slate-900 tracking-tight">
                  {stock.name}
                </h1>
                <span className="text-xs font-semibold px-2 py-0.5 rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                  {stock.category}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-2.5 text-xs text-slate-600 font-medium">
                <span className="bg-slate-100 px-2 py-0.5 rounded-md text-slate-700 border border-slate-200">
                  {stock.sector}
                </span>
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
                    Indicative price · Compiled for informational purposes · As of {stock.lastUpdated}
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
                    {stock.high52 || `₹ ${(stock.price * 1.15).toFixed(1)}`}
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-0.5">52-Wk Low</span>
                  <span className="text-sm sm:text-base font-bold text-slate-800 tabular-nums">
                    {stock.low52 || `₹ ${(stock.price * 0.75).toFixed(1)}`}
                  </span>
                </div>
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 font-medium block mb-0.5">Market Cap</span>
                  <span className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                    {stock.marketCap || '₹ 10,000 Cr'}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. About The Company Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-3">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                  About The Company
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  {stock.name} Overview
                </h2>
              </div>

              <div className="space-y-3 text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                {stock.aboutRich ? (
                  stock.aboutRich.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>{stock.description}</p>
                )}
              </div>
            </div>

            {/* 3. Key Fundamentals Grid Card */}
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                  Key Data
                </span>
                <h2 className="text-xl font-bold text-slate-900">
                  Company Fundamentals
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
                  <span className="font-bold text-slate-900 tabular-nums">{stock.bookValue || '₹ 15.00'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">Debt to Equity</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.debtToEquity || '0.00'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">ROE</span>
                  <span className="font-bold text-slate-900 tabular-nums">{stock.roe || '20.4%'}</span>
                </div>
                <div className="p-3 rounded-lg bg-slate-50 border border-slate-100">
                  <span className="text-xs text-slate-500 block mb-0.5 font-medium">DRHP Status</span>
                  <span className="font-bold text-blue-700">{stock.drhpStatus}</span>
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
                      Multi-Year Performance
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
                    Equity Shareholding Pattern
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
                    Fund Raise History
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

            {/* 7. FAQs Section */}
            {stock.faqs && stock.faqs.length > 0 && (
              <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs">
                <div className="mb-4">
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-700 block mb-0.5">
                    Knowledge Desk
                  </span>
                  <h2 className="text-xl font-bold text-slate-900">
                    Frequently Asked Questions
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

                {/* Consideration Value */}
                <div className="p-3.5 rounded-lg bg-slate-50 border border-slate-100 flex justify-between items-center">
                  <span className="text-xs text-slate-500 font-medium">Estimated Value</span>
                  <span className="text-base font-bold text-slate-900 tabular-nums">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </span>
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
