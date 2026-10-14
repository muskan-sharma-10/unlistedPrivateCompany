'use client';

import React from 'react';
import { Zap, BookOpen, Layers, Users } from 'lucide-react';

export const ValueProps: React.FC = () => {
  return (
    <div className="py-7 bg-[#f3f8f7] border-b border-[#dce8e5]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1 */}
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-white border border-[#dce8e5] flex items-center justify-center text-[#00a887] shrink-0 shadow-xs">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-[14.5px] text-[#082029]">
                Quick Transfer
              </div>
              <div className="text-[12.5px] text-gray-500 leading-snug">
                Shares in your demat within 24 hrs of settlement
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-white border border-[#dce8e5] flex items-center justify-center text-[#00a887] shrink-0 shadow-xs">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-[14.5px] text-[#082029]">
                Independent Research
              </div>
              <div className="text-[12.5px] text-gray-500 leading-snug">
                Company breakdowns, financials &amp; valuation notes
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-white border border-[#dce8e5] flex items-center justify-center text-[#00a887] shrink-0 shadow-xs">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-[14.5px] text-[#082029]">
                One of India’s Largest Lists
              </div>
              <div className="text-[12.5px] text-gray-500 leading-snug">
                267+ unlisted, pre-IPO &amp; ESOP names tracked
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-3.5">
            <span className="w-11 h-11 rounded-xl bg-white border border-[#dce8e5] flex items-center justify-center text-[#00a887] shrink-0 shadow-xs">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-[14.5px] text-[#082029]">
                1,00,000+ Investors
              </div>
              <div className="text-[12.5px] text-gray-500 leading-snug">
                Trusted since 2018 — 4.9★ on Google reviews
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProps;
