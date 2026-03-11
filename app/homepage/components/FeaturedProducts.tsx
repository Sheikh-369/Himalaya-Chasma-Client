'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import AppIcon from '@/app/components/ui/AppIcon';
import AppImage from '@/app/components/ui/AppImage';

const featured = [
{
  id: 1,
  name: 'Havana Tortoise',
  category: 'Sunglasses',
  price: 'Rs. 4999',
  badge: 'Bestseller',
  image: "https://images.unsplash.com/photo-1640008687318-9927339e76f5",
  alt: 'Brown tortoise-shell sunglasses with gold hardware on white background',
  span: 'col-span-2 row-span-2'
},
{
  id: 2,
  name: 'Titanium Slim',
  category: 'Prescription',
  price: 'Rs. 3999',
  badge: 'New',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1e0f3e6-1772156693021.png",
  alt: 'Ultra-thin titanium prescription glasses frames in silver',
  span: 'col-span-1 row-span-1'
},
{
  id: 3,
  name: 'Aviator Pro',
  category: 'Sunglasses',
  price: 'Rs. 5999',
  badge: null,
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_14a4066a9-1771898008639.png",
  alt: 'Classic gold aviator sunglasses with gradient tinted lenses',
  span: 'col-span-1 row-span-1'
},
{
  id: 4,
  name: 'Matte Obsidian',
  category: 'Sunglasses',
  price: 'Rs. 6999',
  badge: 'Limited',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1efd8adf0-1773140643593.png",
  alt: 'Matte black square frame sunglasses worn by model outdoors',
  span: 'col-span-1 row-span-1'
}];


export default function FeaturedProducts() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    const els = sectionRef?.current?.querySelectorAll('.reveal');
    els?.forEach((el) => observer?.observe(el));
    return () => observer?.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 lg:py-32 bg-background">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div className="reveal">
            <span className="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-secondary font-semibold mb-3">
              <span className="w-6 h-px bg-secondary" />
              Featured Collection
            </span>
            <h2 className="font-display text-4xl lg:text-5xl font-semibold text-primary leading-tight">
              Frames worth<br />
              <em className="not-italic text-secondary">looking twice.</em>
            </h2>
          </div>
          <div className="reveal reveal-delay-2">
            <Link href="/products" className="btn-outline flex items-center gap-2 text-sm">
              View All
              <AppIcon name="ArrowRightIcon" size={14} className="text-primary" />
            </Link>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5 auto-rows-[220px] lg:auto-rows-[260px]">
          {featured?.map((item, i) =>
          <Link
            key={item?.id}
            href="/products"
            className={`reveal reveal-delay-${i + 1} product-card relative rounded-3xl overflow-hidden bg-accent/20 group ${item?.span}`}>
            
              {/* Image */}
              <AppImage
              src={item?.image}
              alt={item?.alt}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, 33vw" />
            

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />

              {/* Badge */}
              {item?.badge &&
            <div className="absolute top-4 left-4 bg-secondary text-primary text-xs font-bold px-3 py-1 rounded-full">
                  {item?.badge}
                </div>
            }

              {/* Info */}
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="text-white/60 text-xs uppercase tracking-wider mb-1">{item?.category}</p>
                <div className="flex items-end justify-between">
                  <p className="text-white font-semibold text-lg font-display leading-tight">{item?.name}</p>
                  <p className="text-secondary font-bold text-lg">{item?.price}</p>
                </div>
              </div>

              {/* Hover CTA */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="glass-card rounded-full px-5 py-2.5 flex items-center gap-2">
                  <span className="text-white text-sm font-medium">View Details</span>
                  <AppIcon name="ArrowRightIcon" size={14} className="text-white" />
                </div>
              </div>
            </Link>
          )}
        </div>
      </div>
    </section>);

}