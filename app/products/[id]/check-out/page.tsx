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
        <OrderForm product={singleProduct as unknown as Product} />
      </div>
      <Footer/>
    </main>
  );
}