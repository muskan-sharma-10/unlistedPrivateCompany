'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileCheck2,
  CheckCircle2,
  Calendar,
  Building2,
  TrendingUp,
  ArrowRight,
  Download,
  Search,
  ExternalLink,
  Shield,
  HelpCircle,
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { getPortalDRHP, DRHPEntity } from '@/lib/supabase/queries';

export default function DrhpClient() {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [drhpList, setDrhpList] = useState<DRHPEntity[]>([]);

  React.useEffect(() => {
    getPortalDRHP().then((data) => {
      setDrhpList(data);
    });
  }, []);

  const filtered = drhpList.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sector.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      filterStatus === 'All' || item.status.toLowerCase().includes(filterStatus.toLowerCase());
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col font-sans antialiased">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Hero Banner with Institutional Deep Navy Theme */}
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

        <div className="relative max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Heading, description, and trust stats */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                <span>SEBI Draft Filings · Pre-Listing Market Intelligence</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-[52px] font-bold tracking-tight text-white leading-[1.12]">
                DRHP Filed Companies{' '}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
                  in India
                </span>
              </h1>

              <p className="text-base sm:text-lg text-slate-300 max-w-[36em] font-normal leading-relaxed">
                Track companies that have officially filed their Draft Red Herring Prospectus (DRHP) with SEBI for upcoming initial public offerings. Analyze indicative unlisted prices, book runners, and issue sizes before public subscription opens.
              </p>

              {/* Metric Counters Row */}
              <div className="flex flex-wrap items-center gap-6 pt-5 border-t border-slate-800">
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    ₹ 85,000<span className="text-blue-400 font-normal">+ Cr</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Proposed Issue Pipeline
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">
                    24<span className="text-emerald-400 font-normal">+</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Active DRHP Filings
                  </div>
                </div>
                <div className="h-8 w-px bg-slate-800" />
                <div>
                  <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">
                    4–6<span className="text-blue-400 font-normal"> Mo</span>
                  </div>
                  <div className="text-xs text-slate-400 font-medium mt-0.5">
                    Avg. Window to IPO
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: DRHP Intelligence Matrix Card */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl bg-gradient-to-b from-slate-900/95 to-slate-950/90 border border-slate-800 p-6 shadow-2xl backdrop-blur-xl space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-200">
                      DRHP Pipeline Intelligence
                    </span>
                  </div>
                  <span className="text-[11px] font-semibold text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                    SEBI Verified
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Issue Types</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Fresh Issue &amp; OFS</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Filing Authority</span>
                    <span className="text-sm font-bold text-emerald-400 mt-0.5 block">SEBI India</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Pre-IPO Trading</span>
                    <span className="text-sm font-bold text-white mt-0.5 block">Indicative OTC</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-slate-800/50 border border-slate-800/80">
                    <span className="text-[11px] font-medium text-slate-400 block">Book Running Lead</span>
                    <span className="text-sm font-bold text-blue-400 mt-0.5 block">Tier-1 Merchant Banks</span>
                  </div>
                </div>

                <div className="pt-1 flex items-center justify-between text-xs text-slate-400">
                  <div className="flex items-center space-x-1.5">
                    <span className="text-emerald-400">✓</span>
                    <span>Direct SEBI Draft Prospectus Links</span>
                  </div>
                  <Link
                    href="/shares"
                    className="text-blue-400 hover:text-blue-300 font-medium inline-flex items-center gap-1 group"
                  >
                    <span>All Shares</span>
                    <span className="group-hover:translate-x-0.5 transition-transform">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 py-8 sm:py-12 w-full flex-1 space-y-8">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {['All', 'Cleared', 'Approved', 'Review'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg transition-all ${
                  filterStatus === st
                    ? 'bg-blue-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {st === 'All' ? 'All Status' : `SEBI ${st}`}
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search company or sector..."
              className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50/70 border border-slate-300 rounded-lg pl-9 pr-3 py-2 outline-none focus:border-blue-600 focus:bg-white transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* DRHP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl p-6 border border-slate-200 hover:border-blue-500/80 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-11 h-11 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center font-bold text-sm shrink-0">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <h2 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                          {item.name}
                        </h2>
                        {item.companyUrl && (
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-2 py-0.5 rounded-md bg-slate-100 text-slate-600 hover:text-blue-600 hover:bg-blue-50 border border-slate-200 transition-colors text-xs font-medium"
                            title={`Visit ${item.name} website`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-slate-400 font-medium">
                        {item.sector}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.status}</span>
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-4 line-clamp-3">
                  {item.description}
                </p>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-3.5 rounded-lg bg-slate-50 border border-slate-100 text-xs text-slate-600 mb-4">
                  <div>
                    <span className="text-slate-400 block mb-0.5">Issue Size</span>
                    <span className="font-semibold text-slate-900 tabular-nums">{item.issueSize}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Filing Date</span>
                    <span className="font-semibold text-slate-900 tabular-nums">{item.filingDate}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block mb-0.5">Indicative Price</span>
                    <span className="font-bold text-blue-700 tabular-nums">₹{item.indicativePrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-xs text-slate-500 font-medium">
                  <span className="font-semibold text-slate-700">Lead Managers:</span> {item.brlm}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/shares/${item.id}`}
                    className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-xs font-semibold transition-colors inline-flex items-center space-x-1.5 shadow-xs"
                  >
                    <span>Stock Breakdown</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>

                  {item.companyUrl && (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3 py-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 text-xs font-semibold transition-colors inline-flex items-center space-x-1"
                      title="Visit official company website"
                    >
                      <span>Official Site</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="px-3.5 py-2 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold transition-colors cursor-pointer"
                >
                  Enquire Lot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Guidance Section */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
          <div className="flex items-center space-x-2 text-blue-700 font-bold text-lg">
            <Shield className="w-5 h-5" />
            <h3 className="text-slate-900">Understanding the DRHP Process</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-1.5">1. What is a DRHP?</h4>
              <p>
                A Draft Red Herring Prospectus is the preliminary registration document filed with SEBI containing audited financials, business overview, risk factors, and promoter shareholding.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-1.5">2. SEBI Observations</h4>
              <p>
                SEBI reviews the draft document for regulatory compliance. Once observations are satisfactorily answered and cleared, the company files the final RHP with price bands.
              </p>
            </div>
            <div className="p-4 rounded-lg bg-slate-50 border border-slate-100">
              <h4 className="font-bold text-sm text-slate-900 mb-1.5">3. 6-Month Lock-in Period</h4>
              <p>
                As per SEBI guidelines, unlisted shares acquired prior to an IPO are subject to a mandatory 6-month holding lock-in starting from the listing allotment date.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
      <EnquiryModal isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </div>
  );
}

