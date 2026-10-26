'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { StockItem } from '@/data/unlisted-data';
import { getPortalShares } from '@/lib/supabase/queries';

interface HeroSectionProps {
  onSelectStock: (stock: StockItem) => void;
  onOpenEnquiry: () => void;
}

const ROTATING_WORDS = ['Delisted Shares', 'Unlisted Shares', 'Pre-IPO Shares', 'ESOP Shares'];

export const HeroSection: React.FC<HeroSectionProps> = ({
  onSelectStock,
  onOpenEnquiry,
}) => {
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % ROTATING_WORDS.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const [featuredStocks, setFeaturedStocks] = useState<StockItem[]>([
    {
      id: 'csk',
      name: 'Chennai Super Kings Cricket Ltd (CSK)',
      sector: 'Sports / Entertainment',
      price: 220,
      change: '+5.2%',
      changeType: 'up',
      change6M: '+12.4%',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'IPL franchise powerhouse Chennai Super Kings.',
      sparkline: [195, 205, 210, 215, 220],
      logo: '',
    },
    {
      id: 'msei',
      name: 'Metropolitan Stock Exchange (MSEI) Unlisted Shares',
      sector: 'Financial Services',
      price: 6.75,
      change: '+3.8%',
      changeType: 'up',
      change6M: '+3.8%',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Metropolitan Stock Exchange of India (MSEI) operates nationwide trading in Capital Market and Derivatives.',
      sparkline: [5.8, 6.0, 6.1, 6.3, 6.5, 6.75],
      logo: '/logos/msei.webp',
    },
    {
      id: 'hpx',
      name: 'Hindustan Power Exchange Limited (HPX India)',
      sector: 'Energy & Power',
      price: 24,
      change: '+4.5%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Hindustan Power Exchange (HPX) is India’s premier power exchange backed by PTC India, BSE, and ICICI Bank.',
      sparkline: [21, 22, 22.5, 23.5, 24],
      logo: '/logos/hpx.webp',
    },
    {
      id: 'onix',
      name: 'Onix Renewable Limited',
      sector: 'Renewable Energy',
      price: 46,
      change: '+6.2%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Onix Renewable Limited is leading clean energy generation and sustainable solar installations across India.',
      sparkline: [40, 42, 43, 44, 46],
      logo: '/logos/onix.webp',
    },
    {
      id: 'icex',
      name: 'Indian Commodity Exchange (ICEX)',
      sector: 'Financial Services / Commodity Exchange',
      price: 4,
      change: '+2.1%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Commodity futures trading exchange platform.',
      sparkline: [3.2, 3.5, 3.8, 4],
      logo: '',
    },
    {
      id: 'nse',
      name: 'National Stock Exchange of India (NSE)',
      sector: 'Financial Markets',
      price: 2095,
      change: '+2.4%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: '14 Oct 2026',
      description: 'Leading stock exchange of India.',
      sparkline: [1980, 2010, 2050, 2095],
      logo: '',
    },
  ]);

  useEffect(() => {
    getPortalShares()
      .then((shares) => {
        if (shares && shares.length >= 3) {
          setFeaturedStocks(shares.slice(0, 10));
        }
      })
      .catch(() => {});
  }, []);

  return (
    <section className="relative bg-[#0B132B] text-white overflow-hidden pt-12 pb-16 lg:pt-16 lg:pb-24 border-b border-slate-800">
      {/* Subtle Financial Grid Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #ffffff 1px, transparent 1px), linear-gradient(to bottom, #ffffff 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="absolute -top-40 right-1/4 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[140px]" />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left Column: Heading with rotating words & institutional copy */}
          <div className="lg:col-span-7 space-y-6">
            {/* Eyebrow rule */}
            <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>India&apos;s Unlisted Shares Intelligence · Since 2018</span>
            </div>

            {/* Display Headline with Rotating Words */}
            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-bold tracking-tight text-white leading-[1.15]">
              India&apos;s trusted platform for{' '}
              <br className="hidden sm:inline" />
              <span className="text-blue-400 inline-block transition-opacity duration-300">
                {ROTATING_WORDS[wordIndex]}
              </span>
            </h1>

            {/* Lede copy */}
            <p className="text-base sm:text-lg text-slate-300 max-w-[34em] font-normal leading-relaxed">
              Explore one of India&apos;s most comprehensive research directories of unlisted, pre-IPO, and ESOP shares with verified corporate filings and daily indicative market prices.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-3.5 pt-2">
              <Link
                href="/shares"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-lg text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-sm transition-all group"
              >
                <span>Explore Unlisted Shares</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center space-x-2 px-5 py-3 rounded-lg text-sm font-semibold text-slate-200 hover:text-white bg-slate-800/80 hover:bg-slate-800 border border-slate-700 transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-emerald-400" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.5 0 12.066 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Liquidate / Sell ESOPs</span>
              </button>
            </div>

            {/* Authentic Institutional Stats */}
            <div className="flex flex-wrap items-center gap-7 pt-6 border-t border-slate-800">
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  1,00,000<span className="text-blue-400 font-normal">+</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  Investors Served
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  267<span className="text-blue-400 font-normal">+</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  Securities Tracked
                </div>
              </div>
              <div className="h-8 w-px bg-slate-800" />
              <div>
                <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                  250<span className="text-blue-400 font-normal">+</span>
                </div>
                <div className="text-xs text-slate-400 font-medium mt-0.5">
                  Institutional Partners
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Indicative Prices Memo Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-slate-900 rounded-xl shadow-xl border border-slate-200 overflow-hidden relative">
              {/* Financial Blue Highlight Bar */}
              <div className="h-1 w-full bg-blue-600" />

              {/* Card Header */}
              <div className="px-5 py-3.5 flex items-center justify-between border-b border-slate-100 bg-slate-50/70">
                <span className="text-xs tracking-wider uppercase text-slate-700 font-bold flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Today&apos;s Indicative Prices
                </span>
                <span className="text-[11px] text-slate-500 font-medium tabular-nums">
                  Ref · 14 Oct 2026
                </span>
              </div>

              {/* Sparkline Banner Strip */}
              <div className="p-4 bg-slate-50/50 border-b border-slate-100">
                <div className="w-full h-11 relative">
                  <svg viewBox="0 0 320 46" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="herosg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#1D4ED8" stopOpacity=".18" />
                        <stop offset="1" stopColor="#1D4ED8" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0.0,28.0 L7.1,28.0 L14.2,24.0 L21.3,28.0 L28.4,29.6 L35.6,29.6 L42.7,32.0 L49.8,32.0 L56.9,32.0 L64.0,28.0 L71.1,30.4 L78.2,30.4 L85.3,30.4 L92.4,33.6 L99.6,36.8 L106.7,38.4 L113.8,38.4 L120.9,36.8 L128.0,36.8 L135.1,36.8 L142.2,36.8 L149.3,40.0 L156.4,40.0 L163.6,36.8 L170.7,36.8 L177.8,38.4 L184.9,38.4 L192.0,38.4 L199.1,38.4 L206.2,38.4 L213.3,38.4 L220.4,38.4 L227.6,40.0 L234.7,40.0 L241.8,40.0 L248.9,40.0 L256.0,40.0 L263.1,16.0 L270.2,20.8 L277.3,20.8 L284.4,8.0 L291.6,12.0 L298.7,16.0 L305.8,16.0 L312.9,20.8 L320.0,24.0 L320,46 L0,46 Z"
                      fill="url(#herosg)"
                    />
                    <path
                      d="M0.0,28.0 L7.1,28.0 L14.2,24.0 L21.3,28.0 L28.4,29.6 L35.6,29.6 L42.7,32.0 L49.8,32.0 L56.9,32.0 L64.0,28.0 L71.1,30.4 L78.2,30.4 L85.3,30.4 L92.4,33.6 L99.6,36.8 L106.7,38.4 L113.8,38.4 L120.9,36.8 L128.0,36.8 L135.1,36.8 L142.2,36.8 L149.3,40.0 L156.4,40.0 L163.6,36.8 L170.7,36.8 L177.8,38.4 L184.9,38.4 L192.0,38.4 L199.1,38.4 L206.2,38.4 L213.3,38.4 L220.4,38.4 L227.6,40.0 L234.7,40.0 L241.8,40.0 L248.9,40.0 L256.0,40.0 L263.1,16.0 L270.2,20.8 L277.3,20.8 L284.4,8.0 L291.6,12.0 L298.7,16.0 L305.8,16.0 L312.9,20.8 L320.0,24.0"
                      fill="none"
                      stroke="#1D4ED8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <circle cx="320" cy="24" r="3" fill="#1D4ED8" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-slate-600 font-medium">
                    <b className="font-semibold text-slate-900">MSEI Unlisted Shares</b> · 6M Trend
                  </span>
                  <span className="font-semibold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded tabular-nums">
                    ▲ +3.8%
                  </span>
                </div>
              </div>

              {/* Vertical Auto-scrolling Stocks Carousel */}
              <div className="relative h-[216px] overflow-hidden group">
                {/* Top & Bottom gradient mask for smooth fade in/out */}
                <div className="pointer-events-none absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-white via-white/80 to-transparent z-10" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-4 bg-gradient-to-t from-white via-white/80 to-transparent z-10" />

                <div
                  className="animate-vertical-marquee divide-y divide-slate-100"
                  style={{
                    animationDuration: `${Math.max(16, featuredStocks.length * 3.5)}s`,
                  }}
                >
                  {[...featuredStocks, ...featuredStocks].map((stock, idx) => (
                    <div
                      key={`${stock.id}-${idx}`}
                      onClick={() => onSelectStock(stock)}
                      className="p-3.5 sm:px-5 flex items-center justify-between gap-3 hover:bg-blue-50/60 cursor-pointer transition-colors group/item"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center font-semibold text-blue-600 text-xs shrink-0 overflow-hidden">
                          {stock.logo ? (
                            <img src={stock.logo} alt={stock.name} className="w-full h-full object-contain p-1" />
                          ) : (
                            <span>{stock.name.slice(0, 2).toUpperCase()}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <div className="font-semibold text-sm text-slate-900 truncate group-hover/item:text-blue-600 transition-colors">
                            {stock.name}
                          </div>
                          <div className="text-xs text-slate-500 truncate">
                            {stock.sector}
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 flex items-center gap-2.5 sm:gap-3">
                        <div>
                          <div className="text-sm sm:text-base font-bold text-slate-900 tabular-nums">
                            ₹{stock.price.toLocaleString('en-IN')}
                          </div>
                          <div className="text-[10px] tracking-wider uppercase text-slate-500 font-medium">
                            Indicative
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-slate-400 group-hover/item:text-blue-600 group-hover/item:translate-x-0.5 transition-all" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-3 sm:px-5 bg-slate-50/70 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="text-slate-500 text-[11px] flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                  Hover to pause · Indicative prices
                </span>
                <Link
                  href="/shares"
                  className="font-semibold text-blue-600 hover:text-blue-700 hover:underline inline-flex items-center gap-1"
                >
                  Full Directory →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
