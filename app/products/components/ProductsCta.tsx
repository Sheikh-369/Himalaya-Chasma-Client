'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppIcon from '@/app/components/ui/AppIcon';

export default function ProductsCta() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add('visible'); });
      },
      { threshold: 0.2 }
    );
    ref?.current?.querySelectorAll('.reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={ref} className="pb-20 lg:pb-28">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div
          className="reveal rounded-3xl p-10 lg:p-16 text-center"
          style={{
            background:
              'linear-gradient(135deg, #1A1A2E 0%, #16213E 50%, #1A1A2E 100%)',
          }}
        >
          <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold mb-4">
            <span className="w-5 h-px bg-secondary" />
            Can&apos;t decide?
            <span className="w-5 h-px bg-secondary" />
          </span>
          <h2 className="font-display text-3xl lg:text-4xl font-semibold text-white mb-4 leading-tight">
            Let our experts help you find{' '}
            <em className="not-italic text-secondary">the perfect pair.</em>
          </h2>
          <p className="text-white/55 text-base max-w-lg mx-auto mb-8">
            Book a free 30-minute in-store fitting — we&apos;ll match your face
            shape, lifestyle, and prescription to the ideal frame.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/contact" className="btn-primary flex items-center gap-2">
              Book Free Fitting
              <AppIcon name="ArrowRightIcon" size={15} className="text-primary" />
            </Link>
            <Link href="/contact" className="btn-outline-light flex items-center gap-2">
              Send an Inquiry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}