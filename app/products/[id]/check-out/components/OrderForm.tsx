'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import AppIcon from '@/app/components/ui/AppIcon';
import AppImage from '@/app/components/ui/AppImage';
import CODModal from './CODModal';
import QRModal from './QRModal';
import { PaymentMethod } from '@/lib/global/type';
import { useAppDispatch } from '@/lib/store/hooks/hooks';
import { createAnOrder } from '@/lib/store/check-out/check-out-slice';
import ValidationModal from './ValidationModal';

const OWNER_WHATSAPP = '9779804971647';
const DELIVERY_CHARGE = 250;


interface Product {
  id: string;
  name: string;
  brand: string;
  price: string;
  image: string;
  alt: string;
}

interface OrderFormProps {
  product: Product;
}

function extractPrice(price: string | number): number {
  // If it's already a number, just return it
  if (typeof price === 'number') {
    return price;
  }

  // If it's a string (like "Rs. 1,200"), clean it up
  if (typeof price === 'string') {
    const match = price.replace(/,/g, '').match(/[\d.]+/);
    return match ? parseFloat(match[0]) : 0;
  }

  return 0;
}

export default function OrderForm({ product }: OrderFormProps) {
  const dispatch=useAppDispatch()
  //if payment be Qr
  const [paymentProofFile, setPaymentProofFile] = useState<File | null>(null);
  //collecting data for order placement
  const [form, setForm] = useState({
  firstName: '',
  lastName: '',
  whatsappNumber: '',
  email: '',
  deliveryAddress: '',
  paymentMethod: '' as PaymentMethod | '',
});

  const orderItems = [
  {
    productId: product.id,
    productName: product.name,
    price: extractPrice(product.price),
    quantity: 1,
    image: product.image || null,
  }
];

  //stoping user for escaping the screenshot of payment
  const [showValidationModal, setShowValidationModal] = useState(false);

  const [showCODModal, setShowCODModal] = useState(false);
  const [showQRModal, setShowQRModal] = useState(false);
  const [codConfirmed, setCodConfirmed] = useState(false);
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const basePrice = extractPrice(product.price);
  const totalPrice =
  form.paymentMethod === PaymentMethod.COD && codConfirmed
    ? basePrice + DELIVERY_CHARGE
    : form.paymentMethod === PaymentMethod.QR
    ? basePrice + DELIVERY_CHARGE
    : basePrice;

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  }

  function handlePaymentSelect(method: PaymentMethod) {
    setForm((prev) => ({ ...prev, paymentMethod: method }));
    setCodConfirmed(false);
    if (method === PaymentMethod.COD) setShowCODModal(true);
    if (method === PaymentMethod.QR) setShowQRModal(true);
  }

  const payload = {
  ...form,
  items: orderItems,
  totalAmount: totalPrice,
  paymentMethod: form.paymentMethod as PaymentMethod, // ← cast here
};

//   const handleSubmit = async (e: React.FormEvent) => {
//   e.preventDefault();

//   // 1. Validation
//   if (!form.firstName || !form.whatsappNumber || !form.deliveryAddress || !form.paymentMethod) {
//     alert("Please fill in all required fields.");
//     return;
//   }

//   // if (form.paymentMethod === PaymentMethod.QR && !paymentProofFile) {
//   //   alert("Please upload payment screenshot.");
//   //   return;
//   // }
//   // Updated Validation
//   const needsFile = form.paymentMethod === PaymentMethod.QR || form.paymentMethod === PaymentMethod.COD;
  
//   if (needsFile && !paymentProofFile) {
//     setShowValidationModal(true);
//     return;
//   }

//   try {
//     const formData = new FormData();

//     // 2. Append all text fields
//     formData.append("firstName", form.firstName);
//     formData.append("lastName", form.lastName);
//     formData.append("whatsappNumber", form.whatsappNumber);
//     formData.append("email", form.email || ""); // Ensure it's not undefined
//     formData.append("deliveryAddress", form.deliveryAddress);
//     formData.append("paymentMethod", form.paymentMethod);
    
//     // 3. Append the missing totalAmount!
//     formData.append("totalAmount", totalPrice.toString());

//     // 4. Items must be stringified
//     formData.append("items", JSON.stringify([
//       {
//         productId: product.id,
//         quantity: 1
//       }
//     ]));

//     // 5. Attach file
//     if (paymentProofFile) {
//       // Ensure the key name "paymentProof" matches exactly what your backend expects
//       formData.append("paymentProof", paymentProofFile);
//     }

//     // 6. Dispatch
//     await dispatch(createAnOrder(formData)) 

//     setSubmitted(true);
    
//     // ✅ WhatsApp redirect
//     const msg = encodeURIComponent(
//       `🛍️ *NEW ORDER*\n
//     Name: ${form.firstName} ${form.lastName}
//     Phone: ${form.whatsappNumber}
//     Product: ${product.name}
//     Total: Rs. ${totalPrice}
//     Payment: ${form.paymentMethod}`
//     );

//     window.location.href = `https://wa.me/${OWNER_WHATSAPP}?text=${msg}`;
//   } catch (err) {
//     console.error("Order Creation Error:", err);
//     alert("Failed to create order. Please check if the screenshot is valid.");
//   }
// };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validation
    if (!form.firstName || !form.whatsappNumber || !form.deliveryAddress || !form.paymentMethod) {
      alert("Please fill in all required fields.");
      return;
    }

    const needsFile = form.paymentMethod === PaymentMethod.QR || form.paymentMethod === PaymentMethod.COD;
    
    if (needsFile && !paymentProofFile) {
      setShowValidationModal(true);
      return;
    }

    // 🔥 Start processing state here
    setIsProcessing(true);

    try {
      const formData = new FormData();

      // 2. Append all text fields
      formData.append("firstName", form.firstName);
      formData.append("lastName", form.lastName);
      formData.append("whatsappNumber", form.whatsappNumber);
      formData.append("email", form.email || ""); 
      formData.append("deliveryAddress", form.deliveryAddress);
      formData.append("paymentMethod", form.paymentMethod);
      formData.append("totalAmount", totalPrice.toString());

      // 4. Items must be stringified
      formData.append("items", JSON.stringify([
        {
          productId: product.id,
          quantity: 1
        }
      ]));

      // 5. Attach file
      if (paymentProofFile) {
        formData.append("paymentProof", paymentProofFile);
      }

      // 6. Dispatch and wait for the backend response
      await dispatch(createAnOrder(formData)) // Add .unwrap() if using RTK to catch errors properly

      setSubmitted(true);
      
      // ✅ WhatsApp redirect
      const msg = encodeURIComponent(
        `🛍️ *NEW ORDER*\n
Name: ${form.firstName} ${form.lastName}
Phone: ${form.whatsappNumber}
Product: ${product.name}
Total: Rs. ${totalPrice}
Payment: ${form.paymentMethod}`
      );

      window.location.href = `https://wa.me/${OWNER_WHATSAPP}?text=${msg}`;
    } catch (err) {
      console.error("Order Creation Error:", err);
      alert("Failed to create order. Please check if the screenshot is valid.");
    } finally {
      // 🔥 Turn off processing state when done (or on failure)
      setIsProcessing(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-24 text-center">
        <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <AppIcon name="CheckIcon" size={36} className="text-green-600" />
        </div>
        <h2 className="font-display text-3xl text-primary font-semibold mb-3">Order Placed!</h2>
        <p className="text-muted mb-2">
          {form.paymentMethod === PaymentMethod.VISITANDPAY ?'Your order has been received. Payment is pending — please visit our store to complete the payment.' :'Your order has been confirmed. WhatsApp is opening to notify our team.'}
        </p>
        <p className="text-sm text-muted mb-8">
          We will contact you at <span className="text-primary font-medium">{form.whatsappNumber}</span> shortly.
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
                  name="whatsappNumber"
                  value={form.whatsappNumber}
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
                  name="deliveryAddress"
                  value={form.deliveryAddress}
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
                    onClick={() => handlePaymentSelect(PaymentMethod.COD)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.paymentMethod === PaymentMethod.COD ?'border-secondary bg-secondary/10' :'border-accent/60 bg-white hover:border-secondary/50'
                    }`}
                  >
                    {form.paymentMethod === PaymentMethod.COD && (
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
                    onClick={() => handlePaymentSelect(PaymentMethod.QR)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.paymentMethod === PaymentMethod.QR ?'border-secondary bg-secondary/10' :'border-accent/60 bg-white hover:border-secondary/50'
                    }`}
                  >
                    {form.paymentMethod === PaymentMethod.QR && (
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
                    onClick={() => handlePaymentSelect(PaymentMethod.VISITANDPAY)}
                    className={`relative flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all text-left ${
                      form.paymentMethod === PaymentMethod.VISITANDPAY ?'border-secondary bg-secondary/10' :'border-accent/60 bg-white hover:border-secondary/50'
                    }`}
                  >
                    {form.paymentMethod === PaymentMethod.VISITANDPAY && (
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
              {form.paymentMethod === PaymentMethod.VISITANDPAY && (
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

              {/* Payment Proof File Inserting Logic */}

              {/* 1. Updated Logic: Show upload UI for both QR and COD */}
{(form.paymentMethod === PaymentMethod.QR || form.paymentMethod === PaymentMethod.COD) && (
  <div className="space-y-3 animate-in fade-in slide-in-from-top-2">
    <label className="block text-xs font-semibold text-primary uppercase tracking-wider">
      {form.paymentMethod === PaymentMethod.QR 
        ? "Upload Full Payment Screenshot" 
        : "Upload Delivery Fee Screenshot"} 
      <span className="text-red-500 ml-1">*</span>
    </label>

    {/* The Hidden File Input */}
    <input
      type="file"
      id="paymentProof"
      accept="image/*"
      onChange={(e) => {
        if (e.target.files?.[0]) {
          setPaymentProofFile(e.target.files[0]);
        }
      }}
      className="hidden"
    />

    {/* The Clickable UI Label */}
    <label
      htmlFor="paymentProof"
      className={`flex items-center justify-center gap-3 w-full px-4 py-4 rounded-2xl border-2 cursor-pointer transition-all ${
        !paymentProofFile 
          ? "border-dashed border-accent/60 bg-accent/5 hover:border-secondary" 
          : "border-solid border-secondary bg-secondary/5"
      }`}
    >
      <AppIcon name="ArrowUpTrayIcon" size={20} className="text-secondary" />
      <span className="text-primary font-medium">
        {paymentProofFile ? paymentProofFile.name : "Choose Payment Screenshot"}
      </span>
    </label>

    {/* Dynamic Hint Text */}
    <p className="text-[11px] text-muted leading-relaxed">
      {form.paymentMethod === PaymentMethod.QR 
        ? "Please upload proof of the full Rs. " + totalPrice + " payment." 
        : "For COD, please upload proof of the Rs. 250 delivery charge."}
    </p>
  </div>
)}

              {/* Submit */}
              {/* <button
                type="submit"
                className="w-full btn-primary py-4 text-base flex items-center justify-center gap-2"
              >
                Confirm Order & Notify via WhatsApp
                <AppIcon name="ArrowRightIcon" size={18} className="text-primary" />
              </button> */}
              <button
                type="submit"
                disabled={isProcessing}
                className={`w-full btn-primary py-4 text-base flex items-center justify-center gap-2 transition-all ${
                  isProcessing ? 'opacity-80 cursor-not-allowed' : ''
                }`}
              >
                {isProcessing ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-current" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Processing Order...
                  </>
                ) : (
                  <>
                    Confirm Order & Notify via WhatsApp
                    <AppIcon name="ArrowRightIcon" size={18} className="text-primary" />
                  </>
                )}
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
                    {(form.paymentMethod === PaymentMethod.COD && codConfirmed) ||
                    form.paymentMethod === PaymentMethod.QR ? (
                      <div className="flex justify-between text-sm">
                        <span className="text-muted">Delivery Charge</span>
                        <span className="text-primary font-medium">Rs. {DELIVERY_CHARGE}</span>
                      </div>
                    ) : null}
                    {form.paymentMethod === PaymentMethod.VISITANDPAY && (
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
                      {form.paymentMethod === PaymentMethod.VISITANDPAY
                        ? product.price
                        : `Rs. ${totalPrice}`}
                    </span>
                  </div>

                  {form.paymentMethod === PaymentMethod.VISITANDPAY && (
                    <p className="text-xs text-muted mt-1 text-right">+ delivery at store</p>
                  )}

                  {/* Payment Status Badge */}
                  {form.paymentMethod && (
                    <div
                      className={`mt-4 rounded-xl px-3 py-2 text-xs font-semibold text-center ${
                        form.paymentMethod === PaymentMethod.VISITANDPAY ?'bg-yellow-50 text-yellow-700 border border-yellow-200' :'bg-green-50 text-green-700 border border-green-200'
                      }`}
                    >
                      {form.paymentMethod === PaymentMethod.VISITANDPAY ?'⏳ Payment Pending' :'✅ Payment Confirmed'}
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
        {/* COD Modal */}
        <CODModal
          isOpen={showCODModal}
          onClose={() => {
            setShowCODModal(false);
            setForm((prev) => ({ ...prev, paymentMethod: '' }));
          }}
          onConfirm={() => {
            setCodConfirmed(true);
            setShowCODModal(false);
          }}
          basePrice={basePrice}
          deliveryCharge={DELIVERY_CHARGE}
          productPrice={product.price}
        />
        {/* QR Modal */}
        <QRModal
          isOpen={showQRModal}
          onClose={() => setShowQRModal(false)}
          basePrice={basePrice}
          deliveryCharge={DELIVERY_CHARGE}
          productPrice={product.price}
        />
        {/* Validation Modal asking user to upload Qr screenshot*/}
        <ValidationModal 
          isOpen={showValidationModal} 
          onClose={() => setShowValidationModal(false)} 
          method={form.paymentMethod as 'COD' | 'QR'} 
        />
      </div>
    </>
  );
}

