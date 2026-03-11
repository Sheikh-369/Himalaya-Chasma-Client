'use client';

import AppIcon from '@/app/components/ui/AppIcon';
import AppImage from '@/app/components/ui/AppImage';
import React, { useEffect, useRef } from 'react';

const testimonials = [
{
  quote:
  "I walked in with a broken frame and walked out with perfectly adjusted glasses in under an hour. The team is incredibly skilled and genuinely cares about getting it right.",
  name: 'Sarita Oli',
  role: 'Graphic Designer, Bhadrapur',
  avatar: "https://images.unsplash.com/photo-1665296781043-fc70781fa2ae",
  avatarAlt: 'Portrait of Sarah O., a young woman smiling with natural background',
  rating: 5
},
{
  quote:
  "Finally found a place that stocks frames that actually suit my face shape. The fitting process was thorough and my prescription lenses were ready the next morning.",
  name: 'Mohan Timsina',
  role: 'Software Engineer, Dhulabari',
  avatar: "https://images.unsplash.com/photo-1559734257-68007dad161b",
  avatarAlt: 'Portrait of Marcus T., a man in casual attire against a light wall',
  rating: 5
},
{
  quote:
  "The sunglasses selection is incredible — I spent way too long choosing. Ended up with the Havana Tortoise and get compliments every single day.",
  name: 'Priya Magar',
  role: 'Marketing Director, Pokhara',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_170e2eca9-1772146199279.png",
  avatarAlt: 'Portrait of Priya N., a woman with dark hair smiling outdoors',
  rating: 5
}];


const metrics = [
{ value: '5,000+', label: 'Happy Clients' },
{ value: '100%', label: 'Satisfaction Rate' },
{ value: '200+', label: 'Frame Styles' }];


export default function TestimonialsSection() {
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
    sectionRef?.current?.querySelectorAll('.reveal')?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold mb-3">
              <span className="w-6 h-px bg-secondary" />
              Customer Stories
              <span className="w-6 h-px bg-secondary" />
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-primary leading-tight">
              Clients who see the{' '}
              <em className="not-italic text-secondary">difference.</em>
            </h2>
          </div>
        </div>

        {/* Metrics row */}
        <div className="reveal reveal-delay-2 grid grid-cols-3 gap-4 lg:gap-8 max-w-xl mx-auto mb-16">
          {metrics?.map((m) =>
          <div key={m?.label} className="text-center">
              <p className="font-display text-3xl lg:text-4xl font-semibold text-primary">{m?.value}</p>
              <p className="text-muted text-xs mt-1">{m?.label}</p>
            </div>
          )}
        </div>

        {/* Stacked card visual + grid */}
        <div className="relative">
          {/* Back layers (decorative) */}
          <div className="pointer-events-none absolute inset-x-8 -top-6 h-24 rounded-3xl bg-accent/30 opacity-50 scale-[0.97] hidden lg:block" />
          <div className="pointer-events-none absolute inset-x-4 -top-3 h-24 rounded-3xl bg-accent/50 opacity-60 scale-[0.99] hidden lg:block" />

          {/* Testimonial cards */}
          <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-5">
            {testimonials?.map((t, i) =>
            <div
              key={t?.name}
              className={`reveal reveal-delay-${i + 1} bg-white rounded-3xl p-7 shadow-card border border-accent/20 flex flex-col`}>
              
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: t?.rating })?.map((_, j) =>
                <AppIcon key={j} name="StarIcon" variant="solid" size={14} className="text-secondary" />
                )}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground/80 text-sm leading-relaxed flex-1 mb-5">
                  &ldquo;{t?.quote}&rdquo;
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-3 pt-4 border-t border-accent/20">
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <AppImage
                    src={t?.avatar}
                    alt={t?.avatarAlt}
                    width={40}
                    height={40}
                    className="object-cover" />
                  
                  </div>
                  <div>
                    <p className="text-primary font-semibold text-sm">{t?.name}</p>
                    <p className="text-muted text-xs">{t?.role}</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>);

}