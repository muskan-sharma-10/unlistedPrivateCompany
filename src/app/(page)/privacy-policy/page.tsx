import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  ShieldCheck,
  Lock,
  Eye,
  Server,
  UserCheck,
  ArrowRight,
  Mail,
  Phone,
  Building,
  CheckCircle2
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Privacy Policy & Data Security Commitment | Unlisted Pond',
  description:
    'Our commitment to privacy, investor data security, encryption standards, and responsible information handling at Unlisted Pond under Indian IT laws.',
  alternates: {
    canonical: 'https://www.unlistedpond.com/privacy-policy',
  },
};

export default function PrivacyPolicyPage() {
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
              <ShieldCheck className="w-3.5 h-3.5 text-blue-400" />
              <span>Data Protection &amp; Confidentiality</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Privacy Policy &amp; Data Security
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              We respect your personal and financial confidentiality. Read how Unlisted Pond collects, encrypts, and handles your information in accordance with Indian data protection regulations.
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
          <span className="text-slate-900 font-medium">Privacy Policy</span>
        </div>
      </div>

      {/* Main Document Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 space-y-8">
        {/* Core Guarantee Card */}
        <div className="p-5 sm:p-6 rounded-xl bg-blue-50/80 border border-blue-200/90 text-blue-950 space-y-2">
          <div className="flex items-center space-x-2.5 text-blue-900 font-bold text-sm sm:text-base">
            <Lock className="w-5 h-5 text-blue-700 shrink-0" />
            <span>Our Privacy Guarantee</span>
          </div>
          <p className="text-xs sm:text-sm text-blue-900 leading-relaxed font-normal">
            We never sell, rent, lease, or monetize your personal or financial contact information to third-party marketing networks, telemarketers, or loan aggregators. All communication initiated with Unlisted Pond is maintained in strict institutional confidence.
          </p>
        </div>

        {/* Section 1: Information We Collect */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            1. Information We Collect
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            When you interact with our platform, submit dealing desk inquiries, or apply for partnership programs, we may collect:
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">Identity &amp; Contact Details</span>
              <p className="text-slate-600">Full name, official email address, mobile number, and city / location.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">Inquiry Specifications</span>
              <p className="text-slate-600">Company / unlisted stock of interest, indicative lot size, and partnership category.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">Settlement Verification Data</span>
              <p className="text-slate-600">Client Master List (CML) and PAN verification submitted strictly for executing off-market depository transfers.</p>
            </div>
            <div className="p-3.5 rounded-lg border border-slate-200 bg-slate-50 text-xs sm:text-sm">
              <span className="font-semibold text-slate-900 block mb-1">Technical Analytics</span>
              <p className="text-slate-600">Aggregated browser type, device information, and anonymized access telemetry to safeguard against bot attacks and DDoS.</p>
            </div>
          </div>
        </div>

        {/* Section 2: Purpose of Processing */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            2. Purpose &amp; Use of Collected Information
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Dealing Desk Coordination:</strong> To connect you with our institutional relationship managers regarding unlisted share inquiries.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Transaction Documentation:</strong> To coordinate off-market Delivery Instruction Slip (DIS) processing and depository transfer verifications.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Regulatory &amp; Statutory Compliance:</strong> To satisfy mandatory Anti-Money Laundering (AML) and financial recordkeeping requirements under Indian law.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
              <span><strong>Research Notes:</strong> To deliver requested company research dossiers, DRHP breakdown updates, or indicative price sheets.</span>
            </li>
          </ul>
        </div>

        {/* Section 3: Data Security & Protection Standards */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            3. Technical Security &amp; Encryption Standards
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            We employ industry-standard administrative, physical, and technical safeguards to secure your personal data against unauthorized access, loss, or alteration:
          </p>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-2">
            <p>• <strong>Transport Layer Security:</strong> All data transmitted between your browser and our servers is encrypted using modern TLS (HTTPS) protocols.</p>
            <p>• <strong>Row-Level Database Security (RLS):</strong> Inquiry databases are protected by strict Supabase Row Level Security policies preventing unauthorized public access or cross-tenant inspection.</p>
            <p>• <strong>Role-Based Access Controls:</strong> Access to client inquiry records is restricted strictly to authorized dealing desk personnel under confidentiality agreements.</p>
          </div>
        </div>

        {/* Section 4: Data Retention & User Rights */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            4. Data Retention &amp; Investor Rights
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            You maintain the right to inspect, correct, or request the deletion of your personal contact information from our active outreach databases. To request the removal of your information or opt out of dealing desk updates, simply email our compliance desk with your registered phone number or email address.
          </p>
        </div>

        {/* Section 5: Grievance Officer */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            5. Grievance Redressal Officer
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
            In compliance with the Information Technology Act, 2000 and the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, the designated Grievance Officer for Unlisted Pond is:
          </p>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-800 space-y-2">
            <div className="flex items-center space-x-2">
              <Mail className="w-4 h-4 text-blue-700 shrink-0" />
              <span><strong>Email:</strong> <a href="mailto:info.biswal01@gmail.com" className="text-blue-700 hover:underline">info.biswal01@gmail.com</a></span>
            </div>
            <div className="flex items-center space-x-2">
              <Phone className="w-4 h-4 text-blue-700 shrink-0" />
              <span><strong>Contact Phone:</strong> <a href="tel:+919220451030" className="text-blue-700 hover:underline">+91 9220451030</a></span>
            </div>
            <div className="flex items-center space-x-2">
              <Building className="w-4 h-4 text-blue-700 shrink-0" />
              <span><strong>Corporate Address:</strong> 1017, Gate No. 1, New Delhi YMCA Jai Singh Road, Connaught Place, New Delhi- 110001</span>
            </div>
          </div>
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex flex-wrap gap-3">
          <Link
            href="/sebi-compliance"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
          >
            <span>SEBI Compliance</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/risk-disclosures"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
          >
            <span>Risk Disclosures</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
          <Link
            href="/terms-of-information"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
          >
            <span>Terms of Information</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

