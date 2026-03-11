'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AppLogo from './ui/AppLogo';

const navLinks = [
  { label: 'Home', href: '/' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-background/95 backdrop-blur-xl border-b border-accent/30 shadow-card' : 'bg-transparent'}`}>
        <div className="max-w-8xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link href="/" className="flex items-center gap-2.5 group">
              <AppLogo size={36} />
              <span className="font-display font-semibold text-xl text-primary tracking-tight hidden sm:block">
                HimalayaChasmaGhar
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <Link key={link.href} href={link.href} className={`nav-link ${pathname === link.href ? 'active' : ''}`}>
                  {link.label}
                </Link>
              ))}
            </nav>
            <div className="hidden lg:flex items-center gap-4">
  <a
    href="tel:+9779804971647"
    className="text-sm font-medium text-muted hover:text-primary transition-colors"
  >
    +977 9804971647
  </a>

  <Link href="/contact" className="btn-primary text-sm">
    Book a Fitting
  </Link>
</div>
            <button onClick={() => setMobileOpen(!mobileOpen)} className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-accent/20 transition-colors" aria-label="Toggle menu">
              <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
              <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block w-5 h-0.5 bg-primary transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
            </button>
          </div>
        </div>
      </header>
      <div className={`fixed inset-0 z-40 lg:hidden transition-all duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-primary/95 backdrop-blur-xl" onClick={() => setMobileOpen(false)} />
        <div className={`relative flex flex-col h-full pt-24 pb-10 px-8 transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <nav className="flex flex-col gap-6">
            {navLinks.map(link => (
              <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)} className={`font-display text-3xl font-medium transition-colors ${pathname === link.href ? 'text-secondary' : 'text-white/80 hover:text-white'}`}>
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="mt-12 pt-8 border-t border-white/10 flex flex-col gap-6">
            <a
              href="tel:+9779804971647"
              className="text-white/80 text-lg font-medium"
            >
              +977 9804971647
            </a>

            <Link href="/contact" onClick={() => setMobileOpen(false)} className="btn-primary inline-flex w-full justify-center text-base">
              Book a Fitting
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}