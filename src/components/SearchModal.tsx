import React, { useState, useEffect } from 'react';
import { Search, X, Calendar, Compass, BookOpen, Image, Handshake, ArrowRight } from 'lucide-react';
import { ClubEvent, CategoryCover, ArticleItem, GalleryPhoto, CollaborationItem } from '../types/club';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  events: ClubEvent[];
  covers: CategoryCover[];
  articles: ArticleItem[];
  photos: GalleryPhoto[];
  collaborations: CollaborationItem[];
  onNavigate: (path: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  events,
  covers,
  articles,
  photos,
  collaborations,
  onNavigate,
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // toggle
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedEvents = q
    ? events.filter(
        (e) =>
          e.title.toLowerCase().includes(q) ||
          e.description.toLowerCase().includes(q) ||
          e.category.toLowerCase().includes(q)
      )
    : [];

  const matchedCovers = q
    ? covers.filter(
        (c) =>
          c.category.toLowerCase().includes(q) ||
          c.description.toLowerCase().includes(q) ||
          c.japaneseTitle.toLowerCase().includes(q)
      )
    : [];

  const matchedArticles = q
    ? articles.filter(
        (a) =>
          a.title.toLowerCase().includes(q) ||
          a.excerpt.toLowerCase().includes(q) ||
          a.content.toLowerCase().includes(q)
      )
    : [];

  const totalResults = matchedEvents.length + matchedCovers.length + matchedArticles.length;

  return (
    <div
      className="fixed inset-0 z-50 bg-neutral-950/80 backdrop-blur-md flex items-start justify-center pt-20 p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl bg-white border border-neutral-200 rounded-3xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-150"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 sm:p-6 border-b border-neutral-200 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#FF4F93]" />
          <input
            type="text"
            autoFocus
            placeholder="Rechercher événements, disciplines, articles, Point E..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1 text-sm sm:text-base font-medium text-neutral-950 placeholder:text-neutral-400 focus:outline-none"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-xs text-neutral-400 hover:text-neutral-600 px-2 font-mono">
              Effacer
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-neutral-950 rounded-lg hover:bg-neutral-100"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-4 sm:p-6">
          {!q ? (
            <div className="text-center py-10 text-neutral-400 text-xs font-mono">
              Tapez un mot-clé pour lancer la recherche (ex : Calligraphie, Point E, Manga, 2013, Origami)...
            </div>
          ) : totalResults === 0 ? (
            <div className="text-center py-10 text-neutral-500 text-xs font-mono">
              Aucun résultat trouvé pour "{query}".
            </div>
          ) : (
            <div className="space-y-6">
              {/* Matched Events */}
              {matchedEvents.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF4F93]">
                    Événements ({matchedEvents.length})
                  </div>
                  {matchedEvents.map((evt) => (
                    <div
                      key={evt.id}
                      onClick={() => {
                        onNavigate(`/evenements/${evt.slug}`);
                        onClose();
                      }}
                      className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-mono text-neutral-500">{evt.date} · {evt.category}</div>
                        <h4 className="text-xs font-bold text-neutral-950">{evt.title}</h4>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Activities */}
              {matchedCovers.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF4F93]">
                    Disciplines ({matchedCovers.length})
                  </div>
                  {matchedCovers.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        onNavigate('/activites');
                        onClose();
                      }}
                      className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-jp text-neutral-500">{c.japaneseTitle}</div>
                        <h4 className="text-xs font-bold text-neutral-950">{c.category}</h4>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  ))}
                </div>
              )}

              {/* Matched Articles */}
              {matchedArticles.length > 0 && (
                <div className="space-y-2">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-[#FF4F93]">
                    Actualités & Communiqués ({matchedArticles.length})
                  </div>
                  {matchedArticles.map((art) => (
                    <div
                      key={art.id}
                      onClick={() => {
                        onNavigate(`/actualites/${art.slug}`);
                        onClose();
                      }}
                      className="p-3 bg-neutral-50 hover:bg-neutral-100 rounded-xl cursor-pointer transition-colors flex items-center justify-between"
                    >
                      <div>
                        <div className="text-[11px] font-mono text-neutral-500">{art.date}</div>
                        <h4 className="text-xs font-bold text-neutral-950">{art.title}</h4>
                      </div>
                      <ArrowRight className="w-3.5 h-3.5 text-neutral-400" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
