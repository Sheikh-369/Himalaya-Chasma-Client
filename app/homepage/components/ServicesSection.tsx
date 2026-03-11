'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/app/components/ui/AppImage';
import AppIcon from '@/app/components/ui/AppIcon';

const services = [
{
  icon: 'WrenchScrewdriverIcon' as const,
  title: 'Frame Repairs',
  desc: 'Broken hinge, bent frame, loose screw? Most repairs completed same-day while you wait.'
},
{
  icon: 'SparklesIcon' as const,
  title: 'Lens Replacement',
  desc: 'Scratched or outdated lenses? We fit new lenses into your favourite existing frames.'
},
{
  icon: 'AdjustmentsHorizontalIcon' as const,
  title: 'Custom Fittings',
  desc: 'Professional nose pad and temple adjustments so your glasses sit perfectly all day.'
},
{
  icon: 'EyeIcon' as const,
  title: 'Prescription Glasses',
  desc: 'Bring your prescription and choose from 200+ frames — ready in 48 hours.'
}];


export default function ServicesSection() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-primary overflow-hidden">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          {/* Left — Image block */}
          <div className="reveal relative">
            <div className="relative rounded-3xl overflow-hidden aspect-[4/5]">
              <AppImage
                src="https://img.rocket.new/generatedImages/rocket_gen_img_110e92827-1773140642160.png"
                alt="Optician carefully adjusting prescription glasses frames in a bright studio"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw" />
              
              <div className="absolute inset-0 bg-gradient-to-t from-primary/40 to-transparent" />
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-6 -right-4 lg:right-8 glass-card-dark rounded-2xl p-4 flex items-center gap-4 reveal reveal-delay-3">
              <div className="w-12 h-12 rounded-lg bg-secondary/15 flex items-center justify-center flex-shrink-0">
                <AppIcon name="ClockIcon" size={22} className="text-secondary" />
              </div>
              <div>
                <p className="text-white font-semibold text-sm">Same-Day Service</p>
                <p className="text-white/55 text-xs">Most repairs in under 2 hours</p>
              </div>
            </div>
          </div>

          {/* Right — Content */}
          <div>
            <div className="reveal">
              <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold mb-4">
                <span className="w-6 h-px bg-secondary" />
                Our Services
              </span>
              <h2 className="font-display text-4xl lg:text-5xl font-semibold text-white leading-tight mb-5">
                Expert care for<br />
                <em className="not-italic text-secondary">every frame.</em>
              </h2>
              <p className="text-white/60 text-lg leading-relaxed mb-10">
                From precision repairs to custom fittings and full prescription glasses —
                our certified opticians handle it all with care and speed.
              </p>
            </div>

            {/* Service list */}
            <div className="space-y-4">
              {services.map((s, i) =>
              <div
                key={s.title}
                className={`reveal reveal-delay-${i + 1} flex items-start gap-4 p-4 rounded-2xl border border-white/8 hover:border-secondary/30 hover:bg-white/5 transition-all duration-300`}>
                
                  <div className="w-10 h-10 rounded-xl bg-secondary/15 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <AppIcon name={s.icon} size={18} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-white font-semibold text-base mb-1">{s.title}</p>
                    <p className="text-white/55 text-sm leading-relaxed">{s.desc}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="reveal reveal-delay-5 mt-8">
              <Link href="/contact" className="btn-primary inline-flex items-center gap-2">
                Book a Service
                <AppIcon name="ArrowRightIcon" size={15} className="text-primary" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>);

}