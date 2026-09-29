import React from 'react';
import { ClubLogo } from './ClubLogo';
import { ClubSettings, ClubEvent } from '../types/club';
import { ArrowDown, Calendar, MapPin, Sparkles, ChevronRight, Phone } from 'lucide-react';

interface HeroSectionProps {
  settings: ClubSettings;
  nextEvent?: ClubEvent;
  onExploreEvents: () => void;
  onExploreActivities: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  settings,
  nextEvent,
  onExploreEvents,
  onExploreActivities,
}) => {
  return (
    <section className="relative bg-white overflow-hidden border-b border-neutral-200">
      {/* Subtle fine architectural grid lines */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16 sm:pt-16 sm:pb-24">
        {/* Top precise metadata line */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-6 border-b border-neutral-200 text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#FF4F93]" />
            <span className="text-neutral-900 font-bold">DAKAR, SÉNÉGAL</span>
            <span>·</span>
            <span>FONDÉ EN {settings.establishedYear}</span>
          </div>
          <div className="flex items-center gap-4 text-neutral-500">
            <span>CENTRE SOCIOCULTUREL POINT E</span>
            <span className="hidden sm:inline">·</span>
            <span className="text-neutral-900 font-semibold">{settings.officialPhone}</span>
          </div>
        </div>

        {/* Master Asymmetric Editorial Composition with LOGO AS FOCAL POINT */}
        <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Massive Horrendo Brand Statement (Cols 1-7) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Japanese Kicker */}
            <div className="flex items-center gap-3">
              <span className="font-jp text-base sm:text-lg font-bold text-[#FF4F93] tracking-widest">
                にほんごくらぶ セネガル
              </span>
              <span className="h-[1px] w-12 bg-[#FF4F93]" />
              <span className="font-mono text-[10px] text-neutral-500 uppercase tracking-widest">
                THE NIHONGO CLUB
              </span>
            </div>

            {/* Giant Horrendo Typography */}
            <h1 className="font-horrendo text-4xl sm:text-6xl xl:text-7xl font-bold tracking-tight text-neutral-950 leading-[1.05]">
              SENEGAL <span className="text-[#FF4F93]">ISM</span> JAPAN CLUB
            </h1>

            {/* Architectural Sub-narrative with Japanese spacing */}
            <p className="text-sm sm:text-base text-neutral-700 font-light leading-relaxed max-w-xl">
              Depuis 2013, le club rassemble étudiants, passionnés et curieux à Dakar autour des arts,
              de la calligraphie <span className="font-jp text-neutral-900 font-medium">書道</span>,
              du pliage <span className="font-jp text-neutral-900 font-medium">折り紙</span>,
              du manga et de la pratique vivante de la langue japonaise.
            </p>

            {/* Precision Meta Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-4 border-t border-neutral-200 text-xs">
              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Lieu d'Activité
                </span>
                <span className="font-semibold text-neutral-900 block leading-tight">
                  Point E
                </span>
                <span className="text-[11px] text-neutral-500">Centre socioculturel</span>
              </div>

              <div className="space-y-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Domaines
                </span>
                <span className="font-semibold text-neutral-900 block leading-tight">
                  5 Disciplines
                </span>
                <span className="text-[11px] text-neutral-500">Manga, Shodō, Origami...</span>
              </div>

              <div className="space-y-1 col-span-2 sm:col-span-1">
                <span className="text-[10px] font-mono text-neutral-400 uppercase tracking-widest block">
                  Réseau Officiel
                </span>
                <span className="font-semibold text-neutral-900 block leading-tight">
                  {settings.instagramHandle}
                </span>
                <span className="text-[11px] text-[#FF4F93] font-medium">Direct Dakar</span>
              </div>
            </div>

            {/* Primary Non-generic Action Row */}
            <div className="pt-6 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreEvents}
                className="px-6 py-3.5 bg-neutral-950 hover:bg-[#FF4F93] text-white text-xs font-semibold tracking-wider uppercase transition-colors duration-300 rounded-xl flex items-center gap-2.5 shadow-lg shadow-neutral-900/10 group"
              >
                <span>Consulter les Événements</span>
                <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button
                onClick={onExploreActivities}
                className="px-6 py-3.5 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-xs font-semibold tracking-wider uppercase transition-colors duration-300 rounded-xl flex items-center gap-2 border border-neutral-300"
              >
                <span>Les 5 Domaines</span>
              </button>
            </div>
          </div>

          {/* Right Column: LOGO AS THE MONUMENTAL ARTISTIC FOCAL POINT (Cols 8-12) */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center relative">
            {/* Architectural backdrop framing */}
            <div className="relative p-6 sm:p-10 bg-neutral-50 border border-neutral-200/80 rounded-3xl flex flex-col items-center justify-center shadow-xl shadow-neutral-100">
              {/* Corner decorative architectural ticks */}
              <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-neutral-300" />
              <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-neutral-300" />
              <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-neutral-300" />
              <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-neutral-300" />

              {/* The Official Logo Component */}
              <ClubLogo size="hero" customImage={settings.customLogoUrl} className="my-2" />

              {/* Badge underneath */}
              <div className="mt-4 text-center">
                <span className="font-horrendo text-xs font-bold tracking-widest text-neutral-950 block">
                  EMBLÈME OFFICIEL DU CLUB
                </span>
                <span className="text-[10px] font-mono text-neutral-500 uppercase tracking-widest">
                  ESTD 2013 · DAKAR · JAPAN SOCIETY
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner: Editorial Next Appointment Preview */}
        {nextEvent && (
          <div className="mt-14 p-6 sm:p-8 bg-neutral-950 text-white rounded-2xl border border-neutral-900 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-3">
              <span className="text-[10px] font-mono text-[#FF4F93] tracking-widest uppercase block mb-1">
                PROCHAIN RENDEZ-VOUS
              </span>
              <div className="font-horrendo text-2xl font-bold tracking-tight text-white">
                {nextEvent.date}
              </div>
              <div className="text-xs text-neutral-400 font-mono mt-0.5">{nextEvent.time}</div>
            </div>

            <div className="md:col-span-6 border-l-0 md:border-l border-neutral-800 md:pl-6">
              <div className="flex items-center gap-2 text-xs text-[#FF4F93] font-mono mb-1">
                <span>{nextEvent.category}</span>
                <span>·</span>
                <span className="text-neutral-400">{nextEvent.locationName}</span>
              </div>
              <h3 className="text-base sm:text-lg font-bold text-white tracking-tight">
                {nextEvent.title}
              </h3>
              <p className="text-xs text-neutral-400 line-clamp-1 mt-1 font-light">
                {nextEvent.description}
              </p>
            </div>

            <div className="md:col-span-3 flex justify-start md:justify-end">
              <button
                onClick={onExploreEvents}
                className="px-5 py-2.5 bg-[#FF4F93] hover:bg-[#D91D69] text-white text-xs font-semibold tracking-wider uppercase rounded-xl transition-colors flex items-center gap-2"
              >
                <span>Voir le Programme</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
