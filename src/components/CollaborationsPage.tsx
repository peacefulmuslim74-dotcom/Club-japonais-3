import React from 'react';
import { CollaborationItem } from '../types/club';
import { Building2, Handshake, ShieldCheck } from 'lucide-react';

interface CollaborationsPageProps {
  collaborations: CollaborationItem[];
}

export const CollaborationsPage: React.FC<CollaborationsPageProps> = ({
  collaborations,
}) => {
  return (
    <div className="min-h-screen bg-white text-neutral-950 py-16 sm:py-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pb-10 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF4F93] mb-2">
            <Handshake className="w-3.5 h-3.5" />
            <span>RELATIONS & PARTENARIATS CONFIRMÉS</span>
            <span className="text-neutral-400">/</span>
            <span className="font-jp">協力機関</span>
          </div>

          <h1 className="font-horrendo text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            COLLABORATIONS DU CLUB
          </h1>

          <p className="text-sm text-neutral-600 font-light mt-3 max-w-xl leading-relaxed">
            Seuls les partenaires académiques et culturels officiellement confirmés sont répertoriés ci-dessous.
          </p>
        </header>

        <div className="mt-10 divide-y divide-neutral-200">
          {collaborations.map((collab) => (
            <div key={collab.id} className="py-8 space-y-2">
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="text-[#FF4F93] uppercase">{collab.type}</span>
                <span>{collab.confirmedDate}</span>
              </div>

              <h2 className="font-horrendo text-2xl font-bold text-neutral-950">
                {collab.name}
              </h2>

              {collab.japaneseName && (
                <div className="font-jp text-xs text-neutral-500">{collab.japaneseName}</div>
              )}

              <p className="text-sm text-neutral-700 font-light leading-relaxed pt-1">
                {collab.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
