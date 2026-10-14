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
  FileCheck
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
              <span>About Private Market · Since 2018</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              India&apos;s Trusted Private Market Information Platform
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              We empower retail and high-net-worth investors to discover, research, and allocate into India&apos;s fastest-growing unlisted, pre-IPO, and ESOP companies with institutional safety and transparency.
            </p>
          </div>

          {/* 3 Large Key Metrics */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10 max-w-4xl">
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-semibold text-white">1,00,000+</div>
              <div className="text-sm text-slate-300 font-medium mt-1">Investors Guided</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-semibold text-emerald-400">500+</div>
              <div className="text-sm text-slate-300 font-medium mt-1">Unlisted Shares Tracked</div>
            </div>
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <div className="text-3xl font-semibold text-teal-300">4.9 ★</div>
              <div className="text-sm text-slate-300 font-medium mt-1">750+ Google Reviews</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area with generous spacing */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 w-full flex-1 space-y-16">
        {/* Our Mission & Values */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#dce8e5] shadow-xs space-y-6">
          <div className="max-w-3xl space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887]">
              Our Foundation
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#082029]">
              Democratizing Access to India&apos;s Next Generation of Public Winners
            </h2>
            <p className="text-base sm:text-lg text-gray-700 font-normal leading-relaxed">
              Before a company lists on the NSE or BSE, its earliest high-growth value creation happens in the private equity and pre-IPO stages. Historically, these allocations were restricted to private equity funds and connected institutions.
            </p>
            <p className="text-base text-gray-600 font-normal leading-relaxed">
              At <strong>Private Market</strong>, we have eliminated opacity through verified indicative market prices, institutional financial research, and a legally documented concierge dealing process.
            </p>
          </div>

          {/* 4 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-gray-100">
            <div className="p-6 rounded-2xl bg-[#fafcfb] border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center font-semibold">
                1
              </div>
              <h3 className="font-semibold text-lg text-[#082029]">Concierge Dealing Model</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Not an automated exchange or unmonitored bulletin board. Every transaction is coordinated through experienced relationship managers with verified documentation.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fafcfb] border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center font-semibold">
                2
              </div>
              <h3 className="font-semibold text-lg text-[#082029]">24-Hour Demat Credit</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Shares are transferred directly into your personal CDSL or NSDL demat account via official off-market depository slips within 24 hours of settlement.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fafcfb] border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center font-semibold">
                3
              </div>
              <h3 className="font-semibold text-lg text-[#082029]">Strict Banking Integrity</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                Payments are made exclusively to our authorized corporate current accounts. We maintain zero tolerance for cash or routing through third-party accounts.
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#fafcfb] border border-gray-100 space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center font-semibold">
                4
              </div>
              <h3 className="font-semibold text-lg text-[#082029]">SEBI Regulatory Compliance</h3>
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                We operate strictly within the legal bounds of the Securities Contracts (Regulation) Act and Depositories Act, providing independent educational insights.
              </p>
            </div>
          </div>
        </div>

        {/* Journey & Milestones Timeline */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-[#dce8e5] shadow-xs space-y-8">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
              Our Journey
            </span>
            <h2 className="text-2xl sm:text-3xl font-semibold text-[#082029]">
              Milestones Shaping Our Growth
            </h2>
          </div>

          <div className="space-y-6">
            {milestones.map((m, idx) => (
              <div
                key={idx}
                className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 p-5 rounded-2xl bg-[#f8fafc] border border-gray-100"
              >
                <div className="text-xl font-semibold text-[#00a887] font-mono shrink-0 w-20">
                  {m.year}
                </div>
                <div>
                  <h3 className="text-base font-semibold text-[#082029]">{m.title}</h3>
                  <p className="text-sm text-gray-600 font-normal mt-0.5">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Corporate Headquarters Card */}
        <div className="bg-gradient-to-r from-[#082029] to-[#0d3b4a] rounded-3xl p-8 sm:p-12 text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-xl">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#2dd4bf]">
              Registered Corporate Office
            </span>
            <h3 className="text-2xl sm:text-3xl font-semibold text-white">
              Visit Our Dealing Headquarters
            </h3>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl font-normal leading-relaxed">
              8th Floor, Majestic Signia, Plot No. A-27, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301.
            </p>
          </div>

          <Link
            href="/contact-us"
            className="px-8 py-3.5 rounded-xl font-semibold text-[#082029] bg-[#2dd4bf] hover:bg-[#14b8a6] shrink-0 shadow-md transition-all text-sm sm:text-base"
          >
            Get in Touch →
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
