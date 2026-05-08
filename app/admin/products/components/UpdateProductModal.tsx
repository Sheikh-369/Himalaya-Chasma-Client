'use client';

import { IProductData } from '@/lib/store/admin/product/product-slice-type';
import React, { useState, useEffect } from 'react';

interface Props {
  product: IProductData;
  onClose: () => void;
  onUpdate: (data: IProductData, file?: File) => void;
}

const categories: IProductData['category'][] = ["Sunglasses", "Prescription", "Designer"];
const FRAME_LABELS = ["Frame Material", "Lens Width", "Bridge Width", "Temple Length", "Lens Type", "Gender"];

export default function UpdateProductModal({ product, onClose, onUpdate }: Props) {
  const sanitizeFrameData = (p: IProductData) => {
    // 1. Ensure features is an array (fixes the .join error)
    const features = Array.isArray(p.features) 
      ? p.features 
      : typeof p.features === 'string' 
        ? (p.features as string).split(',').filter(Boolean) 
        : [];

    // 2. Setup Frame Details
    const frameDetails = FRAME_LABELS.map(label => {
      const existing = Array.isArray(p.frameDetails) 
        ? p.frameDetails.find(d => d.label.toLowerCase() === label.toLowerCase()) 
        : null;
      return { label, value: existing ? existing.value : '' };
    });

    return { ...p, features, frameDetails };
  };

  const [form, setForm] = useState<IProductData>(() => sanitizeFrameData(product));
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | undefined>(
    typeof product.image === 'string' ? product.image : undefined
  );

  useEffect(() => {
    setForm(sanitizeFrameData(product));
  }, [product.id, product.name]); 

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    setForm(prev => {
      let newValue: any = value;
      if (['rating', 'reviews', 'price', 'originalPrice'].includes(name)) {
        newValue = Number(value);
      } else if (name === 'features') {
        // We keep it as an array of strings
        newValue = value.split(',');
      }
      return { ...prev, [name]: newValue };
    });
  };

  const handleFrameChange = (index: number, value: string) => {
    setForm(prev => {
      const newDetails = [...(prev.frameDetails || [])];
      if (newDetails[index]) {
        newDetails[index] = { ...newDetails[index], value };
      }
      return { ...prev, frameDetails: newDetails };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return setError('Product name is required.');
    
    const finalData = {
      ...form,
      features: (form.features || []).map(f => String(f).trim()).filter(f => f !== "")
    };

    onUpdate(finalData, file || undefined);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 bg-black/70 backdrop-blur-sm">
      <div className="bg-[#0F1B35] border border-white/10 rounded-2xl w-full max-w-xl shadow-2xl overflow-auto max-h-[90vh]">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/8">
          <h2 className="font-display text-lg font-semibold text-white">Update Product</h2>
          <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="px-5 py-4 space-y-4 text-sm">
          {error && <p className="text-red-400 bg-red-400/10 p-2 rounded-lg text-center">{error}</p>}

          {/* Row 1: name & brand */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/60 mb-1">Name *</label>
              <input type="text" name="name" value={form.name} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 outline-none focus:border-secondary/50" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Brand</label>
              <input type="text" name="brand" value={form.brand || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 outline-none focus:border-secondary/50" />
            </div>
          </div>

          {/* Row 2: Price/Rating */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div>
              <label className="block text-white/60 mb-1">Price *</label>
              <input type="number" name="price" value={form.price} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 outline-none" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Original Price</label>
              <input type="number" name="originalPrice" value={form.originalPrice || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 outline-none" />
            </div>
            <div>
              <label className="block text-white/60 mb-1">Rating</label>
              <input type="number" name="rating" value={form.rating} onChange={handleChange} step={0.1} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 outline-none" />
            </div>
          </div>

          {/* Image & Alt */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-white/60 mb-1">Image</label>
              <input type="file" onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                    setPreviewUrl(URL.createObjectURL(e.target.files[0]));
                  }
                }} className="w-full text-white/70 text-xs" />
              {previewUrl && <img src={previewUrl} alt="Preview" className="mt-2 w-20 h-20 object-cover rounded-lg border border-white/10" />}
            </div>
            <div>
              <label className="block text-white/60 mb-1">Alt text</label>
              <input type="text" name="alt" value={form.alt || ''} onChange={handleChange} className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 outline-none focus:border-secondary/50" />
            </div>
          </div>

          {/* Features - THE FIX IS HERE */}
          <div>
            <label className="block text-white/60 mb-1">Features (comma-separated)</label>
            <textarea
              name="features"
              // ✅ Force array check before joining to prevent TypeError
              value={Array.isArray(form.features) ? form.features.join(',') : ''}
              onChange={handleChange}
              rows={3}
              className="w-full bg-white/5 border border-white/10 text-white rounded-xl px-3 py-2 transition-all focus:outline-none focus:border-secondary/50"
            />
          </div>

          {/* Frame Specs */}
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <label className="block text-white/60 mb-3 font-semibold">Frame Specifications</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
              {form.frameDetails?.map((detail, idx) => (
                <div key={detail.label} className="space-y-1">
                  <span className="text-[10px] uppercase tracking-wider text-white/40 ml-1">{detail.label}</span>
                  <input
                    type="text"
                    value={detail.value}
                    onChange={(e) => handleFrameChange(idx, e.target.value)}
                    className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-3 py-1.5 text-xs focus:border-secondary/50 outline-none"
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="flex gap-2 pt-2">
            <button type="button" onClick={onClose} className="flex-1 px-3 py-2 rounded-xl border border-white/10 text-white/60 hover:bg-white/5 transition-colors">Cancel</button>
            <button type="submit" className="flex-1 px-3 py-2 rounded-xl bg-secondary text-primary font-semibold hover:opacity-90 transition-opacity">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}