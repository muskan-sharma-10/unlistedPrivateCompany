'use client';

import React from 'react';
import Link from 'next/link';
import { BarChart3, Clock, FileText, BookOpen, ArrowRight } from 'lucide-react';

interface QuickAccessProps {
  onCategoryClick: (category: string) => void;
}

export const QuickAccess: React.FC<QuickAccessProps> = ({ onCategoryClick }) => {
  const cards = [
    {
      id: 'popular',
      category: 'Popular',
      title: 'Popular Unlisted Shares',
      desc: 'Explore most tracked unlisted companies with live indicative prices and high liquidity.',
      icon: BarChart3,
      badge: 'High Liquidity',
      href: '/shares',
    },
    {
      id: 'recently-updated',
      category: 'Recently Updated',
      title: 'Recently Updated',
      desc: 'Check latest updates on private equity revisions, market news, and verified price action.',
      icon: Clock,
      badge: 'Price Action',
      href: '/shares',
    },
    {
      id: 'drhp-filed',
      category: 'DRHP Filed',
      title: 'DRHP Filed Companies',
      desc: 'Explore pre-IPO companies that have submitted their draft prospectus to SEBI for upcoming listings.',
      icon: FileText,
      badge: 'IPO Bound',
      href: '/drhp-filed',
    },
    {
      id: 'company-research',
      category: 'Research',
      title: 'Company Research',
      desc: 'In-depth research notes, financial balance sheets, business overviews, and valuation reports.',
      icon: BookOpen,
      badge: 'Deep Intelligence',
      href: '/research',
    },
  ];

  return (
    <section className="bg-[#f0f6f4] py-20 sm:py-28 lg:py-36 border-b border-[#dce8e5]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Section Header with generous margin */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div>
            <div className="inline-flex items-center space-x-3 text-xs sm:text-sm font-semibold tracking-wider text-[#00a887] uppercase mb-3.5">
              <span className="w-10 h-[2.5px] bg-[#00a887]" />
              <span>Quick Access Portals</span>
            </div>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#082029]">
              Explore the Unlisted Market
            </h2>
          </div>

          <Link
            href="/shares"
            className="text-base sm:text-lg font-semibold text-[#00a887] hover:text-[#008f73] inline-flex items-center space-x-2 transition-colors group shrink-0"
          >
            <span>View all sections</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1.5 transition-transform" />
          </Link>
        </div>

        {/* 4 Ultra-Spacious Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 xl:gap-8">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="group bg-white rounded-[2.2rem] p-9 sm:p-10 xl:p-11 border border-[#dce8e5] hover:border-[#00a887] shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 flex flex-col justify-between min-h-[360px]"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-8">
                    <div className="w-18 h-18 rounded-2xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center group-hover:bg-[#00a887] group-hover:text-white transition-all duration-300 shadow-xs">
                      <Icon className="w-9 h-9" />
                    </div>
                    <span className="text-xs font-semibold uppercase px-3.5 py-1.5 rounded-full bg-[#f1f5f9] text-slate-700 tracking-wider">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-2xl sm:text-[26px] font-semibold text-[#082029] mb-3.5 group-hover:text-[#00a887] transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-base text-gray-600 font-normal leading-relaxed">
                    {card.desc}
                  </p>
                </div>

                {/* Footer link */}
                <div className="mt-10 pt-6 border-t border-gray-100 flex items-center text-base font-semibold text-[#00a887] group-hover:text-[#008f73]">
                  <span>Explore section</span>
                  <ArrowRight className="w-4.5 h-4.5 ml-2 group-hover:translate-x-2 transition-transform" />
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default QuickAccess;
