import React from 'react';
import Link from 'next/link';
import {
  Phone,
  Mail,
  Clock,
  ArrowRight,
  CheckCircle2
} from 'lucide-react';
import { ScrollReveal } from './scroll-reveal';

export const TeamCTA: React.FC = () => {
  return (
    <section className="bg-[#0B132B] text-white py-16 sm:py-20 lg:py-24 border-t border-slate-800 relative overflow-hidden">
      {/* Subtle brand lighting */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-20 right-10 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14 relative z-10">
        <ScrollReveal>
          <div className="bg-slate-900/80 rounded-2xl border border-slate-800 p-8 sm:p-12 lg:p-14 backdrop-blur-xs flex flex-col lg:flex-row items-start lg:items-center justify-between gap-10">
            {/* Left Column: Heading and Context */}
            <div className="max-w-2xl space-y-4">
              <div className="inline-flex items-center space-x-2 text-xs font-semibold tracking-wider text-blue-400 uppercase">
                <span className="w-5 h-[2px] bg-blue-500" />
                <span>DIRECT FOUNDER &amp; EXECUTIVE ACCESS</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight">
                Let&apos;s Discuss Your Business Requirements
              </h2>

              <p className="text-sm sm:text-base text-slate-300 font-normal leading-relaxed">
                Connect directly with our leadership team to discuss corporate finance, borrowing advisory, or statutory consultation.
              </p>

              {/* Value Indicators */}
              <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm text-slate-300">
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Response within 2 business hours</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Confidential dealing documentation</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Senior partner oversight on all mandates</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Zero obligation initial requirement review</span>
                </div>
              </div>
            </div>

            {/* Right Column: CTA Buttons & Quick Contact Box */}
            <div className="w-full lg:w-auto shrink-0 flex flex-col space-y-4">
              <Link
                href="/contact-us"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-primary hover:bg-primary/90 text-white font-semibold text-sm sm:text-base shadow-lg hover:shadow-primary/25 transition-all text-center flex items-center justify-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                <span>Contact Our Founders</span>
                <ArrowRight className="w-4 h-4" />
              </Link>

              <div className="p-4 rounded-xl bg-slate-800/60 border border-slate-700/80 space-y-2 text-xs text-slate-300">
                <div className="flex items-center space-x-2">
                  <Clock className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <span>Mon – Sat: 9:30 AM – 6:30 PM IST</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <a href="mailto:sales@unlistedzone.com" className="hover:text-white transition-colors">
                    sales@unlistedzone.com
                  </a>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                  <a href="tel:+918010009696" className="hover:text-white transition-colors tabular-nums">
                    +91 80100 09696
                  </a>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default TeamCTA;
