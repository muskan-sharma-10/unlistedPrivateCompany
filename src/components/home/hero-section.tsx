'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { StockItem } from '@/data/unlisted-data';

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

  const featuredStocks: StockItem[] = [
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
  ];

  return (
    <section className="relative bg-[#082029] text-white overflow-hidden pt-14 pb-20 lg:pt-20 lg:pb-28 border-b border-[#0f3442]">
      {/* Expansive Ambient Background Glows (Original Theme) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35">
        <div className="absolute -top-32 right-1/4 w-[850px] h-[850px] bg-[#00a887]/25 rounded-full blur-[180px]" />
        <div className="absolute -bottom-32 -left-20 w-[700px] h-[700px] bg-[#0e485b]/45 rounded-full blur-[160px]" />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)',
            backgroundSize: '64px 64px',
          }}
        />
      </div>

      <div className="relative max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Heading with rotating words & unlistedzone content */}
          <div className="lg:col-span-7 space-y-7">
            {/* Eyebrow rule */}
            <div className="inline-flex items-center space-x-3">
              <span className="w-8 h-[2px] bg-[#c5a880]" />
              <span className="text-xs sm:text-[13px] font-semibold tracking-wider text-[#c5a880] uppercase">
                Sharing India’s unlisted shares information · since 2018
              </span>
            </div>

            {/* Display Headline with Rotating Words */}
            <h1 className="text-4xl sm:text-6xl lg:text-[66px] font-bold tracking-tight text-white leading-[1.1]">
              India&apos;s <em className="font-serif italic font-normal text-[#2dd4bf]">home</em> for{' '}
              <br className="hidden sm:inline" />
              <span className="text-[#2dd4bf] inline-block transition-opacity duration-300">
                {ROTATING_WORDS[wordIndex]}
              </span>
            </h1>

            {/* Exact UnlistedZone Lede */}
            <p className="text-[17px] sm:text-[19px] text-slate-300 max-w-[32em] font-normal leading-relaxed">
              Browse one of India’s largest lists of unlisted, pre-IPO and ESOP shares, with researched company data and indicative prices. When you’re ready, we help connect buyers and sellers.
            </p>

            {/* CTAs with Brand Color Styling */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <Link
                href="/shares"
                className="inline-flex items-center space-x-2 px-7 py-3.5 rounded-2xl text-[15px] font-semibold text-white bg-[#00a887] hover:bg-[#009476] shadow-xl shadow-[#00a887]/25 transition-all group"
              >
                <span>Explore unlisted shares</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button
                type="button"
                onClick={onOpenEnquiry}
                className="inline-flex items-center space-x-2.5 px-6 py-3.5 rounded-2xl text-[15px] font-semibold text-slate-200 hover:text-white bg-[#0e313d] hover:bg-[#133d4b] border border-white/10 transition-all cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-[#25d366]" aria-hidden="true">
                  <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.5 0 12.066 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                </svg>
                <span>Sell my ESOP shares</span>
              </button>
            </div>

            {/* Authentic UnlistedZone Stats */}
            <div className="flex flex-wrap items-center gap-8 pt-7 border-t border-white/10">
              <div>
                <div className="text-[30px] font-bold text-white leading-tight num">
                  1,00,000<span className="text-[#2dd4bf] text-[20px] font-normal">+</span>
                </div>
                <div className="text-[12.5px] text-slate-400 font-medium mt-0.5">
                  Investors served
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-[30px] font-bold text-white leading-tight num">
                  267<span className="text-[#2dd4bf] text-[20px] font-normal">+</span>
                </div>
                <div className="text-[12.5px] text-slate-400 font-medium mt-0.5">
                  Shares tracked
                </div>
              </div>
              <div className="h-8 w-px bg-white/10" />
              <div>
                <div className="text-[30px] font-bold text-white leading-tight num">
                  250<span className="text-[#2dd4bf] text-[20px] font-normal">+</span>
                </div>
                <div className="text-[12.5px] text-slate-400 font-medium mt-0.5">
                  Active brokers
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Indicative Prices Memo Card */}
          <div className="lg:col-span-5">
            <div className="bg-white text-[#082029] rounded-2xl shadow-2xl border border-[#dce8e5] overflow-hidden relative">
              {/* Emerald Highlight Bar */}
              <div className="h-[4px] w-full bg-gradient-to-r from-[#00a887] via-[#2dd4bf] to-[#00a887]" />

              {/* Card Header */}
              <div className="p-4 sm:px-5 flex items-center justify-between border-b border-[#e6e9ed]">
                <span className="text-[11.5px] tracking-[0.16em] uppercase text-[#00a887] font-bold flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#00a887] pulse-dot" />
                  Today’s indicative prices
                </span>
                <span className="text-[11px] text-slate-400 font-semibold num">
                  REF · 14 Oct 2026
                </span>
              </div>

              {/* Sparkline Banner Strip */}
              <div className="p-4 bg-[#f8fafc] border-b border-[#e6e9ed]">
                <div className="w-full h-11 relative">
                  <svg viewBox="0 0 320 46" preserveAspectRatio="none" className="w-full h-full" aria-hidden="true">
                    <defs>
                      <linearGradient id="herosg" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0" stopColor="#00a887" stopOpacity=".28" />
                        <stop offset="1" stopColor="#00a887" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    <path
                      d="M0.0,28.0 L7.1,28.0 L14.2,24.0 L21.3,28.0 L28.4,29.6 L35.6,29.6 L42.7,32.0 L49.8,32.0 L56.9,32.0 L64.0,28.0 L71.1,30.4 L78.2,30.4 L85.3,30.4 L92.4,33.6 L99.6,36.8 L106.7,38.4 L113.8,38.4 L120.9,36.8 L128.0,36.8 L135.1,36.8 L142.2,36.8 L149.3,40.0 L156.4,40.0 L163.6,36.8 L170.7,36.8 L177.8,38.4 L184.9,38.4 L192.0,38.4 L199.1,38.4 L206.2,38.4 L213.3,38.4 L220.4,38.4 L227.6,40.0 L234.7,40.0 L241.8,40.0 L248.9,40.0 L256.0,40.0 L263.1,16.0 L270.2,20.8 L277.3,20.8 L284.4,8.0 L291.6,12.0 L298.7,16.0 L305.8,16.0 L312.9,20.8 L320.0,24.0 L320,46 L0,46 Z"
                      fill="url(#herosg)"
                    />
                    <path
                      d="M0.0,28.0 L7.1,28.0 L14.2,24.0 L21.3,28.0 L28.4,29.6 L35.6,29.6 L42.7,32.0 L49.8,32.0 L56.9,32.0 L64.0,28.0 L71.1,30.4 L78.2,30.4 L85.3,30.4 L92.4,33.6 L99.6,36.8 L106.7,38.4 L113.8,38.4 L120.9,36.8 L128.0,36.8 L135.1,36.8 L142.2,36.8 L149.3,40.0 L156.4,40.0 L163.6,36.8 L170.7,36.8 L177.8,38.4 L184.9,38.4 L192.0,38.4 L199.1,38.4 L206.2,38.4 L213.3,38.4 L220.4,38.4 L227.6,40.0 L234.7,40.0 L241.8,40.0 L248.9,40.0 L256.0,40.0 L263.1,16.0 L270.2,20.8 L277.3,20.8 L284.4,8.0 L291.6,12.0 L298.7,16.0 L305.8,16.0 L312.9,20.8 L320.0,24.0"
                      fill="none"
                      stroke="#00a887"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                    />
                    <circle cx="320" cy="24" r="3.5" fill="#00a887" />
                    <circle cx="320" cy="24" r="7" fill="rgba(0,168,135,.2)" />
                  </svg>
                </div>
                <div className="flex items-center justify-between text-xs pt-2">
                  <span className="text-[#334155] font-medium">
                    <b className="font-semibold text-[#082029]">MSEI Unlisted Shares</b> · 6M trend
                  </span>
                  <span className="font-semibold text-[#00a887] bg-[#e6f7f3] px-2 py-0.5 rounded num">
                    ▲ +3.8%
                  </span>
                </div>
              </div>

              {/* 3 Live Featured Stocks */}
              <div className="divide-y divide-[#e6e9ed]">
                {featuredStocks.map((stock) => (
                  <div
                    key={stock.id}
                    onClick={() => onSelectStock(stock)}
                    className="p-4 sm:px-5 flex items-center justify-between gap-3 hover:bg-[#f3f8f7] cursor-pointer transition-colors group"
                  >
                    <div className="flex items-center gap-3.5 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#e6f7f3] flex items-center justify-center font-semibold text-[#00a887] text-[13px] shrink-0 overflow-hidden">
                        {stock.id === 'msei' && (
                          <img src="/logos/msei.webp" alt={stock.name} className="w-full h-full object-contain" />
                        )}
                        {stock.id === 'hpx' && (
                          <img src="/logos/hpx.webp" alt={stock.name} className="w-full h-full object-contain" />
                        )}
                        {stock.id === 'onix' && (
                          <img src="/logos/onix.webp" alt={stock.name} className="w-full h-full object-contain" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <div className="font-semibold text-[14px] text-[#082029] truncate group-hover:text-[#00a887] transition-colors">
                          {stock.name}
                        </div>
                        <div className="text-[11.5px] text-gray-500">
                          {stock.sector}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0 flex items-center gap-3">
                      <div>
                        <div className="text-[17px] font-semibold text-[#082029] num">
                          <span className="rupee">₹</span>{stock.price}
                        </div>
                        <div className="text-[10px] tracking-[0.1em] uppercase text-[#00a887] font-semibold">
                          Indicative
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-[#00a887] group-hover:translate-x-0.5 transition-all" />
                    </div>
                  </div>
                ))}
              </div>

              {/* Card Footer */}
              <div className="p-3.5 sm:px-5 bg-[#f8fafc] flex items-center justify-between text-xs">
                <span className="text-gray-500">
                  Rates are indicative, not an offer to deal.
                </span>
                <Link
                  href="/shares"
                  className="font-semibold text-[#00a887] hover:underline inline-flex items-center gap-1"
                >
                  See full list →
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
