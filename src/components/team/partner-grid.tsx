'use client';

import React, { useState } from 'react';
import { FOUNDER_PROFILES, LeadershipGroup } from '@/data/team';
import { FounderCard } from './partner-card';
import { ScrollReveal } from './scroll-reveal';

type TabType = 'all' | LeadershipGroup;

export const PartnerGrid: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('all');

  const founders = FOUNDER_PROFILES.filter((p) => p.group === 'founder');
  const partners = FOUNDER_PROFILES.filter((p) => p.group === 'partner');
  const coFounders = FOUNDER_PROFILES.filter((p) => p.group === 'co-founder');

  const tabs: { id: TabType; label: string; count: number }[] = [
    { id: 'all', label: 'All Leadership', count: FOUNDER_PROFILES.length },
    { id: 'founder', label: 'Founders', count: founders.length },
    { id: 'partner', label: 'Partners', count: partners.length },
    { id: 'co-founder', label: 'Co-Founder', count: coFounders.length },
  ];

  return (
    <section id="founders" className="py-14 sm:py-20 lg:py-24 bg-slate-50/70 border-b border-slate-200">
      <span id="partners" className="sr-only" aria-hidden="true" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-8 sm:mb-12">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Leadership &amp; Governance
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            The Leadership of Unlisted Pond
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Our founders and partners bring specialized professional depth across debt and equity finance, corporate finance advisory, statutory compliance, and strategic business growth.
          </p>
        </ScrollReveal>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-slate-200">
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center space-x-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-white text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                <span>{tab.label}</span>
                <span
                  className={`text-[11px] px-1.5 py-0.5 rounded-full font-mono ${
                    isActive ? 'bg-blue-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {tab.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content View: When 'all' is selected */}
        {activeTab === 'all' && (
          <div className="space-y-16">
            {/* 1. Founders Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-600" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Founders</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Guiding strategic capital advisory, debt &amp; equity finance, and foundational corporate vision.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-1 rounded-md">
                  02 Founders
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {founders.map((founder, index) => (
                  <ScrollReveal key={founder.id} delayMs={index * 120} className="h-full">
                    <FounderCard founder={founder} index={index} />
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* 2. Partners Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-indigo-600" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Partners</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Advising on financial structuring, corporate valuation, statutory compliance, and financial review.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-indigo-700 bg-indigo-50 border border-indigo-200/60 px-2.5 py-1 rounded-md">
                  02 Partners
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
                {partners.map((partner, index) => (
                  <ScrollReveal key={partner.id} delayMs={index * 120} className="h-full">
                    <FounderCard founder={partner} index={index + founders.length} />
                  </ScrollReveal>
                ))}
              </div>
            </div>

            {/* 3. Co-Founder Section (Harish Mittal placed at the bottom, centered) */}
            <div className="space-y-6">
              <div className="flex items-center justify-between border-b border-slate-200 pb-3">
                <div className="space-y-0.5">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <h3 className="text-lg sm:text-xl font-bold text-slate-900">Co-Founder</h3>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-500">
                    Spearheading business strategy, market expansion, and enterprise partnerships.
                  </p>
                </div>
                <span className="text-xs font-mono font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200/60 px-2.5 py-1 rounded-md">
                  01 Co-Founder
                </span>
              </div>

              <div className="max-w-2xl mx-auto w-full">
                {coFounders.map((coFounder, index) => (
                  <ScrollReveal key={coFounder.id} delayMs={100} className="h-full">
                    <FounderCard
                      founder={coFounder}
                      index={founders.length + partners.length + index}
                    />
                  </ScrollReveal>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Content View: When 'founder' is selected */}
        {activeTab === 'founder' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {founders.map((founder, index) => (
              <ScrollReveal key={founder.id} delayMs={index * 100} className="h-full">
                <FounderCard founder={founder} index={index} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Content View: When 'partner' is selected */}
        {activeTab === 'partner' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
            {partners.map((partner, index) => (
              <ScrollReveal key={partner.id} delayMs={index * 100} className="h-full">
                <FounderCard founder={partner} index={index} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Content View: When 'co-founder' is selected */}
        {activeTab === 'co-founder' && (
          <div className="max-w-2xl mx-auto w-full">
            {coFounders.map((coFounder, index) => (
              <ScrollReveal key={coFounder.id} delayMs={100} className="h-full">
                <FounderCard founder={coFounder} index={index} />
              </ScrollReveal>
            ))}
          </div>
        )}

        {/* Informational Verification Footer Note */}
        <ScrollReveal delayMs={150} className="mt-14">
          <div className="p-4 sm:p-5 rounded-xl bg-white border border-slate-200 text-slate-600 text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-2xs">
            <div className="flex items-center space-x-2.5">
              <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0" />
              <span className="leading-relaxed">
                Designations and professional qualifications are maintained in accordance with verified standards.
              </span>
            </div>
            <span className="text-[11px] font-mono text-slate-500 whitespace-nowrap pl-4 sm:pl-0 sm:border-l-0 border-l border-slate-200">
              Updated: November 2026
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
