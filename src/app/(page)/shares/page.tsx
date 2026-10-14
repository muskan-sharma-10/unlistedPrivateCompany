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
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';

export default function AllSharesPage() {
  const [filterSector, setFilterSector] = useState<string>('All');
  const [filterCategory, setFilterCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'name' | 'priceAsc' | 'priceDesc' | 'gainers'>('name');

  const sectors = ['All', 'Financial Services', 'Consumer Services', 'Automobile', 'Energy & Power', 'Renewable Energy', 'Manufacturing'];
  const categories = ['All', 'Popular', 'Recently Updated', 'Pre-IPO', 'DRHP Filed'];

  const filteredStocks = STOCKS_DATA.filter((stock) => {
    const matchesSearch =
      stock.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      stock.sector.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (stock.ticker && stock.ticker.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesSector =
      filterSector === 'All' || stock.sector.toLowerCase() === filterSector.toLowerCase();

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
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Banner for All Shares */}
      <section className="bg-[#082029] text-white py-14 sm:py-20 border-b border-[#0d2e38]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider text-[#c5a880] uppercase">
              <span className="w-6 h-[2px] bg-[#c5a880]" />
              <span>Full Directory · Researched Indicative Levels</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              All Unlisted &amp; Pre-IPO Shares
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Explore India&apos;s most active private market equities. Indicative prices, financials, lot sizes, and direct connection with relationship managers.
            </p>
          </div>
        </div>
      </section>

      {/* Main Listing Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-10 sm:py-16 w-full flex-1">
        {/* Filter Controls with generous spacing */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dce8e5] shadow-xs mb-8 space-y-5">
          {/* Category Tabs */}
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 scrollbar-none">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl whitespace-nowrap transition-all ${filterCategory === cat
                    ? 'bg-[#00a887] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Controls */}
          <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4 pt-4 border-t border-gray-100">
            {/* Sector Dropdown */}
            <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
              {sectors.map((sec) => (
                <button
                  key={sec}
                  onClick={() => setFilterSector(sec)}
                  className={`text-xs font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap transition-all ${filterSector === sec
                      ? 'bg-[#082029] text-white'
                      : 'bg-gray-50 text-gray-600 hover:bg-gray-100 border border-gray-200'
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
                  className="w-full text-xs sm:text-sm bg-[#f8fafc] border border-gray-300 rounded-xl pl-9 pr-3 py-2 outline-none focus:border-[#00a887]"
                />
                <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>

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

        {/* Spacious Table Container */}
        <div className="bg-white rounded-3xl border border-[#dce8e5] shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-gray-100 bg-[#fbfdfc] text-[13px] font-semibold text-gray-500 uppercase tracking-wider">
                  <th className="py-4 px-6">Company</th>
                  <th className="py-4 px-6 hidden sm:table-cell">Sector</th>
                  <th className="py-4 px-6">Indicative Price (₹)</th>
                  <th className="py-4 px-6">Change</th>
                  <th className="py-4 px-6 hidden md:table-cell">7D Trend</th>
                  <th className="py-4 px-6 hidden lg:table-cell">Last Updated</th>
                  <th className="py-4 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 text-sm sm:text-base font-normal">
                {filteredStocks.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-12 text-center text-gray-500 font-medium">
                      No unlisted shares found matching your filters.
                    </td>
                  </tr>
                ) : (
                  filteredStocks.map((stock) => {
                    const isUp = stock.changeType === 'up';
                    return (
                      <tr
                        key={stock.id}
                        className="hover:bg-[#f8fcfa] transition-colors duration-150 group"
                      >
                        {/* Company Column */}
                        <td className="py-5 px-6">
                          <Link href={`/shares/${stock.id}`} className="flex items-center space-x-3.5">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#082029] to-[#00a887] text-white flex items-center justify-center font-semibold text-xs shrink-0 shadow-xs">
                              {stock.name.slice(0, 2).toUpperCase()}
                            </div>
                            <div>
                              <div className="font-semibold text-[#082029] group-hover:text-[#00a887] transition-colors">
                                {stock.name}
                              </div>
                              <div className="text-xs text-gray-500 flex items-center space-x-2 mt-0.5">
                                <span className="font-medium text-teal-800 bg-teal-50 px-2 py-0.5 rounded-sm">
                                  {stock.category}
                                </span>
                                {stock.minLot && (
                                  <span className="text-gray-400 hidden sm:inline">
                                    Min lot: {stock.minLot} shares
                                  </span>
                                )}
                              </div>
                            </div>
                          </Link>
                        </td>

                        {/* Sector Column */}
                        <td className="py-5 px-6 text-gray-600 hidden sm:table-cell font-medium">
                          {stock.sector}
                        </td>

                        {/* Indicative Price */}
                        <td className="py-5 px-6 font-semibold text-[#082029] text-base sm:text-lg">
                          ₹{stock.price.toLocaleString('en-IN')}
                        </td>

                        {/* Change */}
                        <td className="py-5 px-6">
                          <span
                            className={`inline-flex items-center space-x-1 text-xs sm:text-sm font-semibold px-2.5 py-1 rounded-full ${isUp
                                ? 'bg-emerald-50 text-emerald-700'
                                : 'bg-rose-50 text-rose-600'
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
                        <td className="py-5 px-6 hidden md:table-cell">
                          {renderSparkline(stock.sparkline, isUp)}
                        </td>

                        {/* Last Updated */}
                        <td className="py-5 px-6 text-xs text-gray-500 font-medium hidden lg:table-cell">
                          {stock.lastUpdated}
                        </td>

                        {/* Action Buttons */}
                        <td className="py-5 px-6 text-right">
                          <Link
                            href={`/shares/${stock.id}`}
                            className="inline-flex items-center space-x-1 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-[#082029] hover:text-[#00a887] hover:bg-[#e6f7f3] border border-[#dce8e5] hover:border-[#00a887] transition-all"
                          >
                            <span>View Details</span>
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
