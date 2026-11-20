import React from 'react';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import { Sparkles, LineChart, Database, Cpu, GraduationCap, Network } from 'lucide-react';

export const FutureDirection: React.FC = () => {
  const futureHorizons = [
    {
      id: 'better-research',
      icon: LineChart,
      title: 'Advanced Private Market Research',
      subtitle: 'Deeper Valuation Modeling & Governance Frameworks',
      description:
        'Developing proprietary valuation comparison matrices, standardized corporate governance scorecards, and institutional peer benchmarks to help investors evaluate unlisted enterprises with greater statistical precision.',
      status: 'Research Roadmap',
    },
    {
      id: 'comprehensive-intelligence',
      icon: Database,
      title: 'Enriched Company Intelligence',
      subtitle: 'Broader Cap-Table Insights & Corporate Action Tracking',
      description:
        'Expanding automated tracking of corporate actions, secondary private transactions, funding round details, and automated MCA registry updates to deliver near real-time visibility into capital changes.',
      status: 'Intelligence Pipeline',
    },
    {
      id: 'digital-discovery',
      icon: Cpu,
      title: 'Enhanced Digital Discovery Tools',
      subtitle: 'Next-Generation Screener Filters & Valuation Analytics',
      description:
        'Engineering advanced custom screening filters, automated watchlist alerts, portfolio monitoring views, and historical valuation chart tools to streamline how investors track their target companies.',
      status: 'Tooling Expansion',
    },
    {
      id: 'investor-education',
      icon: GraduationCap,
      title: 'Structured Investor Education',
      subtitle: 'Private Equity Literacy & Regulatory Risk Masterclasses',
      description:
        'Deepening our educational library with in-depth masterclass webinars, risk-assessment frameworks, unlisted tax guidelines, and case studies to foster informed, risk-aware market participation.',
      status: 'Educational Initiative',
    },
    {
      id: 'tech-infrastructure',
      icon: Network,
      title: 'Technology-Driven Market Information',
      subtitle: 'Automated Pipelines & Real-Time Inquiry Tracking',
      description:
        'Upgrading our underlying data architecture and relationship desk systems to ensure faster inquiry response times, seamless documentation verification, and responsive market reference delivery.',
      status: 'Infrastructure Evolution',
    },
  ];

  return (
    <section id="future-direction" className="py-16 sm:py-20 lg:py-24 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 09 · Strategic Direction
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Our Future Direction: Advancing Private Market Intelligence
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            As India&apos;s private capital ecosystem continues to mature, Unlisted Pond is actively investing in next-generation analytical frameworks, digital discovery tools, and educational initiatives.
          </p>
        </ScrollReveal>

        {/* 5 Forward-Looking Roadmap Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureHorizons.map((item, idx) => {
            const Icon = item.icon;
            const isLastOnLg = idx === 4;

            return (
              <ScrollReveal
                key={item.id}
                delayMs={idx * 100}
                className={`h-full ${isLastOnLg ? 'md:col-span-2 lg:col-span-1' : ''}`}
              >
                <div className="h-full bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 hover:border-blue-500/80 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between group">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white transition-all">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-blue-50 text-blue-800 border border-blue-200">
                        {item.status}
                      </span>
                    </div>

                    <div>
                      <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-700 transition-colors">
                        {item.title}
                      </h3>
                      <h4 className="text-xs font-semibold text-blue-600 mt-0.5">
                        {item.subtitle}
                      </h4>
                    </div>

                    <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                      {item.description}
                    </p>
                  </div>

                  <div className="pt-4 mt-4 border-t border-slate-100">
                    <span className="text-[11px] font-medium text-slate-400 group-hover:text-blue-700 transition-colors flex items-center space-x-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-blue-500" />
                      <span>Planned Strategic Development</span>
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Future Note Disclaimer */}
        <ScrollReveal delayMs={200} className="mt-10">
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span className="leading-relaxed">
                Future capabilities represent our active strategic roadmap and development commitments. Capabilities are rolled out progressively subject to rigorous data validation and regulatory compliance.
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap pl-4 sm:pl-0 sm:border-l-0 border-l border-slate-200">
              Roadmap 2026–2027
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default FutureDirection;
