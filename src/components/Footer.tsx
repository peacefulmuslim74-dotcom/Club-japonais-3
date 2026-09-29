import React from 'react';
import { ClubLogo } from './ClubLogo';
import { ClubSettings } from '../types/club';
import { Phone, Instagram, Facebook, MapPin, ArrowUp } from 'lucide-react';

interface FooterProps {
  settings: ClubSettings;
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ settings, onNavigate }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-neutral-950 text-white border-t border-neutral-900 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Centered Monumental Emblem & Identity */}
        <div className="flex flex-col items-center justify-center text-center pb-12 border-b border-neutral-900">
          <ClubLogo size="md" customImage={settings.customLogoUrl} className="mb-4" />

          <h2 className="font-horrendo text-2xl sm:text-4xl font-bold tracking-tight text-white">
            SENEGAL ISM JAPAN CLUB
          </h2>

          <div className="font-jp text-xs sm:text-sm text-neutral-400 mt-1 tracking-widest">
            にほんごくらぶ セネガル · ESTD 2013
          </div>

          <p className="text-xs text-neutral-400 font-light max-w-md mt-3 leading-relaxed">
            Association culturelle dédiée à l'apprentissage et au rayonnement des arts traditionnels
            et contemporains japonais à Dakar.
          </p>
        </div>

        {/* 4-Column Navigation & Logistics Grid */}
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-xs font-mono">
          {/* Col 1: Disciplines */}
          <div className="space-y-3">
            <span className="text-[#FF4F93] font-bold uppercase tracking-wider block">
              Disciplines
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavigate('/activites')} className="hover:text-white transition-colors">
                  Manga & Dessin (漫画)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/activites')} className="hover:text-white transition-colors">
                  Origami (折り紙)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/activites')} className="hover:text-white transition-colors">
                  Calligraphie Shodō (書道)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/activites')} className="hover:text-white transition-colors">
                  Cinéma Japonais (映画)
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/activites')} className="hover:text-white transition-colors">
                  Langue & Culture (日本語)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 2: Navigation */}
          <div className="space-y-3">
            <span className="text-[#FF4F93] font-bold uppercase tracking-wider block">
              Navigation
            </span>
            <ul className="space-y-2 text-neutral-400">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-white transition-colors">
                  Accueil du Club
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/evenements')} className="hover:text-white transition-colors">
                  Calendrier des Événements
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/galerie')} className="hover:text-white transition-colors">
                  Archives Galerie
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/actualites')} className="hover:text-white transition-colors">
                  Actualités & Communiqués
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/collaborations')} className="hover:text-white transition-colors">
                  Partenaires & Collaborations
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Lieu d'activité */}
          <div className="space-y-3">
            <span className="text-[#FF4F93] font-bold uppercase tracking-wider block">
              Lieu d'Activité
            </span>
            <div className="space-y-1.5 text-neutral-400">
              <div className="font-bold text-white font-sans text-xs">
                Centre socioculturel Point E
              </div>
              <div className="text-[11px]">Point E, Dakar, Sénégal</div>
              <div className="text-[10px] text-neutral-500 pt-1">
                Accueil des ateliers d'origami, calligraphie et rencontres.
              </div>
            </div>
          </div>

          {/* Col 4: Contacts Officiels */}
          <div className="space-y-3">
            <span className="text-[#FF4F93] font-bold uppercase tracking-wider block">
              Réseaux & Contact
            </span>
            <ul className="space-y-2.5 text-neutral-400">
              <li>
                <a
                  href={`tel:${settings.officialPhone.replace(/\s+/g, '')}`}
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Phone className="w-3.5 h-3.5 text-[#FF4F93]" />
                  <span>{settings.officialPhone}</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/thenihongoclub"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors flex items-center gap-2"
                >
                  <Instagram className="w-3.5 h-3.5 text-[#FF4F93]" />
                  <span>{settings.instagramHandle}</span>
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Facebook className="w-3.5 h-3.5 text-[#FF4F93] shrink-0" />
                <span className="truncate">Senegal ISM Japan Club</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal, Top Trigger, and Anti-Slop Signature */}
        <div className="pt-8 border-t border-neutral-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-neutral-400">
          <div>
            © 2013 — 2026 SENEGAL ISM JAPAN CLUB (にほんごくらぶ セネガル). Tous droits réservés.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('/admin')}
              className="text-neutral-400 hover:text-white transition-colors underline"
            >
              Administration
            </button>
            <span>·</span>
            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 text-neutral-400 hover:text-white transition-colors"
            >
              <span>Haut de page</span>
              <ArrowUp className="w-3 h-3 text-[#FF4F93]" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
