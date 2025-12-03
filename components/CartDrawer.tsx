import React from 'react';
import { X, Minus, Plus, Trash2, FileText, ArrowRight } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onGenerateList: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onGenerateList
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-dark/20 backdrop-blur-[2px] transition-opacity"
        onClick={onClose}
      />

      {/* Drawer Panel */}
      <div className="relative w-full max-w-md bg-white shadow-2xl h-full flex flex-col animate-slide-in-right border-l border-secondary/20">
        {/* Header */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-white">
          <div>
            <h2 className="text-2xl font-serif font-bold text-dark">Your Selection</h2>
            <p className="text-xs text-gray-400 uppercase tracking-widest mt-1">Curated Items</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-light transition-colors text-gray-400 hover:text-dark"
          >
            <X size={24} className="stroke-[1.5]" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-300 space-y-4">
              <div className="w-16 h-16 border border-gray-200 flex items-center justify-center rounded-full">
                <FileText size={24} className="stroke-[1]" />
              </div>
              <p className="text-center font-serif text-lg text-gray-400 italic">No items selected</p>
              <button onClick={onClose} className="text-primary text-sm font-bold uppercase tracking-widest hover:text-dark transition-colors">
                Browse Collection
              </button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item.id} className="flex gap-4 group">
                <div className="relative w-24 h-24 shrink-0 overflow-hidden bg-gray-100">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-500"
                  />
                </div>
                <div className="flex-1 flex flex-col justify-between py-1">
                  <div>
                    <h3 className="font-serif font-medium text-dark text-lg leading-none mb-1">{item.name}</h3>
                    <p className="text-xs text-gray-500 uppercase tracking-wider">{item.style} · {item.type}</p>
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="flex items-center gap-4">
                      <button 
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="text-gray-400 hover:text-primary transition-colors disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="text-sm font-medium w-4 text-center text-dark">{item.quantity}</span>
                      <button 
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="text-gray-400 hover:text-primary transition-colors"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <button 
                      onClick={() => onRemoveItem(item.id)}
                      className="text-gray-300 hover:text-red-400 transition-colors"
                    >
                      <Trash2 size={16} strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Actions */}
        {cartItems.length > 0 && (
          <div className="p-6 border-t border-gray-100 bg-light">
            <div className="mb-4 flex justify-between items-center text-sm">
               <span className="text-gray-500">Selected Items</span>
               <span className="font-serif font-bold text-dark text-lg">{cartItems.reduce((acc, item) => acc + item.quantity, 0)}</span>
            </div>
            <button
              onClick={onGenerateList}
              className="w-full bg-dark text-white py-4 font-bold text-sm uppercase tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-3"
            >
              Generate Summary <ArrowRight size={16} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};