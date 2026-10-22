'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight, Sprout, Brain, Shirt, Car, Plane, Building2, Hammer, Cog } from 'lucide-react';

interface SectorsGridProps {
  onSectorSelect?: (sector: string) => void;
}

export const SectorsGrid: React.FC<SectorsGridProps> = ({ onSectorSelect }) => {
  const sectors = [
    { name: 'Agriculture & Agro-Chemicals', count: '11 shares', slug: 'agriculture-and-agro-chemicals', icon: Sprout },
    { name: 'AI training-data and data services', count: '1 share', slug: 'ai-training-data-and-data-services', icon: Brain },
    { name: 'Apparel & Textiles', count: '5 shares', slug: 'apparel-and-textiles', icon: Shirt },
    { name: 'Automotive', count: '6 shares', slug: 'automotive', icon: Car },
    { name: 'Aviation', count: '4 shares', slug: 'aviation', icon: Plane },
    { name: 'Banking', count: '2 shares', slug: 'banking', icon: Building2 },
    { name: 'Building Materials', count: '7 shares', slug: 'building-materials', icon: Hammer },
    { name: 'Capital Goods', count: '2 shares', slug: 'capital-goods', icon: Cog },
  ];

  return (
    <section id="sectors" className="py-12 sm:py-16 bg-white border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
              Industry Classification
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
              Top Sectors in the Unlisted Market
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-xl">
              Navigate growth industries shaping India&apos;s next generation of public market listings.
            </p>
          </div>
          <Link
            href="/sectors"
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-500 px-4 py-2 rounded-lg self-start sm:self-auto transition-all bg-white"
          >
            All Sectors →
          </Link>
        </div>

        {/* 8 Sectors Grid in 4 columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {sectors.map((sec) => {
            const IconComponent = sec.icon;
            return (
              <div
                key={sec.slug}
                onClick={() => onSectorSelect && onSectorSelect(sec.name)}
                className="flex items-center justify-between p-4 rounded-xl bg-slate-50/60 border border-slate-200 hover:border-blue-500/80 hover:bg-white hover:shadow-xs transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    <IconComponent className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-sm text-slate-900 truncate group-hover:text-blue-600 transition-colors">
                      {sec.name}
                    </div>
                    <div className="text-xs text-slate-400 tabular-nums">
                      {sec.count}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 shrink-0 transition-transform" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectorsGrid;
