'use client';

import React from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Search,
  FileSpreadsheet,
  FileCheck2,
  Layers,
  Users,
} from 'lucide-react';

export const AboutSummarySection: React.FC = () => {
  return (
    <section id="about-summary" className="py-14 sm:py-20 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="max-w-3xl mb-10 sm:mb-14">
          <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded uppercase mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />
            <span>ABOUT UNLISTED POND · PRIVATE MARKET INTELLIGENCE</span>
          </div>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-slate-900 leading-tight">
            Bridging India&apos;s High-Growth Private Companies &amp; Informed Investors
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            We transform fragmented off-market regulatory filings, audited annual statements, and SEBI DRHP prospectuses into structured, transparent intelligence.
          </p>
        </div>

        {/* 2-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          {/* Left Column: Narrative & Key Strengths (7 cols) */}
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug">
                Democratizing Access to India&apos;s Next Generation of Market Leaders
              </h3>
              <p className="text-sm text-slate-700 leading-relaxed font-normal">
                Before a company lists on the NSE or BSE, its earliest high-growth value creation happens in the private equity and pre-IPO stages. Historically, exploring these opportunities was restricted by severe information asymmetry, lack of standardized financial reporting, and reliance on unverified intermediaries.
              </p>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                At <strong>Unlisted Pond</strong>, we have eliminated that opacity. Our platform provides structured company dossiers, audited financial histories, Draft Red Herring Prospectus (DRHP) tracking, and compiled indicative price trends—giving investors the factual context required to perform disciplined analysis.
              </p>
            </div>

            {/* 4 Core Pillars Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5">
                  <Search className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                    500+ Unlisted Equities
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    Directory covering fintech, consumer, mobility &amp; green energy.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-50 border border-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FileSpreadsheet className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                    Audited Financials
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    Multi-year balance sheets, P&amp;L trends, and EBITDA ratios.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-100 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                  <FileCheck2 className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                    SEBI DRHP Tracking
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    Continuous monitoring of draft filings and IPO roadmaps.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 flex items-start space-x-3">
                <div className="w-8 h-8 rounded-lg bg-amber-50 border border-amber-100 text-amber-700 flex items-center justify-center shrink-0 mt-0.5">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <span className="font-bold text-slate-900 text-xs sm:text-sm block">
                    Statutory Demat Transfer
                  </span>
                  <p className="text-xs text-slate-600 mt-0.5 leading-snug">
                    Off-market depository credit to your personal CDSL/NSDL demat.
                  </p>
                </div>
              </div>
            </div>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-3">
              <Link
                href="/about-us"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm shadow-xs transition-all active:scale-[0.99]"
              >
                <span>Read Our Full Story</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                href="/our-team"
                className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-slate-300 hover:border-slate-400 text-slate-700 hover:text-slate-900 bg-white font-medium text-xs sm:text-sm transition-all"
              >
                <Users className="w-4 h-4 text-blue-600" />
                <span>Meet Our Founders</span>
              </Link>
            </div>
          </div>

          {/* Right Column: Institutional Core Commitment Box (5 cols) */}
          <div className="lg:col-span-5">
            <div className="h-full rounded-2xl bg-[#0B132B] text-white p-6 sm:p-8 border border-slate-800 shadow-md flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>The Unlisted Pond Standard</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                  Research Integrity Above All Else
                </h3>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  We operate with a singular, non-negotiable principle: <em>analysis must precede action</em>. We do not manufacture hype, guarantee listing dates, or provide speculative tips.
                </p>

                <div className="space-y-3.5 pt-3 border-t border-slate-800">
                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      <strong>Objective Financial Data:</strong> Audited annual statements and verified corporate filings.
                    </span>
                  </div>

                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      <strong>Transparent Indicative Pricing:</strong> Reference markers compiled from broader off-market observations.
                    </span>
                  </div>

                  <div className="flex items-start space-x-3 text-xs sm:text-sm">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span className="text-slate-300">
                      <strong>Concierge Relationship Desk:</strong> Personalized guidance for documentation and settlement clarity.
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400">
                  Established with Research Integrity
                </span>
                <Link
                  href="/about-us"
                  className="text-xs font-semibold text-blue-400 hover:text-blue-300 inline-flex items-center space-x-1 transition-colors"
                >
                  <span>Learn More</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSummarySection;
