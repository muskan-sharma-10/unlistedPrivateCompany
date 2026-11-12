'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, BookOpen, ShieldCheck, ArrowRight } from 'lucide-react';

import { HOME_FAQS } from '@/data/home-faqs';
export { HOME_FAQS };

export const MarketGuideSection: React.FC = () => {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-8 sm:mb-10">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Investor Knowledge Hub
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            Understanding Unlisted Shares &amp; Private Share Trading in India
          </h2>
          <p className="text-sm text-slate-600 mt-2 leading-relaxed">
            Essential guidance on how private company shares, pre-IPO investments, indicative pricing, and off-market Demat settlement work in the Indian financial market.
          </p>
        </div>

        {/* 2-Column Layout: Key FAQs on Left, Educational Highlights on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Interactive FAQs */}
          <div className="lg:col-span-8 space-y-3">
            {HOME_FAQS.map((faq, idx) => {
              const isOpen = openIdx === idx;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-slate-200 overflow-hidden transition-all shadow-2xs hover:border-blue-500/60"
                >
                  <button
                    type="button"
                    onClick={() => setOpenIdx(isOpen ? null : idx)}
                    className="w-full p-4 sm:p-5 text-left font-semibold text-xs sm:text-sm text-slate-900 flex justify-between items-center bg-white hover:bg-slate-50/70 cursor-pointer transition-colors"
                  >
                    <span className="pr-4 leading-snug">{faq.question}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-blue-600' : ''
                      }`}
                    />
                  </button>
                  {isOpen && (
                    <div className="px-4 pb-4 sm:px-5 sm:pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 font-normal">
                      {faq.answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Right Column: Contextual Quick Reference Card */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white rounded-xl p-5 sm:p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-2 text-blue-700">
                <BookOpen className="w-5 h-5" />
                <h3 className="font-bold text-sm text-slate-900">Key Investor Takeaways</h3>
              </div>

              <ul className="space-y-3 text-xs text-slate-600 leading-relaxed">
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>100% Legal &amp; Compliant:</strong> Off-market transfers follow standard SEBI and Depository (NSDL/CDSL) procedures.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Direct Demat Credit:</strong> Shares are transferred directly to your existing trading/Demat account within 24 hours of settlement.
                  </span>
                </li>
                <li className="flex items-start space-x-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>
                    <strong>Verified Pricing:</strong> No hidden marks. All prices are verified with our institutional relationship managers prior to booking.
                  </span>
                </li>
              </ul>

              <div className="pt-3 border-t border-slate-100 flex flex-col space-y-2">
                <Link
                  href="/shares"
                  className="inline-flex items-center justify-between text-xs font-semibold text-blue-700 hover:text-blue-900"
                >
                  <span>Explore All Unlisted Shares</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/screener"
                  className="inline-flex items-center justify-between text-xs font-semibold text-blue-700 hover:text-blue-900"
                >
                  <span>Filter by Sector Screener</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link
                  href="/drhp-filed"
                  className="inline-flex items-center justify-between text-xs font-semibold text-blue-700 hover:text-blue-900"
                >
                  <span>Upcoming IPOs (DRHP Filed)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MarketGuideSection;
