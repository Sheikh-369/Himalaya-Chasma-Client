'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import AppImage from '@/app/components/ui/AppImage';
import AppIcon from '@/app/components/ui/AppIcon';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { Status } from '@/lib/global/type';
import { IProductData } from '@/lib/store/admin/product/product-slice-type';
import { fetchAllProducts } from '@/lib/store/admin/product/product-slice';

type Category = 'All' | 'Sunglasses' | 'Prescription' | 'Designer';

const categories: Category[] = ['All', 'Sunglasses', 'Prescription', 'Designer'];

export default function ProductsGrid() {
  const dispatch = useAppDispatch();
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState<Category>('All');

  const { products, status } = useAppSelector((state) => state.productSlice);

  // Fetch products on mount
  useEffect(() => {
    if (status === Status.IDLE) dispatch(fetchAllProducts());
  }, [dispatch, status]);

  // Filter products based on selected category
  const filtered: IProductData[] =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category === activeCategory);

  // Reveal animation
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
  }, [filtered]);

  return (
    <section ref={sectionRef} className="pb-24 lg:pb-32">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Filter Tabs */}
        <div className="reveal flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`filter-tab ${activeCategory === cat ? 'active' : ''}`}
            >
              {cat}
            </button>
          ))}
          <span className="ml-auto text-muted text-sm self-center">
            {filtered.length} styles
          </span>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-6">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className={`reveal reveal-delay-${i % 4 + 1} product-card bg-white rounded-3xl overflow-hidden border border-accent/20 shadow-card flex flex-col group`}
            >
              {/* Image */}
              <Link href={`/products/${product.id}`} className="relative aspect-square bg-accent/10 overflow-hidden block">
                {product.image && (
                  <AppImage
                    src={typeof product.image === 'string' ? product.image : ''}
                    alt={product.alt || product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                )}

                {product.badge && (
                  <span
                    className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                      product.badge === 'Sale'
                        ? 'bg-red-500 text-white'
                        : product.badge === 'New'
                        ? 'bg-primary text-white'
                        : 'bg-secondary text-primary'
                    }`}
                  >
                    {product.badge}
                  </span>
                )}

                {/* Quick action */}
                <button className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-white shadow-sm">
                  <AppIcon name="HeartIcon" size={14} className="text-primary" />
                </button>
              </Link>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <p className="text-muted text-xs mb-1">{product.brand}</p>
                <Link
                  href={`/products/${product.id}`}
                  className="text-primary font-semibold text-sm mb-1 font-display hover:text-secondary transition-colors"
                >
                  {product.name}
                </Link>

                {/* Rating */}
                <div className="flex items-center gap-1.5 mb-3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <AppIcon
                        key={j}
                        name="StarIcon"
                        variant={j < (product.rating || 0) ? 'solid' : 'outline'}
                        size={11}
                        className={j < (product.rating || 0) ? 'text-secondary' : 'text-accent'}
                      />
                    ))}
                  </div>
                  <span className="text-muted text-xs">({product.reviews || 0})</span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-2 mb-4">
                  <span className="text-primary font-bold text-base">Rs.{product.price}</span>
                  {product.originalPrice && (
                    <span className="text-muted text-xs line-through">Rs.{product.originalPrice}</span>
                  )}
                </div>

                {/* CTA */}
                <div className="mt-auto flex flex-col xl:flex-row gap-2">
                  <Link
                    href={`/products/${product.id}`}
                    className="flex-1 flex items-center justify-center text-center border border-primary text-primary text-[10px] sm:text-xs font-semibold py-2 rounded-full hover:bg-primary hover:text-white transition-colors"
                  >
                    Details
                  </Link>
                  <Link
                    href="/contact"
                    className="flex-1 flex items-center justify-center gap-1 bg-primary text-white text-[10px] sm:text-xs font-semibold py-2 rounded-full hover:bg-dark-card transition-colors"
                  >
                    Inquire
                    <AppIcon name="ArrowRightIcon" size={10} className="text-white hidden sm:block" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}