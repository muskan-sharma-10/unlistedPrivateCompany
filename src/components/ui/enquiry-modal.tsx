'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, Shield, Phone, Mail, User, Building, AlertTriangle, Loader2 } from 'lucide-react';
import { submitLeadEnquiry } from '@/lib/supabase/queries';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStock?: string;
  defaultDealType?: 'Buy Shares' | 'Sell Shares' | 'Liquidate ESOPs' | string;
}

export const EnquiryModal: React.FC<EnquiryModalProps> = ({
  isOpen,
  onClose,
  defaultStock = '',
  defaultDealType = '',
}) => {
  const [inquiryType, setInquiryType] = useState<string>(defaultDealType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stockName, setStockName] = useState(defaultStock);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Sync defaultStock and defaultDealType if changed
  React.useEffect(() => {
    if (defaultStock) setStockName(defaultStock);
    if (defaultDealType) {
      const normalized =
        defaultDealType === 'buy' ? 'Buy Shares' :
        defaultDealType === 'sell' ? 'Sell Shares' :
        defaultDealType === 'esop' ? 'Liquidate ESOPs' : defaultDealType;
      setInquiryType(normalized);
    }
  }, [defaultStock, defaultDealType]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!inquiryType) {
      setErrorMessage('Please select an Inquiry Type (Buy Shares, Sell Shares, or Liquidate ESOPs).');
      return;
    }

    setIsSubmitting(true);

    try {
      // 1. Submit to API endpoint with server-side validation
      const response = await fetch('/api/inquiry/desk', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType,
          name,
          phone,
          email: email || undefined,
          stockName,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : 'modal',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Fallback directly to client supabase query if route failed
        const mappedType =
          inquiryType === 'Buy Shares' ? 'buy_order' :
          inquiryType === 'Sell Shares' ? 'sell_order' : 'esop_liquidity';

        await submitLeadEnquiry({
          name,
          phone,
          email,
          stock_name: stockName,
          enquiry_type: mappedType,
          source_page: typeof window !== 'undefined' ? window.location.pathname : 'modal',
        });
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      // Graceful fallback attempt
      try {
        const mappedType =
          inquiryType === 'Buy Shares' ? 'buy_order' :
          inquiryType === 'Sell Shares' ? 'sell_order' : 'esop_liquidity';

        await submitLeadEnquiry({
          name,
          phone,
          email,
          stock_name: stockName,
          enquiry_type: mappedType,
          source_page: typeof window !== 'undefined' ? window.location.pathname : 'modal',
        });
        setSubmitted(true);
        setTimeout(() => {
          setSubmitted(false);
          setIsSubmitting(false);
          onClose();
        }, 2500);
      } catch {
        setErrorMessage('Failed to submit enquiry. Please check your details and try again.');
        setIsSubmitting(false);
      }
    }
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
            type="button"
            onClick={onClose}
            className="p-2 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
          {/* Inquiry Type Required Dropdown */}
          <div>
            <label htmlFor="desk-inquiry-type" className="text-xs font-semibold text-gray-700 block mb-1.5">
              Inquiry Type *
            </label>
            <select
              id="desk-inquiry-type"
              required
              value={inquiryType}
              onChange={(e) => {
                setInquiryType(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl px-4 py-2.5 outline-none focus:border-[#00a887] transition-colors cursor-pointer"
            >
              <option value="" disabled>-- Select Inquiry Type * --</option>
              <option value="Buy Shares">Buy Shares</option>
              <option value="Sell Shares">Sell Shares</option>
              <option value="Liquidate ESOPs">Liquidate ESOPs</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-gray-700 block mb-1.5">
              Full Name *
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
                Mobile Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887] tabular-nums"
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
              Unlisted Company / Ticker *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={stockName}
                onChange={(e) => setStockName(e.target.value)}
                placeholder="e.g. NSE India, Zepto, Swiggy..."
                className="w-full text-sm text-[#082029] bg-[#f8fafc] border border-gray-300 rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-[#00a887]"
              />
              <Building className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="p-3.5 rounded-xl bg-emerald-50 text-emerald-800 text-sm font-semibold text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>Thank you! Your inquiry has been submitted to our private market desk.</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-3.5 rounded-xl bg-[#00a887] hover:bg-[#009476] text-white text-sm font-semibold shadow-md transition-all flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <span>Submit Dealing Desk Request →</span>
              )}
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
