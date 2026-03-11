import React from 'react';

export default function ContactHero() {
  return (
    <section className="pt-32 pb-12 lg:pt-40 lg:pb-16 bg-background">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div
          className="relative rounded-3xl overflow-hidden px-8 lg:px-14 py-14"
          style={{
            background:
              'linear-gradient(135deg, rgba(26,26,46,0.06) 0%, rgba(201,168,76,0.10) 50%, rgba(232,213,163,0.18) 100%)',
          }}
        >
          <div
            className="absolute inset-0 opacity-25"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 60%, rgba(201,168,76,0.3) 0%, transparent 55%)',
            }}
          />
          <div className="relative z-10 max-w-xl">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold mb-4">
              <span className="w-5 h-px bg-secondary" />
              Get in Touch
            </span>
            <h1 className="font-display text-5xl lg:text-6xl font-semibold text-primary leading-tight mb-4">
              We&apos;d love to{' '}
              <em className="not-italic text-secondary">hear from you.</em>
            </h1>
            <p className="text-muted text-lg leading-relaxed">
              Book a fitting, ask about repairs, or just say hello. Our team
              typically responds within 2 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}