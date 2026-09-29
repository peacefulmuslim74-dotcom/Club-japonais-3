import React from 'react';
import { ClubSettings } from '../types/club';
import { ClubLogo } from './ClubLogo';
import { Compass, Calendar, MapPin, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

interface AboutClubPageProps {
  settings: ClubSettings;
  onExploreEvents: () => void;
  onExploreActivities: () => void;
}

export const AboutClubPage: React.FC<AboutClubPageProps> = ({
  settings,
  onExploreEvents,
  onExploreActivities,
}) => {
  return (
    <div className="min-h-screen bg-white text-neutral-950 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        {/* Title */}
        <header className="space-y-4 pb-12 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF4F93]">
            <Compass className="w-3.5 h-3.5" />
            <span>VOCATION & IDENTITÉ</span>
            <span className="text-neutral-400">/</span>
            <span className="font-jp">設立の理念</span>
          </div>

          <h1 className="font-horrendo text-4xl sm:text-6xl font-bold tracking-tight text-neutral-950 leading-tight">
            LE SENEGAL ISM JAPAN CLUB
          </h1>

          <p className="font-jp text-lg text-neutral-500 font-medium">
            にほんごくらぶ セネガル · ESTD 2013
          </p>

          <p className="text-base sm:text-lg text-neutral-700 font-light leading-relaxed pt-2">
            Une passerelle culturelle vivante, artistique et humaine entre le Sénégal et le Japon,
            bâtie sur la pratique concrète et le respect des traditions.
          </p>
        </header>

        {/* Story Section */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-neutral-800 leading-relaxed font-light">
            <h2 className="font-horrendo text-2xl font-bold text-neutral-950">
              DEPUIS 2013 À DAKAR
            </h2>
            <p>
              Fondé en 2013 au sein du Groupe ISM (Institut Supérieur de Management) à Dakar, le club
              réunit des passionnés d'arts nippons désireux de dépasser les représentations superficielles.
            </p>
            <p>
              À travers la pratique de la calligraphie au pinceau (<span className="font-jp text-neutral-950 font-bold">書道</span>),
              du pliage géométrique (<span className="font-jp text-neutral-950 font-bold">折り紙</span>),
              des techniques de narration graphique manga et de projections critiques de cinéma, le club
              constitue un carrefour culturel singulier en Afrique de l'Ouest.
            </p>
          </div>

          <div className="md:col-span-4 flex justify-center">
            <div className="p-6 bg-neutral-50 border border-neutral-200 rounded-3xl text-center">
              <ClubLogo size="md" customImage={settings.customLogoUrl} className="mx-auto mb-2" />
              <div className="font-horrendo font-bold text-xs text-neutral-900 mt-2">
                THE NIHONGO CLUB
              </div>
              <div className="text-[10px] font-mono text-neutral-500">ESTD 2013 · DAKAR</div>
            </div>
          </div>
        </section>

        {/* Pillars / Principles */}
        <section className="pt-8 border-t border-neutral-200 space-y-8">
          <h2 className="font-horrendo text-2xl sm:text-3xl font-bold text-neutral-950">
            NOS VALEURS FONDATRICES
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs">
            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
              <div className="font-mono text-[#FF4F93] font-bold uppercase">01 · Rigueur & Geste</div>
              <h3 className="font-bold text-sm text-neutral-950">L'Exigence du Trait</h3>
              <p className="text-neutral-600 font-light leading-relaxed">
                Apprendre la patience et le respect de la matière, qu'il s'agisse du papier washi ou de l'encre de Chine.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
              <div className="font-mono text-[#FF4F93] font-bold uppercase">02 · Partage & Ouverture</div>
              <h3 className="font-bold text-sm text-neutral-950">Dialogue Interculturel</h3>
              <p className="text-neutral-600 font-light leading-relaxed">
                Favoriser les liens d'amitié et d'enrichissement mutuel entre les cultures sénégalaise et japonaise.
              </p>
            </div>

            <div className="p-5 bg-neutral-50 border border-neutral-200 rounded-2xl space-y-2">
              <div className="font-mono text-[#FF4F93] font-bold uppercase">03 · Authenticité</div>
              <h3 className="font-bold text-sm text-neutral-950">Sans Clichés</h3>
              <p className="text-neutral-600 font-light leading-relaxed">
                Refuser le folklore artificiel pour transmettre les philosophies et arts japonais dans leur vérité.
              </p>
            </div>
          </div>
        </section>

        {/* Action strip */}
        <div className="pt-8 border-t border-neutral-200 flex flex-wrap items-center gap-4">
          <button
            onClick={onExploreEvents}
            className="px-6 py-3 bg-neutral-950 hover:bg-[#FF4F93] text-white text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors"
          >
            Consulter les Ateliers à Venir
          </button>
          <button
            onClick={onExploreActivities}
            className="px-6 py-3 bg-neutral-100 hover:bg-neutral-200 text-neutral-950 text-xs font-semibold uppercase tracking-wider rounded-xl transition-colors border border-neutral-300"
          >
            Découvrir les 5 Domaines
          </button>
        </div>
      </div>
    </div>
  );
};
