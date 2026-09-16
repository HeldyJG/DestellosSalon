import React, { useEffect } from 'react';
import { X, Minus, Plus, ShoppingBag, Trash2, CheckCircle2 } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { SALON_INFO } from '../data/salonData';
import type { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  items: CartItem[];
  onClose: () => void;
  onSetQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({ isOpen, items, onClose, onSetQuantity, onRemove }) => {
  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  useEffect(() => {
    if (!isOpen) return;
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && onClose();
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', onKeyDown); document.body.style.overflow = ''; };
  }, [isOpen, onClose]);

  const checkout = () => {
    const lines = items.map(({ product, quantity }) => `• ${quantity} x ${product.name} (${product.size}) — S/ ${(product.price * quantity).toFixed(2)}`);
    const message = [`Hola, quiero realizar este pedido:`, '', ...lines, '', `Total: S/ ${subtotal.toFixed(2)}`, 'Modalidad: retiro en el salón.', '', '¿Podrían confirmarme la disponibilidad?'].join('\n');
    window.open(`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  return <AnimatePresence>{isOpen && <>
    <motion.button aria-label="Cerrar carrito" className="fixed inset-0 z-[70] bg-[#0A192F]/35 backdrop-blur-[2px]" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
    <motion.aside role="dialog" aria-modal="true" aria-labelledby="cart-title" className="fixed right-0 top-0 bottom-0 z-[80] w-full max-w-md bg-white shadow-2xl flex flex-col" initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 28, stiffness: 260 }}>
      <header className="px-6 py-5 bg-[#FAF8F5] border-b border-[#E8E2D8] flex items-center justify-between">
        <div><h2 id="cart-title" className="font-serif text-2xl font-bold">Tu carrito</h2><p className="text-xs text-[#0A192F]/60 mt-1">{itemCount} {itemCount === 1 ? 'producto' : 'productos'} en tu pedido</p></div>
        <button onClick={onClose} aria-label="Cerrar" className="p-2 rounded-full hover:bg-[#ECE5DE]"><X className="w-5 h-5" /></button>
      </header>
      {items.length === 0 ? <div className="flex-1 flex flex-col items-center justify-center px-8 text-center"><div className="w-16 h-16 rounded-full bg-[#F4EFEA] flex items-center justify-center"><ShoppingBag className="w-7 h-7 text-[#D48B95]" /></div><h3 className="font-serif text-2xl font-bold mt-5">Tu carrito está vacío</h3><p className="text-sm text-[#0A192F]/60 mt-2">Descubre productos elegidos por nuestros especialistas.</p><button onClick={onClose} className="mt-6 bg-[#0A192F] text-white rounded-full px-7 py-3 text-sm font-semibold">Ver productos</button></div> : <>
        <div className="flex-1 overflow-y-auto p-6 space-y-5">
          {items.map(({ product, quantity }) => <article key={product.id} className="flex gap-4 pb-5 border-b border-[#EEE9E3]">
            <img src={product.image} alt="" className="w-24 h-28 rounded-xl object-cover bg-[#F4EFEA]" />
            <div className="flex-1 min-w-0"><h3 className="font-serif font-bold leading-tight">{product.name}</h3><p className="text-xs text-[#0A192F]/55 mt-1">{product.size}</p><p className="font-bold mt-2">S/ {product.price.toFixed(2)}</p><div className="flex items-center justify-between mt-3"><div className="inline-flex items-center border border-[#DAD3CA] rounded-full"><button aria-label="Reducir cantidad" onClick={() => onSetQuantity(product.id, quantity - 1)} className="p-2"><Minus className="w-3 h-3" /></button><span className="w-7 text-center text-xs font-bold">{quantity}</span><button aria-label="Aumentar cantidad" onClick={() => onSetQuantity(product.id, quantity + 1)} className="p-2"><Plus className="w-3 h-3" /></button></div><button onClick={() => onRemove(product.id)} className="text-[#A16A73] p-2" aria-label={`Eliminar ${product.name}`}><Trash2 className="w-4 h-4" /></button></div></div>
          </article>)}
          <div className="rounded-xl bg-[#F8F1F2] border border-[#EBCFD4] p-4 flex gap-3"><CheckCircle2 className="w-5 h-5 text-[#D48B95] shrink-0" /><div><p className="text-xs font-bold">Retiro gratis en Destellos Salón</p><p className="text-[11px] text-[#0A192F]/60 mt-1">Te avisaremos cuando tu pedido esté listo.</p></div></div>
        </div>
        <footer className="p-6 border-t border-[#E8E2D8] bg-[#FAF8F5]"><div className="flex justify-between items-end"><span className="font-serif text-xl font-bold">Total</span><span className="text-2xl font-bold">S/ {subtotal.toFixed(2)}</span></div><p className="text-[11px] text-[#0A192F]/55 mt-1">Disponibilidad sujeta a confirmación.</p><button onClick={checkout} className="mt-5 w-full py-4 rounded-full bg-[#0A192F] hover:bg-[#162B49] text-white text-sm font-bold">Finalizar pedido por WhatsApp</button><button onClick={onClose} className="mt-3 w-full py-2 text-xs font-semibold">Seguir comprando</button></footer>
      </>}
    </motion.aside>
  </>}</AnimatePresence>;
};
