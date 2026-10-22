'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  CheckCircle2,
  Shield,
  User,
  ArrowRight,
  TrendingUp,
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { getPortalBlogs, BlogEntity } from '@/lib/supabase/queries';

interface BlogPageProps {
  params: {
    slug: string;
  };
}

export default function BlogDetailPage({ params }: BlogPageProps) {
  const [article, setArticle] = useState<BlogEntity | null>(null);
  const [allBlogs, setAllBlogs] = useState<BlogEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    getPortalBlogs().then((blogs) => {
      setAllBlogs(blogs);
      const match = blogs.find(
        (b) => b.slug.toLowerCase() === params.slug.toLowerCase() || b.id.toLowerCase() === params.slug.toLowerCase()
      );
      if (match) {
        setArticle(match);
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
          <div className="text-slate-500 font-medium text-sm">Loading article...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B132B] mb-3">Article Not Found</h1>
          <p className="text-slate-600 text-sm mb-6">The knowledge article you are looking for does not exist or has been archived.</p>
          <Link
            href="/blogs"
            className="px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-semibold rounded-lg inline-block text-sm transition-colors"
          >
            ← Back to All Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const relatedArticles = allBlogs.filter((b) => b.id !== article.id).slice(0, 2);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Article Header */}
      <section className="bg-[#0B132B] text-white py-12 sm:py-16 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-5">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Blogs &amp; Insights</span>
          </Link>

          <div className="flex items-center space-x-2.5 text-xs font-medium">
            <span className="text-blue-400 bg-blue-900/50 border border-blue-500/30 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
              {article.category}
            </span>
            <span className="text-slate-500">·</span>
            <div className="flex items-center space-x-1 text-slate-400 tabular-nums">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <span className="text-slate-500">·</span>
            <span className="text-slate-400 tabular-nums">{article.date}</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center space-x-2.5">
              <div className="w-7 h-7 rounded-md bg-blue-750 bg-blue-700 flex items-center justify-center font-bold text-white text-[11px]">
                {article.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-semibold text-white block">{article.author}</span>
                <span className="text-[11px] text-slate-400">Institutional Private Markets Editorial</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center space-x-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 space-y-10 flex-1 w-full">
        <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-8">
          {/* Executive Summary Callout */}
          <div className="p-5 sm:p-6 rounded-lg bg-blue-50/60 border-l-4 border-blue-700 text-slate-800 text-sm sm:text-base leading-relaxed font-normal">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1.5">
              Executive Takeaway
            </span>
            {article.summary}
          </div>

          {/* Article Full Content */}
          <div className="prose max-w-none text-slate-700 text-sm sm:text-base leading-relaxed space-y-5">
            {article.content ? (
              <div className="whitespace-pre-line leading-relaxed font-normal">{article.content}</div>
            ) : (
              <>
                <p>
                  As Indian equities continue to break global growth records, seasoned institutional investors, high-net-worth individuals (HNIs), and family offices are actively allocating to private equity and pre-IPO assets before public discovery on the exchanges.
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] pt-3">
                  1. Depository Infrastructure and Legal Standing in India
                </h3>
                <p>
                  Buying and selling unlisted shares in India is completely legal and strictly regulated under SEBI (Depositories and Participants) Regulations and the Companies Act, 2013. Transfers occur off-market between CDSL and NSDL demat accounts using Delivery Instruction Slips (DIS) or modern digital speed-easiest portals.
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] pt-3">
                  2. Regulatory Lock-in Guidelines
                </h3>
                <p>
                  Under SEBI guidelines revised in August 2021, the mandatory post-IPO listing lock-in period for pre-IPO shares was reduced from 1 year to 6 months from the date of listing. This regulatory enhancement unlocked significant liquidity for early private-market buyers.
                </p>
                <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] pt-3">
                  3. Key Diligence Steps Before Allocation
                </h3>
                <ul className="list-disc pl-5 space-y-1.5 text-slate-700">
                  <li>Always verify company PAN, CIN, and authentic ISIN codes with CDSL/NSDL databases.</li>
                  <li>Review historical fundraise valuations and multi-year financials (Revenue, EBITDA, PAT).</li>
                  <li>Ensure all settlements are executed via registered corporate accounts with digital invoice documentation.</li>
                </ul>
              </>
            )}
          </div>

          {/* Bottom Dealing Desk CTA */}
          <div className="pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 p-5 sm:p-6 rounded-xl bg-[#0B132B] text-white">
            <div>
              <h4 className="font-bold text-base text-white">Ready to explore unlisted equity?</h4>
              <p className="text-xs text-slate-300">Connect with our institutional relationship desk for live indicative quotes.</p>
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-colors shrink-0 shadow-xs"
            >
              Contact Dealing Desk →
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-[#0B132B]">Related Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug || rel.id}`}
                  className="bg-white rounded-xl p-5 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group block"
                >
                  <span className="text-[11px] font-semibold text-blue-700 uppercase tracking-wider block mb-1.5">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-sm sm:text-base text-[#0B132B] group-hover:text-blue-700 transition-colors mb-2 line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-slate-500 line-clamp-2 mb-3.5 leading-relaxed">{rel.summary}</p>
                  <span className="text-xs font-semibold text-blue-700 inline-flex items-center space-x-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Read Note</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>

      <Footer />

      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
