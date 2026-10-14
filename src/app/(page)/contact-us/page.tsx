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
  Building2
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

export default function ContactUsPage() {
  const [dealType, setDealType] = useState<'buy' | 'sell' | 'esop' | 'partner'>('buy');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stockName, setStockName] = useState('');
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName('');
      setPhone('');
      setEmail('');
      setStockName('');
      setQuantity('');
      setMessage('');
      alert('Thank you! Your request has been assigned to our senior relationship manager.');
    }, 1500);
  };

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
              <span>Institutional Dealing Desk · Noida Corporate Office</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Connect with Private Market
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Reach out to our relationship managers to verify indicative price quotes, check lot allocations, sell vested ESOP holdings, or explore corporate partnerships.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 py-14 sm:py-20 w-full flex-1 space-y-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          {/* Left Column: Dealing Desk Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-[#dce8e5] shadow-xs space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#00a887] block mb-1">
                  Enquiry Desk
                </span>
                <h2 className="text-2xl sm:text-3xl font-semibold text-[#082029]">
                  Send a Dealing Inquiry
                </h2>
                <p className="text-sm text-gray-600 font-normal mt-1">
                  Our dealing team responds within 2 business hours with verified live quotes.
                </p>
              </div>

              {/* Deal Type Switcher */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-1 bg-gray-100 rounded-2xl">
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
                    className={`py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                      dealType === t.id
                        ? 'bg-[#00a887] text-white shadow-xs'
                        : 'text-gray-700 hover:text-black'
                    }`}
                  >
                    {t.label}
                  </button>
                ))}
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Mobile Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="rahul@example.com"
                      className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Company / Unlisted Stock *
                    </label>
                    <input
                      type="text"
                      required
                      value={stockName}
                      onChange={(e) => setStockName(e.target.value)}
                      placeholder="e.g. NSE India, Zepto, MSEI"
                      className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                    Estimated Quantity or Investment Budget
                  </label>
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    placeholder="e.g. 50 shares / ₹ 1,00,000"
                    className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
                  />
                </div>

                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                    Additional Instructions or Notes
                  </label>
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Any specific depository questions or requirements..."
                    className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
                  />
                </div>

                {submitted ? (
                  <div className="p-4 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-semibold text-center flex items-center justify-center space-x-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                    <span>Inquiry logged! Dealing desk calling you shortly.</span>
                  </div>
                ) : (
                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white text-base font-semibold shadow-md transition-all text-center"
                  >
                    Submit Dealing Desk Request →
                  </button>
                )}
              </form>
            </div>
          </div>

          {/* Right Column: Office Address & Contact Cards */}
          <div className="lg:col-span-5 space-y-6">
            {/* Registered Office */}
            <div className="bg-white rounded-3xl p-8 border border-[#dce8e5] shadow-xs space-y-5">
              <div className="flex items-center space-x-3 text-[#00a887]">
                <Building2 className="w-6 h-6" />
                <h3 className="text-xl font-semibold text-[#082029]">Registered Office</h3>
              </div>

              <div className="text-sm text-gray-700 space-y-2 leading-relaxed">
                <p className="font-semibold text-base text-[#082029]">
                  IZUZ Consultancy Pvt. Ltd.
                </p>
                <p>
                  8th Floor, Majestic Signia, Plot No. A-27, Block A, Industrial Area, Sector 62, Noida, Uttar Pradesh 201301
                </p>
              </div>

              <div className="pt-4 border-t border-gray-100 space-y-3 text-sm">
                <div className="flex items-center space-x-3 text-gray-700">
                  <Clock className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>Mon – Sat: 9:30 AM to 6:30 PM IST</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Mail className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>sales@unlistedzone.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-700">
                  <Phone className="w-4 h-4 text-teal-600 shrink-0" />
                  <span>+91 80100 09696 / Dealing Desk</span>
                </div>
              </div>
            </div>

            {/* Official Banking Alert Card */}
            <div className="bg-[#fffbeb] rounded-3xl p-8 border border-amber-200 text-amber-900 space-y-3">
              <div className="flex items-center space-x-2.5 font-semibold text-amber-800">
                <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
                <span>Official Bank Account Notice</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-800/90 leading-relaxed font-normal">
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
