import React, { useState, useEffect } from 'react';
import { ArrowUp, Calendar, Phone, MessageSquare } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

interface FloatingActionsProps {
  onOpenBooking: () => void;
}

export const FloatingActions: React.FC<FloatingActionsProps> = ({ onOpenBooking }) => {
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-3 pointer-events-none">
      {/* Quick Booking Floating Pill */}
      {showScrollTop && (
        <button
          onClick={onOpenBooking}
          className="pointer-events-auto bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 text-xs font-semibold border border-[#E5A9B4]/30 transition-all transform hover:scale-105 cursor-pointer"
          title="Agendar Cita"
        >
          <Calendar className="w-3.5 h-3.5 text-[#E5A9B4]" />
          <span className="hidden sm:inline">Reservar Cita</span>
        </button>
      )}

      {/* WhatsApp Quick Direct Button */}
      <a
        href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}?text=${encodeURIComponent(
          '¡Hola AURA Salón! Me gustaría consultar disponibilidad para una cita.'
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto w-12 h-12 rounded-full bg-[#25D366] hover:bg-[#1EBE5D] text-white shadow-lg flex items-center justify-center transition-transform hover:scale-110 relative group cursor-pointer"
        title="Chat por WhatsApp"
      >
        <MessageSquare className="w-5 h-5 fill-current" />
        <span className="absolute right-14 bg-[#0A192F] text-[#FAF8F5] text-[11px] font-medium px-2.5 py-1 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          ¿Dudas? Escríbenos por WhatsApp
        </span>
      </a>

      {/* Back To Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="pointer-events-auto w-10 h-10 rounded-full bg-[#FAF8F5] border border-[#E8E2D8] text-[#0A192F] hover:bg-[#FFFFFF] shadow-md flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          title="Volver arriba"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}
    </div>
  );
};
