'use client';

import { IProductData } from '@/lib/store/admin/product/product-slice-type';
import React, { useState, useEffect } from 'react';

interface Props {
  product: IProductData;
  onClose: () => void;
  onUpdate: (data: IProductData, file?: File) => void;
}

const categories: IProductData['category'][] = ["Sunglasses", "Prescription", "Designer"];

export default function UpdateProductModal({ product, onClose, onUpdate }: Props) {
  const [form, setForm] = useState<IProductData>(product);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  // Preview URL for image
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    typeof product.image === 'string' ? product.image : undefined
  );

  // Update form if product changes
  useEffect(() => {
    setForm(product);
  }, [product]);


  // Update preview when file changes
  // useEffect(() => {
  //   if (file) {
  //     const url = URL.createObjectURL(file);
  //     setPreviewUrl(url);
  //     return () => URL.revokeObjectURL(url); // Cleanup old object URL
  //   } else {
  //     setPreviewUrl(typeof form.image === 'string' ? form.image : undefined);
  //   }
  // }, [file, form.image]);
  useEffect(() => {
  const textareas = document.querySelectorAll('textarea');
  textareas.forEach((ta) => {
    ta.style.height = 'auto';
    ta.style.height = ta.scrollHeight + 'px';
  });
}, [form]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (['rating', 'reviews', 'price', 'originalPrice'].includes(name)) {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else if (name === 'features') {
      setForm(prev => ({
        ...prev,
        features: value.split(',').map(f => f.trim())
      }));
    } else if (name === 'frameDetails') {
      setForm(prev => ({
        ...prev,
        frameDetails: value.split(',').map(f => {
          const [label, val] = f.split(':');
          return { label: label?.trim() || '', value: val?.trim() || '' };
        })
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Product name is required.');
    if (!form.price || form.price <= 0) return setError('Enter valid price.');

    onUpdate(form, file || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0F1B35] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-auto max-h-[90vh]">

        {/* Header */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <h2 className="font-display text-lg font-semibold text-white">Update Product</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-3 text-sm">
          {error && <p className="text-red-400">{error}</p>}

          {/* Row 1: name & brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Brand</label>
              <input type="text" name="brand" value={form.brand || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
          </div>

          {/* Row 2: price, originalPrice, rating */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Price *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Original Price</label>
              <input type="number" name="originalPrice" value={form.originalPrice || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Rating</label>
              <input type="number" name="rating" value={form.rating} onChange={handleChange} step={0.1} min={0} max={5}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
          </div>

          {/* Row 3: reviews, category, badge */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Reviews</label>
              <input type="number" name="reviews" value={form.reviews} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2">
                {categories.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-white/60 mb-1">Badge</label>
              <input type="text" name="badge" value={form.badge || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-white/60 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
          </div>

          {/* Image & Alt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Image</label>
              <input type="file"
                onChange={(e) => {
                  if (e.target.files?.[0]) setFile(e.target.files[0]);
                }}
                className="w-full text-white/70 text-sm"
              />
              {/* Preview */}
              {previewUrl && (
                <img
                  src={previewUrl}
                  alt={form.alt || 'Product Image'}
                  className="mt-2 w-24 h-24 object-cover rounded-lg border border-white/10"
                />
              )}
            </div>
            <div>
              <label className="block text-white/60 mb-1">Alt text</label>
              <input type="text" name="alt" value={form.alt || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
          </div>

          {/* Features & FrameDetails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="block text-white/60 mb-1">Features</label>
                <textarea
                  name="features"
                  value={Array.isArray(form.features) ? form.features.join(', ') : ''}
                  onChange={(e) => {
                    handleChange(e);

                    // auto-resize
                    e.currentTarget.style.height = 'auto';
                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                  }}
                  rows={2}
                  className="w-full resize-none overflow-hidden bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 transition-all duration-200"
                />
              </div>

              <div>
                <label className="block text-white/60 mb-1">Frame Details</label>
                <textarea
                  name="frameDetails"
                  value={
                    Array.isArray(form.frameDetails)
                      ? form.frameDetails.map(f => `${f.label}:${f.value}`).join(', ')
                      : ''
                  }
                  onChange={(e) => {
                    handleChange(e);

                    // auto-resize
                    e.currentTarget.style.height = 'auto';
                    e.currentTarget.style.height = e.currentTarget.scrollHeight + 'px';
                  }}
                  rows={2}
                  className="w-full resize-none overflow-hidden bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 transition-all duration-200"
                />
              </div>
            </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose}
              className="flex-1 px-3 py-2 rounded-xl border border-white/10 text-white/60 text-sm">
              Cancel
            </button>
            <button type="submit"
              className="flex-1 px-3 py-2 rounded-xl bg-secondary text-primary text-sm font-semibold">
              Update Product
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
