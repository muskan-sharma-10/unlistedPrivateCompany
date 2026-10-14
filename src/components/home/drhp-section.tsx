'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';

interface DRHPSectionProps {
  onSelectStock: (stock: StockItem) => void;
}

export const DRHPSection: React.FC<DRHPSectionProps> = ({ onSelectStock }) => {
  const drhpStocks = STOCKS_DATA.filter((s) => s.drhpStatus?.includes('DRHP') || s.category === 'DRHP Filed');

  return (
    <section id="drhp" className="bg-[#f0f6f4] py-20 sm:py-28 lg:py-36 border-b border-[#dce8e5]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 sm:mb-20">
          <div>
            <div className="inline-flex items-center space-x-3 text-xs sm:text-sm font-semibold tracking-wider text-[#00a887] uppercase mb-3.5">
              <span className="w-10 h-[2.5px] bg-[#00a887]" />
              <span>Upcoming Public Listings</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#082029]">
              DRHP Filed Companies
            </h2>
            <p className="text-base sm:text-xl text-gray-600 mt-4 max-w-3xl font-normal leading-relaxed">
              Pre-IPO businesses that have filed official Draft Red Herring Prospectus documents with SEBI. Invest before the issue opens to the general public.
            </p>
          </div>

          <Link
            href="/drhp-filed"
            className="text-base sm:text-lg font-semibold text-[#00a887] hover:text-[#008f73] inline-flex items-center space-x-2 group shrink-0"
          >
            <span>View all DRHP companies</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* Spacious DRHP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 xl:gap-10">
          {drhpStocks.map((stock) => (
            <div
              key={stock.id}
              className="bg-white rounded-[2.2rem] p-9 sm:p-10 xl:p-11 border border-[#dce8e5] hover:border-[#00a887] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#082029] to-[#00a887] text-white flex items-center justify-center font-semibold text-lg shadow-xs">
                    {stock.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center space-x-1.5 text-xs font-semibold px-3.5 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>SEBI Filed</span>
                  </span>
                </div>

                <h3 className="text-2xl sm:text-[26px] font-semibold text-[#082029] mb-1.5 group-hover:text-[#00a887] transition-colors leading-snug">
                  {stock.name}
                </h3>
                <span className="text-xs font-semibold text-gray-400 block mb-5 uppercase tracking-wider">
                  {stock.sector}
                </span>

                <p className="text-base text-gray-600 font-normal line-clamp-3 leading-relaxed mb-7">
                  {stock.description}
                </p>

                <div className="bg-[#f8fafc] rounded-2xl p-5 sm:p-6 space-y-3 border border-gray-100 text-sm sm:text-base text-gray-700">
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Indicative Price</span>
                    <span className="font-semibold text-[#082029] text-base sm:text-lg">₹{stock.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">DRHP Status</span>
                    <span className="font-semibold text-teal-700">{stock.drhpStatus}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500 font-medium">Estimated Market Cap</span>
                    <span className="font-semibold text-[#082029]">{stock.marketCap}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-100 flex items-center justify-between">
                <Link
                  href={`/shares/${stock.id}`}
                  className="w-full py-4 rounded-2xl bg-[#082029] hover:bg-[#00a887] text-white text-sm sm:text-base font-semibold transition-all duration-200 text-center shadow-md hover:shadow-lg"
                >
                  View IPO Research Note →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DRHPSection;
