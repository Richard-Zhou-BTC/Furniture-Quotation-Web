import React, { useState, useMemo, useEffect, useRef } from 'react';
import { ShoppingBag, Search, Filter, Download, History, Clock, Globe, ChevronDown } from 'lucide-react';
import { PRODUCTS, STYLES, ITEM_TYPES } from './constants';
import { Style, ItemType, Product, CartItem, QuoteRecord, Language } from './types';
import { ProductCard } from './components/ProductCard';
import { CartDrawer } from './components/CartDrawer';
import { OrderSummaryModal } from './components/OrderSummaryModal';
import { generateOrderAnalysis } from './services/geminiService';
import { translations } from './translations';

const AccoladeLogo = () => (
  <div className="bg-dark text-white w-10 h-10 flex items-center justify-center shrink-0">
    <svg viewBox="0 0 100 100" className="w-6 h-6 fill-current">
      <rect x="20" y="15" width="60" height="8" /><rect x="25" y="23" width="50" height="5" />
      <rect x="30" y="30" width="10" height="55" /><rect x="45" y="30" width="10" height="55" />
      <rect x="60" y="30" width="10" height="55" />
    </svg>
  </div>
);

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>(Language.ZH);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = translations[language];

  const [activeStyle, setActiveStyle] = useState<Style>(Style.ALL);
  const [activeType, setActiveType] = useState<ItemType>(ItemType.ALL);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [history, setHistory] = useState<QuoteRecord[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [modalItems, setModalItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('accolade_history');
    if (savedHistory) {
      try { setHistory(JSON.parse(savedHistory)); } catch (e) { console.error(e); }
    }
    
    const handleClickOutside = (event: MouseEvent) => {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setIsLangMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const languages = [
    { code: Language.ZH, label: '中文', flag: '🇨🇳' },
    { code: Language.EN, label: 'English', flag: '🇺🇸' },
    { code: Language.FR, label: 'Français', flag: '🇫🇷' },
    { code: Language.ES, label: 'Español', flag: '🇪🇸' },
    { code: Language.JA, label: '日本語', flag: '🇯🇵' },
  ];

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      const matchesStyle = activeStyle === Style.ALL || product.style === activeStyle;
      const matchesType = activeType === ItemType.ALL || product.type === activeType;
      const lowerSearch = searchTerm.toLowerCase();
      
      const searchFields = [
        product.name, product.nameEn, product.nameFr, product.nameEs, product.nameJa,
        product.description, product.descriptionEn, product.descriptionFr, product.descriptionEs, product.descriptionJa
      ].filter(Boolean).map(s => s!.toLowerCase());

      const matchesSearch = searchFields.some(f => f.includes(lowerSearch));
      return matchesStyle && matchesType && matchesSearch;
    });
  }, [activeStyle, activeType, searchTerm]);

  const cartCount = useMemo(() => cart.reduce((sum, item) => sum + item.quantity, 0), [cart]);

  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateQuantity = (id: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) return { ...item, quantity: Math.max(0, item.quantity + delta) };
      return item;
    }).filter(item => item.quantity > 0));
  };

  const handleRemoveItem = (id: string) => setCart(prev => prev.filter(item => item.id !== id));
  
  const handleClearCart = () => {
    if (cart.length > 0 && window.confirm(t.clearConfirm)) setCart([]);
  };

  const handleGenerateList = async () => {
    setIsCartOpen(false);
    setModalItems(cart);
    setIsModalOpen(true);
    setIsGenerating(true);
    const analysis = await generateOrderAnalysis(cart, language);
    setAiResponse(analysis);
    setIsGenerating(false);
    
    const newRecord = { id: Date.now().toString(), timestamp: Date.now(), items: cart, totalQuantity: cartCount };
    const updatedHistory = [newRecord, ...history].slice(0, 20);
    setHistory(updatedHistory);
    localStorage.setItem('accolade_history', JSON.stringify(updatedHistory));
  };

  const handleViewHistoryItem = async (record: QuoteRecord) => {
    setModalItems(record.items);
    setIsModalOpen(true);
    setIsGenerating(true);
    const analysis = await generateOrderAnalysis(record.items, language);
    setAiResponse(analysis);
    setIsGenerating(false);
  };

  const formatTime = (timestamp: number) => {
    return new Date(timestamp).toLocaleString(language === Language.ZH ? 'zh-CN' : 'en-US', {
      month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-light text-dark flex flex-col font-sans selection:bg-primary selection:text-white transition-colors duration-500">
      <header className="sticky top-0 z-40 bg-light/95 backdrop-blur-md border-b border-secondary/20 shadow-sm shrink-0 print:hidden transition-colors">
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
              <input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white/50 border border-secondary/30 rounded-none py-2.5 pl-10 pr-4 text-sm focus:ring-1 focus:ring-primary focus:border-primary focus:bg-white transition-all outline-none text-dark" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            {/* Language Selector Dropdown */}
            <div className="relative" ref={langMenuRef}>
              <button onClick={() => setIsLangMenuOpen(!isLangMenuOpen)} className="flex items-center gap-2 px-3 py-2 border border-secondary/30 text-[11px] font-bold uppercase tracking-widest hover:border-dark transition-all bg-white min-w-[100px] justify-between">
                <div className="flex items-center gap-2">
                  <Globe size={14} />
                  <span>{languages.find(l => l.code === language)?.label}</span>
                </div>
                <ChevronDown size={12} className={`transition-transform duration-300 ${isLangMenuOpen ? 'rotate-180' : ''}`} />
              </button>
              
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white border border-secondary/20 shadow-luxury overflow-hidden animate-fade-in">
                  {languages.map((l) => (
                    <button key={l.code} onClick={() => { setLanguage(l.code); setIsLangMenuOpen(false); }} className={`w-full text-left px-4 py-3 text-xs font-bold flex items-center justify-between transition-colors ${language === l.code ? 'bg-primary text-white' : 'hover:bg-light'}`}>
                      <span>{l.label}</span>
                      <span>{l.flag}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-secondary/10 transition-colors group shrink-0">
              <ShoppingBag size={24} className="text-dark group-hover:text-primary transition-colors stroke-[1.5]" />
              {cartCount > 0 && <span className="absolute top-0 right-0 bg-primary text-white text-[10px] font-serif font-bold w-5 h-5 flex items-center justify-center rounded-full border-2 border-light transform scale-100 transition-transform">{cartCount}</span>}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 max-w-7xl mx-auto w-full flex items-stretch print:hidden">
        <aside className="hidden md:block w-64 border-r border-secondary/20 bg-light/50 min-h-[calc(100vh-80px)] shrink-0 flex flex-col overflow-y-auto max-h-[calc(100vh-80px)]">
          <div className="p-8 pb-4">
            <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-6 flex items-center gap-2 font-sans"><Filter size={12} /> {t.productCollection}</h2>
            <nav className="space-y-2">
              {STYLES.map(style => (
                <button key={style} onClick={() => setActiveStyle(style)} className={`w-full text-left px-0 py-2 text-sm font-serif transition-all border-l-2 pl-4 ${activeStyle === style ? 'border-primary text-dark font-bold italic' : 'border-transparent text-gray-500 hover:text-dark hover:border-secondary/50'}`}>
                  {t.styles[style]}
                </button>
              ))}
            </nav>
          </div>
          <div className="p-8 pt-4 flex-1">
             <h2 className="text-xs font-bold text-gray-400 uppercase tracking-[0.15em] mb-6 flex items-center gap-2 font-sans border-t border-secondary/10 pt-6"><History size={12} /> {t.quoteHistory}</h2>
            <div className="space-y-3">
              {history.length === 0 ? <p className="text-xs text-gray-400 italic font-serif">{t.noHistory}</p> : (
                history.map(record => (
                  <button key={record.id} onClick={() => handleViewHistoryItem(record)} className="w-full text-left group">
                    <div className="flex items-center gap-2 text-xs text-gray-600 group-hover:text-dark"><Clock size={10} className="text-gray-400" /><span className="font-serif">{formatTime(record.timestamp)}</span></div>
                    <div className="text-[10px] text-gray-400 pl-5 mt-0.5 group-hover:text-primary transition-colors">{record.totalQuantity} {t.itemsCount}</div>
                  </button>
                ))
              )}
            </div>
          </div>
        </aside>

        <main className="flex-1 px-4 sm:px-8 lg:px-12 py-10 w-full">
          <div className="md:hidden space-y-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input type="text" placeholder={t.searchPlaceholder} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full bg-white border border-secondary/30 py-2 pl-10 pr-4 text-sm rounded-none outline-none focus:border-primary text-dark" />
            </div>
          </div>

          <div className="mb-10 border-b border-secondary/20 pb-1">
             <div className="flex flex-wrap gap-x-6 gap-y-2">
                {ITEM_TYPES.map(type => (
                   <button key={type} onClick={() => setActiveType(type)} className={`py-2 text-sm font-medium transition-colors relative ${activeType === type ? 'text-primary' : 'text-gray-400 hover:text-dark'}`}>
                     {t.types[type]}{activeType === type && <span className="absolute bottom-[-5px] left-0 w-full h-0.5 bg-primary"></span>}
                   </button>
                ))}
             </div>
          </div>

          <div className="flex justify-between items-end mb-8">
            <div><h1 className="text-3xl font-serif font-bold text-dark">{t.styles[activeStyle]}</h1><p className="text-gray-500 text-sm mt-2 font-light tracking-wide">{activeType === ItemType.ALL ? t.productCollection : t.types[activeType]}</p></div>
            <span className="text-gray-400 text-xs tracking-wider uppercase">{filteredProducts.length} Items</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} addedCount={cart.find(c => c.id === product.id)?.quantity || 0} language={language} />
            ))}
          </div>
        </main>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cart} onUpdateQuantity={handleUpdateQuantity} onRemoveItem={handleRemoveItem} onClearCart={handleClearCart} onGenerateList={handleGenerateList} language={language} />
      <OrderSummaryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} isLoading={isGenerating} aiResponse={aiResponse} cartItems={modalItems} language={language} />
    </div>
  );
};

export default App;