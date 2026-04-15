import React from 'react';
import { motion } from 'framer-motion';
import { HERO_CONTENT } from '../../data/mockData';
import { ChevronRight, ShoppingCart } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden bg-hero">
      {/* Background Blobs */}
      <div className="blob -top-20 -left-20 scale-150 opacity-40 shrink-0" />
      <div className="blob top-1/2 -right-20 scale-125 opacity-30 shrink-0" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-white space-y-8"
        >
          <div className="space-y-4">
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-accent font-semibold tracking-widest uppercase text-sm"
            >
              Exclusive Collection 2026
            </motion.span>
            <h1 className="text-5xl md:text-7xl font-heading leading-tight leading-[1.1]">
              {HERO_CONTENT.title}
            </h1>
            <p className="text-lg text-gray-200/90 max-w-lg font-light leading-relaxed">
              {HERO_CONTENT.subtitle}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button className="btn-accent-custom flex items-center gap-2 group cursor-pointer">
              {HERO_CONTENT.ctaText}
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button className="px-8 py-3 rounded-full font-semibold border-2 border-white/30 text-white hover:bg-white hover:text-hero transition-all duration-300 cursor-pointer">
              Browse Categories
            </button>
          </div>

          {/* Mini Stats */}
          <div className="flex gap-12 pt-8 border-t border-white/10">
            <div>
              <p className="text-2xl font-bold">2.5k+</p>
              <p className="text-xs text-gray-400 uppercase tracking-tighter">Premium Pieces</p>
            </div>
            <div>
              <p className="text-2xl font-bold">15+</p>
              <p className="text-xs text-gray-400 uppercase tracking-tighter">Global Showrooms</p>
            </div>
          </div>
        </motion.div>

        {/* Hero Image / Composition */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative"
        >
          <div className="relative z-10 glass-card p-4 rounded-2xl">
            <img
              src={HERO_CONTENT.imageUrl}
              alt="Premium Furniture"
              className="rounded-xl w-full h-[500px] object-cover shadow-2xl"
            />
          </div>
          
          {/* Decorative Floating Element */}
          <motion.div
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-10 -left-10 glass-card p-6 hidden lg:block"
          >
            <div className="flex items-center gap-4">
              <div className="bg-accent p-3 rounded-full">
                <ShoppingCart className="text-white w-6 h-6" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-800">Most Popular</p>
                <p className="text-xs text-gray-500">Velvet Sofa - $899</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
