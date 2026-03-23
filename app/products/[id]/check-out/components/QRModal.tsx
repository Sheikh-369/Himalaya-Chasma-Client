'use client';

import AppIcon from '@/app/components/ui/AppIcon';

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
          <div className="w-40 h-40 bg-white rounded-xl flex items-center justify-center border border-accent/40 shadow-card mb-3">
            <div className="grid grid-cols-5 gap-1 p-2">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  key={i}
                  className={`w-5 h-5 rounded-sm ${
                    [0,1,2,3,4,5,9,10,14,15,19,20,21,22,23,24,6,12,18].includes(i)
                      ? 'bg-primary'
                      : 'bg-white'
                  }`}
                />
              ))}
            </div>
          </div>

          <p className="text-xs text-muted text-center">
            Scan this QR code to pay{' '}
            <span className="font-semibold text-primary">
              Rs. {basePrice + deliveryCharge}
            </span>
          </p>

          <p className="text-xs text-muted text-center mt-1">
            (Replace with your actual payment QR)
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