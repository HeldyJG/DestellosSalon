import React, { useState, useEffect } from 'react';
import { Menu, X, Calendar, Instagram, Phone, Clock, MapPin, Sparkles } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';
import { DestellosLogo } from './DestellosLogo';

interface NavbarProps {
  onOpenBooking: (serviceId?: string, stylistId?: string) => void;
  activeSection: string;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenBooking, activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'inicio', label: 'Inicio', href: '#inicio' },
    { id: 'servicios', label: 'Servicios & Precios', href: '#servicios' },
    // { id: 'transformaciones', label: 'Resultados Reales', href: '#transformaciones' },
    { id: 'social', label: 'Feed & Redes', href: '#social' },
    { id: 'equipo', label: 'Equipo', href: '#equipo' },
    { id: 'opiniones', label: 'Opiniones', href: '#opiniones' },
    { id: 'contacto', label: 'Ubicación & Horarios', href: '#contacto' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetElement = document.querySelector(href);
    if (targetElement) {
      const navHeight = 90;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navHeight;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top micro announcement bar */}
      <div className="bg-[#0A192F] text-[#FAF8F5]/90 text-xs py-1.5 px-4 hidden md:block border-b border-[#FAF8F5]/10">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="flex items-center gap-1.5 text-xs text-[#E5A9B4]">
              <Sparkles className="w-3.5 h-3.5" />
              15% dto. en tu primer Balayage con cita online
            </span>
            <span className="flex items-center gap-1.5 text-[#FAF8F5]/70">
              <MapPin className="w-3 h-3 text-[#E5A9B4]" />
              {SALON_INFO.address}
            </span>
          </div>
          <div className="flex items-center gap-5 text-xs">
            <span className="flex items-center gap-1 text-[#FAF8F5]/80">
              <Clock className="w-3 h-3 text-[#E5A9B4]" />
              Lun - Vie: {SALON_INFO.openingHours.weekdays}
            </span>
            <a
              href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#FAF8F5] hover:text-[#E5A9B4] transition-colors flex items-center gap-1 font-medium"
            >
              <Phone className="w-3 h-3 text-[#E5A9B4]" />
              WhatsApp: {SALON_INFO.whatsapp}
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav
        className={`transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/95 backdrop-blur-md shadow-sm py-3 border-b border-[#E8E2D8]'
            : 'bg-[#FAF8F5]/85 backdrop-blur-sm py-4 border-b border-[#E8E2D8]/50'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo with Official Badge */}
          <a
            href="#inicio"
            onClick={(e) => handleNavClick(e, '#inicio')}
            className="group flex items-center gap-2.5 focus:outline-none"
          >
            <DestellosLogo size="sm" className="drop-shadow-xs" />
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-xl sm:text-2xl md:text-2xl font-bold tracking-[0.06em] text-[#0A192F] group-hover:text-[#CA7F73] transition-colors leading-none">
                  DestellosSalon
                </span>
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D48B95] mb-1 animate-pulse" />
              </div>
              <span className="text-[9px] uppercase tracking-[0.22em] text-[#0A192F]/60 mt-0.5 font-medium leading-tight">
                {SALON_INFO.subtitle}
              </span>
            </div>
          </a>

          {/* Desktop Section Links */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`px-3 py-1.5 rounded-full text-xs xl:text-sm font-medium transition-all duration-200 relative ${
                    isActive
                      ? 'text-[#0A192F] font-semibold'
                      : 'text-[#0A192F]/75 hover:text-[#0A192F]'
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <span className="absolute bottom-0 left-3 right-3 h-[2px] bg-[#D48B95] rounded-full" />
                  )}
                </a>
              );
            })}
          </div>

          {/* Action CTA & Mobile trigger */}
          <div className="flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-[#0A192F]/20 text-[#0A192F] text-xs font-medium hover:border-[#D48B95] hover:text-[#D48B95] transition-colors"
              title="Visitar Instagram"
            >
              <Instagram className="w-3.5 h-3.5 text-[#D48B95]" />
              <span className="hidden xl:inline">{SALON_INFO.instagram}</span>
            </a>

            <button
              id="btn-reservar-navbar"
              onClick={() => onOpenBooking()}
              className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 shadow-sm hover:shadow-md flex items-center gap-2 group cursor-pointer border border-[#0A192F]"
            >
              <Calendar className="w-3.5 h-3.5 text-[#E5A9B4] group-hover:scale-110 transition-transform" />
              <span>Reservar Cita</span>
            </button>

            {/* Mobile menu hamburger button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#0A192F] hover:bg-[#F4EFEA] transition-colors"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Slide-Down Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-4 pt-3 pb-6 shadow-xl transition-all">
            <div className="flex flex-col space-y-2 mb-4">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium flex items-center justify-between ${
                      isActive
                        ? 'bg-[#F4EFEA] text-[#0A192F] font-bold'
                        : 'text-[#0A192F]/80 hover:bg-[#F4EFEA]'
                    }`}
                  >
                    <span>{link.label}</span>
                    {isActive && (
                      <span className="w-2 h-2 rounded-full bg-[#D48B95]" />
                    )}
                  </a>
                );
              })}
            </div>

            <div className="pt-3 border-t border-[#E8E2D8] space-y-2.5">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenBooking();
                }}
                className="w-full bg-[#0A192F] text-[#FAF8F5] py-2.5 rounded-xl text-sm font-medium flex items-center justify-center gap-2 shadow-sm"
              >
                <Calendar className="w-4 h-4 text-[#E5A9B4]" />
                Reservar Cita Online
              </button>

              <a
                href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-[#F4EFEA] border border-[#E8E2D8] text-[#0A192F] py-2 rounded-xl text-xs font-medium flex items-center justify-center gap-2"
              >
                <Phone className="w-3.5 h-3.5 text-[#D48B95]" />
                Contactar por WhatsApp ({SALON_INFO.whatsapp})
              </a>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
