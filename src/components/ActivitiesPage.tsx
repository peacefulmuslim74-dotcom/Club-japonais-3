import React from 'react';
import { CategoryCover } from '../types/club';
import { CategoryGraphicCard } from './CategoryGraphicCard';
import { Compass, Sparkles, Calendar, ArrowRight } from 'lucide-react';

interface ActivitiesPageProps {
  covers: CategoryCover[];
  onSelectCategoryEvents: (category: string) => void;
}

export const ActivitiesPage: React.FC<ActivitiesPageProps> = ({
  covers,
  onSelectCategoryEvents,
}) => {
  return (
    <div className="min-h-screen bg-white text-neutral-950 py-16 sm:py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Editorial Heading */}
        <header className="pb-12 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF4F93] mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>DISCIPLINES & DOMAINES D'INITIATION</span>
            <span className="text-neutral-400">/</span>
            <span className="font-jp">活動分野</span>
          </div>

          <h1 className="font-horrendo text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 leading-tight">
            LES 5 DOMAINES DU CLUB
          </h1>

          <p className="text-sm sm:text-base text-neutral-600 font-light mt-4 max-w-2xl leading-relaxed">
            Chaque domaine rassemble des ateliers ponctuels, des sessions immersives et des cercles de pratique
            guidés par des intervenants et membres passionnés au Centre socioculturel Point E.
          </p>

          <div className="mt-4 p-4 bg-neutral-50 border border-neutral-200 rounded-xl text-xs text-neutral-600 font-mono max-w-xl">
            <strong>Note d'organisation :</strong> Ces disciplines ne constituent pas des cours permanents
            fixes, mais des cycles d'ateliers et d'événements ponctuels annoncés dans notre calendrier officiel.
          </div>
        </header>

        {/* Asymmetric Artistic Grid of Category Covers */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {covers.map((cover) => (
            <CategoryGraphicCard
              key={cover.id}
              cover={cover}
              onClick={() => onSelectCategoryEvents(cover.category)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
