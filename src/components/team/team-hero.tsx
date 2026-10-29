import React from 'react';
import { ArrowDown } from 'lucide-react';

export const TeamHero: React.FC = () => {
  return (
    <section className="relative bg-[#0B132B] text-white pt-20 sm:pt-24 lg:pt-28 pb-16 sm:pb-20 lg:pb-24 border-b border-slate-800 overflow-hidden">
      {/* Subtle Financial Grid & Ambient Brand Lighting with Gentle Motion */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        {/* Ambient floating brand glows */}
        <div
          className="absolute -top-36 right-1/4 w-[520px] h-[520px] bg-blue-600/15 rounded-full blur-[130px] animate-pulse motion-reduce:animate-none"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute -bottom-36 left-12 w-[460px] h-[460px] bg-sky-500/10 rounded-full blur-[140px] animate-pulse motion-reduce:animate-none"
          style={{ animationDuration: '11s' }}
        />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="max-w-4xl space-y-6">
          {/* Eyebrow Label: Animated Entrance */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase animate-in fade-in slide-in-from-bottom-2 duration-500 fill-mode-both motion-reduce:animate-none">
            <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
            <span>MEET OUR FOUNDERS</span>
          </div>

          {/* Page Heading: Smooth Upward Fade */}
          <h1 className="text-3xl sm:text-5xl lg:text-[56px] font-bold tracking-tight text-white leading-[1.12] animate-in fade-in slide-in-from-bottom-3 duration-700 delay-150 fill-mode-both motion-reduce:animate-none">
            The People Behind{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-blue-400">
              Unlisted Pond
            </span>
          </h1>

          {/* Headline / Tagline Combination */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-blue-200/95 tracking-tight animate-in fade-in slide-in-from-bottom-3 duration-700 delay-200 fill-mode-both motion-reduce:animate-none">
            Built on Expertise. Driven by Vision.
          </p>

          {/* Concise Factual Introduction */}
          <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed max-w-3xl animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300 fill-mode-both motion-reduce:animate-none">
            Our founders bring professional Chartered Accountancy and advisory expertise to the business&apos;s corporate finance, capital advisory, and enterprise facilitation activities.
          </p>

          {/* Navigation Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-500 fill-mode-both motion-reduce:animate-none">
            <a
              href="#founders"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm shadow-xs hover:shadow-md transition-all active:scale-[0.99] focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <span>Explore Founder Profiles</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href="#services"
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-lg border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white hover:bg-slate-800/60 font-medium text-xs sm:text-sm transition-all focus:outline-none focus:ring-2 focus:ring-slate-400"
            >
              <span>Our Practice Areas</span>
            </a>
          </div>
        </div>

        {/* Refined, Low-Profile Horizontal Trust Strip */}
        <div className="mt-12 sm:mt-16 pt-6 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-slate-400 animate-in fade-in duration-700 delay-700 fill-mode-both motion-reduce:animate-none">
          <div className="flex flex-wrap items-center gap-y-2 gap-x-6">
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-sm">3</span>
              <span className="text-slate-300 font-medium">Founding Partners</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <span className="font-bold text-white text-sm">Chartered Accountants</span>
              <span className="text-slate-400">Leadership Team</span>
            </div>
            <span className="text-slate-700 hidden sm:inline">•</span>
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Verified Professional Credentials</span>
            </div>
          </div>

          <div className="text-[11px] font-mono text-slate-500">
            Executive Leadership Directory
          </div>
        </div>
      </div>
    </section>
  );
};

export default TeamHero;
