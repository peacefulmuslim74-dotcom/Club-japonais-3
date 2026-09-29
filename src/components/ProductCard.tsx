import React from 'react';
import { Eye, Plus, Check } from 'lucide-react';
import { Product, StoreSettings } from '../types';

interface ProductCardProps {
  product: Product;
  settings: StoreSettings;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  settings,
  onQuickView,
  onAddToCart,
}) => {
  const [justAdded, setJustAdded] = React.useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1200);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative flex flex-col bg-neutral-900/50 border border-neutral-800/80 rounded-xl overflow-hidden hover:border-neutral-700 transition-all duration-300 cursor-pointer"
    >
      {/* Image Container */}
      <div className="relative aspect-4/3 sm:aspect-square w-full bg-neutral-950 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          loading="lazy"
        />

        {/* Hover Action Overlay */}
        <div className="absolute inset-0 bg-neutral-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-between p-4 pointer-events-none">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900/90 hover:bg-neutral-900 text-neutral-200 text-xs font-medium rounded-md backdrop-blur-sm transition-colors border border-neutral-700/60"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Inspect</span>
          </button>

          <button
            type="button"
            onClick={handleAdd}
            className={`pointer-events-auto flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              justAdded
                ? 'bg-emerald-600 text-white'
                : 'bg-white hover:bg-neutral-200 text-neutral-950'
            }`}
          >
            {justAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>Quick Add</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-4 flex flex-col flex-1 justify-between gap-3">
        <div>
          {/* Unboxed Metadata with subtle typographic separator */}
          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono tracking-wider uppercase mb-1.5">
            <span>{product.category}</span>
            <span aria-hidden="true" className="text-neutral-600">·</span>
            <span>{product.stock > 0 ? `${product.stock} in stock` : 'Backorder'}</span>
          </div>

          <h3 className="text-sm font-semibold text-white group-hover:text-neutral-200 transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-neutral-400 line-clamp-2 mt-1 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Pricing & Rating */}
        <div className="flex items-baseline justify-between pt-2 border-t border-neutral-800/60 text-xs">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold text-white tracking-tight">
              {settings.currencySymbol}
              {product.price}
            </span>
            {product.compareAtPrice && (
              <span className="text-xs text-neutral-500 line-through">
                {settings.currencySymbol}
                {product.compareAtPrice}
              </span>
            )}
          </div>

          <div className="text-[11px] text-neutral-400 flex items-center gap-1">
            <span className="text-amber-400">★</span>
            <span className="font-medium text-neutral-200">{product.rating}</span>
            <span className="text-neutral-500">({product.reviewCount})</span>
          </div>
        </div>
      </div>
    </div>
  );
};
