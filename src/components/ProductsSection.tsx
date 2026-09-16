import React, { useMemo, useState } from 'react';
import { Search, ShoppingBag, Sparkles, Check } from 'lucide-react';
import { motion } from 'motion/react';
import { PRODUCTS } from '../data/salonData';
import type { ProductCategory, ProductItem } from '../types';

interface ProductsSectionProps {
  onAddToCart: (product: ProductItem) => void;
}

const filters: { value: 'all' | ProductCategory; label: string }[] = [
  { value: 'all', label: 'Todos' },
  { value: 'shampoo', label: 'Shampoo' },
  { value: 'tratamiento', label: 'Tratamientos' },
  { value: 'styling', label: 'Styling' },
  { value: 'kit', label: 'Kits & Regalos' },
];

export const ProductsSection: React.FC<ProductsSectionProps> = ({ onAddToCart }) => {
  const [category, setCategory] = useState<'all' | ProductCategory>('all');
  const [query, setQuery] = useState('');
  const [addedId, setAddedId] = useState<string>();

  const products = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('es');
    return PRODUCTS.filter((product) => {
      const matchesCategory = category === 'all' || product.category === category;
      const matchesQuery = !normalized || `${product.name} ${product.description} ${product.categoryLabel}`.toLocaleLowerCase('es').includes(normalized);
      return matchesCategory && matchesQuery;
    });
  }, [category, query]);

  const addProduct = (product: ProductItem) => {
    onAddToCart(product);
    setAddedId(product.id);
    window.setTimeout(() => setAddedId((current) => current === product.id ? undefined : current), 1400);
  };

  return (
    <section id="productos" className="py-20 bg-[#FAF8F5] border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-gradient-to-br from-[#F3DFE2] to-[#F8F3EE] p-7 sm:p-10 lg:p-12 mb-12 overflow-hidden relative">
          <div className="absolute -right-14 -top-20 w-72 h-72 rounded-full bg-white/35" />
          <div className="relative max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-[#E8E2D8] text-[11px] font-bold uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#D48B95]" /> Cuidado en casa
            </div>
            <h2 className="mt-5 font-serif text-4xl sm:text-5xl font-semibold text-[#0A192F]">Tu ritual de belleza, <span className="italic text-[#C77886]">ahora en casa.</span></h2>
            <p className="mt-4 text-sm sm:text-base text-[#0A192F]/70 max-w-2xl">Productos seleccionados por nuestros especialistas para prolongar los resultados del salón.</p>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-9">
          <div>
            <h3 className="font-serif text-3xl font-semibold text-[#0A192F]">Productos destacados</h3>
            <p className="text-sm text-[#0A192F]/60 mt-1">{products.length} productos disponibles</p>
          </div>
          <label className="relative block w-full lg:w-72">
            <span className="sr-only">Buscar productos</span>
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#0A192F]/45" />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Buscar producto..." className="w-full rounded-full border border-[#DCD5CC] bg-white pl-11 pr-4 py-3 text-sm outline-none focus:border-[#D48B95] focus:ring-2 focus:ring-[#D48B95]/15" />
          </label>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-3 mb-7" aria-label="Filtrar productos">
          {filters.map((filter) => (
            <button key={filter.value} onClick={() => setCategory(filter.value)} className={`shrink-0 rounded-full px-5 py-2.5 text-xs font-semibold transition-colors ${category === filter.value ? 'bg-[#0A192F] text-white' : 'bg-white border border-[#DED7CE] text-[#0A192F]/75 hover:border-[#D48B95]'}`}>
              {filter.label}
            </button>
          ))}
        </div>

        {products.length ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <motion.article key={product.id} layout initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl overflow-hidden bg-white border border-[#E8E2D8] shadow-sm hover:shadow-lg transition-shadow group flex flex-col">
                <div className="relative aspect-[4/3] bg-[#F4EFEA] overflow-hidden">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" referrerPolicy="no-referrer" />
                  {product.badge && <span className="absolute top-3 left-3 bg-[#0A192F] text-white rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-wide">{product.badge}</span>}
                </div>
                <div className="p-5 flex flex-col flex-1">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#C77886]">{product.categoryLabel}</p>
                  <h4 className="font-serif text-xl font-bold text-[#0A192F] mt-2">{product.name}</h4>
                  <p className="text-xs text-[#0A192F]/60 mt-1">{product.size}</p>
                  <p className="text-xs text-[#0A192F]/70 leading-relaxed mt-3 flex-1">{product.description}</p>
                  <p className="text-xl font-bold mt-5">S/ {product.price.toFixed(2)}</p>
                  <button disabled={!product.inStock} onClick={() => addProduct(product)} className="mt-4 w-full rounded-full bg-[#0A192F] hover:bg-[#162B49] disabled:bg-gray-300 text-white py-3 text-xs font-semibold flex items-center justify-center gap-2 transition-all">
                    {addedId === product.id ? <><Check className="w-4 h-4" /> Agregado</> : <><ShoppingBag className="w-4 h-4 text-[#E5A9B4]" /> Agregar al carrito</>}
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 rounded-2xl border border-dashed border-[#D8D1C8] bg-white"><ShoppingBag className="w-9 h-9 mx-auto text-[#D48B95]" /><p className="mt-3 font-serif text-xl">No encontramos productos</p><button onClick={() => { setQuery(''); setCategory('all'); }} className="mt-3 text-sm font-semibold text-[#C77886] underline">Limpiar búsqueda</button></div>
        )}
      </div>
    </section>
  );
};
