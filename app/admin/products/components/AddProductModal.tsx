'use client';

import React, { useState } from 'react';
import { IProductData } from '@/lib/store/admin/product/product-slice-type';

interface Props {
  onClose: () => void;
  onSubmit: (data: IProductData, file?: File) => void;
}

const categories: IProductData['category'][] = ["Sunglasses", "Prescription", "Designer"];

export default function AddProductModal({ onClose, onSubmit }: Props) {
  const [form, setForm] = useState<IProductData>({
    name: '',
    brand: null,
    category: "Sunglasses",
    description: '',
    price: 0,
    originalPrice: null,
    badge: null,
    image: '',
    alt: null,
    rating: 0,
    reviews: 0,
    features: [],
    frameDetails: []
  });

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (['rating', 'reviews', 'price', 'originalPrice'].includes(name)) {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else if (name === 'features') {
      setForm(prev => ({ ...prev, features: value.split(',').map(f => f.trim()) }));
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

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();

  if (!form.name.trim()) return setError('Product name is required.');
  if (!form.price || form.price <= 0) return setError('Enter valid price.');

  onSubmit(form, file || undefined);
};

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0F1B35] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <h2 className="font-display text-lg font-semibold text-white">Add Product</h2>
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
              <input type="number" name="reviews" value={form.reviews} onChange={handleChange} min={0}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-white/60 mb-1">Badge</label>
              <input type="text" name="badge" value={form.badge || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
          </div>

          {/* Row 4: Description */}
          <div>
            <label className="block text-white/60 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
          </div>

          {/* Row 5: Image & Alt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Image</label>
              <input type="file" name='image' onChange={handleFileChange} className="w-full text-white/70 text-sm" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Alt text</label>
              <input type="text" name="alt" value={form.alt || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2" />
            </div>
          </div>

          {/* Row 6: Features & FrameDetails */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Features (comma-separated)</label>
              <textarea
                name="features"
                value={form.features?.join(', ') || ''}
                onChange={handleChange}
                rows={2}
                onFocus={(e) => e.currentTarget.rows = 5}   // enlarge on focus
                onBlur={(e) => e.currentTarget.rows = 2}    // shrink back on blur
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Frame Details (label:value)</label>
              <textarea
                name="frameDetails"
                value={form.frameDetails?.map(f => `${f.label}:${f.value}`).join(', ') || ''}
                onChange={handleChange}
                rows={2}
                onFocus={(e) => e.currentTarget.rows = 5}   // enlarge on focus
                onBlur={(e) => e.currentTarget.rows = 2}    // shrink back on blur
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 transition-all duration-200"
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-3 py-2 rounded-xl border border-white/10 text-white/60 text-sm">Cancel</button>
            <button type="submit" className="flex-1 px-3 py-2 rounded-xl bg-secondary text-primary text-sm font-semibold">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}