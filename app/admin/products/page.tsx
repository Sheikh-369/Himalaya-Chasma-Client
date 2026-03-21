// 'use client';

// import React, { useState } from 'react';
// import AdminLayoutWrapper from '../components/AdminLayoutWrapper';

// interface Product {
//   id: string;
//   name: string;
//   category: string;
//   price: number;
//   stock: number;
//   status: 'Active' | 'Inactive';
//   description: string;
//   createdAt: string;
// }

// const initialProducts: Product[] = [
//   {
//     id: 'PRD-001',
//     name: 'Aviator Pro Sunglasses',
//     category: 'Sunglasses',
//     price: 4500,
//     stock: 25,
//     status: 'Active',
//     description: 'Classic aviator style with UV400 protection and polarized lenses.',
//     createdAt: '2026-01-05',
//   },
//   {
//     id: 'PRD-002',
//     name: 'Classic Wayfarer Frame',
//     category: 'Eyeglasses',
//     price: 3200,
//     stock: 18,
//     status: 'Active',
//     description: 'Timeless wayfarer design with lightweight acetate frame.',
//     createdAt: '2026-01-10',
//   },
//   {
//     id: 'PRD-003',
//     name: 'Blue Light Blocker Glasses',
//     category: 'Computer Glasses',
//     price: 2800,
//     stock: 40,
//     status: 'Active',
//     description: 'Reduces digital eye strain with blue light filtering technology.',
//     createdAt: '2026-01-15',
//   },
//   {
//     id: 'PRD-004',
//     name: 'Round Vintage Frames',
//     category: 'Eyeglasses',
//     price: 3800,
//     stock: 12,
//     status: 'Active',
//     description: 'Retro round frames crafted from premium stainless steel.',
//     createdAt: '2026-01-20',
//   },
//   {
//     id: 'PRD-005',
//     name: 'Sports Wrap Sunglasses',
//     category: 'Sunglasses',
//     price: 5200,
//     stock: 8,
//     status: 'Inactive',
//     description: 'Aerodynamic wrap design for outdoor sports and activities.',
//     createdAt: '2026-02-01',
//   },
//   {
//     id: 'PRD-006',
//     name: 'Cat Eye Fashion Frames',
//     category: 'Eyeglasses',
//     price: 4100,
//     stock: 22,
//     status: 'Active',
//     description: 'Elegant cat eye silhouette for a bold, fashionable look.',
//     createdAt: '2026-02-10',
//   },
// ];

// const categories = ['Sunglasses', 'Eyeglasses', 'Computer Glasses', 'Reading Glasses'];

// const emptyForm = {
//   name: '',
//   category: categories[0],
//   price: '',
//   stock: '',
//   status: 'Active' as Product['status'],
//   description: '',
// };

// export default function AdminProductsPage() {
//   const [products, setProducts] = useState<Product[]>(initialProducts);
//   const [search, setSearch] = useState('');
//   const [showModal, setShowModal] = useState(false);
//   const [editProduct, setEditProduct] = useState<Product | null>(null);
//   const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
//   const [form, setForm] = useState(emptyForm);
//   const [formError, setFormError] = useState('');

//   const filtered = products.filter(
//     (p) =>
//       p.name.toLowerCase().includes(search.toLowerCase()) ||
//       p.category.toLowerCase().includes(search.toLowerCase())
//   );

//   const openAdd = () => {
//     setEditProduct(null);
//     setForm(emptyForm);
//     setFormError('');
//     setShowModal(true);
//   };

//   const openEdit = (product: Product) => {
//     setEditProduct(product);
//     setForm({
//       name: product.name,
//       category: product.category,
//       price: String(product.price),
//       stock: String(product.stock),
//       status: product.status,
//       description: product.description,
//     });
//     setFormError('');
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setEditProduct(null);
//     setForm(emptyForm);
//     setFormError('');
//   };

//   const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
//     setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!form.name.trim()) { setFormError('Product name is required.'); return; }
//     if (!form.price || isNaN(Number(form.price)) || Number(form.price) <= 0) { setFormError('Enter a valid price.'); return; }
//     if (!form.stock || isNaN(Number(form.stock)) || Number(form.stock) < 0) { setFormError('Enter a valid stock quantity.'); return; }

//     if (editProduct) {
//       setProducts((prev) =>
//         prev.map((p) =>
//           p.id === editProduct.id
//             ? { ...p, name: form.name, category: form.category, price: Number(form.price), stock: Number(form.stock), status: form.status, description: form.description }
//             : p
//         )
//       );
//     } else {
//       const newProduct: Product = {
//         id: `PRD-${String(products.length + 1).padStart(3, '0')}`,
//         name: form.name,
//         category: form.category,
//         price: Number(form.price),
//         stock: Number(form.stock),
//         status: form.status,
//         description: form.description,
//         createdAt: new Date().toISOString().split('T')[0],
//       };
//       setProducts((prev) => [newProduct, ...prev]);
//     }
//     closeModal();
//   };

//   const handleDelete = (id: string) => {
//     setProducts((prev) => prev.filter((p) => p.id !== id));
//     setDeleteConfirm(null);
//   };

//   return (
//     <AdminLayoutWrapper>
//       <div className="space-y-8">
//         {/* Page Header */}
//         <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//           <div>
//             <h1 className="font-display text-2xl lg:text-3xl font-semibold text-white">Products</h1>
//             <p className="text-white/40 text-sm mt-1">Manage your product catalog</p>
//           </div>
//           <button
//             onClick={openAdd}
//             className="flex items-center gap-2 bg-secondary text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/90 transition-colors"
//           >
//             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
//               <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
//             </svg>
//             Add Product
//           </button>
//         </div>

//         {/* Stats */}
//         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
//           {[
//             { label: 'Total Products', value: products.length, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/15' },
//             { label: 'Active', value: products.filter((p) => p.status === 'Active').length, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/15' },
//             { label: 'Inactive', value: products.filter((p) => p.status === 'Inactive').length, color: 'text-red-400', bg: 'bg-red-500/10 border-red-500/15' },
//             { label: 'Total Stock', value: products.reduce((acc, p) => acc + p.stock, 0), color: 'text-yellow-400', bg: 'bg-yellow-500/10 border-yellow-500/15' },
//           ].map((stat) => (
//             <div key={stat.label} className={`bg-[#16213E] border ${stat.bg} rounded-2xl p-5`}>
//               <p className="text-white/40 text-xs font-medium">{stat.label}</p>
//               <p className={`text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
//             </div>
//           ))}
//         </div>

//         {/* Table */}
//         <div className="bg-[#16213E] border border-white/8 rounded-2xl overflow-hidden">
//           <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/8">
//             <div>
//               <h2 className="font-display text-lg font-semibold text-white">All Products</h2>
//               <p className="text-white/40 text-xs mt-0.5">{filtered.length} products found</p>
//             </div>
//             <div className="relative">
//               <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
//               </svg>
//               <input
//                 type="text"
//                 placeholder="Search products..."
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 className="bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-secondary/50 w-56"
//               />
//             </div>
//           </div>

//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead>
//                 <tr className="border-b border-white/6">
//                   <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">ID</th>
//                   <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Product</th>
//                   <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Category</th>
//                   <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Price</th>
//                   <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Stock</th>
//                   <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Status</th>
//                   <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-white/4">
//                 {filtered.length === 0 ? (
//                   <tr>
//                     <td colSpan={7} className="px-6 py-12 text-center text-white/30 text-sm">No products found.</td>
//                   </tr>
//                 ) : (
//                   filtered.map((product) => (
//                     <tr key={product.id} className="hover:bg-white/2 transition-colors">
//                       <td className="px-6 py-4">
//                         <span className="text-secondary text-sm font-mono font-medium">{product.id}</span>
//                       </td>
//                       <td className="px-4 py-4">
//                         <p className="text-white text-sm font-medium">{product.name}</p>
//                         <p className="text-white/30 text-xs mt-0.5 hidden sm:block">{product.createdAt}</p>
//                       </td>
//                       <td className="px-4 py-4 hidden md:table-cell">
//                         <span className="text-white/60 text-xs bg-white/6 px-2.5 py-1 rounded-lg">{product.category}</span>
//                       </td>
//                       <td className="px-4 py-4">
//                         <span className="text-white text-sm font-semibold">Rs. {product.price.toLocaleString()}</span>
//                       </td>
//                       <td className="px-4 py-4 hidden lg:table-cell">
//                         <span className={`text-sm font-medium ${product.stock <= 10 ? 'text-red-400' : 'text-white/70'}`}>{product.stock}</span>
//                       </td>
//                       <td className="px-4 py-4">
//                         <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${product.status === 'Active' ? 'bg-green-500/15 text-green-400 border-green-500/20' : 'bg-red-500/15 text-red-400 border-red-500/20'}`}>
//                           {product.status}
//                         </span>
//                       </td>
//                       <td className="px-4 py-4">
//                         <div className="flex items-center gap-2">
//                           <button
//                             onClick={() => openEdit(product)}
//                             className="p-1.5 rounded-lg text-white/40 hover:text-secondary hover:bg-secondary/10 transition-all"
//                             title="Edit"
//                           >
//                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
//                             </svg>
//                           </button>
//                           <button
//                             onClick={() => setDeleteConfirm(product.id)}
//                             className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
//                             title="Delete"
//                           >
//                             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                               <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                             </svg>
//                           </button>
//                         </div>
//                       </td>
//                     </tr>
//                   ))
//                 )}
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>

//       {/* Add/Edit Modal */}
//       {showModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//           <div className="bg-[#0F1B35] border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl">
//             <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
//               <h2 className="font-display text-lg font-semibold text-white">
//                 {editProduct ? 'Edit Product' : 'Add New Product'}
//               </h2>
//               <button onClick={closeModal} className="text-white/40 hover:text-white transition-colors">
//                 <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                   <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
//                 </svg>
//               </button>
//             </div>
//             <form onSubmit={handleSubmit} className="px-6 py-5 space-y-4">
//               {formError && (
//                 <p className="text-red-400 text-sm bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-2.5">{formError}</p>
//               )}
//               <div>
//                 <label className="block text-white/60 text-xs font-medium mb-1.5">Product Name *</label>
//                 <input
//                   type="text"
//                   name="name"
//                   value={form.name}
//                   onChange={handleFormChange}
//                   placeholder="e.g. Aviator Pro Sunglasses"
//                   className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary/50"
//                 />
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-white/60 text-xs font-medium mb-1.5">Category *</label>
//                   <select
//                     name="category"
//                     value={form.category}
//                     onChange={handleFormChange}
//                     className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary/50"
//                   >
//                     {categories.map((c) => (
//                       <option key={c} value={c} className="bg-[#0F1B35]">{c}</option>
//                     ))}
//                   </select>
//                 </div>
//                 <div>
//                   <label className="block text-white/60 text-xs font-medium mb-1.5">Status</label>
//                   <select
//                     name="status"
//                     value={form.status}
//                     onChange={handleFormChange}
//                     className="w-full bg-white/5 border border-white/10 text-white text-sm rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary/50"
//                   >
//                     <option value="Active" className="bg-[#0F1B35]">Active</option>
//                     <option value="Inactive" className="bg-[#0F1B35]">Inactive</option>
//                   </select>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <label className="block text-white/60 text-xs font-medium mb-1.5">Price (Rs.) *</label>
//                   <input
//                     type="number"
//                     name="price"
//                     value={form.price}
//                     onChange={handleFormChange}
//                     placeholder="e.g. 4500"
//                     min="0"
//                     className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary/50"
//                   />
//                 </div>
//                 <div>
//                   <label className="block text-white/60 text-xs font-medium mb-1.5">Stock Qty *</label>
//                   <input
//                     type="number"
//                     name="stock"
//                     value={form.stock}
//                     onChange={handleFormChange}
//                     placeholder="e.g. 25"
//                     min="0"
//                     className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary/50"
//                   />
//                 </div>
//               </div>
//               <div>
//                 <label className="block text-white/60 text-xs font-medium mb-1.5">Description</label>
//                 <textarea
//                   name="description"
//                   value={form.description}
//                   onChange={handleFormChange}
//                   placeholder="Short product description..."
//                   rows={3}
//                   className="w-full bg-white/5 border border-white/10 text-white text-sm placeholder-white/25 rounded-xl px-4 py-2.5 focus:outline-none focus:border-secondary/50 resize-none"
//                 />
//               </div>
//               <div className="flex gap-3 pt-2">
//                 <button
//                   type="button"
//                   onClick={closeModal}
//                   className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 transition-colors"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="flex-1 px-4 py-2.5 rounded-xl bg-secondary text-primary text-sm font-semibold hover:bg-secondary/90 transition-colors"
//                 >
//                   {editProduct ? 'Save Changes' : 'Add Product'}
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Delete Confirm Modal */}
//       {deleteConfirm && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
//           <div className="bg-[#0F1B35] border border-white/10 rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center">
//             <div className="w-12 h-12 bg-red-500/15 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
//               <svg className="w-6 h-6 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
//                 <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//               </svg>
//             </div>
//             <h3 className="font-display text-lg font-semibold text-white mb-2">Delete Product?</h3>
//             <p className="text-white/40 text-sm mb-6">This action cannot be undone. The product will be permanently removed.</p>
//             <div className="flex gap-3">
//               <button
//                 onClick={() => setDeleteConfirm(null)}
//                 className="flex-1 px-4 py-2.5 rounded-xl border border-white/10 text-white/60 text-sm font-medium hover:bg-white/5 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={() => handleDelete(deleteConfirm)}
//                 className="flex-1 px-4 py-2.5 rounded-xl bg-red-500 text-white text-sm font-semibold hover:bg-red-600 transition-colors"
//               >
//                 Delete
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </AdminLayoutWrapper>
//   );
// }


//2nd
'use client';

import React, { useState, useEffect } from 'react';
import AdminLayoutWrapper from '../components/AdminLayoutWrapper';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { IProductData } from '@/lib/store/admin/product/product-slice-type';
import { createProduct, deleteProduct, fetchAllProducts, updateProduct } from '@/lib/store/admin/product/prodluct-slice';
import AddProductModal from './components/AddProductModal';
import UpdateProductModal from './components/UpdateProductModal';
import DeleteProductModal from './components/DeleteProductModal';


export default function AdminProductsPage() {
  const dispatch = useAppDispatch();
  const { products, status } = useAppSelector((state) => state.productSlice);
  const [search, setSearch] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editProduct, setEditProduct] = useState<IProductData | null>(null);
  const [deleteProductId, setDeleteProductId] = useState<string | null>(null);

  // Fetch products on mount
  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const categories: IProductData['category'][] = ['Sunglasses', 'Prescription', 'Designer'];

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  // Open Add Modal
  const openAdd = () => setShowAddModal(true);

  // Open Edit Modal
  const openEdit = (product: IProductData) => setEditProduct(product);

  // Close Modals
  const closeAdd = () => setShowAddModal(false);
  const closeEdit = () => setEditProduct(null);
  const closeDelete = () => setDeleteProductId(null);

const handleAddSubmit = (data: IProductData, file?: File) => {
  const formData = new FormData();

  Object.entries(data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (typeof value === 'object') {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  if (file) {
    formData.append('image', file); // 👈 must match backend field name
  }

  dispatch(createProduct(formData as any)); // 👈 send FormData
  closeAdd();
};

  // Handle Update
  const handleUpdateSubmit = (data: IProductData) => {
    if (editProduct?.id) {
      dispatch(updateProduct(editProduct.id, data));
      closeEdit();
    }
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
    closeDelete();
  };

  return (
    <AdminLayoutWrapper>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-white">Products</h1>
            <p className="text-white/40 text-sm mt-1">Manage your product catalog</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-secondary text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/90 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Products', value: products.length, color: 'text-blue-400', bg: 'bg-blue-500/10 border-blue-500/15' },
            { label: 'Featured', value: products.filter((p) => p.badge === 'Bestseller').length, color: 'text-green-400', bg: 'bg-green-500/10 border-green-500/15' },
          ].map((stat) => (
            <div key={stat.label} className={`bg-[#16213E] border ${stat.bg} rounded-2xl p-5`}>
              <p className="text-white/40 text-xs font-medium">{stat.label}</p>
              <p className={`text-3xl font-bold ${stat.color} mt-1`}>{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-[#16213E] border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/8">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">All Products</h2>
              <p className="text-white/40 text-xs mt-0.5">{filtered.length} products found</p>
            </div>
            <div className="relative">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 rounded-xl pl-9 pr-4 py-2 focus:outline-none focus:border-secondary/50 w-56"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Image</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Price</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-white/30 text-sm">No products found.</td>
                  </tr>
                ) : (
                  filtered.map((product) => (
                    <tr key={product.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4"><span className="text-secondary text-sm font-mono font-medium"><img
                    src={
                      typeof product.image === "string" ? product.image : ""
                    }
                    alt={product.name}
                    className="w-10 h-10 object-cover rounded-md shadow-sm border border-gray-200"
                  /></span></td>
                      <td className="px-4 py-4">
                        <p className="text-white text-sm font-medium">{product.name}</p>
                      </td>
                      <td className="px-4 py-4 hidden md:table-cell">
                        <span className="text-white/60 text-xs bg-white/6 px-2.5 py-1 rounded-lg">{product.category}</span>
                      </td>
                      <td className="px-4 py-4"><span className="text-white text-sm font-semibold">Rs. {product.price.toLocaleString()}</span></td>
                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => openEdit(product)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-secondary hover:bg-secondary/10 transition-all"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteProductId(product.id!)}
                            className="p-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals */}
      {showAddModal && <AddProductModal onClose={closeAdd} onSubmit={handleAddSubmit} />}
      {editProduct && (
        <UpdateProductModal
          product={editProduct}
          onClose={closeEdit}
          onUpdate={(data, file) => {
          if (!editProduct?.id) return;

          const formData = new FormData();

          Object.entries(data).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              if (typeof value === 'object') {
                formData.append(key, JSON.stringify(value));
              } else {
                formData.append(key, String(value));
              }
            }
          });

          if (file) {
            formData.append('image', file); // 👈 must match backend
          }

          dispatch(updateProduct(editProduct.id, formData as any));
          closeEdit();
        }}
        />
      )}      
    {deleteProductId && <DeleteProductModal id={deleteProductId} onClose={closeDelete} onDelete={handleDelete} />}
    </AdminLayoutWrapper>
  );
}