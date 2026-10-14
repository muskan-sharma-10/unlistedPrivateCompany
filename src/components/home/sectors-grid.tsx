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
    <section id="sectors" className="py-14 sm:py-16 bg-[#f3f8f7] border-b border-[#dce8e5]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#00a887] bg-[#e6f7f3] px-3.5 py-1 rounded-full mb-2.5">
              Explore
            </span>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-[#082029] leading-tight">
              Top sectors in the <em className="font-serif italic text-[#00a887] font-medium">unlisted</em> market
            </h2>
            <p className="text-[14.5px] text-gray-500 mt-1.5 max-w-[38em]">
              Navigate the corners of the private market shaping India’s next listings.
            </p>
          </div>
          <Link
            href="/sectors"
            className="text-[13.5px] font-semibold text-[#00a887] inline-flex items-center gap-1.5 border border-[#dce8e5] hover:border-[#00a887] px-5 py-2 rounded-2xl self-start sm:self-auto transition-all bg-white"
          >
            All sectors →
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
                className="flex items-center justify-between p-4.5 rounded-2xl bg-white border border-[#dce8e5] hover:border-[#00a887] hover:-translate-y-1 hover:shadow-lg hover:shadow-[#00a887]/5 transition-all cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <span className="w-10 h-10 rounded-xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center shrink-0">
                    <IconComponent className="w-5 h-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="font-semibold text-[14px] text-[#082029] truncate group-hover:text-[#00a887] transition-colors">
                      {sec.name}
                    </div>
                    <div className="text-[12px] text-gray-400">
                      {sec.count}
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00a887] group-hover:translate-x-0.5 shrink-0 transition-transform" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default SectorsGrid;
