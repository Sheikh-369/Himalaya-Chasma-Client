import React from 'react';
import ContactHero from './components/ContactHero';
import ContactContent from './components/ContactContent';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ContactPage() {
  return (
    <main className="bg-background min-h-screen">
      <Header />
      <ContactHero />
      <ContactContent />
      <Footer />
    </main>
  );
}