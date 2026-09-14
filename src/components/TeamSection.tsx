import React from 'react';
import { motion } from 'motion/react';
import { Sparkles, Instagram, Calendar, Star } from 'lucide-react';
import { STYLISTS } from '../data/salonData';
import { Stylist } from '../types';

interface TeamSectionProps {
  onBookWithStylist: (stylist: Stylist) => void;
}

export const TeamSection: React.FC<TeamSectionProps> = ({ onBookWithStylist }) => {
  return (
    <section id="equipo" className="py-20 bg-[#FAF8F5] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#D48B95]" />
            <span>Maestros de la Belleza & Estilo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A192F]">
            Equipo de Destellos Salón
          </h2>
          <p className="text-sm sm:text-base text-[#0A192F]/70">
            Especialistas en colorimetría, mechas, alisados y estilismo en Chiclayo liderados por Eli Rivecas con pasión por el cuidado de tu cabello.
          </p>
        </div>

        {/* Stylists Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {STYLISTS.map((stylist) => (
            <motion.div
              key={stylist.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className="bg-[#FFFFFF] border border-[#E8E2D8] rounded-2xl overflow-hidden shadow-xs hover:shadow-md transition-all duration-300 flex flex-col justify-between group"
            >
              {/* Photo */}
              <div className="relative h-72 overflow-hidden bg-[#0A192F]">
                <img
                  src={stylist.photo}
                  alt={stylist.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/20 to-transparent pointer-events-none" />

                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-[#FAF8F5]/90 backdrop-blur-sm px-2.5 py-1 rounded-full text-xs font-bold text-[#0A192F] flex items-center gap-1 shadow-xs">
                  <Star className="w-3.5 h-3.5 fill-[#D48B95] text-[#D48B95]" />
                  <span>{stylist.rating.toFixed(1)}</span>
                </div>

                {/* Experience Badge */}
                <div className="absolute bottom-3 left-3 text-xs text-[#FAF8F5]/90 bg-[#0A192F]/70 backdrop-blur-sm px-2.5 py-1 rounded-full border border-[#FAF8F5]/10">
                  {stylist.experience}
                </div>
              </div>

              {/* Info & Specialties */}
              <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div>
                    <h3 className="font-serif text-xl font-bold text-[#0A192F]">
                      {stylist.name}
                    </h3>
                    <p className="text-xs font-medium text-[#D48B95] mt-0.5">
                      {stylist.role}
                    </p>
                  </div>

                  <p className="text-xs text-[#0A192F]/75 leading-relaxed line-clamp-3">
                    {stylist.bio}
                  </p>

                  {/* Specialties tags */}
                  <div className="pt-2 flex flex-wrap gap-1.5">
                    {stylist.specialties.map((spec, i) => (
                      <span
                        key={i}
                        className="text-[11px] px-2 py-0.5 rounded-md bg-[#F4EFEA] text-[#0A192F]/80 border border-[#E8E2D8]"
                      >
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="pt-3 border-t border-[#E8E2D8] space-y-2">
                  <button
                    onClick={() => onBookWithStylist(stylist)}
                    className="w-full bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Calendar className="w-3.5 h-3.5 text-[#E5A9B4]" />
                    <span>Reservar con {stylist.name.split(' ')[0]}</span>
                  </button>

                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full text-center text-[11px] text-[#0A192F]/65 hover:text-[#D48B95] transition-colors flex items-center justify-center gap-1 pt-1"
                  >
                    <Instagram className="w-3 h-3 text-[#D48B95]" />
                    <span>{stylist.instagram}</span>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
