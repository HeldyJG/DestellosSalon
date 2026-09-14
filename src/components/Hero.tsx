import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Calendar, ArrowUpRight, Star, ShieldCheck, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { DestellosLogo } from './DestellosLogo';

interface HeroProps {
  onOpenBooking: () => void;
  onExploreSocial: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenBooking, onExploreSocial }) => {
  return (
    <section
      id="inicio"
      className="relative pt-28 md:pt-36 pb-16 md:pb-24 overflow-hidden bg-[#FAF8F5]"
    >
      {/* Decorative architectural background accents */}
      <div className="absolute top-10 right-0 w-96 h-96 bg-[#E5A9B4]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-[#0A192F]/5 rounded-full blur-2xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Headline & Value Proposition */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6"
          >
            {/* Subtle Luxury Eyebrow / Tag with Official Logo */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] shadow-xs">
              <DestellosLogo size="xs" />
              <span className="text-xs font-semibold tracking-wider text-[#0A192F] uppercase">
                Salón & Estudio de Belleza Capilar • Chiclayo
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#D48B95]" />
            </div>

            {/* Main Headline */}
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold text-[#0A192F] leading-[1.08] tracking-tight">
              El arte de realzar tu{' '}
              <span className="italic font-normal text-[#152744]">
                belleza auténtica
              </span>
              <span className="text-[#D48B95]">.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg text-[#0A192F]/75 max-w-xl font-normal leading-relaxed">
              Especialistas en balayage, coloración, alisados con keratina y salud capilar, creando resultados personalizados que realzan la belleza y vitalidad de tu cabello.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5">
              <button
                id="btn-hero-reservar"
                onClick={onOpenBooking}
                className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2.5 group cursor-pointer"
              >
                <Calendar className="w-4 h-4 text-[#E5A9B4] group-hover:scale-110 transition-transform" />
                <span>Agendar Cita en el Salón</span>
                <ArrowUpRight className="w-4 h-4 text-[#FAF8F5]/60 group-hover:text-[#FAF8F5] transition-colors" />
              </button>

              <button
                id="btn-hero-feed"
                onClick={onExploreSocial}
                className="bg-[#FFFFFF] hover:bg-[#F4EFEA] border border-[#E8E2D8] text-[#0A192F] px-6 py-3.5 rounded-full text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <Heart className="w-4 h-4 text-[#D48B95]" />
                <span>Ver Tendencias en Redes</span>
              </button>
            </div>

            {/* Social Proof Badges */}
            <div className="pt-6 border-t border-[#E8E2D8]/80 grid grid-cols-2 sm:grid-cols-4 gap-4">
              {SALON_INFO.stats.map((stat, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-[#0A192F] flex items-center gap-1">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[#0A192F]/65 font-medium leading-tight">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: Editorial Visual Composition with Scroll Floating Effects */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.15, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-2xl overflow-hidden border border-[#E8E2D8] bg-[#FAF8F5] shadow-xl">
                <img
                  src="/img/sede.png"
                  alt="Interior de Destellos Salón en Chiclayo"
                  className="w-full h-[440px] sm:h-[490px] object-cover object-center transform hover:scale-102 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/10 to-transparent pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-5 left-5 right-5 text-[#FAF8F5] flex items-end justify-between">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-[#D48B95] text-[#FAF8F5] uppercase tracking-wider mb-1.5">
                      Nuestro espacio
                    </span>
                    <p className="font-serif text-lg font-medium text-[#FAF8F5]">
                      Destellos Salón
                    </p>
                    <p className="text-xs text-[#FAF8F5]/80">
                      Un ambiente creado para cuidar cada detalle
                    </p>
                  </div>
                  <span className="text-xs bg-[#0A192F]/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#FAF8F5]/20 font-medium">
                    Chiclayo
                  </span>
                </div>
              </div>

              {/* Floating Review Badge */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="absolute -top-4 -left-4 sm:-left-6 bg-[#FFFFFF] border border-[#E8E2D8] rounded-xl p-3 sm:p-3.5 shadow-lg max-w-[210px]"
              >
                <div className="flex items-center gap-1 text-[#D48B95] mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-[#D48B95]" />
                  ))}
                </div>
                <p className="text-[11px] text-[#0A192F] font-medium leading-snug">
                  "El mejor balayage de Chiclayo. Eli cuidó mi cabello y el color quedó hermoso."
                </p>
                <span className="text-[10px] text-[#0A192F]/60 block mt-1">
                  — Milagros R., clienta verificada
                </span>
              </motion.div>

              {/* Floating Instagram/TikTok Viral Badge */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="absolute -bottom-4 -right-4 sm:-right-6 bg-[#0A192F] text-[#FAF8F5] rounded-xl p-3 sm:p-3.5 shadow-xl border border-[#152744] flex items-center gap-3"
              >
                <div className="w-11 h-11 rounded-full overflow-hidden bg-[#FAF8F5] p-0.5 border border-[#E5A9B4]/40 flex-shrink-0 flex items-center justify-center shadow-inner">
                  <DestellosLogo size="sm" />
                </div>
                <div>
                  <div className="flex items-center gap-1">
                    <span className="text-xs font-bold text-[#FAF8F5]">En Vivo</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#D48B95]" />
                    <span className="text-[10px] text-[#E5A9B4] uppercase tracking-wider">Instagram</span>
                  </div>
                  <p className="text-[11px] text-[#FAF8F5]/75">
                    {SALON_INFO.instagram}
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
