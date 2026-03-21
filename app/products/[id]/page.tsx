// import React from 'react';
// import { notFound } from 'next/navigation';
// import ProductDetail from './components/ProductDetail';
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
//     price: '$189',
//     badge: 'Bestseller',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1639d0336-1770125660220.png',
//     alt: 'Brown tortoise-shell sunglasses with gold hardware on clean white background',
//     rating: 5,
//     reviews: 142,
//     description:
//       'The Havana Tortoise is a timeless classic reimagined with modern precision. Crafted from premium Italian acetate, these sunglasses feature rich tortoise-shell patterning with warm amber and brown tones, complemented by polished gold hardware. UV400 lenses provide complete protection while maintaining exceptional optical clarity.',
//     features: [
//       'Premium Italian acetate frame',
//       'UV400 polarized lenses',
//       'Spring-loaded hinges for comfort',
//       'Anti-reflective coating',
//       'Includes premium case & cleaning cloth',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'Italian Acetate' },
//       { label: 'Lens Width', value: '52mm' },
//       { label: 'Bridge Width', value: '20mm' },
//       { label: 'Temple Length', value: '145mm' },
//       { label: 'Lens Type', value: 'Polarized UV400' },
//       { label: 'Gender', value: 'Unisex' },
//     ],
//   },
//   {
//     id: 2,
//     name: 'Titanium Slim',
//     brand: 'ClearVision Rx',
//     category: 'Prescription',
//     price: '$249',
//     badge: 'New',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1c1e0f3e6-1772156693021.png',
//     alt: 'Ultra-thin titanium prescription glasses frames in silver on neutral surface',
//     rating: 5,
//     reviews: 87,
//     description:
//       'Engineered for those who demand the finest in prescription eyewear, the Titanium Slim combines aerospace-grade titanium with minimalist design. Weighing just 12 grams, these frames offer unparalleled comfort for all-day wear while delivering the structural integrity needed for precision prescription lenses.',
//     features: [
//       'Aerospace-grade titanium construction',
//       'Featherlight at only 12g',
//       'Compatible with all prescription types',
//       'Hypoallergenic nose pads',
//       'Lifetime frame warranty',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'Titanium' },
//       { label: 'Lens Width', value: '50mm' },
//       { label: 'Bridge Width', value: '18mm' },
//       { label: 'Temple Length', value: '140mm' },
//       { label: 'Lens Type', value: 'Prescription Ready' },
//       { label: 'Gender', value: 'Unisex' },
//     ],
//   },
//   {
//     id: 3,
//     name: 'Aviator Pro',
//     brand: 'ClearVision Select',
//     category: 'Sunglasses',
//     price: '$219',
//     image: 'https://images.unsplash.com/photo-1709139351026-4b6c42496ab7',
//     alt: 'Classic gold aviator sunglasses with gradient brown tinted lenses on white',
//     rating: 4,
//     reviews: 203,
//     description:
//       'The Aviator Pro pays homage to the iconic silhouette that defined a generation, elevated with contemporary craftsmanship. Gold-tone metal frames house gradient brown lenses that shift from deep amber at the top to a lighter honey tone below, offering both style and superior sun protection.',
//     features: [
//       'Gold-tone stainless steel frame',
//       'Gradient polarized lenses',
//       'Double bridge design',
//       'Adjustable nose pads',
//       'Scratch-resistant coating',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'Stainless Steel' },
//       { label: 'Lens Width', value: '58mm' },
//       { label: 'Bridge Width', value: '14mm' },
//       { label: 'Temple Length', value: '150mm' },
//       { label: 'Lens Type', value: 'Gradient Polarized' },
//       { label: 'Gender', value: 'Unisex' },
//     ],
//   },
//   {
//     id: 4,
//     name: 'Matte Obsidian',
//     brand: 'ClearVision Select',
//     category: 'Sunglasses',
//     price: '$175',
//     originalPrice: '$210',
//     badge: 'Sale',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d5ffa4a6-1773140643209.png',
//     alt: 'Matte black square frame sunglasses worn by a model in natural outdoor light',
//     rating: 5,
//     reviews: 96,
//     description:
//       'Bold, confident, and unapologetically modern — the Matte Obsidian makes a statement without saying a word. The matte-finish acetate frame in deep black absorbs light rather than reflecting it, creating a sophisticated stealth aesthetic. Oversized square lenses provide maximum coverage and a fashion-forward silhouette.',
//     features: [
//       'Matte-finish premium acetate',
//       'Oversized square lens shape',
//       'UV400 protection',
//       'Flexible temple tips',
//       'Includes hard shell case',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'Acetate' },
//       { label: 'Lens Width', value: '55mm' },
//       { label: 'Bridge Width', value: '17mm' },
//       { label: 'Temple Length', value: '145mm' },
//       { label: 'Lens Type', value: 'UV400' },
//       { label: 'Gender', value: 'Unisex' },
//     ],
//   },
//   {
//     id: 5,
//     name: 'Acetate Round',
//     brand: 'ClearVision Rx',
//     category: 'Prescription',
//     price: '$199',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_13255e792-1765096075637.png',
//     alt: 'Round acetate prescription glasses frames in translucent amber on white surface',
//     rating: 4,
//     reviews: 54,
//     description:
//       'The Acetate Round brings a touch of vintage intellectualism to contemporary prescription eyewear. The translucent amber acetate frame catches light beautifully, revealing depth and warmth in its layered construction. The classic round shape flatters most face types and pairs effortlessly with both casual and formal attire.',
//     features: [
//       'Translucent Italian acetate',
//       'Classic round silhouette',
//       'Spring hinge temples',
//       'Compatible with progressive lenses',
//       'Blue light filter option available',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'Italian Acetate' },
//       { label: 'Lens Width', value: '48mm' },
//       { label: 'Bridge Width', value: '22mm' },
//       { label: 'Temple Length', value: '145mm' },
//       { label: 'Lens Type', value: 'Prescription Ready' },
//       { label: 'Gender', value: 'Unisex' },
//     ],
//   },
//   {
//     id: 6,
//     name: 'Milano Cat-Eye',
//     brand: 'Luxe Edition',
//     category: 'Designer',
//     price: '$329',
//     badge: 'Limited',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_104c2ccbf-1766894101441.png',
//     alt: 'Elegant cat-eye designer sunglasses in black with gold temple detail',
//     rating: 5,
//     reviews: 38,
//     description:
//       'A limited-edition masterpiece from our Luxe collection, the Milano Cat-Eye is inspired by the golden age of Italian fashion. Hand-finished black acetate frames sweep upward into a dramatic cat-eye silhouette, adorned with 18k gold-plated temple detailing. Each pair is individually numbered and comes with a certificate of authenticity.',
//     features: [
//       'Hand-finished black acetate',
//       '18k gold-plated temple detail',
//       'Individually numbered limited edition',
//       'Certificate of authenticity included',
//       'Bespoke velvet-lined case',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'Hand-finished Acetate' },
//       { label: 'Lens Width', value: '54mm' },
//       { label: 'Bridge Width', value: '16mm' },
//       { label: 'Temple Length', value: '140mm' },
//       { label: 'Lens Type', value: 'UV400 Tinted' },
//       { label: 'Gender', value: "Women's" },
//     ],
//   },
//   {
//     id: 7,
//     name: 'Sport Shield',
//     brand: 'ClearVision Active',
//     category: 'Sunglasses',
//     price: '$155',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_19f39d6b5-1773075744151.png',
//     alt: 'Sporty wraparound shield sunglasses in black with mirrored lenses',
//     rating: 4,
//     reviews: 71,
//     description:
//       'Engineered for peak performance, the Sport Shield delivers uncompromising protection and optical clarity for active lifestyles. The wraparound shield design eliminates peripheral glare while the rubberized grip zones keep frames securely in place during intense activity. Mirrored lenses reduce eye strain in bright conditions.',
//     features: [
//       'Wraparound shield design',
//       'Rubberized grip zones',
//       'Mirrored polarized lenses',
//       'Impact-resistant TR90 frame',
//       'Ventilated lens system',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'TR90 Nylon' },
//       { label: 'Lens Width', value: '70mm' },
//       { label: 'Bridge Width', value: '12mm' },
//       { label: 'Temple Length', value: '130mm' },
//       { label: 'Lens Type', value: 'Mirrored Polarized' },
//       { label: 'Gender', value: 'Unisex' },
//     ],
//   },
//   {
//     id: 8,
//     name: 'Heritage Gold',
//     brand: 'Luxe Edition',
//     category: 'Designer',
//     price: '$389',
//     image: 'https://img.rocket.new/generatedImages/rocket_gen_img_1d6f864f6-1773075742529.png',
//     alt: 'Vintage-inspired gold metal prescription glasses with warm amber lenses',
//     rating: 5,
//     reviews: 29,
//     description:
//       'The Heritage Gold is a tribute to the timeless elegance of vintage optical craftsmanship. Solid brass frames are hand-polished to a warm 22k gold finish, then fitted with our signature amber-tinted lenses that cast the world in a warm, flattering glow. A true heirloom piece designed to be passed down through generations.',
//     features: [
//       'Solid brass with 22k gold finish',
//       'Hand-polished by master craftsmen',
//       'Signature amber-tinted lenses',
//       'Adjustable nose pads',
//       'Presented in a luxury wooden box',
//     ],
//     frameDetails: [
//       { label: 'Frame Material', value: 'Solid Brass' },
//       { label: 'Lens Width', value: '50mm' },
//       { label: 'Bridge Width', value: '20mm' },
//       { label: 'Temple Length', value: '145mm' },
//       { label: 'Lens Type', value: 'Amber Tinted UV400' },
//       { label: 'Gender', value: 'Unisex' },
//     ],
//   },
// ];

// interface PageProps {
//   params: Promise<{ id: string }>;
// }

// export default async function ProductDetailPage({ params }: PageProps) {
//   const { id } = await params;
//   const product = allProducts.find((p) => p.id === Number(id));

//   if (!product) {
//     notFound();
//   }

//   const relatedProducts = allProducts
//     .filter((p) => p.category === product.category && p.id !== product.id)
//     .slice(0, 3);

//   return (
//     <main className="bg-background min-h-screen">
//       <Header />
//       <ProductDetail product={product} relatedProducts={relatedProducts} />
//       <Footer />
//     </main>
//   );
// }


//dynamic
'use client';

import React, { useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';

import ProductDetail from './components/ProductDetail';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';

import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { fetchProductById, fetchAllProducts } from '@/lib/store/admin/product/prodluct-slice';
import { Status } from '@/lib/global/type';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { singleProduct, products, status } = useAppSelector(
    (state) => state.productSlice
  );

  // 1. Fetch single product
  useEffect(() => {
    if (id) dispatch(fetchProductById(id as string));
  }, [id, dispatch]);

  // 2. Fetch all products (for related section)
  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  // 3. Loading state
  if (status === Status.LOADING || !singleProduct) {
    return <div className="p-10">Loading...</div>;
  }

  // 4. Safety
  if (!singleProduct) return notFound();

  // 5. Related products
  const relatedProducts = products
    .filter(
      (p) =>
        p.category === singleProduct.category &&
        p.id !== singleProduct.id
    )
    .slice(0, 3);

  return (
    <main className="bg-background min-h-screen">
      <Header />
      <ProductDetail
        product={singleProduct}
        relatedProducts={relatedProducts}
      />
      <Footer />
    </main>
  );
}