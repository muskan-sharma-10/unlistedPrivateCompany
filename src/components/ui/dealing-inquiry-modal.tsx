'use client';

import React, { useState } from 'react';
import { X, CheckCircle2, AlertTriangle, Phone, Mail, User, Building, Loader2 } from 'lucide-react';

interface DealingInquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultStock?: string;
  defaultInquiryType?: 'Buy Shares' | 'Sell Shares' | 'Sell ESOPs' | 'Partner With Us';
}

export const DealingInquiryModal: React.FC<DealingInquiryModalProps> = ({
  isOpen,
  onClose,
  defaultStock = '',
  defaultInquiryType = '',
}) => {
  const [inquiryType, setInquiryType] = useState<string>(defaultInquiryType);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [stockName, setStockName] = useState(defaultStock);
  const [quantity, setQuantity] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  React.useEffect(() => {
    if (defaultStock) setStockName(defaultStock);
    if (defaultInquiryType) setInquiryType(defaultInquiryType);
  }, [defaultStock, defaultInquiryType]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (!inquiryType) {
      setErrorMessage('Please select a valid Inquiry Type.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('/api/inquiry/dealing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          inquiryType,
          name,
          phone,
          email: email || undefined,
          stockName,
          quantity: quantity || undefined,
          message: message || undefined,
          sourcePage: typeof window !== 'undefined' ? window.location.pathname : 'dealing-modal',
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrorMessage(data.error || 'Failed to submit dealing inquiry. Please try again.');
        return;
      }

      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setIsSubmitting(false);
        onClose();
      }, 2500);
    } catch (err: any) {
      setErrorMessage('Network error while transmitting inquiry. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
        {/* Header */}
        <div className="bg-[#0B132B] p-5 sm:p-6 text-white flex items-center justify-between">
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 block mb-0.5">
              Institutional Dealing Desk
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Send a Dealing Inquiry
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Form */}
        <form onSubmit={handleSubmit} className="p-5 sm:p-6 space-y-4">
          {/* Inquiry Type Required Dropdown */}
          <div>
            <label htmlFor="modal-dealing-inquiry-type" className="text-xs font-semibold text-slate-700 block mb-1">
              Inquiry Type *
            </label>
            <select
              id="modal-dealing-inquiry-type"
              required
              value={inquiryType}
              onChange={(e) => {
                setInquiryType(e.target.value);
                if (errorMessage) setErrorMessage(null);
              }}
              className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors cursor-pointer"
            >
              <option value="" disabled>-- Select Inquiry Type * --</option>
              <option value="Buy Shares">Buy Shares</option>
              <option value="Sell Shares">Sell Shares</option>
              <option value="Sell ESOPs">Sell ESOPs</option>
              <option value="Partner With Us">Partner With Us</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Full Name *
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Rahul Sharma"
                className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
              />
              <User className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors tabular-nums"
                />
                <Phone className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="rahul@example.com"
                  className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                />
                <Mail className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Company / Stock *
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={stockName}
                  onChange={(e) => setStockName(e.target.value)}
                  placeholder="e.g. NSE India, Zepto"
                  className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg pl-9 pr-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
                />
                <Building className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold text-slate-700 block mb-1">
                Quantity or Budget
              </label>
              <input
                type="text"
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
                placeholder="e.g. 100 shares"
                className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors tabular-nums"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Instructions or Notes
            </label>
            <textarea
              rows={2}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Any specific inquiry notes..."
              className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors resize-none"
            />
          </div>

          {errorMessage && (
            <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start space-x-2">
              <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {submitted ? (
            <div className="p-3.5 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold text-center flex items-center justify-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Inquiry delivered to dealing desk (info.biswal01@gmail.com)!</span>
            </div>
          ) : (
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors text-center flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Inquiry...</span>
                </>
              ) : (
                <span>Submit Dealing Inquiry →</span>
              )}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default DealingInquiryModal;
