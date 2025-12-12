
import React, { useState } from 'react';
import { X, Check, Loader2, Download, Printer, Mail, QrCode } from 'lucide-react';
import QRCode from 'react-qr-code';
import { CartItem } from '../types';
import { getOptimizedImageUrl } from '../utils';

interface OrderSummaryModalProps {
  isOpen: boolean;
  onClose: () => void;
  isLoading: boolean;
  aiResponse: string;
  cartItems: CartItem[];
}

export const OrderSummaryModal: React.FC<OrderSummaryModalProps> = ({
  isOpen,
  onClose,
  isLoading,
  aiResponse,
  cartItems,
}) => {
  const [showQrCode, setShowQrCode] = useState(false);

  if (!isOpen) return null;

  // Mock URL that would represent the PDF download
  const downloadUrl = `https://accolade-furniture.com/quote/download?id=${Date.now()}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4 print:absolute print:inset-0 print:z-[100] print:items-start print:px-0">
      <div 
        className="absolute inset-0 bg-dark/30 backdrop-blur-sm transition-opacity print:hidden"
        onClick={onClose}
      />
      
      <div className="relative bg-white w-full max-w-4xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh] print:max-h-none print:shadow-none print:w-full print:max-w-none">
        
        {/* Header - Screen Only */}
        <div className="p-6 border-b border-gray-100 flex justify-between items-center shrink-0 print:hidden bg-light">
          <div>
            <h2 className="text-2xl font-serif font-bold text-dark">清单与报价</h2>
            <p className="text-gray-400 text-xs uppercase tracking-widest mt-1">专为贵宾定制</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-dark transition-colors">
            <X size={24} className="stroke-[1.5]" />
          </button>
        </div>

        {/* Printable Content */}
        <div className="overflow-y-auto p-8 flex-1 print:overflow-visible print:p-0 relative">
          
          {/* Company Header */}
          <div className="text-center mb-10 pb-6 border-b border-gray-200">
            {/* Logo Mark for Print */}
            <div className="mx-auto w-12 h-12 bg-dark text-white flex items-center justify-center mb-4">
               <svg viewBox="0 0 100 100" className="w-8 h-8 fill-current">
                 <rect x="20" y="15" width="60" height="8" />
                 <rect x="25" y="23" width="50" height="5" />
                 <rect x="30" y="30" width="10" height="55" />
                 <rect x="45" y="30" width="10" height="55" />
                 <rect x="60" y="30" width="10" height="55" />
               </svg>
            </div>
            <h1 className="text-3xl font-serif font-bold text-dark tracking-wide mb-2">宁海县雅格莱顿家具有限公司</h1>
            <p className="text-gray-500 uppercase tracking-[0.2em] text-xs font-medium">NINGHAI ACCOLADE FURNITURE LTD.</p>
          </div>

          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-20 space-y-6 print:hidden">
              <Loader2 size={40} className="text-primary animate-spin" />
              <div className="text-center">
                 <p className="text-dark font-serif text-lg italic">正在生成内容...</p>
                 <p className="text-gray-400 text-sm mt-1 uppercase tracking-widest">正在为您撰写专属信函</p>
              </div>
            </div>
          ) : (
            <div className="space-y-10">
              {/* Itemized Table */}
              <div>
                <table className="w-full text-sm text-left">
                  <thead className="text-gray-400 font-medium uppercase tracking-wider text-xs border-b border-gray-200">
                    <tr>
                      <th className="px-4 py-4 text-center w-16 font-normal">序号</th>
                      <th className="px-4 py-4 w-24 font-normal">图片</th>
                      <th className="px-4 py-4 font-normal">产品名称</th>
                      <th className="px-4 py-4 font-normal">风格 / 品类</th>
                      <th className="px-4 py-4 text-center font-normal">数量</th>
                      <th className="px-4 py-4 text-right font-normal w-32">单价</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {cartItems.map((item, index) => (
                      <tr key={item.id} className="group">
                        <td className="px-4 py-6 text-center font-serif text-gray-400">{String(index + 1).padStart(2, '0')}</td>
                        <td className="px-4 py-6">
                          <img 
                            src={getOptimizedImageUrl(item.image, 150)} 
                            alt={item.name} 
                            className="w-16 h-16 object-cover bg-gray-100 grayscale-[10%]" 
                          />
                        </td>
                        <td className="px-4 py-6">
                           <span className="font-serif text-lg text-dark block mb-1">{item.name}</span>
                        </td>
                        <td className="px-4 py-6 text-gray-500">{item.style} · {item.type}</td>
                        <td className="px-4 py-6 text-center font-serif text-lg text-dark">{item.quantity}</td>
                        <td className="px-4 py-6 text-right align-middle">
                          <div className="w-full border-b border-gray-200 h-8"></div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                
                {/* Total Price Section */}
                <div className="flex justify-end mt-4 pt-4 px-4">
                  <div className="flex items-end gap-4">
                     <span className="text-sm font-bold uppercase tracking-widest text-dark mb-1">总价:</span>
                     <div className="w-48 border-b border-dark h-8"></div>
                  </div>
                </div>
              </div>

              {/* Thank You Letter Section - Starts on new page in print */}
              <div className="bg-light p-8 border-l-4 border-primary print:bg-transparent print:p-0 print:border-l-0 print:break-before-page">
                {/* Small Header for the second page (Print Only) */}
                <div className="hidden print:flex items-center justify-center mb-8 opacity-50">
                   <div className="flex items-center gap-2">
                     <svg viewBox="0 0 100 100" className="w-4 h-4 fill-current text-dark">
                         <rect x="20" y="15" width="60" height="8" />
                         <rect x="25" y="23" width="50" height="5" />
                         <rect x="30" y="30" width="10" height="55" />
                         <rect x="45" y="30" width="10" height="55" />
                         <rect x="60" y="30" width="10" height="55" />
                     </svg>
                     <span className="text-xs uppercase tracking-widest text-dark font-bold">Accolade Furniture</span>
                   </div>
                </div>

                <h3 className="text-primary text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                  <Mail size={16} />
                  雅格致辞
                </h3>
                <div className="prose prose-stone prose-p:font-serif prose-p:text-dark/80 max-w-none">
                   <div className="whitespace-pre-wrap leading-loose text-justify">
                      {aiResponse}
                   </div>
                </div>
              </div>
              
              <div className="hidden print:block text-center mt-16 pt-8 border-t border-gray-200">
                <p className="font-serif italic text-dark text-lg mb-2">感谢您选择雅格家居。</p>
                <p className="text-gray-400 text-[10px] uppercase tracking-widest">卓越品质 · 匠心设计</p>
              </div>
            </div>
          )}

          {/* QR Code Overlay */}
          {showQrCode && (
            <div className="absolute inset-0 z-10 bg-white/95 backdrop-blur-sm flex items-center justify-center print:hidden">
              <div className="bg-white p-8 shadow-2xl border border-secondary/20 max-w-sm w-full text-center relative">
                 <button 
                  onClick={() => setShowQrCode(false)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-dark"
                 >
                   <X size={20} />
                 </button>
                 
                 <div className="mb-6">
                    <h3 className="font-serif font-bold text-2xl text-dark mb-2">移动端下载</h3>
                    <p className="text-xs uppercase tracking-widest text-gray-400">微信扫码获取</p>
                 </div>
                 
                 <div className="bg-white p-4 inline-block border border-gray-100 shadow-inner mb-4">
                    <QRCode value={downloadUrl} size={180} />
                 </div>
                 
                 <div className="flex items-center justify-center gap-2 text-primary font-medium text-sm">
                   <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                   请扫码
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions - Screen Only */}
        {!isLoading && (
          <div className="p-6 border-t border-gray-100 bg-white shrink-0 flex gap-4 print:hidden">
             <button 
              onClick={() => window.print()} 
              className="flex-1 border border-secondary/30 bg-white text-dark font-bold text-sm uppercase tracking-widest py-4 hover:border-dark transition-all flex items-center justify-center gap-2"
             >
               <Printer size={16} />
               保存为 PDF
             </button>
             
             <button 
              onClick={() => setShowQrCode(!showQrCode)} 
              className={`flex-1 border text-dark font-bold text-sm uppercase tracking-widest py-4 transition-all flex items-center justify-center gap-2 ${showQrCode ? 'bg-dark text-white border-dark' : 'bg-white border-secondary/30 hover:bg-secondary/10'}`}
             >
               <QrCode size={16} />
               {showQrCode ? '关闭二维码' : '微信 / 手机端'}
             </button>

             <button 
              onClick={onClose}
              className="flex-1 bg-primary text-white font-bold text-sm uppercase tracking-widest py-4 hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
             >
               <Check size={16} />
               完成
             </button>
          </div>
        )}
      </div>
    </div>
  );
};
