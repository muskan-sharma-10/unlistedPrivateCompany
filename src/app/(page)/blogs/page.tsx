'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  BookOpen,
  Calendar,
  Clock,
  ArrowRight,
  Play,
  Search,
  Sparkles,
  Share2,
  Tag
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import { VIDEOS_DATA } from '@/data/unlisted-data';
import { getPortalBlogs, getPortalVideos, BlogEntity } from '@/lib/supabase/queries';

export default function BlogsPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [articles, setArticles] = useState<BlogEntity[]>([]);
  const [videos, setVideos] = useState(VIDEOS_DATA);

  React.useEffect(() => {
    getPortalBlogs().then((data) => {
      if (data && data.length > 0) setArticles(data);
    });
    getPortalVideos().then((vids) => {
      if (vids && vids.length > 0) setVideos(vids);
    });
  }, []);

  const categories = ['All', 'Beginner Guide', 'Regulatory', 'Taxation & Legal', 'ESOP Solutions', 'Tutorial', 'Investment Strategy'];

  const filtered = articles.filter((a) => {
    const matchesCat = activeCategory === 'All' || a.category === activeCategory;
    const matchesSearch =
      a.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.summary.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Banner with Dark Teal Theme */}
      <section className="bg-[#082029] text-white py-16 sm:py-24 border-b border-[#0d2e38] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a887]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 text-xs sm:text-sm font-semibold tracking-wider text-[#c5a880] uppercase">
              <span className="w-6 h-[2px] bg-[#c5a880]" />
              <span>Knowledge Centre · Education &amp; Market Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Unlisted Market Blogs &amp; Insights
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Curated market guides, SEBI regulatory updates, capital gains tax explainers, and video breakdowns from India&apos;s leading unlisted shares research desk.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-12 sm:py-16 w-full flex-1 space-y-12">
        {/* Category & Search Filter */}
        <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#dce8e5] shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-xs sm:text-sm font-semibold px-4 py-2 rounded-xl whitespace-nowrap transition-all ${
                  activeCategory === c
                    ? 'bg-[#00a887] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="relative min-w-[280px]">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search blogs & articles..."
              className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887]"
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 2-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/blogs/${item.slug || item.id}`}
              className="bg-white rounded-3xl p-7 sm:p-9 border border-[#dce8e5] hover:border-[#00a887] shadow-xs hover:shadow-xl transition-all duration-200 flex flex-col justify-between group block"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-gray-500 mb-4">
                  <span className="text-[#00a887] bg-[#e6f7f3] px-3 py-1 rounded-full">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-2 text-gray-400">
                    <Clock className="w-3.5 h-3.5" />
                    <span>{item.readTime}</span>
                    <span>·</span>
                    <span>{item.date}</span>
                  </div>
                </div>

                <h2 className="text-xl sm:text-2xl font-semibold text-[#082029] group-hover:text-[#00a887] transition-colors leading-snug mb-4">
                  {item.title}
                </h2>

                <p className="text-sm sm:text-base text-gray-700 font-normal leading-relaxed mb-6">
                  {item.summary}
                </p>
              </div>

              <div className="pt-6 border-t border-gray-100 flex items-center justify-between text-xs sm:text-sm font-semibold">
                <span className="text-gray-400">{item.author}</span>
                <span className="text-[#00a887] group-hover:translate-x-1 transition-transform inline-flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Video Learning Section */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase text-[#00a887] tracking-wider">
                Video Insights
              </span>
              <h3 className="text-2xl sm:text-3xl font-semibold text-[#082029] mt-1">
                Latest Video Analysis
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {VIDEOS_DATA.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-3xl overflow-hidden border border-[#dce8e5] hover:border-[#00a887] shadow-xs hover:shadow-xl transition-all group"
              >
                <div className="h-44 bg-gradient-to-br from-[#082029] to-[#0e3b4a] relative flex items-center justify-center p-6 text-center text-white">
                  <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:scale-110 group-hover:bg-[#00a887] transition-all duration-200 shadow-lg">
                    <Play className="w-6 h-6 fill-white text-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-3 right-3 text-[11px] font-semibold bg-black/70 px-2 py-0.5 rounded text-white">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-6">
                  <div className="text-xs font-semibold text-[#00a887] uppercase mb-2">
                    {vid.tag} · {vid.date}
                  </div>
                  <h4 className="font-semibold text-base text-[#082029] group-hover:text-[#00a887] transition-colors leading-snug">
                    {vid.title}
                  </h4>
                  <div className="mt-4 pt-3 border-t border-gray-100 text-xs font-semibold text-gray-500">
                    Watch full breakdown →
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
