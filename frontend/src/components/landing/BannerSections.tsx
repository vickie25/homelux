import React from 'react';
import { Play } from 'lucide-react';
import { motion } from 'framer-motion';

interface BannerProps {
  title: string;
  subtitle?: string;
  imageUrl: string;
  isVideo?: boolean;
  reverse?: boolean;
}

const Banner: React.FC<BannerProps> = ({ title, subtitle, imageUrl, isVideo, reverse }) => {
  return (
    <section className="py-12 px-6 overflow-hidden">
      <div className={`max-w-7xl mx-auto flex flex-col ${reverse ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>
        <motion.div
           initial={{ opacity: 0, x: reverse ? 50 : -50 }}
           whileInView={{ opacity: 1, x: 0 }}
           viewport={{ once: true }}
           transition={{ duration: 0.8 }}
           className="relative w-full aspect-[16/9] md:aspect-video rounded-[2rem] overflow-hidden group cursor-pointer"
        >
          <img
            src={imageUrl}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center">
            {isVideo && (
              <motion.button
                aria-label={`Play video for ${title}`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="bg-white/90 backdrop-blur-md p-6 rounded-full shadow-2xl cursor-pointer"
              >
                <Play className="w-8 h-8 text-primary fill-primary" />
              </motion.button>
            )}
          </div>
          
          {/* Internal Content (Liquid Glass Style) */}
          <div className="absolute bottom-8 left-8 right-8 p-8 liquid-glass rounded-2xl md:max-w-md hidden md:block">
            <h3 className="text-2xl text-white font-heading mb-2">{title}</h3>
            {subtitle && <p className="text-gray-100 text-sm font-light">{subtitle}</p>}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export const BannerSections: React.FC = () => {
  return (
    <div className="bg-white space-y-0">
      <Banner
        title="Check our Latest Collection"
        subtitle="Experience luxury like never before with our 2026 furniture line."
        imageUrl="https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?q=80&w=2070&auto=format&fit=crop"
        isVideo={true}
      />
      <Banner
        title="Feel Nature At Your Door"
        subtitle="Sustainable materials meet modern aesthetics for a harmonious home."
        imageUrl="https://images.unsplash.com/photo-1519710164239-da123dc03ef4?q=80&w=1974&auto=format&fit=crop"
        isVideo={true}
        reverse={true}
      />
      <Banner
        title="Ideal for Everyday Living"
        subtitle="Comfort focused designs for real homes and real lives."
        imageUrl="https://images.unsplash.com/photo-1524758631624-e2822e304c36?q=80&w=2070&auto=format&fit=crop"
        isVideo={true}
      />
    </div>
  );
};
