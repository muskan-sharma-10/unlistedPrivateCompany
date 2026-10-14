'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Search, X, Menu, Shield, ArrowRight } from 'lucide-react';
import { STOCKS_DATA, StockItem } from '@/data/unlisted-data';

interface NavbarProps {
  onSelectStock?: (stock: StockItem) => void;
  onOpenEnquiry?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onSelectStock, onOpenEnquiry }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<StockItem[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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

  return (
    <>
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#dce8e5] shadow-xs">
        <div className="max-w-[1520px] mx-auto px-6 sm:px-10 lg:px-14 py-3.5 sm:py-4 flex items-center justify-between gap-6">
          {/* Brand Logo & Name (PRIVATE MARKET preserved) */}
          <Link href="/" className="flex items-center space-x-3.5 shrink-0 group">
            <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-2xl bg-gradient-to-br from-[#082029] to-[#00a887] flex items-center justify-center text-white shadow-md shadow-[#00a887]/20 group-hover:scale-105 transition-transform duration-200">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-semibold text-xl sm:text-2xl tracking-tight text-[#082029]">
                  PRIVATE MARKET
                </span>
                <span className="text-xs font-semibold uppercase px-2 py-0.5 rounded-md bg-[#e6f7f3] text-[#00a887] tracking-wider">
                  UZ
                </span>
              </div>
              <p className="text-xs text-gray-500 font-medium tracking-wide">
                Research · Indicative Prices · Pre-IPO
              </p>
            </div>
          </Link>

          {/* Desktop Navigation Links (UnlistedZone content) */}
          <nav className="hidden lg:flex items-center space-x-7 text-[15px] font-semibold text-[#334155]">
            <Link
              href="/shares"
              className="hover:text-[#00a887] py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00a887] after:transition-all"
            >
              All Unlisted Shares
            </Link>
            <Link
              href="/drhp-filed"
              className="hover:text-[#00a887] py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00a887] after:transition-all"
            >
              DRHP Filed
            </Link>
            <Link
              href="/partners"
              className="hover:text-[#00a887] py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00a887] after:transition-all"
            >
              Become Our Partner
            </Link>
            <Link
              href="/screener"
              className="hover:text-[#00a887] py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00a887] after:transition-all"
            >
              Screener
            </Link>
            <Link
              href="/contact-us"
              className="hover:text-[#00a887] py-1 transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 hover:after:w-full after:h-[2px] after:bg-[#00a887] after:transition-all"
            >
              Contact Us
            </Link>
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-3.5 shrink-0">
            {/* Search Trigger Icon */}
            <button
              type="button"
              onClick={() => setIsSearchOpen(true)}
              className="w-10 h-10 rounded-xl border border-[#dce8e5] hover:border-[#00a887] flex items-center justify-center text-gray-500 hover:text-[#00a887] transition-colors"
              aria-label="Search unlisted shares"
            >
              <Search className="w-4 h-4" />
            </button>

            {/* Desktop Auth Buttons with Brand Colors */}
            <Link
              href="/contact-us"
              className="hidden sm:inline-flex px-5 py-2.5 rounded-2xl text-[14px] font-semibold text-[#082029] hover:text-[#00a887] border border-[#dce8e5] hover:border-[#00a887] transition-colors"
            >
              Sign in
            </Link>
            <button
              type="button"
              onClick={onOpenEnquiry}
              className="hidden sm:inline-flex items-center space-x-2 px-6 py-2.5 rounded-2xl text-[14px] font-semibold text-white bg-[#00a887] hover:bg-[#009476] shadow-lg shadow-[#00a887]/20 transition-all duration-200"
            >
              <span>Open an account</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-gray-700 hover:bg-gray-100"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-[#dce8e5] px-6 py-5 space-y-4 animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col space-y-3 font-semibold text-gray-700 text-base">
              <Link href="/shares" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#00a887]">
                All Unlisted Shares
              </Link>
              <Link href="/drhp-filed" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#00a887]">
                DRHP Filed
              </Link>
              <Link href="/partners" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#00a887]">
                Become Our Partner
              </Link>
              <Link href="/screener" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#00a887]">
                Screener
              </Link>
              <Link href="/contact-us" onClick={() => setMobileMenuOpen(false)} className="py-1 hover:text-[#00a887]">
                Contact Us
              </Link>
            </div>
            <div className="pt-3 border-t border-gray-100 flex flex-col gap-2.5">
              <Link
                href="/contact-us"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2.5 rounded-xl border border-gray-200 text-sm font-semibold text-gray-800"
              >
                Sign in
              </Link>
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenEnquiry) onOpenEnquiry();
                }}
                className="w-full text-center py-2.5 rounded-xl bg-[#00a887] text-white text-sm font-semibold"
              >
                Open an account
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Global Interactive Search Modal */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-start justify-center pt-20 px-4">
          <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-[#dce8e5] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="p-4 border-b border-[#dce8e5] flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400" />
              <input
                ref={searchInputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search unlisted shares by company, sector, ticker..."
                className="w-full text-[15px] text-[#082029] placeholder-gray-400 outline-none"
              />
              <button
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery('');
                  setSearchResults([]);
                }}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-700"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="max-h-96 overflow-y-auto p-2">
              {searchQuery.trim() === '' ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  Search top companies like <span className="font-semibold text-[#00a887]">MSEI</span>, <span className="font-semibold text-[#00a887]">HPX</span>, <span className="font-semibold text-[#00a887]">Onix</span>, <span className="font-semibold text-[#00a887]">Zepto</span>...
                </div>
              ) : searchResults.length === 0 ? (
                <div className="p-6 text-center text-sm text-gray-500">
                  No unlisted shares matching &quot;{searchQuery}&quot;
                </div>
              ) : (
                searchResults.map((stock) => (
                  <div
                    key={stock.id}
                    onClick={() => {
                      setIsSearchOpen(false);
                      if (onSelectStock) onSelectStock(stock);
                    }}
                    className="flex items-center justify-between p-3 rounded-xl hover:bg-[#f3f8f7] cursor-pointer transition-colors"
                  >
                    <div>
                      <div className="font-semibold text-[14.5px] text-[#082029]">
                        {stock.name}
                      </div>
                      <div className="text-[12px] text-gray-400">
                        {stock.sector}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-[15px] text-[#082029] num">
                        ₹{stock.price > 0 ? stock.price.toLocaleString('en-IN') : 'DRHP'}
                      </div>
                      <div className="text-[10px] uppercase font-bold text-[#00a887]">
                        Indicative
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
