import {
  CategoryCover,
  ClubEvent,
  GalleryPhoto,
  LocationItem,
  CollaborationItem,
  ArticleItem,
  ClubSettings,
  FAQItem,
} from '../types/club';

export const initialClubSettings: ClubSettings = {
  clubName: 'SENEGAL ISM JAPAN CLUB',
  japaneseName: 'にほんごくらぶ セネガル',
  subtitle: 'The Nihongo Club',
  establishedYear: '2013',
  officialPhone: '+221 77 713 95 90',
  instagramHandle: '@thenihongoclub',
  facebookPage: 'Senegal ISM Japan Club にほんごくらぶ セネガル',
  youtubeChannel: '', // Non configuré
  activityVenueName: 'Centre socioculturel Point E',
  activityVenueRole: 'Lieu d\'activité principal',
  customLogoUrl: '',
  bannerNotice: 'PROCHAIN ATELIER AU CENTRE SOCIOCULTUREL POINT E · RENCONTRE & IMMERSION CULTURELLE',
  bannerNoticeActive: true,
};

// Architecture séparée : Couvertures des catégories graphiques (Ne font PAS partie de la galerie)
export const initialCategoryCovers: CategoryCover[] = [
  {
    id: 'cover-manga',
    category: 'Manga & Dessin',
    japaneseTitle: 'マンガ・作画',
    kanji: '画',
    tagline: 'L\'art du récit séquentiel & character design',
    description: 'Exploration des techniques de découpage graphique, encrage traditionnel et narration visuelle japonaise lors d\'ateliers dédiés.',
    accentColor: '#FF4F93',
    frequencyNote: 'Ateliers périodiques et masterclasses',
  },
  {
    id: 'cover-origami',
    category: 'Origami',
    japaneseTitle: '折り紙の美学',
    kanji: '折',
    tagline: 'Géométrie sacrée & patience du pliage',
    description: 'Apprentissage des pliages traditionnels du papier washi, des grues cérémonielles (tsuru) aux structures géométriques complexes.',
    accentColor: '#0A0A0A',
    frequencyNote: 'Séances d\'initiation et perfectionnement',
  },
  {
    id: 'cover-calligraphie',
    category: 'Calligraphie',
    japaneseTitle: '書道 — Shodō',
    kanji: '書',
    tagline: 'La voie de l\'encre et du geste respiré',
    description: 'Pratique méditative du pinceau (fude) et de l\'encre de Chine (sumi) sur papier de riz pour tracer kanji et hiragana.',
    accentColor: '#FF4F93',
    frequencyNote: 'Sessions immersives avec maîtres invités',
  },
  {
    id: 'cover-cinema',
    category: 'Cinéma',
    japaneseTitle: '日本映画',
    kanji: '映',
    tagline: 'Rétrospectives & analyses cinématographiques',
    description: 'Projections d\'œuvres majeures du cinéma nippon classique et contemporain, suivies d\'échanges critiques sur la société japonaise.',
    accentColor: '#0A0A0A',
    frequencyNote: 'Ciné-clubs et séances débats',
  },
  {
    id: 'cover-culture',
    category: 'Culture Japonaise',
    japaneseTitle: '日本文化・語学',
    kanji: '和',
    tagline: 'Langue Nihongo, art de vivre et traditions',
    description: 'Immersion linguistique, découverte des rituels du thé, coutumes saisonnières et ponts culturels entre le Sénégal et le Japon.',
    accentColor: '#FF4F93',
    frequencyNote: 'Événements majeurs et cercles d\'échange',
  },
];

// Lieux d'activité vérifiés (Distinction stricte entre Lieu d'activité et Siège officiel)
export const initialLocations: LocationItem[] = [
  {
    id: 'loc-point-e',
    name: 'Centre socioculturel Point E',
    type: 'Lieu d\'activité',
    address: 'Point E',
    neighborhood: 'Point E',
    city: 'Dakar',
    description: 'Espace culturel communautaire accueillant régulièrement les ateliers de calligraphie, d\'origami et les rencontres culturelles du club.',
    isPrimaryActivityVenue: true,
  },
  {
    id: 'loc-ism',
    name: 'Institut Supérieur de Management (ISM)',
    type: 'Partenaire d\'accueil',
    address: 'Rue de Louga, Point E',
    neighborhood: 'Point E',
    city: 'Dakar',
    description: 'Cadre académique d\'origine du club étudiant pour les conférences et grands rassemblements culturels.',
    isPrimaryActivityVenue: false,
  },
];

// Événements authentiques du club
export const initialEvents: ClubEvent[] = [
  {
    id: 'evt-2026-01',
    slug: 'atelier-shodo-calligraphie-point-e',
    title: 'Atelier de Calligraphie Japonaise (Shodō)',
    japaneseTitle: '書道ワークショップ',
    category: 'Calligraphie',
    date: 'Samedi 17 Octobre 2026',
    rawDate: '2026-10-17',
    time: '15h00 — 18h00',
    locationName: 'Centre socioculturel Point E',
    locationDetails: 'Salle polyvalente, Point E, Dakar',
    isPointE: true,
    price: 'Entrée libre sur inscription',
    description: 'Une séance guidée d\'initiation au maniement du pinceau traditionnel fude et à la composition des kanji fondamentaux.',
    editorialBody: 'Le shodō (書道) dépasse la simple calligraphie : il est une discipline du souffle, du silence et de la posture. Lors de cette séance organisée au Centre socioculturel Point E, les participants découvriront la préparation de l\'encre de Chine sur la pierre de suzuri, la tenue rigoureuse du pinceau vertical et le tracé des huit traits fondamentaux du caractère 永 (Eternité). Matériel traditionnel mis à disposition pour chaque participant inscrit.',
    status: 'published',
    registrationEnabled: true,
    registrationCapacity: 25,
    registeredCount: 14,
    isFeatured: true,
  },
  {
    id: 'evt-2026-02',
    slug: 'origami-art-du-papier-japonais',
    title: 'Cercle de Pliage Origami & Papier Washi',
    japaneseTitle: '伝統折り紙の集い',
    category: 'Origami',
    date: 'Samedi 7 Novembre 2026',
    rawDate: '2026-11-07',
    time: '15h30 — 17h30',
    locationName: 'Centre socioculturel Point E',
    locationDetails: 'Point E, Dakar',
    isPointE: true,
    price: 'Gratuit',
    description: 'Atelier de pliage géométrique traditionnel : création de grues de la paix (senbazuru) et de boîtes masu.',
    editorialBody: 'La transformation d\'une simple feuille carrée sans colle ni ciseaux représente l\'esprit même du minimalisme nippon. Cette session met l\'accent sur la précision des angles, la patience tactile et l\'histoire de la légende des mille grues de Sadako Sasaki.',
    status: 'published',
    registrationEnabled: true,
    registrationCapacity: 30,
    registeredCount: 9,
    isFeatured: true,
  },
  {
    id: 'evt-2026-03',
    slug: 'cine-debat-animation-cinemateque',
    title: 'Projection & Analyse : Cinéma d\'Auteur Nippon',
    japaneseTitle: '日本映画上映会',
    category: 'Cinéma',
    date: 'Vendredi 27 Novembre 2026',
    rawDate: '2026-11-27',
    time: '18h00 — 21h00',
    locationName: 'Centre socioculturel Point E',
    locationDetails: 'Point E, Dakar',
    isPointE: true,
    price: 'Gratuit',
    description: 'Projection en version originale sous-titrée suivie d\'un échange thématique sur la poétique du temps (mono no aware).',
    editorialBody: 'Une soirée consacrée à la contemplation et à la dramaturgie cinématographique japonaise. Après la projection, un débat interactif permettra de décrypter les codes narratifs, les silences et les métaphores visuelles de l\'œuvre.',
    status: 'published',
    registrationEnabled: false,
    registeredCount: 0,
    isFeatured: false,
  },
  {
    id: 'evt-2026-04',
    slug: 'manga-session-character-design',
    title: 'Masterclass Manga : Anatomie & Dynamique du Trait',
    japaneseTitle: 'マンガ作画・キャラクター創作',
    category: 'Manga & Dessin',
    date: 'Samedi 12 Décembre 2026',
    rawDate: '2026-12-12',
    time: '14h30 — 17h30',
    locationName: 'Centre socioculturel Point E',
    locationDetails: 'Point E, Dakar',
    isPointE: true,
    price: 'Entrée libre sur inscription',
    description: 'Exploration des techniques de dessin manga : proportions des visages, expressions d\'émotions et dynamisme du mouvement.',
    editorialBody: 'Animée par les dessinateurs passionnés du club, cette masterclass propose une immersion technique dans le character design, la perspective angulaire et la construction d\'une planche narrative percutante.',
    status: 'published',
    registrationEnabled: true,
    registrationCapacity: 20,
    registeredCount: 18,
    isFeatured: false,
  },
];

// Galerie officielle : Uniquement les vraies photos importées (vide au démarrage)
export const initialGallery: GalleryPhoto[] = [];

// Collaborations réelles et confirmées
export const initialCollaborations: CollaborationItem[] = [
  {
    id: 'collab-ism',
    name: 'Groupe ISM (Institut Supérieur de Management)',
    japaneseName: 'ISM ダカール',
    type: 'Éducation',
    description: 'Établissement d\'enseignement supérieur berceau de la fondation étudiante du club en 2013.',
    confirmedDate: 'Partenaire fondateur depuis 2013',
  },
  {
    id: 'collab-point-e',
    name: 'Centre socioculturel Point E',
    japaneseName: 'ポワンE 社会文化センター',
    type: 'Culturel',
    description: 'Espace municipal accueillant les activités récurrentes et les rassemblements publics du club.',
    confirmedDate: 'Lieu d\'accueil régulier',
  },
];

// Articles officiels du club
export const initialArticles: ArticleItem[] = [
  {
    id: 'art-1',
    slug: 'treize-annees-de-passion-japonaise-a-dakar',
    title: 'Depuis 2013 : Cultiver le dialogue culturel entre le Sénégal et le Japon',
    japaneseKicker: '設立の精神 · HISTOIRE & VOCATION',
    date: 'Septembre 2026',
    excerpt: 'Fondé au sein de l\'Institut Supérieur de Management, le Senegal ISM Japan Club rassemble passionnés, apprenants et curieux autour de la culture nippone authentique.',
    content: `Créé en 2013, le SENEGAL ISM JAPAN CLUB (The Nihongo Club) est né d'une passion commune : celle de faire découvrir et vivre la richesse artistique, philosophique et linguistique du Japon à Dakar.

Loin des clichés superficiels, le club privilégie la pratique concrète et le partage : de la rigueur gestuelle de la calligraphie shodō à la minutie de l'origami, en passant par l'analyse des grands courants du cinéma d'animation et l'apprentissage des bases de la langue japonaise (nihongo).

Les rencontres et ateliers s'articulent principalement autour de lieux de convivialité culturelle tels que le Centre socioculturel Point E, offrant aux membres et au public dakarois une passerelle vivante vers l'archipel nippon.`,
    author: 'Bureau du Club',
    published: true,
  },
];

// Foire Aux Questions
export const initialFAQ: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'Faut-il parler japonais pour participer aux activités du club ?',
    answer: 'Absolument pas. Le club accueille tous les passionnés et curieux, qu\'ils soient débutants complets ou déjà apprenants de la langue.',
    category: 'Général',
  },
  {
    id: 'faq-2',
    question: 'Où se déroulent les ateliers et rendez-vous du club ?',
    answer: 'La majorité des ateliers publics (origami, calligraphie, manga, rencontres) se déroulent au Centre socioculturel Point E à Dakar.',
    category: 'Lieux',
  },
  {
    id: 'faq-3',
    question: 'Comment s\'inscrire à un événement ou un atelier ?',
    answer: 'Lorsqu\'un événement propose des inscriptions ouvertes, un formulaire officiel apparaît directement sur sa page dédiée sur ce site.',
    category: 'Événements',
  },
];
