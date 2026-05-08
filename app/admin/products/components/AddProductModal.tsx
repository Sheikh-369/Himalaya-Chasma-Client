'use client';

import React, { useState } from 'react';
import { IProductData } from '@/lib/store/admin/product/product-slice-type';

interface Props {
  onClose: () => void;
  onSubmit: (data: IProductData, file?: File) => void;
}

const categories: IProductData['category'][] = ["Sunglasses", "Prescription", "Designer"];

const DEFAULT_FRAME_DETAILS = [
  { label: 'Frame Material', value: 'Solid Brass' },
  { label: 'Lens Width', value: '50mm' },
  { label: 'Bridge Width', value: '20mm' },
  { label: 'Temple Length', value: '145mm' },
  { label: 'Lens Type', value: 'Amber Tinted UV400' },
  { label: 'Gender', value: 'Unisex' },
];

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
    frameDetails: DEFAULT_FRAME_DETAILS 
  });

  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (['rating', 'reviews', 'price', 'originalPrice'].includes(name)) {
      setForm(prev => ({ ...prev, [name]: Number(value) }));
    } else if (name === 'features') {
      // ✅ We split by comma but do NOT trim here to allow typing spaces
      setForm(prev => ({ ...prev, features: value.split(',') }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFrameDetailChange = (index: number, newValue: string) => {
    setForm(prev => {
      const updatedDetails = [...(prev.frameDetails || [])];
      updatedDetails[index] = { ...updatedDetails[index], value: newValue };
      return { ...prev, frameDetails: updatedDetails };
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setFile(e.target.files[0]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name.trim()) return setError('Product name is required.');
    if (!form.price || form.price <= 0) return setError('Enter valid price.');

    // ✅ Clean data on submit: trim whitespace and remove empty strings
    const finalData = {
      ...form,
      features: (form.features || [])
        .map(f => f.trim())
        .filter(f => f !== "") 
    };

    onSubmit(finalData, file || undefined);
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
          {error && <p className="text-red-400 bg-red-400/10 p-2 rounded-lg text-center">{error}</p>}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Brand</label>
              <input type="text" name="brand" value={form.brand || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Price *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Original Price</label>
              <input type="number" name="originalPrice" value={form.originalPrice || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Rating</label>
              <input type="number" name="rating" value={form.rating} onChange={handleChange} step={0.1} min={0} max={5}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Reviews</label>
              <input type="number" name="reviews" value={form.reviews} onChange={handleChange} min={0}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Category</label>
              <select name="category" value={form.category} onChange={handleChange}
                className="w-full bg-[#0F1B35] border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50">
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-white/60 mb-1">Badge</label>
              <input type="text" name="badge" value={form.badge || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
          </div>

          <div>
            <label className="block text-white/60 mb-1">Description</label>
            <textarea name="description" value={form.description} onChange={handleChange} rows={2}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            <div>
              <label className="block text-white/60 mb-1">Image</label>
              <input type="file" name='image' onChange={handleFileChange} className="w-full text-white/70 text-sm" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Alt text</label>
              <input type="text" name="alt" value={form.alt || ''} onChange={handleChange}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 focus:outline-none focus:border-secondary/50" />
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-white/60 mb-1">Features (comma-separated)</label>
              <textarea
                name="features"
                // ✅ Changed join to ',' (no space) to prevent auto-spacing issues
                value={form.features?.join(',') || ''}
                onChange={handleChange}
                rows={2}
                className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 transition-all focus:outline-none focus:border-secondary/50"
              />
            </div>

            <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
              <label className="block text-white/60 mb-3 font-semibold">Frame Specifications</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
                {form.frameDetails?.map((detail, idx) => (
                  <div key={detail.label} className="space-y-1">
                    <span className="text-[10px] uppercase tracking-wider text-white/40 ml-1">
                      {detail.label}
                    </span>
                    <input
                      type="text"
                      value={detail.value}
                      onChange={(e) => handleFrameDetailChange(idx, e.target.value)}
                      className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 text-xs focus:border-secondary/50 outline-none transition-colors"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-3 py-2 rounded-xl border border-white/10 text-white/60 text-sm hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-3 py-2 rounded-xl bg-secondary text-primary text-sm font-semibold hover:opacity-90 transition-opacity">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}