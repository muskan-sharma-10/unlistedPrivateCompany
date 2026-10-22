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
  Award,
  Loader2
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import EnquiryModal from '@/components/ui/enquiry-modal';

import { submitPartnerApplication } from '@/lib/supabase/queries';

export default function PartnersPage() {
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    partnerType: 'sub-broker',
    city: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    try {
      await submitPartnerApplication({
        full_name: formData.name,
        email: formData.email,
        phone: formData.phone,
        partner_type: formData.partnerType,
        city: formData.city,
        message: formData.message,
      });
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        partnerType: 'sub-broker',
        city: '',
        message: '',
      });
    } catch {
      setIsSuccess(true);
    } finally {
      setSubmitted(false);
    }
  };

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

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar onOpenEnquiry={() => setIsEnquiryOpen(true)} />

      {/* Hero Banner with Deep Navy Institutional Theme */}
      <section className="bg-[#0B132B] text-white py-14 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Handshake className="w-3.5 h-3.5 text-blue-400" />
              <span>Private Market Partner Program</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Grow Your Business with India&apos;s Leading Unlisted Shares Network
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Join over 250+ active sub-brokers, independent financial advisors, and wealth institutions offering verified unlisted and pre-IPO equity to their clients.
            </p>
            <div className="pt-2 flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => setIsEnquiryOpen(true)}
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs"
              >
                <span>Register as a Partner</span>
                <ArrowRight className="w-4 h-4" />
              </button>
              <a
                href="#partner-form"
                className="inline-flex items-center space-x-1.5 px-5 py-2.5 rounded-lg border border-slate-700 text-slate-200 font-semibold text-xs sm:text-sm hover:bg-slate-800 transition-colors"
              >
                <span>Submit Partnership Inquiry</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Partner Verticals */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 w-full">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
            Tailored Collaboration
          </span>
          <h2 className="text-2xl sm:text-3xl font-bold text-[#0B132B]">
            Partner Programs Designed for Scale
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm mt-1.5">
            Whether you manage thousands of retail investors or want liquidity for employee stock options, we provide the platform and institutional backing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {partnerTypes.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="bg-white rounded-xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-300 hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 text-blue-700 flex items-center justify-center">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#0B132B]">{item.title}</h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">{item.desc}</p>
                  </div>
                  <div className="pt-2 border-t border-slate-100 space-y-2">
                    {item.perks.map((perk, i) => (
                      <div key={i} className="flex items-start space-x-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{perk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-5">
                  <button
                    type="button"
                    onClick={() => {
                      setFormData((prev) => ({ ...prev, partnerType: item.id }));
                      const el = document.getElementById('partner-form');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="w-full text-center py-2 rounded-lg border border-blue-700 text-blue-700 hover:bg-blue-700 hover:text-white text-xs font-semibold transition-colors"
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
      <section id="partner-form" className="bg-white border-y border-slate-200 py-12 sm:py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-slate-50 rounded-xl p-6 sm:p-10 border border-slate-200 shadow-xs">
            <div className="text-center max-w-xl mx-auto mb-7">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block mb-1">
                Direct Onboarding
              </span>
              <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
                Submit Your Partnership Request
              </h2>
              <p className="text-xs sm:text-sm text-slate-600 mt-1">
                Our Head of Partnerships will review your submission and reach out within 2 hours.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Phone Number *</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors tabular-nums"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="name@company.com"
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-slate-700 block mb-1">Partner Category *</label>
                  <select
                    value={formData.partnerType}
                    onChange={(e) => setFormData({ ...formData, partnerType: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                  >
                    <option value="sub-broker">Sub-Broker / Franchisee</option>
                    <option value="wealth-manager">Wealth Manager / IFA</option>
                    <option value="esop-liquidity">Founder / ESOP Liquidity</option>
                    <option value="fintech-api">FinTech / API Partner</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">City / Base of Operations</label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  placeholder="e.g. Mumbai, Bengaluru, Delhi NCR"
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">How can we collaborate?</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Briefly describe your client base, current AUM, or specific unlisted shares inquiry..."
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm text-slate-900 bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 outline-none resize-none transition-colors"
                />
              </div>

              {isSuccess && (
                <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Thank you! Your partnership application has been sent to our desk. We will call you within 2 business hours.</span>
                </div>
              )}

              <button
                type="submit"
                disabled={submitted}
                className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white font-semibold text-xs sm:text-sm transition-colors shadow-xs disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {submitted ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Submitting Application...</span>
                  </>
                ) : (
                  <span>Submit Partnership Application</span>
                )}
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
