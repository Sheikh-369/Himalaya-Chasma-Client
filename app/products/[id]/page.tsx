'use client';

import React, { useEffect } from 'react';
import { useParams, notFound } from 'next/navigation';
import ProductDetail from './components/ProductDetail';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks/hooks';
import { Status } from '@/lib/global/type';
import { fetchAllProducts, fetchProductById } from '@/lib/store/admin/product/product-slice';

export default function ProductDetailPage() {
  const { id } = useParams();
  const dispatch = useAppDispatch();

  const { singleProduct, products, status, detailStatus } = useAppSelector(
    (state) => state.productSlice
  );

  useEffect(() => {
    if (id) dispatch(fetchProductById(id as string));
  }, [id, dispatch]);

  useEffect(() => {
    if (products.length === 0) {
      dispatch(fetchAllProducts());
    }
  }, [dispatch, products.length]);

  // FIX: Guard clause. 
  // If detailStatus is IDLE or LOADING, and we don't have a product, show loader.
  if (detailStatus === Status.LOADING || detailStatus === Status.IDLE || !singleProduct) {
    return (
      <div className="flex h-screen items-center justify-center bg-white">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
        <p className="ml-3 font-medium">Loading Product...</p>
      </div>
    );
  }

  // Related products logic (runs after product is found)
  const relatedProducts = products
    .filter((p) => p.category === singleProduct.category && p.id !== singleProduct.id)
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