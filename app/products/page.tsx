import React from 'react';
import ProductsHero from './components/ProductsHero';
import ProductsGrid from './components/ProductsGrid';
import ProductsCta from './components/ProductsCta';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ProductsPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <ProductsHero />
      <ProductsGrid />
      <ProductsCta />
      <Footer />
    </main>
  );
}