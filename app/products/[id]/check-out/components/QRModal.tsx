'use client';

import AppIcon from '@/app/components/ui/AppIcon';
import AppImage from '@/app/components/ui/AppImage';

interface QRModalProps {
  isOpen: boolean;
  onClose: () => void;
  basePrice: number;
  deliveryCharge: number;
  productPrice: string;
}

export default function QRModal({
  isOpen,
  onClose,
  basePrice,
  deliveryCharge,
  productPrice,
}: QRModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
      <div className="bg-white rounded-3xl shadow-deep max-w-md w-full p-8 animate-scale-in">
        <div className="flex items-center justify-between mb-5">
          <h3 className="font-display text-2xl text-primary font-semibold">
            QR Payment
          </h3>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-accent/30 flex items-center justify-center hover:bg-accent/60 transition-colors"
          >
            <AppIcon name="XMarkIcon" size={16} className="text-primary" />
          </button>
        </div>

        <div className="bg-gold-light rounded-2xl p-4 mb-5 text-center">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            Total Amount (incl. delivery)
          </p>
          <p className="font-display text-3xl text-primary font-semibold">
            Rs. {basePrice + deliveryCharge}
          </p>
          <p className="text-xs text-muted mt-1">
            {productPrice} + Rs. {deliveryCharge} delivery
          </p>
        </div>

        {/* QR Code Placeholder */}
        <div className="flex flex-col items-center justify-center bg-accent/20 rounded-2xl p-8 mb-5 border-2 border-dashed border-accent">
          {/* Actual QR Code Image */}
<div className="relative aspect-square w-48 mx-auto mb-5 bg-white rounded-2xl overflow-hidden border border-accent/40 shadow-card">
  <AppImage 
    src="/QR.jpeg" 
    alt="Payment QR Code"
    fill
    className="object-contain p-2"
  />
</div>

          <p className="text-xs text-muted text-center">
            Scan this QR code to pay{' '}
            <span className="font-semibold text-primary">
              Rs. {basePrice + deliveryCharge}
            </span>
          </p>

          <p className="text-xs text-muted text-center mt-1">
            After payment, click "Done, Continue Order" to proceed.
          </p>
        </div>

        <button
          onClick={onClose}
          className="w-full btn-primary py-3 text-sm"
        >
          Done, Continue Order
        </button>
      </div>
    </div>
  );
}