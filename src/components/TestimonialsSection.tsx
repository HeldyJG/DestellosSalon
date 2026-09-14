import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS } from '../data/salonData';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="opiniones" className="py-20 bg-[#F4EFEA] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
            <Star className="w-3.5 h-3.5 fill-[#D48B95] text-[#D48B95]" />
            <span>Experiencias Verificadas</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A192F]">
            La Opinión de Quienes Nos Eligen
          </h2>
          <p className="text-sm sm:text-base text-[#0A192F]/70">
            Más de 8,500 clientes satisfechas nos avalan con una calificación media de 4.9 estrellas en Google Reviews y Treatwell.
          </p>
        </div>

        {/* Testimonials Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFFFF] border border-[#E8E2D8] rounded-2xl p-6 sm:p-7 shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between relative"
            >
              {/* Quote icon accent */}
              <Quote className="w-8 h-8 text-[#E5A9B4]/40 absolute top-5 right-5 pointer-events-none" />

              <div className="space-y-4">
                {/* Rating & Platform Source */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D48B95] text-[#D48B95]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-semibold text-[#0A192F]/60 bg-[#FAF8F5] px-2.5 py-0.5 rounded-full border border-[#E8E2D8]">
                    {t.source}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-xs sm:text-sm text-[#0A192F]/85 leading-relaxed italic">
                  "{t.comment}"
                </p>
              </div>

              {/* Client Profile */}
              <div className="mt-6 pt-4 border-t border-[#E8E2D8] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.clientName}
                    className="w-10 h-10 rounded-full object-cover border border-[#E8E2D8]"
                    referrerPolicy="no-referrer"
                  />
                  <div>
                    <div className="flex items-center gap-1">
                      <h4 className="font-semibold text-xs text-[#0A192F]">
                        {t.clientName}
                      </h4>
                      <CheckCircle2 className="w-3 h-3 text-[#D48B95]" />
                    </div>
                    <span className="text-[10px] text-[#0A192F]/60 block">
                      {t.service} • con {t.stylistName}
                    </span>
                  </div>
                </div>

                <span className="text-[10px] text-[#0A192F]/40 font-medium">
                  {t.date}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Aggregate Review Strip */}
        <div className="mt-12 bg-[#FAF8F5] border border-[#E8E2D8] rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-4">
            <div className="text-3xl font-serif font-bold text-[#0A192F]">
              4.9<span className="text-lg text-[#D48B95]">/5</span>
            </div>
            <div>
              <div className="flex items-center gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#D48B95] text-[#D48B95]" />
                ))}
              </div>
              <p className="text-xs text-[#0A192F]/70 font-medium mt-0.5">
                Basado en 348 reseñas reales en Google y plataformas de belleza
              </p>
            </div>
          </div>

          <a
            href="https://google.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-semibold text-[#0A192F] hover:text-[#D48B95] transition-colors underline underline-offset-4"
          >
            Ver todas las reseñas en Google Maps →
          </a>
        </div>
      </div>
    </section>
  );
};
