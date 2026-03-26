
'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/app/components/ui/AppImage';
import AppIcon from '@/app/components/ui/AppIcon';

export default function HeroSection() {
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!bgRef?.current) return;
      const scrollY = window.scrollY;
      const progress = Math.min(scrollY / 800, 1);
      bgRef.current.style.filter = `blur(${progress * 12}px) brightness(${1 - progress * 0.45})`;
      bgRef.current.style.transform = `scale(${1 + progress * 0.06})`;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative min-h-screen flex items-end overflow-hidden">
      {/* Background Image with Parallax */}
      <div ref={bgRef} className="absolute inset-0 will-change-transform transition-none">
        <AppImage
          src="https://images.unsplash.com/photo-1597308315566-5b907ef20773"
          alt="Stylish woman wearing premium ClearVision sunglasses against golden light"
          fill
          priority
          className="object-cover object-center"
          sizes="100vw" />
        
        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/30 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent" />
      </div>
      {/* Floating Stats Card — glassmorphism */}
      <div className="absolute top-1/3 right-8 lg:right-16 hidden lg:block animate-float z-20">
        <div className="glass-card rounded-2xl p-5 min-w-[200px]">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-full bg-secondary/20 flex items-center justify-center">
              <AppIcon name="StarIcon" variant="solid" size={16} className="text-secondary" />
            </div>
            <div>
              <p className="text-white text-sm font-semibold">4.9 / 5.0</p>
              <p className="text-white/60 text-xs">2,400+ reviews</p>
            </div>
          </div>
          <div className="h-px bg-white/15 mb-3" />
          <p className="text-white/80 text-xs leading-relaxed">
            "Perfect fit, perfect clarity."
          </p>
          <p className="text-secondary text-xs mt-1 font-medium">— Mia T., verified buyer</p>
        </div>
      </div>
      {/* Second floating card */}
      <div
        className="absolute top-1/2 right-8 lg:right-16 hidden lg:block z-20"
        style={{ animationDelay: '1s', animation: 'floatY 5s ease-in-out 1s infinite' }}>
        
        <div className="glass-card rounded-2xl p-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl overflow-hidden flex-shrink-0">
            <AppImage
              src="https://images.unsplash.com/photo-1542401520-4ff9a39b1b78"
              alt="Aviator sunglasses product thumbnail"
              width={40}
              height={40}
              className="object-cover" />
            
          </div>
          <div>
            <p className="text-white text-xs font-semibold">New Arrival</p>
            <p className="text-secondary text-xs">Aviator Pro Series</p>
          </div>
        </div>
      </div>
      {/* Hero Content */}
      <div className="relative z-10 w-full max-w-8xl mx-auto px-6 lg:px-8 pb-20 lg:pb-28">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <div
            className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur px-4 py-1.5 mb-6 opacity-0"
            style={{ animation: 'fadeInUp 0.7s cubic-bezier(0.22,1,0.36,1) 0.3s forwards' }}>
            
            <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
            <span className="text-white/90 text-xs font-medium tracking-wider uppercase">
              Premium Eyewear Studio
            </span>
          </div>

          {/* Headline */}
          <h1
            className="font-display text-6xl sm:text-7xl lg:text-8xl xl:text-9xl font-semibold leading-[0.9] tracking-tight text-white mb-6 opacity-0"
            style={{ animation: 'fadeInUp 1s cubic-bezier(0.22,1,0.36,1) 0.5s forwards' }}>
            
            See the World{' '}
            <em className="text-gold-gradient not-italic block">In Style.</em>
          </h1>

          {/* Sub */}
          <p
            className="text-white/70 text-lg lg:text-xl leading-relaxed max-w-xl mb-8 opacity-0"
            style={{ animation: 'fadeInUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.75s forwards' }}>
            
            Handpicked sunglasses, expert prescription fittings, and same-day
            repairs — all under one roof in the heart of the city.
          </p>

          {/* CTAs */}
          <div
            className="flex flex-wrap gap-4 opacity-0"
            style={{ animation: 'fadeInUp 0.9s cubic-bezier(0.22,1,0.36,1) 0.95s forwards' }}>
            
            <Link href="/products" className="btn-primary flex items-center gap-2">
              Shop Collection
              <AppIcon name="ArrowRightIcon" size={16} className="text-primary" />
            </Link>
            <Link href="/contact" className="btn-outline-light flex items-center gap-2">
              Book a Fitting
            </Link>
          </div>

          {/* Trust bar */}
          <div
            className="flex flex-wrap items-center gap-6 mt-10 pt-8 border-t border-white/15 opacity-0"
            style={{ animation: 'fadeInUp 0.9s cubic-bezier(0.22,1,0.36,1) 1.15s forwards' }}>
            
            {[
            { label: '5,000+', sub: 'Happy Clients' },
            { label: '200+', sub: 'Frame Styles' },
            { label: 'Same-Day', sub: 'Repairs' }]?.
            map((stat) =>
            <div key={stat?.label}>
                <p className="text-white font-semibold text-lg font-display">{stat?.label}</p>
                <p className="text-white/55 text-xs">{stat?.sub}</p>
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 opacity-60">
        <div className="w-px h-10 bg-gradient-to-b from-transparent to-white/50" />
        <p className="text-white/50 text-xs tracking-widest uppercase">Scroll</p>
      </div>
    </section>);

}