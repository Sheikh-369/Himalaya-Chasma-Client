'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import AppImage from '@/app/components/ui/AppImage';
import AppIcon from '@/app/components/ui/AppIcon';

type Category = 'All' | 'Sunglasses' | 'Prescription' | 'Designer';

interface Product {
  id: number;
  name: string;
  brand: string;
  category: Category;
  price: string;
  originalPrice?: string;
  badge?: string;
  image: string;
  alt: string;
  rating: number;
  reviews: number;
}

const allProducts: Product[] = [
{
  id: 1,
  name: 'Havana Tortoise',
  brand: 'ClearVision Select',
  category: 'Sunglasses',
  price: '$189',
  badge: 'Bestseller',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1639d0336-1770125660220.png",
  alt: 'Brown tortoise-shell sunglasses with gold hardware on clean white background',
  rating: 5,
  reviews: 142
},
{
  id: 2,
  name: 'Titanium Slim',
  brand: 'ClearVision Rx',
  category: 'Prescription',
  price: '$249',
  badge: 'New',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1c1e0f3e6-1772156693021.png",
  alt: 'Ultra-thin titanium prescription glasses frames in silver on neutral surface',
  rating: 5,
  reviews: 87
},
{
  id: 3,
  name: 'Aviator Pro',
  brand: 'ClearVision Select',
  category: 'Sunglasses',
  price: '$219',
  image: "https://images.unsplash.com/photo-1709139351026-4b6c42496ab7",
  alt: 'Classic gold aviator sunglasses with gradient brown tinted lenses on white',
  rating: 4,
  reviews: 203
},
{
  id: 4,
  name: 'Matte Obsidian',
  brand: 'ClearVision Select',
  category: 'Sunglasses',
  price: '$175',
  originalPrice: '$210',
  badge: 'Sale',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d5ffa4a6-1773140643209.png",
  alt: 'Matte black square frame sunglasses worn by a model in natural outdoor light',
  rating: 5,
  reviews: 96
},
{
  id: 5,
  name: 'Acetate Round',
  brand: 'ClearVision Rx',
  category: 'Prescription',
  price: '$199',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_13255e792-1765096075637.png",
  alt: 'Round acetate prescription glasses frames in translucent amber on white surface',
  rating: 4,
  reviews: 54
},
{
  id: 6,
  name: 'Milano Cat-Eye',
  brand: 'Luxe Edition',
  category: 'Designer',
  price: '$329',
  badge: 'Limited',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_104c2ccbf-1766894101441.png",
  alt: 'Elegant cat-eye designer sunglasses in black with gold temple detail',
  rating: 5,
  reviews: 38
},
{
  id: 7,
  name: 'Sport Shield',
  brand: 'ClearVision Active',
  category: 'Sunglasses',
  price: '$155',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_19f39d6b5-1773075744151.png",
  alt: 'Sporty wraparound shield sunglasses in black with mirrored lenses',
  rating: 4,
  reviews: 71
},
{
  id: 8,
  name: 'Heritage Gold',
  brand: 'Luxe Edition',
  category: 'Designer',
  price: '$389',
  image: "https://img.rocket.new/generatedImages/rocket_gen_img_1d6f864f6-1773075742529.png",
  alt: 'Vintage-inspired gold metal prescription glasses with warm amber lenses',
  rating: 5,
  reviews: 29
}];


const categories: Category[] = ['All', 'Sunglasses', 'Prescription', 'Designer'];

export default function ProductsGrid() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const sectionRef = useRef<HTMLElement>(null);

  const filtered =
  activeCategory === 'All' ?
  allProducts :
  allProducts.filter((p) => p.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('visible');
        });
      },
      { threshold: 0.08 }
    );
    sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="pb-24 lg:pb-32">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="reveal flex flex-wrap gap-2 mb-10">
          {categories.map((cat) =>
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}>
            
              {cat}
            </button>
          )}
          <span className="ml-auto text-muted text-sm self-center">
            {filtered.length} styles
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product, i) =>
          <div
            key={product.id}
            className={`reveal reveal-delay-${i % 4 + 1} product-card bg-white rounded-3xl overflow-hidden border border-accent/20 shadow-card flex flex-col group`}>
            
              {/* Image */}
              <Link href={`/products/${product.id}`} className="relative aspect-square bg-accent/10 overflow-hidden block">
                <AppImage
                src={product.image}
                alt={product.alt}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              
                {product.badge &&
              <span
                className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                product.badge === 'Sale' ? 'bg-red-500 text-white' :
                product.badge === 'New' ? 'bg-primary text-white' : 'bg-secondary text-primary'}`
                }>
                
                    {product.badge}
                  </span>
              }

                {/* Quick action */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm">
                  <AppIcon name="HeartIcon" size={14} className="text-primary" />
                </button>
              </Link>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-muted text-xs mb-1">{product.brand}</p>
                <Link href={`/products/${product.id}`} className="text-primary font-semibold text-sm mb-1 font-display hover:text-secondary transition-colors">{product.name}</Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) =>
                  <AppIcon
                    key={j}
                    name="StarIcon"
                    variant={j < product.rating ? 'solid' : 'outline'}
                    size={11}
                    className={j < product.rating ? 'text-secondary' : 'text-accent'} />

                  )}
                  </div>
                  <span className="text-muted text-xs">({product.reviews})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary font-bold text-base">{product.price}</span>
                  {product.originalPrice &&
                <span className="text-muted text-xs line-through">{product.originalPrice}</span>
                }
                </div>

                {/* CTA */}
                <div className="mt-auto flex gap-2">
                  <Link
                  href={`/products/${product.id}`}
                  className="flex-1 flex items-center justify-center gap-1.5 border border-primary text-primary text-xs font-semibold py-2.5 rounded-full hover:bg-primary hover:text-white transition-colors">
                    View Details
                  </Link>
                  <Link
                  href="/contact"
                  className="flex-1 flex items-center justify-center gap-1.5 bg-primary text-white text-xs font-semibold py-2.5 rounded-full hover:bg-dark-card transition-colors">
                  
                    Inquire
                    <AppIcon name="ArrowRightIcon" size={12} className="text-white" />
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>);

}