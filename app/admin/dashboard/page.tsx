'use client';

import React, { useState } from 'react';
import AdminLayoutWrapper from '../components/AdminLayoutWrapper';
import OrderDetailModal, { Order } from '../components/OrderDetailModal';

const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    customerName: 'Aarav Sharma',
    phone: '9841234567',
    email: 'aarav@gmail.com',
    address: 'Kathmandu, Baneshwor',
    product: 'Aviator Pro Sunglasses',
    productPrice: 4500,
    paymentMethod: 'COD',
    totalAmount: 4750,
    status: 'Pending',
    createdAt: '2026-03-10 09:32',
  },
  {
    id: 'ORD-002',
    customerName: 'Priya Thapa',
    phone: '9812345678',
    email: '',
    address: 'Lalitpur, Patan',
    product: 'Classic Wayfarer Frame',
    productPrice: 3200,
    paymentMethod: 'QR Scan',
    totalAmount: 3450,
    status: 'Approved',
    createdAt: '2026-03-10 11:15',
  },
  {
    id: 'ORD-003',
    customerName: 'Bikash Gurung',
    phone: '9867890123',
    email: 'bikash@outlook.com',
    address: 'Bhaktapur, Suryabinayak',
    product: 'Blue Light Blocker Glasses',
    productPrice: 2800,
    paymentMethod: 'Visit and Pay',
    totalAmount: 2800,
    status: 'Pending',
    createdAt: '2026-03-11 14:20',
  },
  {
    id: 'ORD-004',
    customerName: 'Sita Rai',
    phone: '9823456789',
    email: 'sita.rai@gmail.com',
    address: 'Pokhara, Lakeside',
    product: 'Round Vintage Frames',
    productPrice: 3800,
    paymentMethod: 'COD',
    totalAmount: 4050,
    status: 'Rejected',
    createdAt: '2026-03-11 16:45',
  },
  {
    id: 'ORD-005',
    customerName: 'Rohan Magar',
    phone: '9856789012',
    email: '',
    address: 'Chitwan, Bharatpur',
    product: 'Sports Wrap Sunglasses',
    productPrice: 5200,
    paymentMethod: 'QR Scan',
    totalAmount: 5450,
    status: 'Approved',
    createdAt: '2026-03-12 08:10',
  },
  {
    id: 'ORD-006',
    customerName: 'Anita Shrestha',
    phone: '9834567890',
    email: 'anita@yahoo.com',
    address: 'Kathmandu, Thamel',
    product: 'Cat Eye Fashion Frames',
    productPrice: 4100,
    paymentMethod: 'Visit and Pay',
    totalAmount: 4100,
    status: 'Pending',
    createdAt: '2026-03-12 10:55',
  },
];

const statusColors: Record<Order['status'], string> = {
  Pending: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  Approved: 'bg-green-500/15 text-green-400 border-green-500/20',
  Rejected: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function AdminDashboardPage() {
  const [orders, setOrders] = useState<Order[]>(mockOrders);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | Order['status']>('All');

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o) => o.status === 'Pending').length;
  const approvedOrders = orders.filter((o) => o.status === 'Approved').length;
  const rejectedOrders = orders.filter((o) => o.status === 'Rejected').length;

  const filteredOrders = statusFilter === 'All' ? orders : orders.filter((o) => o.status === statusFilter);

  const handleStatusUpdate = (orderId: string, status: Order['status']) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
    setSelectedOrder((prev) => (prev?.id === orderId ? { ...prev, status } : prev));
  };

  const stats = [
    {
      label: 'Total Orders',
      value: totalOrders,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      color: 'text-blue-400',
      bg: 'bg-blue-500/10 border-blue-500/15',
    },
    {
      label: 'Pending',
      value: pendingOrders,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10 border-yellow-500/15',
    },
    {
      label: 'Approved',
      value: approvedOrders,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/15',
    },
    {
      label: 'Rejected',
      value: rejectedOrders,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-red-400',
      bg: 'bg-red-500/10 border-red-500/15',
    },
  ];

  return (
    <AdminLayoutWrapper>
      <div className="space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className={`bg-[#16213E] border ${stat.bg} rounded-2xl p-5 flex flex-col gap-3`}
            >
              <div className={`${stat.color} ${stat.bg} w-10 h-10 rounded-xl flex items-center justify-center border`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-white/40 text-xs font-medium">{stat.label}</p>
                <p className={`text-3xl font-bold ${stat.color} mt-0.5`}>{stat.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Orders Table */}
        <div className="bg-[#16213E] border border-white/8 rounded-2xl overflow-hidden">
          {/* Table Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 px-6 py-5 border-b border-white/8">
            <div>
              <h2 className="font-display text-lg font-semibold text-white">All Orders</h2>
              <p className="text-white/40 text-xs mt-0.5">{filteredOrders.length} orders found</p>
            </div>
            {/* Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              {(['All', 'Pending', 'Approved', 'Rejected'] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    statusFilter === f
                      ? 'bg-secondary text-primary' :'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Order ID</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Customer</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Product</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Payment</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Amount</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="text-left px-4 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <span className="text-secondary text-sm font-mono font-medium">{order.id}</span>
                    </td>
                    <td className="px-4 py-4">
                      <p className="text-white text-sm font-medium">{order.customerName}</p>
                      <p className="text-white/30 text-xs mt-0.5">{order.createdAt}</p>
                    </td>
                    <td className="px-4 py-4 hidden md:table-cell">
                      <span className="text-white/60 text-sm">{order.phone}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-white/70 text-sm">{order.product}</span>
                    </td>
                    <td className="px-4 py-4 hidden lg:table-cell">
                      <span className="text-white/60 text-xs bg-white/6 px-2.5 py-1 rounded-lg">{order.paymentMethod}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-white text-sm font-semibold">Rs. {order.totalAmount.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[order.status]}`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-secondary hover:text-secondary/80 text-xs font-medium bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-lg transition-all"
                      >
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {filteredOrders.length === 0 && (
              <div className="text-center py-16">
                <p className="text-white/30 text-sm">No orders found for this filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
    </AdminLayoutWrapper>
  );
}
