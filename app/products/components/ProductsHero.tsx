import React from 'react';

export default function ProductsHero() {
  return (
    <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Soft gradient background strip */}
        <div
          className="relative rounded-3xl overflow-hidden px-8 lg:px-14 py-14 lg:py-18"
          style={{
            background:
              'linear-gradient(135deg, rgba(26,26,46,0.06) 0%, rgba(201,168,76,0.10) 60%, rgba(232,213,163,0.15) 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-30"
            style={{
              backgroundImage:
                'radial-gradient(circle at 70% 50%, rgba(201,168,76,0.25) 0%, transparent 60%)',
            }}
          />
          <div className="relative z-10 max-w-2xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold mb-4">
              <span className="w-5 h-px bg-secondary" />
              Full Catalog
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-semibold text-primary leading-tight mb-4">
              Find frames that{' '}
              <em className="not-italic text-secondary">fit your world.</em>
            </h1>
            <p className="text-muted text-lg leading-relaxed max-w-lg">
              200+ curated styles across sunglasses, prescription frames, and
              designer collections — with expert guidance every step of the way.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}