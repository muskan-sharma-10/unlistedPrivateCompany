import React from 'react';
import Link from 'next/link';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import {
  Search,
  FileText,
  Coins,
  FileCheck2,
  BarChart2,
  LineChart,
  Layers,
  BookOpen,
  ArrowRight,
} from 'lucide-react';

export const WhatWeDo: React.FC = () => {
  const capabilities = [
    {
      id: 'unlisted-shares',
      icon: Search,
      title: '1. Unlisted Shares Discovery',
      description:
        'A comprehensive, searchable directory tracking hundreds of unlisted Indian companies across technology, manufacturing, green energy, and consumer brands.',
      linkText: 'Explore Directory',
      href: '/shares',
    },
    {
      id: 'pre-ipo',
      icon: LineChart,
      title: '2. Pre-IPO Company Research',
      description:
        'Deep fundamental company profiles evaluating growth trajectories, capitalization structures, governance standards, and readiness for future public listing.',
      linkText: 'View Pre-IPO Shares',
      href: '/shares',
    },
    {
      id: 'esop-shares',
      icon: Coins,
      title: '3. ESOP Shares Information',
      description:
        'Structured information resources and valuation context designed for employees, founders, and shareholders exploring off-market equity mechanisms and liquidity.',
      linkText: 'ESOP Guidance',
      href: '/contact-us',
    },
    {
      id: 'drhp-tracking',
      icon: FileCheck2,
      title: '4. DRHP Filed Company Tracking',
      description:
        'Timely monitoring and analytical breakdowns of Draft Red Herring Prospectus filings submitted to SEBI, highlighting issue sizes, promoters, and timelines.',
      linkText: 'Track DRHP Filings',
      href: '/drhp-filed',
    },
    {
      id: 'financial-analysis',
      icon: BarChart2,
      title: '5. Financial & Company Analysis',
      description:
        'Multi-year audited balance sheets, profit and loss statements, cash flow records, EBITDA metrics, and key performance indicators extracted from official filings.',
      linkText: 'Analyze Companies',
      href: '/shares',
    },
    {
      id: 'indicative-pricing',
      icon: LineChart,
      title: '6. Indicative Market Price Information',
      description:
        'Transparent reference price ranges compiled from broader bilateral market trends to provide an objective starting point for investor evaluation.',
      linkText: 'View Indicative Prices',
      href: '/shares',
    },
    {
      id: 'sector-insights',
      icon: Layers,
      title: '7. Sector & Industry Insights',
      description:
        'Specialized cross-industry classification and screeners spanning FinTech, EV & Mobility, Defense, Healthcare, Green Energy, and Consumer Internet.',
      linkText: 'Open Sector Screener',
      href: '/screener',
    },
    {
      id: 'research-reports',
      icon: BookOpen,
      title: '8. Research Reports',
      description:
        'Institutional research notes and sector summaries curated by financial analysts to unpack corporate developments, capital raises, and industry shifts.',
      linkText: 'Read Research',
      href: '/research',
    },
  ];

  return (
    <section id="what-we-do" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 04 · Platform Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            What We Do: Empowering Private Market Discovery
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            From early-stage company identification to in-depth financial analysis and regulatory tracking, Unlisted Pond provides the information infrastructure required to navigate India&apos;s private market.
          </p>
        </ScrollReveal>

        {/* 8 Visually Engaging Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((item, idx) => {
            const Icon = item.icon;
            const staggerDelay = (idx % 4) * 100;

            return (
              <ScrollReveal key={item.id} delayMs={staggerDelay} className="h-full">
                <div className="h-full bg-slate-50/70 rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-500/80 hover:bg-white shadow-2xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <Icon className="w-5 h-5" />
                    </div>

                    <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug group-hover:text-blue-700 transition-colors">
                      {item.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-slate-200/80">
                    <Link
                      href={item.href}
                      className="inline-flex items-center space-x-1.5 text-xs font-semibold text-blue-700 group-hover:text-blue-900 transition-colors"
                    >
                      <span>{item.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDo;
