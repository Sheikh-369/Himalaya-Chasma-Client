'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppIcon from '@/app/components/ui/AppIcon';
import AppImage from '@/app/components/ui/AppImage';

const OWNER_WHATSAPP = '+9779804971647'; // Replace with actual owner WhatsApp number
const DELIVERY_CHARGE = 250;

type PaymentMethod = 'COD' | 'QR' | 'VisitAndPay' | '';

interface Product {
  id: number;
  name: string;
  brand: string;
  price: string;
  image: string;
  alt: string;
}

interface OrderFormProps {
  product: Product;
}

interface FormData {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  address: string;
  paymentMethod: PaymentMethod;
}

function extractPrice(priceStr?: string): number {
  if (!priceStr) return 0;

  const clean = priceStr
    .replace(/rs\.?/i, '') // remove "Rs." or "Rs"
    .replace(/,/g, '')     // remove commas
    .trim();

  const num = parseFloat(clean);

  return isNaN(num) ? 0 : num;
}

export default function OrderForm({ product }: OrderFormProps) {
  const [form, setForm] = useState<FormData>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
    address: '',
    paymentMethod: '',
  });

  const [showCODModal, setShowCODModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [codConfirmed, setCodConfirmed] = useState(false);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);

  const basePrice = extractPrice(product.price);
  const deliveryCharge = form.paymentMethod === 'COD' && codConfirmed ? DELIVERY_CHARGE : 0;
  const qrTotal = form.paymentMethod === 'QR' ? basePrice + DELIVERY_CHARGE : 0;
  const totalPrice =
    form.paymentMethod === 'COD' && codConfirmed
      ? basePrice + DELIVERY_CHARGE
      : form.paymentMethod === 'QR'
      ? qrTotal
      : basePrice;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  }

  function handlePaymentSelect(method: PaymentMethod) {
    setForm((prev) => ({ ...prev, paymentMethod: method }));
    setCodConfirmed(false);
    if (method === 'COD') setShowCODModal(true);
    if (method === 'QR') setShowQRModal(true);
  }

  function validate(): boolean {
    const newErrors: Partial<FormData> = {};
    if (!form.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[\d\s\+\-\(\)]{7,15}$/.test(form.phone.trim()))
      newErrors.phone = 'Enter a valid phone number';
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = 'Enter a valid email address';
    if (!form.address.trim()) newErrors.address = 'Delivery address is required';
    if (!form.paymentMethod) newErrors.paymentMethod = 'Please select a payment method' as PaymentMethod;
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildWhatsAppMessage(): string {
    const paymentLabel =
      form.paymentMethod === 'COD' ?'Cash on Delivery (+ Rs. 250 delivery)'
        : form.paymentMethod === 'QR' ?'QR Scan Payment' :'Visit and Pay (Payment Pending)';

    const status =
      form.paymentMethod === 'VisitAndPay' ? 'PAYMENT PENDING' : 'CONFIRMED';

    const msg = [
      `🛍️ *NEW ORDER - ClearVisio*`,
      ``,
      `*Order Status:* ${status}`,
      `*Product:* ${product.name} (${product.brand})`,
      `*Product Price:* ${product.price}`,
      form.paymentMethod === 'COD' ? `*Delivery Charge:* Rs. ${DELIVERY_CHARGE}` : '',
      form.paymentMethod === 'QR' ? `*Delivery Charge:* Rs. ${DELIVERY_CHARGE} (included in QR total)` : '',
      `*Total Amount:* Rs. ${totalPrice}`,
      ``,
      `*Customer Details:*`,
      `Name: ${form.firstName} ${form.lastName}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : '',
      `Address: ${form.address}`,
      ``,
      `*Payment Method:* ${paymentLabel}`,
    ]
      .filter((line) => line !== '')
      .join('\n');

    return encodeURIComponent(msg);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
    const message = buildWhatsAppMessage();
    const waUrl = `https://wa.me/${OWNER_WHATSAPP}?text=${message}`;
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 600);
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <AppIcon name="CheckIcon" size={36} className="text-green-600" />
        </div>
        <h2 className="font-display text-3xl text-primary font-semibold mb-3">Order Placed!</h2>
        <p className="text-muted mb-2">
          {form.paymentMethod === 'VisitAndPay' ?'Your order has been received. Payment is pending — please visit our store to complete the payment.' :'Your order has been confirmed. WhatsApp is opening to notify our team.'}
        </p>
        <p className="text-sm text-muted mb-8">
          We will contact you at <span className="text-primary font-medium">{form.phone}</span> shortly.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/products/${product.id}`}
            className="btn-outline px-8 py-3 text-sm"
          >
            Back to Product
          </Link>
          <Link href="/products" className="btn-primary px-8 py-3 text-sm">
            Browse More
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* COD Modal */}
      {showCODModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-deep max-w-md w-full p-8 animate-scale-in">
            <div className="w-14 h-14 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-5">
              <AppIcon name="TruckIcon" size={28} className="text-secondary" />
            </div>
            <h3 className="font-display text-2xl text-primary font-semibold text-center mb-3">
              Delivery Charge Notice
            </h3>
            <p className="text-muted text-center text-sm leading-relaxed mb-6">
              A delivery charge of{' '}
              <span className="text-primary font-bold text-base">Rs. {DELIVERY_CHARGE}</span> will be
              added to your order total for Cash on Delivery.
            </p>
            <div className="bg-gold-light rounded-2xl p-4 mb-6 text-center">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Total to Pay on Delivery</p>
              <p className="font-display text-3xl text-primary font-semibold">
                Rs. {basePrice + DELIVERY_CHARGE}
              </p>
              <p className="text-xs text-muted mt-1">
                {product.price} + Rs. {DELIVERY_CHARGE} delivery
              </p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => {
                  setShowCODModal(false);
                  setForm((prev) => ({ ...prev, paymentMethod: '' }));
                }}
                className="flex-1 btn-outline py-3 text-sm"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  setCodConfirmed(true);
                  setShowCODModal(false);
                }}
                className="flex-1 btn-primary py-3 text-sm"
              >
                I Agree, Continue
              </button>
            </div>
          </div>
        </div>
      )}

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-white rounded-3xl shadow-deep max-w-md w-full p-8 animate-scale-in">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-display text-2xl text-primary font-semibold">QR Payment</h3>
              <button
                onClick={() => setShowQRModal(false)}
                className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center hover:bg-accent/60 transition-colors"
              >
                <AppIcon name="XMarkIcon" size={16} className="text-primary" />
              </button>
            </div>
            <div className="bg-gold-light rounded-2xl p-4 mb-5 text-center">
              <p className="text-xs text-muted uppercase tracking-wider mb-1">Total Amount (incl. delivery)</p>
              <p className="font-display text-3xl text-primary font-semibold">
                Rs. {basePrice + DELIVERY_CHARGE}
              </p>
              <p className="text-xs text-muted mt-1">
                {product.price} + Rs. {DELIVERY_CHARGE} delivery
              </p>
            </div>
            {/* QR Code Placeholder */}
            <div className="flex flex-col items-center justify-center bg-accent/20 rounded-2xl p-8 mb-5 border-2 border-dashed border-accent">
              <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center border border-accent/40 shadow-card mb-3">
                <div className="grid grid-cols-5 gap-1 p-2">
                  {Array.from({ length: 25 }).map((_, i) => (
                    <div
                      key={i}
                      className={`w-5 h-5 rounded-sm ${
                        [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,6,12,18].includes(i)
                          ? 'bg-primary' :'bg-white'
                      }`}
                    />
                  ))}
                </div>
              </div>
              <p className="text-xs text-muted text-center">
                Scan this QR code to pay <span className="font-semibold text-primary">Rs. {basePrice + DELIVERY_CHARGE}</span>
              </p>
              <p className="text-xs text-muted text-center mt-1">
                (Replace with your actual payment QR)
              </p>
            </div>
            <button
              onClick={() => setShowQRModal(false)}
              className="w-full btn-primary py-3 text-sm"
            >
              Done, Continue Order
            </button>
          </div>
        </div>
      )}

      <div className="max-w-5xl mx-auto px-6 py-12 lg:py-16">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm text-muted mb-10">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <AppIcon name="ChevronRightIcon" size={14} className="text-accent" />
          <Link href="/products" className="hover:text-secondary transition-colors">Products</Link>
          <AppIcon name="ChevronRightIcon" size={14} className="text-accent" />
          <Link href={`/products/${product.id}`} className="hover:text-secondary transition-colors">
            {product.name}
          </Link>
          <AppIcon name="ChevronRightIcon" size={14} className="text-accent" />
          <span className="text-primary font-medium">Order</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
          {/* Form — left */}
          <div className="lg:col-span-3">
            <h1 className="font-display text-3xl lg:text-4xl text-primary font-semibold mb-2">
              Place Your Order
            </h1>
            <p className="text-muted text-sm mb-8">
              Fill in your details below and we'll get in touch to confirm your order.
            </p>

            <form onSubmit={handleSubmit} noValidate className="space-y-6">
              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    First Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={form.firstName}
                    onChange={handleChange}
                    placeholder="John"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white outline-none transition-all focus:ring-2 focus:ring-secondary/40 ${
                      errors.firstName ? 'border-red-400' : 'border-accent/60 focus:border-secondary'
                    }`}
                  />
                  {errors.firstName && (
                    <p className="text-red-500 text-xs mt-1">{errors.firstName}</p>
                  )}
                </div>
                <div>
                  <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                    Last Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={form.lastName}
                    onChange={handleChange}
                    placeholder="Doe"
                    className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white outline-none transition-all focus:ring-2 focus:ring-secondary/40 ${
                      errors.lastName ? 'border-red-400' : 'border-accent/60 focus:border-secondary'
                    }`}
                  />
                  {errors.lastName && (
                    <p className="text-red-500 text-xs mt-1">{errors.lastName}</p>
                  )}
                </div>
              </div>

              {/* Phone */}
              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  placeholder="+977 98XXXXXXXX"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white outline-none transition-all focus:ring-2 focus:ring-secondary/40 ${
                    errors.phone ? 'border-red-400' : 'border-accent/60 focus:border-secondary'
                  }`}
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Email */}
              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  Email Address{' '}
                  <span className="text-muted font-normal normal-case tracking-normal">(optional)</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white outline-none transition-all focus:ring-2 focus:ring-secondary/40 ${
                    errors.email ? 'border-red-400' : 'border-accent/60 focus:border-secondary'
                  }`}
                />
                {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
              </div>

              {/* Address */}
              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-2">
                  Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  rows={3}
                  placeholder="Street, City, District..."
                  className={`w-full px-4 py-3 rounded-xl border text-sm text-primary bg-white outline-none transition-all resize-none focus:ring-2 focus:ring-secondary/40 ${
                    errors.address ? 'border-red-400' : 'border-accent/60 focus:border-secondary'
                  }`}
                />
                {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
              </div>

              {/* Payment Method */}
              <div>
                <label className="block text-xs font-semibold text-primary uppercase tracking-wider mb-3">
                  Payment Method <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* COD */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('COD')}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.paymentMethod === 'COD' ?'border-secondary bg-secondary/10' :'border-accent/60 bg-white hover:border-secondary/50'
                    }`}
                  >
                    {form.paymentMethod === 'COD' && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                        <AppIcon name="CheckIcon" size={10} className="text-white" />
                      </span>
                    )}
                    <AppIcon name="BanknotesIcon" size={24} className="text-secondary" />
                    <span className="text-sm font-semibold text-primary">Cash on Delivery</span>
                    <span className="text-xs text-muted text-center">+Rs. 250 delivery fee</span>
                  </button>

                  {/* QR */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('QR')}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.paymentMethod === 'QR' ?'border-secondary bg-secondary/10' :'border-accent/60 bg-white hover:border-secondary/50'
                    }`}
                  >
                    {form.paymentMethod === 'QR' && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                        <AppIcon name="CheckIcon" size={10} className="text-white" />
                      </span>
                    )}
                    <AppIcon name="QrCodeIcon" size={24} className="text-secondary" />
                    <span className="text-sm font-semibold text-primary">QR Scan</span>
                    <span className="text-xs text-muted text-center">Rs. 250 incl. in total</span>
                  </button>

                  {/* Visit and Pay */}
                  <button
                    type="button"
                    onClick={() => handlePaymentSelect('VisitAndPay')}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.paymentMethod === 'VisitAndPay' ?'border-secondary bg-secondary/10' :'border-accent/60 bg-white hover:border-secondary/50'
                    }`}
                  >
                    {form.paymentMethod === 'VisitAndPay' && (
                      <span className="absolute top-2 right-2 w-5 h-5 rounded-full bg-secondary flex items-center justify-center">
                        <AppIcon name="CheckIcon" size={10} className="text-white" />
                      </span>
                    )}
                    <AppIcon name="BuildingStorefrontIcon" size={24} className="text-secondary" />
                    <span className="text-sm font-semibold text-primary">Visit & Pay</span>
                    <span className="text-xs text-muted text-center">Payment pending</span>
                  </button>
                </div>
                {errors.paymentMethod && (
                  <p className="text-red-500 text-xs mt-2">{errors.paymentMethod}</p>
                )}
              </div>

              {/* Visit and Pay notice */}
              {form.paymentMethod === 'VisitAndPay' && (
                <div className="flex items-start gap-3 bg-blue-50 border border-blue-200 rounded-2xl p-4">
                  <AppIcon name="InformationCircleIcon" size={20} className="text-blue-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-blue-800 mb-1">Payment Pending</p>
                    <p className="text-xs text-blue-700 leading-relaxed">
                      Your order will be reserved. Please visit our store to complete the payment. We'll contact you to confirm the appointment.
                    </p>
                  </div>
                </div>
              )}

              {/* Submit */}
              <button
                type="submit"
                className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2"
              >
                Confirm Order & Notify via WhatsApp
                <AppIcon name="ArrowRightIcon" size={18} className="text-primary" />
              </button>

              <p className="text-xs text-muted text-center">
                By placing this order, you agree to be contacted by our team for confirmation.
              </p>
            </form>
          </div>

          {/* Order Summary — right */}
          <div className="lg:col-span-2">
            <div className="sticky top-28">
              <div className="bg-white rounded-3xl border border-accent/30 shadow-card overflow-hidden">
                {/* Product Image */}
                <div className="relative aspect-video bg-accent/10">
                  <AppImage
                    src={product.image}
                    alt={product.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                  />
                </div>

                <div className="p-6">
                  <p className="text-xs text-muted uppercase tracking-wider mb-1">{product.brand}</p>
                  <h3 className="font-display text-xl text-primary font-semibold mb-1">
                    {product.name}
                  </h3>
                  <p className="text-xs text-muted mb-5">Qty: 1</p>

                  <div className="w-full h-px bg-accent/30 mb-4" />

                  {/* Price Breakdown */}
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted">Product Price</span>
                      <span className="text-primary font-medium">{product.price}</span>
                    </div>
                    {(form.paymentMethod === 'COD' && codConfirmed) ||
                    form.paymentMethod === 'QR' ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Delivery Charge</span>
                        <span className="text-primary font-medium">Rs. {DELIVERY_CHARGE}</span>
                      </div>
                    ) : null}
                    {form.paymentMethod === 'VisitAndPay' && (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Delivery Charge</span>
                        <span className="text-muted italic">TBD at store</span>
                      </div>
                    )}
                  </div>

                  <div className="w-full h-px bg-accent/30 mb-4" />

                  <div className="flex justify-between items-center">
                    <span className="text-sm font-semibold text-primary uppercase tracking-wider">
                      Total
                    </span>
                    <span className="font-display text-2xl text-primary font-semibold">
                      {form.paymentMethod === 'VisitAndPay'
                        ? product.price
                        : `Rs. ${totalPrice}`}
                    </span>
                  </div>

                  {form.paymentMethod === 'VisitAndPay' && (
                    <p className="text-xs text-muted mt-1 text-right">+ delivery at store</p>
                  )}

                  {/* Payment Status Badge */}
                  {form.paymentMethod && (
                    <div
                      className={`mt-4 rounded-xl px-3 py-2 text-xs font-semibold text-center ${
                        form.paymentMethod === 'VisitAndPay' ?'bg-yellow-50 text-yellow-700 border border-yellow-200' :'bg-green-50 text-green-700 border border-green-200'
                      }`}
                    >
                      {form.paymentMethod === 'VisitAndPay' ?'⏳ Payment Pending' :'✅ Payment Confirmed'}
                    </div>
                  )}
                </div>
              </div>

              {/* WhatsApp note */}
              <div className="mt-4 flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
                <span className="text-green-600 text-lg flex-shrink-0">💬</span>
                <p className="text-xs text-green-800 leading-relaxed">
                  After submitting, WhatsApp will open with your order details pre-filled to notify our team instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}