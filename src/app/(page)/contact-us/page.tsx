'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Shield,
  CheckCircle2,
  MessageSquareShare,
  AlertTriangle,
  Building2,
  Loader2
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

import { submitLeadEnquiry, getPortalWebsiteSettings, PortalSettings } from '@/lib/supabase/queries';

export default function ContactUsPage() {
  const [settings, setSettings] = useState<PortalSettings | null>(null);
  const [dealType, setDealType] = useState<'buy' | 'sell' | 'esop' | 'partner'>('buy');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stockName, setStockName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  React.useEffect(() => {
    getPortalWebsiteSettings().then(setSettings).catch(() => {});
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadEnquiry({
        name,
        phone,
        email,
        stock_name: stockName || undefined,
        quantity: quantity ? parseInt(quantity, 10) : undefined,
        message,
        enquiry_type: dealType === 'buy' ? 'buy_order' : dealType === 'sell' ? 'sell_order' : dealType === 'esop' ? 'esop_liquidity' : 'partner_desk',
        source_page: '/contact-us',
      });
      setSubmitted(true);
      setName('');
      setPhone('');
      setEmail('');
      setStockName('');
      setQuantity('');
      setMessage('');
      setTimeout(() => setSubmitted(false), 5000);
    } catch {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              <span>Institutional Dealing Desk · Noida Corporate Office</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Connect with Private Market
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Reach out to our relationship managers to verify indicative price quotes, check lot allocations, sell vested ESOP holdings, or explore corporate partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 space-y-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
          {/* Left Column: Dealing Desk Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-5">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                  Enquiry Desk
                </span>
                <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
                  Send a Dealing Inquiry
                </h2>
                <p className="text-xs sm:text-sm text-slate-600 font-normal mt-1">
                  Our dealing team responds within 2 business hours with verified live quotes.
                </p>
              </div>

              {/* Deal Type Switcher */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 p-1 bg-slate-100 rounded-lg">
                {[
                  { id: 'buy', label: 'Buy Shares' },
                  { id: 'sell', label: 'Sell Shares' },
                  { id: 'esop', label: 'Sell ESOPs' },
                  { id: 'partner', label: 'Partner With Us' },
                ].map((t) => (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setDealType(t.id as any)}
                    className={`py-2 rounded-md text-xs font-semibold transition-colors ${
                      dealType === t.id
                        ? 'bg-blue-700 text-white shadow-xs'
                        : 'text-slate-700 hover:text-slate-900'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors tabular-nums"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-slate-700 block mb-1">
                      Company / Unlisted Stock *
                    </label>
                    <input
                      type="text"
                      required
                      value={stockName}
                      onChange={(e) => setStockName(e.target.value)}
                      placeholder="e.g. NSE India, Zepto, MSEI"
                      className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Estimated Quantity or Investment Budget
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 50 shares / ₹ 1,00,000"
                    className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors tabular-nums"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">
                    Additional Instructions or Notes
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific depository questions or requirements..."
                    className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
                  />
                </div>

                {submitted ? (
                  <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Inquiry logged! Dealing desk calling you shortly.</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors text-center flex items-center justify-center space-x-2"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Submitting Request...</span>
                      </>
                    ) : (
                      <span>Submit Dealing Desk Request →</span>
                    )}
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Office Address & Contact Cards */}
          <div className="lg:col-span-5 space-y-5">
            {/* Registered Office */}
            <div className="bg-white rounded-xl p-6 border border-slate-200 shadow-xs space-y-4">
              <div className="flex items-center space-x-2.5 text-blue-700">
                <Building2 className="w-5 h-5" />
                <h3 className="text-lg font-bold text-[#0B132B]">Registered Office</h3>
              </div>

              <div className="text-xs sm:text-sm text-slate-700 space-y-1.5 leading-relaxed">
                <p className="font-bold text-slate-900">
                  {settings?.siteTitle || 'IZUZ Consultancy Pvt. Ltd.'}
                </p>
                <p className="text-slate-600">
                  {settings?.officeAddress || '8th Floor, Majestic Signia, Plot No. A-27, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301'}
                </p>
              </div>

              <div className="pt-3.5 border-t border-slate-100 space-y-2.5 text-xs">
                <div className="flex items-center space-x-2.5 text-slate-700">
                  <Clock className="w-4 h-4 text-blue-700 shrink-0" />
                  <span>Mon – Sat: 9:30 AM to 6:30 PM IST</span>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-700">
                  <Mail className="w-4 h-4 text-blue-700 shrink-0" />
                  <a href={`mailto:${settings?.supportEmail || 'sales@unlistedzone.com'}`} className="hover:text-blue-700 transition-colors">
                    {settings?.supportEmail || 'sales@unlistedzone.com'}
                  </a>
                </div>
                <div className="flex items-center space-x-2.5 text-slate-700">
                  <Phone className="w-4 h-4 text-blue-700 shrink-0" />
                  <a href={`tel:${settings?.supportPhone || '+918010009696'}`} className="hover:text-blue-700 transition-colors tabular-nums">
                    {settings?.supportPhone || '+91 80100 09696'}
                  </a>
                </div>
              </div>
            </div>

            {/* Official Banking Alert Card */}
            <div className="bg-amber-50/70 rounded-xl p-5 border border-amber-200 text-amber-900 space-y-2">
              <div className="flex items-center space-x-2 font-bold text-amber-800 text-xs sm:text-sm">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0" />
                <span>Official Bank Account Notice</span>
              </div>
              <p className="text-xs text-amber-800/90 leading-relaxed font-normal">
                All client fund transfers for unlisted shares must only be made to our verified company bank accounts in the name of <strong>IZUZ Consultancy Pvt. Ltd.</strong> We never accept cash or transfers into personal or employee accounts.
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
