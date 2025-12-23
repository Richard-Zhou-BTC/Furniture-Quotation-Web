import React from 'react';
import { X, Minus, Plus, Trash2, FileText, ArrowRight } from 'lucide-react';
import { CartItem, Language } from '../types';
import { getOptimizedImageUrl } from '../utils';
import { translations } from '../translations';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
  onGenerateList: () => void;
  language: Language;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
  onGenerateList,
  language
}) => {
  const t = translations[language];
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-dark/20 backdrop-blur-[2px] transition-opacity" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col border-l border-secondary/20">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-serif font-bold text-dark">{t.curatedItems}</h2>
            <div className="flex items-center gap-3 mt-1">
              <p className="text-xs text-gray-400 uppercase tracking-widest">Curated Selection</p>
              {cartItems.length > 0 && (
                <button 
                  onClick={onClearCart}
                  className="text-[10px] uppercase tracking-wider text-gray-400 hover:text-red-500 border border-transparent hover:border-red-200 bg-gray-50 hover:bg-red-50 px-2 py-0.5 rounded transition-all flex items-center gap-1"
                >
                  <Trash2 size={10} /> {t.clearCart}
                </button>
              )}
            </div>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-light transition-colors text-gray-400 hover:text-dark">
            <X size={24} className="stroke-[1.5]" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4">
              <div className="w-16 h-16 border border-gray-200 flex items-center justify-center rounded-full">
                <FileText size={24} className="stroke-[1]" />
              </div>
              <p className="text-center font-serif text-lg text-gray-400 italic">{t.emptyCart}</p>
              <button onClick={onClose} className="text-primary text-sm font-bold uppercase tracking-widest hover:text-dark transition-colors">
                {t.browseCatalog}
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-100">
                  <img src={getOptimizedImageUrl(item.image, 200)} alt={item.name} className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500" />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif font-medium text-dark text-lg leading-none mb-1">
                      {language === Language.EN && item.nameEn ? item.nameEn : item.name}
                    </h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{t.styles[item.style]} · {t.types[item.type]}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                      <button onClick={() => onUpdateQuantity(item.id, -1)} className="text-gray-400 hover:text-primary transition-colors disabled:opacity-30" disabled={item.quantity <= 1}>
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center text-dark">{item.quantity}</span>
                      <button onClick={() => onUpdateQuantity(item.id, 1)} className="text-gray-400 hover:text-primary transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <button onClick={() => onRemoveItem(item.id)} className="text-gray-300 hover:text-red-400 transition-colors">
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-light">
            <div className="mb-4 flex justify-between items-center text-sm">
               <span className="text-gray-500">{t.itemTotal}</span>
               <span className="font-serif font-bold text-dark text-lg">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <button onClick={onGenerateList} className="w-full bg-dark text-white py-4 font-bold text-sm uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-3">
              {t.generateQuote} <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};