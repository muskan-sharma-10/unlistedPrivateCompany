'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Clock,
  Eye,
  CheckCircle,
  ArrowLeft,
  ArrowRight,
  Download,
  Share2,
  TrendingUp,
  ShieldCheck,
  Building2,
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { getPortalResearchReports, ResearchEntity } from '@/lib/supabase/queries';

interface ResearchDetailPageProps {
  params: {
    slug: string;
  };
}

export default function ResearchDetailPage({ params }: ResearchDetailPageProps) {
  const [report, setReport] = useState<ResearchEntity | null>(null);
  const [allReports, setAllReports] = useState<ResearchEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getPortalResearchReports().then((data) => {
      setAllReports(data);
      const match = data.find(
        (r) => r.slug.toLowerCase() === params.slug.toLowerCase() || r.id.toLowerCase() === params.slug.toLowerCase()
      );
      if (match) {
        setReport(match);
      }
      setIsLoading(false);
    });
  }, [params.slug]);

  const handleShare = () => {
    if (typeof window !== 'undefined') {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#f3f8f7] flex flex-col font-sans">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1 flex items-center justify-center">
          <div className="text-gray-500 font-medium">Loading research note...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-[#f3f8f7] flex flex-col font-sans">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1">
          <h1 className="text-3xl font-bold text-[#082029] mb-4">Research Report Not Found</h1>
          <p className="text-gray-600 mb-8">The institutional research note you are looking for is currently unavailable or has moved.</p>
          <Link
            href="/research"
            className="px-6 py-3 bg-[#00a887] text-white font-semibold rounded-xl inline-block"
          >
            ← Back to All Research Reports
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Report Header */}
      <section className="bg-[#082029] text-white py-14 sm:py-20 border-b border-[#0d2e38] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a887]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <Link
            href="/research"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Research Reports</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3 text-xs font-semibold">
            <span className="text-[#00a887] bg-teal-950/60 border border-teal-500/30 px-3 py-1 rounded-full">
              {report.tag}
            </span>
            <span className="text-slate-400">·</span>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{report.readTime}</span>
            </div>
            <span className="text-slate-400">·</span>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Eye className="w-3.5 h-3.5" />
              <span>{report.views} views</span>
            </div>
            <span className="text-slate-400">·</span>
            <span className="text-slate-400">{report.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
            {report.title}
          </h1>

          <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-white block">{report.analyst}</span>
              <span className="text-[11px] text-slate-400">Institutional Equity Research Desk</span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={handleShare}
                className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center space-x-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              {report.stockSlug && (
                <Link
                  href={`/shares/${report.stockSlug}`}
                  className="px-4 py-1.5 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold flex items-center space-x-1 transition-all"
                >
                  <span>View Stock Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-10 flex-1 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#dce8e5] shadow-xs space-y-8">
          {/* Executive Summary */}
          <div>
            <h2 className="text-xl font-bold text-[#082029] mb-3">Executive Summary</h2>
            <p className="text-base sm:text-lg text-gray-700 leading-relaxed font-normal">
              {report.summary}
            </p>
          </div>

          {/* Key Investment Takeaways */}
          {report.keyTakeaways && report.keyTakeaways.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-[#f8fafc] border border-gray-200 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#00a887]">
                Key Investment Takeaways &amp; Findings
              </h3>
              <div className="space-y-3">
                {report.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-gray-800 font-medium leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Body */}
          <div className="space-y-6 pt-4 border-t border-gray-100 text-gray-800 text-base leading-relaxed">
            {report.content ? (
              <div className="whitespace-pre-line leading-relaxed font-normal">{report.content}</div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-[#082029]">Valuation Multiples &amp; Financial Assessment</h3>
                <p>
                  Our institutional research team models forward valuations by benchmarking historical private funding rounds against operating revenue, EBITDA conversion, and market multiples of comparable listed peers in India.
                </p>
                <h3 className="text-xl font-bold text-[#082029]">Pre-IPO Liquidity &amp; Listing Catalysts</h3>
                <p>
                  With regulatory filings advancing under SEBI observation, anchor interest from domestic mutual funds and alternative investment funds (AIFs) highlights robust institutional demand prior to official public listing.
                </p>
              </>
            )}
          </div>

          {/* Bottom CTA Block */}
          <div className="pt-6 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#082029] text-white">
            <div>
              <h4 className="font-bold text-lg text-white">Interested in allocating to this stock?</h4>
              <p className="text-xs sm:text-sm text-slate-300">Submit an inquiry with our private market dealing desk.</p>
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold text-sm transition-all shrink-0"
            >
              Enquire to Deal →
            </button>
          </div>
        </div>
      </main>

      <Footer />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
