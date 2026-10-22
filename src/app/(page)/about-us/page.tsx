'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Award,
  Users,
  Building,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  TrendingUp,
  FileCheck,
  Building2
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

export default function AboutUsPage() {
  const milestones = [
    {
      year: '2018',
      title: 'Platform Inception',
      desc: 'Founded to bring pricing transparency and verified research into India’s informal unlisted equity market.'
    },
    {
      year: '2020',
      title: '24-Hour Demat Standard',
      desc: 'Pioneered direct depository transfer within 24 hours of settlement, setting a new benchmark for trust and safety.'
    },
    {
      year: '2022',
      title: 'Research & Mobile App Launch',
      desc: 'Introduced institutional-grade DRHP breakdowns and launched the Private Market mobile app on Android & iOS.'
    },
    {
      year: '2024',
      title: '1,00,000+ Investors Milestone',
      desc: 'Crossed 1 lakh registered investors with 500+ tracked pre-IPO and ESOP opportunities.'
    },
    {
      year: '2026',
      title: '4.9★ Google Trusted Leader',
      desc: 'Achieved 4.9 out of 5 stars based on 750+ verified Google customer reviews.'
    }
  ];

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
              <span>About Private Market · Established 2018</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              India&apos;s Trusted Private Market Information Platform
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              We empower retail and high-net-worth investors to discover, research, and allocate into India&apos;s fastest-growing unlisted, pre-IPO, and ESOP companies with institutional safety and transparency.
            </p>
          </div>

          {/* 3 Large Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-10 pt-8 border-t border-slate-800 max-w-4xl">
            <div className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="text-2xl sm:text-3xl font-bold text-white tabular-nums">1,00,000+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Investors Guided</div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="text-2xl sm:text-3xl font-bold text-emerald-400 tabular-nums">500+</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">Unlisted Shares Tracked</div>
            </div>
            <div className="p-4 sm:p-5 rounded-xl bg-slate-800/50 border border-slate-700/60">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400 tabular-nums">4.9 ★</div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-1">750+ Verified Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 space-y-12">
        {/* Our Mission & Values */}
        <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div className="max-w-3xl space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700">
              Our Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B132B]">
              Democratizing Access to India&apos;s Next Generation of Public Winners
            </h2>
            <p className="text-sm sm:text-base text-slate-700 font-normal leading-relaxed">
              Before a company lists on the NSE or BSE, its earliest high-growth value creation happens in the private equity and pre-IPO stages. Historically, these allocations were restricted to private equity funds and connected institutions.
            </p>
            <p className="text-xs sm:text-sm text-slate-600 font-normal leading-relaxed">
              At <strong>Private Market</strong>, we have eliminated opacity through verified indicative market prices, institutional financial research, and a legally documented concierge dealing process.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-6 border-t border-slate-100">
            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                1
              </div>
              <h3 className="font-bold text-base text-[#0B132B]">Concierge Dealing Model</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Not an automated exchange or unmonitored bulletin board. Every transaction is coordinated through experienced relationship managers with verified documentation.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                2
              </div>
              <h3 className="font-bold text-base text-[#0B132B]">24-Hour Demat Credit</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Shares are transferred directly into your personal CDSL or NSDL demat account via official off-market depository slips within 24 hours of settlement.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                3
              </div>
              <h3 className="font-bold text-base text-[#0B132B]">Strict Banking Integrity</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                Payments are made exclusively to our authorized corporate current accounts. We maintain zero tolerance for cash or routing through third-party accounts.
              </p>
            </div>

            <div className="p-5 sm:p-6 rounded-xl bg-slate-50 border border-slate-200/80 space-y-2">
              <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center font-bold text-xs">
                4
              </div>
              <h3 className="font-bold text-base text-[#0B132B]">SEBI Regulatory Compliance</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                We operate strictly within the legal bounds of the Securities Contracts (Regulation) Act and Depositories Act, providing independent educational insights.
              </p>
            </div>
          </div>
        </div>

        {/* Journey & Milestones Timeline */}
        <div className="bg-white rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs space-y-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
              Our Journey
            </span>
            <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
              Milestones Shaping Our Growth
            </h2>
          </div>

          <div className="space-y-3">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-1 sm:space-y-0 sm:space-x-5 p-4 rounded-lg bg-slate-50 border border-slate-200/70"
              >
                <div className="text-lg font-bold text-blue-700 font-mono shrink-0 w-16 tabular-nums">
                  {m.year}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#0B132B]">{m.title}</h3>
                  <p className="text-xs sm:text-sm text-slate-600 font-normal mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Headquarters Card */}
        <div className="bg-[#0B132B] rounded-xl p-6 sm:p-10 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border border-slate-800 shadow-sm">
          <div className="space-y-2.5">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
              Registered Corporate Office
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Visit Our Dealing Headquarters
            </h3>
            <p className="text-slate-300 text-xs sm:text-sm max-w-xl font-normal leading-relaxed">
              8th Floor, Majestic Signia, Plot No. A-27, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="px-6 py-2.5 rounded-lg font-semibold text-white bg-blue-700 hover:bg-blue-800 shrink-0 transition-colors text-xs sm:text-sm shadow-xs"
          >
            Get in Touch →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
