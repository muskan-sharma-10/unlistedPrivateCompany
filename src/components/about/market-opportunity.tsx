import React from 'react';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import { TrendingUp, Award, Users, Compass, BarChart3, LineChart } from 'lucide-react';

export const MarketOpportunity: React.FC = () => {
  const opportunityDrivers = [
    {
      number: '01',
      title: 'Prolonged Private Growth Cycle',
      description:
        'India’s most dynamic enterprises across consumer technology, financial services, green energy, and advanced manufacturing are staying private significantly longer, building substantial balance sheets and cash flows before listing.',
    },
    {
      number: '02',
      title: 'The Pre-IPO Ecosystem',
      description:
        'The bridge between private venture capital and public stock exchanges has evolved into a distinct investment phase. Companies filing Draft Red Herring Prospectuses (DRHP) present unique analytical opportunities for prepared investors.',
    },
    {
      number: '03',
      title: 'ESOP Capital Expansion',
      description:
        'Employee Stock Ownership Plans have become a fundamental compensation pillar across India. Thousands of founders and key executives hold significant equity, driving institutional demand for transparent reference valuations and off-market information.',
    },
    {
      number: '04',
      title: 'Diversification Towards Private Equities',
      description:
        'High-Net-Worth Individuals, family offices, and informed retail participants increasingly seek portfolio diversification beyond listed equities, allocating capital into private enterprise themes with multi-year investment horizons.',
    },
  ];

  return (
    <section id="market-opportunity" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 03 · Macro Context
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            The Market Opportunity: India&apos;s Private Capital Transformation
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Understanding the structural expansion of India&apos;s unlisted corporate sector and why structured research has become essential for modern investors.
          </p>
        </ScrollReveal>

        {/* 4 Opportunity Driver Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {opportunityDrivers.map((item, idx) => (
            <ScrollReveal key={idx} delayMs={idx * 100} className="h-full">
              <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-2xl font-bold text-blue-600/80 group-hover:text-blue-700 transition-colors">
                      {item.number}
                    </span>
                    <span className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-700">
                      <TrendingUp className="w-4 h-4" />
                    </span>
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {item.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-[11px] font-semibold text-blue-700 uppercase tracking-wider">
                  <span>Market Dynamic</span>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* Why Reliable Information Matters Banner */}
        <ScrollReveal delayMs={200} className="mt-10 sm:mt-12">
          <div className="rounded-2xl bg-white border border-slate-200 p-6 sm:p-8 lg:p-10 shadow-xs">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
                  The Imperative for Clarity
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
                  Why Reliable Company Data &amp; Indicative Pricing Are Critical
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Unlike publicly listed equities that feature continuous electronic price discovery on screen-based exchanges, unlisted equity transactions occur bilaterally. In this environment, relying on informal market rumors or unsubstantiated speculation poses significant risk. Sustainable participation requires verified financial statements, disciplined valuation benchmarks, and clear indicative price references.
                </p>
              </div>

              <div className="lg:col-span-4 p-5 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2.5">
                <div className="flex items-center space-x-2 text-xs font-bold text-slate-900">
                  <Compass className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Unlisted Pond&apos;s Role in this Market</span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed font-normal">
                  We serve as an objective information infrastructure—gathering audited filings, monitoring corporate developments, and providing transparency so market participants can conduct independent due diligence.
                </p>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default MarketOpportunity;
