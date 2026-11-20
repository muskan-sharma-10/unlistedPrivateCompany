import React from 'react';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import { BookOpen, LineChart, Database, ShieldAlert, CheckCircle2 } from 'lucide-react';

export const OurApproach: React.FC = () => {
  const pillars = [
    {
      id: 'research-led',
      number: '01',
      title: 'Research-Led Insights',
      icon: BookOpen,
      tagline: 'Analysis Before Allocation',
      description:
        'We reject unverified market rumors and informal speculation. Every company profile, valuation indicator, and commentary on our platform is anchored in official regulatory filings, audited financial statements, and factual corporate disclosures.',
      keyPoints: [
        'Audited P&L and Balance Sheet aggregation',
        'Standardized operational & financial ratios',
        'Independent examination free from marketing bias',
      ],
    },
    {
      id: 'pricing-transparency',
      number: '02',
      title: 'Transparency in Indicative Pricing',
      icon: LineChart,
      tagline: 'Clear Reference Benchmarks',
      description:
        'Because unlisted shares are not continuously traded on screen-based exchanges, price clarity is vital. We compile transparent indicative price ranges based on broader market transactions, making clear that these are reference markers.',
      keyPoints: [
        'Indicative reference price ranges',
        'Historical price movement tracking',
        'Clear distinction from exchange quotes',
      ],
    },
    {
      id: 'structured-information',
      number: '03',
      title: 'Structured Company Information',
      icon: Database,
      tagline: 'Transforming Data Complexity into Clarity',
      description:
        'Corporate filings, MCA submissions, and DRHP prospectuses often span hundreds of pages. We synthesize, categorize, and present this information in intuitive, standardized digital formats so investors can evaluate companies efficiently.',
      keyPoints: [
        'Structured corporate overview dossiers',
        'DRHP filing breakdowns & key metrics',
        'Cross-industry categorization and peer filters',
      ],
    },
    {
      id: 'investor-awareness',
      number: '04',
      title: 'Informed Investor Awareness',
      icon: ShieldAlert,
      tagline: 'Championing Caution & Compliance',
      description:
        'Investing in unlisted equities carries inherent risks including illiquidity and capital risk. We proactively educate investors, clearly communicate statutory risk disclosures, and encourage thorough independent consultation.',
      keyPoints: [
        'Prominent statutory risk disclosures',
        'Educational insights on unlisted valuation dynamics',
        'Strict adherence to off-market depository guidelines',
      ],
    },
  ];

  return (
    <section id="our-approach" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 05 · Operating Philosophy
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Our Approach: Four Pillars of Integrity &amp; Rigor
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Our operational framework is designed around verifiable data, ethical transparency, and complete respect for regulatory boundaries.
          </p>
        </ScrollReveal>

        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <ScrollReveal key={pillar.id} delayMs={idx * 120} className="h-full">
                <div className="h-full bg-white rounded-2xl p-7 sm:p-9 border border-slate-200 hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between">
                  <div className="space-y-5">
                    {/* Top Row with Number and Icon */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                          <Icon className="w-6 h-6" />
                        </div>
                        <div>
                          <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-blue-700 block">
                            Pillar {pillar.number}
                          </span>
                          <span className="text-xs font-semibold text-slate-500">
                            {pillar.tagline}
                          </span>
                        </div>
                      </div>
                      <span className="font-mono text-3xl font-bold text-slate-200">
                        {pillar.number}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {pillar.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {pillar.description}
                      </p>
                    </div>

                    {/* Bullet Highlights */}
                    <div className="pt-4 border-t border-slate-100 space-y-2">
                      {pillar.keyPoints.map((point, pIdx) => (
                        <div key={pIdx} className="flex items-start space-x-2.5 text-xs text-slate-700">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{point}</span>
                        </div>
                      ))}
                    </div>
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

export default OurApproach;
