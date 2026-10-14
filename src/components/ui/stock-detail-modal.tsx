'use client';

import React, { useState } from 'react';
import { X, TrendingUp, TrendingDown, ShieldCheck, CheckCircle2, MessageSquare, Calculator } from 'lucide-react';
import { StockItem } from '@/data/unlisted-data';

interface StockDetailModalProps {
  stock: StockItem | null;
  onClose: () => void;
  onEnquire: (stock: StockItem, shares: number) => void;
}

export const StockDetailModal: React.FC<StockDetailModalProps> = ({
  stock,
  onClose,
  onEnquire,
}) => {
  const [sharesCount, setSharesCount] = useState<number>(stock?.minLot || 100);
  const [submitted, setSubmitted] = useState(false);

  if (!stock) return null;

  const isUp = stock.changeType === 'up';
  const totalValue = sharesCount * stock.price;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      onEnquire(stock, sharesCount);
      setSubmitted(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl border border-[#dce8e5] overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="bg-[#082029] p-6 text-white flex items-center justify-between shrink-0">
          <div className="flex items-center space-x-3.5">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-[#00a887] to-[#2dd4bf] text-[#082029] flex items-center justify-center font-semibold text-base">
              {stock.name.slice(0, 2).toUpperCase()}
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-semibold text-white">{stock.name}</h3>
                <span className="text-[10px] uppercase font-semibold px-2 py-0.5 rounded-sm bg-teal-800 text-teal-200">
                  {stock.category}
                </span>
              </div>
              <p className="text-xs text-slate-300 font-medium">
                {stock.sector} {stock.ticker && `· Symbol: ${stock.ticker}`}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6">
          {/* Price Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 rounded-2xl bg-[#f3f8f7] border border-[#dce8e5]">
            <div>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider block">
                Indicative Price per share
              </span>
              <div className="text-2xl sm:text-3xl font-semibold text-[#082029]">
                ₹{stock.price.toLocaleString('en-IN')}
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <span
                className={`inline-flex items-center space-x-1 text-sm font-semibold px-3 py-1 rounded-full ${
                  isUp ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                }`}
              >
                {isUp ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                <span>{stock.change}</span>
              </span>
              <span className="text-xs text-gray-500 font-medium">
                As of {stock.lastUpdated}
              </span>
            </div>
          </div>

          {/* Description */}
          <div>
            <h4 className="text-xs font-semibold uppercase text-gray-400 tracking-wider mb-2">
              Business Overview
            </h4>
            <p className="text-sm sm:text-base text-gray-700 leading-relaxed font-normal">
              {stock.description}
            </p>
          </div>

          {/* Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block mb-1">Min. Lot Size</span>
              <span className="font-semibold text-gray-900">{stock.minLot || 100} Shares</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block mb-1">Est. Market Cap</span>
              <span className="font-semibold text-gray-900">{stock.marketCap || '₹ 10,000 Cr+'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block mb-1">P/E Multiple</span>
              <span className="font-semibold text-gray-900">{stock.peRatio || '30.5'}</span>
            </div>

            <div className="p-3.5 rounded-xl bg-gray-50 border border-gray-100">
              <span className="text-gray-500 block mb-1">DRHP Outlook</span>
              <span className="font-semibold text-teal-700">{stock.drhpStatus || 'Private Market'}</span>
            </div>
          </div>

          {/* Value Calculator Form */}
          <form onSubmit={handleSubmit} className="p-5 rounded-2xl border border-[#dce8e5] bg-white space-y-4">
            <div className="flex items-center space-x-2 text-sm font-semibold text-[#082029]">
              <Calculator className="w-4 h-4 text-[#00a887]" />
              <span>Indicative Investment Calculator</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Quantity (Shares)
                </label>
                <input
                  type="number"
                  min={stock.minLot || 1}
                  step={10}
                  value={sharesCount}
                  onChange={(e) => setSharesCount(Math.max(1, parseInt(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-gray-300 text-sm font-semibold text-[#082029] focus:outline-none focus:border-[#00a887]"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-gray-600 block mb-1.5">
                  Est. Total Consideration
                </label>
                <div className="px-3.5 py-2.5 rounded-xl bg-[#f0f6f4] border border-[#dce8e5] text-sm font-semibold text-[#082029]">
                  ₹{totalValue.toLocaleString('en-IN')}
                </div>
              </div>
            </div>

            {submitted ? (
              <div className="p-3 rounded-xl bg-emerald-50 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center space-x-1.5">
                <CheckCircle2 className="w-4 h-4" />
                <span>Enquiry recorded! Relationship manager is connecting...</span>
              </div>
            ) : (
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  type="submit"
                  className="flex-1 py-3 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white text-sm font-semibold shadow-md transition-all text-center"
                >
                  Enquire to Buy {stock.name} →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    alert(`To sell ${stock.name} unlisted/ESOP shares, our dealing desk will verify your holding statement.`);
                    onClose();
                  }}
                  className="px-6 py-3 rounded-xl border border-gray-300 hover:border-[#082029] text-gray-800 text-sm font-semibold transition-all text-center"
                >
                  Sell My Shares
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Modal Footer */}
        <div className="bg-[#fafcfb] px-6 py-4 border-t border-gray-100 flex flex-wrap items-center justify-between text-xs text-gray-500 gap-3 shrink-0">
          <div className="flex items-center space-x-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>Direct depository settlement in CDSL / NSDL</span>
          </div>
          <div className="flex items-center space-x-4">
            <a
              href={`/shares/${stock.id}`}
              className="text-[#00a887] font-semibold hover:underline inline-flex items-center space-x-1"
            >
              <span>View Full Financials & Reports Page</span>
              <span>→</span>
            </a>
            <button onClick={onClose} className="font-semibold text-gray-600 hover:text-black">
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockDetailModal;
