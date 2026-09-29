import React, { useState } from 'react';
import normalLogoImage from '../assets/images/club_logo_normal_1790645601184.jpg';

interface ClubLogoProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'hero' | 'xl';
  className?: string;
  variant?: 'full' | 'badge' | 'minimal' | 'monochrome';
  customImage?: string;
  forceVector?: boolean;
}

export const ClubLogo: React.FC<ClubLogoProps> = ({
  size = 'md',
  className = '',
  variant = 'full',
  customImage,
  forceVector = false,
}) => {
  const [imageError, setImageError] = useState(false);

  // Dimension mapping
  const sizeMap = {
    xs: 'w-8 h-8',
    sm: 'w-11 h-11',
    md: 'w-16 h-16',
    lg: 'w-32 h-32',
    hero: 'w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96',
    xl: 'w-48 h-48',
  };

  const imageSrc = customImage || normalLogoImage || '/logo.jpg';

  // RENDER NORMAL LOGO IMAGE AS REQUESTED
  if (!forceVector && !imageError) {
    return (
      <div
        className={`relative ${sizeMap[size]} ${className} shrink-0 select-none group flex items-center justify-center`}
        title="SENEGAL ISM JAPAN CLUB — にほんごくらぶ セネガル (The Nihongo Club, ESTD 2013)"
      >
        <img
          src={imageSrc}
          alt="Senegal ISM Japan Club - The Nihongo Club Logo"
          onError={() => setImageError(true)}
          className="w-full h-full object-contain rounded-2xl shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.03]"
          loading="eager"
        />
      </div>
    );
  }

  // High-fidelity vector SVG fallback
  return (
    <div
      className={`relative ${sizeMap[size]} ${className} shrink-0 select-none group flex items-center justify-center`}
      title="SENEGAL ISM JAPAN CLUB — にほんごくらぶ セネガル (ESTD 2013)"
    >
      <svg
        viewBox="0 0 500 500"
        className="w-full h-full drop-shadow-sm transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="logoBgGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FBD5E5" />
            <stop offset="50%" stopColor="#EDBFDC" />
            <stop offset="100%" stopColor="#CBB4D9" />
          </linearGradient>

          <linearGradient id="kanjiRoseGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FF66A1" />
            <stop offset="100%" stopColor="#EB3175" />
          </linearGradient>

          <filter id="clubShadow" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="8" stdDeviation="6" floodOpacity="0.25" floodColor="#0A0A0A" />
          </filter>

          <filter id="kanjiGlow" x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="4" stdDeviation="3" floodOpacity="0.15" floodColor="#000000" />
          </filter>
        </defs>

        {/* Outer Frame with soft rounded corners */}
        <rect width="500" height="500" rx="36" fill="url(#logoBgGrad)" />

        {/* Scattered background sakura petals */}
        <path d="M-10,120 C10,90 35,130 20,150 C5,170 -30,150 -10,120 Z" fill="#E62F6D" opacity="0.85" />
        <path d="M50,40 C70,15 100,50 85,75 C70,95 35,70 50,40 Z" fill="#E62F6D" opacity="0.9" />
        <path d="M140,20 C160,0 185,30 170,50 C155,70 120,40 140,20 Z" fill="#FFA5C3" opacity="0.8" />
        <path d="M280,15 C295,2 320,25 305,45 C290,65 265,35 280,15 Z" fill="#E62F6D" opacity="0.85" />
        <path d="M430,70 C455,45 480,75 465,100 C450,125 410,95 430,70 Z" fill="#FFA5C3" opacity="0.85" />
        <path d="M485,150 C505,130 520,160 505,185 C490,210 465,175 485,150 Z" fill="#E62F6D" opacity="0.9" />
        <path d="M440,250 C465,225 490,255 475,280 C460,305 420,275 440,250 Z" fill="#E62F6D" opacity="0.85" />
        <path d="M420,410 C445,390 470,420 455,445 C440,470 400,435 420,410 Z" fill="#FFA5C3" opacity="0.85" />
        <path d="M390,440 C410,420 435,450 420,475 C405,500 370,465 390,440 Z" fill="#E62F6D" opacity="0.9" />
        <path d="M130,420 C150,400 175,430 160,455 C145,480 110,445 130,420 Z" fill="#FFA5C3" opacity="0.8" />
        <path d="M35,435 C55,415 80,445 65,470 C50,495 15,460 35,435 Z" fill="#E62F6D" opacity="0.9" />
        <path d="M-5,320 C15,300 40,330 25,355 C10,380 -25,345 -5,320 Z" fill="#FFA5C3" opacity="0.8" />

        {/* Central Stylized Kanji: 春 (Haru / Spring) */}
        <g id="centralKanji" filter="url(#kanjiGlow)">
          <path
            d="M245,65 C230,65 220,80 220,110 L220,125 L280,125 L280,110 C280,80 270,65 245,65 Z"
            fill="url(#kanjiRoseGrad)"
          />
          <rect x="100" y="105" width="300" height="48" rx="24" fill="url(#kanjiRoseGrad)" />
          <rect x="90" y="170" width="320" height="48" rx="24" fill="url(#kanjiRoseGrad)" />
          <path
            d="M190,195 C140,240 100,285 75,320 C60,340 75,355 95,355 C120,355 155,305 210,250 L190,195 Z"
            fill="url(#kanjiRoseGrad)"
          />
          <path
            d="M310,195 C360,240 400,285 425,320 C440,340 425,355 405,355 C380,355 345,305 290,250 L310,195 Z"
            fill="url(#kanjiRoseGrad)"
          />
          <path
            d="M175,250 C165,250 160,260 160,275 L160,405 C160,425 175,435 200,435 L300,435 C325,435 340,425 340,405 L340,275 C340,260 335,250 325,250 Z"
            fill="url(#kanjiRoseGrad)"
          />
          <rect x="210" y="275" width="80" height="30" rx="8" fill="#D3A7CE" />
          <rect x="210" y="370" width="80" height="28" rx="8" fill="#D3A7CE" />

          {/* Leaf specks */}
          <ellipse cx="240" cy="140" rx="14" ry="7" transform="rotate(-20 240 140)" fill="#00D775" />
          <ellipse cx="340" cy="195" rx="14" ry="7" transform="rotate(30 340 195)" fill="#00D775" />
          <ellipse cx="165" cy="365" rx="14" ry="7" transform="rotate(-40 165 365)" fill="#00D775" />
          <ellipse cx="295" cy="425" rx="12" ry="6" transform="rotate(25 295 425)" fill="#00D775" />

          {/* Dark magenta textures */}
          <path d="M210,170 C225,150 245,180 230,195 C215,210 195,190 210,170 Z" fill="#D81B60" />
          <path d="M120,290 C135,270 155,300 140,315 C125,330 105,310 120,290 Z" fill="#D81B60" />
          <path d="M370,290 C385,270 405,300 390,315 C375,330 355,310 370,290 Z" fill="#D81B60" />
          <path d="M245,395 C260,375 280,405 265,420 C250,435 230,415 245,395 Z" fill="#D81B60" />
        </g>

        {/* Foreground Typography Overlay */}
        <g id="typographyOverlay" filter="url(#clubShadow)">
          <rect x="108" y="210" width="46" height="115" rx="4" fill="#FFFFFF" />
          <text
            x="108"
            y="204"
            fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
            fontSize="18"
            fontWeight="900"
            fill="#0A0A0A"
            letterSpacing="0.05em"
          >
            THE
          </text>
          <g transform="translate(131, 268) rotate(90)">
            <text
              x="0"
              y="0"
              fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
              fontSize="16"
              fontWeight="900"
              fill="#0A0A0A"
              letterSpacing="0.14em"
              textAnchor="middle"
            >
              NIHONGO
            </text>
          </g>

          <text
            x="160"
            y="322"
            fontFamily="'Space Grotesk', 'Impact', sans-serif"
            fontSize="128"
            fontWeight="900"
            fill="#FAF9F5"
            letterSpacing="-0.03em"
          >
            CLUB
          </text>

          <text
            x="305"
            y="342"
            fontFamily="'Plus Jakarta Sans', 'Arial Black', sans-serif"
            fontSize="18"
            fontWeight="900"
            fill="#0A0A0A"
            letterSpacing="0.08em"
          >
            ESTD 2013
          </text>
        </g>
      </svg>
    </div>
  );
};
