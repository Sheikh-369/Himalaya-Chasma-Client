'use client';

import AppIcon from '@/app/components/ui/AppIcon';
import AppImage from '@/app/components/ui/AppImage'; // Assuming you have this for the QR image

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
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-md w-full p-8 animate-in fade-in zoom-in duration-300">
        
        {/* Header Icon */}
        <div className="w-16 h-16 rounded-full bg-secondary/10 flex items-center justify-center mx-auto mb-4 border border-secondary/20">
          <AppIcon name="QrCodeIcon" size={32} className="text-secondary" />
        </div>

        <h3 className="font-display text-2xl text-primary font-bold text-center mb-2">
          Pay Delivery Fee
        </h3>

        <p className="text-muted text-center text-xs leading-relaxed mb-6 px-4">
          To prevent fake orders, we require the <span className="text-secondary font-bold text-sm">Rs. {deliveryCharge}</span> delivery fee to be paid upfront via QR.
        </p>

        {/* QR Code Section */}
        <div className="relative aspect-square w-48 mx-auto mb-6 bg-accent/20 rounded-3xl overflow-hidden border-2 border-dashed border-secondary/40 p-2">
           <AppImage 
              src="/QR.jpeg" // 👈 Replace with your actual path
              alt="Delivery Fee QR Code"
              fill
              className="object-contain rounded-2xl"
           />
        </div>

        {/* Pricing Summary */}
        <div className="bg-accent/40 rounded-3xl p-5 mb-8">
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] text-muted uppercase font-bold tracking-widest">Pay Now</span>
            <span className="text-secondary font-bold text-lg">Rs. {deliveryCharge}</span>
          </div>
          <div className="w-full h-px bg-accent/60 my-2" />
          <div className="flex justify-between items-center">
            <span className="text-[10px] text-muted uppercase font-bold tracking-widest">COD Amount Later</span>
            <span className="text-primary font-bold">Rs. {basePrice}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full btn-primary py-4 text-sm font-bold flex items-center justify-center gap-2"
          >
            I've Paid, Upload Screenshot
            <AppIcon name="ArrowRightIcon" size={16} className="text-primary" />
          </button>
          
          <button
            onClick={onClose}
            className="w-full text-muted hover:text-red-500 py-2 text-xs font-medium transition-colors"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
}