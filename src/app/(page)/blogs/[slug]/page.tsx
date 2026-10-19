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
      <div className="min-h-screen bg-[#f3f8f7] flex flex-col font-sans">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1 flex items-center justify-center">
          <div className="text-gray-500 font-medium">Loading article...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen bg-[#f3f8f7] flex flex-col font-sans">
        <TopTicker />
        <Navbar />
        <div className="max-w-4xl mx-auto px-6 py-24 text-center flex-1">
          <h1 className="text-3xl font-bold text-[#082029] mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-8">The knowledge article you are looking for does not exist or has been archived.</p>
          <Link
            href="/blogs"
            className="px-6 py-3 bg-[#00a887] text-white font-semibold rounded-xl inline-block"
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
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Article Header */}
      <section className="bg-[#082029] text-white py-14 sm:py-20 border-b border-[#0d2e38] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a887]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-8 relative z-10 space-y-6">
          <Link
            href="/blogs"
            className="inline-flex items-center space-x-1.5 text-xs font-semibold text-teal-300 hover:text-white transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Blogs &amp; Insights</span>
          </Link>

          <div className="flex items-center space-x-3 text-xs font-semibold">
            <span className="text-[#00a887] bg-teal-950/60 border border-teal-500/30 px-3 py-1 rounded-full">
              {article.category}
            </span>
            <span className="text-slate-400">·</span>
            <div className="flex items-center space-x-1.5 text-slate-400">
              <Clock className="w-3.5 h-3.5" />
              <span>{article.readTime}</span>
            </div>
            <span className="text-slate-400">·</span>
            <span className="text-slate-400">{article.date}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold tracking-tight text-white leading-tight">
            {article.title}
          </h1>

          <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-[#00a887] flex items-center justify-center font-bold text-white text-xs">
                {article.author.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <span className="font-semibold text-white block">{article.author}</span>
                <span className="text-[11px] text-slate-400">Institutional Private Markets Editorial</span>
              </div>
            </div>

            <button
              onClick={handleShare}
              className="px-3.5 py-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white flex items-center space-x-1.5 transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>{copied ? 'Link Copied!' : 'Share Article'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Article Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-8 py-12 sm:py-16 space-y-12 flex-1 w-full">
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#dce8e5] shadow-xs space-y-8">
          {/* Executive Summary Callout */}
          <div className="p-6 rounded-2xl bg-[#f0f6f4] border-l-4 border-[#00a887] text-gray-800 text-base leading-relaxed font-medium">
            <span className="text-xs font-bold uppercase tracking-wider text-[#00a887] block mb-2">
              Executive Takeaway
            </span>
            {article.summary}
          </div>

          {/* Article Full Content */}
          <div className="prose max-w-none text-gray-800 text-base sm:text-lg leading-relaxed space-y-6">
            {article.content ? (
              <div className="whitespace-pre-line leading-relaxed font-normal">{article.content}</div>
            ) : (
              <>
                <p>
                  As Indian equities continue to break global growth records, seasoned institutional investors, high-net-worth individuals (HNIs), and family offices are actively allocating to private equity and pre-IPO assets before public discovery on the exchanges.
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#082029] pt-4">
                  1. Depository Infrastructure and Legal Standing in India
                </h3>
                <p>
                  Buying and selling unlisted shares in India is completely legal and strictly regulated under SEBI (Depositories and Participants) Regulations and the Companies Act, 2013. Transfers occur off-market between CDSL and NSDL demat accounts using Delivery Instruction Slips (DIS) or modern digital speed-easiest portals.
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#082029] pt-4">
                  2. Regulatory Lock-in Guidelines
                </h3>
                <p>
                  Under SEBI guidelines revised in August 2021, the mandatory post-IPO listing lock-in period for pre-IPO shares was reduced from 1 year to 6 months from the date of listing. This regulatory enhancement unlocked significant liquidity for early private-market buyers.
                </p>
                <h3 className="text-xl sm:text-2xl font-bold text-[#082029] pt-4">
                  3. Key Diligence Steps Before Allocation
                </h3>
                <ul className="list-disc pl-6 space-y-2 text-base text-gray-700">
                  <li>Always verify company PAN, CIN, and authentic ISIN codes with CDSL/NSDL databases.</li>
                  <li>Review historical fundraise valuations and multi-year financials (Revenue, EBITDA, PAT).</li>
                  <li>Ensure all settlements are executed via registered corporate accounts with digital invoice documentation.</li>
                </ul>
              </>
            )}
          </div>

          {/* Bottom Dealing Desk CTA */}
          <div className="pt-8 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl bg-[#082029] text-white">
            <div>
              <h4 className="font-bold text-lg text-white">Ready to explore unlisted equity?</h4>
              <p className="text-xs sm:text-sm text-slate-300">Connect with our institutional relationship desk for live indicative quotes.</p>
            </div>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="px-6 py-3 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold text-sm transition-all shrink-0"
            >
              Contact Dealing Desk →
            </button>
          </div>
        </div>

        {/* Related Articles */}
        {relatedArticles.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-[#082029]">Related Insights</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {relatedArticles.map((rel) => (
                <Link
                  key={rel.id}
                  href={`/blogs/${rel.slug || rel.id}`}
                  className="bg-white rounded-3xl p-6 border border-[#dce8e5] hover:border-[#00a887] shadow-xs hover:shadow-lg transition-all group block"
                >
                  <span className="text-[11px] font-semibold text-[#00a887] uppercase tracking-wider block mb-2">
                    {rel.category}
                  </span>
                  <h4 className="font-bold text-base text-[#082029] group-hover:text-[#00a887] transition-colors mb-2 line-clamp-2">
                    {rel.title}
                  </h4>
                  <p className="text-xs text-gray-500 line-clamp-2 mb-4">{rel.summary}</p>
                  <span className="text-xs font-semibold text-[#00a887] inline-flex items-center space-x-1">
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
