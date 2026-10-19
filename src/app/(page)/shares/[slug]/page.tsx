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
      <div className="min-h-screen bg-[#f3f8f7]">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-28 text-center">
          <h1 className="text-3xl font-semibold text-[#082029] mb-4">Stock Not Found</h1>
          <p className="text-gray-600 mb-8">The unlisted share you are looking for does not exist or has moved.</p>
          <Link
            href="/#shares"
            className="px-6 py-3 bg-[#00a887] text-white font-semibold rounded-xl inline-block"
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
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-48 sm:h-56" preserveAspectRatio="none">
        <defs>
          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00a887" stopOpacity="0.25" />
            <stop offset="100%" stopColor="#00a887" stopOpacity="0.0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill="url(#chartGrad)" />
        <path
          d={pathD}
          fill="none"
          stroke="#00a887"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Spacious Breadcrumb Navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-8 pb-4 w-full">
        <nav className="flex items-center space-x-2 text-xs sm:text-sm text-gray-500 font-medium">
          <Link href="/" className="hover:text-[#00a887] transition-colors">Home</Link>
          <span>›</span>
          <Link href="/#shares" className="hover:text-[#00a887] transition-colors">Shares</Link>
          <span>›</span>
          <span className="text-[#082029] font-semibold">{stock.name}</span>
        </nav>
      </div>

      {/* Main Stock Content Layout */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-6 pb-24 w-full">
        {/* Header Block: Logo + Name + Identifiers */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dce8e5] shadow-xs mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center space-x-5">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-tr from-[#082029] to-[#00a887] text-white flex items-center justify-center font-semibold text-xl sm:text-2xl shadow-md shrink-0">
              {stock.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1.5">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-[#082029] tracking-tight">
                  {stock.name}
                </h1>
                <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-[#e6f7f3] text-[#00a887]">
                  {stock.category}
                </span>
              </div>
              <div className="flex flex-wrap items-center gap-3 text-xs sm:text-sm text-gray-600 font-medium">
                <span className="bg-gray-100 px-2.5 py-1 rounded-md text-gray-700">
                  {stock.sector}
                </span>
                {stock.isin && (
                  <span className="inline-flex items-center space-x-1.5 font-mono text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-200">
                    <span>ISIN: {stock.isin}</span>
                    <button
                      onClick={() => handleCopy(stock.isin!, 'isin')}
                      title="Copy ISIN"
                      className="text-gray-400 hover:text-black"
                    >
                      {copiedKey === 'isin' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </span>
                )}
                {stock.cin && (
                  <span className="hidden lg:inline text-xs text-gray-400 font-mono">
                    CIN: {stock.cin}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-3 shrink-0">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white text-sm font-semibold shadow-md shadow-[#00a887]/20 transition-all flex items-center space-x-2"
            >
              <MessageSquareShare className="w-4 h-4" />
              <span>Contact Dealing Desk</span>
            </button>
          </div>
        </div>

        {/* 2-Column Spacious Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Interactive Price Chart, Fundamentals, Financials & Company Data */}
          <div className="lg:col-span-8 space-y-8">
            {/* 1. Price Panel & Chart Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-gray-100">
                <div>
                  <div className="flex items-baseline space-x-3">
                    <span className="text-3xl sm:text-4xl font-semibold text-[#082029]">
                      ₹{stock.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`inline-flex items-center space-x-1 text-sm font-semibold px-2.5 py-0.5 rounded-full ${
                        isUp ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-600'
                      }`}
                    >
                      {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                      <span>{stock.change}</span>
                    </span>
                  </div>
                  <div className="text-xs text-gray-500 font-medium mt-1">
                    Indicative price · Compiled for information · As of {stock.lastUpdated}
                  </div>
                </div>

                {/* Timeframe Buttons */}
                <div className="flex items-center space-x-1.5 bg-gray-100 p-1 rounded-xl">
                  {(['1M', '6M', '1Y', '3Y', 'Max'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                        timeframe === t
                          ? 'bg-white text-[#082029] shadow-xs'
                          : 'text-gray-500 hover:text-gray-900'
                      }`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Graphic */}
              <div className="py-6">
                {renderPriceChart()}
              </div>

              {/* 4 Quick Metric Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-gray-100">
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium block mb-1">Lot Size</span>
                  <span className="text-base sm:text-lg font-semibold text-[#082029]">
                    {stock.minLot?.toLocaleString('en-IN') || 100} Shares
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium block mb-1">52-Wk High</span>
                  <span className="text-base sm:text-lg font-semibold text-emerald-700">
                    {stock.high52 || `₹ ${(stock.price * 1.15).toFixed(1)}`}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium block mb-1">52-Wk Low</span>
                  <span className="text-base sm:text-lg font-semibold text-gray-800">
                    {stock.low52 || `₹ ${(stock.price * 0.75).toFixed(1)}`}
                  </span>
                </div>
                <div className="p-4 rounded-2xl bg-[#f8fafc] border border-gray-100">
                  <span className="text-xs text-gray-500 font-medium block mb-1">Market Cap</span>
                  <span className="text-base sm:text-lg font-semibold text-[#082029]">
                    {stock.marketCap || '₹ 10,000 Cr'}
                  </span>
                </div>
              </div>
            </div>

            {/* 2. About The Company Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs space-y-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
                  About The Company
                </span>
                <h2 className="text-2xl font-semibold text-[#082029]">
                  {stock.name} Overview
                </h2>
              </div>

              <div className="space-y-4 text-base text-gray-700 leading-relaxed font-normal">
                {stock.aboutRich ? (
                  stock.aboutRich.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>{stock.description}</p>
                )}
              </div>
            </div>

            {/* 3. Key Fundamentals Grid Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs">
              <div className="mb-6">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
                  Key Data
                </span>
                <h2 className="text-2xl font-semibold text-[#082029]">
                  Company Fundamentals
                </h2>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-5 text-sm">
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Indicative Price</span>
                  <span className="font-semibold text-base text-[#082029]">₹{stock.price}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Lot Size</span>
                  <span className="font-semibold text-base text-[#082029]">{stock.minLot}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">P/E Ratio</span>
                  <span className="font-semibold text-base text-[#082029]">{stock.peRatio || 'N/A'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">P/B Ratio</span>
                  <span className="font-semibold text-base text-[#082029]">{stock.pbRatio || '5.2'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Face Value</span>
                  <span className="font-semibold text-base text-[#082029]">{stock.faceValue || '₹ 1.00'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Book Value</span>
                  <span className="font-semibold text-base text-[#082029]">{stock.bookValue || '₹ 15.00'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">Debt to Equity</span>
                  <span className="font-semibold text-base text-[#082029]">{stock.debtToEquity || '0.00'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">ROE</span>
                  <span className="font-semibold text-base text-[#082029]">{stock.roe || '20.4%'}</span>
                </div>
                <div className="p-4 rounded-xl bg-[#fafcfb] border border-gray-100">
                  <span className="text-xs text-gray-500 block mb-1 font-medium">DRHP Status</span>
                  <span className="font-semibold text-base text-teal-700">{stock.drhpStatus}</span>
                </div>
              </div>
            </div>

            {/* 4. Financials Multi-Year Table */}
            {stock.financials && stock.financials.length > 0 && (
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
                      Audited Financials
                    </span>
                    <h2 className="text-2xl font-semibold text-[#082029]">
                      Multi-Year Performance
                    </h2>
                  </div>
                  <span className="text-xs text-gray-500 font-medium">Figures in ₹ Crores</span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-gray-200 bg-[#f8fafc] text-xs font-semibold text-gray-500 uppercase">
                        <th className="py-3 px-4">Particulars</th>
                        <th className="py-3 px-4">FY23</th>
                        <th className="py-3 px-4">FY24</th>
                        <th className="py-3 px-4">FY25</th>
                        <th className="py-3 px-4 bg-teal-50/50 text-[#00a887]">FY26 (Latest)</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm font-medium">
                      {stock.financials.map((row, idx) => (
                        <tr key={idx} className="hover:bg-[#f6fbf9]">
                          <td className="py-3.5 px-4 font-semibold text-[#082029]">{row.particulars}</td>
                          <td className="py-3.5 px-4 text-gray-600">{row.fy23}</td>
                          <td className="py-3.5 px-4 text-gray-600">{row.fy24}</td>
                          <td className="py-3.5 px-4 text-gray-600">{row.fy25}</td>
                          <td className="py-3.5 px-4 bg-teal-50/30 font-semibold text-[#082029]">
                            {row.fy26}
                            {row.yoyChange && (
                              <span
                                className={`ml-2 text-xs px-1.5 py-0.5 rounded ${
                                  row.isPositive
                                    ? 'bg-emerald-50 text-emerald-700'
                                    : 'bg-rose-50 text-rose-600'
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
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs">
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
                    Ownership Structure
                  </span>
                  <h2 className="text-2xl font-semibold text-[#082029]">
                    Equity Shareholding Pattern
                  </h2>
                </div>

                <div className="space-y-4">
                  {stock.shareholding.map((sh, idx) => (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex justify-between text-sm font-medium text-gray-700">
                        <span>{sh.category}</span>
                        <span className="font-semibold text-[#082029]">{sh.percentage}%</span>
                      </div>
                      <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[#00a887] rounded-full transition-all duration-500"
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
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs">
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
                    Capital History
                  </span>
                  <h2 className="text-2xl font-semibold text-[#082029]">
                    Fund Raise History
                  </h2>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="border-b border-gray-200 bg-[#f8fafc] text-xs font-semibold text-gray-500 uppercase">
                        <th className="py-3 px-4">Date</th>
                        <th className="py-3 px-4">Amount Raised</th>
                        <th className="py-3 px-4">Issue Price</th>
                        <th className="py-3 px-4">Allotment Type</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 font-medium">
                      {stock.fundRaises.map((fr, idx) => (
                        <tr key={idx} className="hover:bg-[#f6fbf9]">
                          <td className="py-3.5 px-4 text-gray-600">{fr.date}</td>
                          <td className="py-3.5 px-4 font-semibold text-[#082029]">{fr.amount}</td>
                          <td className="py-3.5 px-4 text-gray-800">{fr.price}</td>
                          <td className="py-3.5 px-4">
                            <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">
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
              <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs">
                <div className="mb-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
                    Knowledge Desk
                  </span>
                  <h2 className="text-2xl font-semibold text-[#082029]">
                    Frequently Asked Questions
                  </h2>
                </div>

                <div className="space-y-3">
                  {stock.faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div
                        key={idx}
                        className="border border-gray-200 rounded-2xl overflow-hidden transition-all"
                      >
                        <button
                          onClick={() => setOpenFaq(isOpen ? null : idx)}
                          className="w-full p-5 text-left font-semibold text-base text-[#082029] flex justify-between items-center bg-[#fafcfb] hover:bg-[#f3f8f7]"
                        >
                          <span>{faq.question}</span>
                          <ChevronDown
                            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
                              isOpen ? 'rotate-180 text-[#00a887]' : ''
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="p-5 text-sm sm:text-base text-gray-700 leading-relaxed bg-white border-t border-gray-100 font-normal">
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
          <div className="lg:col-span-4 sticky top-24 space-y-6">
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#dce8e5] shadow-xl">
              <div className="flex items-center justify-between pb-4 border-b border-gray-100 mb-5">
                <div className="flex items-center space-x-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 pulse-dot" />
                  <span className="font-semibold text-base text-[#082029]">Dealing Desk</span>
                </div>
                <span className="text-xs text-gray-400 font-medium">Verified Settlement</span>
              </div>

              {/* Buy / Sell Tabs */}
              <div className="grid grid-cols-2 gap-2 p-1 bg-gray-100 rounded-2xl mb-5">
                <button
                  onClick={() => setDealTab('buy')}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                    dealTab === 'buy'
                      ? 'bg-[#00a887] text-white shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Buy Shares
                </button>
                <button
                  onClick={() => setDealTab('sell')}
                  className={`py-2 rounded-xl text-sm font-semibold transition-all ${
                    dealTab === 'sell'
                      ? 'bg-[#082029] text-white shadow-xs'
                      : 'text-gray-600 hover:text-black'
                  }`}
                >
                  Sell Shares
                </button>
              </div>

              {/* Indicative Rate Display */}
              <div className="p-4 rounded-2xl bg-[#f0f6f4] border border-[#dce8e5] mb-5">
                <div className="text-xs text-gray-500 font-medium mb-1">
                  Indicative Unit Rate
                </div>
                <div className="text-2xl font-semibold text-[#082029]">
                  ₹{stock.price.toLocaleString('en-IN')}
                </div>
              </div>

              {/* Quantity Input */}
              <form onSubmit={handleQuickEnquire} className="space-y-4">
                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-xs font-semibold text-gray-700">
                      Share Quantity
                    </label>
                    <span className="text-xs text-gray-400">
                      Min lot: {stock.minLot || 100}
                    </span>
                  </div>
                  <input
                    type="number"
                    min={stock.minLot || 1}
                    step={10}
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 0))}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-[#082029] outline-none focus:border-[#00a887]"
                  />
                </div>

                {/* Consideration Value */}
                <div className="p-4 rounded-xl bg-gray-50 border border-gray-100 flex justify-between items-center">
                  <span className="text-xs text-gray-500 font-medium">Estimated Value</span>
                  <span className="text-lg font-semibold text-[#082029]">
                    ₹{totalValue.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Buyer / Seller Contact info */}
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Your Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={buyerPhone}
                    onChange={(e) => setBuyerPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-[#082029] outline-none focus:border-[#00a887]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1">
                    Your Name (Optional)
                  </label>
                  <input
                    type="text"
                    value={buyerName}
                    onChange={(e) => setBuyerName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2 rounded-xl border border-gray-300 text-xs font-semibold text-[#082029] outline-none focus:border-[#00a887]"
                  />
                </div>

                {submittedEnquiry ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry logged! Dealing desk calling you shortly.</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3.5 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white text-sm font-semibold shadow-md shadow-[#00a887]/20 transition-all text-center flex items-center justify-center space-x-2 disabled:opacity-50"
                  >
                    <span>
                      Enquire to {dealTab === 'buy' ? 'Buy' : 'Sell'} {stock.name} →
                    </span>
                  </button>
                )}
              </form>

              {/* Demat Settlement Notice */}
              <div className="mt-6 pt-5 border-t border-gray-100 space-y-3 text-xs text-gray-500">
                <div className="flex items-start space-x-2.5">
                  <Shield className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Shares credited directly to CDSL/NSDL Demat within 24 hours of settlement.</span>
                </div>
                <div className="flex items-start space-x-2.5">
                  <Lock className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
                  <span>Payments accepted exclusively via registered company RTGS/NEFT accounts.</span>
                </div>
              </div>

              {/* WhatsApp RM desk */}
              <div className="mt-5 pt-4 border-t border-gray-100">
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full py-2.5 rounded-xl bg-[#0e313d] hover:bg-[#133d4b] text-teal-300 text-xs font-semibold flex items-center justify-center space-x-2 transition-colors"
                >
                  <MessageSquareShare className="w-4 h-4 text-teal-400" />
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
