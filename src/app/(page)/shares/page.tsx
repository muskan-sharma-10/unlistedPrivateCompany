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

export default function AllSharesPage() {
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

    const matchesCategory =
      filterCategory === 'All' || stock.category === filterCategory;

    return matchesSearch && matchesSector && matchesCategory;
  }).sort((a, b) => {
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
      <section className="bg-[#0B132B] text-white py-12 sm:py-16 border-b border-slate-800">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Full Directory · Indicative Pricing &amp; Market Depth</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              All Unlisted &amp; Pre-IPO Shares
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Explore India&apos;s most active private market equities. Indicative prices, verified corporate filings, minimum lot sizes, and direct connection with institutional specialists.
            </p>
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
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-all ${
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
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${
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
                  className="w-full text-xs sm:text-sm bg-slate-50/70 border border-slate-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-blue-600 focus:bg-white transition-colors"
                />
                <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs sm:text-sm font-semibold bg-white border border-slate-300 rounded-lg px-3 py-2 outline-none focus:border-blue-600 text-slate-700"
              >
                <option value="name">Sort: Name (A-Z)</option>
                <option value="gainers">Top Gainers</option>
                <option value="priceDesc">Price (High to Low)</option>
                <option value="priceAsc">Price (Low to High)</option>
              </select>
            </div>
          </div>
        </div>

        {/* High-Density Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Company</th>
                  <th className="py-3.5 px-5 hidden sm:table-cell">Sector</th>
                  <th className="py-3.5 px-5">Indicative Price (₹)</th>
                  <th className="py-3.5 px-5">Change</th>
                  <th className="py-3.5 px-5 hidden md:table-cell">7D Trend</th>
                  <th className="py-3.5 px-5 hidden lg:table-cell">Last Updated</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-normal">
                {filteredStocks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                      No unlisted shares found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredStocks.map((stock) => {
                    const isUp = stock.changeType === 'up';
                    return (
                      <tr
                        key={stock.id}
                        className="hover:bg-slate-50/80 transition-colors duration-150 group"
                      >
                        {/* Company Column */}
                        <td className="py-4 px-5">
                          <Link href={`/shares/${stock.id}`} className="flex items-center space-x-3">
                            <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 text-blue-700 flex items-center justify-center font-bold text-xs shrink-0 overflow-hidden p-1">
                              {stock.logo ? (
                                <img src={stock.logo} alt={stock.name} className="w-full h-full object-contain" />
                              ) : (
                                <span>{stock.name.slice(0, 2).toUpperCase()}</span>
                              )}
                            </div>
                            <div>
                              <div className="font-semibold text-sm text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-1">
                                {stock.name}
                              </div>
                              <div className="text-xs text-slate-500 flex items-center space-x-2 mt-0.5">
                                <span className="font-semibold text-[11px] text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                                  {stock.category}
                                </span>
                                {stock.minLot && (
                                  <span className="text-slate-400 hidden sm:inline tabular-nums">
                                    Min lot: {stock.minLot} shares
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        </td>

                        {/* Sector Column */}
                        <td className="py-4 px-5 text-slate-600 hidden sm:table-cell text-xs font-medium">
                          {stock.sector}
                        </td>

                        {/* Indicative Price */}
                        <td className="py-4 px-5 font-bold text-slate-900 text-base tabular-nums">
                          ₹{stock.price.toLocaleString('en-IN')}
                        </td>

                        {/* Change */}
                        <td className="py-4 px-5">
                          <span
                            className={`inline-flex items-center space-x-1 text-xs font-semibold px-2 py-0.5 rounded-md tabular-nums border ${
                              isUp
                                ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                                : 'bg-rose-50 text-rose-700 border-rose-200'
                            }`}
                          >
                            {isUp ? (
                              <TrendingUp className="w-3.5 h-3.5" />
                            ) : (
                              <TrendingDown className="w-3.5 h-3.5" />
                            )}
                            <span>{stock.change}</span>
                          </span>
                        </td>

                        {/* Trend Sparkline */}
                        <td className="py-4 px-5 hidden md:table-cell">
                          {renderSparkline(stock.sparkline, isUp)}
                        </td>

                        {/* Last Updated */}
                        <td className="py-4 px-5 text-xs text-slate-500 font-medium hidden lg:table-cell tabular-nums">
                          {stock.lastUpdated}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-4 px-5 text-right">
                          <Link
                            href={`/shares/${stock.id}`}
                            className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                          >
                            <span>Details</span>
                            <ChevronRight className="w-3.5 h-3.5" />
                          </Link>
                        </td>
                      </tr>
                    );
                  })
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
