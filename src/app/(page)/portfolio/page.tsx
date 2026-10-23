'use client';

import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  User,
  ArrowRight,
  TrendingUp,
  Clock,
  LogOut,
  CheckCircle2,
  PieChart,
  Briefcase,
  AlertCircle,
  FileText
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import { useAuth } from '@/lib/supabase/auth-context';

export default function PortfolioPage() {
  const { user, signOut, isLoading } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  const clientDematId = user?.id ? `IN3028-${user.id.slice(0, 8).toUpperCase()}` : 'IN3028-DEMO99';

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Header */}
      <section className="bg-[#0B132B] text-white py-10 sm:py-14 border-b border-slate-800 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div className="space-y-2">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Verified Private Demat Portfolio</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white">
                Investor Account &amp; Portfolio
              </h1>
              <p className="text-xs sm:text-sm text-slate-300">
                Logged in as <span className="font-semibold text-white">{user?.email || 'Authenticated Investor'}</span> · Client ID: <span className="font-mono text-blue-300">{clientDematId}</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/shares"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs flex items-center space-x-1.5"
              >
                <span>Explore Shares</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="px-4 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 hover:text-white text-xs sm:text-sm font-semibold transition-colors border border-slate-700 flex items-center space-x-1.5"
              >
                <LogOut className="w-4 h-4" />
                <span>Sign Out</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 w-full flex-1 space-y-8">
        {/* KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Indicative Portfolio Value</span>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">₹ 14,85,000</div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+18.4% (All time unlisted return)</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Active Unlisted Holdings</span>
            <div className="text-2xl font-bold text-slate-900 tabular-nums">3 Companies</div>
            <div className="text-[11px] text-slate-500 font-medium">NSE India, Zepto, MSEI</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Pending Dealing Requests</span>
            <div className="text-2xl font-bold text-blue-700 tabular-nums">1 Order</div>
            <div className="text-[11px] text-blue-600 font-medium">Under depository clearing</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1">
            <span className="text-xs text-slate-500 font-medium">Demat Security Status</span>
            <div className="text-2xl font-bold text-emerald-700 flex items-center space-x-1.5">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
              <span>CDSL Verified</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">DIS settlement ready</div>
          </div>
        </div>

        {/* Portfolio Table */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-slate-900">Indicative Demat Holdings</h2>
              <p className="text-xs text-slate-500">Credited into your personal CDSL/NSDL demat account</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200">
              Live Indicative Rates
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-semibold text-slate-600 uppercase tracking-wider">
                  <th className="py-3 px-6">Company / Stock</th>
                  <th className="py-3 px-6 text-right">Holding Qty</th>
                  <th className="py-3 px-6 text-right">Avg Buying Price</th>
                  <th className="py-3 px-6 text-right">Current Indicative</th>
                  <th className="py-3 px-6 text-right">Current Value</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs sm:text-sm">
                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-xs">
                        NS
                      </div>
                      <div>
                        <div>National Stock Exchange (NSE)</div>
                        <div className="text-[10px] text-slate-400 font-mono">ISIN: INE753W01016</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-medium tabular-nums">200</td>
                  <td className="py-4 px-6 text-right text-slate-600 tabular-nums">₹ 4,850</td>
                  <td className="py-4 px-6 text-right font-semibold text-slate-900 tabular-nums">₹ 5,850</td>
                  <td className="py-4 px-6 text-right font-bold text-slate-900 tabular-nums">₹ 11,70,000</td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      href="/contact-us"
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors"
                    >
                      Sell Units
                    </Link>
                  </td>
                </tr>

                <tr className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-4 px-6 font-semibold text-slate-900">
                    <div className="flex items-center space-x-2.5">
                      <div className="w-8 h-8 rounded-lg bg-emerald-700 text-white flex items-center justify-center font-bold text-xs">
                        ZP
                      </div>
                      <div>
                        <div>Zepto (KiranaKart Technologies)</div>
                        <div className="text-[10px] text-slate-400 font-mono">Quick Commerce · Series E</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-right font-medium tabular-nums">500</td>
                  <td className="py-4 px-6 text-right text-slate-600 tabular-nums">₹ 490</td>
                  <td className="py-4 px-6 text-right font-semibold text-slate-900 tabular-nums">₹ 630</td>
                  <td className="py-4 px-6 text-right font-bold text-slate-900 tabular-nums">₹ 3,15,000</td>
                  <td className="py-4 px-6 text-center">
                    <Link
                      href="/contact-us"
                      className="inline-block px-3 py-1 text-xs font-semibold rounded-md bg-slate-100 hover:bg-blue-50 text-slate-700 hover:text-blue-700 transition-colors"
                    >
                      Sell Units
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Dealing Inquiries Tracker */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900">Active Dealing Desk Inquiries</h2>
              <p className="text-xs text-slate-500">Direct requests logged via our dealing desk</p>
            </div>
            <Link
              href="/contact-us"
              className="text-xs font-semibold text-blue-700 hover:underline"
            >
              + Submit New Inquiry
            </Link>
          </div>

          <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-100 flex items-start space-x-3">
            <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
            <div className="space-y-1 text-xs">
              <div className="font-semibold text-slate-900">
                Inquiry #PM-2026-9041: Buy Shares — NSE India (50 Units)
              </div>
              <div className="text-slate-600">
                Status: <span className="font-semibold text-blue-700">Dealing Desk Verification</span> · An executive is matching with verified seller blocks.
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
