'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from './AdminSidebar';
import { useAppSelector } from '@/lib/store/hooks/hooks';

interface AdminLayoutWrapperProps {
  children: React.ReactNode;
}

export default function AdminLayoutWrapper({ children }: AdminLayoutWrapperProps) {
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const user = useAppSelector(state => state.authSlice.userData[0]);

  useEffect(() => {
    setMounted(true);
    
    if (user) return;

    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/admin/login');
    }
  }, [user, router]);

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-[#0F0F1E] flex">
      {/* Sidebar is fixed (z-50). 
        It has a width of w-64, and xl:w-72.
      */}
      <AdminSidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} />

      {/* MAIN CONTENT WRAPPER 
        ✅ lg:ml-64 matches the sidebar width on desktop.
        ✅ xl:ml-72 matches the sidebar expansion on extra large screens.
        ✅ min-w-0 prevents flex children (like tables) from overflowing.
      */}
      <div className="flex-1 flex flex-col min-h-screen min-w-0 lg:ml-64 xl:ml-72 transition-all duration-300">
        
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-[#0F0F1E]/90 backdrop-blur-xl border-b border-white/8 px-4 lg:px-8 h-16 flex items-center gap-4 w-full">
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden text-white/60 hover:text-white transition-colors p-1.5 rounded-lg hover:bg-white/6"
            aria-label="Open menu"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          
          <div className="flex-1" />
          
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-secondary/20 border border-secondary/30 flex items-center justify-center">
              <span className="text-secondary text-xs font-semibold">A</span>
            </div>
            <span className="text-white/70 text-sm hidden sm:block font-medium">Admin</span>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-8 w-full">
          {/* Constrain content width for better readability on ultra-wide screens */}
          <div className="max-w-[1600px] mx-auto w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}

