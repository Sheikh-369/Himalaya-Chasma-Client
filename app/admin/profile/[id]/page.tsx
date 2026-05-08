'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { fetchUserById } from '@/lib/store/admin/auth/admin-slice';
import { Status } from '@/lib/global/type';
import AdminLayoutWrapper from '../../components/AdminLayoutWrapper';

export default function AdminProfilePage() {
  const dispatch = useAppDispatch();
  const { selectedUser, status } = useAppSelector((state) => state.adminSlice);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.id;
      if (userId) dispatch(fetchUserById(userId));
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }, [dispatch]);

  if (status === Status.LOADING) {
    return (
      <AdminLayoutWrapper>
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-white animate-pulse">Loading profile...</p>
        </div>
      </AdminLayoutWrapper>
    );
  }

  if (status === Status.ERROR) {
    return (
      <AdminLayoutWrapper>
        <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
          <p className="text-red-400">Failed to load profile.</p>
        </div>
      </AdminLayoutWrapper>
    );
  }

  return (
    <AdminLayoutWrapper>
      <div className="space-y-8 max-w-4xl">
        <h1 className="font-display text-3xl font-semibold text-white">Profile</h1>
        
        <div className="bg-[#16213E] border border-white/8 rounded-3xl overflow-hidden shadow-xl">
          {/* Banner Section */}
          <div className="h-32 bg-gradient-to-r from-primary via-[#1e2a4a] to-[#16213E] relative">
            <div 
              className="absolute inset-0 opacity-30" 
              style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A84C22 0%, transparent 60%)' }} 
            />
          </div>

          {/* Profile Info Section */}
          <div className="px-8 pb-8">
            {/* ✅ FIXED: Added relative z-10 to prevent the 'M' from being cut off by the banner */}
            <div className="flex items-end gap-6 -mt-12 mb-10 relative z-10">
              <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-4 border-[#16213E] flex items-center justify-center shadow-2xl">
                <span className="font-display text-4xl font-bold text-secondary">
                  {selectedUser?.userName?.charAt(0).toUpperCase() || 'M'}
                </span>
              </div>
              <div className="pb-2">
                <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
                  {selectedUser?.userName || 'Monty Ansari'}
                </h2>
                <span className="inline-flex items-center gap-1.5 bg-secondary/15 border border-secondary/20 text-secondary text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mt-2">
                  {selectedUser?.role || 'admin'}
                </span>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: 'Email', value: selectedUser?.userEmail },
                { label: 'Phone', value: selectedUser?.whatsAppNumber },
                { label: 'City', value: selectedUser?.city || 'N/A' },
                { label: 'District', value: selectedUser?.district || 'N/A' },
                { label: 'User ID', value: selectedUser?.id },
                { label: 'Role', value: selectedUser?.role },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 border border-white/5 rounded-2xl px-5 py-4 transition-all hover:bg-white/[0.08]">
                  <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-bold">{item.label}</p>
                  <p className="text-white text-base font-medium break-all">{item.value || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}