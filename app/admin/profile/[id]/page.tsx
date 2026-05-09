// 'use client';

// import React, { useEffect } from 'react';
// import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
// import { fetchUserById } from '@/lib/store/admin/auth/admin-slice';
// import { Status } from '@/lib/global/type';
// import AdminLayoutWrapper from '../../components/AdminLayoutWrapper';

// export default function AdminProfilePage() {
//   const dispatch = useAppDispatch();
//   const { selectedUser, status } = useAppSelector((state) => state.adminSlice);

//   useEffect(() => {
//     const token = localStorage.getItem('token');
//     if (!token) return;

//     try {
//       const payload = JSON.parse(atob(token.split('.')[1]));
//       const userId = payload.id;
//       if (userId) dispatch(fetchUserById(userId));
//     } catch (error) {
//       console.error("Error decoding token:", error);
//     }
//   }, [dispatch]);

//   if (status === Status.LOADING) {
//     return (
//       <AdminLayoutWrapper>
//         <div className="flex items-center justify-center min-h-[400px]">
//           <p className="text-white animate-pulse">Loading profile...</p>
//         </div>
//       </AdminLayoutWrapper>
//     );
//   }

//   if (status === Status.ERROR) {
//     return (
//       <AdminLayoutWrapper>
//         <div className="p-8 bg-red-500/10 border border-red-500/20 rounded-2xl">
//           <p className="text-red-400">Failed to load profile.</p>
//         </div>
//       </AdminLayoutWrapper>
//     );
//   }

//   return (
//     <AdminLayoutWrapper>
//       <div className="space-y-8 max-w-4xl">
//         <h1 className="font-display text-3xl font-semibold text-white">Profile</h1>
        
//         <div className="bg-[#16213E] border border-white/8 rounded-3xl overflow-hidden shadow-xl">
//           {/* Banner Section */}
//           <div className="h-32 bg-gradient-to-r from-primary via-[#1e2a4a] to-[#16213E] relative">
//             <div 
//               className="absolute inset-0 opacity-30" 
//               style={{ backgroundImage: 'radial-gradient(circle at 30% 50%, #C9A84C22 0%, transparent 60%)' }} 
//             />
//           </div>

//           {/* Profile Info Section */}
//           <div className="px-8 pb-8">
//             {/* ✅ FIXED: Added relative z-10 to prevent the 'M' from being cut off by the banner */}
//             <div className="flex items-end gap-6 -mt-12 mb-10 relative z-10">
//               <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-secondary/30 to-secondary/10 border-4 border-[#16213E] flex items-center justify-center shadow-2xl">
//                 <span className="font-display text-4xl font-bold text-secondary">
//                   {selectedUser?.userName?.charAt(0).toUpperCase() || 'M'}
//                 </span>
//               </div>
//               <div className="pb-2">
//                 <h2 className="font-display text-2xl font-semibold text-white tracking-tight">
//                   {selectedUser?.userName || 'Monty Ansari'}
//                 </h2>
//                 <span className="inline-flex items-center gap-1.5 bg-secondary/15 border border-secondary/20 text-secondary text-[10px] uppercase tracking-widest font-bold px-3 py-1 rounded-full mt-2">
//                   {selectedUser?.role || 'admin'}
//                 </span>
//               </div>
//             </div>

//             {/* Details Grid */}
//             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//               {[
//                 { label: 'Email', value: selectedUser?.userEmail },
//                 { label: 'Phone', value: selectedUser?.whatsAppNumber },
//                 { label: 'City', value: selectedUser?.city || 'N/A' },
//                 { label: 'District', value: selectedUser?.district || 'N/A' },
//                 { label: 'User ID', value: selectedUser?.id },
//                 { label: 'Role', value: selectedUser?.role },
//               ].map((item) => (
//                 <div key={item.label} className="bg-white/5 border border-white/5 rounded-2xl px-5 py-4 transition-all hover:bg-white/[0.08]">
//                   <p className="text-white/40 text-[10px] uppercase tracking-widest mb-1.5 font-bold">{item.label}</p>
//                   <p className="text-white text-base font-medium break-all">{item.value || '—'}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </AdminLayoutWrapper>
//   );
// }

//2nd and improved
'use client';

import React, { useEffect, useState, useRef } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { fetchUserById } from '@/lib/store/admin/auth/admin-slice';
import { Status } from '@/lib/global/type';
import AdminLayoutWrapper from '../../components/AdminLayoutWrapper';
import { Camera, Lock, User as UserIcon, Save } from 'lucide-react'; // Assuming you use lucide-react
import { updateUserProfile } from '@/lib/store/auth/auth-slice';

export default function AdminProfilePage() {
  const dispatch = useAppDispatch();
  const { selectedUser, status } = useAppSelector((state) => state.adminSlice);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Form States
  const [profileData, setProfileData] = useState({
    userName: '',
    whatsAppNumber: '',
    city: '',
    district: ''
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return;
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      if (payload.id) dispatch(fetchUserById(payload.id));
    } catch (e) { console.error(e); }
  }, [dispatch]);

  // Sync local state when user is fetched
  useEffect(() => {
    if (selectedUser) {
      setProfileData({
        userName: selectedUser.userName || '',
        whatsAppNumber: selectedUser.whatsAppNumber || '',
        city: selectedUser.city || '',
        district: selectedUser.district || ''
      });
    }
  }, [selectedUser]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0] && selectedUser) {
      const formData = new FormData();
      formData.append('profileImage', e.target.files[0]);
      await dispatch(updateUserProfile(selectedUser.id, formData));
    }
  };

  const handleUpdateInfo = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(profileData).forEach(([key, value]) => formData.append(key, value));
    await dispatch(updateUserProfile(selectedUser!.id, formData));
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    Object.entries(passwordData).forEach(([key, value]) => formData.append(key, value));
    const res = await dispatch(updateUserProfile(selectedUser!.id, formData));
    if (res.success) setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  if (status === Status.LOADING && !selectedUser) return <p>Loading...</p>;

  return (
    <AdminLayoutWrapper>
      <div className="space-y-8 max-w-5xl mx-auto pb-10">
        <h1 className="font-display text-3xl font-semibold text-white">Account Settings</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT COLUMN: Profile Picture & Basics */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#16213E] border border-white/10 rounded-3xl p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={selectedUser?.profileImage || "https://avatars.dicebear.com/api/identicon/default.svg"}
                  alt="Profile"
                  className="w-full h-full object-cover rounded-2xl border-2 border-secondary/50"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-2 -right-2 p-2 bg-secondary rounded-xl text-[#16213E] hover:scale-110 transition-transform shadow-lg"
                >
                  <Camera size={18} />
                </button>
                <input type="file" ref={fileInputRef} hidden onChange={handleImageChange} accept="image/*" />
              </div>
              <h2 className="text-xl font-bold text-white">{selectedUser?.userName}</h2>
              <p className="text-white/40 text-sm mb-4">{selectedUser?.userEmail}</p>
              <span className="bg-secondary/10 text-secondary text-[10px] uppercase font-bold px-4 py-1 rounded-full border border-secondary/20">
                {selectedUser?.role}
              </span>
            </div>
          </div>

          {/* RIGHT COLUMN: Forms */}
          <div className="lg:col-span-2 space-y-8">
            {/* General Info Form */}
            <form onSubmit={handleUpdateInfo} className="bg-[#16213E] border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <UserIcon className="text-secondary" size={20} />
                <h3 className="text-lg font-medium text-white">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">User Name</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-secondary outline-none transition-all"
                    value={profileData.userName}
                    onChange={(e) => setProfileData({...profileData, userName: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">WhatsApp Number</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-secondary outline-none"
                    value={profileData.whatsAppNumber}
                    onChange={(e) => setProfileData({...profileData, whatsAppNumber: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">City</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-secondary outline-none"
                    value={profileData.city}
                    onChange={(e) => setProfileData({...profileData, city: e.target.value})}
                  />
                </div>
                <div>
                  <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">District</label>
                  <input 
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-secondary outline-none"
                    value={profileData.district}
                    onChange={(e) => setProfileData({...profileData, district: e.target.value})}
                  />
                </div>
              </div>
              <button type="submit" className="mt-8 flex items-center gap-2 bg-secondary text-black px-6 py-2.5 rounded-xl font-bold hover:opacity-90 transition-opacity">
                <Save size={18} /> Save Details
              </button>
            </form>

            {/* Password Security Form */}
            <form onSubmit={handleUpdatePassword} className="bg-[#16213E] border border-white/10 rounded-3xl p-8">
              <div className="flex items-center gap-3 mb-6 border-b border-white/5 pb-4">
                <Lock className="text-red-400" size={20} />
                <h3 className="text-lg font-medium text-white">Change Password</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">Old Password</label>
                  <input 
                    type="password"
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-red-400 outline-none"
                    value={passwordData.oldPassword}
                    onChange={(e) => setPasswordData({...passwordData, oldPassword: e.target.value})}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">New Password</label>
                    <input 
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-red-400 outline-none"
                      value={passwordData.newPassword}
                      onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="text-white/50 text-xs mb-2 block uppercase tracking-wider">Confirm Password</label>
                    <input 
                      type="password"
                      className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-white focus:border-red-400 outline-none"
                      value={passwordData.confirmPassword}
                      onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                    />
                  </div>
                </div>
              </div>
              <button type="submit" className="mt-8 flex items-center gap-2 bg-red-500 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-red-600 transition-colors">
                Update Password
              </button>
            </form>
          </div>
        </div>
      </div>
    </AdminLayoutWrapper>
  );
}