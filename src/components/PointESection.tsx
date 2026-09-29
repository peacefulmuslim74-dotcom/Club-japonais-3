import React from 'react';
import { MapPin, Building2, Calendar, Compass, ShieldAlert, ArrowUpRight } from 'lucide-react';
import { LocationItem } from '../types/club';

interface PointESectionProps {
  location?: LocationItem;
  onExploreEventsAtPointE: () => void;
}

export const PointESection: React.FC<PointESectionProps> = ({
  location,
  onExploreEventsAtPointE,
}) => {
  return (
    <section className="py-20 bg-neutral-950 text-white border-b border-neutral-900 relative overflow-hidden">
      {/* Decorative vertical lines */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Architectural Map & Venue Badge (Cols 1-5) */}
          <div className="lg:col-span-5 relative">
            <div className="p-8 bg-neutral-900 border border-neutral-800 rounded-3xl relative overflow-hidden">
              <div className="text-[10px] font-mono text-[#FF4F93] uppercase tracking-widest mb-3 flex items-center gap-2">
                <MapPin className="w-3.5 h-3.5" />
                <span>ESPACE D'ACCUEIL DES ACTIVITÉS</span>
              </div>

              <h2 className="font-horrendo text-3xl font-bold tracking-tight text-white">
                CENTRE SOCIOCULTUREL POINT E
              </h2>

              <p className="font-jp text-sm text-neutral-400 mt-1">
                ポワンE 社会文化センター
              </p>

              {/* Strict Disclaimer per instructions: Lieu d'activité vs Siège */}
              <div className="mt-6 p-3.5 bg-neutral-950 border border-neutral-800 rounded-xl text-xs text-neutral-400 font-mono space-y-1">
                <div className="flex items-center gap-1.5 text-neutral-300 font-semibold uppercase text-[10px]">
                  <Compass className="w-3.5 h-3.5 text-[#FF4F93]" />
                  <span>Statut Officiel du Lieu</span>
                </div>
                <p className="text-[11px] leading-relaxed">
                  Lieu d'activité régulier accueillant les ateliers du club à Dakar.
                  <br />
                  <span className="text-neutral-500">
                    (Note : ce centre constitue notre espace de rassemblement et d'ateliers, distinct du siège associatif).
                  </span>
                </p>
              </div>

              {/* Practical information */}
              <div className="mt-6 pt-6 border-t border-neutral-800 space-y-3 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span className="font-mono">Quartier :</span>
                  <span className="text-white font-medium">Point E, Dakar, Sénégal</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span className="font-mono">Activités accueillies :</span>
                  <span className="text-white font-medium">Calligraphie, Origami, Projections</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span className="font-mono">Accès :</span>
                  <span className="text-[#FF4F93] font-medium">Ouvert lors des rendez-vous programmés</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Narrative on Point E (Cols 6-12) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF4F93] uppercase">
              <span>POINT D'ANCRAGE CULTUREL</span>
              <span className="text-neutral-600">/</span>
              <span>DAKAR</span>
            </div>

            <h3 className="font-horrendo text-3xl sm:text-4xl font-bold text-white tracking-tight leading-tight">
              Un carrefour d'apprentissage et de rencontre au cœur de Dakar.
            </h3>

            <p className="text-sm text-neutral-300 font-light leading-relaxed">
              Le Centre socioculturel Point E offre au Senegal ISM Japan Club un espace propice à la
              sérénité nécessaire aux arts traditionnels japonais. C'est dans ce cadre convivial que nos
              membres déplient le papier washi pour l'origami, préparent l'encre sumi pour le shodō et
              échangent avec les visiteurs sénégalais et internationaux.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl">
                <div className="font-mono text-xs text-[#FF4F93] uppercase">Sessions Shodō</div>
                <h4 className="font-bold text-sm text-white mt-1">Pratique de la Calligraphie</h4>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  Tables adaptées pour le déroulement des rouleaux de feutre et du papier de riz.
                </p>
              </div>

              <div className="p-4 bg-neutral-900/60 border border-neutral-800 rounded-xl">
                <div className="font-mono text-xs text-[#FF4F93] uppercase">Cercle Origami</div>
                <h4 className="font-bold text-sm text-white mt-1">Ateliers de Pliage</h4>
                <p className="text-xs text-neutral-400 mt-1 font-light">
                  Transmission pas-à-pas des modèles classiques pour débutants et initiés.
                </p>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onExploreEventsAtPointE}
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#FF4F93] hover:text-white transition-colors"
              >
                <span>Voir les prochains ateliers prévus au Point E</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
