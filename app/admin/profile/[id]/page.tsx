// 'use client';

// import React from 'react';
// import AdminLayoutWrapper from '../components/AdminLayoutWrapper';

// const adminProfile = {
//   name: 'ClearVision Admin',
//   email: 'admin@clearvision.com',
//   role: 'Super Admin',
//   phone: '+977 9800000000',
//   joinedDate: 'January 2025',
//   store: 'ClearVision Eyewear',
//   location: 'Kathmandu, Nepal',
// };

// export default function AdminProfilePage() {
//   return (
//     <AdminLayoutWrapper>
//       <div className="space-y-8 max-w-2xl">
//         {/* Page Header */}
//         <div>
//           <h1 className="font-display text-2xl lg:text-3xl font-semibold text-white">Profile</h1>
//           <p className="text-white/40 text-sm mt-1">Your admin account information</p>
//         </div>

//         {/* Profile Card */}
//         <div className="bg-[#16213E] border border-white/8 rounded-3xl overflow-hidden">
//           {/* Banner */}
//           <div className="h-28 bg-gradient-to-r from-primary via-[#1e2a4a] to-[#16213E] relative">
//             <div className="absolute inset-0 opacity-30"
//               style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A84C22 0%, transparent 60%)' }}
//             />
//           </div>

//           {/* Avatar + Info */}
//           <div className="px-6 pb-6">
//             <div className="flex items-end gap-4 -mt-10 mb-6">
//               <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-[#16213E] flex items-center justify-center shadow-gold">
//                 <span className="font-display text-3xl font-bold text-secondary">A</span>
//               </div>
//               <div className="pb-1">
//                 <h2 className="font-display text-xl font-semibold text-white">{adminProfile?.name}</h2>
//                 <span className="inline-flex items-center gap-1.5 bg-secondary/15 border border-secondary/20 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full mt-1">
//                   <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                     <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
//                   </svg>
//                   {adminProfile?.role}
//                 </span>
//               </div>
//             </div>

//             {/* Details Grid */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//               {[
//                 { label: 'Email Address', value: adminProfile?.email, icon: '✉️' },
//                 { label: 'Phone Number', value: adminProfile?.phone, icon: '📞' },
//                 { label: 'Store', value: adminProfile?.store, icon: '🏪' },
//                 { label: 'Location', value: adminProfile?.location, icon: '📍' },
//                 { label: 'Member Since', value: adminProfile?.joinedDate, icon: '📅' },
//                 { label: 'Account Type', value: adminProfile?.role, icon: '🔐' },
//               ]?.map((item) => (
//                 <div key={item?.label} className="bg-white/4 rounded-xl px-4 py-3.5">
//                   <p className="text-white/40 text-xs mb-1">{item?.label}</p>
//                   <p className="text-white text-sm font-medium">{item?.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Security Note */}
//         <div className="bg-secondary/8 border border-secondary/15 rounded-2xl px-5 py-4 flex items-start gap-3">
//           <svg className="w-5 h-5 text-secondary mt-0.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
//             <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
//           </svg>
//           <div>
//             <p className="text-secondary text-sm font-semibold">Admin Access</p>
//             <p className="text-white/50 text-xs mt-0.5 leading-relaxed">
//               This account has full access to manage orders, update statuses, and view all customer information. Keep your credentials secure.
//             </p>
//           </div>
//         </div>
//       </div>
//     </AdminLayoutWrapper>
//   );
// }


//2nd
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

    // decode token to get userId (or store userId in localStorage after login)
    const payload = JSON.parse(atob(token.split('.')[1]));
    const userId = payload.id;
    if (userId) dispatch(fetchUserById(userId));
  }, [dispatch]);

  if (status === Status.LOADING) return <AdminLayoutWrapper><p className="text-white">Loading...</p></AdminLayoutWrapper>;
  if (status === Status.ERROR) return <AdminLayoutWrapper><p className="text-red-400">Failed to load profile.</p></AdminLayoutWrapper>;

  if (!selectedUser) return <AdminLayoutWrapper><p className="text-white/50">No user data found.</p></AdminLayoutWrapper>;

  return (
    <AdminLayoutWrapper>
      <div className="space-y-8 max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-white">Profile</h1>
        <div className="bg-[#16213E] border border-white/8 rounded-3xl overflow-hidden">
          <div className="h-28 bg-gradient-to-r from-primary via-[#1e2a4a] to-[#16213E] relative">
            <div className="absolute inset-0 opacity-30" style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A84C22 0%, transparent 60%)' }} />
          </div>
          <div className="px-6 pb-6">
            <div className="flex items-end gap-4 -mt-10 mb-6">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-2 border-[#16213E] flex items-center justify-center shadow-gold">
                <span className="font-display text-3xl font-bold text-secondary">
                  {selectedUser.userName?.charAt(0).toUpperCase() || 'A'}
                </span>
              </div>
              <div className="pb-1">
                <h2 className="font-display text-xl font-semibold text-white">{selectedUser.userName}</h2>
                <span className="inline-flex items-center gap-1.5 bg-secondary/15 border border-secondary/20 text-secondary text-xs font-semibold px-2.5 py-1 rounded-full mt-1">
                  {selectedUser.role}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { label: 'Email', value: selectedUser.userEmail },
                { label: 'Phone', value: selectedUser.whatsAppNumber },
                { label: 'City', value: selectedUser.city || 'N/A' },
                { label: 'District', value: selectedUser.district || 'N/A' },
                { label: 'User ID', value: selectedUser.id },
                { label: 'Role', value: selectedUser.role },
              ].map((item) => (
                <div key={item.label} className="bg-white/4 rounded-xl px-4 py-3.5">
                  <p className="text-white/40 text-xs mb-1">{item.label}</p>
                  <p className="text-white text-sm font-medium">{item.value || '—'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}