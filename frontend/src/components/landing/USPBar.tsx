import React from 'react';
import * as Icons from 'lucide-react';
import { USP_ITEMS } from '../../data/mockData';
import { motion } from 'framer-motion';

export const USPBar: React.FC = () => {
  return (
    <div className="bg-white py-12 relative z-20 shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        {USP_ITEMS.map((item, index) => {
          const IconComponent = (Icons as any)[item.icon];
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center gap-4 group"
            >
              <div className="bg-accent/10 p-4 rounded-2xl group-hover:bg-accent group-hover:text-white transition-all duration-300">
                {IconComponent && <IconComponent className="w-6 h-6 transition-transform group-hover:rotate-12" />}
              </div>
              <div>
                <h4 className="font-bold text-sm text-gray-800">{item.title}</h4>
                <p className="text-xs text-gray-500">{item.description}</p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
