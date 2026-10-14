'use client';

import React from 'react';
import Link from 'next/link';
import { Play, Eye, ArrowRight } from 'lucide-react';

export const ResearchSection: React.FC = () => {
  const videos = [
    {
      title: 'Maverick Simulation: ₹125 Cr Fundraise & ₹260 Cr Voxel-Man Deal',
      date: '13 Oct 2026',
      badge: 'MS',
      category: 'Knowledge',
      url: '/library?type=videos',
      bgGrad: 'from-[#082029] to-[#00a887]',
    },
    {
      title: 'IGX Gets a BIG Approval! 1–2 Year Gas Contracts Before IPO?',
      date: '25 Sept 2026',
      badge: 'IG',
      category: 'Knowledge',
      url: '/library?type=videos',
      bgGrad: 'from-[#0e313d] to-[#124d5e]',
    },
    {
      title: 'Old Monk, hidden business secrets, and a surprising FY26 performance!',
      date: '25 Sept 2026',
      badge: 'OM',
      category: 'Knowledge',
      url: '/library?type=videos',
      bgGrad: 'from-[#05171d] to-[#082029]',
    },
  ];

  const articles = [
    {
      title: 'The Company That Rents You the Sky',
      date: '12 Oct 2026',
      category: 'Research',
      views: '53',
      excerpt: 'India has only about 20,000 aerial work platforms, while the US and China run lakhs of them. MTandT Rentals wants to close that gap. Its revenue grew…',
      image: '/posts/mtandt.png',
      url: '/library',
    },
    {
      title: '63SATS H1 FY27: What management just told investors',
      date: '12 Oct 2026',
      category: 'Research',
      views: '111',
      excerpt: '63SATS Cybertech, the cybersecurity arm of 63 moons, billed ₹218 crore in just six months, more than double all of last year. Management now expects ₹…',
      image: '/posts/63sats.png',
      url: '/library',
    },
    {
      title: "INOX Air Products Files DRHP: Linde India's Biggest Rival Is Going Public. We Read All 689 Pages",
      date: '01 Oct 2026',
      category: 'Research',
      views: '394',
      excerpt: "INOX Air Products, the 50:50 joint venture between America's Air Products and the INOX Group, has filed its DRHP for a 100% offer for sale of 7.72 cro…",
      image: '/posts/inox.png',
      url: '/library',
    },
  ];

  return (
    <div id="news" className="bg-white">
      {/* 1. Watch & Learn (Videos) */}
      <section className="py-14 sm:py-16 bg-[#f3f8f7] border-b border-[#dce8e5]">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#00a887] bg-[#e6f7f3] px-3.5 py-1 rounded-full mb-2.5">
                Watch &amp; learn
              </span>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#082029] leading-tight">
                Latest from our <em className="font-serif italic text-[#00a887] font-medium">knowledge centre</em>
              </h2>
              <p className="text-[14.5px] text-gray-500 mt-1.5 max-w-[38em]">
                Company breakdowns, market moves and how the unlisted market really works — in video.
              </p>
            </div>
            <Link
              href="/library?type=videos"
              className="text-[13.5px] font-semibold text-[#00a887] inline-flex items-center gap-1.5 border border-[#dce8e5] hover:border-[#00a887] px-5 py-2 rounded-2xl self-start sm:self-auto transition-all bg-white"
            >
              All videos →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {videos.map((vid, idx) => (
              <Link
                key={idx}
                href={vid.url}
                className="group rounded-2xl border border-[#dce8e5] bg-white overflow-hidden shadow-xs hover:shadow-xl hover:shadow-[#00a887]/5 hover:border-[#00a887] transition-all flex flex-col justify-between"
              >
                {/* Video Thumbnail with brand gradient */}
                <div className={`relative h-44 bg-gradient-to-tr ${vid.bgGrad} flex items-center justify-center text-white`}>
                  <span className="text-3xl font-extrabold tracking-wider opacity-60">
                    {vid.badge}
                  </span>
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
                  <div className="w-12 h-12 rounded-2xl bg-white text-[#00a887] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11.5px] font-semibold text-[#00a887] uppercase tracking-wider mb-2">
                      {vid.category} · {vid.date}
                    </div>
                    <h3 className="font-bold text-[16px] text-[#082029] group-hover:text-[#00a887] transition-colors leading-snug line-clamp-2">
                      {vid.title}
                    </h3>
                  </div>

                  <div className="pt-4 mt-auto border-t border-[#f1f5f9] flex items-center justify-between text-[13px] font-semibold text-[#00a887]">
                    <span>Watch video</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 2. Knowledge Centre (Research Articles) */}
      <section className="py-14 sm:py-16 border-b border-[#dce8e5]">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <span className="inline-block text-[11px] font-bold tracking-[0.16em] uppercase text-[#00a887] bg-[#e6f7f3] px-3.5 py-1 rounded-full mb-2.5">
                Knowledge centre
              </span>
              <h2 className="text-[28px] sm:text-[36px] font-bold text-[#082029] leading-tight">
                Unlisted shares, <em className="font-serif italic text-[#00a887] font-medium">explained</em>
              </h2>
              <p className="text-[14.5px] text-gray-500 mt-1.5 max-w-[38em]">
                Research, IPO buzz and market notes — from our research team. For information only, not advice.
              </p>
            </div>
            <Link
              href="/library?type=blog"
              className="text-[13.5px] font-semibold text-[#00a887] inline-flex items-center gap-1.5 border border-[#dce8e5] hover:border-[#00a887] px-5 py-2 rounded-2xl self-start sm:self-auto transition-all"
            >
              View all →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {articles.map((item, idx) => (
              <Link
                key={idx}
                href={item.url}
                className="group rounded-2xl border border-[#dce8e5] bg-white overflow-hidden shadow-xs hover:shadow-xl hover:shadow-[#00a887]/5 hover:border-[#00a887] transition-all flex flex-col justify-between"
              >
                {/* Cover Image */}
                <div className="h-44 bg-[#f1f5f9] overflow-hidden relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[11.5px] font-semibold text-[#00a887] uppercase tracking-wider mb-2">
                      {item.date} · {item.category}
                    </div>
                    <h3 className="font-bold text-[16px] text-[#082029] group-hover:text-[#00a887] transition-colors leading-snug line-clamp-2 mb-2">
                      {item.title}
                    </h3>
                    <p className="text-[13px] text-gray-500 line-clamp-2 leading-relaxed">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 mt-auto border-t border-[#f1f5f9] flex items-center justify-between text-[12.5px] text-gray-500">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-3.5 h-3.5 text-gray-400" />
                      {item.views} views
                    </span>
                    <span className="font-semibold text-[#00a887] inline-flex items-center gap-1">
                      Read note →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3. CTA Band with original dark teal theme */}
      <section className="py-12 bg-white">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14">
          <div className="relative rounded-3xl bg-[#082029] text-white p-8 sm:p-12 overflow-hidden shadow-2xl border border-[#0f3442]">
            <div className="absolute inset-0 pointer-events-none opacity-30">
              <div className="absolute top-0 right-0 w-[450px] h-[450px] bg-[#00a887] rounded-full blur-[100px]" />
            </div>

            <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-8">
              <div>
                <h2 className="text-[26px] sm:text-[34px] font-bold text-white leading-tight">
                  Start with a <em className="font-serif italic text-[#2dd4bf] font-medium">conversation</em>, not a checkout.
                </h2>
                <p className="text-[15px] text-slate-300 mt-2 max-w-[32em]">
                  Open a free account to access one of India’s largest lists of unlisted &amp; pre-IPO shares, then contact us when you’re ready.
                </p>
              </div>

              <div>
                <Link
                  href="/contact-us"
                  className="px-7 py-3.5 rounded-2xl font-bold text-[14.5px] bg-[#00a887] hover:bg-[#009476] text-white inline-flex items-center gap-2.5 shadow-xl shadow-[#00a887]/25 cursor-pointer transition-all"
                >
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                    <path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.945C.16 5.335 5.5 0 12.066 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  <span>Contact us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ResearchSection;
