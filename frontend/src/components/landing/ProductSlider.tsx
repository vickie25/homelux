import React from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { PRODUCTS } from '../../data/mockData';
import { ProductCard } from '../shared/ProductCard';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

interface ProductSliderProps {
  title: string;
}

export const ProductSlider: React.FC<ProductSliderProps> = ({ title }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: 'start',
    loop: false,
    skipSnaps: false,
    dragFree: true,
  });

  const scrollPrev = () => emblaApi && emblaApi.scrollPrev();
  const scrollNext = () => emblaApi && emblaApi.scrollNext();

  return (
    <section className="py-24 bg-background overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="max-w-7xl mx-auto px-6 space-y-12"
      >
        <div className="flex items-end justify-between">
          <div className="space-y-4">
            <h2 className="text-4xl font-heading">{title}</h2>
            <div className="h-1 w-20 bg-accent rounded-full" />
          </div>
          
          <div className="flex gap-4">
            <button
              onClick={scrollPrev}
              aria-label="Previous Slide"
              className="p-3 rounded-full border border-gray-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={scrollNext}
              aria-label="Next Slide"
              className="p-3 rounded-full border border-gray-200 hover:bg-primary hover:text-white transition-all cursor-pointer"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-6">
            {PRODUCTS.concat(PRODUCTS).map((product, index) => (
              <div key={`${product.id}-${index}`} className="flex-[0_0_280px] md:flex-[0_0_320px]">
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};
