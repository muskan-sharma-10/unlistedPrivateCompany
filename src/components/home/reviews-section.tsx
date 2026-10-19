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
    <section className="py-14 sm:py-16 bg-[#f3f8f7] border-b border-[#dce8e5]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
        {/* Header */}
        <div className="mb-6">
          <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#00a887] bg-[#e6f7f3] px-3.5 py-1 rounded-full mb-2.5">
            Investor voices
          </span>
          <h2 className="text-[28px] sm:text-[36px] font-bold text-[#082029] leading-tight">
            Rated <em className="font-serif italic text-[#00a887] font-medium">4.9</em> by investors
          </h2>
          <p className="text-[14.5px] text-gray-500 mt-1.5 max-w-[38em]">
            Verified reviews from people who’ve dealt with us.
          </p>
        </div>

        {/* Google Reviews Badge Header */}
        <div className="mb-8 inline-flex items-center gap-4 p-4 rounded-2xl bg-white border border-[#dce8e5] shadow-xs">
          <div className="text-[34px] font-bold text-[#082029] leading-none num">
            4.9
          </div>
          <div className="border-r border-[#dce8e5] pr-4">
            <div className="text-[#f59e0b] tracking-[2px] text-[15px] font-bold">
              ★★★★★
            </div>
            <div className="text-[12px] text-gray-500 font-medium mt-0.5">
              Based on 750+ Google reviews
            </div>
          </div>
          {/* Google Logo SVG */}
          <svg className="w-7 h-7 shrink-0" viewBox="0 0 24 24">
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
              className="p-6 rounded-2xl bg-white border border-[#dce8e5] flex flex-col justify-between shadow-xs hover:border-[#00a887] hover:shadow-lg hover:shadow-[#00a887]/5 transition-all"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-full bg-[#e6f7f3] text-[#00a887] font-bold text-[13px] flex items-center justify-center shrink-0">
                      {r.initials}
                    </span>
                    <div>
                      <div className="font-bold text-[14.5px] text-[#082029]">
                        {r.name}
                      </div>
                      <div className="text-[12px] text-gray-400">
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

                <div className="text-[#f59e0b] tracking-[2px] text-[13px] mb-3">
                  {typeof r.rating === 'number' ? '★'.repeat(r.rating) : r.rating || '★★★★★'}
                </div>

                <p className="text-[14px] text-gray-600 italic leading-relaxed">
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
            className="text-[13.5px] font-semibold text-[#00a887] inline-flex items-center gap-1.5 border border-[#dce8e5] hover:border-[#00a887] px-5 py-2 rounded-2xl transition-all bg-white"
          >
            Read all Google reviews →
          </a>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
