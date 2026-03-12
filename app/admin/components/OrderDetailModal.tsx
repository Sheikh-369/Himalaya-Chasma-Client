'use client';

import React, { useState } from 'react';

export interface Order {
  id: string;
  customerName: string;
  phone: string;
  email: string;
  address: string;
  product: string;
  productPrice: number;
  paymentMethod: 'COD' | 'QR Scan' | 'Visit and Pay';
  totalAmount: number;
  status: 'Pending' | 'Approved' | 'Rejected';
  createdAt: string;
}

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onStatusUpdate: (orderId: string, status: Order['status']) => void;
}

export default function OrderDetailModal({ order, onClose, onStatusUpdate }: OrderDetailModalProps) {
  const [selectedStatus, setSelectedStatus] = useState<Order['status']>(order?.status || 'Pending');
  const [saving, setSaving] = useState(false);

  if (!order) return null;

  const handleStatusSave = () => {
    setSaving(true);
    setTimeout(() => {
      onStatusUpdate(order.id, selectedStatus);
      setSaving(false);
    }, 600);
  };

  const statusColors: Record<Order['status'], string> = {
    Pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    Approved: 'bg-green-500/15 text-green-400 border-green-500/20',
    Rejected: 'bg-red-500/15 text-red-400 border-red-500/20',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#16213E] border border-white/10 rounded-3xl shadow-deep overflow-hidden max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div>
            <h2 className="font-display text-xl font-semibold text-white">Order Details</h2>
            <p className="text-white/40 text-sm mt-0.5">#{order.id}</p>
          </div>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors p-2 rounded-xl hover:bg-white/6"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto flex-1 px-6 py-6 space-y-6">
          {/* Status badge */}
          <div className="flex items-center gap-3">
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
              {order.status}
            </span>
            <span className="text-white/30 text-xs">{order.createdAt}</span>
          </div>

          {/* Customer Info */}
          <div className="bg-white/4 rounded-2xl p-5 space-y-3">
            <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-xs mb-1">Full Name</p>
                <p className="text-white text-sm font-medium">{order.customerName}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Phone</p>
                <p className="text-white text-sm font-medium">{order.phone}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Email</p>
                <p className="text-white text-sm font-medium">{order.email || '—'}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Address</p>
                <p className="text-white text-sm font-medium">{order.address}</p>
              </div>
            </div>
          </div>

          {/* Order Info */}
          <div className="bg-white/4 rounded-2xl p-5 space-y-3">
            <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Order Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-xs mb-1">Product</p>
                <p className="text-white text-sm font-medium">{order.product}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Payment Method</p>
                <p className="text-white text-sm font-medium">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Product Price</p>
                <p className="text-white text-sm font-medium">Rs. {order.productPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Total Amount</p>
                <p className="text-secondary text-sm font-bold">Rs. {order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
            {order.paymentMethod === 'COD' && (
              <p className="text-yellow-400/70 text-xs mt-2">* Includes Rs. 250 delivery charge (COD)</p>
            )}
            {order.paymentMethod === 'QR Scan' && (
              <p className="text-blue-400/70 text-xs mt-2">* Includes Rs. 250 delivery charge (QR payment)</p>
            )}
            {order.paymentMethod === 'Visit and Pay' && (
              <p className="text-orange-400/70 text-xs mt-2">* Payment pending — customer will pay in store</p>
            )}
          </div>

          {/* Status Update */}
          <div className="bg-white/4 rounded-2xl p-5">
            <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Update Status</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as Order['status'])}
                className="flex-1 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-white text-sm focus:outline-none focus:border-secondary/50 transition-all"
              >
                <option value="Pending" className="bg-[#16213E]">Pending</option>
                <option value="Approved" className="bg-[#16213E]">Approved</option>
                <option value="Rejected" className="bg-[#16213E]">Rejected</option>
              </select>
              <button
                onClick={handleStatusSave}
                disabled={saving || selectedStatus === order.status}
                className="btn-primary px-5 py-2.5 text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
              >
                {saving ? 'Saving...' : 'Save Status'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
