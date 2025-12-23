import React from 'react';
import { Plus } from 'lucide-react';
import { Product, Language } from '../types';
import { getOptimizedImageUrl } from '../utils';
import { translations } from '../translations';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product) => void;
  addedCount: number;
  language: Language;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onAddToCart, addedCount, language }) => {
  const t = translations[language];

  // Robust translation picker with fallback chain: Current Lang -> EN -> ZH
  const getTranslatedValue = (field: 'name' | 'desc') => {
    if (field === 'name') {
      const options = {
        [Language.EN]: product.nameEn,
        [Language.FR]: product.nameFr,
        [Language.ES]: product.nameEs,
        [Language.JA]: product.nameJa,
        [Language.ZH]: product.name
      };
      return options[language] || product.nameEn || product.name;
    } else {
      const options = {
        [Language.EN]: product.descriptionEn,
        [Language.FR]: product.descriptionFr,
        [Language.ES]: product.descriptionEs,
        [Language.JA]: product.descriptionJa,
        [Language.ZH]: product.description
      };
      return options[language] || product.descriptionEn || product.description;
    }
  };

  return (
    <div className="group flex flex-col h-full bg-white transition-all duration-500 hover:shadow-luxury border border-transparent hover:border-secondary/20">
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={getOptimizedImageUrl(product.image, 600)} 
          alt={product.name} 
          loading="lazy"
          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute top-0 left-0 p-3 flex flex-col items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-white/95 px-2 py-1 text-[10px] uppercase tracking-widest text-dark font-bold shadow-sm">
            {t.styles[product.style]}
          </span>
        </div>
      </div>
      
      <div className="pt-5 pb-2 flex flex-col flex-grow px-1">
        <div className="mb-2">
          <h3 key={language + 'name'} className="font-serif text-xl text-dark leading-tight mb-1 group-hover:text-primary transition-all duration-500 animate-fade-in">
            {getTranslatedValue('name')}
          </h3>
          <p className="text-xs text-gray-400 uppercase tracking-wider">{t.types[product.type]}</p>
        </div>
        
        <p key={language + 'desc'} className="text-gray-500 text-sm mb-6 line-clamp-2 leading-relaxed font-light flex-grow transition-all duration-500 animate-fade-in">
          {getTranslatedValue('desc')}
        </p>
        
        <button 
          onClick={() => onAddToCart(product)}
          className={`w-full py-3 text-sm uppercase tracking-widest font-bold border transition-all duration-300 flex items-center justify-center gap-2 ${
            addedCount > 0 
              ? 'bg-primary border-primary text-white' 
              : 'bg-transparent border-secondary/30 text-dark hover:border-dark hover:bg-dark hover:text-white'
          }`}
        >
          {addedCount > 0 ? (
            <>{t.added} ({addedCount})</>
          ) : (
            <>
              <Plus size={14} /> {t.addToList}
            </>
          )}
        </button>
      </div>
    </div>
  );
};