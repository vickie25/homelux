import React from 'react';
import { Star, ShoppingCart } from 'lucide-react';
import { useCartStore } from '../../hooks/useCartStore';
import { motion } from 'framer-motion';

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  imageUrl: string;
  badge?: string;
  discountLabel?: string;
}

export const ProductCard: React.FC<ProductCardProps> = (product) => {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem({
      id: product.id,
      title: product.title,
      price: product.price,
      imageUrl: product.imageUrl,
    });
  };

  return (
    <motion.div
      key={product.id}
      whileHover={{ y: -10 }}
      layout
      className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 cursor-pointer border border-gray-100"
    >
      {/* Image Wrapper */}
      <div className="relative overflow-hidden aspect-[4/5]">
        <img
          src={product.imageUrl}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.badge && (
            <span className="bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.badge}
            </span>
          )}
          {product.discountLabel && (
            <span className="bg-accent text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {product.discountLabel}
            </span>
          )}
        </div>

        {/* Quick Add Button Overlay */}
        <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center p-6">
          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleAddToCart}
            aria-label={`Add ${product.title} to cart`}
            className="w-full bg-white text-primary flex items-center justify-center gap-2 py-3 rounded-xl font-bold shadow-lg hover:bg-primary hover:text-white transition-all cursor-pointer"
          >
            <ShoppingCart className="w-5 h-5" />
            Quick Add
          </motion.button>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-3">
        <div className="flex items-center gap-2">
          <div className="flex text-accent">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? 'fill-current' : 'text-gray-300'}`}
              />
            ))}
          </div>
          <span className="text-[10px] text-gray-400 font-medium">({product.reviewCount})</span>
        </div>

        <h3 className="font-bold text-gray-800 line-clamp-1 group-hover:text-accent transition-colors">
          {product.title}
        </h3>

        <div className="flex items-center gap-3">
          <span className="text-lg font-extrabold text-primary">${product.price.toFixed(2)}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-400 line-through font-medium">
              ${product.originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};
