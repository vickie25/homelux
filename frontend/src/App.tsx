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
import { OrdersPage } from './components/pages/admin/OrdersPage';
import { ProductsPage } from './components/pages/admin/ProductsPage';
import { CategoriesPage } from './components/pages/admin/CategoriesPage';
import { CustomersPage } from './components/pages/admin/CustomersPage';
import { InventoryPage } from './components/pages/admin/InventoryPage';
import { PromotionsPage } from './components/pages/admin/PromotionsPage';
import { DeliveryPage } from './components/pages/admin/DeliveryPage';
import { FinancialsPage } from './components/pages/admin/FinancialsPage';
import { AdminShowroomsPage } from './components/pages/admin/AdminShowroomsPage';
import { ReviewsPage } from './components/pages/admin/ReviewsPage';
import { ReportsPage } from './components/pages/admin/ReportsPage';
import { StaffPage } from './components/pages/admin/StaffPage';
import { SettingsPage } from './components/pages/admin/SettingsPage';
import { ProtectedRoute } from './components/shared/ProtectedRoute';

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
        <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
          <Route path="dashboard" element={<AdminDashboardHome />} />
          <Route path="orders" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'SALES_AGENT', 'DISPATCHER']}><OrdersPage /></ProtectedRoute>} />
          <Route path="products" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'SALES_AGENT', 'INVENTORY_MANAGER']}><ProductsPage /></ProtectedRoute>} />
          <Route path="categories" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER']}><CategoriesPage /></ProtectedRoute>} />
          <Route path="customers" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'SALES_AGENT']}><CustomersPage /></ProtectedRoute>} />
          <Route path="inventory" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER']}><InventoryPage /></ProtectedRoute>} />
          <Route path="promotions" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER']}><PromotionsPage /></ProtectedRoute>} />
          <Route path="delivery" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'DISPATCHER', 'DRIVER']}><DeliveryPage /></ProtectedRoute>} />
          <Route path="financials" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT']}><FinancialsPage /></ProtectedRoute>} />
          <Route path="showrooms" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'INVENTORY_MANAGER']}><AdminShowroomsPage /></ProtectedRoute>} />
          <Route path="reviews" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER']}><ReviewsPage /></ProtectedRoute>} />
          <Route path="reports" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT']}><ReportsPage /></ProtectedRoute>} />
          <Route path="staff" element={<ProtectedRoute allowedRoles={['SUPER_ADMIN']}><StaffPage /></ProtectedRoute>} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;


