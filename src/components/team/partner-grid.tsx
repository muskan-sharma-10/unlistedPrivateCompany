import React from 'react';
import { FOUNDER_PROFILES } from '@/data/team';
import { FounderCard } from './partner-card';
import { ScrollReveal } from './scroll-reveal';

export const PartnerGrid: React.FC = () => {
  return (
    <section id="founders" className="py-14 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-200">
      {/* Invisible anchor for backward compatibility */}
      <span id="partners" className="sr-only" aria-hidden="true" />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Founding Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            The Three Founders of Unlisted Pond
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Our founders bring specialized Chartered Accountancy depth across debt and equity finance, corporate finance advisory, and structured capital transactions.
          </p>
        </ScrollReveal>

        {/* Balanced Three-Founder Composition: 3 Columns on Desktop, Single Column on Mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {FOUNDER_PROFILES.map((founder, index) => {
            const staggerDelay = index * 150; // 0ms, 150ms, 300ms

            return (
              <ScrollReveal
                key={founder.id}
                delayMs={staggerDelay}
                className="h-full"
              >
                <FounderCard
                  founder={founder}
                  index={index}
                />
              </ScrollReveal>
            );
          })}
        </div>

        {/* Informational Verification Footer Note */}
        <ScrollReveal delayMs={200} className="mt-10">
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span className="leading-relaxed">
                Founder designations and Chartered Accountancy qualifications are maintained and verified in accordance with statutory standards.
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap pl-4 sm:pl-0 sm:border-l-0 border-l border-slate-200">
              Updated: October 2026
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

// Alias for backward compatibility
export const FounderGrid = PartnerGrid;
export default PartnerGrid;
