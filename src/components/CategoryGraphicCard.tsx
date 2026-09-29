import React from 'react';
import { CategoryCover } from '../types/club';
import { ArrowUpRight } from 'lucide-react';

interface CategoryGraphicCardProps {
  cover: CategoryCover;
  onClick?: () => void;
  variant?: 'card' | 'banner' | 'compact';
}

export const CategoryGraphicCard: React.FC<CategoryGraphicCardProps> = ({
  cover,
  onClick,
  variant = 'card',
}) => {
  // Bespoke graphic illustration based on category (pure vector, no stock photo)
  const renderGraphicArt = () => {
    switch (cover.category) {
      case 'Manga & Dessin':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0A0A0A" />
            {/* Sequential panel geometry */}
            <rect x="20" y="20" width="220" height="150" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="250" y="20" width="130" height="70" fill="none" stroke="#FF4F93" strokeWidth="2" />
            <rect x="250" y="100" width="130" height="180" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <rect x="20" y="180" width="220" height="100" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            {/* Dynamic speedlines */}
            <line x1="20" y1="20" x2="160" y2="100" stroke="#FF4F93" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="240" y1="20" x2="160" y2="100" stroke="#FF4F93" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="20" y1="170" x2="160" y2="100" stroke="#FF4F93" strokeWidth="1" strokeDasharray="4 4" />
            {/* Kanji watermarked */}
            <text x="315" y="220" fill="#262626" fontSize="120" fontFamily="'Shippori Mincho', serif" textAnchor="middle">
              画
            </text>
            <circle cx="160" cy="100" r="32" fill="#FF4F93" />
            <text x="160" y="107" fill="#FFFFFF" fontSize="20" fontWeight="900" textAnchor="middle" fontFamily="'Space Grotesk', sans-serif">
              01
            </text>
          </svg>
        );

      case 'Origami':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0A0A0A" />
            {/* Origami Crease Pattern / Folded Crane Wireframe */}
            <polygon points="200,40 100,180 300,180" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <polygon points="200,40 200,260 100,180" fill="#FF4F93" fillOpacity="0.25" stroke="#FF4F93" strokeWidth="2" />
            <polygon points="200,40 200,260 300,180" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="40" y1="180" x2="100" y2="180" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" />
            <line x1="300" y1="180" x2="360" y2="180" stroke="#FFFFFF" strokeWidth="1.5" strokeDasharray="6 4" />
            <polygon points="40,180 100,140 100,180" fill="#FF4F93" />
            <text x="200" y="240" fill="#333333" fontSize="110" fontFamily="'Shippori Mincho', serif" textAnchor="middle">
              折
            </text>
            <circle cx="200" cy="40" r="6" fill="#FFFFFF" />
          </svg>
        );

      case 'Calligraphie':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0A0A0A" />
            {/* Sumi-e stroke vector & seal */}
            <path
              d="M60,150 Q160,80 240,140 T340,110 C360,110 370,140 330,160 Q210,210 110,180 Z"
              fill="#FFFFFF"
            />
            <path
              d="M130,70 Q160,170 170,250 C175,270 155,270 150,240 Q145,160 120,80 Z"
              fill="#FF4F93"
            />
            {/* Red / Rose Artist Hanko Seal */}
            <rect x="310" y="210" width="55" height="55" rx="6" fill="#FF4F93" />
            <rect x="314" y="214" width="47" height="47" rx="3" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            <text x="337" y="247" fill="#FFFFFF" fontSize="26" fontFamily="'Shippori Mincho', serif" textAnchor="middle" fontWeight="bold">
              書
            </text>
            <text x="70" y="260" fill="#737373" fontSize="12" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.2em">
              SHODŌ · 永字八法
            </text>
          </svg>
        );

      case 'Cinéma':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0A0A0A" />
            {/* 35mm Film Strip & Anamorphic Aspect frame */}
            <rect x="30" y="40" width="340" height="220" fill="none" stroke="#FFFFFF" strokeWidth="2" />
            {/* Sprocket holes */}
            {[60, 110, 160, 210, 260, 310].map((x, i) => (
              <rect key={i} x={x} y="48" width="18" height="12" rx="2" fill="#FFFFFF" />
            ))}
            {[60, 110, 160, 210, 260, 310].map((x, i) => (
              <rect key={i} x={x} y="240" width="18" height="12" rx="2" fill="#FFFFFF" />
            ))}
            {/* Cinema 2.39:1 scope frame */}
            <rect x="50" y="80" width="300" height="140" fill="#171717" stroke="#FF4F93" strokeWidth="2" />
            <text x="200" y="175" fill="#FFFFFF" fontSize="80" fontFamily="'Shippori Mincho', serif" textAnchor="middle">
              映
            </text>
            <circle cx="90" cy="110" r="14" fill="#FF4F93" />
          </svg>
        );

      case 'Culture Japonaise':
      default:
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <rect width="400" height="300" fill="#0A0A0A" />
            {/* Solar disc & Asymmetric Geometry */}
            <circle cx="200" cy="150" r="75" fill="#FF4F93" />
            {/* Clean architectural vertical divider */}
            <line x1="200" y1="30" x2="200" y2="270" stroke="#FFFFFF" strokeWidth="2" />
            <line x1="50" y1="150" x2="350" y2="150" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="8 4" />
            <text x="200" y="195" fill="#0A0A0A" fontSize="110" fontFamily="'Shippori Mincho', serif" textAnchor="middle">
              和
            </text>
            <text x="200" y="275" fill="#A3A3A3" fontSize="11" fontFamily="'Space Grotesk', sans-serif" letterSpacing="0.25em" textAnchor="middle">
              NIHONGO · CULTURE
            </text>
          </svg>
        );
    }
  };

  return (
    <article
      onClick={onClick}
      className={`group relative overflow-hidden bg-neutral-950 border border-neutral-900 rounded-2xl flex flex-col justify-between transition-all duration-300 hover:border-[#FF4F93]/60 cursor-pointer ${
        variant === 'banner' ? 'md:flex-row' : ''
      }`}
    >
      {/* Visual Artwork Container (category_cover ONLY) */}
      <div className="relative aspect-16/10 w-full overflow-hidden bg-neutral-950">
        {cover.coverUrl ? (
          <img
            src={cover.coverUrl}
            alt={cover.category}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          renderGraphicArt()
        )}

        {/* Japanese Calligraphic Watermark */}
        <div className="absolute top-3 right-4 font-jp text-white/90 text-sm font-semibold tracking-widest bg-neutral-950/70 px-2 py-0.5 rounded backdrop-blur-sm border border-neutral-800">
          {cover.japaneseTitle}
        </div>
      </div>

      {/* Editorial Content */}
      <div className="p-6 flex flex-col justify-between flex-1 bg-neutral-950">
        <div>
          <div className="flex items-center justify-between text-xs text-neutral-400 font-mono mb-2">
            <span className="text-[#FF4F93] font-semibold tracking-wider">DOMAIN {cover.kanji}</span>
            <span>{cover.frequencyNote}</span>
          </div>

          <h3 className="font-horrendo text-xl text-white group-hover:text-[#FF4F93] transition-colors tracking-tight">
            {cover.category}
          </h3>

          <p className="text-xs text-neutral-300 font-medium mt-1 font-sans">
            {cover.tagline}
          </p>

          <p className="text-xs text-neutral-400 mt-2 font-light leading-relaxed">
            {cover.description}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-neutral-800/80 flex items-center justify-between text-xs font-semibold text-neutral-300 group-hover:text-white transition-colors">
          <span>Découvrir le programme</span>
          <ArrowUpRight className="w-4 h-4 text-[#FF4F93] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </article>
  );
};
