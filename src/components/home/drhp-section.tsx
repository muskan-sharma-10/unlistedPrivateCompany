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
    <section id="drhp" className="bg-slate-50/70 py-12 sm:py-16 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-blue-600 uppercase mb-2">
              <span className="w-6 h-0.5 bg-blue-600" />
              <span>Upcoming Public Listings</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              DRHP Filed Companies
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Pre-IPO companies that have submitted their official Draft Red Herring Prospectus (DRHP) to SEBI.
            </p>
          </div>

          <Link
            href="/drhp-filed"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1.5 group shrink-0"
          >
            <span>View All DRHP Companies</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* DRHP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {drhpStocks.map((stock) => (
            <div
              key={stock.id}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm">
                    {stock.name.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>SEBI Filed</span>
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-blue-600 transition-colors leading-snug">
                  {stock.name}
                </h3>
                <span className="text-[11px] font-semibold text-slate-400 block mb-3 uppercase tracking-wider">
                  {stock.sector}
                </span>

                <p className="text-xs sm:text-sm text-slate-600 font-normal line-clamp-3 leading-relaxed mb-5">
                  {stock.description}
                </p>

                <div className="bg-slate-50 rounded-lg p-4 space-y-2.5 border border-slate-100 text-xs sm:text-sm text-slate-700">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Indicative Price</span>
                    <span className="font-bold text-slate-900 tabular-nums">₹{stock.price.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">DRHP Status</span>
                    <span className="font-semibold text-blue-700 text-xs bg-blue-50 px-2 py-0.5 rounded border border-blue-100">{stock.drhpStatus}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-500 font-medium">Estimated Market Cap</span>
                    <span className="font-semibold text-slate-900 tabular-nums">{stock.marketCap}</span>
                  </div>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-slate-100">
                <Link
                  href={`/shares/${stock.id}`}
                  className="w-full block py-2.5 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs sm:text-sm font-semibold transition-colors text-center shadow-xs"
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
