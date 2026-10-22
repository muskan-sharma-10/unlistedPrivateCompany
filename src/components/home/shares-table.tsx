'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { StockItem } from '@/data/unlisted-data';
import { getPortalShares } from '@/lib/supabase/queries';

interface SharesTableProps {
  onSelectStock: (stock: StockItem) => void;
  selectedCategory?: string;
  onOpenEnquiry?: (stockName?: string) => void;
}

export const SharesTable: React.FC<SharesTableProps> = ({
  onSelectStock,
  onOpenEnquiry,
}) => {
  const [liveShares, setLiveShares] = useState<StockItem[]>([]);

  useEffect(() => {
    getPortalShares().then((data) => {
      if (data && data.length > 0) setLiveShares(data);
    });
  }, []);
  // Exact 4 Popular Shares from unlistedzone.com
  const popularShares: StockItem[] = [
    {
      id: 'msei',
      name: 'Metropolitan Stock Exchange (MSEI) Unlisted Shares',
      sector: 'Financial Services',
      price: 6.75,
      change: '+3.8%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Full-service nationwide stock exchange offering trading in Capital Market, Futures & Options, and Currency Derivatives.',
      sparkline: [5.8, 6.0, 6.1, 6.3, 6.5, 6.75],
      logo: '/logos/msei.webp',
    },
    {
      id: 'hpx',
      name: 'Hindustan Power Exchange Limited (HPX India)',
      sector: 'Energy & Power',
      price: 24,
      change: '+4.5%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Hindustan Power Exchange (HPX) is India’s premier power exchange backed by PTC India, BSE, and ICICI Bank.',
      sparkline: [21, 22, 22.5, 23.5, 24],
      logo: '/logos/hpx.webp',
    },
    {
      id: 'onix',
      name: 'Onix Renewable Limited',
      sector: 'Renewable Energy',
      price: 46,
      change: '+6.2%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Onix Renewable Limited is leading clean energy generation and sustainable solar installations across India.',
      sparkline: [40, 42, 43, 44, 46],
      logo: '/logos/onix.webp',
    },
    {
      id: 'gfcl-ev',
      name: 'GFCL EV Products Limited',
      sector: 'Automotive',
      price: 42,
      change: '+2.1%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'GFCL EV Products is developing critical chemical components, battery electrolytes, and high-performance materials for electric vehicles.',
      sparkline: [38, 39, 40, 41, 42],
      logo: '/logos/gfcl.webp',
    },
  ];

  // Exact 4 New Arrivals from unlistedzone.com
  const newArrivals: (StockItem & { badge: string })[] = [
    {
      id: 'inox-air',
      name: 'Inox Air Products Limited',
      sector: 'Manufacturing & Engineering',
      price: 0,
      change: 'DRHP Filed',
      changeType: 'up',
      category: 'Pre-IPO',
      lastUpdated: '14 Oct 2026',
      description: 'INOX Air Products is India’s largest industrial and medical gases manufacturer, recently filing its DRHP for a marquee IPO.',
      sparkline: [0, 0, 0, 0],
      badge: 'IA',
    },
    {
      id: 'omega-seiki',
      name: 'Omega Seiki Limited',
      sector: 'Manufacturing & Engineering',
      price: 2750,
      change: '+5.4%',
      changeType: 'up',
      category: 'Pre-IPO',
      lastUpdated: '14 Oct 2026',
      description: 'Omega Seiki Mobility manufactures electric three-wheelers, cargo EVs, and commercial transport solutions.',
      sparkline: [2400, 2500, 2600, 2700, 2750],
      badge: 'OS',
    },
    {
      id: 'prisma-global',
      name: 'Prisma Global Limited',
      sector: 'Technology',
      price: 8600,
      change: '+1.8%',
      changeType: 'up',
      category: 'Pre-IPO',
      lastUpdated: '14 Oct 2026',
      description: 'Prisma Global (Prism AI) pioneers enterprise visual AI, surveillance intelligence, and computer vision software platforms.',
      sparkline: [8200, 8350, 8450, 8550, 8600],
      badge: 'PG',
    },
    {
      id: 'navitas-green',
      name: 'Navitas Green Solutions Pvt Ltd.',
      sector: 'Energy & Power',
      price: 0,
      change: 'Pre-IPO',
      changeType: 'up',
      category: 'Pre-IPO',
      lastUpdated: '14 Oct 2026',
      description: 'Navitas Green Solutions is one of India’s leading solar PV module manufacturers and clean energy tech developers.',
      sparkline: [0, 0, 0, 0],
      badge: 'NG',
    },
  ];

  return (
    <div id="shares" className="bg-white">
      {/* SECTION 1: Popular unlisted shares (Top picks) */}
      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
                Top Picks
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Popular Unlisted Shares
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                The most actively researched securities by private market investors. Indicative rates for research only.
              </p>
            </div>
            <Link
              href="/shares"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-500 px-4 py-2 rounded-lg self-start sm:self-auto transition-all"
            >
              View All Shares →
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(liveShares.length > 0 ? liveShares.slice(0, 4) : popularShares).map((stock) => (
              <div
                key={stock.id}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-500/80 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center shrink-0 overflow-hidden p-1">
                      {stock.logo ? (
                        <img src={stock.logo} alt={stock.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="font-bold text-blue-700 text-xs">{stock.name.substring(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-slate-900 leading-snug line-clamp-2">
                        {stock.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {stock.sector}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-1 pb-4">
                    <div className="text-2xl font-bold text-slate-900 leading-none tabular-nums">
                      <span className="rupee">₹</span>{stock.price.toLocaleString('en-IN')}
                    </div>
                    <div className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 mt-1.5">
                      Indicative
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenEnquiry) onOpenEnquiry(stock.name);
                      else onSelectStock(stock);
                    }}
                    className="flex-1 py-2 rounded-lg text-white font-semibold text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectStock(stock)}
                    className="px-3.5 py-2 rounded-lg text-slate-700 font-semibold text-xs border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: Fresh additions (New arrivals) */}
      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
                Fresh Additions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                New Arrivals
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Recently added private companies and upcoming IPO prospects. Research fundamentals before participating.
              </p>
            </div>
            <Link
              href="/shares"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-500 px-4 py-2 rounded-lg self-start sm:self-auto transition-all"
            >
              View All →
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map((stock) => (
              <div
                key={stock.id}
                className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-500/80 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {stock.badge}
                    </div>
                    <div className="min-w-0">
                      <h3 className="font-semibold text-sm text-slate-900 leading-snug line-clamp-2">
                        {stock.name}
                      </h3>
                      <div className="text-xs text-slate-500 mt-0.5">
                        {stock.sector}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-1 pb-4">
                    <div className="text-2xl font-bold text-slate-900 leading-none tabular-nums">
                      {stock.price > 0 ? (
                        <>
                          <span className="rupee">₹</span>{stock.price.toLocaleString('en-IN')}
                        </>
                      ) : (
                        <span className="text-blue-600 text-base font-semibold">DRHP / Pre-IPO</span>
                      )}
                    </div>
                    <div className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 mt-1.5">
                      Indicative
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenEnquiry) onOpenEnquiry(stock.name);
                      else onSelectStock(stock);
                    }}
                    className="flex-1 py-2 rounded-lg text-white font-semibold text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs transition-colors cursor-pointer"
                  >
                    Enquire
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectStock(stock)}
                    className="px-3.5 py-2 rounded-lg text-slate-700 font-semibold text-xs border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default SharesTable;
