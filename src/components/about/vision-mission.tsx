import React from 'react';
import { ScrollReveal } from '@/components/team/scroll-reveal';
import { Target, Compass, Sparkles, CheckCircle2 } from 'lucide-react';

export const VisionMission: React.FC = () => {
  return (
    <section id="vision-mission" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <ScrollReveal className="max-w-3xl mb-12 sm:mb-16">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Section 08 · Purpose &amp; Horizon
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-slate-900 leading-tight">
            Our Vision &amp; Mission
          </h2>
          <p className="text-sm sm:text-base text-slate-600 mt-2 leading-relaxed">
            The foundational commitments shaping our continuous development as India&apos;s foremost private market intelligence platform.
          </p>
        </ScrollReveal>

        {/* 2-Column Split Vision & Mission Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Vision Card */}
          <ScrollReveal delayMs={100} className="h-full">
            <div className="h-full rounded-2xl bg-gradient-to-br from-[#0B132B] via-[#0F172A] to-[#1E293B] text-white p-8 sm:p-10 border border-slate-800 shadow-lg flex flex-col justify-between relative overflow-hidden group">
              {/* Subtle decorative glow */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

              <div className="space-y-6 relative z-10">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-950/80 text-blue-300 border border-blue-400/30">
                    Long-Term Aspiration
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    Our Vision
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-[26px] font-bold text-white leading-snug tracking-tight">
                    &ldquo;To make India&apos;s private market information more accessible, transparent, and structured for informed participants.&rdquo;
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-normal">
                  We envision an Indian financial ecosystem where exploring unlisted and pre-IPO enterprises is guided by the same empirical clarity, verified disclosures, and institutional analytical rigor that characterize the most sophisticated public capital markets in the world.
                </p>

                <div className="pt-4 border-t border-slate-800 space-y-2.5">
                  <div className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Eliminating structural information barriers across private markets</span>
                  </div>
                  <div className="flex items-start space-x-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                    <span>Fostering a culture of disciplined, research-led investment analysis</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-800 text-[11px] font-mono text-slate-400 relative z-10">
                Unlisted Pond · Institutional Vision Horizon
              </div>
            </div>
          </ScrollReveal>

          {/* Mission Card */}
          <ScrollReveal delayMs={200} className="h-full">
            <div className="h-full rounded-2xl bg-slate-50 border border-slate-200 p-8 sm:p-10 hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all flex flex-col justify-between relative overflow-hidden group">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center">
                    <Target className="w-6 h-6" />
                  </div>
                  <span className="text-[11px] font-mono font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-50 text-blue-800 border border-blue-200">
                    Operational Mandate
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                    Our Mission
                  </h3>
                  <p className="text-xl sm:text-2xl lg:text-[26px] font-bold text-slate-900 leading-snug tracking-tight">
                    &ldquo;To simplify the discovery of unlisted and pre-IPO companies through rigorous research, meaningful information, and a user-friendly digital experience.&rdquo;
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                  Our day-to-day mission centers on transforming cumbersome regulatory filings into standardized, intuitive digital company dossiers. We continuously aggregate audited annual statements, monitor SEBI DRHP submissions, and provide unbiased reference pricing benchmarks so participants can navigate private opportunities with total confidence.
                </p>

                <div className="pt-4 border-t border-slate-200/80 space-y-2.5">
                  <div className="flex items-start space-x-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Curating verified financial dossiers for 500+ unlisted companies</span>
                  </div>
                  <div className="flex items-start space-x-2.5 text-xs text-slate-700">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>Providing continuous reference price tracking and timely DRHP updates</span>
                  </div>
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-200/80 text-[11px] font-mono text-slate-500">
                Unlisted Pond · Platform Mission Mandate
              </div>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};

export default VisionMission;
