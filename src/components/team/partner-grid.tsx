import React from 'react';
import { PARTNER_PROFILES } from '@/data/team';
import { PartnerCard } from './partner-card';

export const PartnerGrid: React.FC = () => {
  return (
    <section id="partners" className="py-14 sm:py-20 lg:py-24 bg-slate-50/60 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Executive Leadership
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Partners Driving Vision, Precision &amp; Trust
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Our three partners bring specialized depth across debt and equity finance, corporate finance advisory, and financial structuring.
          </p>
        </div>

        {/* Balanced Three-Partner Composition */}
        {/* Top Row: Two 1-Column Cards | Bottom Row: Full-Width Featured Card */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-10 items-stretch">
          {PARTNER_PROFILES.map((partner, index) => {
            const isThirdCard = index === 2;

            return (
              <div
                key={partner.id}
                className={`h-full animate-in fade-in slide-in-from-bottom-3 duration-500 transition-transform ${
                  isThirdCard ? 'lg:col-span-2' : 'lg:col-span-1'
                }`}
              >
                <PartnerCard
                  partner={partner}
                  index={index}
                  isFeatured={isThirdCard}
                />
              </div>
            );
          })}
        </div>

        {/* Informational Verification Footer Note */}
        <div className="mt-10 p-4 sm:p-5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
          <div className="flex items-center space-x-2.5">
            <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
            <span className="leading-relaxed">
              Partner designations and Chartered Accountancy qualifications are maintained and verified in accordance with statutory standards.
            </span>
          </div>
          <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap pl-4 sm:pl-0 sm:border-l-0 border-l border-slate-200">
            Updated: October 2026
          </span>
        </div>
      </div>
    </section>
  );
};

export default PartnerGrid;
