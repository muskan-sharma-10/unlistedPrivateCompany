'use client';

import React from 'react';
import { MessageSquare, CreditCard, CheckCircle2 } from 'lucide-react';

interface HowItWorksProps {
  onOpenEnquiry?: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = ({ onOpenEnquiry }) => {
  return (
    <section id="how" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="mb-8 sm:mb-10">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Execution Process
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            From Enquiry to Settlement
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            A secure, institutional concierge workflow — complete with end-to-end documentation and demat transfer.
          </p>
        </div>

        {/* 3 Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between hover:border-blue-500/80 hover:shadow-xs transition-all">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center tabular-nums">
                  1
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Consult with Market Specialist
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Connect with an experienced relationship manager. Receive current market depth, lot sizes, indicative pricing, and lot availability.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between hover:border-blue-500/80 hover:shadow-xs transition-all">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                  <CreditCard className="w-5 h-5" />
                </div>
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center tabular-nums">
                  2
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Settlement &amp; Verification
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Execute formal deal confirmation. Funds are routed via verified corporate banking channels with complete deal documentation.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-xl bg-slate-50/70 border border-slate-200 flex flex-col justify-between hover:border-blue-500/80 hover:shadow-xs transition-all">
            <div>
              <div className="flex items-center justify-between mb-5">
                <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <span className="w-7 h-7 rounded-full bg-blue-100 text-blue-800 text-xs font-bold flex items-center justify-center tabular-nums">
                  3
                </span>
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">
                Direct Demat Credit
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Shares are transferred directly to your NSDL/CDSL demat account within 24 hours of settlement. No intermediary holding risk.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
