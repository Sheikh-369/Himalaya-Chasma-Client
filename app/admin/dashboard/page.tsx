"use client"
import React, { useEffect, useState } from 'react';
import AdminLayoutWrapper from '../components/AdminLayoutWrapper';
import OrderDetailModal, { Order } from './components/OrderDetailModal';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { deleteOrderById, fetchAllOrders } from '@/lib/store/order/order-slice';
import { OrderStatus } from '@/lib/global/type';
import DeleteOrderModal from './components/DeleteOrderModal';


const statusColors: Record<string, string> = {
  [OrderStatus.PENDING]: 'bg-yellow-500/15 text-yellow-400 border-yellow-500/20',
  [OrderStatus.CONFIRMED]: 'bg-green-500/15 text-green-400 border-green-500/20',
  [OrderStatus.DELIVERED]: 'bg-blue-500/15 text-blue-400 border-blue-500/20',
  [OrderStatus.CANCELLED]: 'bg-red-500/15 text-red-400 border-red-500/20',
};

export default function AdminDashboardPage() {
  const dispatch = useAppDispatch();
  const { orders, status } = useAppSelector((state) => state.orderSlice);

  useEffect(() => {
    dispatch(fetchAllOrders());
  }, [dispatch]);

  const [selectedOrder, setSelectedOrder] = useState<any | null>(null);
  const [statusFilter, setStatusFilter] = useState<'All' | OrderStatus>('All');

  const totalOrders = orders.length;
  const pendingOrders = orders.filter((o: any) => o.orderStatus === OrderStatus.PENDING).length;
  const confirmedOrders = orders.filter((o: any) => o.orderStatus === OrderStatus.CONFIRMED).length;
  const cancelledOrders = orders.filter((o: any) => o.orderStatus === OrderStatus.CANCELLED).length;

  const filteredOrders = statusFilter === 'All' 
    ? orders 
    : orders.filter((o: any) => o.orderStatus === statusFilter);

  const activeOrders = filteredOrders.filter(
    (o: any) => o.orderStatus !== OrderStatus.DELIVERED
  );

  const deliveredOrders = orders.filter(
    (o: any) => o.orderStatus === OrderStatus.DELIVERED
  );

  const [showDelivered, setShowDelivered] = useState(false);

  const [deleteOrderId, setDeleteOrderId] = useState<string | null>(null);
  const handleDeleteOrder = (id: string) => {
    dispatch(deleteOrderById(id));
    setDeleteOrderId(null); 
  };

  const handleStatusUpdate = (orderId: string, newStatus: any) => {
    dispatch(fetchAllOrders()); 
    setSelectedOrder(null);
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
      label: 'Confirmed',
      value: confirmedOrders,
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      color: 'text-green-400',
      bg: 'bg-green-500/10 border-green-500/15',
    },
    {
      label: 'Cancelled',
      value: cancelledOrders,
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
      <div className="space-y-6 lg:space-y-8">
        {/* Page Header */}
        <div>
          <h1 className="font-display text-2xl lg:text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-white/40 text-sm mt-1">Manage and track all customer orders</p>
        </div>

        {/* Stats Cards - Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Active Orders Section */}
        <div className="bg-[#16213E] border border-white/8 rounded-2xl overflow-hidden">
          {/* Table Header Wrapper */}
          <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 px-6 py-5 border-b border-white/8">
            <div className="flex items-center justify-between xl:justify-start xl:gap-8">
              <div>
                <h2 className="font-display text-lg font-semibold text-white">Active Orders</h2>
                <p className="text-white/40 text-xs mt-0.5">{activeOrders.length} orders found</p>
              </div>
              
              <label className="inline-flex items-center cursor-pointer">
                <span className="mr-2 text-white text-xs">Show Delivered</span>
                <input
                  type="checkbox"
                  checked={showDelivered}
                  onChange={() => setShowDelivered(!showDelivered)}
                  className="hidden peer"
                />
                <span className="w-10 h-5 bg-white/20 rounded-full relative transition-colors
                                after:absolute after:top-0.5 after:left-0.5 after:bg-white after:w-4 after:h-4 after:rounded-full after:shadow-md after:transition-transform
                                peer-checked:bg-secondary
                                peer-checked:after:translate-x-full" />
              </label>
            </div>

            {/* Filter Buttons */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 xl:pb-0 scrollbar-hide">
              {(['All', OrderStatus.PENDING, OrderStatus.CONFIRMED, OrderStatus.CANCELLED]).map((f) => (
                <button
                  key={f}
                  onClick={() => setStatusFilter(f as any)}
                  className={`whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                    statusFilter === f
                      ? 'bg-secondary text-primary' :'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {!showDelivered && (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px]">
                <thead>
                  <tr className="border-b border-white/6">
                    <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Customer</th>
                    <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Phone</th>
                    <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Product</th>
                    <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Payment</th>
                    <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Amount</th>
                    <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Status</th>
                    <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/4">
                  {activeOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-white/2 transition-colors">
                      <td className="px-6 py-4">
                        <p className="text-white text-sm font-medium">{order.firstName} {order.lastName}</p>
                        <p className="text-white/30 text-xs mt-0.5">{order.createdAt}</p>
                      </td>
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-white/60 text-sm">{order.whatsappNumber}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-white/70 text-sm truncate max-w-[150px] block">{order.OrderItems?.[0]?.productName || "No Product"}</span>
                      </td>
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className="text-white/60 text-xs bg-white/6 px-2.5 py-1 rounded-lg">{order.paymentMethod}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="text-white text-sm font-semibold">Rs. {order.totalAmount}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[order.orderStatus]}`}>
                          {order.orderStatus}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2 items-center">
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="text-secondary hover:text-secondary/80 text-xs font-medium bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-lg transition-all"
                          >
                            View
                          </button>

                          <button
                            onClick={() => setDeleteOrderId(order.id)}
                            className="px-3 py-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                            title="Delete"
                          >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {activeOrders.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-white/30 text-sm">No active orders found for this filter.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
      
      {/* Delivered Orders Table */}
      {showDelivered && (
        <div className="bg-[#16213E] border border-white/8 rounded-2xl overflow-hidden mt-6 animate-slide-down">
          <div className="px-6 py-4 border-b border-white/8">
            <h2 className="font-display text-lg font-semibold text-white">Delivered Orders</h2>
            <p className="text-white/40 text-xs mt-0.5">{deliveredOrders.length} delivered orders</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px]">
              <thead>
                <tr className="border-b border-white/6">
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Customer</th>
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden md:table-cell">Phone</th>
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Product</th>
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider hidden lg:table-cell">Payment</th>
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Amount</th>
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Status</th>
                  <th className="text-left px-6 py-3.5 text-white/40 text-xs font-semibold uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/4">
                {deliveredOrders.map((order: any) => (
                  <tr key={order.id} className="hover:bg-white/2 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-white text-sm font-medium">{order.firstName} {order.lastName}</p>
                      <p className="text-white/30 text-xs mt-0.5">{order.createdAt}</p>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-white/60 text-sm">{order.whatsappNumber}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-white/70 text-sm truncate max-w-[150px] block">{order.OrderItems?.[0]?.productName || "No Product"}</span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-white/60 text-xs bg-white/6 px-2.5 py-1 rounded-lg">{order.paymentMethod}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-white text-sm font-semibold">Rs. {order.totalAmount}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold border ${statusColors[order.orderStatus]}`}>
                        {order.orderStatus}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2 items-center">
                        <button
                          onClick={() => setSelectedOrder(order)}
                          className="text-secondary hover:text-secondary/80 text-xs font-medium bg-secondary/10 hover:bg-secondary/20 px-3 py-1.5 rounded-lg transition-all"
                        >
                          View
                        </button>
                        <button
                          onClick={() => setDeleteOrderId(order.id)}
                          className="px-3 py-1.5 rounded-lg text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
          onStatusUpdate={handleStatusUpdate}
        />
      )}
      {deleteOrderId && (
          <DeleteOrderModal
            id={deleteOrderId}
            onClose={() => setDeleteOrderId(null)}
            onDelete={handleDeleteOrder}
          />
      )}
    </AdminLayoutWrapper>
  );
}