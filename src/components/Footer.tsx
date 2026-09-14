import React from 'react';
import { Instagram, Phone, MapPin, Sparkles, Mail, Heart } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { DestellosLogo } from './DestellosLogo';

interface FooterProps {
  onOpenBooking: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenBooking }) => {
  return (
    <footer className="bg-[#0A192F] text-[#FAF8F5] pt-16 pb-12 border-t border-[#152744]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#FAF8F5]/10">
          {/* Col 1: Brand & Slogan (4 cols) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <DestellosLogo size="md" className="bg-[#FAF8F5] rounded-full p-0.5 shadow-md" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="font-serif text-2xl font-bold tracking-[0.2em] text-[#FAF8F5]">
                    {SALON_INFO.name}
                  </span>
                  <span className="inline-block w-2 h-2 rounded-full bg-[#D48B95]" />
                </div>
                <p className="text-[10px] uppercase tracking-[0.22em] text-[#FAF8F5]/65 font-medium mt-0.5">
                  {SALON_INFO.subtitle}
                </p>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-[#FAF8F5]/75 leading-relaxed max-w-sm">
              Especialistas en balayage, babylights, retoque de mechas y alisados de keratina en Chiclayo, Perú. Cuidamos cada detalle para realzar tu belleza.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <a
                href={SALON_INFO.instagramUrl || "https://www.instagram.com/destellossalon.chiclayo/"}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 hover:bg-[#D48B95] text-[#FAF8F5] flex items-center justify-center transition-colors"
                title="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 hover:bg-[#25D366] text-[#FAF8F5] flex items-center justify-center transition-colors"
                title="WhatsApp"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${SALON_INFO.email}`}
                className="w-9 h-9 rounded-full bg-[#FAF8F5]/10 hover:bg-[#D48B95] text-[#FAF8F5] flex items-center justify-center transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links (3 cols) */}
          <div className="lg:col-span-3 space-y-3 text-xs sm:text-sm">
            <h4 className="font-serif text-base font-semibold text-[#FAF8F5] uppercase tracking-wider">
              Explorar el Atelier
            </h4>
            <ul className="space-y-2 text-[#FAF8F5]/70">
              <li>
                <a href="#servicios" className="hover:text-[#E5A9B4] transition-colors">
                  Servicios & Precios
                </a>
              </li>
              <li>
                <a href="#transformaciones" className="hover:text-[#E5A9B4] transition-colors">
                  Antes & Después (Slider)
                </a>
              </li>
              <li>
                <a href="#social" className="hover:text-[#E5A9B4] transition-colors">
                  Feed de Redes & Looks
                </a>
              </li>
              <li>
                <a href="#equipo" className="hover:text-[#E5A9B4] transition-colors">
                  Maestros Estilistas
                </a>
              </li>
              <li>
                <a href="#opiniones" className="hover:text-[#E5A9B4] transition-colors">
                  Reseñas de Clientas
                </a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-[#E5A9B4] transition-colors">
                  Ubicación & Citas
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Hours & Quick Booking (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <h4 className="font-serif text-base font-semibold text-[#FAF8F5] uppercase tracking-wider">
              Horario de Atención
            </h4>
            <div className="bg-[#FAF8F5]/5 border border-[#FAF8F5]/10 rounded-xl p-4 text-xs space-y-2 text-[#FAF8F5]/80">
              <div className="flex justify-between">
                <span>Lunes a Viernes:</span>
                <span className="font-medium text-[#FAF8F5]">{SALON_INFO.openingHours.weekdays}</span>
              </div>
              <div className="flex justify-between">
                <span>Sábados:</span>
                <span className="font-medium text-[#FAF8F5]">{SALON_INFO.openingHours.saturday}</span>
              </div>
              <div className="flex justify-between text-[#FAF8F5]/50">
                <span>Domingos & Festivos:</span>
                <span>Cerrado</span>
              </div>
            </div>

            <button
              onClick={onOpenBooking}
              className="w-full bg-[#D48B95] hover:bg-[#C47983] text-[#FAF8F5] py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>Reservar Cita Online Ahora</span>
            </button>
          </div>
        </div>

        {/* Bottom micro footer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#FAF8F5]/50 gap-3">
          <p>© {new Date().getFullYear()} {SALON_INFO.name} Atelier S.L. Todos los derechos reservados.</p>
          <div className="flex items-center gap-4 text-xs">
            <span>Aviso Legal</span>
            <span>•</span>
            <span>Política de Privacidad</span>
            <span>•</span>
            <span>Cookies</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
