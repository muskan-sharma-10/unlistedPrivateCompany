import React from 'react';
import Link from 'next/link';
import {
  Calculator,
  Landmark,
  TrendingUp,
  Briefcase,
  CheckCircle2,
  ArrowRight,
  Info
} from 'lucide-react';
import { PRACTICE_SERVICES, TeamServiceOffering } from '@/data/team';
import { ScrollReveal } from './scroll-reveal';

const iconMap = {
  calculator: Calculator,
  landmark: Landmark,
  'trending-up': TrendingUp,
  briefcase: Briefcase
};

export const ExpertiseSection: React.FC = () => {
  return (
    <section id="services" className="py-14 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 space-y-12 sm:space-y-16">
        {/* Section Header with Scroll Reveal */}
        <ScrollReveal className="max-w-3xl">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Practice Areas &amp; Capabilities
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Comprehensive Advisory &amp; Financial Services
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Our leadership team provides disciplined financial services, statutory compliance, credit syndication, and growth advisory designed to support corporate requirements at every maturity stage.
          </p>
        </ScrollReveal>

        {/* 4 Core Services Grid with Staggered Scroll Reveal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {PRACTICE_SERVICES.map((service: TeamServiceOffering, idx: number) => {
            const Icon = iconMap[service.iconName] || Briefcase;
            const delay = (idx % 2) * 120; // 0ms, 120ms staggered

            return (
              <ScrollReveal key={service.id} delayMs={delay} className="h-full">
                <div className="bg-slate-50/70 rounded-xl p-6 sm:p-8 border border-slate-200 shadow-2xs hover:border-blue-500/80 hover:shadow-md transition-all duration-300 flex flex-col justify-between h-full">
                  <div className="space-y-5">
                    {/* Top Bar with Icon & Category */}
                    <div className="flex items-center justify-between">
                      <div className="w-12 h-12 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center">
                        <Icon className="w-6 h-6" />
                      </div>
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2.5 py-1 rounded bg-white text-slate-600 border border-slate-200">
                        {service.category}
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div className="space-y-2">
                      <h3 className="text-lg sm:text-xl font-bold text-slate-900">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                        {service.description}
                      </p>
                    </div>

                    {/* Key Deliverables */}
                    <div className="pt-3 border-t border-slate-200/80 space-y-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-1.5">
                        Key Practice Focus:
                      </span>
                      {service.keyDeliverables.map((item, dIdx) => (
                        <div key={dIdx} className="flex items-start space-x-2.5 text-xs sm:text-[13px] text-slate-700">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Consultation Link */}
                  <div className="pt-6 mt-6 border-t border-slate-200/80">
                    <Link
                      href={`/contact-us?service=${service.id}`}
                      className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors"
                    >
                      <span>Inquire about {service.title}</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Regulatory Disclosure & Professional Standards Note */}
        <ScrollReveal delayMs={150}>
          <div className="p-5 sm:p-6 rounded-xl bg-slate-50/70 border border-slate-200 shadow-2xs flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="flex items-start space-x-3 text-slate-600 text-xs sm:text-sm leading-relaxed max-w-4xl">
              <Info className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
              <span>
                All corporate finance, debt syndication, equity structuring, and chartered accountancy services are executed in full adherence to the regulatory guidelines of the Institute of Chartered Accountants of India (ICAI) and applicable statutory frameworks.
              </span>
            </div>
            <Link
              href="/contact-us"
              className="px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-400 text-slate-700 hover:text-blue-700 text-xs font-semibold whitespace-nowrap shadow-2xs transition-colors shrink-0"
            >
              Contact Compliance Desk
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ExpertiseSection;
