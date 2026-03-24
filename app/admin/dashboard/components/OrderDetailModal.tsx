'use client';

import React, { useEffect, useState } from 'react';
import { OrderStatus } from '@/lib/global/type';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { updateOrderStatus } from '@/lib/store/check-out/check-out-slice';

export interface Order {
  id: string;
  firstName: string;
  lastName: string;
  whatsappNumber: string;
  email: string;
  deliveryAddress: string;
  paymentMethod: string;
  totalAmount: number;
  orderStatus: OrderStatus;
  paymentProof?: string;
  createdAt: string;
  OrderItems: {
    id: string;
    productName: string;
    price: number;
    quantity: number;
    image: string;
  }[];
}

interface OrderDetailModalProps {
  order: Order | null;
  onClose: () => void;
  onStatusUpdate: (orderId: string, status: OrderStatus) => void;
}

export default function OrderDetailModal({ order, onClose, onStatusUpdate }: OrderDetailModalProps) {
  const dispatch=useAppDispatch()
  const [selectedStatus, setSelectedStatus] = useState<OrderStatus>(order?.orderStatus || OrderStatus.PENDING);
  const [saving, setSaving] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  if (!order) return null;

  // const handleStatusSave = () => {
  //   setSaving(true);
  //   // Simulate API delay
  //   setTimeout(() => {
  //     onStatusUpdate(order.id, selectedStatus);
  //     setSaving(false);
  //   }, 600);
  // };
  const handleStatusSave = async () => {
  if (!order) return;

  setSaving(true);

  try {
    const res = await dispatch(
          updateOrderStatus(order.id, selectedStatus)
        );

        // ✅ update parent UI (important)
        onStatusUpdate(order.id, selectedStatus);

        // ✅ optional: toast
        // toast.success("Order status updated!");

      } catch (error) {
        console.error("Update failed", error);
        // toast.error("Failed to update order");
      } finally {
        setSaving(false);
      }
    };

  const statusColors: Record<string, string> = {
    [OrderStatus.PENDING]: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
    [OrderStatus.CONFIRMED]: 'bg-green-500/15 text-green-400 border-green-500/20',
    [OrderStatus.DELIVERED]: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
    [OrderStatus.CANCELLED]: 'bg-red-500/15 text-red-400 border-red-500/20',
  };

  useEffect(() => {
  if (order) {
    setSelectedStatus(order.orderStatus);
  }
}, [order]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-[#16213E] border border-white/10 rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
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
            <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${statusColors[order.orderStatus]}`}>
              {order.orderStatus.toUpperCase()}
            </span>
            <span className="text-white/30 text-xs">
              {new Date(order.createdAt).toLocaleDateString()}
            </span>
          </div>

          {/* Customer Info */}
          <div className="bg-white/4 rounded-2xl p-5 space-y-3">
            <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Customer Information</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-xs mb-1">Full Name</p>
                <p className="text-white text-sm font-medium">{order.firstName} {order.lastName}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Phone (WhatsApp)</p>
                <p className="text-white text-sm font-medium">{order.whatsappNumber}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Email</p>
                <p className="text-white text-sm font-medium">{order.email || '—'}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Delivery Address</p>
                <p className="text-white text-sm font-medium">{order.deliveryAddress}</p>
              </div>
            </div>
          </div>

          {/* Order Items Section */}
          <div className="bg-white/4 rounded-2xl p-5 space-y-3">
            <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Order Items</h3>
            <div className="space-y-4">
              {order.OrderItems?.map((item) => (
                <div key={item.id} className="flex items-center justify-between border-b border-white/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex items-center gap-3">
                    <img src={item.image} alt={item.productName} className="w-12 h-12 rounded-lg object-cover border border-white/10" />
                    <div>
                      <p className="text-white text-sm font-medium">{item.productName}</p>
                      <p className="text-white/40 text-xs">Qty: {item.quantity} × Rs. {item.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <p className="text-white text-sm font-semibold">Rs. {(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>

            <div className="pt-4 mt-2 border-t border-white/5 grid grid-cols-2 gap-4">
              <div>
                <p className="text-white/40 text-xs mb-1">Payment Method</p>
                <p className="text-white text-sm font-medium uppercase">{order.paymentMethod.replace('_', ' ')}</p>
              </div>
              <div>
                <p className="text-white/40 text-xs mb-1">Total Amount Paid</p>
                <p className="text-secondary text-lg font-bold">Rs. {order.totalAmount.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Payment Proof Section */}
          {order.paymentProof && (
            <div className="bg-white/4 rounded-2xl p-5">
              <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-4">
                Payment Proof
              </h3>
              
              {/* Thumbnail Trigger */}
              <button 
                onClick={() => setIsZoomed(true)}
                className="inline-block group relative cursor-zoom-in"
              >
                <img 
                  src={order.paymentProof} 
                  alt="QR Payment Proof" 
                  className="w-32 h-40 object-cover rounded-xl border border-white/10 group-hover:opacity-50 transition-all"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="text-white text-xs bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/10">
                    Click to Zoom
                  </span>
                </div>
              </button>

              {/* Zoom Overlay (Pop-up) */}
              {isZoomed && (
                <div 
                  className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 backdrop-blur-md p-4 animate-in fade-in duration-300"
                  onClick={() => setIsZoomed(false)}
                >
                  <button 
                    className="absolute top-6 right-6 text-white/70 hover:text-white bg-white/10 p-3 rounded-full transition-colors"
                    onClick={() => setIsZoomed(false)}
                  >
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                  
                  <img 
                    src={order.paymentProof} 
                    alt="Full Payment Proof" 
                    className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                  />
                  
                  <p className="absolute bottom-6 text-white/40 text-sm">Click anywhere to close</p>
                </div>
              )}
            </div>
          )}

          {/* Status Update */}
          <div className="bg-white/4 rounded-2xl p-5">
            <h3 className="text-secondary text-xs font-semibold uppercase tracking-wider mb-4">Update Status</h3>
            <div className="flex items-center gap-3">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value as OrderStatus)}
                className="flex-1 bg-white/6 border border-white/10 rounded-xl px-4 py-2.5 text-orange-800 text-sm focus:outline-none focus:border-secondary/50 transition-all"
              >
                <option value={OrderStatus.PENDING} className="bg-[#16213E]">Pending</option>
                <option value={OrderStatus.CONFIRMED} className="bg-[#16213E]">Confirmed</option>
                <option value={OrderStatus.DELIVERED} className="bg-[#16213E]">Delivered</option>
                <option value={OrderStatus.CANCELLED} className="bg-[#16213E]">Cancelled</option>
              </select>
              <button
                onClick={handleStatusSave}
                disabled={saving || selectedStatus === order.orderStatus}
                className="bg-secondary text-primary font-bold px-5 py-2.5 text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap transition-all hover:scale-[1.02]"
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
