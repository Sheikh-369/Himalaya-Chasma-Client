'use client';

import AppIcon from '@/app/components/ui/AppIcon';

interface CODModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  basePrice: number;
  deliveryCharge: number;
  productPrice: string;
}

export default function CODModal({
  isOpen,
  onClose,
  onConfirm,
  basePrice,
  deliveryCharge,
  productPrice,
}: CODModalProps) {
  if (!isOpen) return null;

  return (
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
          <span className="text-primary font-bold text-base">
            Rs. {deliveryCharge}
          </span>{' '}
          will be added to your order total for Cash on Delivery.
        </p>

        <div className="bg-accent rounded-3xl p-4 mb-6 text-center">
          <p className="text-xs text-muted uppercase tracking-wider mb-1">
            Total to Pay on Delivery
          </p>
          <p className="font-display text-3xl text-primary font-semibold">
            Rs. {basePrice + deliveryCharge}
          </p>
          <p className="text-xs text-muted mt-1">
            {productPrice} + Rs. {deliveryCharge} delivery
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 btn-outline py-3 text-sm"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="flex-1 btn-primary py-3 text-sm"
          >
            I Agree, Continue
          </button>
        </div>
      </div>
    </div>
  );
}