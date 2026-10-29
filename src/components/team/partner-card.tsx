import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Award,
  CheckCircle2,
  Mail,
  ArrowRight,
  ShieldCheck,
  Briefcase,
  Camera,
  AlertCircle
} from 'lucide-react';
import { FounderProfile } from '@/data/team';

interface FounderCardProps {
  founder: FounderProfile;
  index: number;
}

export const FounderCard: React.FC<FounderCardProps> = ({
  founder,
  index,
}) => {
  const hasImage = Boolean(founder.imageUrl && founder.imageUrl.trim() !== '');

  return (
    <article
      className="group bg-white rounded-2xl border border-slate-200 hover:border-blue-500/80 shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full motion-reduce:transform-none motion-reduce:shadow-none"
      aria-labelledby={`founder-heading-${founder.id}`}
    >
      {/* 1. Large Portrait Area (Image-First with Refined Neutral Studio Fallback) */}
      <div className="relative w-full aspect-[4/3.8] sm:aspect-[4/3.5] bg-slate-900 overflow-hidden shrink-0 border-b border-slate-200">
        {hasImage ? (
          <div className="relative w-full h-full">
            <Image
              src={founder.imageUrl!}
              alt={`Executive portrait of ${founder.name}, ${founder.designation}`}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 450px"
              className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-105 motion-reduce:transform-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent pointer-events-none" />
          </div>
        ) : (
          /* Neutral Studio Placeholder with Monogram Insignia */
          <div className="relative w-full h-full min-h-[260px] bg-[#0B132B] flex flex-col items-center justify-center p-8 overflow-hidden select-none">
            {/* Subtle Brand Geometric Ripple Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
              <div className="w-52 h-52 rounded-full border border-blue-400" />
              <div className="absolute w-72 h-72 rounded-full border border-blue-400/60" />
            </div>

            {/* Ambient Lighting Accent */}
            <div className="absolute top-1/3 w-36 h-36 bg-blue-600/20 rounded-full blur-3xl pointer-events-none" />

            {/* Monogram Seal */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className="w-20 h-20 sm:w-22 sm:h-22 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-white shadow-md group-hover:border-blue-400/60 group-hover:scale-105 transition-all duration-300 motion-reduce:transform-none">
                <span className="font-mono font-bold text-2xl sm:text-3xl text-blue-300 tracking-wider">
                  {founder.initials}
                </span>
              </div>

              {/* Photo-Pending Status Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300 text-xs">
                <Camera className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="font-medium text-[11px] tracking-wide">
                  Official Photograph Pending
                </span>
              </div>
            </div>

            {/* Sequence Index Badge (Founder 01, 02, 03) */}
            <div className="absolute top-4 left-4 z-20">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold bg-slate-900/85 text-blue-300 border border-slate-700/80 backdrop-blur-md">
                <span>FOUNDER</span>
                <span className="text-slate-600">/</span>
                <span>{founder.founderNumber || `0${index + 1}`}</span>
              </span>
            </div>

            {/* Status Pill */}
            <div className="absolute top-4 right-4 z-20">
              <span className="inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-blue-950/80 text-blue-200 border border-blue-400/30 backdrop-blur-md">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span>Executive Founder</span>
              </span>
            </div>
          </div>
        )}

        {/* Practice Role Badge Strip */}
        <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
          <span className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white/95 text-slate-900 border border-slate-200 shadow-xs backdrop-blur-md">
            <Briefcase className="w-3.5 h-3.5 text-blue-700 shrink-0" />
            <span>{founder.roleBadge}</span>
          </span>
        </div>
      </div>

      {/* 2. Profile Details & Editorial Typography */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-5">
        <div className="space-y-4">
          {/* Header & Designation */}
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-700 block">
                {founder.designation}
              </span>
              {founder.isProvisional && (
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded bg-amber-50 text-amber-800 border border-amber-200/80">
                  <AlertCircle className="w-3 h-3 text-amber-600 shrink-0" />
                  <span>Provisional Focus</span>
                </span>
              )}
            </div>

            <h3
              id={`founder-heading-${founder.id}`}
              className="text-2xl sm:text-[26px] font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors"
            >
              {founder.name}
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              {founder.designation} · Founder, Unlisted Pond
            </p>
          </div>

          {/* Credentials Bar (Verified Qualifications) */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            {founder.qualifications.map((qual, qIdx) => (
              <span
                key={qIdx}
                className="inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-md bg-blue-50 text-blue-800 border border-blue-200/70"
              >
                <Award className="w-3.5 h-3.5 text-blue-700 shrink-0" />
                <span>{qual}</span>
              </span>
            ))}
          </div>

          {/* Professional Biography */}
          <p className="text-sm text-slate-600 font-normal leading-relaxed">
            {founder.bio}
          </p>

          {/* Key Deliverables & Summary Highlights */}
          {founder.summaryHighlights && founder.summaryHighlights.length > 0 && (
            <div className="pt-2 space-y-1.5 border-t border-slate-100">
              {founder.summaryHighlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start space-x-2 text-xs text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {/* Areas of Expertise Chips */}
          <div className="pt-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block mb-2">
              Core Practice Focus
            </span>
            <div className="flex flex-wrap gap-1.5">
              {founder.expertise.map((item, eIdx) => (
                <span
                  key={eIdx}
                  className="px-2.5 py-1 rounded-md bg-slate-50 hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-blue-800 border border-slate-200/80 hover:border-blue-200 transition-colors"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Direct Contact Email */}
          {founder.email && (
            <div className="pt-2.5 border-t border-slate-100 flex items-center justify-between gap-2 text-xs">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 shrink-0">
                Direct Contact
              </span>
              <a
                href={`mailto:${founder.email}?subject=Inquiry%20for%20${encodeURIComponent(
                  founder.name
                )}`}
                className="inline-flex items-center space-x-1.5 text-blue-700 hover:text-blue-900 font-mono text-xs font-medium transition-colors truncate max-w-[200px] sm:max-w-none"
                title={`Send direct email to ${founder.name}`}
              >
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{founder.email}</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-5 border-t border-slate-100 flex items-center justify-between gap-3">
          <Link
            href="/contact-us"
            className="inline-flex items-center space-x-1.5 text-xs sm:text-sm font-semibold text-blue-700 hover:text-blue-900 group-hover:translate-x-0.5 transition-all focus:outline-none focus:underline"
          >
            <span>Consult Dealing Desk</span>
            <ArrowRight className="w-4 h-4" />
          </Link>

          {founder.email ? (
            <a
              href={`mailto:${founder.email}?subject=Inquiry%20for%20${encodeURIComponent(
                founder.name
              )}`}
              aria-label={`Email ${founder.name}`}
              className="w-8 h-8 rounded-lg border border-slate-200 hover:border-blue-500 text-slate-500 hover:text-blue-600 flex items-center justify-center transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              title={`Send official inquiry to ${founder.name}`}
            >
              <Mail className="w-4 h-4" />
            </a>
          ) : null}
        </div>
      </div>
    </article>
  );
};

// Aliases for backward compatibility
export const PartnerCard = FounderCard;
export default FounderCard;
