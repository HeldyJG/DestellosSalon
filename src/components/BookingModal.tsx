import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { X, Calendar, Clock, User, Check, Sparkles, Phone, Mail, ArrowRight, Download, MessageSquare } from 'lucide-react';
import { STYLISTS, SALON_INFO } from '../data/salonData';
import { SERVICES_LIST } from '../data/previewData';
import { BookingDetails } from '../types';
import { DestellosLogo } from './DestellosLogo';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedServiceId?: string;
  preselectedStylistId?: string;
  initialNote?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  preselectedServiceId,
  preselectedStylistId,
  initialNote = '',
}) => {
  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Form State
  const [selectedServiceId, setSelectedServiceId] = useState<string>(
    preselectedServiceId || SERVICES_LIST[0].id
  );
  const [selectedStylistId, setSelectedStylistId] = useState<string>(
    preselectedStylistId || 'any'
  );
  const [selectedDate, setSelectedDate] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('');
  const [clientName, setClientName] = useState<string>('');
  const [clientPhone, setClientPhone] = useState<string>('');
  const [clientEmail, setClientEmail] = useState<string>('');
  const [notes, setNotes] = useState<string>(initialNote);
  const [bookingRef, setBookingRef] = useState<string>('');

  // Available slots for demo
  const timeSlots = [
    { time: '10:00', label: 'Mañana' },
    { time: '11:15', label: 'Mañana' },
    { time: '12:30', label: 'Mañana' },
    { time: '15:30', label: 'Tarde' },
    { time: '17:00', label: 'Tarde' },
    { time: '18:15', label: 'Tarde' },
  ];

  // Set default date to tomorrow
  useEffect(() => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dateStr = tomorrow.toISOString().split('T')[0];
    setSelectedDate(dateStr);
  }, []);

  // Update if preselected changes
  useEffect(() => {
    if (preselectedServiceId) {
      setSelectedServiceId(preselectedServiceId);
    }
  }, [preselectedServiceId]);

  useEffect(() => {
    if (preselectedStylistId) {
      setSelectedStylistId(preselectedStylistId);
    }
  }, [preselectedStylistId]);

  useEffect(() => {
    if (initialNote) {
      setNotes(initialNote);
    }
  }, [initialNote]);

  if (!isOpen) return null;

  const currentService =
    SERVICES_LIST.find((s) => s.id === selectedServiceId) || SERVICES_LIST[0];
  const currentStylist =
    selectedStylistId === 'any'
      ? { name: 'Cualquier especialista disponible', role: 'Asignación óptima' }
      : STYLISTS.find((st) => st.id === selectedStylistId) || {
          name: 'Especialista Atelier',
          role: 'Estilista',
        };

  const handleNextStep = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setStep(3);
    } else if (step === 3) {
      if (!selectedTimeSlot) {
        alert('Por favor selecciona un horario preferido.');
        return;
      }
      setStep(4);
    } else if (step === 4) {
      if (!clientName.trim() || !clientPhone.trim()) {
        alert('Por favor introduce tu nombre y número de contacto.');
        return;
      }
      // Generate booking reference
      const ref = `AURA-${Math.floor(1000 + Math.random() * 9000)}`;
      setBookingRef(ref);
      setStep(5);

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0A192F', '#D48B95', '#E5A9B4', '#FAF8F5'],
      });
    }
  };

  const handleDownloadIcs = () => {
    const event = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Destellos Salon//Cita de Belleza//PE
BEGIN:VEVENT
UID:${bookingRef}@destellossalon.pe
DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z
DTSTART:${selectedDate.replace(/-/g, '')}T${selectedTimeSlot.replace(':', '')}00
SUMMARY:Cita Destellos Salón Chiclayo - ${currentService.name}
DESCRIPTION:Cita confirmada para ${currentService.name} con ${currentStylist.name}. Referencia: ${bookingRef}
LOCATION:${SALON_INFO.address}
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([event], { type: 'text/calendar;charset=utf-8' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `Cita-Destellos-${bookingRef}.ics`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const whatsappMessage = encodeURIComponent(
    `¡Hola Destellos Salón Chiclayo! He reservado una cita online:\n\n` +
      `📋 *Referencia:* ${bookingRef}\n` +
      `💇‍♀️ *Servicio:* ${currentService.name} (${SALON_INFO.currency} ${currentService.price})\n` +
      `👤 *Estilista:* ${currentStylist.name}\n` +
      `📅 *Fecha:* ${selectedDate}\n` +
      `⏰ *Hora:* ${selectedTimeSlot}h\n` +
      `🙋‍♀️ *Cliente:* ${clientName} (${clientPhone})\n` +
      (notes ? `💬 *Nota:* ${notes}\n` : '') +
      `\n¿Me confirman la disponibilidad, por favor? ¡Muchas gracias!`
  );

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0A192F]/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-[#FAF8F5] border border-[#E8E2D8] rounded-2xl shadow-2xl max-w-2xl w-full my-auto overflow-hidden relative"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="bg-[#0A192F] text-[#FAF8F5] p-5 sm:p-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <DestellosLogo size="sm" className="bg-[#FAF8F5] rounded-full p-0.5" />
            <div>
              <h3 className="font-serif text-lg sm:text-xl font-bold">
                Reserva tu Cita en {SALON_INFO.name}
              </h3>
              <p className="text-xs text-[#FAF8F5]/70">
                Paso {step} de 4 {step === 5 ? '• ¡Confirmación!' : ''}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#FAF8F5]/70 hover:text-[#FAF8F5] hover:bg-[#FAF8F5]/10 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progress Indicators */}
        {step < 5 && (
          <div className="flex border-b border-[#E8E2D8] bg-[#FFFFFF] px-6 py-2.5 text-xs text-[#0A192F]/70 justify-between">
            <span
              className={`font-semibold ${
                step >= 1 ? 'text-[#0A192F]' : 'text-[#0A192F]/40'
              }`}
            >
              1. Servicio
            </span>
            <span>→</span>
            <span
              className={`font-semibold ${
                step >= 2 ? 'text-[#0A192F]' : 'text-[#0A192F]/40'
              }`}
            >
              2. Estilista
            </span>
            <span>→</span>
            <span
              className={`font-semibold ${
                step >= 3 ? 'text-[#0A192F]' : 'text-[#0A192F]/40'
              }`}
            >
              3. Fecha & Hora
            </span>
            <span>→</span>
            <span
              className={`font-semibold ${
                step >= 4 ? 'text-[#0A192F]' : 'text-[#0A192F]/40'
              }`}
            >
              4. Tus Datos
            </span>
          </div>
        )}

        {/* Modal Body Content */}
        <div className="p-5 sm:p-7 max-h-[75vh] overflow-y-auto">
          {/* STEP 1: Select Service */}
          {step === 1 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#0A192F]">
                Selecciona el servicio que deseas disfrutar:
              </h4>
              <div className="space-y-2.5 max-h-80 overflow-y-auto pr-1">
                {SERVICES_LIST.map((srv) => {
                  const isSelected = selectedServiceId === srv.id;
                  return (
                    <div
                      key={srv.id}
                      onClick={() => setSelectedServiceId(srv.id)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                        isSelected
                          ? 'border-[#0A192F] bg-[#FFFFFF] shadow-xs'
                          : 'border-[#E8E2D8] bg-[#FFFFFF]/60 hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                            isSelected
                              ? 'border-[#0A192F] bg-[#0A192F] text-white'
                              : 'border-[#E8E2D8]'
                          }`}
                        >
                          {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>
                        <div>
                          <p className="font-semibold text-xs sm:text-sm text-[#0A192F]">
                            {srv.name}
                          </p>
                          <span className="text-[11px] text-[#0A192F]/60">
                            {srv.categoryLabel} • {srv.duration}
                          </span>
                        </div>
                      </div>
                      <span className="font-serif font-bold text-sm text-[#0A192F]">
                        {SALON_INFO.currency} {srv.price}
                      </span>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  onClick={() => handleNextStep()}
                  className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Continuar</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Select Stylist */}
          {step === 2 && (
            <div className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#0A192F]">
                ¿Prefieres algún estilista en particular?
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-80 overflow-y-auto pr-1">
                {/* Any Stylist Option */}
                <div
                  onClick={() => setSelectedStylistId('any')}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                    selectedStylistId === 'any'
                      ? 'border-[#0A192F] bg-[#FFFFFF] shadow-xs ring-1 ring-[#0A192F]'
                      : 'border-[#E8E2D8] bg-[#FFFFFF]/60 hover:bg-[#FFFFFF]'
                  }`}
                >
                  <div className="w-11 h-11 rounded-full bg-[#F4EFEA] flex items-center justify-center text-[#0A192F] font-serif font-bold text-sm border border-[#E8E2D8]">
                    ✨
                  </div>
                  <div>
                    <h5 className="font-semibold text-xs sm:text-sm text-[#0A192F]">
                      Cualquier Especialista
                    </h5>
                    <p className="text-[11px] text-[#0A192F]/60">
                      Mayor disponibilidad de horarios
                    </p>
                  </div>
                </div>

                {/* Specific Stylists */}
                {STYLISTS.map((st) => {
                  const isSelected = selectedStylistId === st.id;
                  return (
                    <div
                      key={st.id}
                      onClick={() => setSelectedStylistId(st.id)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex items-center gap-3 ${
                        isSelected
                          ? 'border-[#0A192F] bg-[#FFFFFF] shadow-xs ring-1 ring-[#0A192F]'
                          : 'border-[#E8E2D8] bg-[#FFFFFF]/60 hover:bg-[#FFFFFF]'
                      }`}
                    >
                      <img
                        src={st.photo}
                        alt={st.name}
                        className="w-11 h-11 rounded-full object-cover border border-[#E8E2D8]"
                        referrerPolicy="no-referrer"
                      />
                      <div>
                        <h5 className="font-semibold text-xs sm:text-sm text-[#0A192F]">
                          {st.name}
                        </h5>
                        <p className="text-[11px] text-[#D48B95] font-medium truncate max-w-[140px]">
                          {st.role}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-4 py-2 text-xs font-medium text-[#0A192F]/70 hover:text-[#0A192F] cursor-pointer"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => handleNextStep()}
                  className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Continuar a Fecha y Hora</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Date & Time Slot */}
          {step === 3 && (
            <div className="space-y-5">
              <h4 className="font-serif text-lg font-bold text-[#0A192F]">
                Elige la fecha y franja horaria:
              </h4>

              {/* Date Input */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-[#0A192F]">
                  Fecha deseada
                </label>
                <input
                  type="date"
                  value={selectedDate}
                  onChange={(e) => setSelectedDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full bg-[#FFFFFF] border border-[#E8E2D8] rounded-xl px-4 py-2.5 text-xs sm:text-sm text-[#0A192F] focus:outline-none focus:border-[#D48B95]"
                />
              </div>

              {/* Time Slots */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-[#0A192F]">
                  Horarios disponibles para {selectedDate || 'la fecha seleccionada'}
                </label>
                <div className="grid grid-cols-3 gap-2.5">
                  {timeSlots.map((slot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        type="button"
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-3 rounded-xl border text-center transition-all cursor-pointer ${
                          isSelected
                            ? 'bg-[#0A192F] text-[#FAF8F5] border-[#0A192F] font-bold shadow-xs'
                            : 'bg-[#FFFFFF] text-[#0A192F] border-[#E8E2D8] hover:bg-[#F4EFEA]'
                        }`}
                      >
                        <span className="block text-sm">{slot.time}</span>
                        <span className="text-[10px] opacity-70 block">{slot.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-4 py-2 text-xs font-medium text-[#0A192F]/70 hover:text-[#0A192F] cursor-pointer"
                >
                  ← Volver
                </button>
                <button
                  onClick={() => handleNextStep()}
                  className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer transition-all"
                >
                  <span>Continuar con mis datos</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Client Information */}
          {step === 4 && (
            <form onSubmit={handleNextStep} className="space-y-4">
              <h4 className="font-serif text-lg font-bold text-[#0A192F]">
                Tus datos para confirmar la cita:
              </h4>

              {/* Summary pill */}
              <div className="p-3 bg-[#F4EFEA] border border-[#E8E2D8] rounded-xl text-xs space-y-1">
                <div className="flex justify-between font-semibold text-[#0A192F]">
                  <span>{currentService.name}</span>
                  <span>{currentService.price}€</span>
                </div>
                <div className="text-[#0A192F]/70 flex justify-between">
                  <span>Con: {currentStylist.name}</span>
                  <span>
                    {selectedDate} a las {selectedTimeSlot}h
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <div>
                  <label className="text-xs font-semibold text-[#0A192F] block mb-1">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Ej. Sofía Herrera"
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E8E2D8] rounded-xl px-4 py-2 text-xs sm:text-sm text-[#0A192F] focus:outline-none focus:border-[#D48B95]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-semibold text-[#0A192F] block mb-1">
                      Teléfono / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="+34 600 000 000"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E8E2D8] rounded-xl px-4 py-2 text-xs sm:text-sm text-[#0A192F] focus:outline-none focus:border-[#D48B95]"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-semibold text-[#0A192F] block mb-1">
                      Correo Electrónico
                    </label>
                    <input
                      type="email"
                      placeholder="sofia@ejemplo.com"
                      value={clientEmail}
                      onChange={(e) => setClientEmail(e.target.value)}
                      className="w-full bg-[#FFFFFF] border border-[#E8E2D8] rounded-xl px-4 py-2 text-xs sm:text-sm text-[#0A192F] focus:outline-none focus:border-[#D48B95]"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-xs font-semibold text-[#0A192F] block mb-1">
                    Inspiración o notas especiales (opcional)
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Ej. Quiero un rubio vainilla como en el post de Instagram, tengo mechas previas..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full bg-[#FFFFFF] border border-[#E8E2D8] rounded-xl px-4 py-2 text-xs text-[#0A192F] focus:outline-none focus:border-[#D48B95]"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="px-4 py-2 text-xs font-medium text-[#0A192F]/70 hover:text-[#0A192F] cursor-pointer"
                >
                  ← Volver
                </button>
                <button
                  type="submit"
                  className="bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] px-6 py-2.5 rounded-full text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer shadow-md"
                >
                  <Sparkles className="w-4 h-4 text-[#E5A9B4]" />
                  <span>Confirmar y Finalizar Reserva</span>
                </button>
              </div>
            </form>
          )}

          {/* STEP 5: Success Voucher & Actions */}
          {step === 5 && (
            <div className="space-y-6 text-center py-2">
              <div className="w-16 h-16 rounded-full bg-[#D48B95]/20 text-[#D48B95] flex items-center justify-center mx-auto">
                <Check className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h4 className="font-serif text-2xl font-bold text-[#0A192F]">
                  ¡Tu Cita está Registrada!
                </h4>
                <p className="text-xs sm:text-sm text-[#0A192F]/70">
                  Hemos guardado tu preferencia en el sistema del Atelier.
                </p>
              </div>

              {/* Booking Voucher Card */}
              <div className="bg-[#FFFFFF] border border-[#E8E2D8] rounded-2xl p-5 text-left space-y-3 shadow-xs">
                <div className="flex items-center justify-between border-b border-[#E8E2D8] pb-3">
                  <div className="flex items-center gap-2.5">
                    <DestellosLogo size="xs" />
                    <div>
                      <span className="text-[10px] uppercase font-bold text-[#D48B95] tracking-wider">
                        Comprobante de Reserva • Destellos Salón
                      </span>
                      <p className="font-mono font-bold text-sm text-[#0A192F]">
                        {bookingRef}
                      </p>
                    </div>
                  </div>
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-[#F4EFEA] text-[#0A192F]">
                    {SALON_INFO.currency} {currentService.price}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-[#0A192F]/60 block">Servicio</span>
                    <strong className="text-[#0A192F]">{currentService.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#0A192F]/60 block">Estilista</span>
                    <strong className="text-[#0A192F]">{currentStylist.name}</strong>
                  </div>
                  <div>
                    <span className="text-[#0A192F]/60 block">Fecha y Hora</span>
                    <strong className="text-[#0A192F]">
                      {selectedDate} a las {selectedTimeSlot}h
                    </strong>
                  </div>
                  <div>
                    <span className="text-[#0A192F]/60 block">Titular</span>
                    <strong className="text-[#0A192F]">{clientName}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-[#E8E2D8] text-[11px] text-[#0A192F]/70 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-[#D48B95]" />
                  <span>Te esperamos 5 minutos antes para disfrutar de café o té de bienvenida.</span>
                </div>
              </div>

              {/* Action Buttons: WhatsApp and Calendar */}
              <div className="space-y-2.5">
                <a
                  href={`https://wa.me/${SALON_INFO.whatsapp.replace(/\D/g, '')}?text=${whatsappMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-[#25D366] hover:bg-[#1EBE5D] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 shadow-sm transition-all"
                >
                  <MessageSquare className="w-4 h-4 fill-current" />
                  <span>Enviar Confirmación Inmediata por WhatsApp</span>
                </a>

                <div className="flex gap-2">
                  <button
                    onClick={handleDownloadIcs}
                    className="flex-1 bg-[#FFFFFF] border border-[#E8E2D8] hover:bg-[#F4EFEA] text-[#0A192F] py-2.5 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5 text-[#D48B95]" />
                    <span>Guardar en Calendario (.ics)</span>
                  </button>

                  <button
                    onClick={onClose}
                    className="flex-1 bg-[#0A192F] hover:bg-[#152744] text-[#FAF8F5] py-2.5 px-3 rounded-xl text-xs font-semibold transition-colors cursor-pointer"
                  >
                    Cerrar
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
