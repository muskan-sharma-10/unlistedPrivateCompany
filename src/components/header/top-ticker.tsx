'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const TopTicker: React.FC = () => {
  return (
    <div className="bg-[#05171d] text-[#cbd5e1] text-[12px] sm:text-[12.5px] border-b border-[#0d2e38] py-2 overflow-hidden select-none">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 flex items-center justify-between gap-4">
        {/* Compliance Marquee with authentic unlistedzone.com text */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-compliance-marquee flex items-center gap-6 whitespace-nowrap">
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a887]" />
              <span>An <strong className="text-white font-semibold">information platform</strong> for unlisted &amp; pre-IPO shares</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a887]/60" />
            <span>
              <strong className="text-[#2dd4bf] font-semibold">Not</strong> a SEBI-recognised stock exchange or trading platform
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a887]/60" />
            <span>
              All prices are <strong className="text-white font-semibold">indicative</strong>
            </span>

            {/* Repeated for smooth infinite ticker */}
            <span className="w-2 h-2 rounded-full bg-slate-600 mx-4" />

            <span className="inline-flex items-center gap-1.5" aria-hidden="true">
              <ShieldCheck className="w-3.5 h-3.5 text-[#00a887]" />
              <span>An <strong className="text-white font-semibold">information platform</strong> for unlisted &amp; pre-IPO shares</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a887]/60" />
            <span aria-hidden="true">
              <strong className="text-[#2dd4bf] font-semibold">Not</strong> a SEBI-recognised stock exchange or trading platform
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#00a887]/60" />
            <span aria-hidden="true">
              All prices are <strong className="text-white font-semibold">indicative</strong>
            </span>
          </div>
        </div>

        {/* Live Market Date Badge */}
        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 shrink-0 font-medium pl-4 border-l border-[#0d2e38]">
          <span className="w-2 h-2 rounded-full bg-[#00a887] pulse-dot" />
          <span>Ref · 14 Oct 2026</span>
        </div>
      </div>
    </div>
  );
};

export default TopTicker;
