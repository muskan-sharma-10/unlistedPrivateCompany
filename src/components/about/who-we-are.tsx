import React from 'react';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import { ShieldCheck, CheckCircle2, TrendingUp, Layers, HelpCircle, Eye } from 'lucide-react';

export const WhoWeAre: React.FC = () => {
  return (
    <section id="who-we-are" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Top Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 02 · Identity &amp; Purpose
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Who We Are &amp; Why We Exist
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            Redefining how investors and enterprises understand India&apos;s rapidly evolving private market through structured intelligence and research integrity.
          </p>
        </ScrollReveal>

        {/* 2-Column Editorial Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Narrative Column */}
          <div className="lg:col-span-7 space-y-6">
            <ScrollReveal delayMs={100} className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 leading-snug">
                Demystifying India&apos;s Private Enterprise Ecosystem
              </h3>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <strong>Unlisted Pond</strong> is an independent financial research, discovery, and information platform dedicated to India&apos;s unlisted equities, pre-IPO enterprises, and ESOP shares. We bridge the gap between India&apos;s fastest-growing private companies and the investors who seek to understand their fundamental value.
              </p>
              <p className="text-sm text-slate-600 leading-relaxed font-normal">
                Historically, the private equity lifecycle in India was largely opaque. High-growth private enterprises created tremendous economic value over multiple funding rounds, yet individual participants, family offices, and wealth professionals faced steep information barriers. Reliable financial disclosures were buried in disparate regulatory filings, market valuations were governed by informal rumors, and transaction mechanisms lacked transparent reference pricing.
              </p>
            </ScrollReveal>

            {/* The Problem We Address Box */}
            <ScrollReveal delayMs={200}>
              <div className="p-6 sm:p-7 rounded-2xl bg-slate-50 border border-slate-200 space-y-4">
                <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-blue-700">
                  <HelpCircle className="w-4 h-4 text-blue-700" />
                  <span>The Fundamental Problem We Address</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1">
                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm block">
                      Information Fragmentation
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Critical balance sheets and MCA filings were difficult to locate and standardize.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm block">
                      Pricing Opacity
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Off-market transactions frequently occurred without verified reference pricing benchmarks.
                    </p>
                  </div>
                  <div className="space-y-1.5">
                    <span className="font-semibold text-slate-900 text-xs sm:text-sm block">
                      Analytical Scarcity
                    </span>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Investors lacked institutional research briefs to evaluate private companies objectively.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>

            {/* How We Help */}
            <ScrollReveal delayMs={300} className="space-y-3 pt-2">
              <h4 className="font-bold text-base text-slate-900">How Unlisted Pond Empowers Market Participants</h4>
              <p className="text-sm text-slate-600 leading-relaxed">
                We collect, normalize, and organize company information into clean, intuitive digital profiles. Through structured data, multi-year audited financial records, Draft Red Herring Prospectus (DRHP) tracking, and compiled indicative price trends, we provide investors with the factual context required to perform disciplined analysis.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Factual, verified company fundamentals without speculation</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Transparent indicative market reference pricing</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Granular industry screener &amp; peer benchmarking</span>
                </div>
                <div className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <span>Comprehensive regulatory disclosures &amp; educational guides</span>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Right Highlight Card: Our Operating Principles */}
          <div className="lg:col-span-5">
            <ScrollReveal delayMs={200} className="h-full">
              <div className="rounded-2xl bg-[#0B132B] text-white p-6 sm:p-8 border border-slate-800 shadow-md space-y-6 h-full flex flex-col justify-between">
                <div className="space-y-5">
                  <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold text-blue-400 uppercase tracking-wider">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>Our Operating Creed</span>
                  </div>

                  <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight leading-snug">
                    Research Integrity Above All Else
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                    Unlisted Pond operates under a simple, non-negotiable principle: <em>analysis must precede action</em>. We do not offer speculative promises, guarantee IPO timelines, or manufacture unrealistic sentiment.
                  </p>

                  <div className="space-y-4 pt-2 border-t border-slate-800">
                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        01
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Objective Company Dossiers</h4>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          Standardized profiles built on statutory filings, audited statements, and verified disclosures.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        02
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Indicative Reference Precision</h4>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          Reference pricing compiled from broader market signals, explicitly marked as indicative markers.
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3">
                      <div className="w-7 h-7 rounded-lg bg-blue-500/15 border border-blue-500/30 text-blue-400 flex items-center justify-center shrink-0 mt-0.5 text-xs font-mono font-bold">
                        03
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-white">Dedicated Relationship Guidance</h4>
                        <p className="text-xs text-slate-400 mt-0.5 leading-relaxed">
                          Personalized concierge desk support guiding documentation, demat credit verification, and inquiries.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-[11px] text-slate-400 leading-relaxed mt-4">
                  <strong className="text-slate-300 font-semibold block mb-0.5">Statutory Commitment:</strong>
                  We operate strictly as an educational and financial information discovery resource in adherence to Indian statutory guidelines.
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhoWeAre;
