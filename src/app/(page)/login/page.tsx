'use client';

import React, { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Shield, Eye, EyeOff, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';
import TopTicker from '@/components/header/top-ticker';
import Navbar from '@/components/header/navbar';
import Footer from '@/components/footer';
import { useAuth } from '@/lib/supabase/auth-context';

function LoginForm() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const { signIn, signUp, user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectTarget = searchParams.get('redirect') || '/portfolio';

  // If already logged in, redirect
  React.useEffect(() => {
    if (user) {
      router.push(redirectTarget);
    }
  }, [user, redirectTarget, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessMessage(null);

    if (!email || !email.includes('@')) {
      setErrorMessage('Please enter a valid email address.');
      return;
    }

    if (!password || password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (mode === 'signup' && !fullName.trim()) {
      setErrorMessage('Please enter your Full Name for your investor demat account.');
      return;
    }

    setIsSubmitting(true);

    try {
      if (mode === 'signin') {
        const result = await signIn(email, password);
        if (!result.success) {
          setErrorMessage(result.error || 'Authentication failed. Please verify credentials.');
          setIsSubmitting(false);
          return;
        }
        setSuccessMessage('Authenticated successfully! Redirecting...');
        setTimeout(() => {
          router.push(redirectTarget);
        }, 800);
      } else {
        const result = await signUp(email, password, fullName);
        if (!result.success) {
          setErrorMessage(result.error || 'Registration failed. Please try again.');
          setIsSubmitting(false);
          return;
        }
        setSuccessMessage(result.message || 'Account registered successfully! Redirecting...');
        setTimeout(() => {
          router.push(redirectTarget);
        }, 1200);
      }
    } catch (err: any) {
      setErrorMessage('An unexpected error occurred during authentication. Please retry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
      {/* Header */}
      <div className="bg-[#0B132B] p-6 text-white text-center">
        <div className="w-12 h-12 rounded-xl bg-blue-600/30 border border-blue-400/40 text-blue-400 flex items-center justify-center mx-auto mb-3 shadow-inner">
          <Shield className="w-6 h-6 text-blue-400" />
        </div>
        <span className="text-[10px] font-semibold uppercase tracking-wider text-blue-400 block mb-1">
          Private Market Institutional Portal
        </span>
        <h1 className="text-xl sm:text-2xl font-bold text-white">
          {mode === 'signin' ? 'Investor Sign In' : 'Register Investor Account'}
        </h1>
        <p className="text-xs text-slate-300 mt-1">
          {mode === 'signin'
            ? 'Sign in to access your demat portfolio and dealing desk inquiries'
            : 'Create your private equity demat access account in seconds'}
        </p>
      </div>

      {/* Mode Switcher Tabs */}
      <div className="grid grid-cols-2 p-1.5 bg-slate-100 border-b border-slate-200">
        <button
          type="button"
          onClick={() => {
            setMode('signin');
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
          className={`py-2 text-xs font-semibold rounded-lg transition-all ${
            mode === 'signin'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Sign In
        </button>
        <button
          type="button"
          onClick={() => {
            setMode('signup');
            setErrorMessage(null);
            setSuccessMessage(null);
          }}
          className={`py-2 text-xs font-semibold rounded-lg transition-all ${
            mode === 'signup'
              ? 'bg-white text-blue-700 shadow-xs'
              : 'text-slate-600 hover:text-slate-900'
          }`}
        >
          Register (New Investor)
        </button>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-4">
        {mode === 'signup' && (
          <div>
            <label className="text-xs font-semibold text-slate-700 block mb-1">
              Full Name *
            </label>
            <input
              type="text"
              required
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g. Rahul Sharma"
              className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
          </div>
        )}

        <div>
          <label className="text-xs font-semibold text-slate-700 block mb-1">
            Email Address *
          </label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="investor@example.com"
            className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-1">
            <label className="text-xs font-semibold text-slate-700">
              Password *
            </label>
            <span className="text-[10px] text-slate-400">Min 6 characters</span>
          </div>
          <div className="relative">
            <input
              type={showPassword ? 'text' : 'password'}
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full text-xs sm:text-sm text-slate-900 bg-slate-50 border border-slate-200 rounded-lg pl-3 pr-10 py-2.5 outline-none focus:bg-white focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-colors"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
              aria-label="Toggle password visibility"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium flex items-start space-x-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {successMessage && (
          <div className="p-3 rounded-lg bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium flex items-start space-x-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <span>{successMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-2.5 rounded-lg bg-blue-700 hover:bg-blue-800 text-white text-xs sm:text-sm font-semibold shadow-xs transition-colors flex items-center justify-center space-x-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>{mode === 'signin' ? 'Authenticating...' : 'Registering Account...'}</span>
            </>
          ) : (
            <span>{mode === 'signin' ? 'Sign In to Demat Access →' : 'Complete Registration →'}</span>
          )}
        </button>

        <div className="pt-2 text-center text-xs text-slate-500">
          Need assistance?{' '}
          <Link href="/contact-us" className="text-blue-700 font-semibold hover:underline">
            Contact Dealing Desk
          </Link>
        </div>
      </form>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans">
      <TopTicker />
      <Navbar />

      <main className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <Suspense fallback={
          <div className="w-full max-w-md bg-white rounded-2xl p-8 border border-slate-200 shadow-xl flex items-center justify-center space-x-2 text-slate-600 text-sm">
            <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
            <span>Loading Investor Sign In...</span>
          </div>
        }>
          <LoginForm />
        </Suspense>
      </main>

      <Footer />
    </div>
  );
}
