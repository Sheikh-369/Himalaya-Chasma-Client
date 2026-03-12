'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import AppLogo from '@/app/components/ui/AppLogo';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Mock admin credentials
    setTimeout(() => {
      if (email === 'admin@clearvision.com' && password === 'admin123') {
        localStorage.setItem('admin_authenticated', 'true');
        router.push('/admin/dashboard');
      } else {
        setError('Invalid email or password. Please try again.');
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/8 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-3">
            <AppLogo size={44} />
            <span className="font-display font-semibold text-2xl text-white tracking-tight">
              ClearVision
            </span>
          </div>
          <p className="text-white/50 text-sm font-sans">Admin Portal</p>
        </div>

        {/* Card */}
        <div className="glass-card-dark rounded-3xl p-8 shadow-deep">
          <h1 className="font-display text-2xl font-semibold text-white mb-1">Welcome back</h1>
          <p className="text-white/50 text-sm mb-8">Sign in to manage your store</p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@clearvision.com"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-secondary/60 focus:bg-white/8 transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-white/70 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm focus:outline-none focus:border-secondary/60 focus:bg-white/8 transition-all"
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 text-base font-semibold rounded-xl disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-white/10">
            <p className="text-white/30 text-xs text-center">
              Demo credentials: admin@clearvision.com / admin123
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
