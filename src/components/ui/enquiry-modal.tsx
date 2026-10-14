'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Phone, Mail, User, HelpCircle } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({ isOpen, onClose }) => {
  const [dealType, setDealType] = useState<'buy' | 'sell' | 'esop'>('buy');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stockName, setStockName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-[#dce8e5] overflow-hidden">
        {/* Modal Header */}
        <div className="bg-[#082029] p-6 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-[#2dd4bf] block mb-1">
              Private Market Dealing Desk
            </span>
            <h3 className="text-xl font-semibold text-white">
              Connect with Private Market Desk
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
          {/* Deal type selection */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'buy', label: 'Buy Shares' },
              { id: 'sell', label: 'Sell Shares' },
              { id: 'esop', label: 'Liquidate ESOPs' },
            ].map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setDealType(t.id as any)}
                className={`py-2 rounded-xl text-xs font-semibold transition-all ${
                  dealType === t.id
                    ? 'bg-[#00a887] text-white shadow-xs'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887]"
              />
              <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Mobile Number
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887]"
                />
                <Phone className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 block mb-1.5">
                Work Email (Optional)
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887]"
                />
                <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
              Unlisted Company / Ticker
            </label>
            <input
              type="text"
              required
              value={stockName}
              onChange={(e) => setStockName(e.target.value)}
              placeholder="e.g. NSE India, Zepto, Swiggy..."
              className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887]"
            />
          </div>

          {submitted ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-semibold text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Thank you! Your request has been assigned to our desk.</span>
            </div>
          ) : (
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white text-sm font-semibold shadow-md transition-all"
            >
              Submit Dealing Desk Request →
            </button>
          )}

          <div className="flex items-center space-x-2 text-[11px] text-gray-500 pt-2 border-t border-gray-100">
            <Shield className="w-3.5 h-3.5 text-teal-600 shrink-0" />
            <span>Strict privacy. No spam. Direct settlement through authorized depository.</span>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnquiryModal;
