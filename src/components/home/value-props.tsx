'use client';

import React from 'react';
import { Zap, BookOpen, Layers, Users } from 'lucide-react';

export const ValueProps: React.FC = () => {
  return (
    <div className="py-8 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Item 1 */}
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <Zap className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-sm text-slate-900">
                Direct Demat Transfer
              </div>
              <div className="text-xs text-slate-500 leading-snug">
                Securities credited to your demat within 24 hrs of settlement
              </div>
            </div>
          </div>

          {/* Item 2 */}
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <BookOpen className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-sm text-slate-900">
                Institutional Research
              </div>
              <div className="text-xs text-slate-500 leading-snug">
                Audited balance sheets, DRHP teardowns &amp; valuation metrics
              </div>
            </div>
          </div>

          {/* Item 3 */}
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-sm text-slate-900">
                Extensive Liquidity
              </div>
              <div className="text-xs text-slate-500 leading-snug">
                Over 267+ unlisted, pre-IPO &amp; ESOP securities actively tracked
              </div>
            </div>
          </div>

          {/* Item 4 */}
          <div className="flex items-center gap-3.5">
            <span className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700 shrink-0">
              <Users className="w-5 h-5" />
            </span>
            <div>
              <div className="font-bold text-sm text-slate-900">
                1,00,000+ Investors
              </div>
              <div className="text-xs text-slate-500 leading-snug">
                Institutional &amp; HNI trust since 2018 with 4.9★ rating
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValueProps;
