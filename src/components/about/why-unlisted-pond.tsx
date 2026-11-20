import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import {
  Search,
  FileSpreadsheet,
  FileCheck2,
  LineChart,
  Layers,
  BookOpen,
  Headphones,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react';

export const WhyUnlistedPond: React.FC = () => {
  const platformAdvantages = [
    {
      icon: Search,
      title: 'Extensive Discovery Directory',
      desc: 'Track and evaluate 500+ unlisted and pre-IPO enterprises across emerging industrial and consumer sectors.',
      badge: '500+ Companies',
    },
    {
      icon: FileSpreadsheet,
      title: 'Audited Financial Intelligence',
      desc: 'Access multi-year audited financial records, operating margins, EBITDA growth, and balance sheet metrics.',
      badge: 'Audited Statements',
    },
    {
      icon: FileCheck2,
      title: 'DRHP & Regulatory Filing Tracking',
      desc: 'Stay informed with structured breakdowns of Draft Red Herring Prospectus filings and public listing roadmaps.',
      badge: 'SEBI Filings',
    },
    {
      icon: LineChart,
      title: 'Indicative Market Price Tracking',
      desc: 'Evaluate transparent reference price markers compiled from broader over-the-counter transaction observations.',
      badge: 'Reference Trends',
    },
    {
      icon: Layers,
      title: 'Industry-Wise Sector Screener',
      desc: 'Filter and benchmark peers across specialized industries including FinTech, EV, Defense, Energy, and Healthcare.',
      badge: '20+ Sectors',
    },
    {
      icon: BookOpen,
      title: 'Curated Research Resources',
      desc: 'Benefit from educational guides, sector analysis notes, and valuation frameworks compiled by financial analysts.',
      badge: 'Research Briefs',
    },
    {
      icon: Headphones,
      title: 'Dedicated Concierge Desk Support',
      desc: 'Connect with experienced relationship managers who guide inquiries, documentation, and regulatory compliance.',
      badge: 'Concierge Guidance',
    },
  ];

  return (
    <section id="why-unlisted-pond" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 07 · Core Advantages
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Why Unlisted Pond: Built for Depth. Trusted for Clarity.
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            What sets our platform apart is not just the breadth of unlisted companies covered, but the uncompromising analytical rigor and transparency applied to every data point.
          </p>
        </ScrollReveal>

        {/* 7 Capabilities Grid + 1 Featured Summary Card */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {platformAdvantages.map((item, idx) => {
            const Icon = item.icon;
            const staggerDelay = (idx % 4) * 80;

            return (
              <ScrollReveal key={idx} delayMs={staggerDelay} className="h-full">
                <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-500/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-blue-700 transition-colors flex items-center space-x-1">
                      <span>Verified Infrastructure</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}

          {/* 8th Card: High-Impact Commitment Card */}
          <ScrollReveal delayMs={240} className="h-full">
            <div className="h-full rounded-2xl bg-[#0B132B] text-white p-6 sm:p-7 border border-slate-800 shadow-xs flex flex-col justify-between">
              <div className="space-y-3.5">
                <div className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>The Unlisted Pond Standard</span>
                </div>
                <h3 className="text-lg font-bold text-white leading-snug">
                  Zero Speculation. Complete Objectivity.
                </h3>
                <p className="text-xs text-slate-300 leading-relaxed">
                  We don&apos;t just present figures; we contextualize them within regulatory parameters, statutory filing disclosures, and verified industry trends.
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-800">
                <Link
                  href="/shares"
                  className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-400 hover:text-white transition-colors"
                >
                  <span>Explore All Capabilities</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default WhyUnlistedPond;
