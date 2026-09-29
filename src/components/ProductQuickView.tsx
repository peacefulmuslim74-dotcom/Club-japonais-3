import React, { useState } from 'react';
import { X, Check, Star, ShieldCheck, Truck, RotateCcw, Sparkles } from 'lucide-react';
import { Product, StoreSettings, Review } from '../types';
import { sampleReviews } from '../data/mockData';

interface ProductQuickViewProps {
  product: Product;
  settings: StoreSettings;
  onClose: () => void;
  onAddToCart: (product: Product, quantity: number) => void;
  onOpenAIScribe?: (product: Product) => void;
}

export const ProductQuickView: React.FC<ProductQuickViewProps> = ({
  product,
  settings,
  onClose,
  onAddToCart,
  onOpenAIScribe,
}) => {
  const [selectedImage, setSelectedImage] = useState(product.image);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [activeTab, setActiveTab] = useState<'specs' | 'reviews'>('specs');

  const reviews: Review[] = sampleReviews[product.id] || [
    {
      id: 'default-1',
      author: 'Verified Buyer',
      rating: 5,
      date: 'Recent verified purchase',
      title: 'Exceptional craftsmanship & materials',
      comment: 'Arrived packaged like a bespoke luxury artifact. Exceeds photographs in material density and finishing.',
      verified: true,
    },
  ];

  const handleAdd = () => {
    onAddToCart(product, quantity);
    setAdded(true);
    setTimeout(() => setAdded(false), 1400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-4xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-neutral-400 hover:text-white bg-neutral-950/60 hover:bg-neutral-950 rounded-full border border-neutral-800 transition-colors"
          aria-label="Close modal"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Gallery Column */}
          <div className="p-6 bg-neutral-950 flex flex-col justify-between gap-4 border-b md:border-b-0 md:border-r border-neutral-800">
            <div className="aspect-square w-full rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800">
              <img
                src={selectedImage}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Thumbnail selector */}
            <div className="flex gap-2 overflow-x-auto pb-1">
              {[product.image, ...(product.gallery || [])].map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(img)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border transition-all shrink-0 ${
                    selectedImage === img
                      ? 'border-white ring-1 ring-white'
                      : 'border-neutral-800 opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Guarantee bullets */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-neutral-800 text-[11px] text-neutral-400">
              <div className="flex flex-col items-center text-center gap-1">
                <Truck className="w-3.5 h-3.5 text-neutral-300" />
                <span>Express Worldwide</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-neutral-300" />
                <span>Lifetime Warranty</span>
              </div>
              <div className="flex flex-col items-center text-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-neutral-300" />
                <span>30-Day Returns</span>
              </div>
            </div>
          </div>

          {/* Details Column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between max-h-[80vh] overflow-y-auto">
            <div>
              {/* Category & Status */}
              <div className="flex items-center justify-between text-xs text-neutral-400 mb-2 font-mono">
                <span>{product.category}</span>
                <span className="text-neutral-500">SKU: {product.sku}</span>
              </div>

              <h2 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
                {product.name}
              </h2>

              {/* Price and Ratings */}
              <div className="flex items-center gap-4 mt-3 pb-4 border-b border-neutral-800">
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-bold text-white tracking-tight">
                    {settings.currencySymbol}
                    {product.price}
                  </span>
                  {product.compareAtPrice && (
                    <span className="text-sm text-neutral-500 line-through">
                      {settings.currencySymbol}
                      {product.compareAtPrice}
                    </span>
                  )}
                </div>

                <div className="flex items-center gap-1.5 text-xs text-neutral-300 pl-4 border-l border-neutral-800">
                  <div className="flex text-amber-400">
                    {'★'.repeat(Math.round(product.rating))}
                  </div>
                  <span className="font-semibold">{product.rating}</span>
                  <span className="text-neutral-500">({product.reviewCount} reviews)</span>
                </div>
              </div>

              {/* Tabs */}
              <div className="flex items-center gap-2 mt-4 border-b border-neutral-800 pb-2">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`text-xs font-medium pb-1 transition-colors ${
                    activeTab === 'specs'
                      ? 'text-white border-b-2 border-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Story & Specifications
                </button>
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`text-xs font-medium pb-1 transition-colors ${
                    activeTab === 'reviews'
                      ? 'text-white border-b-2 border-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Verified Reviews ({reviews.length})
                </button>
              </div>

              {/* Tab Content */}
              {activeTab === 'specs' ? (
                <div className="mt-4 space-y-4">
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                    {product.description}
                  </p>

                  {product.story && (
                    <blockquote className="border-l-2 border-neutral-700 pl-3 italic text-xs text-neutral-400">
                      "{product.story}"
                    </blockquote>
                  )}

                  <div className="space-y-1.5 pt-2">
                    <h4 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider font-mono">
                      Highlights & Build
                    </h4>
                    <ul className="space-y-1 text-xs text-neutral-300">
                      {product.features.map((feat, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <span className="text-neutral-500 mt-0.5">•</span>
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  {reviews.map((r) => (
                    <div
                      key={r.id}
                      className="p-3 rounded-lg bg-neutral-950/60 border border-neutral-800/80 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-neutral-200">{r.author}</span>
                        <span className="text-[11px] text-neutral-500">{r.date}</span>
                      </div>
                      <div className="text-amber-400 text-xs mb-1">
                        {'★'.repeat(r.rating)}
                      </div>
                      <div className="font-medium text-neutral-300 mb-0.5">{r.title}</div>
                      <p className="text-neutral-400 leading-relaxed">{r.comment}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="pt-6 mt-6 border-t border-neutral-800 space-y-3">
              <div className="flex items-center gap-3">
                {/* Quantity selector */}
                <div className="flex items-center border border-neutral-700 bg-neutral-950 rounded-lg overflow-hidden text-xs">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-3 py-2 font-mono text-white min-w-8 text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="px-3 py-2 text-neutral-400 hover:text-white hover:bg-neutral-800 transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Add to bag button */}
                <button
                  onClick={handleAdd}
                  disabled={product.stock <= 0}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg font-medium text-xs transition-colors ${
                    product.stock <= 0
                      ? 'bg-neutral-800 text-neutral-500 cursor-not-allowed'
                      : added
                      ? 'bg-emerald-600 text-white'
                      : 'bg-white hover:bg-neutral-200 text-neutral-950'
                  }`}
                >
                  {product.stock <= 0 ? (
                    'Sold Out'
                  ) : added ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>Added to Bag</span>
                    </>
                  ) : (
                    <span>Add to Bag · {settings.currencySymbol}{product.price * quantity}</span>
                  )}
                </button>
              </div>

              {/* AI Assistant link in quickview */}
              {onOpenAIScribe && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenAIScribe(product);
                  }}
                  className="w-full flex items-center justify-center gap-1.5 py-1.5 text-xs text-amber-300 hover:text-amber-200 bg-amber-500/5 hover:bg-amber-500/10 border border-amber-500/20 rounded-md transition-colors"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                  <span>Open in Gemini AI Merchandising Studio</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
