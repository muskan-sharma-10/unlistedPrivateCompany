'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  TrendingUp,
  TrendingDown,
  Search,
  ArrowRight,
  Filter,
  ChevronRight,
  Sparkles,
  Info
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import { useSearchParams } from 'next/navigation';
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';
import { getPortalShares } from '@/lib/supabase/queries';

const getStockTimestamp = (stock: StockItem): number => {
  if (stock.updatedAt) {
    const t = new Date(stock.updatedAt).getTime();
    if (!isNaN(t)) return t;
  }
  if (stock.priceHistory && stock.priceHistory.length > 0) {
    const latest = stock.priceHistory[stock.priceHistory.length - 1];
    if (latest && latest.date) {
      const t = new Date(latest.date).getTime();
      if (!isNaN(t)) return t;
    }
  }
  if (stock.lastUpdated && stock.lastUpdated !== 'Recently') {
    const t = new Date(stock.lastUpdated).getTime();
    if (!isNaN(t)) return t;
  }
  return 0;
};

export default function SharesListingClient() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-background flex items-center justify-center font-medium text-slate-500">Loading shares directory...</div>}>
      <AllSharesContent />
    </React.Suspense>
  );
}

function AllSharesContent() {
  const searchParams = useSearchParams();
  const initialSector = searchParams.get('sector') || 'All';

  const [stocks, setStocks] = useState<StockItem[]>(STOCKS_DATA);
  const [filterSector, setFilterSector] = useState<string>(initialSector);
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'priceAsc' | 'priceDesc' | 'gainers'>('name');

  React.useEffect(() => {
    getPortalShares().then((data) => {
      if (data && data.length > 0) {
        setStocks(data);
      }
    });
  }, []);

  React.useEffect(() => {
    const sec = searchParams.get('sector');
    if (sec) {
      setFilterSector(sec);
    }
    const cat = searchParams.get('category');
    if (cat) {
      setFilterCategory(cat);
    }
  }, [searchParams]);

  const sectors = ['All', 'Financial Services', 'Consumer Services', 'Automobile', 'Energy & Power', 'Renewable Energy', 'Manufacturing'];
  const categories = ['All', 'Popular', 'Recently Updated', 'Pre-IPO', 'DRHP Filed'];

  const filteredStocks = stocks.filter((stock) => {
    const matchesSearch =
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stock.ticker && stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector =
      filterSector === 'All' ||
      stock.sector.toLowerCase().includes(filterSector.toLowerCase()) ||
      filterSector.toLowerCase().includes(stock.sector.toLowerCase());

    let matchesCategory = false;
    if (filterCategory === 'All') {
      matchesCategory = true;
    } else if (filterCategory === 'Recently Updated') {
      const ts = getStockTimestamp(stock);
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      const isWithin30Days = ts > 0 && Date.now() - ts <= thirtyDaysMs;
      const hasHistoryUpdates = Boolean(stock.priceHistory && stock.priceHistory.length > 1);
      matchesCategory = stock.category === 'Recently Updated' || isWithin30Days || hasHistoryUpdates;
    } else if (filterCategory === 'Pre-IPO') {
      matchesCategory =
        stock.category === 'Pre-IPO' ||
        stock.category?.toLowerCase().includes('pre-ipo') ||
        Boolean(stock.drhpStatus);
    } else if (filterCategory === 'DRHP Filed') {
      matchesCategory =
        stock.category === 'DRHP Filed' ||
        stock.category?.toLowerCase().includes('drhp') ||
        Boolean(stock.drhpStatus);
    } else {
      matchesCategory = stock.category === filterCategory;
    }

    return matchesSearch && matchesSector && matchesCategory;
  }).sort((a, b) => {
    if (filterCategory === 'Recently Updated' && sortBy === 'name') {
      const timeDiff = getStockTimestamp(b) - getStockTimestamp(a);
      if (timeDiff !== 0) return timeDiff;
    }
    if (sortBy === 'priceAsc') return a.price - b.price;
    if (sortBy === 'priceDesc') return b.price - a.price;
    if (sortBy === 'gainers') {
      const valA = parseFloat(a.change.replace(/[+%]/g, '')) || 0;
      const valB = parseFloat(b.change.replace(/[+%]/g, '')) || 0;
      return valB - valA;
    }
    return a.name.localeCompare(b.name);
  });

  const renderSparkline = (points: number[], isUp: boolean) => {
    if (!points || points.length < 2) return null;
    const min = Math.min(...points);
    const max = Math.max(...points);
    const range = max - min || 1;
    const width = 70;
    const height = 22;

    const coords = points.map((p, idx) => {
      const x = (idx / (points.length - 1)) * width;
      const y = height - ((p - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    });

    return (
      <svg viewBox={`0 0 ${width} ${height}`} className="w-18 h-5" fill="none">
        <path
          d={`M ${coords.join(' L ')}`}
          stroke={isUp ? '#10b981' : '#f43f5e'}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <TopTicker />
      <Navbar />

      {/* Hero Banner for All Shares */}
      <section className="relative bg-[#0B132B] text-white overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-800">
        {/* Subtle Financial Grid Background & Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[130px]" />
          <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, description, and trust stats */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Full Directory · Indicative Pricing &amp; Market Depth</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
                Buy Unlisted Shares{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
                  in India
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-[36em] font-normal leading-relaxed">
                Explore India&apos;s most active private market equities. Indicative unlisted share prices, verified corporate filings, minimum lot sizes, and direct connection with institutional specialists.
              </p>

              {/* Trust Metric Counters Row */}
              <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    267<span className="text-blue-400 font-normal">+</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Tracked Securities
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                    100<span className="text-emerald-400 font-normal">%</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Demat Settlement (CDSL/NSDL)
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    14<span className="text-blue-400 font-normal">+</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Active Growth Sectors
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Institutional Market Snapshot Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Live Directory Insights
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Updated Daily
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Pricing Discovery</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Indicative OTC</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Transfer Mode</span>
                    <span className="text-sm font-bold text-emerald-400 mt-0.5 block">Off-Market Demat</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Corporate Research</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Verified ROC/DRHP</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Order Execution</span>
                    <span className="text-sm font-bold text-blue-400 mt-0.5 block">Dealing Desk</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Zero Brokerage on Listing</span>
                  </div>
                  <Link
                    href="/contact-us"
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group"
                  >
                    <span>Talk to Desk</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-8 sm:py-12 w-full flex-1">
        {/* Filter Controls */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-6 space-y-4">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                  filterCategory === cat
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-3 border-t border-slate-100">
            {/* Sector Dropdown */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setFilterSector(sec)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all cursor-pointer ${
                    filterSector === sec
                      ? 'bg-[#0B132B] text-white'
                      : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>

            {/* Search Input & Sort */}
            <div className="flex items-center space-x-3">
              <div className="relative flex-1 sm:w-64">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search shares or sectors..."
                  className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="name">Sort: Name (A-Z)</option>
                <option value="priceAsc">Sort: Price (Low to High)</option>
                <option value="priceDesc">Sort: Price (High to Low)</option>
                <option value="gainers">Sort: Top Gainers</option>
              </select>
            </div>
          </div>
        </div>

        {/* Informative Guidance Banner */}
        <div className="mb-6 p-4 rounded-xl bg-blue-50/60 border border-blue-100 flex items-start space-x-3 text-xs text-slate-700">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong>Indicative Price Discovery:</strong> Unlisted share rates reflect recent over-the-counter trades and institutional transaction markers. Final order execution, lot sizes, and payment verification are confirmed through our concierge dealing desk. Transfers occur via legal off-market Demat credits (NSDL/CDSL).
          </p>
        </div>

        {/* Shares Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3 px-4 sm:px-6">Company / Ticker</th>
                  <th className="py-3 px-4">Sector</th>
                  <th className="py-3 px-4 text-right">Indicative Price</th>
                  <th className="py-3 px-4 text-center">Trend</th>
                  <th className="py-3 px-4 text-right">Lot Size</th>
                  <th className="py-3 px-4 text-right">Valuation (Cr)</th>
                  <th className="py-3 px-4 sm:px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                {filteredStocks.length > 0 ? (
                  filteredStocks.map((stock) => {
                    const isUp = stock.changeType === 'up';
                    return (
                      <tr
                        key={stock.id}
                        className="hover:bg-slate-50/80 transition-colors group cursor-pointer"
                      >
                        <td className="py-4 px-4 sm:px-6">
                          <Link href={`/shares/${stock.id}`} className="flex items-center space-x-3">
                            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:border-blue-400 transition-colors">
                              {stock.logo ? (
                                <img src={stock.logo} alt={stock.name} className="w-full h-full object-contain p-1 rounded-lg" />
                              ) : (
                                <span>{stock.name.slice(0, 2).toUpperCase()}</span>
                              )}
                            </div>
                            <div>
                              <div className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors flex items-center gap-1.5">
                                <span>{stock.name}</span>
                                {stock.ticker && (
                                  <span className="text-[10px] font-mono text-slate-400 font-normal">({stock.ticker})</span>
                                )}
                              </div>
                              <div className="text-[11px] text-slate-500 font-medium mt-0.5 flex items-center gap-2">
                                <span>ISIN: {stock.isin || 'Available on enquiry'}</span>
                              </div>
                            </div>
                          </Link>
                        </td>

                        <td className="py-4 px-4">
                          <span className="inline-block text-[11px] font-medium px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                            {stock.sector}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-right">
                          <div className="font-bold text-slate-900 tabular-nums">
                            ₹{stock.price.toLocaleString('en-IN')}
                          </div>
                          <span
                            className={`inline-flex items-center text-[10px] font-semibold tabular-nums ${
                              isUp ? 'text-emerald-600' : 'text-rose-600'
                            }`}
                          >
                            {stock.change}
                          </span>
                        </td>

                        <td className="py-4 px-4 text-center">
                          <div className="flex justify-center">
                            {renderSparkline(stock.sparkline || [stock.price], isUp)}
                          </div>
                        </td>

                        <td className="py-4 px-4 text-right font-medium text-slate-700 tabular-nums">
                          {stock.minLot?.toLocaleString('en-IN') || 100} Shares
                        </td>

                        <td className="py-4 px-4 text-right font-medium text-slate-700 tabular-nums">
                          {stock.marketCap || '—'}
                        </td>

                        <td className="py-4 px-4 sm:px-6 text-right">
                          <Link
                            href={`/shares/${stock.id}`}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-blue-50 hover:bg-blue-600 text-blue-700 hover:text-white font-semibold text-xs border border-blue-200 hover:border-transparent transition-all shadow-2xs"
                          >
                            <span>Enquire</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500">
                      No unlisted shares found matching your filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

