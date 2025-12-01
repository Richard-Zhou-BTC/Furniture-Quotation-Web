import React, { useState, useMemo } from 'react';
import { ShoppingBag, Search, Filter } from 'lucide-react';
import { PRODUCTS, STYLES, ITEM_TYPES } from './constants';
import { Style, ItemType, Product, CartItem } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { OrderSummaryModal } from './components/OrderSummaryModal';
import { generateOrderAnalysis } from './services/geminiService';

// Custom Accolade Logo Component
const AccoladeLogo = () => (
  <div className="bg-dark text-white w-10 h-10 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current">
      {/* Top Cap */}
      <rect x="20" y="15" width="60" height="8" />
      <rect x="25" y="23" width="50" height="5" />
      {/* Pillar Shafts */}
      <rect x="30" y="30" width="10" height="55" />
      <rect x="45" y="30" width="10" height="55" />
      <rect x="60" y="30" width="10" height="55" />
    </svg>
  </div>
);

const App: React.FC = () => {
  // State
  const [activeStyle, setActiveStyle] = useState<Style>(Style.ALL);
  const [activeType, setActiveType] = useState<ItemType>(ItemType.ALL);
  
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // AI/Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // Derived State
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesStyle = activeStyle === Style.ALL || product.style === activeStyle;
      const matchesType = activeType === ItemType.ALL || product.type === activeType;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesStyle && matchesType && matchesSearch;
    });
  }, [activeStyle, activeType, searchTerm]);

  const cartCount = useMemo(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  // Handlers
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: string) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleGenerateList = async () => {
    setIsCartOpen(false);
    setIsModalOpen(true);
    setIsGenerating(true);
    
    const analysis = await generateOrderAnalysis(cart);
    
    setAiResponse(analysis);
    setIsGenerating(false);
  };

  return (
    <div className="min-h-screen bg-light text-dark flex flex-col font-sans selection:bg-primary selection:text-white">
      
      {/* Navbar */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-sm shrink-0 print:hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
          <div className="flex items-center gap-3 shrink-0">
            <AccoladeLogo />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-wide text-dark leading-none">ACCOLADE</span>
              <span className="text-[10px] tracking-[0.2em] uppercase text-gray-500 mt-1">Furniture Collection</span>
            </div>
          </div>

          <div className="flex-1 max-w-md hidden md:block">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-primary transition-colors" size={18} />
              <input 
                type="text"
                placeholder="Search collection..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-50 border border-transparent rounded-none py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-all outline-none placeholder:font-serif placeholder:italic"
              />
            </div>
          </div>

          <button 
            onClick={() => setIsCartOpen(true)}
            className="relative p-2 hover:bg-gray-50 transition-colors group shrink-0"
          >
            <ShoppingBag size={24} className="text-dark group-hover:text-primary transition-colors stroke-[1.5]" />
            {cartCount > 0 && (
              <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-serif font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-white transform scale-100 transition-transform">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full flex items-stretch print:hidden">
        
        {/* Left Sidebar (Desktop) - Level 1: Style */}
        <aside className="hidden md:block w-64 border-r border-gray-100 bg-white min-h-[calc(100vh-80px)] shrink-0">
          <div className="sticky top-24 p-8">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-6 flex items-center gap-2 font-sans">
               <Filter size={12} /> Collections
            </h2>
            <nav className="space-y-2">
              {STYLES.map(style => (
                <button
                  key={style}
                  onClick={() => setActiveStyle(style)}
                  className={`w-full text-left px-0 py-2 text-sm font-serif transition-all border-l-2 pl-4 ${
                    activeStyle === style 
                      ? 'border-primary text-dark font-bold italic' 
                      : 'border-transparent text-gray-500 hover:text-dark hover:border-gray-200'
                  }`}
                >
                  {style}
                </button>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10 w-full">
          
          {/* Mobile Search & Categories */}
          <div className="md:hidden space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white border border-gray-200 py-2 pl-10 pr-4 text-sm rounded-none outline-none focus:border-primary"
              />
            </div>
            <div className="-mx-4 px-4 overflow-x-auto no-scrollbar">
               <div className="flex gap-3 min-w-max pb-2">
                  {STYLES.map(style => (
                    <button
                      key={style}
                      onClick={() => setActiveStyle(style)}
                      className={`text-sm px-4 py-2 border transition-colors font-serif ${
                        activeStyle === style 
                          ? 'bg-dark border-dark text-white italic' 
                          : 'bg-white border-gray-200 text-gray-600'
                      }`}
                    >
                      {style}
                    </button>
                  ))}
               </div>
            </div>
          </div>

          {/* Level 2: Item Type Filter (Minimal Tabs) */}
          <div className="mb-10 border-b border-gray-100 pb-1">
             <div className="flex flex-wrap gap-x-6 gap-y-2">
                {ITEM_TYPES.map(type => (
                   <button
                     key={type}
                     onClick={() => setActiveType(type)}
                     className={`py-2 text-sm font-medium transition-colors relative ${
                        activeType === type
                           ? 'text-primary'
                           : 'text-gray-400 hover:text-dark'
                     }`}
                   >
                     {type}
                     {activeType === type && (
                       <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>
                     )}
                   </button>
                ))}
             </div>
          </div>

          <div className="flex justify-between items-end mb-8">
            <div>
               <h1 className="text-3xl font-serif font-bold text-dark">{activeStyle}</h1>
               <p className="text-gray-500 text-sm mt-2 font-light tracking-wide">
                  {activeType === ItemType.ALL ? '精选系列' : activeType}
               </p>
            </div>
            <span className="text-gray-400 text-xs tracking-wider uppercase">{filteredProducts.length} Items</span>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
              {filteredProducts.map(product => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onAddToCart={handleAddToCart}
                  addedCount={cart.find(c => c.id === product.id)?.quantity || 0}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-24 bg-white border border-gray-100">
              <p className="text-gray-400 text-lg font-serif italic">暂无符合条件的商品</p>
              <button 
                onClick={() => {setSearchTerm(''); setActiveStyle(Style.ALL); setActiveType(ItemType.ALL)}}
                className="mt-6 text-primary text-sm font-bold uppercase tracking-widest hover:text-dark transition-colors"
              >
                View All Collection
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Cart Components */}
      <CartDrawer 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cartItems={cart}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onGenerateList={handleGenerateList}
      />

      <OrderSummaryModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        isLoading={isGenerating}
        aiResponse={aiResponse}
        cartItems={cart}
      />
      
      {/* Mobile Floating Action */}
      {!isCartOpen && cartCount > 0 && (
        <div className="fixed bottom-6 left-6 right-6 md:hidden z-30 print:hidden">
          <button 
            onClick={() => setIsCartOpen(true)}
            className="w-full bg-dark text-white p-4 shadow-luxury flex justify-between items-center ring-1 ring-white/10"
          >
            <div className="flex items-center gap-3">
              <span className="bg-primary text-white w-6 h-6 flex items-center justify-center text-xs font-serif">{cartCount}</span>
              <span className="font-serif italic text-lg">Selection</span>
            </div>
            <span className="text-xs uppercase tracking-widest text-gray-300">View List</span>
          </button>
        </div>
      )}

    </div>
  );
};

export default App;