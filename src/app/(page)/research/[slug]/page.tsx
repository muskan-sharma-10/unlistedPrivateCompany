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
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1 flex items-center justify-center">
          <div className="text-slate-500 font-medium text-sm">Loading research note...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!report) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-3">Research Report Not Found</h1>
          <p className="text-slate-600 text-sm mb-6">The institutional research note you are looking for is currently unavailable or has moved.</p>
          <Link
            href="/research"
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg inline-block text-sm transition-colors"
          >
            ← Back to All Research Reports
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Report Header */}
      <section className="bg-[#0B132B] text-white py-12 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <Link
            href="/research"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Research Reports</span>
          </Link>

          <div className="flex flex-wrap items-center gap-2.5 text-xs font-medium">
            <span className="text-blue-400 bg-blue-900/50 border border-blue-500/30 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
              {report.tag}
            </span>
            <span className="text-slate-500">·</span>
            <div className="flex items-center space-x-1 text-slate-400 tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              <span>{report.readTime}</span>
            </div>
            <span className="text-slate-500">·</span>
            <div className="flex items-center space-x-1 text-slate-400 tabular-nums">
              <Eye className="w-3.5 h-3.5" />
              <span>{report.views} views</span>
            </div>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 tabular-nums">{report.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            {report.title}
          </h1>

          <div className="pt-4 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-300">
            <div>
              <span className="font-semibold text-white block">{report.analyst}</span>
              <span className="text-[11px] text-slate-400">Institutional Equity Research Desk</span>
            </div>

            <div className="flex items-center space-x-2.5">
              <button
                onClick={handleShare}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copied ? 'Link Copied!' : 'Share'}</span>
              </button>

              {report.stockSlug && (
                <Link
                  href={`/shares/${report.stockSlug}`}
                  className="px-3.5 py-1.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold flex items-center space-x-1.5 transition-colors shadow-xs"
                >
                  <span>Stock Profile</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-8 flex-1 w-full">
        <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
          {/* Executive Summary */}
          <div>
            <h2 className="text-lg font-bold text-[#0B132B] mb-2.5">Executive Summary</h2>
            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
              {report.summary}
            </p>
          </div>

          {/* Key Investment Takeaways */}
          {report.keyTakeaways && report.keyTakeaways.length > 0 && (
            <div className="p-5 sm:p-6 rounded-lg bg-slate-50 border border-slate-200/80 space-y-3">
              <h3 className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Key Investment Takeaways &amp; Findings
              </h3>
              <div className="space-y-2.5">
                {report.keyTakeaways.map((point, idx) => (
                  <div key={idx} className="flex items-start space-x-2.5">
                    <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm text-slate-800 font-medium leading-relaxed">
                      {point}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Report Body */}
          <div className="space-y-5 pt-4 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed">
            {report.content ? (
              <div className="whitespace-pre-line leading-relaxed font-normal">{report.content}</div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-[#0B132B]">Valuation Multiples &amp; Financial Assessment</h3>
                <p>
                  Our institutional research team models forward valuations by benchmarking historical private funding rounds against operating revenue, EBITDA conversion, and market multiples of comparable listed peers in India.
                </p>
                <h3 className="text-lg font-bold text-[#0B132B]">Pre-IPO Liquidity &amp; Listing Catalysts</h3>
                <p>
                  With regulatory filings advancing under SEBI observation, anchor interest from domestic mutual funds and alternative investment funds (AIFs) highlights robust institutional demand prior to official public listing.
                </p>
              </>
            )}
          </div>

          {/* Bottom CTA Block */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-[#0B132B] text-white">
            <div>
              <h4 className="font-bold text-base text-white">Interested in allocating to this stock?</h4>
              <p className="text-xs text-slate-300">Submit an inquiry with our private market dealing desk.</p>
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-colors shrink-0 shadow-xs"
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
