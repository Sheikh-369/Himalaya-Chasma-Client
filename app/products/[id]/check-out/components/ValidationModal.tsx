'use client';

import AppIcon from '@/app/components/ui/AppIcon';

interface ValidationModalProps {
  isOpen: boolean;
  onClose: () => void;
  method: 'COD' | 'QR' | '';
}

export default function ValidationModal({ isOpen, onClose, method }: ValidationModalProps) {
  if (!isOpen) return null;

  const isCOD = method === 'COD';

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="bg-white rounded-[2.5rem] shadow-2xl max-w-sm w-full p-8 animate-in fade-in zoom-in duration-300 text-center">
        
        {/* Warning Icon */}
        <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-5 border border-red-100">
          <AppIcon name="PhotoIcon" size={32} className="text-red-500" />
        </div>

        <h3 className="font-display text-2xl text-primary font-bold mb-3">
          Screenshot Missing
        </h3>

        <p className="text-muted text-sm leading-relaxed mb-8">
          {isCOD 
            ? "Please upload the Rs. 250 delivery fee payment proof to proceed with your Cash on Delivery order."
            : "Please upload the full payment screenshot to confirm your QR Scan order."
          }
        </p>

        <button
          onClick={onClose}
          className="w-full btn-primary py-4 text-sm font-bold shadow-lg shadow-secondary/20"
        >
          Got it, I'll Upload
        </button>
      </div>
    </div>
  );
}