import React from 'react';
import Link from 'next/link';
import AppLogo from './ui/AppLogo';

const footerLinks = [
  { label: 'Home', href: '/homepage' },
  { label: 'Products', href: '/products' },
  { label: 'Contact', href: '/contact' },
  { label: 'Privacy', href: '#' },
  { label: 'Terms', href: '#' },
];

export default function Footer() {
  return (
    <footer className="border-t border-accent/30 bg-background">
      <div className="max-w-8xl mx-auto px-6 lg:px-8 py-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">

          {/* Brand + Contact */}
          <div className="flex flex-col items-center sm:items-start gap-3">
            <Link href="/homepage" className="flex items-center gap-2">
              <AppLogo size={32} />
              <span className="font-display font-semibold text-lg text-primary tracking-tight">
                HimalayaChasmaGhar
              </span>
            </Link>

            {/* Contact badges */}
            <div className="flex flex-col sm:flex-row gap-2">

              {/* Address */}
              <a
                href="https://maps.app.goo.gl/aQ2XMeqKUFNBTt3x6"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-accent/20 text-muted hover:text-primary hover:bg-accent/40 transition-all"
              >
                {/* Corrected location icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="flex-shrink-0"
                >
                  <path d="M8 0C4 0 0 4 0 8c0 4 8 8 8 8s8-4 8-8c0-4-4-8-8-8zM8 10a2 2 0 1 1 0-4 2 2 0 0 1 0 4z"/>
                </svg>
                Birtamode, Jhapa
              </a>

              {/* Phone */}
              <a
                href="tel:+9779804971647"
                className="flex items-center gap-2 px-3 py-1.5 rounded-full text-xs bg-accent/20 text-muted hover:text-primary hover:bg-accent/40 transition-all"
              >
                {/* Corrected phone icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="flex-shrink-0"
                >
                  <path d="M3.654 1.328a.678.678 0 0 1 .738-.065l2.08 1.04a.678.678 0 0 1 .285.283l.622 1.245a.678.678 0 0 1-.144.732L5.03 5.906a11.538 11.538 0 0 0 5.063 5.063l1.343-1.546a.678.678 0 0 1 .732-.144l1.245.622a.678.678 0 0 1 .283.285l1.04 2.08a.678.678 0 0 1-.065.738l-2.086 2.086a1.746 1.746 0 0 1-1.937.404C6.724 14.52 1.48 9.276 1.52 4.374a1.746 1.746 0 0 1 .404-1.937L3.654 1.328z"/>
                </svg>
                +977 9804971647
              </a>

            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {footerLinks?.map((link) => (
              <Link
                key={`${link.label}-${link.href}`}
                href={link?.href}
                className="text-sm font-medium text-muted hover:text-primary transition-colors"
              >
                {link?.label}
              </Link>
            ))}
          </nav>

          {/* Copyright */}
          <p className="text-sm text-muted">
            © {new Date()?.getFullYear()} Himalaya Chasma Ghar
          </p>

        </div>
      </div>
    </footer>
  );
}




git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Sheikh-369/Himala-Chasma-Client.git
git push -u origin main