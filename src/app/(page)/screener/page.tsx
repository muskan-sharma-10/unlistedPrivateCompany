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

export default function ScreenerPage() {
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

    const matchesCategory =
      selectedCategory === 'All' || stock.category === selectedCategory;

    let matchesPrice = true;
    if (priceRange === 'under100') matchesPrice = stock.price < 100;
    else if (priceRange === '100to1000') matchesPrice = stock.price >= 100 && stock.price <= 1000;
    else if (priceRange === 'above1000') matchesPrice = stock.price > 1000;

    return matchesSearch && matchesSector && matchesCategory && matchesPrice;
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

      {/* Hero Banner with Institutional Deep Navy Theme */}
      <section className="bg-[#0B132B] text-white py-12 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 relative z-10">
          <div className="max-w-3xl space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Quantitative Screener Desk · Custom Multi-Metric Filters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Unlisted Shares Screener
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Screen and filter Indian unlisted companies, pre-IPO candidates, and ESOP counters by sector, lot size, market valuation, and price ranges.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-8 sm:py-12 w-full flex-1 space-y-6">
        {/* Interactive Filter Box */}
        <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-2">
              <SlidersHorizontal className="w-5 h-5 text-blue-700" />
              <h2 className="text-base sm:text-lg font-bold text-slate-900">Multi-Parameter Screening Filters</h2>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs font-semibold text-slate-500 hover:text-blue-600 flex items-center space-x-1.5 transition-colors cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {/* Sector Selector */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider block mb-1.5">
                Industry Sector
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50/70 border border-slate-300 rounded-lg px-3.5 py-2 outline-none focus:border-blue-600 focus:bg-white transition-colors"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider block mb-1.5">
                Listing / IPO Stage
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50/70 border border-slate-300 rounded-lg px-3.5 py-2 outline-none focus:border-blue-600 focus:bg-white transition-colors"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-semibold uppercase text-slate-500 tracking-wider block mb-1.5">
                Indicative Share Price
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full text-xs sm:text-sm font-semibold text-slate-900 bg-slate-50/70 border border-slate-300 rounded-lg px-3.5 py-2 outline-none focus:border-blue-600 focus:bg-white transition-colors"
              >
                <option value="All">All Price Tiers</option>
                <option value="under100">Under ₹100</option>
                <option value="100to1000">₹100 to ₹1,000</option>
                <option value="above1000">Above ₹1,000</option>
              </select>
            </div>
          </div>

          {/* Search & Sort Row */}
          <div className="pt-3 border-t border-slate-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name or ticker..."
                className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50/70 border border-slate-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-blue-600 focus:bg-white transition-colors"
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-slate-500 whitespace-nowrap tabular-nums">
                Showing {filtered.length} Results
              </span>
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

        {/* Results Table Container */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs font-semibold text-slate-500 uppercase tracking-wider">
                  <th className="py-3.5 px-5">Company</th>
                  <th className="py-3.5 px-5">Sector</th>
                  <th className="py-3.5 px-5">Indicative Price</th>
                  <th className="py-3.5 px-5">Lot Size</th>
                  <th className="py-3.5 px-5">Est. Market Cap</th>
                  <th className="py-3.5 px-5">P/E</th>
                  <th className="py-3.5 px-5 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-sm font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-slate-500 font-medium">
                      No unlisted stocks match the specified screening parameters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((stock) => (
                    <tr key={stock.id} className="hover:bg-slate-50/80 transition-colors group">
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
                            <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-1.5 py-0.2 rounded border border-blue-100">
                              {stock.category}
                            </span>
                          </div>
                        </Link>
                      </td>
                      <td className="py-4 px-5 text-slate-600 text-xs font-medium">{stock.sector}</td>
                      <td className="py-4 px-5 font-bold text-slate-900 text-base tabular-nums">
                        ₹{stock.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-4 px-5 text-slate-700 text-xs tabular-nums">
                        {stock.minLot?.toLocaleString('en-IN') || 100} shares
                      </td>
                      <td className="py-4 px-5 text-slate-700 text-xs tabular-nums">{stock.marketCap || '—'}</td>
                      <td className="py-4 px-5 text-slate-700 text-xs tabular-nums">{stock.peRatio || 'N/A'}</td>
                      <td className="py-4 px-5 text-right">
                        <Link
                          href={`/shares/${stock.id}`}
                          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg text-xs font-semibold text-slate-700 hover:text-blue-600 hover:bg-slate-50 border border-slate-200 hover:border-slate-300 transition-all"
                        >
                          <span>Full Data</span>
                          <ChevronRight className="w-3.5 h-3.5" />
                        </Link>
                      </td>
                    </tr>
                  ))
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
