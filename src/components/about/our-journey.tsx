import React from 'react';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import { Milestone, Flag, CheckCircle2 } from 'lucide-react';

export const OurJourney: React.FC = () => {
  const milestones = [
    {
      phase: 'Phase 01',
      title: 'Inception & Core Purpose',
      subtitle: 'Addressing the Opacity in India’s Private Markets',
      description:
        'Unlisted Pond was conceived with a clear objective: to bring order, structure, and verifiable financial research to India’s fragmented unlisted share market. We recognized that while private enterprise was expanding rapidly, investors and participants lacked an accessible, institutional-grade information resource.',
      highlights: [
        'Formulation of factual, research-first corporate analysis principles',
        'Direct identification of information gaps across private market sectors',
      ],
    },
    {
      phase: 'Phase 02',
      title: 'Digital Company Directory & Financial Standardization',
      subtitle: 'Transforming Disparate Regulatory Filings into Structured Dossiers',
      description:
        'Pioneered our digital directory to aggregate and standardize company information. By centralizing multi-year audited balance sheets, profit and loss statements, and capitalization metrics from official filings, we established an intuitive benchmark for private market research.',
      highlights: [
        'Launch of standardized company financial profile architecture',
        'Integration of transparent indicative reference pricing markers',
      ],
    },
    {
      phase: 'Phase 03',
      title: 'DRHP Tracking & IPO Readiness Desk',
      subtitle: 'Monitoring the Transition from Private to Public Capital Markets',
      description:
        'Introduced dedicated tracking of Draft Red Herring Prospectuses (DRHPs) filed with SEBI. This initiative provided investors with structural insights into upcoming initial public offerings, issue objectives, promoter holdings, and pre-IPO capital structures.',
      highlights: [
        'Systematic tracking of SEBI DRHP filing submissions and updates',
        'In-depth analytical breakdowns of pre-IPO capital structures',
      ],
    },
    {
      phase: 'Phase 04',
      title: 'Multi-Sector Screening & Directory Expansion',
      subtitle: 'Scaling Coverage Across 500+ Unlisted Enterprises',
      description:
        'Expanded platform coverage to track over 500 unlisted and pre-IPO enterprises across 20+ specialized industries—including FinTech, Renewable Energy, Defense Manufacturing, Electric Mobility, and Consumer Brands—supported by interactive screening tools.',
      highlights: [
        'Launch of specialized sector screener and peer comparison tools',
        'Broader coverage of ESOP dynamics and employee equity frameworks',
      ],
    },
    {
      phase: 'Phase 05',
      title: 'Institutional Governance & Research Deepening',
      subtitle: 'Continuous Evolution Toward Institutional Standards',
      description:
        'Strengthened our concierge relationship support, educational research resources, and compliance frameworks. We continue to prioritize data verification, transparent risk communication, and disciplined support for every platform participant.',
      highlights: [
        'Expanded research reports and educational video insight series',
        'Strict operational compliance with statutory off-market guidelines',
      ],
    },
  ];

  return (
    <section id="our-journey" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 06 · Evolution &amp; Growth
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Our Journey: Built on Continuous Refinement
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            The evolution of Unlisted Pond as an institutional research and discovery platform dedicated to transparency in India&apos;s private markets.
          </p>
        </ScrollReveal>

        {/* Vertical Stepped Timeline */}
        <div className="relative border-l-2 border-blue-100 ml-4 sm:ml-6 lg:ml-8 pl-6 sm:pl-10 space-y-12">
          {milestones.map((item, idx) => (
            <ScrollReveal key={idx} delayMs={idx * 100} className="relative">
              {/* Timeline Marker Dot */}
              <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-6 h-6 rounded-full bg-white border-4 border-blue-600 flex items-center justify-center shadow-xs">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
              </div>

              {/* Milestone Card */}
              <div className="bg-slate-50/70 rounded-2xl p-6 sm:p-8 border border-slate-200 hover:border-blue-500/80 hover:bg-white shadow-2xs hover:shadow-xs transition-all">
                <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                  <span className="font-mono text-xs font-bold px-2.5 py-1 rounded bg-blue-50 text-blue-700 border border-blue-200/80">
                    {item.phase}
                  </span>
                  <span className="text-xs text-slate-400 font-medium">
                    Platform Milestone
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                  {item.title}
                </h3>
                <h4 className="text-xs sm:text-sm font-semibold text-blue-700 mt-0.5 mb-3">
                  {item.subtitle}
                </h4>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal mb-4">
                  {item.description}
                </p>

                <div className="pt-3 border-t border-slate-200/80 grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {item.highlights.map((h, hIdx) => (
                    <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
};

export default OurJourney;
