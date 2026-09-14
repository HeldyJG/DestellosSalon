import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowRight, Calendar, Images, Sparkles } from 'lucide-react';
import { PORTFOLIO_ITEMS } from '../data/previewData';

interface BeforeAfterSliderProps {
  onOpenBooking: (serviceName?: string, stylistName?: string, notes?: string) => void;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ onOpenBooking }) => {
  const categories = ['Todos', ...Array.from(new Set(PORTFOLIO_ITEMS.map((item) => item.category)))];
  const [activeCategory, setActiveCategory] = useState('Todos');

  const visibleItems = activeCategory === 'Todos'
    ? PORTFOLIO_ITEMS
    : PORTFOLIO_ITEMS.filter((item) => item.category === activeCategory);

  return (
    <section id="transformaciones" className="py-20 bg-[#F4EFEA] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D48B95]" />
            <span>Trabajos de Destellos</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A192F]">
            Resultados que hablan por sí solos
          </h2>
          <p className="text-sm sm:text-base text-[#0A192F]/70">
            Una galería de acabados reales para explorar tonos, niveles de iluminación y estilos. Los nombres funcionan como referencia para construir el catálogo definitivo.
          </p>
        </div>

        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                activeCategory === category
                  ? 'bg-[#0A192F] text-[#FAF8F5] shadow-sm'
                  : 'bg-[#FAF8F5] text-[#0A192F]/75 border border-[#E8E2D8] hover:border-[#D48B95]'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {visibleItems.map((item, index) => {
            const isFeatured = index === 0 && activeCategory === 'Todos';
            return (
              <motion.article
                key={item.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: Math.min(index * 0.03, 0.18) }}
                className={`group relative overflow-hidden rounded-2xl bg-[#0A192F] shadow-sm ${isFeatured ? 'sm:col-span-2 lg:row-span-2' : ''}`}
              >
                <div className={isFeatured ? 'h-[430px] lg:h-full min-h-[430px]' : 'h-[360px]'}>
                  <img
                    src={item.image}
                    alt={`${item.title}, resultado de ${item.category.toLowerCase()} en Destellos Salón`}
                    className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/95 via-[#0A192F]/10 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 text-[#FAF8F5]">
                  <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-[0.18em] font-bold text-[#E5A9B4] mb-2">
                    <Images className="w-3.5 h-3.5" />
                    {item.category}
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-semibold">{item.title}</h3>
                  <p className="text-xs text-[#FAF8F5]/75 mt-1.5 max-w-md">{item.description}</p>
                  <button
                    onClick={() => onOpenBooking(item.category, undefined, `Me interesa un resultado inspirado en: ${item.title}`)}
                    className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-[#FAF8F5] hover:text-[#E5A9B4] transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5" />
                    Consultar este look
                    <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
