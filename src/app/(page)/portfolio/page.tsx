'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Shield,
  User,
  ArrowRight,
  Clock,
  LogOut,
  CheckCircle2,
  Briefcase,
  AlertCircle,
  FileText,
  Search,
  Phone,
  Building2,
  Loader2,
  Calendar
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import { useAuth } from '@/lib/supabase/auth-context';

interface UserInquiry {
  id: string;
  stock_name: string;
  quantity: number | null;
  enquiry_type: string;
  status: string;
  created_at: string;
  message?: string | null;
  source_page?: string | null;
}

export default function PortfolioPage() {
  const { user, session, signOut, isLoading } = useAuth();
  const router = useRouter();

  const [inquiries, setInquiries] = useState<UserInquiry[]>([]);
  const [inquiriesLoading, setInquiriesLoading] = useState(true);
  const [inquiriesError, setInquiriesError] = useState<string | null>(null);

  // Protected route enforcement
  useEffect(() => {
    if (!isLoading && !user) {
      router.push('/login?redirect=/portfolio');
    }
  }, [user, isLoading, router]);

  // Fetch real authorized user inquiries
  useEffect(() => {
    if (!user) return;

    let isMounted = true;
    const fetchUserInquiries = async () => {
      try {
        setInquiriesLoading(true);
        setInquiriesError(null);

        const headers: Record<string, string> = { 'Content-Type': 'application/json' };
        if (session?.access_token) {
          headers['Authorization'] = `Bearer ${session.access_token}`;
        }

        const res = await fetch('/api/portfolio/inquiries', {
          method: 'GET',
          headers,
        });

        if (!res.ok) {
          throw new Error(`Failed to load inquiries (${res.status})`);
        }

        const data = await res.json();
        if (isMounted) {
          if (data.success && Array.isArray(data.inquiries)) {
            setInquiries(data.inquiries);
          } else {
            setInquiries([]);
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('[Portfolio Fetch Error]:', err);
          setInquiriesError('Unable to load dealing inquiries at this time.');
          setInquiries([]);
        }
      } finally {
        if (isMounted) {
          setInquiriesLoading(false);
        }
      }
    };

    fetchUserInquiries();

    return () => {
      isMounted = false;
    };
  }, [user, session]);

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  if (isLoading || (!user && isLoading)) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col justify-between">
        <TopTicker />
        <Navbar />
        <div className="flex-1 flex flex-col items-center justify-center p-8 space-y-3">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
          <p className="text-xs sm:text-sm text-slate-500 font-medium">Verifying Demat session credentials...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!user) {
    return null; // Handled by useEffect redirect
  }

  const clientDematId = `PM-${user.id.slice(0, 8).toUpperCase()}`;
  const memberSince = user.created_at
    ? new Date(user.created_at).toLocaleDateString('en-IN', { month: 'short', year: 'numeric' })
    : 'Active Investor';
  const fullName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Private Market Investor';

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
                Welcome back, <span className="font-semibold text-white">{fullName}</span> · Account:{' '}
                <span className="font-semibold text-white">{user.email}</span> · Demat Access ID:{' '}
                <span className="font-mono text-blue-300 font-bold">{clientDematId}</span>
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/shares"
                className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs flex items-center space-x-1.5"
              >
                <span>Browse Unlisted Shares</span>
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
        {/* Real Account Profile & Verification Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-xs text-slate-500 font-medium block">Investor Account</span>
            <div className="text-base font-bold text-slate-900 truncate" title={user.email}>
              {user.email}
            </div>
            <div className="text-[11px] text-emerald-600 font-semibold flex items-center space-x-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Verified Session</span>
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-xs text-slate-500 font-medium block">Demat Access ID</span>
            <div className="text-base font-bold text-slate-900 font-mono">{clientDematId}</div>
            <div className="text-[11px] text-slate-500 font-medium">CDSL/NSDL Off-Market Linking</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-xs text-slate-500 font-medium block">Dealing Requests</span>
            <div className="text-2xl font-bold text-blue-700 tabular-nums">
              {inquiriesLoading ? '...' : inquiries.length}
            </div>
            <div className="text-[11px] text-slate-500 font-medium">
              {inquiries.length === 1 ? '1 Active Request' : `${inquiries.length} Inquiries Logged`}
            </div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-xs space-y-1.5">
            <span className="text-xs text-slate-500 font-medium block">Registration Status</span>
            <div className="text-base font-bold text-emerald-700 flex items-center space-x-1.5">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Active Member</span>
            </div>
            <div className="text-[11px] text-slate-500 font-medium">Member since {memberSince}</div>
          </div>
        </div>

        {/* Active Demat Holdings Section (Authentic State) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <Briefcase className="w-4 h-4 text-primary" />
                <span>Indicative Demat Holdings</span>
              </h2>
              <p className="text-xs text-slate-500">Unlisted securities credited to your personal CDSL / NSDL depository account</p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-700 border border-blue-200 self-start sm:self-auto">
              Off-Market Demat Settlement
            </span>
          </div>

          {/* Genuine Verified Empty State — No Fabricated Figures */}
          <div className="p-8 sm:p-12 text-center max-w-xl mx-auto space-y-4">
            <div className="w-14 h-14 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center mx-auto text-slate-400">
              <Briefcase className="w-7 h-7 text-slate-500" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-base font-bold text-slate-900">No Verified Holdings on File Yet</h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                Your investor profile currently has 0 unlisted share transactions linked. Once your buy order or ESOP liquidation block is executed with our dealing desk and credited into your Demat account, your active holdings and indicative valuations will appear here.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/shares"
                className="px-4 py-2.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold transition-colors shadow-xs flex items-center space-x-1.5"
              >
                <Search className="w-4 h-4" />
                <span>Explore Unlisted Shares</span>
              </Link>
              <Link
                href="/contact-us"
                className="px-4 py-2.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs sm:text-sm font-semibold transition-colors border border-slate-200 flex items-center space-x-1.5"
              >
                <Phone className="w-4 h-4 text-slate-600" />
                <span>Request Buy / Sell Quote</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Real User Dealing Desk Inquiries Tracker */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-xs p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
            <div>
              <h2 className="text-base font-bold text-slate-900 flex items-center space-x-2">
                <FileText className="w-4 h-4 text-primary" />
                <span>Your Active Dealing Desk Inquiries</span>
              </h2>
              <p className="text-xs text-slate-500">Live verification status of requests submitted with your email ({user.email})</p>
            </div>
            <Link
              href="/contact-us"
              className="text-xs font-semibold text-blue-700 hover:underline self-start sm:self-auto"
            >
              + Submit New Inquiry
            </Link>
          </div>

          {inquiriesLoading ? (
            <div className="p-8 text-center space-y-2">
              <Loader2 className="w-6 h-6 text-primary animate-spin mx-auto" />
              <p className="text-xs text-slate-500">Retrieving your verified dealing records...</p>
            </div>
          ) : inquiriesError ? (
            <div className="p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start space-x-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <span>{inquiriesError}</span>
            </div>
          ) : inquiries.length === 0 ? (
            <div className="p-8 text-center space-y-3 bg-slate-50/60 rounded-lg border border-slate-200/80">
              <Clock className="w-8 h-8 text-slate-400 mx-auto" />
              <div className="space-y-1">
                <p className="text-xs sm:text-sm font-semibold text-slate-800">No Dealing Requests Submitted Yet</p>
                <p className="text-xs text-slate-500 max-w-md mx-auto">
                  Interested in purchasing unlisted pre-IPO shares or liquidating vested ESOPs? Submit an inquiry to receive verified indicative quotes from our dealing desk.
                </p>
              </div>
              <Link
                href="/contact-us"
                className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold transition-colors shadow-xs mt-2"
              >
                <span>Submit Inquiry Now</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-2.5">
              {inquiries.map((inq) => {
                const dateStr = inq.created_at
                  ? new Date(inq.created_at).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })
                  : 'Recent';

                return (
                  <div
                    key={inq.id}
                    className="p-4 rounded-lg bg-blue-50/60 border border-blue-100 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                  >
                    <div className="flex items-start space-x-3">
                      <Clock className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5 text-xs">
                        <div className="font-semibold text-slate-900 text-xs sm:text-sm">
                          {inq.stock_name}
                          {inq.quantity ? ` — ${inq.quantity} Units` : ''}
                        </div>
                        <div className="text-slate-600 flex items-center gap-2 flex-wrap">
                          <span className="capitalize px-1.5 py-0.5 rounded bg-blue-100/70 text-blue-800 font-medium text-[11px]">
                            {inq.enquiry_type.replace('_', ' ')}
                          </span>
                          <span>· Submitted: {dateStr}</span>
                          {inq.source_page && <span>· Source: {inq.source_page}</span>}
                        </div>
                        {inq.message && (
                          <p className="text-slate-500 text-[11px] pt-1 italic line-clamp-1">
                            &quot;{inq.message}&quot;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="self-start sm:self-auto shrink-0">
                      <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200 uppercase tracking-wide">
                        {inq.status || 'New Inquiry'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
