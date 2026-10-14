'use client';

import React from 'react';
import { MessageSquare, CreditCard, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onOpenEnquiry?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="how" className="py-14 sm:py-16 bg-white border-b border-[#dce8e5]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="mb-10">
          <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#00a887] bg-[#e6f7f3] px-3.5 py-1 rounded-full mb-2.5">
            How it works
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#082029] leading-tight">
            From enquiry to <em className="font-serif italic text-[#00a887] font-medium">settlement</em>
          </h2>
          <p className="text-[14.5px] text-gray-500 mt-1.5 max-w-[38em]">
            A guided, concierge process — not a self-serve exchange.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-7 rounded-2xl bg-[#f3f8f7] border border-[#dce8e5] flex flex-col justify-between hover:border-[#00a887] hover:shadow-lg hover:shadow-[#00a887]/5 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#dce8e5] text-[#00a887] flex items-center justify-center shadow-xs">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <span className="w-8 h-8 rounded-full bg-[#00a887]/10 text-[#00a887] text-[13px] font-bold flex items-center justify-center">
                  1
                </span>
              </div>
              <h3 className="font-bold text-[20px] text-[#082029] mb-2.5">
                Speak to our team
              </h3>
              <p className="text-[14.5px] text-gray-600 leading-relaxed">
                Tell a relationship manager what you want to buy or sell. They share the current indicative price and walk you through the share.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-7 rounded-2xl bg-[#f3f8f7] border border-[#dce8e5] flex flex-col justify-between hover:border-[#00a887] hover:shadow-lg hover:shadow-[#00a887]/5 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#dce8e5] text-[#00a887] flex items-center justify-center shadow-xs">
                  <CreditCard className="w-6 h-6" />
                </div>
                <span className="w-8 h-8 rounded-full bg-[#00a887]/10 text-[#00a887] text-[13px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
              <h3 className="font-bold text-[20px] text-[#082029] mb-2.5">
                Settlement
              </h3>
              <p className="text-[14.5px] text-gray-600 leading-relaxed">
                On agreed terms, payment is made to our company bank account and our team begins processing your deal with full documentation.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-7 rounded-2xl bg-[#f3f8f7] border border-[#dce8e5] flex flex-col justify-between hover:border-[#00a887] hover:shadow-lg hover:shadow-[#00a887]/5 transition-all">
            <div>
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-[#dce8e5] text-[#00a887] flex items-center justify-center shadow-xs">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <span className="w-8 h-8 rounded-full bg-[#00a887]/10 text-[#00a887] text-[13px] font-bold flex items-center justify-center">
                  3
                </span>
              </div>
              <h3 className="font-bold text-[20px] text-[#082029] mb-2.5">
                Shares delivered
              </h3>
              <p className="text-[14.5px] text-gray-600 leading-relaxed">
                Once settled, shares are transferred to your demat — typically within 24 hours. We never route shares through third-party accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
