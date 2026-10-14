'use client';

import React from 'react';
import { Smartphone, Download, CheckCircle, Shield } from 'lucide-react';

export const AppBanner: React.FC = () => {
  return (
    <section className="bg-white py-20 sm:py-28 lg:py-36 border-b border-[#dce8e5]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="bg-gradient-to-br from-[#082029] via-[#0b2b36] to-[#041318] rounded-[2.8rem] p-12 sm:p-16 lg:p-24 text-white overflow-hidden relative shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-[550px] h-[550px] bg-[#00a887]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center relative z-10">
            {/* Left text */}
            <div className="lg:col-span-7 space-y-8">
              <span className="text-xs sm:text-sm font-semibold uppercase tracking-wider text-[#2dd4bf] px-4 py-2 rounded-full bg-white/10 border border-white/15">
                On The Go
              </span>

              <h2 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-semibold tracking-tight text-white leading-tight">
                Your watchlist, in the <br />
                <span className="text-[#2dd4bf] italic font-serif">Private Market App</span>
              </h2>

              <p className="text-lg sm:text-xl text-slate-200 font-normal leading-relaxed max-w-2xl">
                Track live indicative unlisted share prices, analyze DRHP documents, and receive deal notifications straight to your smartphone.
              </p>

              <div className="flex flex-wrap items-center gap-7 pt-2 text-base text-slate-100 font-medium">
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Real-time price revisions</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>500+ Indian pre-IPO stocks</span>
                </div>
                <div className="flex items-center space-x-2.5">
                  <CheckCircle className="w-5 h-5 text-emerald-400" />
                  <span>Direct RM WhatsApp desk</span>
                </div>
              </div>

              {/* Download Badges */}
              <div className="flex flex-wrap items-center gap-5 pt-4">
                <div className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center space-x-4 cursor-pointer transition-all shadow-md">
                  <Smartphone className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                      Download on
                    </div>
                    <div className="font-semibold text-base text-white">
                      Google Play
                    </div>
                  </div>
                </div>

                <div className="px-7 py-4 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center space-x-4 cursor-pointer transition-all shadow-md">
                  <Download className="w-8 h-8 text-white" />
                  <div>
                    <div className="text-[11px] uppercase tracking-wider text-slate-300 font-medium">
                      Download on
                    </div>
                    <div className="font-semibold text-base text-white">
                      App Store
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Phone Mockup */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="w-full max-w-sm bg-slate-900 border-4 border-slate-700 rounded-[3rem] p-6 shadow-2xl relative">
                {/* Notch */}
                <div className="w-28 h-4.5 bg-slate-800 rounded-full mx-auto mb-6" />

                {/* Mock Screen Content */}
                <div className="bg-[#082029] rounded-2xl p-5 text-xs space-y-3.5">
                  <div className="flex items-center justify-between border-b border-white/10 pb-2.5">
                    <span className="font-semibold text-white text-sm">Watchlist</span>
                    <span className="text-[11px] text-teal-400">Live</span>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">NSE India</div>
                      <div className="text-[10px] text-gray-400">Financials</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">₹ 2,095</div>
                      <span className="text-[10px] text-emerald-400">+2.4%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">SBI Mutual Fund</div>
                      <div className="text-[10px] text-gray-400">Asset Mgmt</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">₹ 575</div>
                      <span className="text-[10px] text-emerald-400">+1.8%</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 flex justify-between items-center">
                    <div>
                      <div className="font-semibold text-white">Zepto</div>
                      <div className="text-[10px] text-gray-400">Pre-IPO</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-white">₹ 39</div>
                      <span className="text-[10px] text-emerald-400">+3.2%</span>
                    </div>
                  </div>

                  <button className="w-full py-2.5 bg-[#00a887] text-white font-semibold rounded-xl text-center mt-3">
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
