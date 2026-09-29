import React, { useState } from 'react';
import { Type, Check, Sparkles, X } from 'lucide-react';

export type FontOption = 'syne' | 'cinzel' | 'space' | 'oswald';

interface FontSwitcherProps {
  currentFont: FontOption;
  onSelectFont: (font: FontOption) => void;
}

export const fontChoices: {
  id: FontOption;
  name: string;
  category: string;
  tagline: string;
  previewSample: string;
  fontFamily: string;
  description: string;
}[] = [
  {
    id: 'syne',
    name: '1. SYNE',
    category: 'Avant-Garde Architectural',
    tagline: 'Sculpturale, contemporaine et audacieuse',
    previewSample: 'SENEGAL ISM JAPAN CLUB',
    fontFamily: "'Syne', sans-serif",
    description: 'Une sans-serif d\'art ultra-moderne aux courbes géométriques radicales. Donne un souffle de haute galerie d\'art contemporain à Dakar et Tokyo.',
  },
  {
    id: 'cinzel',
    name: '2. CINZEL',
    category: 'Haute Élégance & Prestige Culturel',
    tagline: 'Sérif noble, intemporelle et solennelle',
    previewSample: 'SENEGAL ISM JAPAN CLUB',
    fontFamily: "'Cinzel', serif",
    description: 'Inspirée de la gravure classique et de la noblesse calligraphique. Apporte une stature institutionnelle et diplomatique d\'exception.',
  },
  {
    id: 'space',
    name: '3. SPACE GROTESK',
    category: 'Clarté Japonaise & Design Moderne',
    tagline: 'Épurée, géométrique et en parfaite harmonie avec le logo',
    previewSample: 'SENEGAL ISM JAPAN CLUB',
    fontFamily: "'Space Grotesk', sans-serif",
    description: 'Propre, minimaliste et rigoureuse. Rappelle les studios de design graphique de pointe de Tokyo et s\'accorde parfaitement au cartouche « CLUB » du logo.',
  },
  {
    id: 'oswald',
    name: '4. OSWALD',
    category: 'Monumental Condensé & Affiche d\'Art',
    tagline: 'Verticalité puissante et présence scénique',
    previewSample: 'SENEGAL ISM JAPAN CLUB',
    fontFamily: "'Oswald', sans-serif",
    description: 'Haute, condensée et rythmée, elle fait écho à la verticalité des bannières japonaises (nobori) et aux grandes affiches d\'expositions artistiques.',
  },
];

export const FontSwitcher: React.FC<FontSwitcherProps> = ({
  currentFont,
  onSelectFont,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger Pill */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2.5 px-4 py-3 bg-neutral-950 hover:bg-[#FF4F93] text-white text-xs font-semibold rounded-full shadow-2xl border border-neutral-800 transition-all duration-300 hover:scale-105 group"
          title="Tester les 4 polices en direct"
        >
          <Type className="w-4 h-4 text-[#FF4F93] group-hover:text-white transition-colors" />
          <span className="font-mono uppercase tracking-wider">
            Changer Police ({currentFont.toUpperCase()})
          </span>
          <span className="w-2 h-2 rounded-full bg-[#FF4F93] group-hover:bg-white animate-pulse" />
        </button>
      </div>

      {/* Drawer / Modal with all 4 font specimens */}
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 animate-in fade-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between pb-4 border-b border-neutral-200">
              <div>
                <div className="flex items-center gap-2 text-[10px] font-mono uppercase tracking-widest text-[#FF4F93]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>SÉLECTION TYPOGRAPHIQUE OFFICIELLE</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-neutral-950 mt-1">
                  Choisissez parmi les 4 directions artistiques
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-light">
                  Cliquez sur une police pour l'appliquer instantanément à l'ensemble du site.
                </p>
              </div>

              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-lg hover:bg-neutral-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* 4 Cards Specimen Grid */}
            <div className="space-y-3">
              {fontChoices.map((choice) => {
                const isSelected = currentFont === choice.id;
                return (
                  <div
                    key={choice.id}
                    onClick={() => {
                      onSelectFont(choice.id);
                    }}
                    className={`p-4 sm:p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? 'border-[#FF4F93] bg-[#FFF0F5]/50 shadow-md'
                        : 'border-neutral-200 hover:border-neutral-400 bg-neutral-50/60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-mono font-bold text-neutral-900">
                          {choice.name}
                        </span>
                        <span className="text-[10px] font-mono text-[#FF4F93] uppercase px-2 py-0.5 rounded bg-white border border-neutral-200">
                          {choice.category}
                        </span>
                      </div>

                      {isSelected ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-[#FF4F93] font-mono">
                          <Check className="w-4 h-4" />
                          <span>ACTIF</span>
                        </span>
                      ) : (
                        <span className="text-[11px] font-mono text-neutral-400">
                          Cliquer pour tester
                        </span>
                      )}
                    </div>

                    {/* Live Font Specimen Preview */}
                    <div
                      className="mt-3 text-xl sm:text-2xl font-bold tracking-tight text-neutral-950"
                      style={{ fontFamily: choice.fontFamily }}
                    >
                      {choice.previewSample}
                    </div>

                    <p className="text-xs text-neutral-600 font-light mt-2 leading-relaxed">
                      {choice.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Confirmation Footer */}
            <div className="pt-4 border-t border-neutral-200 flex items-center justify-between text-xs font-mono">
              <span className="text-neutral-500">
                Direction active : <strong className="text-neutral-950 uppercase">{currentFont}</strong>
              </span>
              <button
                onClick={() => setIsOpen(false)}
                className="px-5 py-2.5 bg-neutral-950 hover:bg-[#FF4F93] text-white text-xs font-bold uppercase tracking-wider rounded-xl transition-colors"
              >
                Valider ce Choix
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
