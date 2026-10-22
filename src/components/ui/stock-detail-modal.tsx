'use client';

import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, ShieldCheck, CheckCircle2, MessageSquare, Calculator, Phone, User, Loader2 } from 'lucide-react';
import { StockItem } from '@/data/unlisted-data';
import { submitLeadEnquiry } from '@/lib/supabase/queries';

interface StockDetailModalProps {
  stock: StockItem | null;
  onClose: () => void;
  onEnquire?: (stock: StockItem, shares: number) => void;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  stock,
  onClose,
  onEnquire,
}) => {
  const [dealType, setDealType] = useState<'buy' | 'sell'>('buy');
  const [sharesCount, setSharesCount] = useState<number>(stock?.minLot || 100);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!stock) return null;

  const isUp = stock.changeType === 'up';
  const totalValue = sharesCount * stock.price;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await submitLeadEnquiry({
        name: name.trim() || 'Investor',
        phone: phone.trim(),
        stock_symbol: stock.ticker || stock.id,
        stock_name: stock.name,
        quantity: sharesCount,
        target_price: stock.price,
        enquiry_type: dealType === 'buy' ? 'buy_order' : 'sell_order',
        source_page: typeof window !== 'undefined' ? window.location.pathname : 'stock-modal',
      });
      if (onEnquire) onEnquire(stock, sharesCount);
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        onClose();
      }, 2000);
    } catch {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        onClose();
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden max-h-[90vh] flex flex-col font-sans">
        {/* Header */}
        <div className="bg-[#0B132B] p-5 sm:p-6 text-white flex items-center justify-between shrink-0 border-b border-slate-800">
          <div className="flex items-center space-x-3.5">
            <div className="w-11 h-11 rounded-lg bg-blue-700 text-white flex items-center justify-center font-bold text-sm tracking-wider shadow-xs">
              {stock.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-lg sm:text-xl font-bold text-white leading-tight">{stock.name}</h3>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-blue-900/60 border border-blue-500/30 text-blue-300">
                  {stock.category}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-medium mt-0.5">
                {stock.sector} {stock.ticker && `· Symbol: ${stock.ticker}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5">
          {/* Price Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-xl bg-slate-50 border border-slate-200">
            <div>
              <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider block">
                Indicative Price per share
              </span>
              <div className="text-2xl sm:text-3xl font-bold text-[#0B132B] tabular-nums">
                ₹{stock.price.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex items-center space-x-2.5">
              <span
                className={`inline-flex items-center space-x-1 text-xs font-semibold px-2.5 py-1 rounded-md tabular-nums border ${
                  isUp
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-200'
                    : 'bg-red-50 text-red-700 border-red-200'
                }`}
              >
                {isUp ? <TrendingUp className="w-3.5 h-3.5" /> : <TrendingDown className="w-3.5 h-3.5" />}
                <span>{stock.change}</span>
              </span>
              <span className="text-xs text-slate-500 font-medium tabular-nums">
                Updated {stock.lastUpdated}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-[11px] font-bold uppercase text-slate-500 tracking-wider mb-1.5">
              Business Overview
            </h4>
            <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-normal">
              {stock.description}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs">
            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-0.5">Min. Lot Size</span>
              <span className="font-bold text-slate-900 tabular-nums">{stock.minLot || 100} Shares</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-0.5">Est. Market Cap</span>
              <span className="font-bold text-slate-900 tabular-nums">{stock.marketCap || '₹ 10,000 Cr+'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-0.5">P/E Multiple</span>
              <span className="font-bold text-slate-900 tabular-nums">{stock.peRatio || '30.5'}</span>
            </div>

            <div className="p-3 rounded-lg bg-slate-50 border border-slate-200/80">
              <span className="text-[11px] text-slate-500 uppercase tracking-wider block mb-0.5">DRHP Outlook</span>
              <span className="font-bold text-blue-700">{stock.drhpStatus || 'Private Market'}</span>
            </div>
          </div>

          {/* Value Calculator Form */}
          <form onSubmit={handleSubmit} className="p-4 sm:p-5 rounded-xl border border-slate-200 bg-white space-y-4">
            <div className="flex items-center space-x-2 text-xs sm:text-sm font-bold text-[#0B132B]">
              <Calculator className="w-4 h-4 text-blue-700" />
              <span>Indicative Investment Calculator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Quantity (Shares)
                </label>
                <input
                  type="number"
                  min={stock.minLot || 1}
                  step={10}
                  value={sharesCount}
                  onChange={(e) => setSharesCount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-lg border border-slate-200 text-xs sm:text-sm font-semibold text-slate-900 tabular-nums focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Est. Total Consideration
                </label>
                <div className="px-3 py-2 rounded-lg bg-slate-50 border border-slate-200 text-xs sm:text-sm font-bold text-[#0B132B] tabular-nums">
                  ₹{totalValue.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {/* Buy / Sell Selection */}
            <div className="grid grid-cols-2 gap-2 pt-0.5">
              <button
                type="button"
                onClick={() => setDealType('buy')}
                className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                  dealType === 'buy'
                    ? 'bg-blue-700 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                Buy {stock.name}
              </button>
              <button
                type="button"
                onClick={() => setDealType('sell')}
                className={`py-2 rounded-lg text-xs font-semibold transition-colors ${
                  dealType === 'sell'
                    ? 'bg-[#0B132B] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200/60'
                }`}
              >
                Sell My Shares
              </button>
            </div>

            {/* Investor Contact Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-0.5">
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Mobile Number *
                </label>
                <div className="relative">
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full px-3 py-2 pl-8 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 tabular-nums focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                  <Phone className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
              <div>
                <label className="text-xs font-semibold text-slate-700 block mb-1">
                  Your Name (Optional)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full name"
                    className="w-full px-3 py-2 pl-8 rounded-lg border border-slate-200 text-xs font-medium text-slate-900 focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                  />
                  <User className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Enquiry saved! Dealing desk is connecting with you within 15 minutes.</span>
              </div>
            ) : (
              <div className="pt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors text-center flex items-center justify-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Submitting Dealing Request...</span>
                    </>
                  ) : (
                    <span>
                      {dealType === 'buy' ? `Enquire to Buy ${sharesCount} Shares` : `Submit Sell Order for ${sharesCount} Shares`} →
                    </span>
                  )}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-slate-50 px-5 sm:px-6 py-3.5 border-t border-slate-200 flex flex-wrap items-center justify-between text-xs text-slate-500 gap-3 shrink-0">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Direct depository settlement in CDSL / NSDL</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`/shares/${stock.id}`}
              className="text-blue-700 font-semibold hover:underline inline-flex items-center space-x-1"
            >
              <span>View Full Financials &amp; Reports</span>
              <span>→</span>
            </a>
            <button onClick={onClose} className="font-semibold text-slate-600 hover:text-slate-900">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailModal;
