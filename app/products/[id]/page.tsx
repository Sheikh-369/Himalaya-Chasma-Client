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