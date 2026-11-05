import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import {
  AlertTriangle,
  Lock,
  TrendingDown,
  Clock,
  FileX2,
  Scale,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Info
} from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';

export const metadata: Metadata = {
  title: 'Risk Disclosures & Investor Caution Notice | Unlisted Pond',
  description:
    'Mandatory risk disclosures governing unlisted, pre-IPO, and ESOP share investments in India. Understand illiquidity risks, SEBI lock-in periods, valuation volatility, and capital loss risks.',
  alternates: {
    canonical: 'https://www.unlistedpond.com/risk-disclosures',
  },
};

export default function RiskDisclosuresPage() {
  const risks = [
    {
      icon: Clock,
      title: '1. Liquidity & Holding Period Risk',
      points: [
        'Unlisted shares are not traded on recognized stock exchanges (NSE/BSE). There is no guaranteed buyer or immediate secondary market exit.',
        'Converting unlisted equities back to cash is contingent entirely upon bilateral willing buyer availability.',
        'Investors should possess a multi-year investment horizon (typically 2 to 5+ years) and invest only disposable patient capital.',
      ],
    },
    {
      icon: Lock,
      title: '2. Mandatory SEBI Post-IPO Lock-in Period',
      points: [
        'Under SEBI (Issue of Capital and Disclosure Requirements) Regulations, all pre-IPO equity shares held by non-promoter shareholders are subject to a mandatory statutory lock-in of 6 months from the date of commercial stock exchange listing.',
        'During this 6-month statutory lock-in period, investors cannot sell, transfer, or pledge their shares on the stock exchange or through off-market transfers.',
      ],
    },
    {
      icon: TrendingDown,
      title: '3. Valuation & Indicative Price Volatility',
      points: [
        'Displayed prices are purely indicative estimates compiled from private OTC trades, recent funding rounds, and institutionally polled dealer sheets.',
        'Indicative rates do not represent a guaranteed execution price. OTC settlement prices may fluctuate significantly based on batch size, lot constraints, seller availability, and private market sentiment.',
      ],
    },
    {
      icon: FileX2,
      title: '4. IPO Uncertainty & DRHP Withdrawal',
      points: [
        'Filing a Draft Red Herring Prospectus (DRHP) with SEBI does not guarantee that a company will successfully complete an Initial Public Offering (IPO).',
        'Companies may defer, downsize, or withdraw their public offering due to adverse market conditions, regulatory clarifications, or board decisions.',
        'Valuations in an actual IPO may be priced lower than unlisted secondary prices prevailing prior to filing.',
      ],
    },
    {
      icon: Scale,
      title: '5. Information Asymmetry & Private Disclosures',
      points: [
        'Unlisted private companies are not subject to the continuous quarterly disclosure regulations mandated for publicly listed entities.',
        'Financial statements and corporate filings are submitted on an annual basis to the Registrar of Companies (ROC/MCA) with standard reporting lags.',
      ],
    },
    {
      icon: AlertTriangle,
      title: '6. Capital Loss & Asymmetric Equity Risk',
      points: [
        'Investing in early-stage, growth-stage, or pre-IPO companies entails substantial risk, including total loss of invested capital in the event of business failure.',
        'Unlisted shares are non-interest-bearing risk capital instruments and do not offer guaranteed principal protection or predictable dividend payouts.',
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      {/* Hero Banner with Deep Navy Institutional Theme */}
      <section className="bg-[#0B132B] text-white py-14 sm:py-20 border-b border-slate-800 relative overflow-hidden">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-3.5">
            <div className="inline-flex items-center space-x-2 px-2.5 py-1 rounded-md bg-amber-900/60 border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-wider">
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
              <span>Investor Caution &amp; Due Diligence</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
              Risk Disclosures for Unlisted Equities
            </h1>
            <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
              Essential statutory risk factors, lock-in requirements, and capital cautions that every investor must understand prior to participating in India&apos;s private unlisted shares market.
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
          <span className="text-slate-900 font-medium">Risk Disclosures</span>
        </div>
      </div>

      {/* Main Document Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 w-full flex-1 space-y-8">
        {/* Core Warning Box */}
        <div className="p-5 sm:p-6 rounded-xl bg-rose-50/80 border border-rose-200/90 text-rose-950 space-y-2">
          <div className="flex items-center space-x-2.5 text-rose-900 font-bold text-sm sm:text-base">
            <ShieldAlert className="w-5 h-5 text-rose-700 shrink-0" />
            <span>High-Risk Financial Instrument Warning</span>
          </div>
          <p className="text-xs sm:text-sm text-rose-900 leading-relaxed font-normal">
            Unlisted, pre-IPO, and ESOP equity investments are speculative and illiquid instruments carrying high risk. They are suitable only for sophisticated, accredited, or experienced investors who can absorb financial illiquidity and the potential loss of their invested capital.
          </p>
        </div>

        {/* Structured Risk Grid */}
        <div className="space-y-6">
          {risks.map((risk, idx) => {
            const Icon = risk.icon;
            return (
              <div
                key={idx}
                className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-3"
              >
                <div className="flex items-center space-x-3 text-[#0B132B]">
                  <div className="w-10 h-10 rounded-lg bg-blue-50 border border-blue-100 text-blue-700 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold">
                    {risk.title}
                  </h2>
                </div>

                <div className="space-y-2 pt-2 border-t border-slate-100">
                  {risk.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-start space-x-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-slate-400 mt-2 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Investor Prudence Checklist */}
        <div className="bg-white rounded-xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-[#0B132B] flex items-center space-x-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Recommended Investor Best Practices</span>
          </h2>
          <ul className="space-y-2.5 text-xs sm:text-sm text-slate-700">
            <li className="flex items-start space-x-2.5">
              <span className="font-bold text-blue-700">1.</span>
              <span><strong>Portfolio Allocation Limit:</strong> We recommend allocating no more than 5% to 15% of your total net equity portfolio into illiquid unlisted shares.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="font-bold text-blue-700">2.</span>
              <span><strong>Verify Corporate MCA Filings:</strong> Review annual balance sheets, auditor remarks, and share capital structures on the Ministry of Corporate Affairs portal.</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="font-bold text-blue-700">3.</span>
              <span><strong>Verify Depository Details:</strong> Ensure all share transfers reflect in your official CDSL / NSDL Demat account statement (CAS).</span>
            </li>
            <li className="flex items-start space-x-2.5">
              <span className="font-bold text-blue-700">4.</span>
              <span><strong>Consult Registered Professionals:</strong> Always consult your SEBI-registered Financial Advisor or Chartered Accountant before initiating large capital allocations.</span>
            </li>
          </ul>
        </div>

        {/* Quick Links */}
        <div className="pt-4 flex flex-wrap gap-3">
          <Link
            href="/sebi-compliance"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-white border border-slate-200 hover:border-blue-500 text-xs sm:text-sm font-semibold text-slate-700 hover:text-blue-700 transition-colors shadow-2xs"
          >
            <span>SEBI Compliance Framework</span>
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
            href="/contact-us"
            className="inline-flex items-center space-x-1.5 px-4 py-2 rounded-lg bg-blue-700 hover:bg-blue-800 text-xs sm:text-sm font-semibold text-white transition-colors shadow-2xs"
          >
            <span>Contact Dealing Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}

