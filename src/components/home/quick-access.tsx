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
    <section className="bg-slate-50/70 py-12 sm:py-16 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8 sm:mb-10">
          <div>
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-blue-600 uppercase mb-2">
              <span className="w-6 h-0.5 bg-blue-600" />
              <span>Market Discovery</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Explore the Unlisted Market
            </h2>
            <p className="text-sm text-slate-500 mt-1 max-w-2xl">
              Navigate structured segments of India&apos;s leading private equity and unlisted securities.
            </p>
          </div>

          <Link
            href="/shares"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center space-x-1.5 transition-colors group shrink-0"
          >
            <span>View All Categories</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* 4 Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <Link
                key={card.id}
                href={card.href}
                className="group bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-400/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Icon Header */}
                  <div className="flex items-center justify-between mb-5">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold uppercase px-2.5 py-1 rounded-md bg-slate-100 text-slate-700 border border-slate-200 tracking-wider">
                      {card.badge}
                    </span>
                  </div>

                  {/* Title & Desc */}
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                    {card.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mt-2">
                    {card.desc}
                  </p>
                </div>

                {/* Footer link */}
                <div className="mt-6 pt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-blue-600 group-hover:text-blue-700">
                  <span>Explore category</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1.5 group-hover:translate-x-1 transition-transform" />
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
