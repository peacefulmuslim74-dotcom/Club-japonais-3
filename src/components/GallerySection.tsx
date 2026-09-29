import React, { useState } from 'react';
import { GalleryPhoto } from '../types/club';
import { Image, X, ChevronLeft, ChevronRight, Share2, Calendar, MapPin } from 'lucide-react';

interface GallerySectionProps {
  photos: GalleryPhoto[];
  onUploadRequest?: () => void;
}

export const GallerySection: React.FC<GallerySectionProps> = ({
  photos,
  onUploadRequest,
}) => {
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', 'Manga & Dessin', 'Origami', 'Calligraphie', 'Cinéma', 'Culture Japonaise'];

  const filteredPhotos = photos.filter((p) => {
    if (selectedCategory === 'All') return true;
    return p.category === selectedCategory;
  });

  return (
    <section className="py-20 bg-neutral-950 text-white border-b border-neutral-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-neutral-850">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-[#FF4F93] uppercase mb-2">
              <Image className="w-3.5 h-3.5" />
              <span>ARCHIVES VISUELLES DU CLUB</span>
              <span className="text-neutral-600">/</span>
              <span className="font-jp">写真記録</span>
            </div>
            <h2 className="font-horrendo text-3xl sm:text-5xl font-bold tracking-tight text-white">
              GALERIE OFFICIELLE
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2 font-light max-w-xl">
              Photographies authentiques des ateliers et des rencontres culturelles du club.
            </p>
          </div>

          {photos.length > 0 && (
            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-colors whitespace-nowrap ${
                    selectedCategory === cat
                      ? 'bg-white text-neutral-950 font-bold'
                      : 'text-neutral-400 hover:text-white bg-neutral-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Gallery Content or Strict Empty State */}
        {filteredPhotos.length === 0 ? (
          <div className="py-24 text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-6 text-[#FF4F93]">
              <Image className="w-7 h-7" />
            </div>

            {/* Prompt mandatory exact copy */}
            <h3 className="font-horrendo text-2xl sm:text-3xl font-bold text-white tracking-tight">
              La galerie sera bientôt disponible.
            </h3>

            <p className="text-xs text-neutral-400 font-light mt-3 leading-relaxed">
              Conformément à notre charte d'intégrité, aucune photo fictive n'est affichée. Les photographies
              officielles des dernières sessions au Centre socioculturel Point E sont actuellement en cours de
              sélection et d'archivage par le bureau du club.
            </p>

            {onUploadRequest && (
              <div className="mt-8">
                <button
                  onClick={onUploadRequest}
                  className="px-4 py-2 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-xs font-mono text-neutral-300 rounded-lg transition-colors"
                >
                  Espace Administration : Importer les premières photos
                </button>
              </div>
            )}
          </div>
        ) : (
          /* Editorial Asymmetric Photo Grid */
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhotos.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setSelectedPhoto(photo)}
                className={`group relative overflow-hidden rounded-2xl bg-neutral-900 border border-neutral-800 cursor-pointer ${
                  i % 3 === 0 ? 'sm:col-span-2 aspect-16/10' : 'aspect-square'
                }`}
              >
                <img
                  src={photo.url}
                  alt={photo.alt || photo.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-transparent opacity-0 group-hover:opacity-100 transition-opacity p-6 flex flex-col justify-end">
                  <div className="text-[11px] text-[#FF4F93] font-mono uppercase">{photo.date}</div>
                  <h4 className="text-base font-bold text-white font-horrendo">{photo.title}</h4>
                  {photo.description && (
                    <p className="text-xs text-neutral-300 mt-1 line-clamp-2">{photo.description}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-neutral-950/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setSelectedPhoto(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-900 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-neutral-950/80 hover:bg-neutral-950 text-neutral-300 hover:text-white rounded-full border border-neutral-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="aspect-16/10 w-full bg-neutral-950">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.alt}
                className="w-full h-full object-contain"
              />
            </div>

            <div className="p-6 bg-neutral-900 space-y-2">
              <div className="flex items-center justify-between text-xs text-neutral-400 font-mono">
                <span className="text-[#FF4F93] uppercase">{selectedPhoto.category || 'Atelier'}</span>
                <span>{selectedPhoto.date}</span>
              </div>
              <h3 className="text-lg font-bold text-white font-horrendo">{selectedPhoto.title}</h3>
              {selectedPhoto.description && (
                <p className="text-xs text-neutral-300 font-light leading-relaxed">
                  {selectedPhoto.description}
                </p>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
