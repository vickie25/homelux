import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X } from 'lucide-react';
import { useCartStore } from '../../hooks/useCartStore';
import { cn } from '../../lib/utils';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const totalItems = useCartStore((state) => state.totalItems());

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#' },
    { name: 'All Products', href: '#' },
    { name: 'Collections', href: '#' },
    { name: 'Best Sellers', href: '#' },
    { name: 'Brand', href: '#' },
    { name: 'Contacts', href: '#' },
  ];

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4 outline-none',
        isScrolled ? 'bg-white/80 backdrop-blur-lg shadow-sm py-2' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-heading font-extrabold flex items-baseline">
            <span className="text-primary tracking-tighter">Home</span>
            <span className="text-accent italic tracking-tighter">LuX</span>
          </div>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-sm font-medium hover:text-accent transition-colors duration-200"
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* Search & Actions */}
        <div className="flex items-center gap-4">
          <div className="relative group hidden sm:block">
            <input
              type="text"
              placeholder="Search products..."
              className="bg-gray-100/50 border-none rounded-full py-2 pl-10 pr-4 text-sm focus:ring-2 focus:ring-accent/20 transition-all duration-300 w-40 group-hover:w-60"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          </div>

          <button 
            aria-label="Open Shopping Cart"
            className="p-2 hover:bg-accent/10 rounded-full transition-colors relative cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 bg-accent text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full ring-2 ring-white">
                {totalItems}
              </span>
            )}
          </button>

          <button 
            aria-label="User Profile"
            className="p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer"
          >
            <User className="w-5 h-5" />
          </button>

          <button
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
            className="md:hidden p-2 hover:bg-accent/10 rounded-full transition-colors cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-xl animate-in slide-in-from-top duration-300">
          <div className="flex flex-col p-6 gap-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-lg font-medium hover:text-accent border-b border-gray-100 pb-2"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="sm:hidden relative mt-2">
              <input
                type="text"
                placeholder="Search..."
                className="w-full bg-gray-100 border-none rounded-lg py-3 pl-12 pr-4"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};
