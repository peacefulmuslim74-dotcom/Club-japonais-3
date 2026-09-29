import React, { useState } from 'react';
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
  ActivityCategory,
} from '../types/club';
import {
  LayoutDashboard,
  Calendar,
  Compass,
  Image,
  Layers,
  Handshake,
  MapPin,
  BookOpen,
  MessageSquare,
  Users,
  Settings,
  Plus,
  Trash2,
  Edit2,
  CheckCircle,
  Eye,
  Download,
  Upload,
  ArrowLeft,
  Shield,
  HelpCircle,
} from 'lucide-react';
import { ClubLogo } from './ClubLogo';

interface AdminPortalProps {
  events: ClubEvent[];
  covers: CategoryCover[];
  photos: GalleryPhoto[];
  locations: LocationItem[];
  collaborations: CollaborationItem[];
  articles: ArticleItem[];
  messages: ContactMessage[];
  registrations: EventRegistration[];
  settings: ClubSettings;
  onUpdateEvent: (event: ClubEvent) => void;
  onAddEvent: (event: ClubEvent) => void;
  onDeleteEvent: (id: string) => void;
  onUpdateCover: (cover: CategoryCover) => void;
  onAddPhoto: (photo: GalleryPhoto) => void;
  onDeletePhoto: (id: string) => void;
  onUpdateSettings: (settings: ClubSettings) => void;
  onExitAdmin: () => void;
}

export const AdminPortal: React.FC<AdminPortalProps> = ({
  events,
  covers,
  photos,
  locations,
  collaborations,
  articles,
  messages,
  registrations,
  settings,
  onUpdateEvent,
  onAddEvent,
  onDeleteEvent,
  onUpdateCover,
  onAddPhoto,
  onDeletePhoto,
  onUpdateSettings,
  onExitAdmin,
}) => {
  const [activeTab, setActiveTab] = useState<
    'dashboard' | 'events' | 'covers' | 'photos' | 'registrations' | 'messages' | 'articles' | 'locations' | 'collaborations' | 'settings'
  >('dashboard');

  // New Event Form State
  const [showEventModal, setShowEventModal] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventCategory, setNewEventCategory] = useState<ActivityCategory>('Calligraphie');
  const [newEventDate, setNewEventDate] = useState('Samedi 14 Novembre 2026');
  const [newEventRawDate, setNewEventRawDate] = useState('2026-11-14');
  const [newEventTime, setNewEventTime] = useState('15h00 — 18h00');
  const [newEventLocation, setNewEventLocation] = useState('Centre socioculturel Point E');
  const [newEventPrice, setNewEventPrice] = useState('Gratuit');
  const [newEventDesc, setNewEventDesc] = useState('Session guidée et découverte...');
  const [newEventRegistration, setNewEventRegistration] = useState(true);
  const [newEventCapacity, setNewEventCapacity] = useState('25');

  // New Photo Upload Form State
  const [showPhotoModal, setShowPhotoModal] = useState(false);
  const [newPhotoUrl, setNewPhotoUrl] = useState('');
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoAlt, setNewPhotoAlt] = useState('');
  const [newPhotoDesc, setNewPhotoDesc] = useState('');
  const [newPhotoCategory, setNewPhotoCategory] = useState<ActivityCategory>('Calligraphie');

  // Category Cover Edit State
  const [editingCover, setEditingCover] = useState<CategoryCover | null>(null);

  const handleCreateEvent = (e: React.FormEvent) => {
    e.preventDefault();
    const created: ClubEvent = {
      id: `evt-${Date.now()}`,
      slug: newEventTitle
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)+/g, ''),
      title: newEventTitle,
      category: newEventCategory,
      date: newEventDate,
      rawDate: newEventRawDate,
      time: newEventTime,
      locationName: newEventLocation,
      locationDetails: 'Point E, Dakar',
      isPointE: newEventLocation.includes('Point E'),
      price: newEventPrice,
      description: newEventDesc,
      status: 'published',
      registrationEnabled: newEventRegistration,
      registrationCapacity: parseInt(newEventCapacity, 10) || 20,
      registeredCount: 0,
      isFeatured: false,
    };
    onAddEvent(created);
    setShowEventModal(false);
    setNewEventTitle('');
  };

  const handleCreatePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPhotoUrl || !newPhotoTitle) return;

    const created: GalleryPhoto = {
      id: `photo-${Date.now()}`,
      url: newPhotoUrl,
      title: newPhotoTitle,
      alt: newPhotoAlt || newPhotoTitle,
      description: newPhotoDesc,
      category: newPhotoCategory,
      date: new Date().toLocaleDateString('fr-FR', { month: 'long', year: 'numeric' }),
      published: true,
    };

    onAddPhoto(created);
    setShowPhotoModal(false);
    setNewPhotoUrl('');
    setNewPhotoTitle('');
  };

  const exportRegistrationsCsv = () => {
    let csv = 'ID,Événement,Nom,Email,Téléphone,Participants,Date,Statut\n';
    registrations.forEach((r) => {
      csv += `"${r.id}","${r.eventTitle}","${r.fullName}","${r.email}","${r.phone}",${r.attendeesCount},"${r.date}","${r.status}"\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `inscriptions-club-${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-white flex flex-col font-sans">
      {/* Admin Top Header */}
      <header className="h-16 border-b border-neutral-850 bg-neutral-900/90 px-4 sm:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ClubLogo size="xs" customImage={settings.customLogoUrl} />
          <div>
            <div className="font-horrendo font-bold text-sm tracking-tight">
              CONSOLE D'ADMINISTRATION
            </div>
            <div className="font-mono text-[10px] text-neutral-400">
              SENEGAL ISM JAPAN CLUB · SÉCURISÉ
            </div>
          </div>
        </div>

        <button
          onClick={onExitAdmin}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium rounded-lg text-white transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Retour au Site Public</span>
        </button>
      </header>

      {/* Admin Body with Sidebar */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* Navigation Sidebar */}
        <aside className="w-full md:w-64 bg-neutral-900 border-r border-neutral-850 p-4 space-y-1 text-xs shrink-0">
          {[
            { id: 'dashboard', label: 'Vue d\'Ensemble', icon: LayoutDashboard },
            { id: 'events', label: 'Événements & Ateliers', icon: Calendar, badge: events.length },
            { id: 'covers', label: 'Couvertures Catégories', icon: Layers, badge: covers.length },
            { id: 'photos', label: 'Galerie Photos', icon: Image, badge: photos.length },
            { id: 'registrations', label: 'Inscriptions Ateliers', icon: Users, badge: registrations.length },
            { id: 'messages', label: 'Messages Reçus', icon: MessageSquare, badge: messages.length },
            { id: 'articles', label: 'Actualités & Communiqués', icon: BookOpen, badge: articles.length },
            { id: 'locations', label: 'Lieux (Point E)', icon: MapPin },
            { id: 'collaborations', label: 'Collaborations', icon: Handshake },
            { id: 'settings', label: 'Paramètres du Club', icon: Settings },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl font-medium transition-colors ${
                  isActive
                    ? 'bg-[#FF4F93] text-white font-bold'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {tab.badge !== undefined && (
                  <span
                    className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                      isActive ? 'bg-black/20 text-white' : 'bg-neutral-800 text-neutral-400'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Area */}
        <main className="flex-1 p-6 sm:p-10 overflow-y-auto">
          {/* TAB 1: DASHBOARD */}
          {activeTab === 'dashboard' && (
            <div className="space-y-8">
              <div>
                <h1 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  TABLEAU DE BORD OFFICIEL
                </h1>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Données réelles sans simulation · Synchronisation club
                </p>
              </div>

              {/* Exact real stats */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
                <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-2xl">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Événements</span>
                  <div className="font-horrendo text-3xl font-bold text-white mt-1">{events.length}</div>
                  <span className="text-[10px] text-neutral-500 font-mono">Au calendrier</span>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-855 rounded-2xl">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Inscriptions</span>
                  <div className="font-horrendo text-3xl font-bold text-[#FF4F93] mt-1">{registrations.length}</div>
                  <span className="text-[10px] text-neutral-500 font-mono">Participants</span>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-2xl">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Couvertures</span>
                  <div className="font-horrendo text-3xl font-bold text-white mt-1">{covers.length}</div>
                  <span className="text-[10px] text-neutral-500 font-mono">Disciplines</span>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-2xl">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Photos Réelles</span>
                  <div className="font-horrendo text-3xl font-bold text-white mt-1">{photos.length}</div>
                  <span className="text-[10px] text-neutral-500 font-mono">Galerie</span>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-2xl">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Messages</span>
                  <div className="font-horrendo text-3xl font-bold text-white mt-1">{messages.length}</div>
                  <span className="text-[10px] text-neutral-500 font-mono">Formulaire</span>
                </div>

                <div className="p-4 bg-neutral-900 border border-neutral-850 rounded-2xl">
                  <span className="text-[10px] font-mono text-neutral-400 uppercase block">Articles</span>
                  <div className="font-horrendo text-3xl font-bold text-white mt-1">{articles.length}</div>
                  <span className="text-[10px] text-neutral-500 font-mono">Publiés</span>
                </div>
              </div>

              {/* Quick links & summary */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-horrendo text-lg font-bold text-white">Derniers Événements</h3>
                    <button
                      onClick={() => setActiveTab('events')}
                      className="text-xs text-[#FF4F93] hover:underline font-mono"
                    >
                      Gérer tous
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    {events.slice(0, 3).map((e) => (
                      <div key={e.id} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 flex justify-between items-center">
                        <div>
                          <div className="font-bold text-white">{e.title}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">{e.date} · {e.locationName}</div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                          {e.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-4">
                  <div className="flex justify-between items-center">
                    <h3 className="font-horrendo text-lg font-bold text-white">Derniers Messages Reçus</h3>
                    <button
                      onClick={() => setActiveTab('messages')}
                      className="text-xs text-[#FF4F93] hover:underline font-mono"
                    >
                      Voir boîte de réception
                    </button>
                  </div>
                  <div className="space-y-2 text-xs">
                    {messages.length === 0 ? (
                      <div className="text-neutral-500 font-mono py-4 text-center">Aucun message pour le moment.</div>
                    ) : (
                      messages.slice(0, 3).map((m) => (
                        <div key={m.id} className="p-3 bg-neutral-950 rounded-xl border border-neutral-800 space-y-1">
                          <div className="flex justify-between font-bold text-white">
                            <span>{m.fullName}</span>
                            <span className="text-[10px] font-mono text-neutral-400">{m.date}</span>
                          </div>
                          <p className="text-[11px] text-neutral-300 line-clamp-1">{m.message}</p>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: EVENTS MANAGER */}
          {activeTab === 'events' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    GESTION DES ÉVÉNEMENTS & ATELIERS
                  </h1>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Création, modification, archivage et paramétrage des inscriptions
                  </p>
                </div>

                <button
                  onClick={() => setShowEventModal(true)}
                  className="px-4 py-2 bg-[#FF4F93] hover:bg-[#D91D69] text-white text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors shrink-0"
                >
                  <Plus className="w-4 h-4" />
                  <span>Ajouter un Événement</span>
                </button>
              </div>

              {/* Events table */}
              <div className="bg-neutral-900 border border-neutral-850 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-950 text-neutral-400 font-mono uppercase text-[10px] border-b border-neutral-800">
                      <tr>
                        <th className="py-3.5 px-4">Titre & Discipline</th>
                        <th className="py-3.5 px-4">Date & Heure</th>
                        <th className="py-3.5 px-4">Lieu</th>
                        <th className="py-3.5 px-4">Inscriptions</th>
                        <th className="py-3.5 px-4">Statut</th>
                        <th className="py-3.5 px-4 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-neutral-300">
                      {events.map((e) => (
                        <tr key={e.id} className="hover:bg-neutral-850/50">
                          <td className="py-3 px-4">
                            <div className="font-bold text-white">{e.title}</div>
                            <div className="text-[11px] font-mono text-[#FF4F93]">{e.category}</div>
                          </td>
                          <td className="py-3 px-4 font-mono">
                            <div>{e.date}</div>
                            <div className="text-[11px] text-neutral-500">{e.time}</div>
                          </td>
                          <td className="py-3 px-4 font-mono">{e.locationName}</td>
                          <td className="py-3 px-4 font-mono">
                            {e.registrationEnabled ? (
                              <span className="text-emerald-400">
                                Ouvert ({e.registeredCount} / {e.registrationCapacity || 0})
                              </span>
                            ) : (
                              <span className="text-neutral-500">Désactivé</span>
                            )}
                          </td>
                          <td className="py-3 px-4">
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">
                              {e.status}
                            </span>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                onClick={() =>
                                  onUpdateEvent({
                                    ...e,
                                    status: e.status === 'past' ? 'published' : 'past',
                                  })
                                }
                                className="px-2 py-1 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded font-mono text-[10px]"
                                title="Basculer vers passé ou à venir"
                              >
                                {e.status === 'past' ? 'Rendre à venir' : 'Archiver passé'}
                              </button>
                              <button
                                onClick={() => onDeleteEvent(e.id)}
                                className="p-1 hover:bg-red-950/50 rounded text-neutral-500 hover:text-red-400"
                                title="Supprimer"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: CATEGORY COVERS (SEPARATE ARCHITECTURE) */}
          {activeTab === 'covers' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  COUVERTURES GRAPHIQUES DES CATÉGORIES
                </h1>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Architecture category_cover strictly séparée de la galerie photo
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {covers.map((c) => (
                  <div key={c.id} className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-4">
                    <div className="flex justify-between items-center text-xs font-mono">
                      <span className="text-[#FF4F93] font-bold">KANJI : {c.kanji}</span>
                      <span className="font-jp text-neutral-400">{c.japaneseTitle}</span>
                    </div>

                    <h3 className="font-horrendo text-xl text-white">{c.category}</h3>

                    <p className="text-xs text-neutral-300 font-light">{c.tagline}</p>
                    <p className="text-[11px] text-neutral-400 font-mono">{c.frequencyNote}</p>

                    <div className="pt-2 border-t border-neutral-800 flex justify-between items-center">
                      <span className="text-[10px] font-mono text-neutral-500">
                        {c.coverUrl ? 'Image personnalisée active' : 'Graphisme vectoriel natif'}
                      </span>
                      <button
                        onClick={() => setEditingCover(c)}
                        className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs rounded text-white font-mono"
                      >
                        Modifier
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: GALLERY PHOTOS */}
          {activeTab === 'photos' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    GALERIE & ARCHIVES PHOTOGRAPHIQUES
                  </h1>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Uniquement les vraies photos importées par le bureau du club
                  </p>
                </div>

                <button
                  onClick={() => setShowPhotoModal(true)}
                  className="px-4 py-2 bg-white text-neutral-950 hover:bg-neutral-200 text-xs font-bold uppercase tracking-wider rounded-xl flex items-center gap-2 transition-colors shrink-0"
                >
                  <Upload className="w-4 h-4" />
                  <span>Importer une Vraie Photo</span>
                </button>
              </div>

              {photos.length === 0 ? (
                <div className="py-20 bg-neutral-900 border border-neutral-850 rounded-2xl text-center space-y-3">
                  <Image className="w-10 h-10 text-neutral-600 mx-auto" />
                  <h3 className="text-base font-bold text-white font-horrendo">
                    Aucune photo dans la galerie
                  </h3>
                  <p className="text-xs text-neutral-400 max-w-md mx-auto">
                    Le site affiche actuellement le message officiel « La galerie sera bientôt disponible. »
                    Cliquez ci-dessus pour ajouter les premières photographies réelles du club.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                  {photos.map((p) => (
                    <div key={p.id} className="group relative bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden aspect-square">
                      <img src={p.url} alt={p.alt} className="w-full h-full object-cover" />
                      <div className="absolute inset-0 bg-neutral-950/80 opacity-0 group-hover:opacity-100 transition-opacity p-3 flex flex-col justify-between text-xs">
                        <div>
                          <div className="font-bold text-white">{p.title}</div>
                          <div className="text-[10px] text-[#FF4F93] font-mono">{p.category}</div>
                        </div>
                        <button
                          onClick={() => onDeletePhoto(p.id)}
                          className="self-end p-1.5 bg-red-900/80 text-white rounded hover:bg-red-800"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: REGISTRATIONS */}
          {activeTab === 'registrations' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h1 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white">
                    LISTE DES INSCRIPTIONS AUX ATELIERS ({registrations.length})
                  </h1>
                  <p className="text-xs text-neutral-400 font-mono mt-1">
                    Participants enregistrés via les formulaires d'événements
                  </p>
                </div>

                {registrations.length > 0 && (
                  <button
                    onClick={exportRegistrationsCsv}
                    className="px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-mono rounded-xl flex items-center gap-2 transition-colors shrink-0"
                  >
                    <Download className="w-4 h-4" />
                    <span>Exporter CSV</span>
                  </button>
                )}
              </div>

              {registrations.length === 0 ? (
                <div className="py-20 bg-neutral-900 border border-neutral-850 rounded-2xl text-center text-neutral-500 font-mono text-xs">
                  Aucune inscription pour le moment.
                </div>
              ) : (
                <div className="bg-neutral-900 border border-neutral-850 rounded-2xl overflow-hidden">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-neutral-950 text-neutral-400 font-mono uppercase text-[10px] border-b border-neutral-800">
                      <tr>
                        <th className="py-3 px-4">Participant</th>
                        <th className="py-3 px-4">Événement</th>
                        <th className="py-3 px-4">Contact</th>
                        <th className="py-3 px-4">Places</th>
                        <th className="py-3 px-4">Date</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-800 text-neutral-300 font-mono">
                      {registrations.map((r) => (
                        <tr key={r.id}>
                          <td className="py-3 px-4 font-bold text-white">{r.fullName}</td>
                          <td className="py-3 px-4 text-[#FF4F93]">{r.eventTitle}</td>
                          <td className="py-3 px-4">
                            <div>{r.email}</div>
                            <div className="text-neutral-500">{r.phone}</div>
                          </td>
                          <td className="py-3 px-4">{r.attendeesCount}</td>
                          <td className="py-3 px-4 text-neutral-500">{r.date}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* TAB 6: MESSAGES */}
          {activeTab === 'messages' && (
            <div className="space-y-6">
              <div>
                <h1 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  MESSAGES CONTACT REÇUS ({messages.length})
                </h1>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Demandes transmises depuis la page Contact
                </p>
              </div>

              {messages.length === 0 ? (
                <div className="py-20 bg-neutral-900 border border-neutral-850 rounded-2xl text-center text-neutral-500 font-mono text-xs">
                  Aucun message reçu.
                </div>
              ) : (
                <div className="space-y-4">
                  {messages.map((m) => (
                    <div key={m.id} className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl space-y-3">
                      <div className="flex justify-between items-center text-xs font-mono text-neutral-400">
                        <span className="text-[#FF4F93] font-bold uppercase">{m.subject}</span>
                        <span>{m.date}</span>
                      </div>
                      <div className="text-sm font-bold text-white">
                        {m.fullName} · <span className="font-mono text-neutral-400 text-xs">{m.email}</span>{' '}
                        {m.phone && <span className="font-mono text-neutral-400 text-xs">({m.phone})</span>}
                      </div>
                      <p className="text-xs text-neutral-300 leading-relaxed font-light whitespace-pre-line bg-neutral-950 p-4 rounded-xl border border-neutral-850">
                        {m.message}
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 7: SETTINGS */}
          {activeTab === 'settings' && (
            <div className="max-w-2xl space-y-6">
              <div>
                <h1 className="font-horrendo text-2xl sm:text-3xl font-bold tracking-tight text-white">
                  PARAMÈTRES DU CLUB
                </h1>
                <p className="text-xs text-neutral-400 font-mono mt-1">
                  Coordonnées officielles, logo et bannière
                </p>
              </div>

              <div className="p-6 bg-neutral-900 border border-neutral-850 rounded-2xl space-y-4 text-xs">
                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Nom Officiel du Club</label>
                  <input
                    type="text"
                    value={settings.clubName}
                    onChange={(e) => onUpdateSettings({ ...settings, clubName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Nom Japonais</label>
                  <input
                    type="text"
                    value={settings.japaneseName}
                    onChange={(e) => onUpdateSettings({ ...settings, japaneseName: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-jp"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono">Téléphone Officiel (+221)</label>
                    <input
                      type="text"
                      value={settings.officialPhone}
                      onChange={(e) => onUpdateSettings({ ...settings, officialPhone: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>

                  <div>
                    <label className="block text-neutral-400 mb-1 font-mono">Instagram</label>
                    <input
                      type="text"
                      value={settings.instagramHandle}
                      onChange={(e) => onUpdateSettings({ ...settings, instagramHandle: e.target.value })}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-neutral-400 mb-1 font-mono">Bannière Annonce Officielle</label>
                  <input
                    type="text"
                    value={settings.bannerNotice}
                    onChange={(e) => onUpdateSettings({ ...settings, bannerNotice: e.target.value })}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>

                <div className="pt-2 border-t border-neutral-800">
                  <label className="block text-neutral-400 mb-1 font-mono">Police Principale du Site</label>
                  <select
                    value={localStorage.getItem('senegal_club_font') || 'syne'}
                    onChange={(e) => {
                      const f = e.target.value;
                      localStorage.setItem('senegal_club_font', f);
                      document.body.setAttribute('data-font', f);
                    }}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono cursor-pointer"
                  >
                    <option value="syne">1. Syne — Avant-Garde Architectural & Brutalisme</option>
                    <option value="cinzel">2. Cinzel — Haute Élégance & Prestige Culturel</option>
                    <option value="space">3. Space Grotesk — Clarté Japonaise & Design Moderne</option>
                    <option value="oswald">4. Oswald — Monumental Condensé & Affiche d'Art</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* New Event Modal */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-lg w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-horrendo text-xl font-bold text-white">Ajouter un Événement Officiel</h3>
            <form onSubmit={handleCreateEvent} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">Titre de l'atelier *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Initiation Calligraphie Shodō"
                  value={newEventTitle}
                  onChange={(e) => setNewEventTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Discipline</label>
                  <select
                    value={newEventCategory}
                    onChange={(e) => setNewEventCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  >
                    <option value="Calligraphie">Calligraphie</option>
                    <option value="Origami">Origami</option>
                    <option value="Manga & Dessin">Manga & Dessin</option>
                    <option value="Cinéma">Cinéma</option>
                    <option value="Culture Japonaise">Culture Japonaise</option>
                  </select>
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Prix / Accès</label>
                  <input
                    type="text"
                    value={newEventPrice}
                    onChange={(e) => setNewEventPrice(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-neutral-400 mb-1">Date affichée</label>
                  <input
                    type="text"
                    value={newEventDate}
                    onChange={(e) => setNewEventDate(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-neutral-400 mb-1">Horaires</label>
                  <input
                    type="text"
                    value={newEventTime}
                    onChange={(e) => setNewEventTime(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Lieu d'activité</label>
                <input
                  type="text"
                  value={newEventLocation}
                  onChange={(e) => setNewEventLocation(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Description courte</label>
                <textarea
                  rows={2}
                  value={newEventDesc}
                  onChange={(e) => setNewEventDesc(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="regEnable"
                  checked={newEventRegistration}
                  onChange={(e) => setNewEventRegistration(e.target.checked)}
                  className="rounded"
                />
                <label htmlFor="regEnable" className="text-neutral-300">
                  Activer le formulaire d'inscription en ligne
                </label>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowEventModal(false)}
                  className="flex-1 py-2 bg-neutral-800 text-neutral-300 rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-[#FF4F93] text-white font-bold rounded-xl"
                >
                  Publier l'Événement
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* New Photo Modal */}
      {showPhotoModal && (
        <div className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <h3 className="font-horrendo text-xl font-bold text-white">Importer une Vraie Photo du Club</h3>
            <form onSubmit={handleCreatePhoto} className="space-y-3 text-xs">
              <div>
                <label className="block text-neutral-400 mb-1">URL de l'image réelle *</label>
                <input
                  type="url"
                  required
                  placeholder="https://..."
                  value={newPhotoUrl}
                  onChange={(e) => setNewPhotoUrl(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Titre de la photo *</label>
                <input
                  type="text"
                  required
                  placeholder="Ex : Session Calligraphie au Point E"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                />
              </div>

              <div>
                <label className="block text-neutral-400 mb-1">Discipline associée</label>
                <select
                  value={newPhotoCategory}
                  onChange={(e) => setNewPhotoCategory(e.target.value as any)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-xl px-3 py-2 text-white"
                >
                  <option value="Calligraphie">Calligraphie</option>
                  <option value="Origami">Origami</option>
                  <option value="Manga & Dessin">Manga & Dessin</option>
                  <option value="Cinéma">Cinéma</option>
                  <option value="Culture Japonaise">Culture Japonaise</option>
                </select>
              </div>

              <div className="pt-4 flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowPhotoModal(false)}
                  className="flex-1 py-2 bg-neutral-800 text-neutral-300 rounded-xl"
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-white text-neutral-950 font-bold rounded-xl"
                >
                  Ajouter à la Galerie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
