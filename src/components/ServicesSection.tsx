import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Clock, Sparkles, Check, ArrowRight } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { SERVICES_LIST } from '../data/previewData';
import { ServiceItem } from '../types';

interface ServicesSectionProps {
  onSelectServiceForBooking: (service: ServiceItem) => void;
}

export const ServicesSection: React.FC<ServicesSectionProps> = ({
  onSelectServiceForBooking,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Todos los Servicios' },
    { id: 'color', label: 'Coloración & Balayage' },
    { id: 'corte', label: 'Corte & Styling' },
    { id: 'tratamiento', label: 'Tratamientos Capilares' },
  ];

  const filteredServices = SERVICES_LIST.filter((s) => {
    if (selectedCategory === 'all') return true;
    return s.category === selectedCategory;
  });

  return (
    <section id="servicios" className="py-20 bg-[#FAF8F5] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D48B95]" />
            <span>Servicios de muestra & precios referenciales</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A192F]">
            Rituales de Cuidado & Estilismo
          </h2>
          <p className="text-sm sm:text-base text-[#0A192F]/70">
            Una propuesta inicial basada en los trabajos del portafolio. Los nombres, tiempos y precios podrán reemplazarse con los datos oficiales de la empresa.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-[#0A192F] text-[#FAF8F5] shadow-xs'
                    : 'bg-[#FFFFFF] text-[#0A192F]/75 hover:bg-[#F4EFEA] border border-[#E8E2D8]'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredServices.map((service) => (
            <motion.div
              key={service.id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
              className="group bg-[#FFFFFF] rounded-2xl border border-[#E8E2D8] overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between"
            >
              {/* Service Thumbnail with Tag */}
              <div className="relative h-48 overflow-hidden bg-[#0A192F]">
                <img
                  src={service.image}
                  alt={service.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/70 via-transparent to-transparent pointer-events-none" />

                {/* Tag */}
                {service.featuredTag && (
                  <span className="absolute top-3 left-3 bg-[#FAF8F5]/95 backdrop-blur-sm text-[#0A192F] text-[11px] font-semibold px-2.5 py-1 rounded-full border border-[#E8E2D8] shadow-xs">
                    {service.featuredTag}
                  </span>
                )}

                {/* Duration Badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-1.5 bg-[#0A192F]/80 backdrop-blur-sm text-[#FAF8F5] text-xs px-2.5 py-1 rounded-full">
                  <Clock className="w-3.5 h-3.5 text-[#E5A9B4]" />
                  <span>{service.duration}</span>
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 right-3 bg-[#FAF8F5] text-[#0A192F] font-serif font-bold text-base px-3 py-1 rounded-full shadow-sm">
                  {typeof service.price === 'number' ? `${SALON_INFO.currency} ${service.price}` : service.price}
                </div>
              </div>

              {/* Service Details */}
              <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="text-xs font-semibold text-[#D48B95] uppercase tracking-wider">
                    {service.categoryLabel}
                  </div>
                  <h3 className="font-serif text-lg sm:text-xl font-bold text-[#0A192F] leading-snug">
                    {service.name}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#0A192F]/75 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-[#E8E2D8]">
                  <button
                    onClick={() => onSelectServiceForBooking(service)}
                    className="w-full bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 transition-all group/btn cursor-pointer shadow-xs"
                  >
                    <span>Reservar este Servicio</span>
                    <ArrowRight className="w-3.5 h-3.5 text-[#E5A9B4] group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Free Consultation Banner */}
        <div className="mt-12 bg-[#F4EFEA] border border-[#E8E2D8] rounded-2xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-1.5 text-xs font-semibold text-[#D48B95] uppercase tracking-wider">
              <Check className="w-4 h-4" />
              <span>Diagnóstico Capilar Sin Coste</span>
            </div>
            <h4 className="font-serif text-xl sm:text-2xl font-bold text-[#0A192F]">
              ¿No estás segura de qué técnica elegir?
            </h4>
            <p className="text-xs sm:text-sm text-[#0A192F]/75 max-w-xl">
              Nuestros coloristas realizan una consulta de 15 minutos en el atelier o por videollamada para estudiar tu cabello, tono de piel y expectativas.
            </p>
          </div>

          <button
            onClick={() => onSelectServiceForBooking(SERVICES_LIST[0])}
            className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-6 py-3 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap shadow-sm hover:shadow-md transition-all cursor-pointer"
          >
            Solicitar Asesoría Personalizada
          </button>
        </div>
      </div>
    </section>
  );
};
