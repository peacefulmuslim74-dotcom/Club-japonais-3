import React, { useState } from 'react';
import { ArticleItem } from '../types/club';
import { BookOpen, ArrowLeft, ArrowUpRight, Calendar, User } from 'lucide-react';

interface ArticlesPageProps {
  articles: ArticleItem[];
  selectedArticleSlug?: string;
  onSelectArticle: (slug: string) => void;
  onBackToArticles: () => void;
}

export const ArticlesPage: React.FC<ArticlesPageProps> = ({
  articles,
  selectedArticleSlug,
  onSelectArticle,
  onBackToArticles,
}) => {
  const currentArticle = articles.find((a) => a.slug === selectedArticleSlug);

  if (selectedArticleSlug && currentArticle) {
    return (
      <div className="min-h-screen bg-white text-neutral-950 py-16 sm:py-20">
        <article className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <button
            onClick={onBackToArticles}
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-neutral-500 hover:text-neutral-950 mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Toutes les Actualités</span>
          </button>

          <header className="space-y-4 pb-8 border-b border-neutral-200">
            {currentArticle.japaneseKicker && (
              <div className="font-jp text-xs font-semibold text-[#FF4F93] tracking-widest uppercase">
                {currentArticle.japaneseKicker}
              </div>
            )}

            <div className="text-xs font-mono text-neutral-500 flex items-center gap-4">
              <span>{currentArticle.date}</span>
              <span>·</span>
              <span>Par {currentArticle.author}</span>
            </div>

            <h1 className="font-horrendo text-3xl sm:text-5xl font-bold tracking-tight text-neutral-950 leading-tight">
              {currentArticle.title}
            </h1>
          </header>

          <div className="py-10 prose prose-neutral max-w-none text-sm sm:text-base leading-relaxed text-neutral-800 font-light whitespace-pre-line space-y-6">
            {currentArticle.content}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white text-neutral-950 py-16 sm:py-20">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <header className="pb-10 border-b border-neutral-200">
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#FF4F93] mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>COMMUNIQUÉS & DISPATCHES OFFICIELS</span>
            <span className="text-neutral-400">/</span>
            <span className="font-jp">会報・通信</span>
          </div>

          <h1 className="font-horrendo text-4xl sm:text-5xl font-bold tracking-tight text-neutral-950">
            ACTUALITÉS DU CLUB
          </h1>

          <p className="text-sm text-neutral-600 font-light mt-3 max-w-xl leading-relaxed">
            Écrits, bilans d'ateliers et notes culturelles rédigés par les membres du Senegal ISM Japan Club.
          </p>
        </header>

        <div className="mt-12 divide-y divide-neutral-200">
          {articles.map((art) => (
            <article
              key={art.id}
              onClick={() => onSelectArticle(art.slug)}
              className="py-10 group cursor-pointer space-y-3"
            >
              <div className="flex items-center justify-between text-xs font-mono text-neutral-500">
                <span className="text-[#FF4F93] uppercase">{art.japaneseKicker || 'COMMUNIQUÉ'}</span>
                <span>{art.date}</span>
              </div>

              <h2 className="font-horrendo text-2xl sm:text-3xl font-bold text-neutral-950 group-hover:text-[#FF4F93] transition-colors leading-snug">
                {art.title}
              </h2>

              <p className="text-sm text-neutral-600 font-light leading-relaxed max-w-3xl">
                {art.excerpt}
              </p>

              <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-neutral-950 group-hover:text-[#FF4F93] transition-colors">
                <span>Lire la suite</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};
