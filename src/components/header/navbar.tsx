'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Search,
  X,
  Menu,
  Shield,
  ArrowRight,
  ChevronDown,
  Phone,
  FileText,
  SlidersHorizontal,
  FileCheck2,
  BookOpen,
  Users,
  Info,
  CheckCircle2,
  Lock,
  MessageSquareShare,
  LogOut,
  UserCheck,
  Eye,
  EyeOff,
  AlertTriangle,
  Loader2
} from 'lucide-react';
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';
import EnquiryModal from '@/components/ui/enquiry-modal';
import { useAuth } from '@/lib/supabase/auth-context';

interface NavbarProps {
  onSelectStock?: (stock: StockItem) => void;
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectStock, onOpenEnquiry }) => {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signIn, signUp, signOut } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StockItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback internal enquiry modal when onOpenEnquiry is not provided
  const [internalEnquiryOpen, setInternalEnquiryOpen] = useState(false);

  // Supabase Investor Sign In / Registration modal state
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'signin' | 'signup'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authFullName, setAuthFullName] = useState('');
  const [authShowPassword, setAuthShowPassword] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);
  const [authSuccess, setAuthSuccess] = useState<string | null>(null);
  const [isAuthSubmitting, setIsAuthSubmitting] = useState(false);

  // Dropdown states
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const moreDropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Active route detector
  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname === href || pathname.startsWith(href + '/');
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (moreDropdownRef.current && !moreDropdownRef.current.contains(e.target as Node)) {
        setMoreDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  // Global Keyboard Shortcuts (Escape to close modals, Cmd+K / Ctrl+K to search)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setMobileMenuOpen(false);
        setMoreDropdownOpen(false);
        setIsSignInOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Focus input on search open
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Lock body scroll when mobile menu or modal is open
  useEffect(() => {
    if (mobileMenuOpen || isSearchOpen || isSignInOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen, isSearchOpen, isSignInOpen]);

  // Automatically close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
  }, [pathname]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setSelectedIndex(0);
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }
    const q = query.toLowerCase();
    const filtered = STOCKS_DATA.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.sector.toLowerCase().includes(q) ||
        (s.ticker && s.ticker.toLowerCase().includes(q))
    ).slice(0, 8);
    setSearchResults(filtered);
  };

  const handleStockClick = (stock: StockItem) => {
    setIsSearchOpen(false);
    setSearchQuery('');
    setSearchResults([]);
    if (onSelectStock) {
      onSelectStock(stock);
    } else {
      router.push(`/shares/${stock.id}`);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < searchResults.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
    } else if (e.key === 'Enter' && searchResults.length > 0) {
      e.preventDefault();
      handleStockClick(searchResults[selectedIndex]);
    }
  };

  const triggerEnquiry = () => {
    if (onOpenEnquiry) {
      onOpenEnquiry();
    } else {
      setInternalEnquiryOpen(true);
    }
  };

  const isMoreActive =
    isActive('/partners') || isActive('/blogs') || isActive('/about-us');

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-border shadow-xs">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 py-2.5 sm:py-3 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="w-10 h-10 rounded-lg bg-primary text-white flex items-center justify-center shadow-xs group-hover:bg-primary-dark transition-colors">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900">
                  PRIVATE MARKET
                </span>
                <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-primary border border-blue-200/60 tracking-wider">
                  UZ
                </span>
              </div>
              <p className="text-[11px] text-muted-foreground font-medium tracking-wide hidden sm:block">
                Research · Indicative Prices · Pre-IPO Equities
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1 xl:space-x-1.5 text-[13px] xl:text-[14px] font-medium text-slate-600">
            <Link
              href="/shares"
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap relative ${
                isActive('/shares')
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              All Shares
              {isActive('/shares') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </Link>

            <Link
              href="/drhp-filed"
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap relative ${
                isActive('/drhp-filed')
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              DRHP Filed
              {isActive('/drhp-filed') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </Link>

            <Link
              href="/screener"
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap relative ${
                isActive('/screener')
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Screener
              {isActive('/screener') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </Link>

            <Link
              href="/research"
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap relative ${
                isActive('/research')
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Research
              {isActive('/research') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </Link>

            <Link
              href="/partners"
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap relative ${
                isActive('/partners')
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Partner With Us
              {isActive('/partners') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </Link>

            {/* More Dropdown for Insights & About Us */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1 px-3 py-1.5 rounded-md transition-colors whitespace-nowrap ${
                  isMoreActive
                    ? 'text-primary font-semibold bg-primary/10'
                    : 'hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180 text-primary' : ''
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-border p-1.5 space-y-0.5 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <Link
                    href="/blogs"
                    onClick={() => setMoreDropdownOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs sm:text-[13px] transition-colors ${
                      isActive('/blogs')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-primary" />
                    <span>Video Insights &amp; Blogs</span>
                  </Link>

                  <Link
                    href="/about-us"
                    onClick={() => setMoreDropdownOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs sm:text-[13px] transition-colors ${
                      isActive('/about-us')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Info className="w-4 h-4 text-primary" />
                    <span>About Private Market</span>
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={() => setMoreDropdownOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-md text-xs sm:text-[13px] transition-colors ${
                      isActive('/contact-us')
                        ? 'bg-primary/10 text-primary font-medium'
                        : 'text-slate-700 hover:bg-slate-50 hover:text-slate-900'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-primary" />
                    <span>Official Bank Details</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              className={`px-3 py-1.5 rounded-md transition-colors whitespace-nowrap relative ${
                isActive('/contact-us')
                  ? 'text-primary font-semibold bg-primary/10'
                  : 'hover:text-slate-900 hover:bg-slate-100/70'
              }`}
            >
              Contact Us
              {isActive('/contact-us') && (
                <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-primary rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-2.5 shrink-0">
            {/* Search Trigger Button with ⌘K shortcut */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="h-9 px-3 rounded-md border border-border hover:border-slate-300 flex items-center space-x-2 text-muted-foreground hover:text-slate-800 transition-colors bg-slate-50/70 group"
              aria-label="Search unlisted shares"
            >
              <Search className="w-4 h-4 text-slate-400 group-hover:text-primary transition-colors" />
              <span className="hidden xl:inline-block text-xs text-muted-foreground">
                Search shares...
              </span>
              <kbd className="hidden sm:inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white border border-border text-slate-500 shadow-2xs">
                ⌘K
              </kbd>
            </button>

            {/* Desktop Auth Controls */}
            {user ? (
              <div className="hidden sm:inline-flex items-center space-x-1.5">
                <Link
                  href="/portfolio"
                  className="inline-flex items-center space-x-1.5 h-9 px-3 rounded-md text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 hover:bg-blue-100 transition-colors shadow-2xs"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>My Portfolio</span>
                </Link>
                <button
                  type="button"
                  onClick={() => signOut()}
                  className="h-9 px-2.5 rounded-md text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 border border-border transition-colors bg-white shadow-2xs"
                  title="Sign Out"
                >
                  <LogOut className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setAuthError(null);
                  setAuthSuccess(null);
                  setIsSignInOpen(true);
                }}
                className="hidden sm:inline-flex items-center h-9 px-3.5 rounded-md text-xs sm:text-[13px] font-medium text-slate-700 hover:text-primary border border-border hover:border-slate-300 hover:bg-slate-50 transition-colors bg-white shadow-2xs"
              >
                Sign in
              </button>
            )}

            {/* Open Account CTA */}
            <button
              type="button"
              onClick={triggerEnquiry}
              className="hidden sm:inline-flex items-center space-x-1.5 h-9 px-4 rounded-md text-xs sm:text-[13px] font-medium text-white bg-primary hover:bg-primary/90 shadow-xs transition-all active:scale-[0.99]"
            >
              <span>Open an account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-md text-slate-700 hover:bg-slate-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5 text-slate-900" /> : <Menu className="w-5 h-5 text-slate-900" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex flex-col justify-start animate-in fade-in duration-150">
          <div className="bg-white border-b border-border px-5 py-4 space-y-4 max-h-[92vh] overflow-y-auto shadow-xl">
            
            {/* Mobile Drawer Top Header with Logo and Close 'X' */}
            <div className="flex items-center justify-between pb-3 border-b border-border">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-lg bg-primary text-white flex items-center justify-center">
                  <Shield className="w-4 h-4 text-white" />
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-base tracking-tight text-slate-900">PRIVATE MARKET</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-blue-50 text-primary border border-blue-200">UZ</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-md text-slate-500 hover:bg-slate-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-slate-900" />
              </button>
            </div>

            {/* Quick Search inside Mobile Menu */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between p-2.5 rounded-lg border border-border bg-slate-50 text-xs sm:text-sm text-muted-foreground hover:border-slate-300"
            >
              <div className="flex items-center space-x-2">
                <Search className="w-4 h-4 text-primary" />
                <span>Search shares, sectors, tickers...</span>
              </div>
              <kbd className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-white border border-border text-slate-500">
                Search
              </kbd>
            </button>

            {/* Navigation Links with Icons */}
            <div className="flex flex-col space-y-0.5">
              {[
                { href: '/shares', label: 'All Unlisted Shares', icon: FileCheck2 },
                { href: '/drhp-filed', label: 'DRHP Filed Companies', icon: FileText },
                { href: '/screener', label: 'Sector Screener', icon: SlidersHorizontal },
                { href: '/research', label: 'Research Reports', icon: BookOpen },
                { href: '/partners', label: 'Partner With Us', icon: Users },
                { href: '/blogs', label: 'Video Insights & Blogs', icon: MessageSquareShare },
                { href: '/about-us', label: 'About Private Market', icon: Info },
                { href: '/contact-us', label: 'Contact Us & Bank Details', icon: Phone },
              ].map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center justify-between px-3 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors ${
                      active
                        ? 'bg-primary/10 text-primary font-semibold'
                        : 'text-slate-700 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${active ? 'text-primary' : 'text-slate-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-3 border-t border-border flex flex-col gap-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerEnquiry();
                }}
                className="w-full text-center py-2.5 rounded-md bg-primary hover:bg-primary/90 text-white text-xs sm:text-sm font-medium shadow-xs flex items-center justify-center space-x-2 active:scale-98 transition-transform"
              >
                <span>Open an account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {user ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/portfolio"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full text-center py-2.5 rounded-md bg-blue-50 border border-blue-200 text-xs sm:text-sm font-semibold text-blue-700 flex items-center justify-center space-x-2"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>My Portfolio ({user.email})</span>
                  </Link>
                  <button
                    type="button"
                    onClick={() => {
                      setMobileMenuOpen(false);
                      signOut();
                    }}
                    className="w-full text-center py-2.5 rounded-md border border-border text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors flex items-center justify-center space-x-1.5"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign out</span>
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setAuthError(null);
                    setAuthSuccess(null);
                    setIsSignInOpen(true);
                  }}
                  className="w-full text-center py-2.5 rounded-md border border-border text-xs sm:text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
                >
                  Sign in
                </button>
              )}
            </div>

            {/* Direct Support Contact Bar */}
            <div className="pt-2 flex items-center justify-between text-xs text-muted-foreground">
              <a
                href="tel:+919990865659"
                className="flex items-center space-x-1.5 text-slate-600 hover:text-primary"
              >
                <Phone className="w-3.5 h-3.5 text-primary" />
                <span>+91 99908 65659</span>
              </a>
              <a
                href="https://wa.me/919990865659"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-primary font-medium"
              >
                <span>WhatsApp Desk →</span>
              </a>
            </div>
          </div>

          {/* Click backdrop to close */}
          <div className="flex-1" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* Global Interactive Search Modal */}
      {isSearchOpen && (
        <div
          className="fixed inset-0 z-[100] bg-slate-950/60 backdrop-blur-xs flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-xl shadow-xl border border-border overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-3.5 sm:p-4 border-b border-border flex items-center gap-3">
              <Search className="w-5 h-5 text-muted-foreground shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search unlisted shares by company, sector, ticker..."
                className="w-full text-sm sm:text-base text-slate-900 placeholder:text-muted-foreground outline-none bg-transparent"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="p-1 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Close search"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Results / Suggestion Body */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchQuery.trim() === '' ? (
                <div className="p-5 space-y-4">
                  <div className="text-[11px] uppercase font-semibold tracking-wider text-muted-foreground">
                    Popular Unlisted Shares
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {['MSEI', 'HPX', 'Onix Renewable', 'Zepto', 'Tata Capital', 'boAt', 'Sterlite Power'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSearch(item)}
                        className="px-2.5 py-1 rounded-md bg-slate-100 hover:bg-blue-50 text-xs font-medium text-slate-700 hover:text-primary border border-slate-200/80 transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-muted-foreground pt-2.5 border-t border-border flex items-center justify-between">
                    <span>Press <kbd className="px-1.5 py-0.5 rounded bg-slate-100 border border-border text-slate-600 font-mono text-[10px]">Esc</kbd> to exit</span>
                    <span><strong className="text-primary font-medium">{STOCKS_DATA.length}</strong> companies tracked</span>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center text-sm text-muted-foreground space-y-2">
                  <p>No unlisted shares matching &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-muted-foreground">
                    Looking for a specific stock not in our list?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        triggerEnquiry();
                      }}
                      className="text-primary font-semibold underline underline-offset-2"
                    >
                      Enquire with Dealing Desk
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-0.5">
                  {searchResults.map((stock, idx) => (
                    <div
                      key={stock.id}
                      onClick={() => handleStockClick(stock)}
                      className={`flex items-center justify-between p-3 rounded-lg cursor-pointer transition-colors ${
                        selectedIndex === idx ? 'bg-primary/10 text-primary border-l-2 border-primary' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-9 h-9 rounded-md bg-slate-100 border border-border text-slate-700 flex items-center justify-center font-bold text-xs">
                          {stock.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-xs sm:text-sm text-slate-900 flex items-center space-x-1.5">
                            <span>{stock.name}</span>
                            {stock.ticker && (
                              <span className="text-[10px] font-mono px-1 rounded bg-slate-100 text-muted-foreground">
                                {stock.ticker}
                              </span>
                            )}
                          </div>
                          <div className="text-[11px] text-muted-foreground">
                            {stock.sector} · Lot: {stock.minLot || 100} shares
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-semibold text-xs sm:text-sm text-slate-900 tabular-nums">
                          {stock.price > 0 ? `₹${stock.price.toLocaleString('en-IN')}` : 'DRHP Filed'}
                        </div>
                        <div className="text-[10px] uppercase font-semibold text-primary">
                          Indicative Price →
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Sign In / Investor Portal Modal */}
      {isSignInOpen && (
        <div
          className="fixed inset-0 z-[110] bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsSignInOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-xl shadow-xl border border-border overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 block mb-0.5">
                  Private Market Demat Access
                </span>
                <h3 className="text-base font-bold text-white">
                  {authMode === 'signin' ? 'Investor Sign In' : 'Register Investor Account'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSignInOpen(false)}
                className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Auth Mode Switcher */}
            <div className="grid grid-cols-2 p-1 bg-slate-100 border-b border-border text-xs">
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signin');
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  authMode === 'signin'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  setAuthMode('signup');
                  setAuthError(null);
                  setAuthSuccess(null);
                }}
                className={`py-1.5 rounded-md font-semibold transition-all ${
                  authMode === 'signup'
                    ? 'bg-white text-primary shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Register (New Demat)
              </button>
            </div>

            {/* Form */}
            <div className="p-5 space-y-4">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  setAuthError(null);
                  setAuthSuccess(null);

                  if (!authEmail || !authEmail.includes('@')) {
                    setAuthError('Please enter a valid email address.');
                    return;
                  }

                  if (!authPassword || authPassword.length < 6) {
                    setAuthError('Password must be at least 6 characters long.');
                    return;
                  }

                  if (authMode === 'signup' && !authFullName.trim()) {
                    setAuthError('Please enter your full name.');
                    return;
                  }

                  setIsAuthSubmitting(true);

                  try {
                    if (authMode === 'signin') {
                      const result = await signIn(authEmail, authPassword);
                      if (!result.success) {
                        setAuthError(result.error || 'Authentication failed. Please verify your credentials.');
                        setIsAuthSubmitting(false);
                        return;
                      }
                      setAuthSuccess('Authenticated! Accessing portfolio...');
                      setTimeout(() => {
                        setIsSignInOpen(false);
                        setIsAuthSubmitting(false);
                        router.push('/portfolio');
                      }, 800);
                    } else {
                      const result = await signUp(authEmail, authPassword, authFullName);
                      if (!result.success) {
                        setAuthError(result.error || 'Registration failed. Please try again.');
                        setIsAuthSubmitting(false);
                        return;
                      }
                      setAuthSuccess(result.message || 'Registration successful! Accessing portfolio...');
                      setTimeout(() => {
                        setIsSignInOpen(false);
                        setIsAuthSubmitting(false);
                        router.push('/portfolio');
                      }, 1000);
                    }
                  } catch (err: any) {
                    setAuthError('An unexpected authentication error occurred.');
                    setIsAuthSubmitting(false);
                  }
                }}
                className="space-y-3.5"
              >
                {authMode === 'signup' && (
                  <div>
                    <label className="text-xs font-medium text-slate-700 block mb-1">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={authFullName}
                      onChange={(e) => setAuthFullName(e.target.value)}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full px-3 py-2 rounded-md border border-input text-xs sm:text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                  </div>
                )}

                <div>
                  <label className="text-xs font-medium text-slate-700 block mb-1">
                    Registered Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={authEmail}
                    onChange={(e) => setAuthEmail(e.target.value)}
                    placeholder="investor@example.com"
                    className="w-full px-3 py-2 rounded-md border border-input text-xs sm:text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="text-xs font-medium text-slate-700">
                      Password *
                    </label>
                    <span className="text-[10px] text-muted-foreground">Min 6 chars</span>
                  </div>
                  <div className="relative">
                    <input
                      type={authShowPassword ? 'text' : 'password'}
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-3 pr-9 py-2 rounded-md border border-input text-xs sm:text-sm focus:border-primary focus:ring-1 focus:ring-primary outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => setAuthShowPassword(!authShowPassword)}
                      className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {authShowPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {authError && (
                  <div className="p-2.5 rounded-md bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start space-x-1.5">
                    <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                    <span>{authError}</span>
                  </div>
                )}

                {authSuccess && (
                  <div className="p-2.5 rounded-md bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start space-x-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{authSuccess}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isAuthSubmitting}
                  className="w-full py-2.5 rounded-md bg-primary hover:bg-primary/90 text-white font-medium text-xs sm:text-sm transition-all shadow-xs flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {isAuthSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>{authMode === 'signin' ? 'Authenticating...' : 'Registering...'}</span>
                    </>
                  ) : (
                    <span>{authMode === 'signin' ? 'Sign In to Demat Access →' : 'Complete Registration →'}</span>
                  )}
                </button>
              </form>

              <div className="pt-2 border-t border-border flex items-center justify-between text-xs text-muted-foreground">
                <Link
                  href="/login"
                  onClick={() => setIsSignInOpen(false)}
                  className="hover:text-primary transition-colors"
                >
                  Full Login Page ↗
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignInOpen(false);
                    triggerEnquiry();
                  }}
                  className="text-primary font-medium hover:underline"
                >
                  Dealing Desk Inquiry →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Built-in fallback Enquiry Modal (ensures "Open an account" works everywhere) */}
      <EnquiryModal
        isOpen={internalEnquiryOpen}
        onClose={() => setInternalEnquiryOpen(false)}
      />
    </>
  );
};

export default Navbar;
