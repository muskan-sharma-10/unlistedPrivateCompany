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
      <section className="py-14 sm:py-16 border-b border-[#dce8e5]">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#00a887] bg-[#e6f7f3] px-3.5 py-1 rounded-full mb-2.5">
                Top picks
              </span>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#082029] leading-tight">
                Popular <em className="font-serif italic text-[#00a887] font-medium">unlisted</em> shares
              </h2>
              <p className="text-[14.5px] text-gray-500 mt-1.5 max-w-[38em]">
                The most-followed names with investors this month. Prices shown are indicative and for information only.
              </p>
            </div>
            <Link
              href="/shares"
              className="text-[13.5px] font-semibold text-[#00a887] inline-flex items-center gap-1.5 border border-[#dce8e5] hover:border-[#00a887] px-5 py-2 rounded-2xl self-start sm:self-auto transition-all"
            >
              View all shares →
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {(liveShares.length > 0 ? liveShares.slice(0, 4) : popularShares).map((stock) => (
              <div
                key={stock.id}
                className="rounded-2xl border border-[#dce8e5] bg-white p-5 hover:border-[#00a887] hover:shadow-xl hover:shadow-[#00a887]/5 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#e6f7f3] flex items-center justify-center shrink-0 overflow-hidden">
                      {stock.logo ? (
                        <img src={stock.logo} alt={stock.name} className="w-full h-full object-contain" />
                      ) : (
                        <span className="font-bold text-[#00a887] text-sm">{stock.name.substring(0, 2)}</span>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[14.5px] text-[#082029] leading-snug line-clamp-2">
                        {stock.name}
                      </h3>
                      <div className="text-[11.5px] text-gray-400 mt-0.5">
                        {stock.sector}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-1 pb-4">
                    <div className="text-[26px] font-bold text-[#082029] leading-none num">
                      <span className="rupee">₹</span>{stock.price}
                    </div>
                    <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#00a887] mt-1.5">
                      Indicative
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#f1f5f9] mt-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenEnquiry) onOpenEnquiry(stock.name);
                      else onSelectStock(stock);
                    }}
                    className="flex-1 py-2.5 rounded-xl text-white font-bold text-[13px] bg-[#00a887] hover:bg-[#009476] shadow-sm shadow-[#00a887]/30 transition-all cursor-pointer"
                  >
                    Enquire
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectStock(stock)}
                    className="px-4 py-2.5 rounded-xl text-[#082029] font-semibold text-[13px] border border-[#dce8e5] hover:border-[#00a887] hover:text-[#00a887] transition-all cursor-pointer"
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
      <section className="py-14 sm:py-16 border-b border-[#dce8e5]">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#00a887] bg-[#e6f7f3] px-3.5 py-1 rounded-full mb-2.5">
                Fresh additions
              </span>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#082029] leading-tight">
                New <em className="font-serif italic text-[#00a887] font-medium">arrivals</em>
              </h2>
              <p className="text-[14.5px] text-gray-500 mt-1.5 max-w-[38em]">
                Recently added names. Research the company, then contact us when you’re ready.
              </p>
            </div>
            <Link
              href="/shares"
              className="text-[13.5px] font-semibold text-[#00a887] inline-flex items-center gap-1.5 border border-[#dce8e5] hover:border-[#00a887] px-5 py-2 rounded-2xl self-start sm:self-auto transition-all"
            >
              View all →
            </Link>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {newArrivals.map((stock) => (
              <div
                key={stock.id}
                className="rounded-2xl border border-[#dce8e5] bg-white p-5 hover:border-[#00a887] hover:shadow-xl hover:shadow-[#00a887]/5 hover:-translate-y-1 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start gap-3.5 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center font-bold text-[16px] shrink-0">
                      {stock.badge}
                    </div>
                    <div>
                      <h3 className="font-semibold text-[14.5px] text-[#082029] leading-snug line-clamp-2">
                        {stock.name}
                      </h3>
                      <div className="text-[11.5px] text-gray-400 mt-0.5">
                        {stock.sector}
                      </div>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="pt-1 pb-4">
                    <div className="text-[26px] font-bold text-[#082029] leading-none num">
                      {stock.price > 0 ? (
                        <>
                          <span className="rupee">₹</span>{stock.price.toLocaleString('en-IN')}
                        </>
                      ) : (
                        <span className="text-[#00a887] text-[18px]">DRHP / Pre-IPO</span>
                      )}
                    </div>
                    <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-[#00a887] mt-1.5">
                      Indicative
                    </div>
                  </div>
                </div>

                {/* Footer Buttons */}
                <div className="flex items-center gap-2 pt-3 border-t border-[#f1f5f9] mt-auto">
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenEnquiry) onOpenEnquiry(stock.name);
                      else onSelectStock(stock);
                    }}
                    className="flex-1 py-2.5 rounded-xl text-white font-bold text-[13px] bg-[#00a887] hover:bg-[#009476] shadow-sm shadow-[#00a887]/30 transition-all cursor-pointer"
                  >
                    Enquire
                  </button>
                  <button
                    type="button"
                    onClick={() => onSelectStock(stock)}
                    className="px-4 py-2.5 rounded-xl text-[#082029] font-semibold text-[13px] border border-[#dce8e5] hover:border-[#00a887] hover:text-[#00a887] transition-all cursor-pointer"
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
