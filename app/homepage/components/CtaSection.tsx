'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/app/components/ui/AppImage';
import AppIcon from '@/app/components/ui/AppIcon';


export default function CtaSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.15 }
    );
    sectionRef?.current?.querySelectorAll('.reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-16 lg:py-24 bg-background">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden bg-primary min-h-[360px] lg:min-h-[420px] flex items-center">

          {/* BG image and gradient clipped */}
          <div className="absolute inset-0 overflow-hidden rounded-4xl">
            <AppImage
              src="https://images.unsplash.com/photo-1608237936897-ed0790b9de9a"
              alt="Warm editorial shot of eyewear displayed on a minimalist surface with golden light"
              fill
              className="object-cover opacity-25 rounded-4xl"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/80 to-transparent rounded-4xl" />
          </div>

          {/* Content */}
          <div className="relative z-10 max-w-2xl px-8 lg:px-16 py-12">
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold mb-4">
                <span className="w-6 h-px bg-secondary" />
                Ready to find your frame?
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white leading-tight mb-4">
                Your perfect pair is{' '}
                <em className="not-italic text-secondary">waiting.</em>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-8">
                Book a free fitting consultation or browse our full catalog of 200+ styles.
                Same-day repairs always available.
              </p>
            </div>
            <div className="reveal reveal-delay-2 flex flex-wrap gap-4">
              <Link href="/contact" className="btn-primary rounded-full flex items-center gap-2 px-6 py-3">
                Book a Free Fitting
                <AppIcon name="ArrowRightIcon" size={15} className="text-primary" />
              </Link>
              <Link href="/products" className="btn-outline-light rounded-full flex items-center gap-2 px-6 py-3">
                Browse Collection
              </Link>
            </div>
            <div className="reveal reveal-delay-3 flex items-center gap-2 mt-6">
              <AppIcon name="CheckBadgeIcon" variant="solid" size={16} className="text-secondary" />
              <p className="text-white/50 text-sm">No appointment needed for walk-in repairs</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}