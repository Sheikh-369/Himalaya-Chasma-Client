//dynamic
// 'use client';

// import React, { useEffect, useRef } from 'react';
// import Link from 'next/link';
// import AppIcon from '@/app/components/ui/AppIcon';
// import AppImage from '@/app/components/ui/AppImage';
// import { IProductData } from '@/lib/store/admin/product/product-slice-type';

// interface ProductDetailProps {
//   product: IProductData;
//   relatedProducts: IProductData[];
//   isRelatedLoading?: boolean;
// }

// export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
//   const sectionRef = useRef<HTMLElement>(null);

//   useEffect(() => {
//     const observer = new IntersectionObserver(
//       (entries) => {
//         entries.forEach((entry) => {
//           if (entry.isIntersecting) entry.target.classList.add('visible');
//         });
//       },
//       { threshold: 0.08 }
//     );
//     sectionRef.current?.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
//     return () => observer.disconnect();
//   }, []);

//   // Safely ensure features and frameDetails are arrays
//   const featuresArray = Array.isArray(product.features) ? product.features : [];
//   const frameDetailsArray = Array.isArray(product.frameDetails) ? product.frameDetails : [];
//   const relatedProductsArray = Array.isArray(relatedProducts) ? relatedProducts : [];

//   return (
//     <section ref={sectionRef} className="pt-10 pb-24 lg:pb-32">
//       <div className="max-w-8xl mx-auto px-6 lg:px-8">
//         {/* Breadcrumb */}
//         <nav className="reveal flex items-center gap-2 text-sm text-muted mb-10">
//           <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
//           <AppIcon name="ChevronRightIcon" size={14} className="text-accent" />
//           <Link href="/products" className="hover:text-secondary transition-colors">Products</Link>
//           <AppIcon name="ChevronRightIcon" size={14} className="text-accent" />
//           <span className="text-primary font-medium">{product.name}</span>
//         </nav>

//         {/* Main Product Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
//           {/* Image */}
//           <div className="reveal">
//             <div className="relative aspect-square rounded-3xl overflow-hidden bg-accent/10 border border-accent/20 shadow-card">
//               {product.image && typeof product.image === 'string' && (
//                 <AppImage
//                   src={product.image}
//                   alt={product.alt || product.name}
//                   fill
//                   className="object-cover"
//                   sizes="(max-width: 1024px) 100vw, 50vw"
//                 />
//               )}
//               {product.badge && (
//                 <span
//                   className={`absolute top-5 left-5 text-sm font-bold px-3 py-1.5 rounded-full ${
//                     product.badge === 'Sale'
//                       ? 'bg-red-500 text-white'
//                       : product.badge === 'New'
//                       ? 'bg-primary text-white'
//                       : 'bg-secondary text-primary'
//                   }`}
//                 >
//                   {product.badge}
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Info */}
//           <div className="reveal reveal-delay-2 flex flex-col">
//             {/* Brand & Category */}
//             <div className="flex items-center gap-3 mb-3">
//               <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
//                 {product.brand || 'Unknown Brand'}
//               </span>
//               <span className="w-1 h-1 rounded-full bg-accent" />
//               <span className="text-muted text-sm">{product.category}</span>
//             </div>

//             {/* Name */}
//             <h1 className="font-display text-4xl lg:text-5xl text-primary font-semibold leading-tight mb-4">
//               {product.name}
//             </h1>

//             {/* Rating */}
//             <div className="flex items-center gap-3 mb-6">
//               <div className="flex gap-1">
//                 {Array.from({ length: 5 }).map((_, i) => (
//                   <AppIcon
//                     key={i}
//                     name="StarIcon"
//                     variant={i < (product.rating || 0) ? 'solid' : 'outline'}
//                     size={16}
//                     className={i < (product.rating || 0) ? 'text-secondary' : 'text-accent'}
//                   />
//                 ))}
//               </div>
//               <span className="text-muted text-sm">
//                 {(product.rating || 0).toFixed(1)} · {product.reviews || 0} reviews
//               </span>
//             </div>

//             {/* Price */}
//             <div className="flex items-baseline gap-3 mb-6">
//               <span className="font-display text-4xl text-primary font-semibold">
//                 Rs.{product.price.toFixed(2)}
//               </span>
//               {product.originalPrice && (
//                 <span className="text-muted text-xl line-through">Rs.{product.originalPrice.toFixed(2)}</span>
//               )}
//               {product.originalPrice && (
//                 <span className="text-red-500 text-sm font-semibold bg-red-50 px-2 py-0.5 rounded-full">
//                   Save{' '}
//                   {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
//                 </span>
//               )}
//             </div>

//             {/* Divider */}
//             <div className="w-full h-px bg-accent/30 mb-6" />

//             {/* Description */}
//             <p className="text-muted leading-relaxed mb-8">{product.description}</p>

//             {/* Features */}
//             {featuresArray.length > 0 && (
//               <div className="mb-8">
//                 <h3 className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
//                   Key Features
//                 </h3>
//                 <ul className="space-y-2.5">
//                   {featuresArray.map((feature, i) => (
//                     <li key={i} className="flex items-start gap-3 text-sm text-muted">
//                       <span className="mt-0.5 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
//                         <AppIcon name="CheckIcon" size={11} className="text-secondary" />
//                       </span>
//                       {feature}
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             )}

//             {/* CTA Buttons */}
//             <div className="flex flex-col sm:flex-row gap-3 mt-auto">
//               <Link
//                 href={`/products/${product.id}/check-out`}
//                 className="flex-1 flex items-center justify-center gap-2 bg-secondary text-primary font-semibold py-4 rounded-full hover:bg-[#D4B05A] transition-colors shadow-gold"
//               >
//                 Order Now
//                 <AppIcon name="ShoppingBagIcon" size={16} className="text-primary" />
//               </Link>
//               <Link
//                 href="/contact"
//                 className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold py-4 rounded-full hover:bg-primary hover:text-white transition-colors"
//               >
//                 Book Appointment
//                 <AppIcon name="CalendarIcon" size={16} />
//               </Link>
//             </div>
//           </div>
//         </div>

//         {/* Frame Details Table */}
//         {frameDetailsArray.length > 0 && (
//           <div className="reveal mb-20">
//             <h2 className="font-display text-2xl lg:text-3xl text-primary font-semibold mb-8">
//               Frame Specifications
//             </h2>
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {frameDetailsArray.map((detail, i) => (
//                 <div key={i} className="bg-white rounded-2xl border border-accent/20 p-5 shadow-card">
//                   <p className="text-muted text-xs uppercase tracking-wider mb-1">{detail.label}</p>
//                   <p className="text-primary font-semibold text-sm">{detail.value}</p>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Related Products */}
//         {relatedProductsArray.length > 0 && (
//           <div className="reveal">
//             <div className="flex items-center justify-between mb-8">
//               <h2 className="font-display text-2xl lg:text-3xl text-primary font-semibold">
//                 You May Also Like
//               </h2>
//               <Link
//                 href="/products"
//                 className="text-secondary text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all"
//               >
//                 View All
//                 <AppIcon name="ArrowRightIcon" size={14} className="text-secondary" />
//               </Link>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {relatedProductsArray.map((related) => (
//                 <Link
//                   key={related.id}
//                   href={`/products/${related.id}`}
//                   className="product-card bg-white rounded-3xl overflow-hidden border border-accent/20 shadow-card flex flex-col group"
//                 >
//                   <div className="relative aspect-square bg-accent/10 overflow-hidden">
//                     {related.image && typeof related.image === 'string' && (
//                       <AppImage
//                         src={related.image}
//                         alt={related.alt || related.name}
//                         fill
//                         className="object-cover transition-transform duration-500 group-hover:scale-105"
//                         sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
//                       />
//                     )}
//                     {related.badge && (
//                       <span
//                         className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
//                           related.badge === 'Sale'
//                             ? 'bg-red-500 text-white'
//                             : related.badge === 'New'
//                             ? 'bg-primary text-white'
//                             : 'bg-secondary text-primary'
//                         }`}
//                       >
//                         {related.badge}
//                       </span>
//                     )}
//                   </div>
//                   <div className="p-4 flex flex-col flex-1">
//                     <p className="text-muted text-xs mb-1">{related.brand}</p>
//                     <p className="text-primary font-semibold text-sm mb-2 font-display">{related.name}</p>
//                     <div className="flex items-center gap-2 mt-auto">
//                       <span className="text-primary font-bold text-base">Rs.{related.price.toFixed(2)}</span>
//                       {related.originalPrice && (
//                         <span className="text-muted text-xs line-through">Rs.{related.originalPrice.toFixed(2)}</span>
//                       )}
//                     </div>
//                   </div>
//                 </Link>
//               ))}
//             </div>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

//2nd
'use client';

import React, { useEffect, useRef, useState, useMemo } from 'react';
import Link from 'next/link';
import AppIcon from '@/app/components/ui/AppIcon';
import AppImage from '@/app/components/ui/AppImage';
import { IProductData } from '@/lib/store/admin/product/product-slice-type';

interface ProductDetailProps {
  product: IProductData;
  relatedProducts: IProductData[];
  isRelatedLoading?: boolean;
}

export default function ProductDetail({ product, relatedProducts }: ProductDetailProps) {
  const sectionRef = useRef<HTMLElement>(null);

  // --- IMAGE SWITCHING LOGIC ---
  const getImageUrl = useMemo(() => (path: any) => {
    if (!path || typeof path !== 'string') return "";
    if (path.startsWith('http')) return path;
    const normalizedPath = path.replace(/\\/g, '/');
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:5000';
    return `${baseUrl}/${normalizedPath}`;
  }, []);

  const [activeImage, setActiveImage] = useState<string>("");

  useEffect(() => {
    if (product?.image) {
      setActiveImage(getImageUrl(product.image));
    }
  }, [product?.id, product?.image, getImageUrl]);
  // -----------------------------

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

  const featuresArray = Array.isArray(product.features) ? product.features : [];
  const frameDetailsArray = Array.isArray(product.frameDetails) ? product.frameDetails : [];
  const relatedProductsArray = Array.isArray(relatedProducts) ? relatedProducts : [];
  const galleryArray = Array.isArray(product.gallery) ? product.gallery : [];

  return (
    <section ref={sectionRef} className="pt-10 pb-24 lg:pb-32">
      <div className="max-w-8xl mx-auto px-6 lg:px-8">
        {/* Breadcrumb - Exact Original UI */}
        <nav className="reveal flex items-center gap-2 text-sm text-muted mb-10">
          <Link href="/" className="hover:text-secondary transition-colors">Home</Link>
          <AppIcon name="ChevronRightIcon" size={14} className="text-accent" />
          <Link href="/products" className="hover:text-secondary transition-colors">Products</Link>
          <AppIcon name="ChevronRightIcon" size={14} className="text-accent" />
          <span className="text-primary font-medium">{product.name}</span>
        </nav>

        {/* Main Product Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20">
          
          {/* Image Column - Restored UI with Switcher */}
          <div className="reveal flex flex-col gap-5">
            <div 
              key={activeImage}
              className="relative aspect-square rounded-3xl overflow-hidden bg-accent/10 border border-accent/20 shadow-card"
            >
              {activeImage && (
                <AppImage
                  src={activeImage}
                  alt={product.alt || product.name}
                  fill
                  className="object-cover animate-in fade-in duration-500"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              )}
              {product.badge && (
                <span
                  className={`absolute top-5 left-5 text-sm font-bold px-3 py-1.5 rounded-full z-10 ${
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
            </div>

            {/* Added Thumbnail Grid using Original Styling rules */}
            {galleryArray.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                {galleryArray.map((img, idx) => {
                  const thumbUrl = getImageUrl(img);
                  const isActive = activeImage === thumbUrl;
                  return (
                    <button
                      key={`${product.id}-thumb-${idx}`}
                      type="button"
                      onClick={() => setActiveImage(thumbUrl)}
                      className={`relative aspect-square rounded-2xl overflow-hidden border-2 transition-all duration-200 ${
                        isActive 
                          ? 'border-secondary ring-2 ring-secondary/20' 
                          : 'border-transparent hover:border-accent/40'
                      }`}
                    >
                      <AppImage
                        src={thumbUrl}
                        alt={`${product.name} view ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* Info - Exact Original UI */}
          <div className="reveal reveal-delay-2 flex flex-col">
            <div className="flex items-center gap-3 mb-3">
              <span className="text-secondary text-sm font-semibold uppercase tracking-widest">
                {product.brand || 'Unknown Brand'}
              </span>
              <span className="w-1 h-1 rounded-full bg-accent" />
              <span className="text-muted text-sm">{product.category}</span>
            </div>

            <h1 className="font-display text-4xl lg:text-5xl text-primary font-semibold leading-tight mb-4">
              {product.name}
            </h1>

            <div className="flex items-center gap-3 mb-6">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <AppIcon
                    key={i}
                    name="StarIcon"
                    variant={i < (product.rating || 0) ? 'solid' : 'outline'}
                    size={16}
                    className={i < (product.rating || 0) ? 'text-secondary' : 'text-accent'}
                  />
                ))}
              </div>
              <span className="text-muted text-sm">
                {(product.rating || 0).toFixed(1)} · {product.reviews || 0} reviews
              </span>
            </div>

            <div className="flex items-baseline gap-3 mb-6">
              <span className="font-display text-4xl text-primary font-semibold">
                Rs.{product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-muted text-xl line-through">Rs.{product.originalPrice.toFixed(2)}</span>
              )}
              {product.originalPrice && (
                <span className="text-red-500 text-sm font-semibold bg-red-50 px-2 py-0.5 rounded-full">
                  Save{' '}
                  {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}%
                </span>
              )}
            </div>

            <div className="w-full h-px bg-accent/30 mb-6" />

            <p className="text-muted leading-relaxed mb-8">{product.description}</p>

            {featuresArray.length > 0 && (
              <div className="mb-8">
                <h3 className="text-primary font-semibold text-sm uppercase tracking-wider mb-4">
                  Key Features
                </h3>
                <ul className="space-y-2.5">
                  {featuresArray.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-muted">
                      <span className="mt-0.5 w-5 h-5 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <AppIcon name="CheckIcon" size={11} className="text-secondary" />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 mt-auto">
              <Link
                href={`/products/${product.id}/check-out`}
                className="flex-1 flex items-center justify-center gap-2 bg-secondary text-primary font-semibold py-4 rounded-full hover:bg-[#D4B05A] transition-colors shadow-gold"
              >
                Order Now
                <AppIcon name="ShoppingBagIcon" size={16} className="text-primary" />
              </Link>
              <Link
                href="/contact"
                className="flex-1 flex items-center justify-center gap-2 border-2 border-primary text-primary font-semibold py-4 rounded-full hover:bg-primary hover:text-white transition-colors"
              >
                Book Appointment
                <AppIcon name="CalendarIcon" size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* Frame Specifications - Exact Original UI */}
        {frameDetailsArray.length > 0 && (
          <div className="reveal mb-20">
            <h2 className="font-display text-2xl lg:text-3xl text-primary font-semibold mb-8">
              Frame Specifications
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {frameDetailsArray.map((detail, i) => (
                <div key={i} className="bg-white rounded-2xl border border-accent/20 p-5 shadow-card">
                  <p className="text-muted text-xs uppercase tracking-wider mb-1">{detail.label}</p>
                  <p className="text-primary font-semibold text-sm">{detail.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Related Products - Exact Original UI */}
        {relatedProductsArray.length > 0 && (
          <div className="reveal">
            <div className="flex items-center justify-between mb-8">
              <h2 className="font-display text-2xl lg:text-3xl text-primary font-semibold">
                You May Also Like
              </h2>
              <Link
                href="/products"
                className="text-secondary text-sm font-semibold flex items-center gap-1.5 hover:gap-2.5 transition-all"
              >
                View All
                <AppIcon name="ArrowRightIcon" size={14} className="text-secondary" />
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {relatedProductsArray.map((related) => (
                <Link
                  key={related.id}
                  href={`/products/${related.id}`}
                  className="product-card bg-white rounded-3xl overflow-hidden border border-accent/20 shadow-card flex flex-col group"
                >
                  <div className="relative aspect-square bg-accent/10 overflow-hidden">
                    {related.image && typeof related.image === 'string' && (
                      <AppImage
                        src={getImageUrl(related.image)}
                        alt={related.alt || related.name}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    )}
                    {related.badge && (
                      <span className={`absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full ${
                          related.badge === 'Sale' ? 'bg-red-500 text-white' : 
                          related.badge === 'New' ? 'bg-primary text-white' : 'bg-secondary text-primary'
                      }`}>
                        {related.badge}
                      </span>
                    )}
                  </div>
                  <div className="p-4 flex flex-col flex-1">
                    <p className="text-muted text-xs mb-1">{related.brand}</p>
                    <p className="text-primary font-semibold text-sm mb-2 font-display">{related.name}</p>
                    <div className="flex items-center gap-2 mt-auto">
                      <span className="text-primary font-bold text-base">Rs.{related.price.toFixed(2)}</span>
                      {related.originalPrice && (
                        <span className="text-muted text-xs line-through">Rs.{related.originalPrice.toFixed(2)}</span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}