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
    <footer className="bg-[#05171d] text-slate-300 pt-16 sm:pt-24 pb-12 border-t border-[#0d2e38]">
      <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 xl:px-16">
        {/* Top Footer Banner */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between pb-12 sm:pb-16 border-b border-white/10 gap-8">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#00a887] to-[#2dd4bf] text-[#082029] flex items-center justify-center font-semibold text-xl shadow-lg">
              <Shield className="w-7 h-7 text-[#082029]" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-2xl sm:text-3xl text-white tracking-tight">
                  PRIVATE MARKET
                </span>
                <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-md bg-[#00a887]/20 text-teal-300 tracking-wider">
                  UZ
                </span>
              </div>
              <div className="text-xs sm:text-sm text-teal-400 font-medium mt-0.5">
                India&apos;s Trusted Private Market Information Platform · Since 2018
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#shares"
              className="px-7 py-3.5 rounded-2xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold text-sm sm:text-base transition-all shadow-lg shadow-[#00a887]/25"
            >
              Explore Unlisted Shares →
            </a>
            <a
              href="#how"
              className="px-7 py-3.5 rounded-2xl bg-[#0e313d] hover:bg-[#133d4b] text-slate-200 font-semibold text-sm sm:text-base border border-white/10 transition-all"
            >
              Concierge Dealing Desk
            </a>
          </div>
        </div>

        {/* 4 Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 py-12 sm:py-16 border-b border-white/10 text-sm">
          {/* Company Summary & Address */}
          <div className="lg:col-span-2 space-y-4">
            <p className="text-sm text-slate-400 font-normal leading-relaxed pr-6">
              An information platform for unlisted, pre-IPO and ESOP shares in India. We provide company research and indicative prices, and help connect buyers with sellers. We are not a stock exchange and do not operate a trading platform.
            </p>

            <div className="pt-2 flex items-start space-x-3 text-slate-400 text-xs sm:text-sm">
              <MapPin className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white block mb-0.5">
                  Registered Office
                </span>
                <span>
                  {settings?.officeAddress || '8th Floor, Majestic Signia, Plot No. A-27, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301'}
                </span>
              </div>
            </div>
          </div>

          {/* Explore Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider">
              Explore
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-sm">
              <li><Link href="/shares" className="hover:text-teal-400 transition-colors">All Unlisted Shares</Link></li>
              <li><Link href="/drhp-filed" className="hover:text-teal-400 transition-colors">DRHP Filed Companies</Link></li>
              <li><Link href="/screener" className="hover:text-teal-400 transition-colors">Sector Screener</Link></li>
              <li><Link href="/research" className="hover:text-teal-400 transition-colors">Research Reports</Link></li>
              <li><Link href="/blogs" className="hover:text-teal-400 transition-colors">Video Insights & Blogs</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider">
              Company
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-sm">
              <li><Link href="/about-us" className="hover:text-teal-400 transition-colors">About Us</Link></li>
              <li><Link href="/about-us" className="hover:text-teal-400 transition-colors">How Settlement Works</Link></li>
              <li><Link href="/#reviews" className="hover:text-teal-400 transition-colors">Client Testimonials</Link></li>
              <li><Link href="/contact-us" className="hover:text-teal-400 transition-colors">Official Bank Accounts</Link></li>
              <li><Link href="/contact-us" className="hover:text-teal-400 transition-colors">Contact Dealing Desk</Link></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-3">
            <h4 className="font-semibold text-white uppercase text-xs tracking-wider">
              Regulatory
            </h4>
            <ul className="space-y-2.5 text-slate-400 text-sm">
              <li><a href="#disclaimer" className="hover:text-teal-400 transition-colors">SEBI Compliance</a></li>
              <li><a href="#disclaimer" className="hover:text-teal-400 transition-colors">Disclaimer</a></li>
              <li><a href="#disclaimer" className="hover:text-teal-400 transition-colors">Terms of Use</a></li>
              <li><a href="#disclaimer" className="hover:text-teal-400 transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Detailed SEBI Compliance & Risk Disclaimer */}
        <div id="disclaimer" className="py-8 text-xs text-slate-400 leading-relaxed space-y-2 border-b border-white/10">
          <p>
            <strong className="text-slate-300 font-semibold">Important Regulatory Disclosure:</strong>{' '}
            Private Market is <strong>not</strong> a stock exchange or trading platform recognised by SEBI under the Securities Contracts (Regulation) Act, 1956, and does not permit secondary-market trading on the platform. We are not SEBI-registered investment advisers, brokers or portfolio managers.
          </p>
          <p>
            All content — including company data, valuations, and indicative prices — is for information and education only and is <strong>not</strong> investment, financial, legal or tax advice. Indicative prices are not an offer to buy or sell and may differ from any price at which a transaction is actually concluded. Investing in unlisted shares carries substantial risk, including total loss of capital, illiquidity, lack of public disclosure, and no guarantee of any IPO. Past performance does not indicate future results. Conduct your own due diligence and consult SEBI-registered advisers before making any investment decisions.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <div>
            © 2026 <strong>PRIVATE MARKET</strong>. All rights reserved.
          </div>
          <div className="text-teal-400 font-medium">
            Information Platform · Not a SEBI-recognised Stock Exchange
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;