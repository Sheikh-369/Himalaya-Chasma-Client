// import React from 'react';
// import { notFound } from 'next/navigation';
// import OrderForm from './components/OrderForm';
// import Header from '@/app/components/Header';
// import Footer from '@/app/components/Footer';

// type Category = 'All' | 'Sunglasses' | 'Prescription' | 'Designer';

// interface Product {
//   id: number;
//   name: string;
//   brand: string;
//   category: Category;
//   price: string;
//   originalPrice?: string;
//   badge?: string;
//   image: string;
//   alt: string;
//   rating: number;
//   reviews: number;
//   description: string;
//   features: string[];
//   frameDetails: { label: string; value: string }[];
// }

// const allProducts: Product[] = [
//   {
//     id: 1,
//     name: 'Havana Tortoise',
//     brand: 'ClearVision Select',
//     category: 'Sunglasses',
//     price: 'Rs. 189',
//     badge: 'Bestseller',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1639d0336-1770125660220.png',
//     alt: 'Brown tortoise-shell sunglasses with gold hardware on clean white background',
//     rating: 5,
//     reviews: 142,
//     description: 'The Havana Tortoise is a timeless classic reimagined with modern precision.',
//     features: ['Premium Italian acetate frame', 'UV400 polarized lenses'],
//     frameDetails: [{ label: 'Frame Material', value: 'Italian Acetate' }],
//   },
//   {
//     id: 2,
//     name: 'Titanium Slim',
//     brand: 'ClearVision Rx',
//     category: 'Prescription',
//     price: 'Rs. 249',
//     badge: 'New',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c1e0f3e6-1772156693021.png',
//     alt: 'Ultra-thin titanium prescription glasses frames in silver on neutral surface',
//     rating: 5,
//     reviews: 87,
//     description: 'Engineered for those who demand the finest in prescription eyewear.',
//     features: ['Aerospace-grade titanium construction', 'Featherlight at only 12g'],
//     frameDetails: [{ label: 'Frame Material', value: 'Titanium' }],
//   },
//   {
//     id: 3,
//     name: 'Aviator Pro',
//     brand: 'ClearVision Select',
//     category: 'Sunglasses',
//     price: 'Rs. 219',
//     image: 'https://images.unsplash.com/photo-1709139351026-4b6c42496ab7',
//     alt: 'Classic gold aviator sunglasses with gradient brown tinted lenses on white',
//     rating: 4,
//     reviews: 203,
//     description: 'The Aviator Pro pays homage to the iconic silhouette that defined a generation.',
//     features: ['Gold-tone stainless steel frame', 'Gradient polarized lenses'],
//     frameDetails: [{ label: 'Frame Material', value: 'Stainless Steel' }],
//   },
//   {
//     id: 4,
//     name: 'Matte Obsidian',
//     brand: 'ClearVision Select',
//     category: 'Sunglasses',
//     price: 'Rs. 175',
//     originalPrice: 'Rs. 210',
//     badge: 'Sale',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d5ffa4a6-1773140643209.png',
//     alt: 'Matte black square frame sunglasses worn by a model in natural outdoor light',
//     rating: 5,
//     reviews: 96,
//     description: 'Bold, confident, and unapologetically modern.',
//     features: ['Matte-finish premium acetate', 'Oversized square lens shape'],
//     frameDetails: [{ label: 'Frame Material', value: 'Acetate' }],
//   },
//   {
//     id: 5,
//     name: 'Acetate Round',
//     brand: 'ClearVision Rx',
//     category: 'Prescription',
//     price: 'Rs. 199',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13255e792-1765096075637.png',
//     alt: 'Round acetate prescription glasses frames in translucent amber on white surface',
//     rating: 4,
//     reviews: 54,
//     description: 'The Acetate Round brings a touch of vintage intellectualism.',
//     features: ['Translucent Italian acetate', 'Classic round silhouette'],
//     frameDetails: [{ label: 'Frame Material', value: 'Italian Acetate' }],
//   },
//   {
//     id: 6,
//     name: 'Milano Cat-Eye',
//     brand: 'Luxe Edition',
//     category: 'Designer',
//     price: 'Rs. 329',
//     badge: 'Limited',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_104c2ccbf-1766894101441.png',
//     alt: 'Elegant cat-eye designer sunglasses in black with gold temple detail',
//     rating: 5,
//     reviews: 38,
//     description: 'A limited-edition masterpiece from our Luxe collection.',
//     features: ['Hand-finished black acetate', '18k gold-plated temple detail'],
//     frameDetails: [{ label: 'Frame Material', value: 'Hand-finished Acetate' }],
//   },
//   {
//     id: 7,
//     name: 'Sport Shield',
//     brand: 'ClearVision Active',
//     category: 'Sunglasses',
//     price: 'Rs. 155',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19f39d6b5-1773075744151.png',
//     alt: 'Sporty wraparound shield sunglasses in black with mirrored lenses',
//     rating: 4,
//     reviews: 71,
//     description: 'Engineered for peak performance.',
//     features: ['Wraparound shield design', 'Rubberized grip zones'],
//     frameDetails: [{ label: 'Frame Material', value: 'TR90 Nylon' }],
//   },
//   {
//     id: 8,
//     name: 'Heritage Gold',
//     brand: 'Luxe Edition',
//     category: 'Designer',
//     price: 'Rs. 389',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d6f864f6-1773075742529.png',
//     alt: 'Vintage-inspired gold metal prescription glasses with warm amber lenses',
//     rating: 5,
//     reviews: 29,
//     description: 'The Heritage Gold is a tribute to the timeless elegance of vintage optical craftsmanship.',
//     features: ['Solid brass with 22k gold finish', 'Hand-polished by master craftsmen'],
//     frameDetails: [{ label: 'Frame Material', value: 'Solid Brass' }],
//   },
// ];

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function OrderPage({ params }: PageProps) {
//   const { id } = await params;
//   const product = allProducts.find((p) => p.id === parseInt(id));

//   if (!product) {
//     notFound();
//   }

//   return (
//     <>
//       <Header />
//       <main className="min-h-screen bg-background pt-20">
//         <OrderForm product={product} />
//       </main>
//       <Footer />
//     </>
//   );
// }

//dynamic
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '@/lib/store/hooks/hooks';
import { fetchProductById } from '@/lib/store/admin/product/prodluct-slice';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import OrderForm from './components/OrderForm';

// 1. Define the Interface here to match your Redux/OrderForm expectations
interface Product {
  id: string; 
  name: string;
  brand: string;
  price: string;
  image: string;
  alt: string;
}

export default function CheckOutRedirect() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  
  // Use the names exactly as they are in your Redux state
  const { singleProduct, status } = useAppSelector((state) => state.productSlice);

  useEffect(() => {
    if (id) dispatch(fetchProductById(id as string));
  }, [id, dispatch]);

  if (status === 'loading' || !singleProduct) {
    return <div className="p-20 text-center">Loading...</div>;
  }

  return (
    <main className="bg-background min-h-screen">
      <Header/>
      <div className="py-10">
        {/* 2. Pass 'singleProduct' instead of 'product' */}
        {/* 3. Cast it as Product to satisfy the Type check */}
        <OrderForm product={singleProduct as unknown as Product} />
      </div>
      <Footer/>
    </main>
  );
}