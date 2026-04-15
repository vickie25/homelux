import React from 'react';
import { CATEGORIES } from '../../data/mockData';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export const CategoryGrid: React.FC = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 space-y-12">
        <div className="text-center space-y-4 max-w-2xl mx-auto">
          <h2 className="text-4xl md:text-5xl">Select Categories That Refresh Your Home</h2>
          <p className="text-gray-500 font-light text-lg">
            Explore our diverse range of premium furniture tailored for every corner of your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative h-[400px] rounded-3xl overflow-hidden cursor-pointer shadow-sm hover:shadow-2xl transition-all duration-700"
            >
              <img
                src={category.imageUrl}
                alt={category.title}
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent group-hover:from-black/90 transition-all duration-500" />
              
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-center text-center space-y-4">
                <h3 className="text-2xl text-white font-heading">{category.title}</h3>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  className="bg-accent p-3 rounded-full text-white opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0"
                >
                  <ArrowUpRight className="w-5 h-5" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
