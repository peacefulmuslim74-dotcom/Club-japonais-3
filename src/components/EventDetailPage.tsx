import React, { useState } from 'react';
import { ClubEvent, EventRegistration } from '../types/club';
import { ArrowLeft, Calendar, Clock, MapPin, Tag, CheckCircle2, User, Mail, Phone, Users, ShieldCheck } from 'lucide-react';

interface EventDetailPageProps {
  event: ClubEvent;
  onBack: () => void;
  onRegisterAttendee: (registration: Omit<EventRegistration, 'id' | 'date' | 'status'>) => void;
}

export const EventDetailPage: React.FC<EventDetailPageProps> = ({
  event,
  onBack,
  onRegisterAttendee,
}) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [attendeesCount, setAttendeesCount] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email || !phone) return;

    onRegisterAttendee({
      eventId: event.id,
      eventTitle: event.title,
      fullName,
      email,
      phone,
      attendeesCount,
    });

    setIsSuccess(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-950 py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-950 mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Retour aux Événements</span>
        </button>

        {/* Header Composition: Large Horrendo Date & Title */}
        <header className="space-y-4 pb-10 border-b border-neutral-200">
          <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#FF4F93] uppercase">
            <span>{event.category}</span>
            {event.japaneseTitle && (
              <>
                <span className="text-neutral-300">·</span>
                <span className="font-jp text-neutral-600">{event.japaneseTitle}</span>
              </>
            )}
          </div>

          <div className="font-horrendo text-2xl sm:text-4xl font-bold tracking-tight text-[#FF4F93]">
            {event.date}
          </div>

          <h1 className="font-horrendo text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-neutral-950 leading-[1.05]">
            {event.title}
          </h1>

          <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-2xl pt-2">
            {event.description}
          </p>
        </header>

        {/* Key Logistics Strip (Lieu / Heure / Prix) */}
        <section aria-label="Informations pratiques" className="py-8 border-b border-neutral-200 grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              Lieu d'Activité
            </span>
            <div className="flex items-start gap-1.5 font-semibold text-neutral-950 text-sm">
              <MapPin className="w-4 h-4 text-[#FF4F93] shrink-0 mt-0.5" />
              <span>{event.locationName}</span>
            </div>
            <span className="text-neutral-500 block">{event.locationDetails}</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              Horaire
            </span>
            <div className="flex items-center gap-1.5 font-semibold text-neutral-950 text-sm">
              <Clock className="w-4 h-4 text-[#FF4F93] shrink-0" />
              <span>{event.time}</span>
            </div>
            <span className="text-neutral-500 block">Heure de Dakar (GMT)</span>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] font-mono uppercase tracking-widest text-neutral-400 block">
              Conditions d'Accès
            </span>
            <div className="flex items-center gap-1.5 font-semibold text-neutral-950 text-sm">
              <Tag className="w-4 h-4 text-[#FF4F93] shrink-0" />
              <span>{event.price}</span>
            </div>
            <span className="text-neutral-500 block">
              {event.registrationEnabled ? 'Inscription préalable requise' : 'Accès selon places'}
            </span>
          </div>
        </section>

        {/* Editorial Body Text */}
        {event.editorialBody && (
          <section className="py-10 border-b border-neutral-200 space-y-4">
            <h2 className="font-horrendo text-xl font-bold tracking-tight text-neutral-950">
              PRÉSENTATION DÉTAILLÉE DE LA SESSION
            </h2>
            <div className="text-sm text-neutral-800 leading-relaxed font-light whitespace-pre-line space-y-4">
              {event.editorialBody}
            </div>
          </section>
        )}

        {/* Registration Section (Only if enabled!) */}
        {event.registrationEnabled && (
          <section className="py-10 border-b border-neutral-200">
            <div className="bg-neutral-50 border border-neutral-200 rounded-3xl p-6 sm:p-10">
              <div className="max-w-xl">
                <div className="text-[11px] font-mono uppercase tracking-widest text-[#FF4F93] mb-1">
                  INSCRIPTION OFFICIELLE
                </div>
                <h3 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950">
                  RÉSERVER VOTRE PARTICIPATION
                </h3>
                <p className="text-xs text-neutral-600 mt-1 mb-6">
                  Les places sont limitées afin de garantir la qualité des échanges et la disponibilité du matériel d'atelier.
                </p>

                {isSuccess ? (
                  <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl space-y-2">
                    <div className="flex items-center gap-2 text-emerald-800 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Votre inscription a bien été enregistrée !</span>
                    </div>
                    <p className="text-xs text-emerald-700 leading-relaxed">
                      Un e-mail de confirmation a été émis pour <strong>{fullName}</strong>. Rendez-vous au{' '}
                      <strong>{event.locationName}</strong> le {event.date} à {event.time}.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="block text-xs font-medium text-neutral-800 mb-1">
                        Nom et Prénom *
                      </label>
                      <div className="relative">
                        <User className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          required
                          placeholder="Ex : Aïssatou Diop"
                          value={fullName}
                          onChange={(e) => setFullName(e.target.value)}
                          className="w-full bg-white border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF4F93]"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-medium text-neutral-800 mb-1">
                          Adresse E-mail *
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="email"
                            required
                            placeholder="votre.email@domaine.sn"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF4F93]"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-neutral-800 mb-1">
                          Téléphone WhatsApp / Appel *
                        </label>
                        <div className="relative">
                          <Phone className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                          <input
                            type="tel"
                            required
                            placeholder="+221 77 ..."
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className="w-full bg-white border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF4F93]"
                          />
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-neutral-800 mb-1">
                        Nombre de Participants
                      </label>
                      <div className="relative max-w-xs">
                        <Users className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2" />
                        <select
                          value={attendeesCount}
                          onChange={(e) => setAttendeesCount(parseInt(e.target.value, 10))}
                          className="w-full bg-white border border-neutral-300 rounded-xl pl-9 pr-3 py-2 text-xs text-neutral-900 focus:outline-none focus:border-[#FF4F93] cursor-pointer"
                        >
                          <option value={1}>1 personne</option>
                          <option value={2}>2 personnes</option>
                          <option value={3}>3 personnes</option>
                        </select>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button
                        type="submit"
                        className="w-full sm:w-auto px-8 py-3 bg-neutral-950 hover:bg-[#FF4F93] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors duration-200"
                      >
                        Confirmer mon Inscription
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </section>
        )}
      </div>
    </div>
  );
};
