'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import AppLogo from '@/app/components/ui/AppLogo';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { setAdmin, setSelectedUser } from '@/lib/store/admin/auth/admin-slice';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}

const navItems: NavItem[] = [
  {
    label: 'Dashboard',
    href: '/admin/dashboard',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
    {
    label: 'Products',
    href: '/admin/products',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
      </svg>
    ),
  },
  {
    label: 'Profile',
    href: '#', // handled via onClick
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
  },
  {
    label: 'Main Site',
    href: '/',
    external: false,
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
      </svg>
    ),
  },
];

interface AdminSidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export default function AdminSidebar({ mobileOpen, onClose }: AdminSidebarProps) {
  const dispatch = useAppDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const selectedUser = useAppSelector((state) => state.adminSlice.selectedUser);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Fallback to localStorage if Redux user is null
  const getCurrentUser = () => {
    if (selectedUser) return selectedUser;
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('user');
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  };

  const goToProfile = () => {
    const user = getCurrentUser();
    if (!user) return;
    router.push(`/admin/profile/${user.id}`);
    setSidebarOpen(false);
    onClose();
  };

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  dispatch(setSelectedUser(null)); // clear selected user
  dispatch(setAdmin([]));          // clear admin list if needed
  router.push("/");                // redirect safely
};

  return (
    <>
      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden transition-opacity duration-300"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-50 w-64 xl:w-72 bg-primary border-r border-white/8 flex flex-col transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Logo Section */}
        <div className="flex items-center gap-3 px-6 py-5 border-b border-white/8 shrink-0">
          <AppLogo size={36} />
          <div className="min-w-0">
            <span className="font-display font-semibold text-lg text-white tracking-tight block leading-tight truncate">
              HimalayaChasmaGhar
            </span>
            <span className="text-secondary text-xs font-sans">Admin Panel</span>
          </div>
          <button
            onClick={onClose}
            className="ml-auto lg:hidden p-1 text-white/40 hover:text-white transition-colors"
            aria-label="Close menu"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto scrollbar-hide">
          {navItems.map((item) => {
            const isActive = pathname === (typeof item.href === 'string' ? item.href : '');

            return (
              <Link
                key={item.label}
                href={typeof item.href === 'string' ? item.href : '#'}
                onClick={(e) => {
                  if (item.label === 'Profile') {
                    e.preventDefault();
                    goToProfile();
                  } else {
                    onClose();
                  }
                }}
                target={item.external ? '_blank' : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? 'bg-secondary text-primary shadow-lg shadow-secondary/10'
                    : 'text-white/60 hover:text-white hover:bg-white/6'
                }`}
              >
                <span className={`transition-colors ${isActive ? 'text-primary' : 'text-white/40 group-hover:text-white/80'}`}>
                  {item.icon}
                </span>
                {item.label}
                {item.external && (
                  <svg className="w-3.5 h-3.5 ml-auto opacity-40" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Logout Section */}
        <div className="px-3 py-4 border-t border-white/8 shrink-0">
          <button
            onClick={handleLogout}
            className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm font-medium text-white/60 hover:text-red-400 hover:bg-red-500/8 transition-all duration-200 group"
          >
            <svg className="w-5 h-5 text-white/40 group-hover:text-red-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}