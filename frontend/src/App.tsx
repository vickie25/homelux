import React from 'react';
import { Navbar } from './components/shared/Navbar';
import { Hero } from './components/landing/Hero';
import { USPBar } from './components/landing/USPBar';
import { BannerSections } from './components/landing/BannerSections';
import { CategoryGrid } from './components/landing/CategoryGrid';
import { ProductSlider } from './components/landing/ProductSlider';
import { Testimonials, NewsletterSection } from './components/landing/Testimonials';
import { Footer } from './components/shared/Footer';

function App() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <USPBar />
        <BannerSections />
        <CategoryGrid />
        <ProductSlider title="The Best For Your Home" />
        <ProductSlider title="Pieces That Complete Your Space" />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
}

export default App;
