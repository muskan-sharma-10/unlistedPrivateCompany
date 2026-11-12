'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  SlidersHorizontal,
  Search,
  TrendingUp,
  TrendingDown,
  ChevronRight,
  Filter,
  RefreshCw,
  Building2,
  ExternalLink,
  Layers
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
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

export default function ScreenerClient() {
  const [stocks, setStocks] = useState<StockItem[]>(STOCKS_DATA);
  const [selectedSector, setSelectedSector] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState<'All' | 'under100' | '100to1000' | 'above1000'>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'priceAsc' | 'priceDesc' | 'gainers'>('name');

  React.useEffect(() => {
    getPortalShares().then((data) => {
      if (data && data.length > 0) {
        setStocks(data);
      }
    });
  }, []);

  const sectors = ['All', 'Financial Services', 'Consumer Services', 'Automobile', 'Energy & Power', 'Renewable Energy', 'Manufacturing'];
  const categories = ['All', 'Popular', 'Pre-IPO', 'DRHP Filed', 'Recently Updated'];

  const filtered = stocks.filter((stock) => {
    const matchesSearch =
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stock.ticker && stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector =
      selectedSector === 'All' || stock.sector.toLowerCase() === selectedSector.toLowerCase();

    let matchesCategory = false;
    if (selectedCategory === 'All') {
      matchesCategory = true;
    } else if (selectedCategory === 'Recently Updated') {
      const ts = getStockTimestamp(stock);
      const thirtyDaysMs = 30 * 24 * 60 * 60 * 1000;
      const isWithin30Days = ts > 0 && Date.now() - ts <= thirtyDaysMs;
      const hasHistoryUpdates = Boolean(stock.priceHistory && stock.priceHistory.length > 1);
      matchesCategory = stock.category === 'Recently Updated' || isWithin30Days || hasHistoryUpdates;
    } else if (selectedCategory === 'Pre-IPO') {
      matchesCategory =
        stock.category === 'Pre-IPO' ||
        stock.category?.toLowerCase().includes('pre-ipo') ||
        Boolean(stock.drhpStatus);
    } else if (selectedCategory === 'DRHP Filed') {
      matchesCategory =
        stock.category === 'DRHP Filed' ||
        stock.category?.toLowerCase().includes('drhp') ||
        Boolean(stock.drhpStatus);
    } else {
      matchesCategory = stock.category === selectedCategory;
    }

    let matchesPrice = false;
    if (priceRange === 'All') matchesPrice = true;
    else if (priceRange === 'under100') matchesPrice = stock.price < 100;
    else if (priceRange === '100to1000') matchesPrice = stock.price >= 100 && stock.price <= 1000;
    else if (priceRange === 'above1000') matchesPrice = stock.price > 1000;

    return matchesSearch && matchesSector && matchesCategory && matchesPrice;
  }).sort((a, b) => {
    if (selectedCategory === 'Recently Updated' && sortBy === 'name') {
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

  const resetFilters = () => {
    setSelectedSector('All');
    setSelectedCategory('All');
    setPriceRange('All');
    setSearchQuery('');
    setSortBy('name');
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <TopTicker />
      <Navbar />

      {/* Hero Header */}
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
          <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, description, and filter specs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <SlidersHorizontal className="w-3.5 h-3.5" />
                <span>Multi-Parameter Screener · Custom Pre-IPO Filters</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
                Unlisted Company{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
                  Screener
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-[36em] font-normal leading-relaxed">
                Filter and screen private companies and pre-IPO shares across sectors, price ranges, and market categories in India with verified corporate fundamentals.
              </p>

              {/* Metric Counters Row */}
              <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    Multi<span className="text-blue-400 font-normal">-Sector</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    14+ Industry Categories
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-sky-400 tabular-nums">
                    Dynamic
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Live Lot Size &amp; Price Sorting
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    Instant
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Real-time Query Filtering
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Screener Parameter Matrix Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Screener Matrix
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Real-Time Search
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Sector Sorting</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">14+ Sectors</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Lot Sizes</span>
                    <span className="text-sm font-bold text-emerald-400 mt-0.5 block">10 to 500+ Shares</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Indicative Prices</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">₹5 to ₹50,000+</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Classification</span>
                    <span className="text-sm font-bold text-blue-400 mt-0.5 block">Popular · DRHP</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>No Login Required to Screen</span>
                  </div>
                  <Link
                    href="/shares"
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group"
                  >
                    <span>Full Directory</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-8 sm:py-12 w-full flex-1">
        {/* Screener Controls Card */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs mb-8 space-y-5">
          {/* Row 1: Search and Reset */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search company name, symbol or sector..."
                className="w-full pl-9 pr-4 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
              />
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={resetFilters}
                className="inline-flex items-center space-x-1.5 px-3 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 cursor-pointer"
              >
                <option value="name">Sort: Name (A-Z)</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="gainers">Top Gainers</option>
              </select>
            </div>
          </div>

          {/* Row 2: Sector Pills */}
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
              Industry Sector
            </div>
            <div className="flex flex-wrap items-center gap-1.5">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  type="button"
                  onClick={() => setSelectedSector(sec)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                    selectedSector === sec
                      ? 'bg-blue-600 text-white shadow-xs'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                  }`}
                >
                  {sec}
                </button>
              ))}
            </div>
          </div>

          {/* Row 3: Category & Price Range Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Market Category
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#0B132B] text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">
                Indicative Price Range
              </div>
              <div className="flex flex-wrap items-center gap-1.5">
                {[
                  { id: 'All', label: 'All Rates' },
                  { id: 'under100', label: 'Under ₹100' },
                  { id: '100to1000', label: '₹100 – ₹1,000' },
                  { id: 'above1000', label: 'Above ₹1,000' },
                ].map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setPriceRange(p.id as any)}
                    className={`text-xs font-semibold px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
                      priceRange === p.id
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200'
                    }`}
                  >
                    {p.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Results Count Banner */}
        <div className="flex items-center justify-between text-xs text-slate-500 mb-4 font-medium px-1">
          <span>Found {filtered.length} unlisted companies matching your criteria</span>
          <span className="font-mono text-slate-400">Indicative Market Watch</span>
        </div>

        {/* Results Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {filtered.length > 0 ? (
            filtered.map((stock) => {
              const isUp = stock.changeType === 'up';
              return (
                <Link
                  key={stock.id}
                  href={`/shares/${stock.id}`}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-500/80 shadow-2xs hover:shadow-md transition-all flex flex-col justify-between group"
                >
                  <div className="space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 group-hover:border-blue-400 transition-colors">
                        {stock.logo ? (
                          <img src={stock.logo} alt={stock.name} className="w-full h-full object-contain p-1 rounded-lg" />
                        ) : (
                          <span>{stock.name.slice(0, 2).toUpperCase()}</span>
                        )}
                      </div>
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-600 border border-slate-200">
                        {stock.sector}
                      </span>
                    </div>

                    <div>
                      <h3 className="font-bold text-sm text-slate-900 group-hover:text-blue-700 transition-colors line-clamp-1">
                        {stock.name}
                      </h3>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {stock.ticker ? `Ticker: ${stock.ticker}` : `Lot: ${stock.minLot || 100} Shares`}
                      </div>
                    </div>

                    <div className="p-2.5 rounded-lg bg-slate-50 border border-slate-100 flex items-baseline justify-between">
                      <div>
                        <div className="text-[10px] text-slate-500 font-medium">Indicative Price</div>
                        <div className="text-base font-bold text-slate-900 tabular-nums">
                          ₹{stock.price.toLocaleString('en-IN')}
                        </div>
                      </div>
                      <div
                        className={`text-xs font-semibold tabular-nums flex items-center space-x-0.5 ${
                          isUp ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                        <span>{stock.change}</span>
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 mt-4 flex items-center justify-between text-xs font-semibold text-blue-700 group-hover:text-blue-900">
                    <span>View Financials &amp; Enquire</span>
                    <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </Link>
              );
            })
          ) : (
            <div className="col-span-full py-16 text-center text-slate-500 bg-white rounded-xl border border-slate-200">
              <SlidersHorizontal className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="font-medium text-sm">No unlisted companies match your current screen.</p>
              <button
                type="button"
                onClick={resetFilters}
                className="mt-3 text-xs font-semibold text-blue-600 hover:underline cursor-pointer"
              >
                Reset filters to view all companies
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

