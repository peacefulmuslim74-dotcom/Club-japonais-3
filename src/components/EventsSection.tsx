import React, { useState, useMemo } from 'react';
import { ClubEvent, ActivityCategory } from '../types/club';
import { Calendar, Clock, MapPin, Tag, CheckCircle2, ArrowRight, Filter, UserCheck, AlertCircle } from 'lucide-react';

interface EventsSectionProps {
  events: ClubEvent[];
  onSelectEvent: (event: ClubEvent) => void;
  onRegisterEvent?: (event: ClubEvent) => void;
  variant?: 'homepage' | 'full';
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onSelectEvent,
  onRegisterEvent,
  variant = 'full',
}) => {
  const [filterPeriod, setFilterPeriod] = useState<'all' | 'upcoming' | 'past'>('upcoming');
  const [filterCategory, setFilterCategory] = useState<string>('All');

  const categories = ['All', 'Manga & Dessin', 'Origami', 'Calligraphie', 'Cinéma', 'Culture Japonaise'];

  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Period filter
      if (filterPeriod === 'upcoming' && e.status === 'past') return false;
      if (filterPeriod === 'past' && e.status !== 'past') return false;

      // Category filter
      if (filterCategory !== 'All' && e.category !== filterCategory) return false;

      return true;
    });
  }, [events, filterPeriod, filterCategory]);

  const displayEvents = variant === 'homepage' ? events.slice(0, 3) : filteredEvents;

  return (
    <section className="py-16 sm:py-20 bg-white border-b border-neutral-200 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-200">
          <div className="min-w-0 max-w-full">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF4F93] uppercase mb-2">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span>CALENDRIER & ÉVÉNEMENTS</span>
              <span className="text-neutral-400">/</span>
              <span className="font-jp">行事日程</span>
            </div>
            <h2 className="font-horrendo text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-950 leading-[1.1] break-words">
              PROGRAMMATION CULTURELLE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-600 mt-2 font-light max-w-xl">
              Ateliers pratiques, projections et rencontres artistiques organisés par le Senegal ISM Japan Club.
            </p>
          </div>

          {/* Interactive Filters (in full view) */}
          {variant === 'full' && (
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Period Tabs */}
              <div className="flex items-center p-1 bg-neutral-100 rounded-xl text-xs font-medium border border-neutral-200">
                <button
                  onClick={() => setFilterPeriod('upcoming')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                    filterPeriod === 'upcoming'
                      ? 'bg-neutral-950 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  À venir
                </button>
                <button
                  onClick={() => setFilterPeriod('past')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                    filterPeriod === 'past'
                      ? 'bg-neutral-950 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  Archives passées
                </button>
                <button
                  onClick={() => setFilterPeriod('all')}
                  className={`px-3.5 py-1.5 rounded-lg transition-colors ${
                    filterPeriod === 'all'
                      ? 'bg-neutral-950 text-white shadow-sm'
                      : 'text-neutral-600 hover:text-neutral-950'
                  }`}
                >
                  Tout
                </button>
              </div>

              {/* Category selector */}
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                aria-label="Filtrer par discipline"
                className="bg-neutral-100 border border-neutral-200 rounded-xl px-3 py-1.5 text-xs text-neutral-900 focus:outline-none cursor-pointer"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat === 'All' ? 'Toutes disciplines' : cat}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {/* Asymmetric Editorial Event Rows */}
        {displayEvents.length === 0 ? (
          <div className="py-20 text-center text-neutral-500 font-mono text-xs">
            Aucun événement ne correspond à cette sélection actuellement.
          </div>
        ) : (
          <div className="mt-10 divide-y divide-neutral-200">
            {displayEvents.map((evt, idx) => (
              <article
                key={evt.id}
                onClick={() => onSelectEvent(evt)}
                className="group py-8 sm:py-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start hover:bg-neutral-50/80 px-2 sm:px-4 rounded-2xl transition-all duration-300 cursor-pointer"
              >
                {/* Col 1-4: Massive Editorial Date & Time */}
                <div className="lg:col-span-4 space-y-2">
                  <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#FF4F93]">
                    <span>{evt.category}</span>
                    {evt.japaneseTitle && (
                      <>
                        <span className="text-neutral-300">·</span>
                        <span className="font-jp text-neutral-500">{evt.japaneseTitle}</span>
                      </>
                    )}
                  </div>

                  {/* Date rendered in large Horrendo Display */}
                  <h3 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-neutral-950 group-hover:text-[#FF4F93] transition-colors leading-tight">
                    {evt.date}
                  </h3>

                  <div className="flex items-center gap-4 text-xs font-mono text-neutral-600">
                    <span className="flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-neutral-400" />
                      <span>{evt.time}</span>
                    </span>
                    <span>·</span>
                    <span className="text-neutral-900 font-semibold">{evt.price}</span>
                  </div>
                </div>

                {/* Col 5-9: Event Title, Location, and Editorial Summary */}
                <div className="lg:col-span-5 space-y-3">
                  <h4 className="text-lg sm:text-xl font-bold text-neutral-950 tracking-tight leading-snug">
                    {evt.title}
                  </h4>

                  <p className="text-xs sm:text-sm text-neutral-600 font-light leading-relaxed line-clamp-2">
                    {evt.description}
                  </p>

                  <div className="flex items-center gap-2 text-xs text-neutral-500 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-[#FF4F93]" />
                    <span>{evt.locationName} ({evt.locationDetails})</span>
                  </div>
                </div>

                {/* Col 10-12: Capacity, Inscription Badge & Trigger */}
                <div className="lg:col-span-3 flex flex-col lg:items-end justify-between h-full pt-2 lg:pt-0 gap-4">
                  {/* Registration availability indicator */}
                  {evt.registrationEnabled ? (
                    <div className="text-left lg:text-right">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-emerald-50 text-emerald-800 text-[11px] font-mono font-medium border border-emerald-200">
                        <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                        <span>Inscriptions Ouvertes</span>
                      </div>
                      {evt.registrationCapacity && (
                        <div className="text-[10px] font-mono text-neutral-500 mt-1">
                          {evt.registeredCount} / {evt.registrationCapacity} participants inscrits
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="inline-flex items-center gap-1.5 text-[11px] font-mono text-neutral-500">
                      <span>Accès libre selon places</span>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectEvent(evt);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-neutral-950 group-hover:bg-[#FF4F93] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors duration-200"
                  >
                    <span>Fiche & Détails</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
