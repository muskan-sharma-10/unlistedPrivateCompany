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
  HelpCircle
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { STOCKS_DATA } from '@/data/unlisted-data';
import { getPortalDRHP, DRHPEntity } from '@/lib/supabase/queries';

export default function DrhpFiledPage() {
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
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Hero Banner with Dark Teal Theme */}
      <section className="bg-[#082029] text-white py-16 sm:py-24 border-b border-[#0d2e38] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a887]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider text-[#c5a880] uppercase">
              <span className="w-6 h-[2px] bg-[#c5a880]" />
              <span>SEBI Draft Filings · Pre-Listing Opportunities</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              DRHP Filed Companies in India
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Track companies that have officially filed their Draft Red Herring Prospectus (DRHP) with SEBI for upcoming initial public offerings. Analyze indicative unlisted price levels and book runner details before public subscription opens.
            </p>
          </div>

          {/* 3 Metric Badges */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mt-10 pt-8 border-t border-white/10 max-w-4xl">
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-semibold text-white">₹ 85,000+ Cr</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Proposed Total Issue Pipeline</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-semibold text-emerald-400">24+ Companies</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Active DRHP Filings Tracked</div>
            </div>
            <div className="p-4 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-2xl font-semibold text-teal-300">4–6 Months</div>
              <div className="text-xs text-slate-300 font-medium mt-0.5">Avg. Window to Listing Date</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 w-full flex-1 space-y-10">
        {/* Search & Filter Bar */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dce8e5] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none">
            {['All', 'Cleared', 'Approved', 'Review'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl transition-all ${
                  filterStatus === st
                    ? 'bg-[#00a887] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
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
              className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* Spacious DRHP Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl p-7 sm:p-8 border border-[#dce8e5] hover:border-[#00a887] shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3.5">
                    <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-[#082029] to-[#00a887] text-white flex items-center justify-center font-semibold text-base shadow-xs shrink-0">
                      {item.name.slice(0, 2).toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center space-x-2 flex-wrap gap-y-1">
                        <h2 className="text-xl sm:text-2xl font-semibold text-[#082029] group-hover:text-[#00a887] transition-colors">
                          {item.name}
                        </h2>
                        {item.companyUrl && (
                          <a
                            href={item.companyUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-teal-50 text-[#00a887] border border-teal-200 hover:bg-[#00a887] hover:text-white transition-all text-xs font-medium"
                            title={`Visit ${item.name} website`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>Website</span>
                            <ExternalLink className="w-3 h-3" />
                          </a>
                        )}
                      </div>
                      <span className="text-xs text-gray-500 font-medium">
                        {item.sector}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center space-x-1 text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>{item.status}</span>
                  </span>
                </div>

                <p className="text-sm sm:text-base text-gray-600 font-normal leading-relaxed mb-6">
                  {item.description}
                </p>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-[#f8fafc] border border-gray-100 text-xs text-gray-600 mb-6">
                  <div>
                    <span className="text-gray-400 block mb-1">Issue Size</span>
                    <span className="font-semibold text-sm text-[#082029]">{item.issueSize}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Filing Date</span>
                    <span className="font-semibold text-sm text-[#082029]">{item.filingDate}</span>
                  </div>
                  <div>
                    <span className="text-gray-400 block mb-1">Indicative Price</span>
                    <span className="font-semibold text-sm text-[#00a887]">₹{item.indicativePrice.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <div className="text-xs text-gray-500 font-medium">
                  <span className="font-semibold text-gray-700">Lead Managers:</span> {item.brlm}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="mt-8 pt-5 border-t border-gray-100 flex items-center justify-between gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/shares/${item.id}`}
                    className="px-5 py-2.5 rounded-xl bg-[#082029] hover:bg-[#00a887] text-white text-xs sm:text-sm font-semibold transition-all inline-flex items-center space-x-1.5"
                  >
                    <span>View Stock Breakdown</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>

                  {item.companyUrl && (
                    <a
                      href={item.companyUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-3.5 py-2.5 rounded-xl border border-teal-200 bg-teal-50/70 hover:bg-[#00a887] hover:text-white text-[#00a887] text-xs sm:text-sm font-semibold transition-all inline-flex items-center space-x-1.5"
                      title="Visit official company website"
                    >
                      <span>Official Site</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>

                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 hover:border-[#00a887] text-gray-700 hover:text-[#00a887] text-xs sm:text-sm font-semibold transition-all"
                >
                  Enquire Lot
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Informative Guidance Section */}
        <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dce8e5] shadow-xs space-y-6">
          <div className="flex items-center space-x-2.5 text-[#00a887]">
            <Shield className="w-5 h-5" />
            <h3 className="text-xl font-semibold text-[#082029]">Understanding the DRHP Process</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm text-gray-700 font-normal leading-relaxed">
            <div className="p-5 rounded-2xl bg-[#fafcfb] border border-gray-100">
              <h4 className="font-semibold text-base text-[#082029] mb-2">1. What is a DRHP?</h4>
              <p>
                A Draft Red Herring Prospectus is the preliminary registration document filed with SEBI containing complete audited financials, risk factors, and promoter holding.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#fafcfb] border border-gray-100">
              <h4 className="font-semibold text-base text-[#082029] mb-2">2. SEBI Observations</h4>
              <p>
                SEBI reviews the draft document for regulatory disclosures. Once observations are cleared, the company files the final RHP with price bands.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-[#fafcfb] border border-gray-100">
              <h4 className="font-semibold text-base text-[#082029] mb-2">3. 6-Month Lock-in Period</h4>
              <p>
                As per SEBI guidelines, shares acquired in the unlisted pre-IPO market are subject to a mandatory 6-month holding lock-in starting from the listing day.
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
