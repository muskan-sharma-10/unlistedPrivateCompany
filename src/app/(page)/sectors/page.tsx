'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Sprout,
  Brain,
  Shirt,
  Car,
  Plane,
  Building2,
  Hammer,
  Cog,
  Landmark,
  Zap,
  ShoppingBag,
  Sun,
  Factory,
  Cpu,
  Shield,
  Layers,
  Search,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import { getPortalShares } from '@/lib/supabase/queries';
import { StockItem, STOCKS_DATA } from '@/data/unlisted-data';

interface SectorDef {
  name: string;
  slug: string;
  icon: any;
  description: string;
  color: string;
}

const SECTOR_DEFS: SectorDef[] = [
  {
    name: 'Financial Services',
    slug: 'financial-services',
    icon: Landmark,
    description: 'National stock exchanges, depositaries, upper-layer NBFCs, fintech giants, and clearing corporations.',
    color: 'from-blue-500/10 to-teal-500/10',
  },
  {
    name: 'Energy & Power',
    slug: 'energy-and-power',
    icon: Zap,
    description: 'Power exchanges, conventional thermal utilities, grid infrastructure, and state-backed energy corporations.',
    color: 'from-amber-500/10 to-orange-500/10',
  },
  {
    name: 'Renewable Energy',
    slug: 'renewable-energy',
    icon: Sun,
    description: 'Solar PV cell manufacturers, clean wind developers, green hydrogen pioneers, and hybrid energy assets.',
    color: 'from-emerald-500/10 to-teal-500/10',
  },
  {
    name: 'Consumer Services',
    slug: 'consumer-services',
    icon: ShoppingBag,
    description: 'Quick-commerce unicorns, direct-to-consumer apparel, consumer audio, retail chains, and food tech.',
    color: 'from-rose-500/10 to-pink-500/10',
  },
  {
    name: 'Automobile & EV',
    slug: 'automobile-and-ev',
    icon: Car,
    description: 'Electric two & three-wheeler OEMs, commercial EV manufacturing, battery components, and auto ancillaries.',
    color: 'from-indigo-500/10 to-purple-500/10',
  },
  {
    name: 'Technology & AI',
    slug: 'technology-and-ai',
    icon: Cpu,
    description: 'Enterprise visual AI, SaaS platforms, surgical simulation robotics, and chip testing packaging.',
    color: 'from-cyan-500/10 to-blue-500/10',
  },
  {
    name: 'Manufacturing & Engineering',
    slug: 'manufacturing-and-engineering',
    icon: Factory,
    description: 'Semiconductor ATMP buildouts, cryogenic gas storage plants, precision components, and aerospace parts.',
    color: 'from-slate-500/10 to-stone-500/10',
  },
  {
    name: 'Agriculture & Agro-Chemicals',
    slug: 'agriculture-and-agro-chemicals',
    icon: Sprout,
    description: 'Crop nutrition, hybrid seeds, agricultural logistics, and specialized formulation exporters.',
    color: 'from-green-500/10 to-lime-500/10',
  },
  {
    name: 'Aviation & Defence',
    slug: 'aviation-and-defence',
    icon: Shield,
    description: 'Aerial robotics, precision munitions, regional commuter air carriers, and private defence manufacturing.',
    color: 'from-amber-500/10 to-red-500/10',
  },
  {
    name: 'Building Materials',
    slug: 'building-materials',
    icon: Hammer,
    description: 'Architectural glass, specialized pipes, tiles, green cement, and structural engineering materials.',
    color: 'from-yellow-500/10 to-amber-500/10',
  },
];

export default function SectorsPage() {
  const [stocks, setStocks] = useState<StockItem[]>(STOCKS_DATA);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getPortalShares().then((data) => {
      if (data && data.length > 0) setStocks(data);
    });
  }, []);

  const getSectorStockCount = (sectorName: string) => {
    return stocks.filter((s) => s.sector.toLowerCase().includes(sectorName.toLowerCase()) || sectorName.toLowerCase().includes(s.sector.toLowerCase())).length;
  };

  const getTopCompaniesForSector = (sectorName: string) => {
    return stocks
      .filter((s) => s.sector.toLowerCase().includes(sectorName.toLowerCase()) || sectorName.toLowerCase().includes(s.sector.toLowerCase()))
      .slice(0, 3);
  };

  const filteredSectors = SECTOR_DEFS.filter(
    (sec) =>
      sec.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      sec.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Banner */}
      <section className="bg-[#082029] text-white py-16 sm:py-24 border-b border-[#0d2e38] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a887]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider text-[#c5a880] uppercase">
              <span className="w-6 h-[2px] bg-[#c5a880]" />
              <span>Sectors Directory · Private Equity &amp; Pre-IPO Universe</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Explore India&apos;s High-Growth <em className="font-serif italic text-[#2dd4bf]">Unlisted Sectors</em>
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Navigate institutional unlisted equities by sector. From financial infrastructure exchanges to EV clean-tech, track indicative prices and research notes across all major industries.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-10 flex-1 w-full">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-gray-200">
          <div>
            <h2 className="text-2xl font-bold text-[#082029]">All Sectors ({filteredSectors.length})</h2>
            <p className="text-xs sm:text-sm text-gray-500 mt-1">Select a sector to browse live indicative prices, lots, and company financials.</p>
          </div>

          <div className="relative min-w-[300px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sector or industry..."
              className="w-full text-sm text-[#082029] bg-white border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887] shadow-xs"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Sectors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSectors.map((sec) => {
            const IconComponent = sec.icon;
            const count = getSectorStockCount(sec.name);
            const topStocks = getTopCompaniesForSector(sec.name);

            return (
              <div
                key={sec.slug}
                className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dce8e5] hover:border-[#00a887] shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-12 h-12 rounded-2xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <IconComponent className="w-6 h-6" />
                    </span>
                    <span className="text-xs font-semibold px-3 py-1 rounded-full bg-slate-100 text-slate-700">
                      {count > 0 ? `${count} available` : 'Active coverage'}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-[#082029] group-hover:text-[#00a887] transition-colors mb-2">
                    {sec.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-gray-600 font-normal leading-relaxed mb-6">
                    {sec.description}
                  </p>

                  {/* Top Companies List in Sector */}
                  {topStocks.length > 0 && (
                    <div className="space-y-2 pt-4 border-t border-gray-100 mb-6">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-gray-400 block">
                        Featured in this sector
                      </span>
                      {topStocks.map((s) => (
                        <Link
                          key={s.id}
                          href={`/shares/${s.id}`}
                          className="flex items-center justify-between text-xs text-slate-700 hover:text-[#00a887] font-medium py-1 px-2 rounded-lg hover:bg-slate-50 transition-colors"
                        >
                          <span className="truncate pr-2">{s.name}</span>
                          <span className="font-semibold shrink-0 text-[#082029]">₹{s.price.toLocaleString('en-IN')}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                  <Link
                    href={`/shares?sector=${encodeURIComponent(sec.name)}`}
                    className="text-xs sm:text-sm font-semibold text-[#00a887] inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse {sec.name} Shares</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}
