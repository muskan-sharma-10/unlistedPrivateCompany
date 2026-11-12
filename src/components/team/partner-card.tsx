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
  Camera
} from 'lucide-react';
import { FounderProfile } from '@/data/team';

interface FounderCardProps {
  founder: FounderProfile;
  index: number;
}

const GROUP_STYLES = {
  founder: {
    kickerColor: 'text-blue-700',
    badgeBg: 'bg-blue-950/85 text-blue-300 border-blue-400/30',
    statusBg: 'bg-blue-950/80 text-blue-200 border-blue-400/30',
    iconColor: 'text-blue-400',
    qualBg: 'bg-blue-50 text-blue-800 border-blue-200/70',
    hoverBorder: 'hover:border-blue-500/80',
  },
  partner: {
    kickerColor: 'text-indigo-700',
    badgeBg: 'bg-indigo-950/85 text-indigo-300 border-indigo-400/30',
    statusBg: 'bg-indigo-950/80 text-indigo-200 border-indigo-400/30',
    iconColor: 'text-indigo-400',
    qualBg: 'bg-indigo-50 text-indigo-800 border-indigo-200/70',
    hoverBorder: 'hover:border-indigo-500/80',
  },
  'co-founder': {
    kickerColor: 'text-emerald-700',
    badgeBg: 'bg-emerald-950/85 text-emerald-300 border-emerald-400/30',
    statusBg: 'bg-emerald-950/80 text-emerald-200 border-emerald-400/30',
    iconColor: 'text-emerald-400',
    qualBg: 'bg-emerald-50 text-emerald-800 border-emerald-200/70',
    hoverBorder: 'hover:border-emerald-500/80',
  },
};

export const FounderCard: React.FC<FounderCardProps> = ({
  founder,
  index,
}) => {
  const hasImage = Boolean(founder.imageUrl && founder.imageUrl.trim() !== '');
  const style = GROUP_STYLES[founder.group] || GROUP_STYLES.founder;

  return (
    <article
      className={`group bg-white rounded-2xl border border-slate-200 ${style.hoverBorder} shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col overflow-hidden h-full motion-reduce:transform-none motion-reduce:shadow-none`}
      aria-labelledby={`founder-heading-${founder.id}`}
    >
      {/* 1. Sleek Studio Header (Generous height so complete portrait is showcased) */}
      <div className="relative w-full h-80 sm:h-96 md:h-[400px] bg-[#0B132B] overflow-hidden shrink-0 border-b border-slate-200">
        {hasImage ? (
          <div className="relative w-full h-full flex items-center justify-center bg-[#070D1E]">
            {/* Ambient Blurred Backdrop so there are no empty borders */}
            <Image
              src={founder.imageUrl!}
              alt=""
              fill
              className="object-cover blur-2xl opacity-35 scale-110 pointer-events-none"
              aria-hidden="true"
            />
            {/* Complete, uncropped executive portrait */}
            <div className="relative w-full h-full flex items-center justify-center p-2 sm:p-3 z-10">
              <Image
                src={founder.imageUrl!}
                alt={`Executive portrait of ${founder.name}, ${founder.designation}`}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                className="object-contain object-center drop-shadow-2xl transition-transform duration-500 ease-out group-hover:scale-[1.02]"
                priority
              />
            </div>
            {/* Subtle bottom vignette to blend nicely into the card body */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent pointer-events-none z-10" />
          </div>
        ) : (
          /* Neutral Studio Placeholder with Monogram Insignia */
          <div className="relative w-full h-full flex flex-col items-center justify-center p-6 overflow-hidden select-none">
            {/* Subtle Brand Geometric Ripple Lines */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-15">
              <div className="w-48 h-48 sm:w-56 sm:h-56 rounded-full border border-blue-400" />
              <div className="absolute w-72 h-72 sm:w-80 sm:h-80 rounded-full border border-blue-400/60" />
            </div>

            {/* Ambient Lighting Accent */}
            <div className="absolute top-1/4 w-36 h-36 bg-blue-600/20 rounded-full blur-2xl pointer-events-none" />

            {/* Monogram Seal */}
            <div className="relative z-10 flex flex-col items-center text-center space-y-3">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-slate-800/90 border border-slate-700 flex items-center justify-center text-white shadow-md group-hover:border-blue-400/60 group-hover:scale-105 transition-all duration-300 motion-reduce:transform-none">
                <span className="font-mono font-bold text-2xl sm:text-3xl text-blue-300 tracking-wider">
                  {founder.initials}
                </span>
              </div>

              {/* Photo-Pending Status Badge */}
              <div className="inline-flex items-center space-x-1.5 px-3 py-1 rounded-md bg-slate-800/80 border border-slate-700/80 text-slate-300 text-[11px]">
                <Camera className={`w-3.5 h-3.5 ${style.iconColor} shrink-0`} />
                <span className="font-medium tracking-wide">
                  Official Photograph Pending
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Sequence Index Badge (Top Left - ALWAYS VISIBLE ON ALL CARDS) */}
        <div className="absolute top-3.5 left-4 z-20">
          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-md text-[11px] font-mono font-bold ${style.badgeBg} border backdrop-blur-md`}>
            <span>{founder.categoryLabel || founder.designation.toUpperCase()}</span>
            <span className="opacity-50">/</span>
            <span>{founder.founderNumber || `0${index + 1}`}</span>
          </span>
        </div>

        {/* Status Pill (Top Right - ALWAYS VISIBLE ON ALL CARDS) */}
        <div className="absolute top-3.5 right-4 z-20">
          <span className={`inline-flex items-center space-x-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold ${style.statusBg} border backdrop-blur-md`}>
            <ShieldCheck className={`w-3.5 h-3.5 ${style.iconColor} shrink-0`} />
            <span>{founder.statusLabel || founder.designation}</span>
          </span>
        </div>

        {/* Practice Role Badge Strip (Floating at bottom of header) */}
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
          <div className="space-y-1">
            <span className={`text-xs font-bold uppercase tracking-wider ${style.kickerColor} block`}>
              {founder.designation}
            </span>

            <h3
              id={`founder-heading-${founder.id}`}
              className="text-2xl sm:text-[25px] font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors"
            >
              {founder.name}
            </h3>

            <p className="text-xs sm:text-sm font-semibold text-slate-700">
              {founder.companyRole || `${founder.name} · ${founder.designation}, Unlisted Pond`}
            </p>
          </div>

          {/* Credentials Bar (Verified Qualifications) */}
          <div className="flex flex-wrap items-center gap-2 pt-1 border-t border-slate-100">
            {founder.qualifications.map((qual, qIdx) => (
              <span
                key={qIdx}
                className={`inline-flex items-center space-x-1.5 text-xs font-semibold px-2.5 py-1 rounded-md ${style.qualBg} border`}
              >
                <Award className="w-3.5 h-3.5 shrink-0" />
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
            <div className="pt-2.5 space-y-1.5 border-t border-slate-100">
              {founder.summaryHighlights.map((highlight, hIdx) => (
                <div key={hIdx} className="flex items-start space-x-2 text-xs sm:text-[13px] text-slate-700">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>
          )}

          {/* Areas of Expertise Chips */}
          <div className="pt-2.5">
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
                className="inline-flex items-center space-x-1.5 text-blue-700 hover:text-blue-900 font-mono text-xs font-medium transition-colors truncate max-w-[220px] sm:max-w-none"
                title={`Send direct email to ${founder.name}`}
              >
                <Mail className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span className="truncate">{founder.email}</span>
              </a>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
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
