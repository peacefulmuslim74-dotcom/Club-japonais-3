import React, { useState, useEffect } from 'react';
import {
  ClubEvent,
  CategoryCover,
  GalleryPhoto,
  LocationItem,
  CollaborationItem,
  ArticleItem,
  ContactMessage,
  EventRegistration,
  ClubSettings,
} from './types/club';
import {
  initialClubSettings,
  initialCategoryCovers,
  initialEvents,
  initialGallery,
  initialLocations,
  initialCollaborations,
  initialArticles,
} from './data/clubData';
import { Navigation } from './components/Navigation';
import { HeroSection } from './components/HeroSection';
import { PointESection } from './components/PointESection';
import { EventsSection } from './components/EventsSection';
import { EventDetailPage } from './components/EventDetailPage';
import { GallerySection } from './components/GallerySection';
import { ActivitiesPage } from './components/ActivitiesPage';
import { CollaborationsPage } from './components/CollaborationsPage';
import { ContactPage } from './components/ContactPage';
import { ArticlesPage } from './components/ArticlesPage';
import { AboutClubPage } from './components/AboutClubPage';
import { AdminPortal } from './components/AdminPortal';
import { SearchModal } from './components/SearchModal';
import { Footer } from './components/Footer';
import { CategoryGraphicCard } from './components/CategoryGraphicCard';
import { FontOption } from './components/FontSwitcher';
import { ArrowRight, Sparkles, Building2, Calendar, Phone } from 'lucide-react';

export default function App() {
  // Font Direction State
  const [currentFont, setCurrentFont] = useState<FontOption>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_font');
      return (saved as FontOption) || 'syne';
    } catch {
      return 'syne';
    }
  });

  // LocalStorage-backed state
  const [settings, setSettings] = useState<ClubSettings>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_settings');
      return saved ? JSON.parse(saved) : initialClubSettings;
    } catch {
      return initialClubSettings;
    }
  });

  const [events, setEvents] = useState<ClubEvent[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_events');
      return saved ? JSON.parse(saved) : initialEvents;
    } catch {
      return initialEvents;
    }
  });

  const [covers, setCovers] = useState<CategoryCover[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_covers');
      return saved ? JSON.parse(saved) : initialCategoryCovers;
    } catch {
      return initialCategoryCovers;
    }
  });

  const [photos, setPhotos] = useState<GalleryPhoto[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_photos');
      return saved ? JSON.parse(saved) : initialGallery;
    } catch {
      return initialGallery;
    }
  });

  const [locations, setLocations] = useState<LocationItem[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_locations');
      return saved ? JSON.parse(saved) : initialLocations;
    } catch {
      return initialLocations;
    }
  });

  const [collaborations, setCollaborations] = useState<CollaborationItem[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_collaborations');
      return saved ? JSON.parse(saved) : initialCollaborations;
    } catch {
      return initialCollaborations;
    }
  });

  const [articles, setArticles] = useState<ArticleItem[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_articles');
      return saved ? JSON.parse(saved) : initialArticles;
    } catch {
      return initialArticles;
    }
  });

  const [messages, setMessages] = useState<ContactMessage[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_messages');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [registrations, setRegistrations] = useState<EventRegistration[]>(() => {
    try {
      const saved = localStorage.getItem('senegal_club_registrations');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Navigation State
  const [currentPath, setCurrentPath] = useState<string>('/');
  const [currentLang, setCurrentLang] = useState<'fr' | 'ja' | 'en'>('fr');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedEventSlug, setSelectedEventSlug] = useState<string | null>(null);
  const [selectedArticleSlug, setSelectedArticleSlug] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem('senegal_club_settings', JSON.stringify(settings));
    } catch (e) {
      console.warn(e);
    }
  }, [settings]);

  useEffect(() => {
    try {
      localStorage.setItem('senegal_club_events', JSON.stringify(events));
    } catch (e) {
      console.warn(e);
    }
  }, [events]);

  useEffect(() => {
    try {
      localStorage.setItem('senegal_club_covers', JSON.stringify(covers));
    } catch (e) {
      console.warn(e);
    }
  }, [covers]);

  useEffect(() => {
    try {
      localStorage.setItem('senegal_club_photos', JSON.stringify(photos));
    } catch (e) {
      console.warn(e);
    }
  }, [photos]);

  useEffect(() => {
    try {
      localStorage.setItem('senegal_club_messages', JSON.stringify(messages));
    } catch (e) {
      console.warn(e);
    }
  }, [messages]);

  useEffect(() => {
    try {
      localStorage.setItem('senegal_club_registrations', JSON.stringify(registrations));
    } catch (e) {
      console.warn(e);
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem('senegal_club_font', currentFont);
      document.body.setAttribute('data-font', currentFont);
    } catch (e) {
      console.warn(e);
    }
  }, [currentFont]);

  // Routing navigation helper
  const navigate = (path: string) => {
    if (path.startsWith('/evenements/')) {
      const slug = path.replace('/evenements/', '');
      setSelectedEventSlug(slug);
      setCurrentPath('/evenements/detail');
    } else if (path.startsWith('/actualites/')) {
      const slug = path.replace('/actualites/', '');
      setSelectedArticleSlug(slug);
      setCurrentPath('/actualites/detail');
    } else {
      setSelectedEventSlug(null);
      setSelectedArticleSlug(null);
      setCurrentPath(path);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Event & Message Handlers
  const handleRegisterAttendee = (
    data: Omit<EventRegistration, 'id' | 'date' | 'status'>
  ) => {
    const newReg: EventRegistration = {
      id: `reg-${Date.now()}`,
      ...data,
      date: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'confirmed',
    };
    setRegistrations((prev) => [newReg, ...prev]);

    // increment registeredCount for event
    setEvents((prev) =>
      prev.map((e) =>
        e.id === data.eventId
          ? { ...e, registeredCount: (e.registeredCount || 0) + data.attendeesCount }
          : e
      )
    );
  };

  const handleSendMessage = (msg: Omit<ContactMessage, 'id' | 'date' | 'status'>) => {
    const newMsg: ContactMessage = {
      id: `msg-${Date.now()}`,
      ...msg,
      date: new Date().toLocaleDateString('fr-FR', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      status: 'unread',
    };
    setMessages((prev) => [newMsg, ...prev]);
  };

  // Next upcoming event for Hero preview
  const nextEvent = events.find((e) => e.status !== 'past') || events[0];

  // Specific event for detail page
  const activeEvent = selectedEventSlug
    ? events.find((e) => e.slug === selectedEventSlug) || events[0]
    : null;

  // Render Admin Portal if path starts with /admin
  if (currentPath.startsWith('/admin')) {
    return (
      <AdminPortal
        events={events}
        covers={covers}
        photos={photos}
        locations={locations}
        collaborations={collaborations}
        articles={articles}
        messages={messages}
        registrations={registrations}
        settings={settings}
        onUpdateEvent={(updated) =>
          setEvents((prev) => prev.map((e) => (e.id === updated.id ? updated : e)))
        }
        onAddEvent={(newEvent) => setEvents((prev) => [newEvent, ...prev])}
        onDeleteEvent={(id) => setEvents((prev) => prev.filter((e) => e.id !== id))}
        onUpdateCover={(updated) =>
          setCovers((prev) => prev.map((c) => (c.id === updated.id ? updated : c)))
        }
        onAddPhoto={(photo) => setPhotos((prev) => [photo, ...prev])}
        onDeletePhoto={(id) => setPhotos((prev) => prev.filter((p) => p.id !== id))}
        onUpdateSettings={setSettings}
        onExitAdmin={() => navigate('/')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-950 flex flex-col font-sans selection:bg-[#FF4F93] selection:text-white">
      {/* Universal Navigation with Center Logo Architecture */}
      <Navigation
        currentPath={currentPath}
        navigate={navigate}
        settings={settings}
        onOpenSearch={() => setIsSearchOpen(true)}
        currentLang={currentLang}
        setLang={setCurrentLang}
      />

      {/* Main Content Router */}
      <main className="flex-1">
        {/* VIEW: HOME (ACCUEIL) */}
        {currentPath === '/' && (
          <>
            {/* 1. HERO with centered monumental logo & Horrendo typography */}
            <HeroSection
              settings={settings}
              nextEvent={nextEvent}
              onExploreEvents={() => navigate('/evenements')}
              onExploreActivities={() => navigate('/activites')}
            />

            {/* 2. INTRODUCTION SECTION */}
            <section className="py-20 sm:py-28 bg-white border-b border-neutral-200">
              <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                  <div className="md:col-span-4 space-y-2">
                    <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF4F93]">
                      HISTOIRE & FONDATION
                    </span>
                    <h2 className="font-horrendo text-3xl sm:text-4xl font-bold tracking-tight text-neutral-950 leading-tight">
                      L'ESPRIT DU CLUB
                    </h2>
                    <div className="font-jp text-xs text-neutral-400">
                      にほんごくらぶ の 精神
                    </div>
                  </div>

                  <div className="md:col-span-8 space-y-6 text-sm sm:text-base text-neutral-700 leading-relaxed font-light">
                    <p>
                      Créé en 2013 à Dakar au sein de l'Institut Supérieur de Management (ISM), le{' '}
                      <strong className="text-neutral-950 font-semibold">
                        SENEGAL ISM JAPAN CLUB (The Nihongo Club)
                      </strong>{' '}
                      est né d'une volonté claire : faire vivre la culture japonaise dans sa profondeur
                      artistique et humaine, loin de toute caricature commerciale.
                    </p>
                    <p>
                      Nos rendez-vous réguliers — hébergés notamment au Centre socioculturel Point E —
                      articulent apprentissage de la calligraphie <span className="font-jp text-neutral-950 font-medium">書道</span>,
                      maîtrise du pliage origami, analyse d'œuvres cinématographiques et perfectionnement
                      de la langue japonaise.
                    </p>
                    <div className="pt-2">
                      <button
                        onClick={() => navigate('/le-club')}
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#FF4F93] hover:text-neutral-950 transition-colors"
                      >
                        <span>En savoir plus sur notre histoire</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 3. UNIVERS DU CLUB (Les 5 domaines en composition asymétrique) */}
            <section className="py-20 sm:py-28 bg-neutral-950 text-white border-b border-neutral-900">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-12 border-b border-neutral-850">
                  <div>
                    <span className="text-xs font-mono uppercase tracking-widest text-[#FF4F93] block mb-2">
                      UNIVERS DU CLUB · 五つの分野
                    </span>
                    <h2 className="font-horrendo text-3xl sm:text-5xl font-bold tracking-tight text-white">
                      LES 5 DISCIPLINES OFFICIELLES
                    </h2>
                    <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light max-w-xl">
                      Une direction artistique dédiée à chaque domaine d'expression culturelle.
                    </p>
                  </div>

                  <button
                    onClick={() => navigate('/activites')}
                    className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-white rounded-xl transition-colors shrink-0"
                  >
                    Voir le descriptif complet des ateliers →
                  </button>
                </div>

                {/* 5 Graphic Cards Grid */}
                <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {covers.map((c) => (
                    <CategoryGraphicCard
                      key={c.id}
                      cover={c}
                      onClick={() => navigate('/activites')}
                    />
                  ))}
                </div>
              </div>
            </section>

            {/* 4. CALENDRIER & ÉVÉNEMENTS (Sélection HomePage) */}
            <EventsSection
              events={events}
              variant="homepage"
              onSelectEvent={(e) => navigate(`/evenements/${e.slug}`)}
            />

            {/* 5. CENTRE SOCIOCULTUREL POINT E (Lieu d'activité) */}
            <PointESection
              location={locations.find((l) => l.isPrimaryActivityVenue)}
              onExploreEventsAtPointE={() => navigate('/evenements')}
            />

            {/* 6. GALERIE OFFICIELLE (Real photos or strict empty state) */}
            <GallerySection
              photos={photos}
              onUploadRequest={() => navigate('/admin')}
            />

            {/* 7. COLLABORATIONS CONFIRMÉES */}
            <section className="py-16 bg-white border-b border-neutral-200">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-2xl mx-auto pb-10">
                  <span className="text-[11px] font-mono uppercase tracking-widest text-[#FF4F93] block mb-1">
                    ANCRAGE INSTITUTIONNEL
                  </span>
                  <h3 className="font-horrendo text-2xl sm:text-3xl font-bold text-neutral-950">
                    PARTENAIRES DU CLUB
                  </h3>
                  <p className="text-xs text-neutral-500 mt-2 font-light">
                    Partenaires d'accueil et cadres académiques officiellement confirmés depuis 2013.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                  {collaborations.map((collab) => (
                    <div
                      key={collab.id}
                      className="p-6 bg-neutral-50 border border-neutral-200 rounded-2xl flex flex-col justify-between"
                    >
                      <div className="space-y-2">
                        <div className="text-[10px] font-mono text-[#FF4F93] uppercase">
                          {collab.type} · {collab.confirmedDate}
                        </div>
                        <h4 className="font-horrendo text-xl font-bold text-neutral-950">
                          {collab.name}
                        </h4>
                        <p className="text-xs text-neutral-600 font-light leading-relaxed">
                          {collab.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}

        {/* VIEW: LE CLUB (ABOUT) */}
        {currentPath === '/le-club' && (
          <AboutClubPage
            settings={settings}
            onExploreEvents={() => navigate('/evenements')}
            onExploreActivities={() => navigate('/activites')}
          />
        )}

        {/* VIEW: ACTIVITÉS */}
        {currentPath === '/activites' && (
          <ActivitiesPage
            covers={covers}
            onSelectCategoryEvents={() => navigate('/evenements')}
          />
        )}

        {/* VIEW: ÉVÉNEMENTS ARCHIVE / PROGRAMMATION */}
        {currentPath === '/evenements' && (
          <EventsSection
            events={events}
            variant="full"
            onSelectEvent={(e) => navigate(`/evenements/${e.slug}`)}
          />
        )}

        {/* VIEW: EVENT DETAIL PAGE */}
        {currentPath === '/evenements/detail' && activeEvent && (
          <EventDetailPage
            event={activeEvent}
            onBack={() => navigate('/evenements')}
            onRegisterAttendee={handleRegisterAttendee}
          />
        )}

        {/* VIEW: GALERIE */}
        {currentPath === '/galerie' && (
          <GallerySection
            photos={photos}
            onUploadRequest={() => navigate('/admin')}
          />
        )}

        {/* VIEW: ACTUALITÉS */}
        {currentPath === '/actualites' && (
          <ArticlesPage
            articles={articles}
            onSelectArticle={(slug) => navigate(`/actualites/${slug}`)}
            onBackToArticles={() => navigate('/actualites')}
          />
        )}

        {/* VIEW: ARTICLE DETAIL */}
        {currentPath === '/actualites/detail' && selectedArticleSlug && (
          <ArticlesPage
            articles={articles}
            selectedArticleSlug={selectedArticleSlug}
            onSelectArticle={(slug) => navigate(`/actualites/${slug}`)}
            onBackToArticles={() => navigate('/actualites')}
          />
        )}

        {/* VIEW: COLLABORATIONS */}
        {currentPath === '/collaborations' && (
          <CollaborationsPage collaborations={collaborations} />
        )}

        {/* VIEW: CONTACT */}
        {currentPath === '/contact' && (
          <ContactPage
            settings={settings}
            onSubmitMessage={handleSendMessage}
          />
        )}
      </main>

      {/* Global Editorial Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        events={events}
        covers={covers}
        articles={articles}
        photos={photos}
        collaborations={collaborations}
        onNavigate={navigate}
      />

      {/* Universal Editorial Footer */}
      <Footer settings={settings} onNavigate={navigate} />
    </div>
  );
}
