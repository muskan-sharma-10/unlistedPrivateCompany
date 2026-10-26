import React from 'react';
import Link from 'next/link';

interface BrandLogoProps {
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showSubtitle?: boolean;
  subtitleText?: string;
  showBadge?: boolean;
  badgeText?: string;
  className?: string;
  href?: string;
  onClick?: () => void;
}

export const LogoIcon: React.FC<{ size?: number; className?: string }> = ({
  size = 40,
  className = '',
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 44"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 transition-transform duration-200 group-hover:scale-105 ${className}`}
      aria-hidden="true"
    >
      <defs>
        {/* Main Background Gradient */}
        <linearGradient id="upBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1E40AF" />
          <stop offset="60%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>

        {/* Glow & Ripple Accent */}
        <linearGradient id="upGlowGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.4" />
        </linearGradient>

        {/* Cyan ripple wave */}
        <linearGradient id="upWaveGrad" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#38BDF8" stopOpacity="0.4" />
          <stop offset="50%" stopColor="#67E8F9" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#38BDF8" stopOpacity="0.4" />
        </linearGradient>

        {/* Drop shadow */}
        <filter id="upShadow" x="-10%" y="-10%" width="130%" height="130%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#0F172A" floodOpacity="0.25" />
        </filter>
      </defs>

      {/* Rounded Container */}
      <rect
        x="1.5"
        y="1.5"
        width="41"
        height="41"
        rx="10"
        fill="url(#upBgGrad)"
        stroke="rgba(255,255,255,0.18)"
        strokeWidth="1.2"
        filter="url(#upShadow)"
      />

      {/* Outer Pond Ripple Arc */}
      <path
        d="M9 30.5C13 33.5 31 33.5 35 30.5"
        stroke="url(#upWaveGrad)"
        strokeWidth="2"
        strokeLinecap="round"
      />

      {/* Mid Pond Ripple Arc */}
      <path
        d="M12.5 26C15.5 28.5 28.5 28.5 31.5 26"
        stroke="rgba(255,255,255,0.5)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Stylized Modern "UP" Ripple & Upward Beacon */}
      {/* Dynamic Liquid Growth Shape */}
      <path
        d="M22 8.5C21.4 9.5 16 17 16 21C16 24.3137 18.6863 27 22 27C25.3137 27 28 24.3137 28 21C28 17 22.6 9.5 22 8.5Z"
        fill="url(#upGlowGrad)"
      />

      {/* Inner Upward Arrow / Financial Momentum Core */}
      <path
        d="M22 13L25.2 18H23.2V22.5H20.8V18H18.8L22 13Z"
        fill="#1E40AF"
      />

      {/* Subtle Pond Droplet Ripple Accent */}
      <circle cx="22" cy="7.5" r="1.5" fill="#E0F2FE" />
    </svg>
  );
};

export const BrandLogo: React.FC<BrandLogoProps> = ({
  variant = 'light',
  size = 'md',
  showSubtitle = true,
  subtitleText,
  showBadge = true,
  badgeText = 'UP',
  className = '',
  href = '/',
  onClick,
}) => {
  const isDark = variant === 'dark';

  const iconSizes = {
    sm: 34,
    md: 40,
    lg: 48,
  };

  const titleSizes = {
    sm: 'text-base',
    md: 'text-lg sm:text-xl',
    lg: 'text-xl sm:text-2xl',
  };

  const content = (
    <div className={`flex items-center space-x-3 shrink-0 group ${className}`} onClick={onClick}>
      <LogoIcon size={iconSizes[size]} />
      <div>
        <div className="flex items-center space-x-1.5 sm:space-x-2">
          <span
            className={`font-black tracking-tight ${titleSizes[size]} ${
              isDark ? 'text-white' : 'text-slate-900'
            }`}
          >
            UNLISTED
          </span>
          <span
            className={`font-black tracking-tight ${titleSizes[size]} ${
              isDark ? 'text-blue-400' : 'text-primary'
            }`}
          >
            POND
          </span>
          {showBadge && (
            <span
              className={`text-[10px] font-bold uppercase px-1.5 py-0.5 rounded tracking-wider ${
                isDark
                  ? 'bg-blue-500/20 text-blue-300 border border-blue-400/30'
                  : 'bg-blue-50 text-primary border border-blue-200/70'
              }`}
            >
              {badgeText}
            </span>
          )}
        </div>
        {showSubtitle && (
          <p
            className={`text-[11px] font-medium tracking-wide ${
              isDark
                ? 'text-slate-400 mt-0.5 text-xs sm:text-sm'
                : 'text-muted-foreground hidden sm:block'
            }`}
          >
            {subtitleText ||
              (isDark
                ? "India's Trusted Unlisted Shares & Pre-IPO Platform · Since 2018"
                : 'Research · Indicative Prices · Pre-IPO Equities')}
          </p>
        )}
      </div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="inline-flex">
        {content}
      </Link>
    );
  }

  return content;
};

export default BrandLogo;
