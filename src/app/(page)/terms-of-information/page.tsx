import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  FileText,
  Scale,
  ShieldCheck,
  AlertCircle,
  HelpCircle,
  ArrowRight,
  ExternalLink,
  BookOpen
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Terms of Information & Platform Usage | Unlisted Pond',
  description:
    'Terms and conditions governing the access, research, inquiry routing, and informational usage of the Unlisted Pond private market portal.',
  alternates: {
    canonical: 'https://www.unlistedpond.com/terms-of-information',
  },
};

export default function TermsOfInformationPage() {
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
              <BookOpen className="w-3.5 h-3.5 text-blue-400" />
              <span>Platform Legal Terms</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Terms of Information &amp; Platform Use
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              These legal terms govern your access to indicative market data, research dossiers, and dealing desk communication channels provided by Unlisted Pond.
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
          <span className="text-slate-900 font-medium">Terms of Information</span>
        </div>
      </div>

      {/* Main Document Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 space-y-8">
        {/* Effective Date Card */}
        <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 text-xs text-slate-600 flex items-center justify-between">
          <span><strong>Effective Date:</strong> October 2026</span>
          <span><strong>Applicable Law:</strong> Laws of the Republic of India</span>
        </div>

        {/* Section 1: Acceptance of Terms */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            1. Acceptance of Terms
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            By visiting, browsing, or utilizing the information, screener tools, inquiry forms, and dealing desk channels provided by Unlisted Pond (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;the Platform&rdquo;), you acknowledge that you have read, understood, and agreed to be legally bound by these Terms of Information, our Privacy Policy, and our SEBI Compliance Framework. If you do not agree to these terms, please discontinue use of this platform immediately.
          </p>
        </div>

        {/* Section 2: Informational Non-Offer */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            2. Purely Informational Nature &amp; Non-Solicitation
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            All content published across this website — including company profiles, past valuations, funding rounds, sector classifications, DRHP reviews, and indicative prices — is compiled for educational, research, and informational reference purposes only.
          </p>
          <div className="p-4 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm text-slate-700 space-y-1.5">
            <p>
              • <strong>No Offer to Sell:</strong> Nothing on this website constitutes an offer, solicitation, recommendation, or invitation to subscribe for or purchase any securities.
            </p>
            <p>
              • <strong>No Broking or Portfolio Management:</strong> Unlisted Pond does not manage investor funds, provide discretionary portfolio services, or act as a SEBI-registered broker.
            </p>
          </div>
        </div>

        {/* Section 3: Indicative Pricing Disclaimer */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            3. Indicative Pricing &amp; Market Quotes
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Share rates published on Unlisted Pond are strictly <strong>indicative markers</strong> based on recent OTC transactions, dealer quotes, and secondary private market soundings. Indicative prices:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
            <li>Do not represent a binding commitment to buy or sell at the displayed rate.</li>
            <li>May vary based on transaction lot size, seller availability, counterparty risk, and settlement timelines.</li>
            <li>Are subject to change without prior notice due to private market volatility.</li>
          </ul>
        </div>

        {/* Section 4: Accuracy of Data & Third-Party Information */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            4. Accuracy of Data &amp; Corporate Filings
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            While Unlisted Pond employs diligent efforts to source data from verified statutory repositories (including Ministry of Corporate Affairs filings, audited annual reports, and DRHP filings), we make no warranties or representations, express or implied, regarding the completeness, accuracy, or timeliness of any third-party financial metrics or company profiles. Investors are solely responsible for verifying fundamental data independently.
          </p>
        </div>

        {/* Section 5: User Obligations & KYC Requirements */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            5. User Representations &amp; Demat Verification
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            Any user submitting an inquiry through our dealing desk represents and warrants that:
          </p>
          <ul className="list-disc pl-5 space-y-1.5 text-xs sm:text-sm text-slate-700">
            <li>They are legally competent to enter into binding agreements under Indian law.</li>
            <li>They maintain an active, verified electronic Demat account with an authorized CDSL or NSDL Depository Participant (DP).</li>
            <li>All funds utilized for bilateral OTC transactions originate from legitimate, tax-compliant domestic banking accounts in full adherence to Anti-Money Laundering (AML) and Prevention of Money Laundering Act (PMLA) regulations.</li>
          </ul>
        </div>

        {/* Section 6: Limitation of Liability */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            6. Limitation of Liability
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            To the maximum extent permitted by applicable Indian law, Unlisted Pond, its founders, directors, employees, and institutional partners shall not be liable for any direct, indirect, incidental, consequential, or punitive damages, or loss of profits arising out of your access to, use of, or reliance on any information or indicative prices provided on this platform.
          </p>
        </div>

        {/* Section 7: Governing Law & Jurisdiction */}
        <div className="bg-white rounded-xl p-6 sm:p-9 border border-slate-200 shadow-xs space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-[#0B132B]">
            7. Governing Law &amp; Jurisdiction
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            These Terms of Information shall be governed by, construed, and enforced in accordance with the substantive laws of the Republic of India. Any legal dispute, controversy, or claim arising out of or in connection with these Terms or the Platform shall be subject to the exclusive jurisdiction of the competent courts situated in New Delhi, India.
          </p>
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

