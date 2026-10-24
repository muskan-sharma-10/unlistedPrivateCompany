'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Globe, ArrowRight, SlidersHorizontal, Headphones } from 'lucide-react';

export const AppBanner: React.FC = () => {
  const triggerEnquiry = (stockName?: string) => {
    if (typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('open-enquiry-modal', {
          detail: { stockName: stockName || '' }
        })
      );
    }
  };

  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="bg-[#0B132B] rounded-2xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden relative shadow-xl border border-slate-800">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left Column: Web Platform Value Proposition */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-flex items-center space-x-1.5 text-xs font-semibold uppercase tracking-wider text-blue-400 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                <Globe className="w-3.5 h-3.5" />
                <span>Institutional Web Platform</span>
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Real-Time Discovery, <br />
                <span className="text-blue-400">Direct on Your Browser</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                Track live indicative unlisted share prices, analyze DRHP filings, and execute secure NSDL &amp; CDSL off-market Demat transfers seamlessly through our institutional web portal.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-1 text-sm text-slate-200 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Verified Demat Settlement (NSDL / CDSL)</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>267+ Indian pre-IPO &amp; unlisted stocks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct RM &amp; institutional dealing desk</span>
                </div>
              </div>

              {/* Web Platform Action Buttons */}
              <div className="flex flex-wrap items-center gap-3.5 pt-3">
                <Link
                  href="/screener"
                  className="px-5 py-3 rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-semibold text-sm flex items-center space-x-2 transition-all shadow-xs active:scale-[0.99]"
                >
                  <SlidersHorizontal className="w-4 h-4" />
                  <span>Explore Sector Screener</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <button
                  type="button"
                  onClick={() => triggerEnquiry()}
                  className="px-5 py-3 rounded-lg bg-slate-800/90 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 font-semibold text-sm flex items-center space-x-2 transition-all shadow-xs active:scale-[0.99]"
                >
                  <Headphones className="w-4 h-4 text-blue-400" />
                  <span>Connect With Dealing Desk</span>
                </button>
              </div>
            </div>

            {/* Right Column: Web Terminal / Browser Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-md bg-slate-900 border border-slate-700/80 rounded-xl shadow-2xl overflow-hidden relative">
                {/* Browser Window Header Bar */}
                <div className="bg-slate-950/80 px-4 py-3 border-b border-slate-800 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                  </div>
                  <div className="flex items-center space-x-1.5 px-3 py-1 rounded bg-slate-900 border border-slate-800 text-[11px] text-slate-400 font-mono">
                    <Globe className="w-3 h-3 text-blue-400" />
                    <span>privatemarket.in/screener</span>
                  </div>
                  <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Live Feed
                  </span>
                </div>

                {/* Terminal Watchlist Content */}
                <div className="p-4 space-y-3 bg-[#0B132B]/90">
                  <div className="flex items-center justify-between text-xs text-slate-400 pb-1 border-b border-slate-800/80 font-medium">
                    <span>Institutional Watchlist</span>
                    <span className="text-[11px] text-blue-400 font-mono">267+ Tracked</span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex justify-between items-center hover:border-blue-500/50 transition-colors">
                    <div>
                      <div className="font-semibold text-white text-xs">NSE India Limited</div>
                      <div className="text-[10px] text-slate-400">Financial Markets · Min 100 shares</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white text-xs tabular-nums">₹ 2,095</div>
                      <span className="text-[10px] text-emerald-400 font-medium tabular-nums">+2.4% Indicative</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex justify-between items-center hover:border-blue-500/50 transition-colors">
                    <div>
                      <div className="font-semibold text-white text-xs">SBI Mutual Fund</div>
                      <div className="text-[10px] text-slate-400">Asset Management · Min 50 shares</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white text-xs tabular-nums">₹ 575</div>
                      <span className="text-[10px] text-emerald-400 font-medium tabular-nums">+1.8% Indicative</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/60 border border-slate-700/60 flex justify-between items-center hover:border-blue-500/50 transition-colors">
                    <div>
                      <div className="font-semibold text-white text-xs">Zepto Private Limited</div>
                      <div className="text-[10px] text-slate-400">Quick Commerce · Pre-IPO Round</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white text-xs tabular-nums">₹ 39</div>
                      <span className="text-[10px] text-emerald-400 font-medium tabular-nums">+3.2% Indicative</span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => triggerEnquiry()}
                    className="w-full py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg text-center mt-2 transition-all shadow-xs text-xs flex items-center justify-center space-x-1.5 active:scale-[0.99]"
                  >
                    <span>Enquire to Buy / Sell</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AppBanner;
