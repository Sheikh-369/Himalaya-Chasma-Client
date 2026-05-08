'use client';

import React, { useState, useEffect } from 'react';
import AdminLayoutWrapper from '../components/AdminLayoutWrapper';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { IProductData } from '@/lib/store/admin/product/product-slice-type';
import { createProduct, deleteProduct, fetchAllProducts, updateProduct } from '@/lib/store/admin/product/product-slice';
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

  useEffect(() => {
    dispatch(fetchAllProducts());
  }, [dispatch]);

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  const openAdd = () => setShowAddModal(true);
  const openEdit = (product: IProductData) => setEditProduct(product);
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
    if (file) formData.append('image', file);
    dispatch(createProduct(formData as any));
    closeAdd();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
    closeDelete();
  };

  return (
    <AdminLayoutWrapper>
      <div className="space-y-6 lg:space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl lg:text-3xl font-semibold text-white">Products</h1>
            <p className="text-white/40 text-sm mt-1">Manage your product catalog</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center justify-center gap-2 bg-secondary text-primary px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-secondary/90 transition-colors w-full sm:w-auto"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
            </svg>
            Add Product
          </button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Table Section */}
        <div className="bg-[#16213E] border border-white/8 rounded-2xl overflow-hidden">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 px-4 sm:px-6 py-5 border-b border-white/8">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">All Products</h2>
              <p className="text-white/40 text-xs mt-0.5">{filtered.length} products found</p>
            </div>
            <div className="relative w-full md:w-auto">
              <svg className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35M17 11A6 6 0 105 11a6 6 0 0012 0z" />
              </svg>
              <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="bg-white/5 border border-white/10 text-white text-sm placeholder-white/30 rounded-xl pl-9 pr-4 py-2.5 focus:outline-none focus:border-secondary/50 w-full md:w-64"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-white/6 bg-white/[0.02]">
                  <th className="text-left px-6 py-4 text-white/40 text-xs font-semibold uppercase tracking-wider w-20">Image</th>
                  <th className="text-left px-4 py-4 text-white/40 text-xs font-semibold uppercase tracking-wider">Product</th>
                  <th className="text-left px-4 py-4 text-white/40 text-xs font-semibold uppercase tracking-wider">Category</th>
                  <th className="text-left px-4 py-4 text-white/40 text-xs font-semibold uppercase tracking-wider">Price</th>
                  <th className="text-right px-6 py-4 text-white/40 text-xs font-semibold uppercase tracking-wider">Actions</th>
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
                      <td className="px-6 py-4">
                        <img
                          src={typeof product.image === "string" ? product.image : ""}
                          alt={product.name}
                          className="w-12 h-12 object-cover rounded-lg border border-white/10"
                        />
                      </td>
                      <td className="px-4 py-4">
                        <p className="text-white text-sm font-medium whitespace-nowrap">{product.name}</p>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-white/60 text-[10px] uppercase font-bold tracking-wider bg-white/5 px-2 py-1 rounded-md border border-white/5">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-4 py-4">
                        <span className="text-white text-sm font-semibold whitespace-nowrap">Rs. {product.price.toLocaleString()}</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => openEdit(product)}
                            className="p-2 rounded-lg text-white/40 hover:text-secondary hover:bg-secondary/10 transition-all"
                            title="Edit"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => setDeleteProductId(product.id!)}
                            className="p-2 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
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
            if (file) formData.append('image', file);
            dispatch(updateProduct(editProduct.id, formData as any));
            closeEdit();
          }}
        />
      )}      
      {deleteProductId && <DeleteProductModal id={deleteProductId} onClose={closeDelete} onDelete={handleDelete} />}
    </AdminLayoutWrapper>
  );
}