'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Shield, MapPin, Mail, Phone, ExternalLink, ArrowRight } from 'lucide-react';
import { getPortalWebsiteSettings, PortalSettings } from '@/lib/supabase/queries';

export const Footer: React.FC = () => {
  const [settings, setSettings] = useState<PortalSettings | null>(null);

  useEffect(() => {
    getPortalWebsiteSettings().then(setSettings).catch(() => {});
  }, []);

  return (
    <footer className="bg-[#0B132B] text-slate-300 pt-14 sm:pt-16 pb-12 border-t border-[#1E293B]">
      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12">
        {/* Top Footer Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-10 sm:pb-12 border-b border-slate-800/80 gap-6">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-lg bg-primary text-white flex items-center justify-center font-semibold text-lg shadow-xs">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-xl sm:text-2xl text-white tracking-tight">
                  PRIVATE MARKET
                </span>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-blue-500/20 text-blue-300 border border-blue-400/30 tracking-wider">
                  UZ
                </span>
              </div>
              <div className="text-xs sm:text-sm text-slate-400 font-medium mt-0.5">
                India&apos;s Trusted Private Market Information Platform · Since 2018
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Link
              href="/shares"
              className="px-5 py-2.5 rounded-md bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm transition-all shadow-xs"
            >
              Explore Unlisted Shares →
            </Link>
            <Link
              href="/contact-us"
              className="px-5 py-2.5 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium text-xs sm:text-sm border border-slate-700 transition-all"
            >
              Concierge Dealing Desk
            </Link>
          </div>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 py-10 sm:py-12 border-b border-slate-800/80 text-sm">
          {/* Company Summary & Address */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-xs sm:text-sm text-slate-400 font-normal leading-relaxed pr-6">
              An institutional research and information platform for unlisted, pre-IPO and ESOP shares in India. We compile company fundamentals and indicative market prices to empower informed investor decisions. We are not a stock exchange and do not operate a secondary trading platform.
            </p>

            <div className="pt-1 flex items-start space-x-2.5 text-slate-400 text-xs sm:text-[13px]">
              <MapPin className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-medium text-slate-200 block mb-0.5">
                  Registered Corporate Office
                </span>
                <span>
                  {settings?.officeAddress || '8th Floor, Majestic Signia, Plot No. A-27, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301'}
                </span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase text-xs tracking-wider">
              Market Discovery
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-[13px]">
              <li><Link href="/shares" className="hover:text-white transition-colors">All Unlisted Shares</Link></li>
              <li><Link href="/drhp-filed" className="hover:text-white transition-colors">DRHP Filed Companies</Link></li>
              <li><Link href="/screener" className="hover:text-white transition-colors">Sector Screener</Link></li>
              <li><Link href="/sectors" className="hover:text-white transition-colors">Industry Sectors</Link></li>
              <li><Link href="/research" className="hover:text-white transition-colors">Research Reports</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase text-xs tracking-wider">
              Platform &amp; Desk
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-[13px]">
              <li><Link href="/about-us" className="hover:text-white transition-colors">About Us &amp; Mission</Link></li>
              <li><Link href="/blogs" className="hover:text-white transition-colors">Knowledge &amp; Video Insights</Link></li>
              <li><Link href="/partners" className="hover:text-white transition-colors">Partner With Us (IFAs/Desks)</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition-colors">Official Bank Accounts</Link></li>
              <li><Link href="/contact-us" className="hover:text-white transition-colors">Contact Dealing Desk</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-slate-200 uppercase text-xs tracking-wider">
              Regulatory
            </h4>
            <ul className="space-y-2 text-slate-400 text-xs sm:text-[13px]">
              <li><a href="#disclaimer" className="hover:text-white transition-colors">SEBI Compliance</a></li>
              <li><a href="#disclaimer" className="hover:text-white transition-colors">Risk Disclosures</a></li>
              <li><a href="#disclaimer" className="hover:text-white transition-colors">Terms of Information</a></li>
              <li><a href="#disclaimer" className="hover:text-white transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Detailed SEBI Compliance & Risk Disclaimer */}
        <div id="disclaimer" className="py-6 sm:py-8 text-xs text-slate-400 leading-relaxed space-y-2 border-b border-slate-800/80">
          <p>
            <strong className="text-slate-300 font-semibold">Important Regulatory Disclosure:</strong>{' '}
            Private Market is <strong>not</strong> a stock exchange or trading platform recognised by the Securities and Exchange Board of India (SEBI) under the Securities Contracts (Regulation) Act, 1956, and does not permit secondary-market trading on the platform. We are not SEBI-registered investment advisers, brokers or portfolio managers.
          </p>
          <p>
            All content — including company fundamental data, financial statements, valuation indicators, and indicative prices — is compiled for educational and information purposes only and does <strong>not</strong> constitute an offer to buy or sell securities, nor financial, legal, or tax advice. Indicative prices are reference markers and may differ from executed OTC transactions. Investing in unlisted equities carries substantial risk, including illiquidity, capital risk, lack of public disclosure, and absence of guaranteed IPO listing. Conduct thorough independent due diligence and consult SEBI-registered advisers before making any financial commitment.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-3">
          <div>
            © 2026 <strong className="text-slate-300">PRIVATE MARKET</strong>. All rights reserved.
          </div>
          <div className="text-blue-400 font-medium">
            Financial Information Platform · Not a SEBI-recognised Stock Exchange
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;