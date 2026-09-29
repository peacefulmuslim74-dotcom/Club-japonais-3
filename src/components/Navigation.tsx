import React, { useState } from 'react';
import { Search, Menu, X, Globe, Shield, Phone, ChevronRight } from 'lucide-react';
import { ClubLogo } from './ClubLogo';
import { ClubSettings } from '../types/club';

interface NavigationProps {
  currentPath: string;
  navigate: (path: string) => void;
  settings: ClubSettings;
  onOpenSearch: () => void;
  currentLang: 'fr' | 'ja' | 'en';
  setLang: (lang: 'fr' | 'ja' | 'en') => void;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentPath,
  navigate,
  settings,
  onOpenSearch,
  currentLang,
  setLang,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const leftNavItems = [
    { label: 'Accueil', path: '/', japanese: 'トップ' },
    { label: 'Le Club', path: '/le-club', japanese: '倶楽部' },
    { label: 'Activités', path: '/activites', japanese: '活動' },
  ];

  const rightNavItems = [
    { label: 'Événements', path: '/evenements', japanese: '行事' },
    { label: 'Galerie', path: '/galerie', japanese: '写真' },
    { label: 'Contact', path: '/contact', japanese: '連絡' },
  ];

  const allNavItems = [...leftNavItems, ...rightNavItems, { label: 'Actualités', path: '/actualites', japanese: '通信' }, { label: 'Collaborations', path: '/collaborations', japanese: '連携' }];

  const handleNavClick = (path: string) => {
    navigate(path);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Top Banner Notice */}
      {settings.bannerNoticeActive && settings.bannerNotice && (
        <aside
          aria-label="Annonce officielle du club"
          className="bg-neutral-950 text-white text-[10px] sm:text-[11px] font-mono tracking-widest py-2 px-4 text-center border-b border-neutral-900 flex items-center justify-center gap-2"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#FF4F93] animate-pulse shrink-0" />
          <span className="truncate max-w-4xl">{settings.bannerNotice}</span>
          <span className="text-neutral-500 hidden md:inline">· ESTD 2013</span>
        </aside>
      )}

      {/* Main Navigation Bar */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200/80 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Desktop Layout with LOGO AT THE CENTER */}
          <div className="hidden lg:grid grid-cols-12 items-center h-20">
            {/* Left Nav links (Cols 1-5) */}
            <nav className="col-span-5 flex items-center justify-end gap-8 pr-6">
              {leftNavItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className="group relative py-2 text-left"
                  >
                    <span
                      className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-200 block ${
                        isActive
                          ? 'text-[#FF4F93]'
                          : 'text-neutral-900 hover:text-[#FF4F93]'
                      }`}
                    >
                      {item.label}
                    </span>
                    <span className="text-[9px] text-neutral-400 font-jp block opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3 left-0">
                      {item.japanese}
                    </span>
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF4F93]" />
                    )}
                  </button>
                );
              })}
            </nav>

            {/* Centered Logo (Cols 6-7) */}
            <div className="col-span-2 flex flex-col items-center justify-center">
              <button
                onClick={() => handleNavClick('/')}
                className="group flex flex-col items-center gap-1 transition-transform duration-300 hover:scale-105 focus:outline-none"
                aria-label="Retour à l'accueil"
              >
                <ClubLogo size="sm" customImage={settings.customLogoUrl} />
                <div className="text-center mt-1">
                  <span className="font-horrendo text-[11px] font-bold tracking-tight text-neutral-950 block leading-tight">
                    SENEGAL ISM JAPAN CLUB
                  </span>
                  <span className="text-[9px] font-jp text-neutral-500 tracking-wider block">
                    にほんごくらぶ セネガル
                  </span>
                </div>
              </button>
            </div>

            {/* Right Nav links & Tools (Cols 8-12) */}
            <div className="col-span-5 flex items-center justify-between pl-6">
              <nav className="flex items-center gap-8">
                {rightNavItems.map((item) => {
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={item.path}
                      onClick={() => handleNavClick(item.path)}
                      className="group relative py-2 text-left"
                    >
                      <span
                        className={`text-xs uppercase tracking-wider font-semibold transition-colors duration-200 block ${
                          isActive
                            ? 'text-[#FF4F93]'
                            : 'text-neutral-900 hover:text-[#FF4F93]'
                        }`}
                      >
                        {item.label}
                      </span>
                      <span className="text-[9px] text-neutral-400 font-jp block opacity-0 group-hover:opacity-100 transition-opacity absolute -bottom-3 left-0">
                        {item.japanese}
                      </span>
                      {isActive && (
                        <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#FF4F93]" />
                      )}
                    </button>
                  );
                })}
              </nav>

              {/* Utility actions (Search, Lang, Admin) */}
              <div className="flex items-center gap-4 pl-4 border-l border-neutral-200">
                <button
                  onClick={onOpenSearch}
                  className="p-2 text-neutral-600 hover:text-[#FF4F93] transition-colors rounded-full hover:bg-neutral-100"
                  title="Rechercher (événements, activités, articles)"
                  aria-label="Rechercher"
                >
                  <Search className="w-4 h-4" />
                </button>

                {/* Multilingual Selector */}
                <div className="flex items-center text-[10px] font-mono border border-neutral-200 rounded-md overflow-hidden bg-neutral-50">
                  <button
                    onClick={() => setLang('fr')}
                    className={`px-1.5 py-1 ${
                      currentLang === 'fr'
                        ? 'bg-neutral-950 text-white font-bold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    FR
                  </button>
                  <button
                    onClick={() => setLang('ja')}
                    className={`px-1.5 py-1 ${
                      currentLang === 'ja'
                        ? 'bg-neutral-950 text-white font-bold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    日本語
                  </button>
                  <button
                    onClick={() => setLang('en')}
                    className={`px-1.5 py-1 ${
                      currentLang === 'en'
                        ? 'bg-neutral-950 text-white font-bold'
                        : 'text-neutral-500 hover:text-neutral-900'
                    }`}
                  >
                    EN
                  </button>
                </div>

                {/* Admin button */}
                <button
                  onClick={() => handleNavClick('/admin')}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${
                    currentPath.startsWith('/admin')
                      ? 'bg-neutral-950 text-white border-neutral-950'
                      : 'bg-neutral-50 text-neutral-800 border-neutral-300 hover:bg-neutral-100'
                  }`}
                  title="Administration du Club"
                >
                  <Shield className="w-3.5 h-3.5 text-[#FF4F93]" />
                  <span>Admin</span>
                </button>
              </div>
            </div>
          </div>

          {/* Mobile & Tablet Header */}
          <div className="lg:hidden flex items-center justify-between h-18">
            <button
              onClick={() => handleNavClick('/')}
              className="flex items-center gap-3 text-left focus:outline-none"
            >
              <ClubLogo size="sm" customImage={settings.customLogoUrl} />
              <div>
                <span className="font-horrendo text-sm font-bold tracking-tight text-neutral-950 block leading-tight">
                  SENEGAL ISM JAPAN CLUB
                </span>
                <span className="text-[10px] font-jp text-neutral-500 tracking-wider block">
                  にほんごくらぶ セネガル · ESTD 2013
                </span>
              </div>
            </button>

            <div className="flex items-center gap-2">
              <button
                onClick={onOpenSearch}
                className="p-2 text-neutral-700 hover:text-[#FF4F93] rounded-lg"
                aria-label="Recherche"
              >
                <Search className="w-5 h-5" />
              </button>

              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-neutral-900 hover:text-[#FF4F93] rounded-lg focus:outline-none"
                aria-label="Menu de navigation"
              >
                {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-50 bg-white/98 backdrop-blur-xl flex flex-col justify-between pt-20 pb-8 px-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
              <div className="flex items-center gap-3">
                <ClubLogo size="sm" customImage={settings.customLogoUrl} />
                <div>
                  <div className="font-horrendo font-bold text-xs tracking-wider">
                    SENEGAL ISM JAPAN CLUB
                  </div>
                  <div className="font-jp text-[10px] text-neutral-500">にほんごくらぶ</div>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="p-2 text-neutral-600 hover:text-neutral-950"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <nav className="space-y-2">
              {allNavItems.map((item) => {
                const isActive = currentPath === item.path;
                return (
                  <button
                    key={item.path}
                    onClick={() => handleNavClick(item.path)}
                    className={`w-full flex items-center justify-between py-3 px-3 rounded-xl text-left transition-colors ${
                      isActive ? 'bg-[#FF4F93]/10 text-[#FF4F93]' : 'text-neutral-900 hover:bg-neutral-100'
                    }`}
                  >
                    <div>
                      <span className="font-horrendo text-lg font-bold tracking-tight block">
                        {item.label}
                      </span>
                      <span className="font-jp text-xs text-neutral-500">{item.japanese}</span>
                    </div>
                    <ChevronRight className="w-4 h-4 text-neutral-400" />
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="pt-6 border-t border-neutral-200 space-y-4">
            <div className="flex items-center justify-between text-xs text-neutral-600 font-mono">
              <span className="flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-[#FF4F93]" />
                <span>{settings.officialPhone}</span>
              </span>
              <span>{settings.instagramHandle}</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => handleNavClick('/admin')}
                className="w-full py-2.5 px-4 bg-neutral-950 text-white rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <Shield className="w-3.5 h-3.5 text-[#FF4F93]" />
                <span>Administration du Club</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
