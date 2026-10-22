
'use client';

import React from 'react';
import Link from 'next/link';
import { Home, ServerCrash, RefreshCw } from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

export default function Custom500() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full text-center space-y-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-50 border border-amber-200/80 text-amber-700 mx-auto shadow-xs">
            <ServerCrash className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-amber-700 block">
              HTTP 500 Server Interruption
            </span>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B132B] tracking-tight">
              Internal Server Error
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
              An unexpected condition was encountered on the server. Our system engineers have been alerted. Please reload or return home.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => {
                if (typeof window !== 'undefined') window.location.reload();
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Reload Page</span>
            </button>

            <Link
              href="/"
              className="w-full sm:w-auto inline-flex items-center justify-center space-x-1.5 px-5 py-2.5 rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900 font-semibold text-xs sm:text-sm transition-colors"
            >
              <Home className="w-4 h-4" />
              <span>Go to Home</span>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
