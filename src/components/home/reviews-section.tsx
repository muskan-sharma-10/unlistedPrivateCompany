import React, { useState, useEffect } from 'react';
import { getPortalTestimonials } from '@/lib/supabase/queries';

export const ReviewsSection: React.FC = () => {
  const fallbackReviews = [
    {
      initials: 'GD',
      name: 'Gopinath Damodaran',
      role: 'Long-term investor',
      rating: 5,
      review: 'Lightning fast. Shares were credited immediately on settlement, and the lower denominations they offer made it easy to start small.',
    },
    {
      initials: 'ND',
      name: 'Nilesh Dahiwalkar',
      role: 'Equity investor',
      rating: 5,
      review: 'Excellent and trustworthy. My experience buying private equity through them was smooth end to end. Recommended for unlisted dealing.',
    },
    {
      initials: 'RG',
      name: 'Rahul Gupta',
      role: 'Private-market investor',
      rating: 5,
      review: 'The promoters are genuine and very professional — prompt with documents and funds, thorough, and genuinely helpful throughout.',
    },
  ];

  const [reviews, setReviews] = useState<any[]>(fallbackReviews);

  useEffect(() => {
    getPortalTestimonials().then((data) => {
      if (data && data.length > 0) setReviews(data);
    });
  }, []);

  return (
    <section className="py-12 sm:py-16 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-blue-700 bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded mb-2">
            Investor Testimonials
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-tight">
            Rated 4.9 by Verified Market Participants
          </h2>
          <p className="text-sm text-slate-500 mt-1 max-w-xl">
            Verified experiences from retail HNIs, wealth managers, and institutional clients.
          </p>
        </div>

        {/* Google Reviews Badge Header */}
        <div className="mb-8 inline-flex items-center gap-4 p-3.5 rounded-xl bg-white border border-slate-200 shadow-xs">
          <div className="text-2xl sm:text-3xl font-bold text-slate-900 leading-none tabular-nums">
            4.9
          </div>
          <div className="border-r border-slate-200 pr-4">
            <div className="text-amber-500 tracking-[1.5px] text-xs font-bold">
              ★★★★★
            </div>
            <div className="text-[11px] text-slate-500 font-medium mt-0.5">
              Based on 750+ Google Reviews
            </div>
          </div>
          {/* Google Logo SVG */}
          <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
            <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
          </svg>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {reviews.map((r, i) => (
            <div
              key={i}
              className="p-6 rounded-xl bg-white border border-slate-200 flex flex-col justify-between shadow-xs hover:border-blue-500/80 hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-9 h-9 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                      {r.initials}
                    </span>
                    <div>
                      <div className="font-bold text-sm text-slate-900">
                        {r.name}
                      </div>
                      <div className="text-[11px] text-slate-400">
                        {r.role}
                      </div>
                    </div>
                  </div>
                  {/* Mini Google icon */}
                  <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1Z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23Z" />
                    <path fill="#FBBC05" d="M5.84 14.09a6.6 6.6 0 0 1 0-4.18V7.07H2.18a11 11 0 0 0 0 9.86l3.66-2.84Z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1a11 11 0 0 0-9.82 6.07l3.66 2.84C6.71 7.31 9.14 5.38 12 5.38Z" />
                  </svg>
                </div>

                <div className="text-amber-500 tracking-[1px] text-xs mb-3">
                  {typeof r.rating === 'number' ? '★'.repeat(r.rating) : r.rating || '★★★★★'}
                </div>

                <p className="text-xs sm:text-sm text-slate-600 italic leading-relaxed">
                  &ldquo;{r.review || r.text}&rdquo;
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom link */}
        <div className="mt-8 text-center sm:text-left">
          <a
            href="https://www.google.com/search?q=private+market+unlisted+shares+reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm font-semibold text-blue-600 hover:text-blue-700 inline-flex items-center gap-1.5 border border-slate-200 hover:border-blue-500 px-4 py-2 rounded-lg transition-all bg-white"
          >
            Read All Google Reviews →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
