/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, type ReactNode } from 'react';
import { motion, useReducedMotion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ServicesSection } from './components/ServicesSection';
// Sección temporalmente oculta. Se conserva para activarla cuando el portafolio esté listo.
// import { BeforeAfterSlider } from './components/BeforeAfterSlider';
import { SocialFeedSection } from './components/SocialFeedSection';
import { TeamSection } from './components/TeamSection';
import { TestimonialsSection } from './components/TestimonialsSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { ServiceItem, Stylist } from './types';

const ScrollReveal: React.FC<{ children: ReactNode }> = ({ children }) => {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.08 }}
      transition={{ duration: 0.65, ease: 'easeOut' }}
    >
      {children}
    </motion.div>
  );
};

export default function App() {
  const [activeSection, setActiveSection] = useState('inicio');
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingServiceId, setBookingServiceId] = useState<string | undefined>();
  const [bookingStylistId, setBookingStylistId] = useState<string | undefined>();
  const [bookingNote, setBookingNote] = useState<string | undefined>();
  const { scrollYProgress } = useScroll();
  const smoothScrollProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  // Scroll Spy for sectionable navigation
  useEffect(() => {
    const sectionIds = [
      'inicio',
      'servicios',
      // 'transformaciones',
      'social',
      'equipo',
      'opiniones',
      'contacto',
    ];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 180;
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenBooking = (serviceId?: string, stylistId?: string, note?: string) => {
    setBookingServiceId(serviceId);
    setBookingStylistId(stylistId);
    setBookingNote(note || '');
    setBookingModalOpen(true);
  };

  const handleSelectService = (service: ServiceItem) => {
    setBookingServiceId(service.id);
    setBookingStylistId(undefined);
    setBookingNote(`Servicio seleccionado: ${service.name}`);
    setBookingModalOpen(true);
  };

  const handleBookWithStylist = (stylist: Stylist) => {
    setBookingServiceId(undefined);
    setBookingStylistId(stylist.id);
    setBookingNote(`Cita solicitada con el/la estilista: ${stylist.name}`);
    setBookingModalOpen(true);
  };

  const handleExploreSocial = () => {
    const socialElem = document.getElementById('social');
    if (socialElem) {
      socialElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#0A192F] font-sans antialiased selection:bg-[#E5A9B4]/30 selection:text-[#0A192F] relative">
      <motion.div
        aria-hidden="true"
        className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-[#D48B95] via-[#E5A9B4] to-[#CA7F73]"
        style={{ scaleX: smoothScrollProgress }}
      />

      {/* Sticky frosted Navbar with sectionable links */}
      <Navbar
        onOpenBooking={() => handleOpenBooking()}
        activeSection={activeSection}
      />

      <main>
        {/* Hero Section */}
        <Hero
          onOpenBooking={() => handleOpenBooking()}
          onExploreSocial={handleExploreSocial}
        />

        {/* Services & Pricing Section */}
        <ScrollReveal>
          <ServicesSection
            onSelectServiceForBooking={handleSelectService}
          />
        </ScrollReveal>

        {/*
          SECCIÓN RESULTADOS REALES — OCULTA TEMPORALMENTE
          <BeforeAfterSlider
            onOpenBooking={(category, stylist, notes) =>
              handleOpenBooking(undefined, undefined, notes)
            }
          />
        */}

        {/* Social Media Feed Section (Instagram & TikTok integration) */}
        <ScrollReveal>
          <SocialFeedSection
            onOpenBooking={(serviceCategory, stylistName, customNote) =>
              handleOpenBooking(undefined, undefined, customNote)
            }
          />
        </ScrollReveal>

        {/* Stylists Team Section */}
        <ScrollReveal>
          <TeamSection
            onBookWithStylist={handleBookWithStylist}
          />
        </ScrollReveal>

        {/* Testimonials & Verified Reviews Section */}
        <ScrollReveal>
          <TestimonialsSection />
        </ScrollReveal>

        {/* Location, Schedule & Contact Section */}
        <ScrollReveal>
          <ContactSection />
        </ScrollReveal>
      </main>

      {/* Footer */}
      <Footer onOpenBooking={() => handleOpenBooking()} />

      {/* Floating Action Shortcuts (WhatsApp & Scroll to top) */}
      <FloatingActions onOpenBooking={() => handleOpenBooking()} />

      {/* Interactive Booking Modal */}
      <BookingModal
        isOpen={bookingModalOpen}
        onClose={() => setBookingModalOpen(false)}
        preselectedServiceId={bookingServiceId}
        preselectedStylistId={bookingStylistId}
        initialNote={bookingNote}
      />
    </div>
  );
}
