'use client';

import React from 'react';
import { Smartphone, Download, CheckCircle, Shield } from 'lucide-react';

export const AppBanner: React.FC = () => {
  return (
    <section className="bg-white py-12 sm:py-16 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="bg-[#0B132B] rounded-2xl p-8 sm:p-12 lg:p-16 text-white overflow-hidden relative shadow-xl border border-slate-800">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center relative z-10">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-6">
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-blue-400 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20">
                Mobile Platform
              </span>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Your Watchlist, <br />
                <span className="text-blue-400">Everywhere You Go</span>
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed max-w-xl">
                Track live indicative unlisted share prices, analyze DRHP filings, and receive verified trade confirmations directly on your mobile device.
              </p>

              <div className="flex flex-wrap items-center gap-5 pt-1 text-sm text-slate-200 font-medium">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Real-time price revisions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>267+ Indian pre-IPO stocks</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Direct RM relationship desk</span>
                </div>
              </div>

              {/* Download Badges */}
              <div className="flex flex-wrap items-center gap-4 pt-3">
                <div className="px-5 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center space-x-3 cursor-pointer transition-all shadow-xs">
                  <Smartphone className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Download on
                    </div>
                    <div className="font-semibold text-sm text-white">
                      Google Play
                    </div>
                  </div>
                </div>

                <div className="px-5 py-3 rounded-lg bg-slate-800/80 hover:bg-slate-800 border border-slate-700 flex items-center space-x-3 cursor-pointer transition-all shadow-xs">
                  <Download className="w-6 h-6 text-blue-400" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-400 font-medium">
                      Download on
                    </div>
                    <div className="font-semibold text-sm text-white">
                      Apple App Store
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-xs bg-slate-900 border-2 border-slate-700 rounded-2xl p-4 shadow-xl relative">
                {/* Notch */}
                <div className="w-20 h-3.5 bg-slate-800 rounded-full mx-auto mb-4" />

                {/* Mock Screen Content */}
                <div className="bg-[#0B132B] rounded-xl p-4 text-xs space-y-3 border border-slate-800">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="font-bold text-white text-xs">Market Watchlist</span>
                    <span className="text-[10px] text-emerald-400 flex items-center gap-1 font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Live
                    </span>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white text-xs">NSE India Limited</div>
                      <div className="text-[10px] text-slate-400">Financial Markets</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white tabular-nums">₹ 2,095</div>
                      <span className="text-[10px] text-emerald-400 font-medium tabular-nums">+2.4%</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white text-xs">SBI Mutual Fund</div>
                      <div className="text-[10px] text-slate-400">Asset Management</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white tabular-nums">₹ 575</div>
                      <span className="text-[10px] text-emerald-400 font-medium tabular-nums">+1.8%</span>
                    </div>
                  </div>

                  <div className="p-2.5 rounded-lg bg-slate-800/50 border border-slate-700/50 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white text-xs">Zepto Private Limited</div>
                      <div className="text-[10px] text-slate-400">Quick Commerce</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-white tabular-nums">₹ 39</div>
                      <span className="text-[10px] text-emerald-400 font-medium tabular-nums">+3.2%</span>
                    </div>
                  </div>

                  <button className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-center mt-2 transition-colors cursor-pointer text-xs">
                    Enquire to Buy / Sell
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
