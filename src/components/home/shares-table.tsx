'use client';

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { StockItem } from '@/data/unlisted-data';
import { getPortalShares } from '@/lib/supabase/queries';

interface SharesTableProps {
  onSelectStock: (stock: StockItem) => void;
  selectedCategory?: string;
  onOpenEnquiry?: (stockName?: string) => void;
}

export const SharesTable: React.FC<SharesTableProps> = ({
  onSelectStock,
  onOpenEnquiry,
}) => {
  const [liveShares, setLiveShares] = useState<StockItem[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    let isMounted = true;
    getPortalShares()
      .then((data) => {
        if (isMounted) {
          if (data && data.length > 0) {
            setLiveShares(data);
          }
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.warn('[SharesTable] Error fetching shares:', err);
        if (isMounted) setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Baseline fallback for Popular shares only if DB is completely unreachable
  const fallbackPopularShares: StockItem[] = [
    {
      id: 'msei-unlisted-shares',
      name: 'Metropolitan Stock Exchange (MSEI) Unlisted Shares',
      sector: 'Financial Services',
      price: 6.75,
      change: '+3.8%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: 'Recently',
      description: 'Full-service nationwide stock exchange offering trading in Capital Market and Derivatives.',
      sparkline: [5.8, 6.0, 6.1, 6.3, 6.5, 6.75],
      logo: '/logos/msei.webp',
    },
    {
      id: 'onix',
      name: 'Onix Renewable Limited',
      sector: 'Renewable Energy',
      price: 46,
      change: '+6.2%',
      changeType: 'up',
      category: 'Popular',
      lastUpdated: 'Recently',
      description: 'Onix Renewable Limited is leading clean energy generation and sustainable solar installations across India.',
      sparkline: [40, 42, 43, 44, 46],
      logo: '/logos/onix.webp',
    },
  ];

  // 1. New Arrivals: strictly derived from live CMS additions (ordered by creation date)
  const displayNewArrivals = useMemo(() => {
    if (!liveShares || liveShares.length === 0) return [];

    // Prioritize CMS stocks explicitly assigned to New Arrival / Recently Updated category
    const explicitlyTagged = liveShares.filter((s) => {
      const cat = (s.category || '').toLowerCase();
      return (
        cat === 'new arrival' ||
        cat === 'new arrivals' ||
        cat === 'recently updated' ||
        cat === 'fresh additions'
      );
    });

    if (explicitlyTagged.length >= 4) {
      return explicitlyTagged.slice(0, 4);
    }

    // Combine tagged with the newest published shares from CMS (liveShares is ordered by created_at desc)
    const result: StockItem[] = [...explicitlyTagged];
    for (const share of liveShares) {
      if (result.length >= 4) break;
      if (!result.some((item) => item.id === share.id)) {
        result.push(share);
      }
    }
    return result;
  }, [liveShares]);

  // 2. Popular Shares: high-demand established counters from CMS, excluding items shown in New Arrivals
  const displayPopular = useMemo(() => {
    if (!liveShares || liveShares.length === 0) return fallbackPopularShares;

    const newArrivalIds = new Set(displayNewArrivals.map((s) => s.id));
    const available = liveShares.filter((s) => !newArrivalIds.has(s.id));

    // Curated high-demand tickers from CMS to highlight in Popular
    const popularPriority = ['msei', 'zepto', 'csk', 'oyo', 'ncdex', 'api', 'onix', 'lohum', 'agnikul'];
    const popularPicks: StockItem[] = [];

    for (const key of popularPriority) {
      if (popularPicks.length >= 4) break;
      const match = available.find(
        (s) =>
          s.id.toLowerCase().includes(key) ||
          (s.ticker && s.ticker.toLowerCase().includes(key)) ||
          s.name.toLowerCase().includes(key)
      );
      if (match && !popularPicks.some((p) => p.id === match.id)) {
        popularPicks.push(match);
      }
    }

    // Backfill up to 4 from remaining available CMS shares
    for (const share of available) {
      if (popularPicks.length >= 4) break;
      if (!popularPicks.some((p) => p.id === share.id)) {
        popularPicks.push(share);
      }
    }

    return (popularPicks.length > 0 ? popularPicks : fallbackPopularShares).slice(0, 4);
  }, [liveShares, displayNewArrivals]);

  const renderStockCard = (stock: StockItem, isNewArrival = false) => {
    const initials =
      (stock.ticker || stock.name)
        .replace(/[^a-zA-Z0-9]/g, '')
        .slice(0, 2)
        .toUpperCase() || 'UP';

    return (
      <div
        key={stock.id}
        className="rounded-xl border border-slate-200 bg-white p-5 hover:border-blue-500/80 hover:shadow-md transition-all flex flex-col justify-between"
      >
        <div>
          <div className="flex items-start gap-3.5 mb-4">
            <div
              className={`w-11 h-11 rounded-lg flex items-center justify-center shrink-0 overflow-hidden ${
                isNewArrival
                  ? 'bg-blue-50 border border-blue-100 text-blue-700 font-bold text-sm'
                  : 'bg-slate-100 border border-slate-200 p-1'
              }`}
            >
              {stock.logo ? (
                <img
                  src={stock.logo}
                  alt={stock.name}
                  className="w-full h-full object-contain"
                />
              ) : (
                <span className={isNewArrival ? 'text-blue-700 font-bold text-sm' : 'font-bold text-blue-700 text-xs'}>
                  {initials}
                </span>
              )}
            </div>
            <div className="min-w-0">
              <Link href={`/shares/${stock.id}`} className="hover:text-blue-600 transition-colors">
                <h3 className="font-semibold text-sm text-slate-900 leading-snug line-clamp-2">
                  {stock.name}
                </h3>
              </Link>
              <div className="text-xs text-slate-500 mt-0.5 truncate">
                {stock.sector || 'Unlisted Equity'}
              </div>
            </div>
          </div>

          {/* Price */}
          <div className="pt-1 pb-4">
            <div className="text-2xl font-bold text-slate-900 leading-none tabular-nums">
              {stock.price > 0 ? (
                <>
                  <span className="rupee">₹</span>
                  {stock.price.toLocaleString('en-IN', { maximumFractionDigits: 2 })}
                </>
              ) : (
                <span className="text-blue-600 text-base font-semibold">Pre-IPO / On Request</span>
              )}
            </div>
            <div className="text-[10px] tracking-wider uppercase font-semibold text-slate-500 mt-1.5">
              Indicative
            </div>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="flex items-center gap-2 pt-3 border-t border-slate-100 mt-auto">
          <button
            type="button"
            onClick={() => {
              if (onOpenEnquiry) onOpenEnquiry(stock.name);
              else onSelectStock(stock);
            }}
            className="flex-1 py-2 rounded-lg text-white font-semibold text-xs bg-blue-600 hover:bg-blue-700 active:bg-blue-800 shadow-xs transition-colors cursor-pointer"
          >
            Enquire
          </button>
          <Link
            href={`/shares/${stock.id}`}
            className="px-3.5 py-2 rounded-lg text-slate-700 font-semibold text-xs border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors inline-flex items-center justify-center cursor-pointer"
          >
            Details
          </Link>
        </div>
      </div>
    );
  };

  const renderSkeletons = () => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
      {[1, 2, 3, 4].map((i) => (
        <div
          key={i}
          className="rounded-xl border border-slate-200 bg-white p-5 animate-pulse flex flex-col justify-between"
        >
          <div>
            <div className="flex items-start gap-3.5 mb-4">
              <div className="w-11 h-11 rounded-lg bg-slate-100 shrink-0" />
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-slate-200 rounded w-3/4" />
                <div className="h-3 bg-slate-100 rounded w-1/2" />
              </div>
            </div>
            <div className="pt-1 pb-4">
              <div className="h-6 bg-slate-200 rounded w-1/3 mb-1.5" />
              <div className="h-2.5 bg-slate-100 rounded w-16" />
            </div>
          </div>
          <div className="flex items-center gap-2 pt-3 border-t border-slate-100">
            <div className="h-8 bg-slate-200 rounded-lg flex-1" />
            <div className="h-8 bg-slate-100 rounded-lg w-16" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div id="shares" className="bg-white">
      {/* SECTION 1: Popular unlisted shares (Top picks) */}
      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
                Top Picks
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                Popular Unlisted Shares
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                The most actively researched securities by private market investors. Indicative rates for research only.
              </p>
            </div>
            <Link
              href="/shares"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-500 px-4 py-2 rounded-lg self-start sm:self-auto transition-all"
            >
              View All Shares →
            </Link>
          </div>

          {/* 4 Cards Grid */}
          {isLoading && liveShares.length === 0 ? (
            renderSkeletons()
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayPopular.map((stock) => renderStockCard(stock, false))}
            </div>
          )}
        </div>
      </section>

      {/* SECTION 2: Fresh additions (New arrivals) */}
      <section className="py-12 sm:py-16 border-b border-slate-200">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
                Fresh Additions
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
                New Arrivals
              </h2>
              <p className="text-sm text-slate-500 mt-1 max-w-xl">
                Recently added private companies and upcoming IPO prospects. Research fundamentals before participating.
              </p>
            </div>
            <Link
              href="/shares"
              className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-500 px-4 py-2 rounded-lg self-start sm:self-auto transition-all"
            >
              View All →
            </Link>
          </div>

          {/* 4 Cards Grid */}
          {isLoading && liveShares.length === 0 ? (
            renderSkeletons()
          ) : displayNewArrivals.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {displayNewArrivals.map((stock) => renderStockCard(stock, true))}
            </div>
          ) : (
            <div className="text-center py-8 text-sm text-slate-500">
              No new arrivals available.
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default SharesTable;
