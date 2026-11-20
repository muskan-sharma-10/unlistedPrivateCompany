import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import { ArrowRight, Search, FileText, Phone, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const AboutCTA: React.FC = () => {
  return (
    <section className="bg-[#0B132B] text-white py-16 sm:py-20 lg:py-24 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle brand lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 relative z-10">
        <ScrollReveal>
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 sm:p-12 lg:p-14 backdrop-blur-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Left Column: Heading, Subtitle & Key Commitments */}
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <span className="w-5 h-[2px] bg-blue-500" />
                <span>START YOUR PRIVATE MARKET DISCOVERY</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Explore Beyond Listed Markets.
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Step into India&apos;s most comprehensive platform for unlisted equities, pre-IPO enterprises, and institutional research. Evaluate verified company fundamentals, track DRHP filings, and connect with our relationship desk.
              </p>

              {/* Value Indicators */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>500+ Unlisted companies categorized</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Audited financials &amp; DRHP tracking</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Transparent indicative market reference prices</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Dedicated concierge dealing desk guidance</span>
                </div>
              </div>
            </div>

            {/* Right Column: 3 Functional CTA Action Buttons */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col space-y-3 sm:min-w-[280px]">
              <Link
                href="/shares"
                className="w-full px-6 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm shadow-md hover:shadow-primary/25 transition-all text-center flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <Search className="w-4 h-4" />
                <span>Explore Unlisted Shares</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/research"
                className="w-full px-6 py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white font-semibold text-sm border border-slate-700 transition-all text-center flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <FileText className="w-4 h-4 text-blue-400" />
                <span>Explore Company Research</span>
              </Link>

              <Link
                href="/contact-us"
                className="w-full px-6 py-3 rounded-xl bg-transparent hover:bg-slate-800/60 text-slate-300 hover:text-white font-medium text-xs sm:text-sm border border-slate-800 hover:border-slate-700 transition-all text-center flex items-center justify-center space-x-2 focus:outline-none"
              >
                <Phone className="w-3.5 h-3.5 text-blue-400" />
                <span>Connect With Our Team</span>
              </Link>
            </div>
          </div>
        </ScrollReveal>

        {/* Regulatory Disclosure Strip */}
        <div className="mt-8 p-4 rounded-xl bg-slate-900/60 border border-slate-800/80 text-[11px] text-slate-400 leading-relaxed flex items-start space-x-2.5">
          <ShieldCheck className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
          <span>
            <strong className="text-slate-300">Statutory Notice:</strong> Unlisted Pond is a financial research and information discovery platform. We are not a recognized stock exchange, broker, or SEBI-registered investment advisor. We do not provide financial advice, guarantee returns, or predict IPO listing outcomes. All unlisted equity investments carry substantial risks including illiquidity and potential capital loss.
          </span>
        </div>
      </div>
    </section>
  );
};

export default AboutCTA;
