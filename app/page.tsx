'use client'

import Footer from "./components/Footer";
import Header from "./components/Header";
import CtaSection from "./homepage/components/CtaSection";
import FeaturedProducts from "./homepage/components/FeaturedProducts";
import HeroSection from "./homepage/components/HeroSection";
import ServicesSection from "./homepage/components/ServicesSection";
import TestimonialsSection from "./homepage/components/TestimonialsSection";



export default function HomepagePage() {
  return (
    <main className="bg-background min-h-screen">
      <Header/>
      <HeroSection />
       <FeaturedProducts />
      <ServicesSection />
      <TestimonialsSection />
      <CtaSection />
      <Footer/>
    </main>
  );
}