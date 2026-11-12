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
        {/* Background Gradient: Deep Midnight Royal to High-Trust Cobalt */}
        <linearGradient id="upBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#081426" />
          <stop offset="50%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>

        {/* Cyan Gradient for Pre-IPO Growth & Momentum */}
        <linearGradient id="upCyanGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#0284C7" />
          <stop offset="50%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>

        {/* Container Shadow */}
        <filter id="upShadow" x="-10%" y="-10%" width="125%" height="125%" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#020817" floodOpacity="0.3" />
        </filter>
      </defs>

      {/* Container Squircle */}
      <rect
        x="1.5"
        y="1.5"
        width="41"
        height="41"
        rx="10.5"
        fill="url(#upBgGrad)"
        stroke="rgba(255, 255, 255, 0.22)"
        strokeWidth="1.2"
        filter="url(#upShadow)"
      />

      {/* Subtle Pond Ripple Arc at Bottom (Depth & Liquidity) */}
      <path
        d="M10.5 33.5C14.5 36 29.5 36 33.5 33.5"
        stroke="#38BDF8"
        strokeOpacity="0.45"
        strokeWidth="1.6"
        strokeLinecap="round"
      />

      {/* Left 'U' Column & Smooth Basin (The Foundation Pond) */}
      <path
        d="M11 15V24C11 28.5 14.5 31 19.5 31C20.4 31 21.2 30.8 22 30.5V26.5C21.3 26.8 20.6 27 19.5 27C16.8 27 15 25.2 15 23.5V15H11Z"
        fill="#FFFFFF"
      />

      {/* Center-Right Upward Arrow & 'P' Loop (UP & Capital Ascent) */}
      <path
        d="M22 14.5L25.5 14.5L22 9.5L18.5 14.5L22 14.5V30H26V25H27C29.8 25 32 23 32 20C32 17 29.8 15 27 15H22V14.5ZM26 18.5H27C27.8 18.5 28.5 19.1 28.5 20C28.5 20.9 27.8 21.5 27 21.5H26V18.5Z"
        fill="url(#upCyanGrad)"
      />
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
  const shouldShowSubtitle = showSubtitle;

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
        {shouldShowSubtitle && (
          <p
            className={`font-medium tracking-tight mt-0.5 leading-none ${
              isDark
                ? 'text-slate-400 text-xs sm:text-sm'
                : 'text-[9.5px] text-slate-500 whitespace-nowrap'
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
