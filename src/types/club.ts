export type ActivityCategory =
  | 'Manga & Dessin'
  | 'Origami'
  | 'Calligraphie'
  | 'Cinéma'
  | 'Culture Japonaise';

export interface CategoryCover {
  id: string;
  category: ActivityCategory;
  japaneseTitle: string;
  kanji: string;
  graphicSvg?: string;
  coverUrl?: string;
  tagline: string;
  description: string;
  accentColor: string;
  frequencyNote: string;
}

export interface ClubEvent {
  id: string;
  slug: string;
  title: string;
  japaneseTitle?: string;
  category: ActivityCategory;
  date: string; // ISO format or formatted
  rawDate: string; // for sorting: YYYY-MM-DD
  time: string;
  locationName: string;
  locationDetails: string;
  isPointE: boolean;
  price: string; // 'Gratuit', '2 000 FCFA', etc.
  description: string;
  editorialBody?: string;
  status: 'published' | 'draft' | 'past' | 'cancelled';
  registrationEnabled: boolean;
  registrationCapacity?: number;
  registeredCount: number;
  officialImage?: string;
  isFeatured?: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  description?: string;
  alt: string;
  eventId?: string;
  eventTitle?: string;
  category?: ActivityCategory;
  date: string;
  published: boolean;
}

export interface LocationItem {
  id: string;
  name: string;
  type: 'Lieu d\'activité' | 'Partenaire d\'accueil';
  address: string;
  neighborhood: string;
  city: string;
  description: string;
  isPrimaryActivityVenue: boolean;
}

export interface CollaborationItem {
  id: string;
  name: string;
  japaneseName?: string;
  type: 'Institution' | 'Éducation' | 'Culturel';
  description: string;
  confirmedDate: string;
  logoUrl?: string;
  websiteUrl?: string;
}

export interface ArticleItem {
  id: string;
  slug: string;
  title: string;
  japaneseKicker?: string;
  date: string;
  excerpt: string;
  content: string;
  author: string;
  published: boolean;
}

export interface ContactMessage {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  date: string;
  status: 'unread' | 'read' | 'replied';
}

export interface EventRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  fullName: string;
  email: string;
  phone: string;
  attendeesCount: number;
  date: string;
  status: 'confirmed' | 'attended' | 'cancelled';
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

export interface ClubSettings {
  clubName: string;
  japaneseName: string;
  subtitle: string;
  establishedYear: string;
  officialPhone: string;
  instagramHandle: string;
  facebookPage: string;
  youtubeChannel?: string;
  activityVenueName: string;
  activityVenueRole: string;
  customLogoUrl?: string;
  bannerNotice?: string;
  bannerNoticeActive: boolean;
}
