import React, { useState, useMemo } from 'react';
import { ArrowDown, Sparkles, Filter, SlidersHorizontal, ArrowUpRight, Compass, Shield, Leaf, HeartHandshake } from 'lucide-react';
import { Product, StoreSettings } from '../types';
import { ProductCard } from './ProductCard';

interface StorefrontProps {
  products: Product[];
  settings: StoreSettings;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product) => void;
  onOpenAIStudio: () => void;
}

export const Storefront: React.FC<StorefrontProps> = ({
  products,
  settings,
  searchQuery,
  setSearchQuery,
  onQuickView,
  onAddToCart,
  onOpenAIStudio,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const categories = ['All', 'Audio & Tech', 'Workspace', 'Home & Living', 'Apparel & Leather'];

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        const matchesSearch =
          searchQuery === '' ||
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
        return matchesCategory && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setNewsletterSubscribed(true);
      setNewsletterEmail('');
    }
  };

  return (
    <div className="min-h-screen pb-20">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-neutral-950 border-b border-neutral-850 py-16 sm:py-24">
        {/* Subtle radial ambient glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-neutral-800/20 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            {/* Clean unboxed kicker */}
            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-neutral-400 uppercase mb-4">
              <span>Collection 2026</span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span>Industrial Precision & Organic Warmth</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.08]">
              Artifacts for purposeful work and deliberate living.
            </h1>

            <p className="mt-5 text-sm sm:text-base text-neutral-400 max-w-xl font-light leading-relaxed">
              Every piece in our catalog is engineered to eliminate sensory clutter. Crafted from solid walnut, cast brass, raw silk, and uncompromised acoustics.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <a
                href="#catalog"
                className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs rounded-xl flex items-center gap-2 transition-all shadow-lg shadow-white/5"
              >
                <span>Browse Catalog</span>
                <ArrowDown className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={onOpenAIStudio}
                className="px-4 py-2.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 text-neutral-200 hover:text-white font-medium text-xs rounded-xl flex items-center gap-2 transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Launch Gemini Merchandiser</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Craft Manifesto Bar */}
      <section className="border-b border-neutral-850 bg-neutral-950/60 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-xs text-neutral-400">
            <div className="flex items-start gap-3">
              <Shield className="w-4 h-4 text-neutral-200 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Bespoke Longevity</strong>
                <span className="text-[11px] text-neutral-400">Engineered for decades of repairable utility.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Leaf className="w-4 h-4 text-neutral-200 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Zero-Plastic Packing</strong>
                <span className="text-[11px] text-neutral-400">100% biodegradable unbleached pulp packaging.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Compass className="w-4 h-4 text-neutral-200 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Carbon-Neutral Freight</strong>
                <span className="text-[11px] text-neutral-400">Automated carbon offsets on every international parcel.</span>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <HeartHandshake className="w-4 h-4 text-neutral-200 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white block font-medium">Direct Artisan Co-op</strong>
                <span className="text-[11px] text-neutral-400">Collaborating directly with master fabricators.</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog & Filter Section */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Controls row */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-neutral-850">
          {/* Category Segmented Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedCategory === cat
                    ? 'bg-neutral-800 text-white shadow-sm'
                    : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900/50 hover:bg-neutral-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Sort Selector & Results Count */}
          <div className="flex items-center justify-between sm:justify-end gap-3 text-xs">
            <span className="text-neutral-500 font-mono">
              {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
            </span>

            <div className="flex items-center gap-2 bg-neutral-900 border border-neutral-800 rounded-lg px-2.5 py-1.5 text-neutral-300">
              <SlidersHorizontal className="w-3.5 h-3.5 text-neutral-400" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                aria-label="Sort products by"
                className="bg-transparent text-xs text-white focus:outline-none cursor-pointer"
              >
                <option value="featured" className="bg-neutral-900">Featured Curation</option>
                <option value="price-asc" className="bg-neutral-900">Price: Low to High</option>
                <option value="price-desc" className="bg-neutral-900">Price: High to Low</option>
                <option value="rating" className="bg-neutral-900">Highest Rated</option>
              </select>
            </div>
          </div>
        </div>

        {/* Active search banner if filtering */}
        {searchQuery && (
          <div className="mt-4 flex items-center justify-between bg-neutral-900/80 border border-neutral-800 rounded-lg px-4 py-2 text-xs text-neutral-300">
            <span>
              Searching for: <strong className="text-white font-mono">"{searchQuery}"</strong>
            </span>
            <button
              onClick={() => setSearchQuery('')}
              className="text-neutral-400 hover:text-white underline text-[11px]"
            >
              Clear Search
            </button>
          </div>
        )}

        {/* Product Grid */}
        {filteredProducts.length === 0 ? (
          <div className="py-20 text-center text-neutral-500">
            <p className="text-sm">No products found matching your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-3 px-4 py-2 bg-neutral-800 text-xs text-neutral-200 rounded-lg"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                settings={settings}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
              />
            ))}
          </div>
        )}
      </section>

      {/* Featured Editorial Spotlight */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <div className="relative rounded-2xl overflow-hidden bg-neutral-900 border border-neutral-800 grid grid-cols-1 lg:grid-cols-2">
          <div className="p-8 sm:p-12 flex flex-col justify-center">
            <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Atelier Note
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Quiet computing and the return of tactile mass.
            </h2>
            <p className="mt-4 text-xs sm:text-sm text-neutral-400 font-light leading-relaxed">
              We reject the brittle plastic disposable consumerism that has dominated modern tech. Every volume dial, chassis bezel, and desk surface is made from unyielding aluminum, solid walnut, and natural fibers meant to age like vintage wristwatches.
            </p>
            <div className="mt-6 flex items-center gap-4">
              <button
                onClick={() => setSelectedCategory('Workspace')}
                className="text-xs font-semibold text-white flex items-center gap-1 hover:underline"
              >
                <span>Explore Workspace Setup</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
          <div className="relative min-h-[260px] lg:min-h-full">
            <img
              src="https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?auto=format&fit=crop&w=1200&q=80"
              alt="Workspace editorial"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Dispatch Newsletter Subscription */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 text-center mt-24 pt-12 border-t border-neutral-850">
        <div className="text-[11px] font-mono uppercase tracking-widest text-neutral-500 mb-2">
          Private Dispatch
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-white tracking-tight">
          Limited editions & atelier journal releases.
        </h3>
        <p className="text-xs text-neutral-400 mt-2 font-light">
          We send infrequent dispatches regarding small-batch artisan drops and design essays. No spam.
        </p>

        {newsletterSubscribed ? (
          <div className="mt-6 p-3 bg-neutral-900 border border-neutral-800 rounded-xl text-xs text-emerald-400 font-medium inline-block">
            ✓ You have been added to the private dispatch list. Check your inbox for the welcome code.
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="mt-6 flex max-w-md mx-auto gap-2">
            <input
              type="email"
              required
              placeholder="Your email address"
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-1 bg-neutral-900 border border-neutral-800 rounded-xl px-4 py-2.5 text-xs text-white placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600"
            />
            <button
              type="submit"
              className="px-5 py-2.5 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs rounded-xl transition-colors shrink-0"
            >
              Subscribe
            </button>
          </form>
        )}
      </section>
    </div>
  );
};
