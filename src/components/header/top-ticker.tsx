'use client';

import React, { useState, useEffect } from 'react';
import { ShieldCheck, Flame, Radio } from 'lucide-react';
import { getPortalHomepageHero } from '@/lib/supabase/queries';

export const TopTicker: React.FC = () => {
  const [announcement, setAnnouncement] = useState<string | null>(null);

  useEffect(() => {
    getPortalHomepageHero().then((hero) => {
      if (hero && hero.showAnnouncement && hero.announcementBar) {
        setAnnouncement(hero.announcementBar);
      }
    });
  }, []);

  return (
    <div className="bg-[#0B132B] text-slate-300 text-[12px] sm:text-[12.5px] border-b border-[#1E293B] py-2 overflow-hidden select-none">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-4">
        {/* Compliance Marquee with institutional notice */}
        <div className="flex-1 overflow-hidden">
          <div className="animate-compliance-marquee flex items-center gap-6 whitespace-nowrap">
            {announcement && (
              <>
                <span className="inline-flex items-center gap-1.5 text-amber-300 font-semibold bg-amber-500/15 px-2.5 py-0.5 rounded-full border border-amber-500/30">
                  <Flame className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <span>{announcement}</span>
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              </>
            )}
            <span className="inline-flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>An <strong className="text-white font-medium">information &amp; research platform</strong> for unlisted &amp; pre-IPO equities</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span>
              <strong className="text-slate-200 font-medium">Not</strong> a SEBI-recognised stock exchange or trading venue
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span>
              All displayed share prices are <strong className="text-white font-medium">indicative</strong>
            </span>

            {/* Repeated for smooth infinite ticker */}
            <span className="w-2 h-2 rounded-full bg-slate-700 mx-3" />

            <span className="inline-flex items-center gap-1.5" aria-hidden="true">
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
              <span>An <strong className="text-white font-medium">information &amp; research platform</strong> for unlisted &amp; pre-IPO equities</span>
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span aria-hidden="true">
              <strong className="text-slate-200 font-medium">Not</strong> a SEBI-recognised stock exchange or trading venue
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
            <span aria-hidden="true">
              All displayed share prices are <strong className="text-white font-medium">indicative</strong>
            </span>
          </div>
        </div>

        {/* Live Market Status Badge */}
        <div className="hidden md:flex items-center space-x-2 text-xs text-slate-400 shrink-0 font-medium pl-4 border-l border-[#1E293B]">
          <span className="w-2 h-2 rounded-full bg-emerald-500 pulse-dot" />
          <span className="text-slate-300">Indian Private Market Watch</span>
        </div>
      </div>
    </div>
  );
};

export default TopTicker;
