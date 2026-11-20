import React from 'react';
import Link from 'next/link';
import { ArrowDown, ArrowRight, ShieldCheck, Database, FileText, Search } from 'lucide-react';

export const AboutHero: React.FC = () => {
  return (
    <section className="relative bg-[#0B132B] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 border-b border-slate-800 overflow-hidden">
      {/* Background ambient lighting and subtle grid */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div
          className="absolute -top-36 right-1/4 w-[520px] h-[520px] bg-blue-600/15 rounded-full blur-[130px] animate-pulse motion-reduce:animate-none"
          style={{ animationDuration: '9s' }}
        />
        <div
          className="absolute -bottom-36 left-10 w-[480px] h-[480px] bg-sky-500/10 rounded-full blur-[140px] animate-pulse motion-reduce:animate-none"
          style={{ animationDuration: '12s' }}
        />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow Label */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both motion-reduce:animate-none">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>ABOUT UNLISTED POND · PRIVATE MARKET INTELLIGENCE</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.14] animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 fill-mode-both motion-reduce:animate-none">
            Bringing India&apos;s Private Markets Closer to{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              Informed Investors.
            </span>
          </h1>

          {/* Meaningful Subtitle */}
          <p className="text-base sm:text-lg lg:text-xl text-slate-300 font-normal leading-relaxed max-w-3xl animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 fill-mode-both motion-reduce:animate-none">
            Unlisted Pond is India&apos;s dedicated research, information, and discovery platform for unlisted equities, pre-IPO enterprises, and ESOP shares. We transform fragmented off-market data into structured, transparent intelligence—empowering investors, founders, and institutions to make disciplined, well-informed decisions.
          </p>

          {/* Action Navigation */}
          <div className="pt-2 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both motion-reduce:animate-none">
            <a
              href="#who-we-are"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <span>Explore Our Story</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <Link
              href="/shares"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white hover:bg-slate-800/60 font-medium text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <span>Explore Unlisted Shares</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* 4 Core Platform Anchors */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-12 sm:mt-16 pt-8 border-t border-slate-800/80 animate-in fade-in duration-700 delay-500 fill-mode-both motion-reduce:animate-none">
          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3.5 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center shrink-0 mt-0.5">
              <Search className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">500+ Unlisted Companies</div>
              <div className="text-xs text-slate-400 font-normal mt-0.5 leading-snug">
                Extensive coverage across 20+ specialized industry sectors
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3.5 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-0.5">
              <FileText className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">DRHP Filing Tracking</div>
              <div className="text-xs text-slate-400 font-normal mt-0.5 leading-snug">
                Regular updates on SEBI prospectus filings &amp; IPO roadmaps
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3.5 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 flex items-center justify-center shrink-0 mt-0.5">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Audited Financial Data</div>
              <div className="text-xs text-slate-400 font-normal mt-0.5 leading-snug">
                Multi-year balance sheets, P&amp;L trends &amp; key operational ratios
              </div>
            </div>
          </div>

          <div className="p-4 sm:p-5 rounded-xl bg-slate-900/60 border border-slate-800/80 flex items-start space-x-3.5 backdrop-blur-xs">
            <div className="w-9 h-9 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 mt-0.5">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm">Independent Governance</div>
              <div className="text-xs text-slate-400 font-normal mt-0.5 leading-snug">
                Full adherence to statutory off-market regulatory frameworks
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
