'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  FileText,
  Clock,
  ArrowRight,
  Download,
  Search,
  Eye,
  CheckCircle,
  TrendingUp,
  Share2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { getPortalResearchReports, ResearchEntity } from '@/lib/supabase/queries';

export default function ResearchClient() {
  const [filterTag, setFilterTag] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [reports, setReports] = useState<ResearchEntity[]>([]);

  React.useEffect(() => {
    getPortalResearchReports().then((data) => {
      if (data && data.length > 0) setReports(data);
    });
  }, []);

  const fallbackReports = [
    {
      id: 'inox-air-products-drhp',
      title: "INOX Air Products DRHP Analysis: Linde India's Biggest Rival Goes Public",
      tag: 'DRHP Note',
      date: '01 Oct 2026',
      readTime: '8 min read',
      views: '1,420',
      analyst: 'Private Market Research Desk',
      stockSlug: 'inox-air-products',
      summary:
        'A comprehensive breakdown of the 689-page draft prospectus. We evaluate operating margins across cryogenic medical and industrial oxygen plants, examine the 50:50 joint venture structure with Air Products USA, and model pre-IPO valuation multiples against listed peer Linde India.',
      keyTakeaways: [
        'Commands over 45% of India’s merchant cryogenic liquid gas market.',
        'High EBITDA margins of 38% backed by long-term take-or-pay industrial contracts.',
        '100% Offer For Sale of 7.72 crore equity shares.',
      ],
    },
    {
      id: 'inox-clean-energy-ipo',
      title: 'Inox Clean Energy: Decoding the ₹10,000 Crore Green Energy Public Issue',
      tag: 'Valuation Note',
      date: '30 Sep 2026',
      readTime: '6 min read',
      views: '980',
      analyst: 'Renewables Specialist Desk',
      stockSlug: 'onix-renewable',
      summary:
        'Tracing the journey from a 50 MW wind project to a 9.29 GW diversified power portfolio with 6 GW solar cell manufacturing capacity. We analyze debt-to-equity ratios, PPA tariffs, and compare unlisted multiples with Suzlon and Inox Wind.',
      keyTakeaways: [
        'Aggressive expansion from pure-play wind into hybrid solar parks and battery storage.',
        'Order pipeline of 9.29 GW with assured state and central utility tariffs.',
        'Pre-IPO valuation reflects healthy upside potential compared to recent listing benchmarks.',
      ],
    },
    {
      id: 'maverick-surgical-simulation',
      title: "Maverick Simulation: The ₹125 Crore Bet on AI Surgical Training",
      tag: 'Tech Deep-Dive',
      date: '30 Sep 2026',
      readTime: '5 min read',
      views: '760',
      analyst: 'Healthcare & Tech Desk',
      stockSlug: 'msei',
      summary:
        'Delhi-based high-fidelity medical robotics developer Maverick acquired Swiss surgery-simulator company Voxel-Man. We review their recurring SaaS software licensing, dental and laparoscopic simulation hardware, and export traction in Europe.',
      keyTakeaways: [
        'Proprietary haptic-feedback algorithms with high global barriers to entry.',
        'Over 70% recurring software maintenance margins.',
        'Export pipeline expanding into medical universities across Germany and Japan.',
      ],
    },
    {
      id: 'nse-monopoly-valuation',
      title: 'National Stock Exchange (NSE): Monopoly Cash Flows & FY27 Valuation Outlook',
      tag: 'Bluechip Deep-Dive',
      date: '24 Sep 2026',
      readTime: '10 min read',
      views: '3,850',
      analyst: 'Exchanges Specialist',
      stockSlug: 'nse-india',
      summary:
        'With equity derivatives volumes breaking international records, NSE generates extraordinary operating profit margins above 70%. We project earnings growth based on transaction charges, colocation fees, and compare pricing against BSE.',
      keyTakeaways: [
        'Over 90% market share in index and stock options contract volumes.',
        'Debt-free balance sheet with return on equity exceeding 34%.',
        'Board actively pursuing SEBI NOC for domestic public listing.',
      ],
    },
    {
      id: 'msei-turnaround-thesis',
      title: 'MSEI Turnaround Thesis: How Peak XV and Marquee Brokers Are Rebuilding India’s Third Exchange',
      tag: 'Special Situation',
      date: '18 Sep 2026',
      readTime: '7 min read',
      views: '2,150',
      analyst: 'Market Infrastructure Desk',
      stockSlug: 'msei',
      summary:
        'Inside the ₹1,238 Crore capital infusion from Peak XV, Groww, Zerodha founders (Rainmatter), and 25+ institutional broking powerhouses. We analyze the Liquidity Enhancement Scheme and options market share potential.',
      keyTakeaways: [
        'Broker consortium controls massive retail and proprietary order flow.',
        'Clearing corporation MCCIL infrastructure is fully integrated and licensed.',
        'Deep turnaround valuation option with attractive risk-reward asymmetry.',
      ],
    },
    {
      id: 'zepto-quick-commerce',
      title: 'Zepto Unit Economics: Unpacking Dark Store Payback & Non-Grocery Margins',
      tag: 'Hypergrowth',
      date: '12 Sep 2026',
      readTime: '8 min read',
      views: '2,640',
      analyst: 'Consumer Tech Desk',
      stockSlug: 'zepto',
      summary:
        'As Zepto expands beyond groceries into electronics, lifestyle, and beauty, average order values (AOV) have climbed significantly. We study dark-store density in Mumbai and Bengaluru and project timeline to consolidated EBITDA profitability.',
      keyTakeaways: [
        'Mature stores achieving positive contribution margins within 6 months.',
        'High-margin advertising and non-grocery retail increasing take-rate.',
        'Redomiciling to India in active preparation for FY26 IPO.',
      ],
    },
  ];

  const tags = ['All', 'DRHP Note', 'Valuation Note', 'Tech Deep-Dive', 'Bluechip Deep-Dive', 'Special Situation', 'Hypergrowth'];

  const activeReports = reports.length > 0 ? reports : fallbackReports;

  const filtered = activeReports.filter((r) => {
    const matchesTag = filterTag === 'All' || r.tag === filterTag;
    const matchesSearch =
      r.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      r.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Hero Banner with Deep Navy Institutional Theme */}
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
          <div className="absolute -bottom-40 left-10 w-[500px] h-[500px] bg-emerald-600/10 rounded-full blur-[140px]" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, description, and coverage specs */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>Independent Intelligence · Research &amp; Valuations</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
                Company Research &amp;{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
                  Valuation Reports
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-[36em] font-normal leading-relaxed">
                Institutional-grade breakdowns of unlisted balance sheets, DRHP draft prospectuses, and private-market valuations prepared by our research desk for informed decisions.
              </p>

              {/* Metric Counters Row */}
              <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    Audited
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Annual Reports &amp; ROC Filings
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                    DRHP &amp; RHP
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Draft Prospectus Analysis
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    Multiples
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    P/E &amp; EV/EBITDA Benchmarking
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Research Desk Highlights Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      Research Desk Coverage
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    Institutional
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Balance Sheets</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">3-Yr Trend Analysis</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Shareholding</span>
                    <span className="text-sm font-bold text-emerald-400 mt-0.5 block">Cap Tables &amp; ESOPs</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Peer Comparison</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Listed vs Unlisted</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Pricing History</span>
                    <span className="text-sm font-bold text-blue-400 mt-0.5 block">Secondary OTC Trends</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>No Paid Promotional Coverage</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsEnquiryOpen(true)}
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group cursor-pointer"
                  >
                    <span>Request Report</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1 space-y-8">
        {/* Filter & Search Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {tags.map((t) => (
              <button
                key={t}
                onClick={() => setFilterTag(t)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  filterTag === t
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                {t}
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports by company or keyword..."
              className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Research Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3.5">
                  <span className="text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                    {item.tag}
                  </span>
                  <div className="flex items-center space-x-2.5 text-slate-500 tabular-nums text-xs">
                    <span className="flex items-center space-x-1">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>{item.readTime}</span>
                    </span>
                    <span className="text-slate-300">·</span>
                    <span>{item.date}</span>
                  </div>
                </div>

                <Link href={`/research/${item.id}`}>
                  <h2 className="text-lg sm:text-xl font-bold text-[#0B132B] group-hover:text-blue-700 transition-colors leading-snug mb-3">
                    {item.title}
                  </h2>
                </Link>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-5 line-clamp-3">
                  {item.summary}
                </p>

                {/* Key Takeaways Box */}
                <div className="p-3.5 sm:p-4 rounded-lg bg-slate-50 border border-slate-200/80 text-xs text-slate-700 space-y-2 mb-5">
                  <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider block">
                    Key Investment Takeaways
                  </span>
                  {item.keyTakeaways.map((point, idx) => (
                    <div key={idx} className="flex items-start space-x-2">
                      <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Links */}
              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">{item.analyst}</span>

                <div className="flex items-center space-x-2">
                  <Link
                    href={`/research/${item.id}`}
                    className="px-3 py-1.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-blue-700 transition-colors inline-flex items-center space-x-1"
                  >
                    <span>Read Note</span>
                  </Link>

                  {item.stockSlug && (
                    <Link
                      href={`/shares/${item.stockSlug}`}
                      className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white inline-flex items-center space-x-1 transition-colors shadow-xs"
                    >
                      <span>Stock Data</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
}

