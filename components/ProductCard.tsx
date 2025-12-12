
import React from 'react';
import { Plus } from 'lucide-react';
import { Product } from '../types';
import { getOptimizedImageUrl } from '../utils';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  addedCount: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, addedCount }) => {
  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-500 hover:shadow-luxury border border-transparent hover:border-secondary/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={getOptimizedImageUrl(product.image, 600)} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Minimal Tags */}
        <div className="absolute top-0 left-0 p-3 flex flex-col items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white/95 px-2 py-1 text-[10px] uppercase tracking-widest text-dark font-bold shadow-sm">
            {product.style}
          </span>
        </div>
      </div>
      
      <div className="pt-5 pb-2 flex flex-col flex-grow px-1">
        <div className="mb-2">
          <h3 className="font-serif text-xl text-dark leading-tight mb-1 group-hover:text-primary transition-colors">{product.name}</h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider">{product.type}</p>
        </div>
        
        <p className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed font-light flex-grow">{product.description}</p>
        
        <button 
          onClick={() => onAddToCart(product)}
          className={`w-full py-3 text-sm uppercase tracking-widest font-bold border transition-all duration-300 flex items-center justify-center gap-2 ${
            addedCount > 0 
              ? 'bg-primary border-primary text-white' 
              : 'bg-transparent border-secondary/30 text-dark hover:border-dark hover:bg-dark hover:text-white'
          }`}
        >
          {addedCount > 0 ? (
            <>已添加 ({addedCount})</>
          ) : (
            <>
              <Plus size={14} /> 加入清单
            </>
          )}
        </button>
      </div>
    </div>
  );
};
