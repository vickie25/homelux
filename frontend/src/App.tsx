import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/shared/Navbar';
import { Footer } from './components/shared/Footer';
import { Hero } from './components/landing/Hero';
import { USPBar } from './components/landing/USPBar';
import { BannerSections } from './components/landing/BannerSections';
import { CategoryGrid } from './components/landing/CategoryGrid';
import { ProductSlider } from './components/landing/ProductSlider';
import { Testimonials, NewsletterSection } from './components/landing/Testimonials';

// Real Page Components
import { CategoryPage } from './components/pages/CategoryPage';
import { ProductPage } from './components/pages/ProductPage';
import { AboutPage } from './components/pages/AboutPage';
import { ShowroomsPage } from './components/pages/ShowroomsPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { LoginPage } from './components/pages/LoginPage';
import { SignUpPage } from './components/pages/SignUpPage';

// Admin Components
import { AdminLayout } from './components/admin/AdminLayout';
import { AdminLoginPage } from './components/pages/admin/AdminLoginPage';
import { AdminDashboardHome } from './components/pages/admin/AdminDashboardHome';

const Home = () => (
  <>
    <Hero />
    <USPBar />
    <BannerSections />
    <CategoryGrid />
    <ProductSlider title="The Best For Your Home" />
    <ProductSlider title="Pieces That Complete Your Space" />
    <Testimonials />
    <NewsletterSection />
  </>
);

const MainLayout = ({ children }: { children: React.ReactNode }) => (
  <div className="min-h-screen bg-[#FDFBF7]">
    <Navbar />
    <main className="pt-20">
      {children}
    </main>
    <Footer />
  </div>
);

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        {/* Public Storefront Routes */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />
        <Route path="/category/:categoryId" element={<MainLayout><CategoryPage /></MainLayout>} />
        <Route path="/product/:productId" element={<MainLayout><ProductPage /></MainLayout>} />
        <Route path="/about" element={<MainLayout><AboutPage /></MainLayout>} />
        <Route path="/showrooms" element={<MainLayout><ShowroomsPage /></MainLayout>} />
        <Route path="/cart" element={<MainLayout><CartPage /></MainLayout>} />
        <Route path="/checkout" element={<MainLayout><CheckoutPage /></MainLayout>} />
        <Route path="/login" element={<MainLayout><LoginPage /></MainLayout>} />
        <Route path="/signup" element={<MainLayout><SignUpPage /></MainLayout>} />

        {/* Admin Authentication */}
        <Route path="/admin/login" element={<AdminLoginPage />} />

        {/* Admin Dashboard Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<AdminDashboardHome />} />
          {/* Placeholder routes for future modules */}
          <Route path="orders" element={<div className="p-8"><h1 className="text-2xl font-heading font-black italic uppercase">Orders Management (Coming Soon)</h1></div>} />
          <Route path="products" element={<div className="p-8"><h1 className="text-2xl font-heading font-black italic uppercase">Products Management (Coming Soon)</h1></div>} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


