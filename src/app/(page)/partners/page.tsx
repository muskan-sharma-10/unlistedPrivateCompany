'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Users,
  Briefcase,
  TrendingUp,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Handshake,
  DollarSign,
  Building2,
  Sparkles,
  Award
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';

export default function PartnersPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partnerType: 'sub-broker',
    city: '',
    message: '',
  });

  const partnerTypes = [
    {
      id: 'sub-broker',
      title: 'Sub-Brokers & Franchisees',
      desc: 'Expand your retail wealth offerings with researched unlisted shares, Pre-IPO allocations, and dedicated dealing desk support.',
      icon: Briefcase,
      perks: [
        'Lucrative volume-based commissions',
        'Direct relationship manager support',
        'Daily indicative price sheet & research notes',
        'Client-side depository transfer within 24 hours',
      ],
    },
    {
      id: 'wealth-manager',
      title: 'Wealth Managers & IFAs',
      desc: 'Offer curated off-market opportunities to high net-worth clients looking for asymmetric pre-IPO growth.',
      icon: TrendingUp,
      perks: [
        'Zero onboarding fees',
        'Exclusive access to anchor/pre-IPO allocations',
        'Custom institutional research reports with co-branding',
        'Strict regulatory compliance adhering to SEBI guidelines',
      ],
    },
    {
      id: 'esop-liquidity',
      title: 'Founders & ESOP Pools',
      desc: 'Enable seamless secondary share liquidity for your key executives, ex-employees, and early angel investors.',
      icon: Users,
      perks: [
        'Confidential, non-disruptive secondary liquidation',
        'Vetted buyers with verified KYC & funds',
        'Custom minimum lot size management',
        'Complete legal and tax documentation guidance',
      ],
    },
    {
      id: 'fintech-api',
      title: 'FinTech Platforms & Ecosystems',
      desc: 'Integrate live indicative pricing and unlisted equity data directly into your personal finance or trading portal.',
      icon: Sparkles,
      perks: [
        'RESTful API data feeds',
        'Comprehensive company profiles & fundamentals',
        'Real-time DRHP filing updates',
        'White-label inquiry routing and settlement tracking',
      ],
    },
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        partnerType: 'sub-broker',
        city: '',
        message: '',
      });
      alert('Thank you for your partnership inquiry. Our institutional partnerships team will contact you within 2 business hours.');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#f3f8f7] text-[#111827] flex flex-col font-sans">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Hero Banner with Dark Teal Theme */}
      <section className="bg-[#082029] text-white py-16 sm:py-24 border-b border-[#0d2e38] relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#00a887]/15 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-3xl space-y-4">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-[#00a887]/15 border border-[#00a887]/30 text-teal-300 text-xs font-semibold uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5 text-[#00a887]" />
              <span>Private Market Partner Program</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-semibold tracking-tight text-white leading-tight">
              Grow Your Business with India&apos;s Leading Unlisted Shares Network
            </h1>
            <p className="text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              Join over 250+ active sub-brokers, independent financial advisors, and wealth institutions offering verified unlisted and pre-IPO equity to their clients.
            </p>
            <div className="pt-2 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold text-sm transition-all shadow-lg shadow-[#00a887]/20"
              >
                <span>Register as a Partner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#partner-form"
                className="inline-flex items-center space-x-2 px-6 py-3 rounded-2xl border border-white/20 text-white font-semibold text-sm hover:bg-white/5 transition-all"
              >
                <span>Submit Partnership Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Verticals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 py-16 sm:py-24 w-full">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-[#00a887] block mb-1">
            Tailored Collaboration
          </span>
          <h2 className="text-3xl sm:text-4xl font-semibold text-[#082029]">
            Partner Programs Designed for Scale
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mt-2">
            Whether you manage thousands of retail investors or want liquidity for employee stock options, we provide the platform and institutional backing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {partnerTypes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-8 border border-[#dce8e5] shadow-xs hover:border-[#00a887] hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-12 h-12 rounded-2xl bg-[#e6f7f3] text-[#00a887] flex items-center justify-center">
                    <Icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-[#082029]">{item.title}</h3>
                    <p className="text-sm text-gray-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-gray-100 space-y-2.5">
                    {item.perks.map((perk, i) => (
                      <div key={i} className="flex items-start space-x-2.5 text-xs sm:text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-[#00a887] shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-6">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, partnerType: item.id }));
                      const el = document.getElementById('partner-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-center py-2.5 rounded-xl border border-[#00a887] text-[#00a887] hover:bg-[#00a887] hover:text-white text-xs sm:text-sm font-semibold transition-colors"
                  >
                    Apply for {item.title.split('&')[0]}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Inquiry Form Section */}
      <section id="partner-form" className="bg-white border-y border-[#dce8e5] py-16 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-[#f8fafc] rounded-3xl p-8 sm:p-12 border border-[#dce8e5] shadow-sm">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold uppercase tracking-wider text-[#00a887] block mb-1">
                Direct Onboarding
              </span>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#082029]">
                Submit Your Partnership Request
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                Our Head of Partnerships will review your submission and reach out within 2 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-700 block mb-1.5">Partner Category *</label>
                  <select
                    value={formData.partnerType}
                    onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none bg-white"
                  >
                    <option value="sub-broker">Sub-Broker / Franchisee</option>
                    <option value="wealth-manager">Wealth Manager / IFA</option>
                    <option value="esop-liquidity">Founder / ESOP Liquidity</option>
                    <option value="fintech-api">FinTech / API Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">City / Base of Operations</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-700 block mb-1.5">How can we collaborate?</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your client base, current AUM, or specific unlisted shares inquiry..."
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-3.5 rounded-2xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold text-sm transition-all shadow-md shadow-[#00a887]/20 disabled:opacity-50"
              >
                {submitted ? 'Submitting Application...' : 'Submit Partnership Application'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Built-in Modal */}
      <EnquiryModal
        isOpen={isEnquiryOpen}
        onClose={() => setIsEnquiryOpen(false)}
      />
    </div>
  );
}
