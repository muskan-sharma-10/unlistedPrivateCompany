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
  MessageSquareShare
} from 'lucide-react';
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';
import EnquiryModal from '@/components/ui/enquiry-modal';

interface NavbarProps {
  onSelectStock?: (stock: StockItem) => void;
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectStock, onOpenEnquiry }) => {
  const pathname = usePathname();
  const router = useRouter();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StockItem[]>([]);
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Fallback internal enquiry modal when onOpenEnquiry is not provided
  const [internalEnquiryOpen, setInternalEnquiryOpen] = useState(false);

  // Sign In modal state
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [signInMobile, setSignInMobile] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpValue, setOtpValue] = useState('');

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
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#dce8e5] shadow-xs">
        <div className="max-w-[1520px] mx-auto px-4 sm:px-8 lg:px-12 py-3 sm:py-3.5 flex items-center justify-between gap-4">
          
          {/* Brand Logo & Name */}
          <Link href="/" className="flex items-center space-x-3 shrink-0 group">
            <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl bg-gradient-to-br from-[#082029] to-[#00a887] flex items-center justify-center text-white shadow-md shadow-[#00a887]/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-1.5 sm:space-x-2">
                <span className="font-bold text-lg sm:text-xl tracking-tight text-[#082029]">
                  PRIVATE MARKET
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase px-1.5 py-0.5 rounded bg-[#e6f7f3] text-[#00a887] tracking-wider">
                  UZ
                </span>
              </div>
              <p className="text-[11px] text-gray-500 font-medium tracking-wide hidden sm:block">
                Research · Indicative Prices · Pre-IPO
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1.5 text-[13px] xl:text-[14px] font-semibold text-[#334155]">
            <Link
              href="/shares"
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap relative ${
                isActive('/shares')
                  ? 'text-[#00a887] font-bold bg-[#e6f7f3]/60'
                  : 'hover:text-[#00a887] hover:bg-gray-50'
              }`}
            >
              All Shares
              {isActive('/shares') && (
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#00a887] rounded-full" />
              )}
            </Link>

            <Link
              href="/drhp-filed"
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap relative ${
                isActive('/drhp-filed')
                  ? 'text-[#00a887] font-bold bg-[#e6f7f3]/60'
                  : 'hover:text-[#00a887] hover:bg-gray-50'
              }`}
            >
              DRHP Filed
              {isActive('/drhp-filed') && (
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#00a887] rounded-full" />
              )}
            </Link>

            <Link
              href="/screener"
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap relative ${
                isActive('/screener')
                  ? 'text-[#00a887] font-bold bg-[#e6f7f3]/60'
                  : 'hover:text-[#00a887] hover:bg-gray-50'
              }`}
            >
              Screener
              {isActive('/screener') && (
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#00a887] rounded-full" />
              )}
            </Link>

            <Link
              href="/research"
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap relative ${
                isActive('/research')
                  ? 'text-[#00a887] font-bold bg-[#e6f7f3]/60'
                  : 'hover:text-[#00a887] hover:bg-gray-50'
              }`}
            >
              Research
              {isActive('/research') && (
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#00a887] rounded-full" />
              )}
            </Link>

            <Link
              href="/partners"
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap relative ${
                isActive('/partners')
                  ? 'text-[#00a887] font-bold bg-[#e6f7f3]/60'
                  : 'hover:text-[#00a887] hover:bg-gray-50'
              }`}
            >
              Partner With Us
              {isActive('/partners') && (
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#00a887] rounded-full" />
              )}
            </Link>

            {/* More Dropdown for Insights & About Us */}
            <div className="relative" ref={moreDropdownRef}>
              <button
                type="button"
                onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
                className={`flex items-center space-x-1 px-2.5 xl:px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap ${
                  isMoreActive
                    ? 'text-[#00a887] font-bold bg-[#e6f7f3]/60'
                    : 'hover:text-[#00a887] hover:bg-gray-50'
                }`}
              >
                <span>More</span>
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    moreDropdownOpen ? 'rotate-180 text-[#00a887]' : ''
                  }`}
                />
              </button>

              {moreDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-[#dce8e5] p-2 space-y-1 animate-in fade-in zoom-in-95 duration-150 z-50">
                  <Link
                    href="/blogs"
                    onClick={() => setMoreDropdownOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs sm:text-[13.5px] transition-colors ${
                      isActive('/blogs')
                        ? 'bg-[#e6f7f3] text-[#00a887] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <BookOpen className="w-4 h-4 text-[#00a887]" />
                    <span>Video Insights &amp; Blogs</span>
                  </Link>

                  <Link
                    href="/about-us"
                    onClick={() => setMoreDropdownOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs sm:text-[13.5px] transition-colors ${
                      isActive('/about-us')
                        ? 'bg-[#e6f7f3] text-[#00a887] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Info className="w-4 h-4 text-[#00a887]" />
                    <span>About Private Market</span>
                  </Link>

                  <Link
                    href="/contact-us"
                    onClick={() => setMoreDropdownOpen(false)}
                    className={`flex items-center space-x-2.5 px-3 py-2 rounded-xl text-xs sm:text-[13.5px] transition-colors ${
                      isActive('/contact-us')
                        ? 'bg-[#e6f7f3] text-[#00a887] font-semibold'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Phone className="w-4 h-4 text-[#00a887]" />
                    <span>Official Bank Details</span>
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/contact-us"
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl transition-colors whitespace-nowrap relative ${
                isActive('/contact-us')
                  ? 'text-[#00a887] font-bold bg-[#e6f7f3]/60'
                  : 'hover:text-[#00a887] hover:bg-gray-50'
              }`}
            >
              Contact Us
              {isActive('/contact-us') && (
                <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#00a887] rounded-full" />
              )}
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2.5 sm:space-x-3 shrink-0">
            {/* Search Trigger Button with ⌘K shortcut */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="h-10 px-3 rounded-xl border border-[#dce8e5] hover:border-[#00a887] flex items-center space-x-2 text-gray-500 hover:text-[#00a887] transition-colors bg-gray-50/50 group"
              aria-label="Search unlisted shares"
            >
              <Search className="w-4 h-4 group-hover:text-[#00a887]" />
              <span className="hidden xl:inline-block text-xs text-gray-400 font-normal">
                Search shares...
              </span>
              <kbd className="hidden sm:inline-block text-[10px] font-semibold px-1.5 py-0.5 rounded bg-gray-100 border border-gray-200 text-gray-500">
                ⌘K
              </kbd>
            </button>

            {/* Desktop Auth Button */}
            <button
              type="button"
              onClick={() => setIsSignInOpen(true)}
              className="hidden sm:inline-flex px-4 py-2 rounded-xl text-[13.5px] font-semibold text-[#082029] hover:text-[#00a887] border border-[#dce8e5] hover:border-[#00a887] transition-colors bg-white"
            >
              Sign in
            </button>

            {/* Open Account CTA - Guaranteed to work on all pages */}
            <button
              type="button"
              onClick={triggerEnquiry}
              className="hidden sm:inline-flex items-center space-x-2 px-5 py-2.5 rounded-xl text-[13.5px] font-semibold text-white bg-[#00a887] hover:bg-[#009476] shadow-md shadow-[#00a887]/20 transition-all duration-200 active:scale-95"
            >
              <span>Open an account</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6 text-[#082029]" /> : <Menu className="w-6 h-6 text-[#082029]" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex flex-col justify-start animate-in fade-in duration-200">
          <div className="bg-white border-b border-[#dce8e5] px-6 py-5 space-y-4 max-h-[92vh] overflow-y-auto shadow-2xl">
            
            {/* Mobile Drawer Top Header with Logo and Close 'X' */}
            <div className="flex items-center justify-between pb-3 border-b border-gray-100">
              <Link href="/" onClick={() => setMobileMenuOpen(false)} className="flex items-center space-x-2.5">
                <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-[#082029] to-[#00a887] flex items-center justify-center text-white">
                  <Shield className="w-5 h-5 text-white" />
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="font-bold text-base tracking-tight text-[#082029]">PRIVATE MARKET</span>
                  <span className="text-[10px] font-bold uppercase px-1.5 py-0.5 rounded bg-[#e6f7f3] text-[#00a887]">UZ</span>
                </div>
              </Link>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="p-1.5 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-[#082029]" />
              </button>
            </div>

            {/* Quick Search inside Mobile Menu */}
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
              className="w-full flex items-center justify-between p-3 rounded-2xl border border-[#dce8e5] bg-[#f8fafc] text-sm text-gray-500"
            >
              <div className="flex items-center space-x-2.5">
                <Search className="w-4 h-4 text-[#00a887]" />
                <span>Search shares, sectors, tickers...</span>
              </div>
              <kbd className="text-[10px] font-semibold px-2 py-0.5 rounded bg-white border border-gray-200 text-gray-400">
                Search
              </kbd>
            </button>

            {/* Navigation Links with Icons */}
            <div className="flex flex-col space-y-1">
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
                    className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-sm font-semibold transition-colors ${
                      active
                        ? 'bg-[#e6f7f3] text-[#00a887]'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Icon className={`w-4 h-4 ${active ? 'text-[#00a887]' : 'text-gray-400'}`} />
                      <span>{item.label}</span>
                    </div>
                    {active && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[#00a887]" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Mobile CTA Buttons */}
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  triggerEnquiry();
                }}
                className="w-full text-center py-3 rounded-xl bg-[#00a887] text-white text-sm font-semibold shadow-md shadow-[#00a887]/20 flex items-center justify-center space-x-2 active:scale-95 transition-transform"
              >
                <span>Open an account</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsSignInOpen(true);
                }}
                className="w-full text-center py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800 hover:bg-gray-50 transition-colors"
              >
                Sign in
              </button>
            </div>

            {/* Direct Support Contact Bar */}
            <div className="pt-2 flex items-center justify-between text-xs text-gray-500">
              <a
                href="tel:+919990865659"
                className="flex items-center space-x-1.5 text-gray-600 hover:text-[#00a887]"
              >
                <Phone className="w-3.5 h-3.5 text-[#00a887]" />
                <span>+91 99908 65659</span>
              </a>
              <a
                href="https://wa.me/919990865659"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1.5 text-[#00a887] font-semibold"
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
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4 animate-in fade-in duration-150"
          onClick={() => setIsSearchOpen(false)}
        >
          <div
            className="w-full max-w-xl bg-white rounded-3xl shadow-2xl border border-[#dce8e5] overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Search Input Bar */}
            <div className="p-4 sm:p-5 border-b border-[#dce8e5] flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 shrink-0" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                onKeyDown={handleSearchKeyDown}
                placeholder="Search unlisted shares by company, sector, ticker..."
                className="w-full text-sm sm:text-base text-[#082029] placeholder-gray-400 outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700 hover:bg-gray-100 transition-colors"
                aria-label="Close search"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Search Results / Suggestion Body */}
            <div className="max-h-[60vh] overflow-y-auto p-2">
              {searchQuery.trim() === '' ? (
                <div className="p-6 space-y-4">
                  <div className="text-xs uppercase font-bold tracking-wider text-gray-400">
                    Popular Unlisted Shares
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['MSEI', 'HPX', 'Onix Renewable', 'Zepto', 'Tata Capital', 'boAt', 'Sterlite Power'].map((item) => (
                      <button
                        key={item}
                        type="button"
                        onClick={() => handleSearch(item)}
                        className="px-3 py-1.5 rounded-xl bg-[#f3f8f7] hover:bg-[#e6f7f3] text-xs font-semibold text-[#082029] hover:text-[#00a887] border border-[#dce8e5] transition-colors"
                      >
                        {item}
                      </button>
                    ))}
                  </div>
                  <div className="text-xs text-gray-400 pt-2 border-t border-gray-100 flex items-center justify-between">
                    <span>Press <kbd className="px-1.5 py-0.5 rounded bg-gray-100 border text-gray-600 font-mono">Esc</kbd> to exit</span>
                    <span><strong className="text-[#00a887] font-semibold">{STOCKS_DATA.length}</strong> companies tracked</span>
                  </div>
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-8 text-center text-sm text-gray-500 space-y-2">
                  <p>No unlisted shares matching &quot;{searchQuery}&quot;</p>
                  <p className="text-xs text-gray-400">
                    Looking for a specific stock not in our list?{' '}
                    <button
                      type="button"
                      onClick={() => {
                        setIsSearchOpen(false);
                        triggerEnquiry();
                      }}
                      className="text-[#00a887] font-semibold underline"
                    >
                      Enquire with Dealing Desk
                    </button>
                  </p>
                </div>
              ) : (
                <div className="space-y-1">
                  {searchResults.map((stock, idx) => (
                    <div
                      key={stock.id}
                      onClick={() => handleStockClick(stock)}
                      className={`flex items-center justify-between p-3.5 rounded-2xl cursor-pointer transition-colors ${
                        selectedIndex === idx ? 'bg-[#e6f7f3]' : 'hover:bg-[#f3f8f7]'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#082029] to-[#00a887] text-white flex items-center justify-center font-bold text-xs">
                          {stock.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <div className="font-semibold text-sm text-[#082029] flex items-center space-x-1.5">
                            <span>{stock.name}</span>
                            {stock.ticker && (
                              <span className="text-[10px] font-mono px-1 rounded bg-gray-100 text-gray-500">
                                {stock.ticker}
                              </span>
                            )}
                          </div>
                          <div className="text-xs text-gray-400">
                            {stock.sector} · Lot: {stock.minLot || 100} shares
                          </div>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-sm text-[#082029]">
                          {stock.price > 0 ? `₹${stock.price.toLocaleString('en-IN')}` : 'DRHP Filed'}
                        </div>
                        <div className="text-[10px] uppercase font-bold text-[#00a887]">
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
          className="fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setIsSignInOpen(false)}
        >
          <div
            className="w-full max-w-md bg-white rounded-3xl shadow-2xl border border-[#dce8e5] overflow-hidden animate-in zoom-in-95 duration-150"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="bg-[#082029] p-6 text-white flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#2dd4bf] block mb-1">
                  Private Market Demat Access
                </span>
                <h3 className="text-lg font-bold text-white">Investor Sign In</h3>
              </div>
              <button
                type="button"
                onClick={() => setIsSignInOpen(false)}
                className="p-1.5 rounded-full text-slate-300 hover:text-white hover:bg-white/10"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Form */}
            <div className="p-6 space-y-5">
              {!otpSent ? (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (signInMobile.trim().length >= 10) setOtpSent(true);
                  }}
                  className="space-y-4"
                >
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Enter your registered 10-digit mobile number or Client ID to access order tracking and transaction history.
                  </p>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Mobile Number / Demat Client ID *
                    </label>
                    <input
                      type="text"
                      required
                      value={signInMobile}
                      onChange={(e) => setSignInMobile(e.target.value)}
                      placeholder="e.g. 9876543210"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold text-sm transition-all shadow-md shadow-[#00a887]/20"
                  >
                    Send One-Time Password (OTP)
                  </button>
                </form>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    alert(`Welcome back! Demat portfolio authenticated for ${signInMobile}.`);
                    setIsSignInOpen(false);
                    setOtpSent(false);
                  }}
                  className="space-y-4"
                >
                  <div className="p-3 rounded-xl bg-[#e6f7f3] text-[#00a887] text-xs font-medium flex items-center space-x-2">
                    <CheckCircle2 className="w-4 h-4 shrink-0" />
                    <span>OTP sent to +91 {signInMobile}. (Test demo OTP: 1234)</span>
                  </div>
                  <div>
                    <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                      Enter 4-Digit OTP *
                    </label>
                    <input
                      type="text"
                      maxLength={4}
                      required
                      value={otpValue}
                      onChange={(e) => setOtpValue(e.target.value)}
                      placeholder="1234"
                      className="w-full px-4 py-2.5 rounded-xl border border-gray-300 text-sm text-center font-mono tracking-widest text-lg focus:border-[#00a887] focus:ring-1 focus:ring-[#00a887] outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white font-semibold text-sm transition-all shadow-md shadow-[#00a887]/20"
                  >
                    Verify &amp; Access Portfolio
                  </button>
                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                    className="w-full text-center text-xs text-gray-500 hover:text-gray-800"
                  >
                    Change Mobile Number
                  </button>
                </form>
              )}

              <div className="pt-3 border-t border-gray-100 text-center text-xs text-gray-500 space-y-1">
                <p>New to unlisted equities?</p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSignInOpen(false);
                    triggerEnquiry();
                  }}
                  className="text-[#00a887] font-semibold hover:underline"
                >
                  Open an account with our Dealing Desk →
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
