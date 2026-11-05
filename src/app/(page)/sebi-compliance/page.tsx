import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldAlert,
  Scale,
  FileCheck2,
  Lock,
  Building,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  Phone,
  Mail
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'SEBI Compliance & Regulatory Framework | Unlisted Pond',
  description:
    'Comprehensive statutory disclosure regarding SEBI regulatory status, platform role as an information intermediary, OTC settlement standards, and compliance policies at Unlisted Pond.',
  alternates: {
    canonical: 'https://www.unlistedpond.com/sebi-compliance',
  },
};

export default function SebiCompliancePage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Banner with Institutional Deep Navy Theme */}
      <section className="bg-[#0B132B] text-white py-14 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-blue-900/60 border border-blue-500/30 text-blue-300 text-xs font-semibold uppercase tracking-wider">
              <Scale className="w-3.5 h-3.5 text-blue-400" />
              <span>Statutory &amp; Regulatory Disclosures</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              SEBI Compliance &amp; Operating Framework
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Transparent disclosures outlining our institutional operating role, regulatory demarcation, and compliance protocols governing unlisted and pre-IPO equities in India.
            </p>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3 text-xs text-slate-500 flex items-center space-x-2">
          <Link href="/" className="hover:text-blue-700 transition-colors">Home</Link>
          <span>/</span>
          <span className="text-slate-400">Regulatory</span>
          <span>/</span>
          <span className="text-slate-900 font-medium">SEBI Compliance</span>
        </div>
      </div>

      {/* Main Document Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 space-y-8">
        {/* Core Warning Box */}
        <div className="p-5 sm:p-6 rounded-xl bg-amber-50/80 border border-amber-200/90 text-amber-950 space-y-2">
          <div className="flex items-center space-x-2.5 text-amber-900 font-bold text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0" />
            <span>Primary Statutory Clarification</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900 leading-relaxed font-normal">
            Unlisted Pond (<strong className="font-semibold">“the Platform”</strong>) is strictly an independent financial information, research, and dealing facilitation intermediary. Unlisted Pond is <strong>not a stock exchange</strong> recognised by the Securities and Exchange Board of India (SEBI) under Section 4 of the Securities Contracts (Regulation) Act, 1956 (SCRA), nor is it an automated trading facility, secondary electronic book, or SEBI-registered stock broker.
          </p>
        </div>

        {/* Section 1: Non-Exchange Intermediary Status */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] flex items-center space-x-2.5">
            <span className="w-2 h-6 bg-blue-700 rounded-full" />
            <span>1. Operating Role &amp; Regulatory Demarcation</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Transactions in unlisted securities in India occur exclusively via bilateral Over-The-Counter (OTC) agreements between verified buyers and sellers as permitted under the Companies Act, 2013 and SEBI regulations. Unlisted Pond functions solely as a research, inquiry routing, and settlement facilitation conduit.
          </p>
          <ul className="space-y-2.5 pt-2 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>No Anonymous Automated Matching:</strong> We do not operate continuous double-auction order matching or central counterparty clearing mechanisms.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Bilateral Private Transactions:</strong> All secondary transfers are executed directly on a principal-to-principal or client-to-dealing desk basis.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Verified Depository Settlement:</strong> Share settlements are carried out via CDSL and NSDL off-market Delivery Instruction Slips (DIS) directly between depository demat accounts.</span>
            </li>
          </ul>
        </div>

        {/* Section 2: Non-Advisory and Informational Nature */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] flex items-center space-x-2.5">
            <span className="w-2 h-6 bg-blue-700 rounded-full" />
            <span>2. No Investment Advice / Research Intermediary Scope</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            Information presented on this platform — including fundamental corporate metrics, indicative prices, past funding rounds, and Draft Red Herring Prospectus (DRHP) details — is aggregated from public sources (Ministry of Corporate Affairs filings, audited financial statements, registrar records, and SEBI public repositories).
          </p>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5">
            <p>
              • <strong>Not an Investment Recommendation:</strong> The publication of indicative rates does not constitute a buy, sell, or hold recommendation, solicitation, or offer.
            </p>
            <p>
              • <strong>No Guaranteed Returns:</strong> Unlisted equity investments do not offer guaranteed returns or guaranteed liquidity.
            </p>
            <p>
              • <strong>Independent Due Diligence Required:</strong> Investors must perform independent scrutiny and consult SEBI-registered Investment Advisers (RIA) or Chartered Accountants prior to allocating capital.
            </p>
          </div>
        </div>

        {/* Section 3: Depository Transfer & Settlement Protocol */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] flex items-center space-x-2.5">
            <span className="w-2 h-6 bg-blue-700 rounded-full" />
            <span>3. Demat Settlement &amp; AML / KYC Standards</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            All unlisted equity transactions facilitated through our desk adhere strictly to Know-Your-Customer (KYC) and Anti-Money Laundering (AML) standards established by regulatory guidelines:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">Mandatory Demat Holding</span>
              <p className="text-slate-600">Shares are transferred exclusively in electronic dematerialized form via CDSL or NSDL into the buyer&apos;s verified demat account.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">Banking Channel Transfers</span>
              <p className="text-slate-600">Settlements are processed solely through verified banking channels (RTGS/NEFT/IMPS) from the investor&apos;s linked bank account. No cash transactions are permitted.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">PAN &amp; CML Verification</span>
              <p className="text-slate-600">Client Master List (CML) and valid Permanent Account Number (PAN) are authenticated prior to confirming any transaction.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">Stamp Duty Compliance</span>
              <p className="text-slate-600">Applicable Indian stamp duty is paid in accordance with the Indian Stamp Act on all off-market share transfers.</p>
            </div>
          </div>
        </div>

        {/* Section 4: Compliance Officer Contact */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B] flex items-center space-x-2.5">
            <span className="w-2 h-6 bg-blue-700 rounded-full" />
            <span>4. Grievance Redressal &amp; Compliance Officer</span>
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            For regulatory inquiries, statutory compliance verifications, or dispute escalation, please reach our dedicated compliance and secretarial desk:
          </p>
          <div className="p-4 rounded-lg bg-blue-50/60 border border-blue-200/80 text-xs sm:text-sm text-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-700 shrink-0" />
              <span><strong>Compliance Desk Email:</strong> <a href="mailto:info.biswal01@gmail.com" className="text-blue-700 hover:underline">info.biswal01@gmail.com</a></span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-700 shrink-0" />
              <span><strong>Institutional Desk:</strong> <a href="tel:+919220451030" className="text-blue-700 hover:underline">+91 9220451030</a> / <a href="tel:+919990865659" className="text-blue-700 hover:underline">+91 99908 65659</a></span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-blue-700 shrink-0" />
              <span><strong>Office:</strong> 1017, Gate No. 1, New Delhi YMCA Jai Singh Road, Connaught Place, New Delhi- 110001</span>
            </div>
          </div>
        </div>

        {/* Quick Links to other regulatory pages */}
        <div className="pt-4 flex flex-wrap gap-3">
          <Link
            href="/risk-disclosures"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
          >
            <span>Read Risk Disclosures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/terms-of-information"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
          >
            <span>Terms of Information</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/privacy-policy"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
          >
            <span>Privacy Policy</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

