import React, { useState } from 'react';
import { MapPin, Phone, Clock, Mail, MessageSquare, ChevronDown, ChevronUp, Sparkles, ExternalLink, ShieldCheck } from 'lucide-react';
import { SALON_INFO } from '../data/salonData';

export const ContactSection: React.FC = () => {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: '¿Puedo llevar fotos de referencia de Instagram o Pinterest a mi cita?',
      a: '¡Por supuesto! De hecho, nos encanta que traigas referencias visuales de nuestro feed o de tus creadores favoritos. En el diagnóstico inicial analizaremos la viabilidad según tu base de color, grosor y salud capilar.',
    },
    {
      q: '¿Cómo debo preparar mi cabello antes de una sesión de Balayage o decoloración?',
      a: 'Recomendamos no lavar el cabello las 24 horas previas para conservar el manto lipídico natural del cuero cabelludo. Evita peinados muy tirantes y no apliques champú en seco el mismo día.',
    },
    {
      q: '¿Cuánto tiempo dura el alisado de Keratina Brasileña?',
      a: 'Tiene una duración de entre 3 y 5 meses dependiendo de la frecuencia de lavado y del uso de champús sin sal ni sulfatos para proteger la fibra capilar.',
    },
    {
      q: '¿Cuál es la política de citas o reprogramación?',
      a: 'Agradecemos avisar con al menos 24 horas de antelación vía WhatsApp (+51 986 724 735) para poder reasignar el horario de tu estilista.',
    },
  ];

  return (
    <section id="contacto" className="py-20 bg-[#FAF8F5] relative border-t border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#FFFFFF] border border-[#E8E2D8] text-xs font-semibold text-[#0A192F] uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5 text-[#D48B95]" />
            <span>Visítanos en Chiclayo</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-semibold text-[#0A192F]">
            Ubicación, Horarios & Contacto
          </h2>
          <p className="text-sm sm:text-base text-[#0A192F]/70">
            Atención exclusiva y personalizada en Chiclayo, Lambayeque. Agenda con anticipación tu cita para brindarte el tiempo que tu cabello merece.
          </p>
        </div>

        {/* 2-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          {/* Left: Salon Info, Live Schedule, Contact Cards (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Salon Info Card */}
            <div className="bg-[#FFFFFF] border border-[#E8E2D8] rounded-2xl p-6 sm:p-8 shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-5 border-b border-[#E8E2D8]">
                <div>
                  <h3 className="font-serif text-2xl font-bold text-[#0A192F]">
                    {SALON_INFO.name}
                  </h3>
                  <p className="text-xs text-[#0A192F]/65 mt-0.5">
                    {SALON_INFO.subtitle}
                  </p>
                </div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E5A9B4]/20 text-[#0A192F] text-xs font-semibold border border-[#D48B95]/30">
                  <span className="w-2 h-2 rounded-full bg-[#D48B95] animate-ping" />
                  Atención Previa Cita
                </span>
              </div>

              {/* Coordinates Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 text-xs sm:text-sm">
                {/* Address */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] flex items-center justify-center text-[#0A192F] flex-shrink-0 border border-[#E8E2D8]">
                    <MapPin className="w-4 h-4 text-[#D48B95]" />
                  </div>
                  <div>
                    <strong className="block text-[#0A192F] font-semibold">Ubicación</strong>
                    <p className="text-[#0A192F]/75 mt-0.5 leading-snug">
                      {SALON_INFO.address}
                    </p>
                    <span className="text-[11px] text-[#0A192F]/50">{SALON_INFO.addressDetail}</span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] flex items-center justify-center text-[#0A192F] flex-shrink-0 border border-[#E8E2D8]">
                    <Clock className="w-4 h-4 text-[#D48B95]" />
                  </div>
                  <div>
                    <strong className="block text-[#0A192F] font-semibold">Horarios</strong>
                    <p className="text-[#0A192F]/75 mt-0.5">
                      Lunes - Viernes: {SALON_INFO.openingHours.weekdays}
                    </p>
                    <p className="text-[#0A192F]/75">
                      Sábados: {SALON_INFO.openingHours.saturday}
                    </p>
                    <span className="text-[11px] text-[#0A192F]/50">Domingos: {SALON_INFO.openingHours.sunday}</span>
                  </div>
                </div>

                {/* WhatsApp */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] flex items-center justify-center text-[#0A192F] flex-shrink-0 border border-[#E8E2D8]">
                    <MessageSquare className="w-4 h-4 text-[#25D366]" />
                  </div>
                  <div>
                    <strong className="block text-[#0A192F] font-semibold">WhatsApp Directo</strong>
                    <a
                      href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#0A192F] hover:text-[#D48B95] transition-colors mt-0.5 block font-medium"
                    >
                      {SALON_INFO.whatsapp}
                    </a>
                    <span className="text-[11px] text-[#0A192F]/50">Coordinación de citas inmediata</span>
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#F4EFEA] flex items-center justify-center text-[#0A192F] flex-shrink-0 border border-[#E8E2D8]">
                    <Phone className="w-4 h-4 text-[#D48B95]" />
                  </div>
                  <div>
                    <strong className="block text-[#0A192F] font-semibold">Teléfono & Instagram</strong>
                    <a
                      href={`tel:${SALON_INFO.phone}`}
                      className="text-[#0A192F] hover:text-[#D48B95] transition-colors mt-0.5 block font-medium"
                    >
                      {SALON_INFO.phone}
                    </a>
                    <a
                      href={SALON_INFO.instagramUrl || "https://www.instagram.com/destellossalon.chiclayo/"}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[11px] text-[#0A192F]/60 hover:text-[#0A192F] block mt-0.5"
                    >
                      {SALON_INFO.instagram}
                    </a>
                  </div>
                </div>
              </div>

              {/* Google Maps Visual Interactive Mockup */}
              <div className="pt-2">
                <div className="relative h-44 rounded-xl overflow-hidden border border-[#E8E2D8] bg-[#E8E2D8]/50 group">
                  <img
                    src="/img/sede.png"
                    alt="Destellos Salón Chiclayo"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-[#0A192F]/40 flex items-center justify-center">
                    <a
                      href="https://www.google.com/maps/search/?api=1&query=Chiclayo+Lambayeque+Peru"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#FAF8F5] text-[#0A192F] px-4 py-2 rounded-full text-xs font-semibold shadow-md flex items-center gap-2 hover:bg-[#FFFFFF] transition-colors"
                    >
                      <MapPin className="w-3.5 h-3.5 text-[#D48B95]" />
                      <span>Ver ubicación en Chiclayo (Google Maps)</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right: FAQ Accordion (5 cols) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-[#FFFFFF] border border-[#E8E2D8] rounded-2xl p-6 shadow-xs space-y-4">
              <div className="flex items-center gap-2 text-xs font-semibold text-[#D48B95] uppercase tracking-wider">
                <ShieldCheck className="w-4 h-4" />
                <span>Preguntas Frecuentes</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-[#0A192F]">
                Dudas Habituales
              </h3>

              <div className="space-y-3 pt-2">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaq === idx;
                  return (
                    <div
                      key={idx}
                      className="border border-[#E8E2D8] rounded-xl overflow-hidden transition-colors"
                    >
                      <button
                        onClick={() => setOpenFaq(isOpen ? null : idx)}
                        className="w-full text-left p-3.5 sm:p-4 text-xs sm:text-sm font-semibold text-[#0A192F] flex items-center justify-between gap-3 bg-[#FAF8F5] hover:bg-[#F4EFEA] transition-colors cursor-pointer"
                      >
                        <span>{faq.q}</span>
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 text-[#D48B95] flex-shrink-0" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-[#0A192F]/50 flex-shrink-0" />
                        )}
                      </button>
                      {isOpen && (
                        <div className="p-3.5 sm:p-4 bg-[#FFFFFF] text-xs sm:text-sm text-[#0A192F]/80 leading-relaxed border-t border-[#E8E2D8]">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
