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
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Banner with Deep Navy Institutional Theme */}
      <section className="bg-[#0B132B] text-white py-14 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
              <span className="w-5 h-[2px] bg-blue-500" />
              <span>Knowledge Centre · Education &amp; Market Insights</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Unlisted Market Blogs &amp; Insights
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Curated market guides, SEBI regulatory updates, capital gains tax explainers, and video breakdowns from India&apos;s leading unlisted shares research desk.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14 w-full flex-1 space-y-10">
        {/* Category & Search Filter */}
        <div className="bg-white rounded-xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div className="flex items-center space-x-2 overflow-x-auto scrollbar-none pb-1 md:pb-0">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setActiveCategory(c)}
                className={`text-xs font-semibold px-3.5 py-1.5 rounded-lg whitespace-nowrap transition-colors ${
                  activeCategory === c
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
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
              className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-4 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>

        {/* 2-Column Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {filtered.map((item) => (
            <Link
              key={item.id}
              href={`/blogs/${item.slug || item.id}`}
              className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between group block"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-medium text-slate-500 mb-3.5">
                  <span className="text-blue-700 bg-blue-50 border border-blue-200/60 px-2.5 py-0.5 rounded-md font-semibold text-[11px]">
                    {item.category}
                  </span>
                  <div className="flex items-center space-x-2 text-slate-500 tabular-nums text-xs">
                    <Clock className="w-3.5 h-3.5 text-slate-400" />
                    <span>{item.readTime}</span>
                    <span className="text-slate-300">·</span>
                    <span>{item.date}</span>
                  </div>
                </div>

                <h2 className="text-lg sm:text-xl font-bold text-[#0B132B] group-hover:text-blue-700 transition-colors leading-snug mb-3">
                  {item.title}
                </h2>

                <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed mb-5 line-clamp-3">
                  {item.summary}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold">
                <span className="text-slate-500">{item.author}</span>
                <span className="text-blue-700 group-hover:translate-x-0.5 transition-transform inline-flex items-center space-x-1">
                  <span>Read Article</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Video Learning Section */}
        <div className="pt-6 border-t border-slate-200">
          <div className="flex items-center justify-between mb-6">
            <div>
              <span className="text-xs font-bold uppercase text-blue-700 tracking-wider">
                Video Insights
              </span>
              <h3 className="text-xl sm:text-2xl font-bold text-[#0B132B] mt-1">
                Latest Video Analysis
              </h3>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEOS_DATA.map((vid) => (
              <div
                key={vid.id}
                className="bg-white rounded-xl overflow-hidden border border-slate-200 hover:border-blue-300 hover:shadow-md transition-all group"
              >
                <div className="h-40 bg-[#0B132B] relative flex items-center justify-center p-6 text-center text-white">
                  <div className="w-12 h-12 rounded-full bg-white/15 backdrop-blur-xs flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-700 transition-all duration-200 shadow-md">
                    <Play className="w-5 h-5 fill-white text-white ml-0.5" />
                  </div>
                  <span className="absolute bottom-2.5 right-2.5 text-[10px] font-semibold bg-black/75 px-2 py-0.5 rounded text-white tabular-nums">
                    {vid.duration}
                  </span>
                </div>

                <div className="p-5">
                  <div className="text-[11px] font-semibold text-blue-700 uppercase mb-1.5 tabular-nums">
                    {vid.tag} · {vid.date}
                  </div>
                  <h4 className="font-bold text-sm text-[#0B132B] group-hover:text-blue-700 transition-colors leading-snug line-clamp-2">
                    {vid.title}
                  </h4>
                  <div className="mt-3.5 pt-3 border-t border-slate-100 text-xs font-semibold text-slate-500 flex items-center space-x-1">
                    <span>Watch full breakdown</span>
                    <span>→</span>
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
