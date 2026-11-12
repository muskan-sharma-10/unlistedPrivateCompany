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

export default function SectorsClient() {
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
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <TopTicker />
      <Navbar />

      {/* Hero Banner */}
      <section className="relative bg-[#0B132B] text-white overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-20 border-b border-slate-800">
        {/* Subtle Financial Grid Background & Ambient Lighting */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage:
                'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
              backgroundSize: '48px 48px',
            }}
          />
          <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[130px]" />
          <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-sky-500/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, description, and sector coverage */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Sectors Directory · Private Equity &amp; Pre-IPO Universe</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
                Explore High-Growth{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
                  Unlisted Sectors
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-[36em] font-normal leading-relaxed">
                Navigate institutional unlisted equities by sector. From financial infrastructure exchanges to EV clean-tech, track indicative prices and research notes across all major industries in India.
              </p>

              {/* Metric Counters Row */}
              <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    14<span className="text-blue-400 font-normal">+</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Categorized Sectors
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-sky-400 tabular-nums">
                    Fintech to Clean-Tech
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Diverse Industry Verticals
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    Daily
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Indicative Price Updates
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Sectors Snapshot Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Top Private Industry Verticals
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                    Comprehensive
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Financial Infrastructure</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Exchanges &amp; Banks</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Energy &amp; Clean-Tech</span>
                    <span className="text-sm font-bold text-emerald-400 mt-0.5 block">Solar, Power, EV</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Consumer &amp; Retail</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">FMCG, E-Commerce</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Manufacturing &amp; Tech</span>
                    <span className="text-sm font-bold text-blue-400 mt-0.5 block">SaaS, Heavy Industry</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Direct Company Cross-Linking</span>
                  </div>
                  <Link
                    href="/shares"
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group"
                  >
                    <span>Browse All Shares</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-8 sm:py-12 space-y-8 flex-1 w-full">
        {/* Search Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900">All Sectors ({filteredSectors.length})</h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5">Select a sector to browse live indicative prices, lots, and company financials.</p>
          </div>

          <div className="relative min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sector or industry..."
              className="w-full text-xs sm:text-sm text-slate-900 bg-white border border-slate-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-blue-600 shadow-xs transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
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
                className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                      <IconComponent className="w-5 h-5" />
                    </span>
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 border border-slate-200 tabular-nums">
                      {count > 0 ? `${count} available` : 'Active coverage'}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors mb-1.5">
                    {sec.name}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-5">
                    {sec.description}
                  </p>

                  {/* Top Companies List in Sector */}
                  {topStocks.length > 0 && (
                    <div className="space-y-1.5 pt-3.5 border-t border-slate-100 mb-5">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                        Featured in this sector
                      </span>
                      {topStocks.map((s) => (
                        <Link
                          key={s.id}
                          href={`/shares/${s.id}`}
                          className="flex items-center justify-between text-xs text-slate-700 hover:text-blue-600 font-medium py-1 px-2 rounded-md hover:bg-slate-50 transition-colors"
                        >
                          <span className="truncate pr-2">{s.name}</span>
                          <span className="font-bold shrink-0 text-slate-900 tabular-nums">₹{s.price.toLocaleString('en-IN')}</span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                  <Link
                    href={`/shares?sector=${encodeURIComponent(sec.name)}`}
                    className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1 group-hover:translate-x-1 transition-transform"
                  >
                    <span>Browse {sec.name} Shares</span>
                    <ArrowRight className="w-3.5 h-3.5" />
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

