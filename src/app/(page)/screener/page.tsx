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
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Banner with Dark Teal Theme */}
      <section className="bg-[#082029] text-white py-16 sm:py-24 border-b border-[#0d2e38] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a887]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider text-[#c5a880] uppercase">
              <span className="w-6 h-[2px] bg-[#c5a880]" />
              <span>Quantitative Screener Desk · Custom Filters</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Unlisted Shares Screener
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Screen and filter Indian unlisted companies, pre-IPO candidates, and ESOP counters by sector, lot size, market valuation, and price ranges.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 w-full flex-1 space-y-8">
        {/* Spacious Interactive Filter Box */}
        <div className="bg-white rounded-3xl p-6 sm:p-9 border border-[#dce8e5] shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-100">
            <div className="flex items-center space-x-2.5">
              <SlidersHorizontal className="w-5 h-5 text-[#00a887]" />
              <h2 className="text-xl font-semibold text-[#082029]">Multi-Parameter Screening Filters</h2>
            </div>
            <button
              onClick={resetFilters}
              className="text-xs sm:text-sm font-semibold text-gray-500 hover:text-[#00a887] flex items-center space-x-1.5 transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset all filters</span>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Sector Selector */}
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 tracking-wider block mb-2">
                Industry Sector
              </label>
              <select
                value={selectedSector}
                onChange={(e) => setSelectedSector(e.target.value)}
                className="w-full text-sm font-semibold text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
              >
                {sectors.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            {/* Category Selector */}
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 tracking-wider block mb-2">
                Listing / IPO Stage
              </label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full text-sm font-semibold text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
              >
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Price Range */}
            <div>
              <label className="text-xs font-semibold uppercase text-gray-500 tracking-wider block mb-2">
                Indicative Share Price
              </label>
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value as any)}
                className="w-full text-sm font-semibold text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
              >
                <option value="All">All Price Tiers</option>
                <option value="under100">Under ₹100</option>
                <option value="100to1000">₹100 to ₹1,000</option>
                <option value="above1000">Above ₹1,000</option>
              </select>
            </div>
          </div>

          {/* Search & Sort Row */}
          <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by company name or ticker..."
                className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2 outline-none focus:border-[#00a887]"
              />
              <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>

            <div className="flex items-center space-x-3">
              <span className="text-xs font-semibold text-gray-500 whitespace-nowrap">
                Showing {filtered.length} Results
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="text-xs sm:text-sm font-semibold bg-white border border-gray-300 rounded-xl px-3 py-2 outline-none focus:border-[#00a887] text-gray-700"
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
        <div className="bg-white rounded-3xl border border-[#dce8e5] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#fbfdfc] text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Company</th>
                  <th className="py-4 px-6">Sector</th>
                  <th className="py-4 px-6">Indicative Price</th>
                  <th className="py-4 px-6">Lot Size</th>
                  <th className="py-4 px-6">Est. Market Cap</th>
                  <th className="py-4 px-6">P/E</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm font-medium">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500">
                      No unlisted stocks match the specified screening parameters.
                    </td>
                  </tr>
                ) : (
                  filtered.map((stock) => (
                    <tr key={stock.id} className="hover:bg-[#f8fcfa] transition-colors group">
                      <td className="py-5 px-6">
                        <Link href={`/shares/${stock.id}`} className="flex items-center space-x-3.5">
                          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#082029] to-[#00a887] text-white flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs">
                            {stock.name.slice(0, 2).toUpperCase()}
                          </div>
                          <div>
                            <div className="font-semibold text-base text-[#082029] group-hover:text-[#00a887] transition-colors">
                              {stock.name}
                            </div>
                            <span className="text-xs text-gray-400">{stock.category}</span>
                          </div>
                        </Link>
                      </td>
                      <td className="py-5 px-6 text-gray-600">{stock.sector}</td>
                      <td className="py-5 px-6 font-semibold text-[#082029] text-base">
                        ₹{stock.price.toLocaleString('en-IN')}
                      </td>
                      <td className="py-5 px-6 text-gray-700">
                        {stock.minLot?.toLocaleString('en-IN') || 100} shares
                      </td>
                      <td className="py-5 px-6 text-gray-700">{stock.marketCap || '—'}</td>
                      <td className="py-5 px-6 text-gray-700">{stock.peRatio || 'N/A'}</td>
                      <td className="py-5 px-6 text-right">
                        <Link
                          href={`/shares/${stock.id}`}
                          className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#082029] hover:text-white hover:bg-[#00a887] border border-[#dce8e5] hover:border-[#00a887] transition-all"
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
