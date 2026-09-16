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
import { ProductsSection } from './components/ProductsSection';
import { CartDrawer } from './components/CartDrawer';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { FloatingActions } from './components/FloatingActions';
import { BookingModal } from './components/BookingModal';
import { CartItem, ProductItem, ServiceItem } from './types';

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
  const [cartOpen, setCartOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const stored = localStorage.getItem('destellos-cart');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
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
      'productos',
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

  useEffect(() => {
    localStorage.setItem('destellos-cart', JSON.stringify(cartItems));
  }, [cartItems]);

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

  const handleAddToCart = (product: ProductItem) => {
    setCartItems((current) => {
      const existing = current.find((item) => item.product.id === product.id);
      return existing
        ? current.map((item) => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { product, quantity: 1 }];
    });
  };

  const handleSetCartQuantity = (productId: string, quantity: number) => {
    setCartItems((current) => quantity < 1
      ? current.filter((item) => item.product.id !== productId)
      : current.map((item) => item.product.id === productId ? { ...item, quantity: Math.min(quantity, 99) } : item));
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
        onOpenCart={() => setCartOpen(true)}
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
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

        {/* Product shop */}
        <ScrollReveal>
          <ProductsSection onAddToCart={handleAddToCart} />
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

      <CartDrawer
        isOpen={cartOpen}
        items={cartItems}
        onClose={() => setCartOpen(false)}
        onSetQuantity={handleSetCartQuantity}
        onRemove={(productId) => setCartItems((current) => current.filter((item) => item.product.id !== productId))}
      />
    </div>
  );
}
