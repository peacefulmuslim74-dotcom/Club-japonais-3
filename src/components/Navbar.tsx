import React from 'react';
import { ShoppingBag, Search, Sparkles, LayoutDashboard, Store, SlidersHorizontal, Package, FileText, ChevronRight } from 'lucide-react';
import { StoreSettings } from '../types';

interface NavbarProps {
  settings: StoreSettings;
  currentView: 'store' | 'admin';
  adminTab: 'overview' | 'inventory' | 'orders' | 'ai-studio' | 'settings';
  setAdminTab: (tab: 'overview' | 'inventory' | 'orders' | 'ai-studio' | 'settings') => void;
  setCurrentView: (view: 'store' | 'admin') => void;
  cartCount: number;
  openCart: () => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  settings,
  currentView,
  adminTab,
  setAdminTab,
  setCurrentView,
  cartCount,
  openCart,
  searchQuery,
  setSearchQuery,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-neutral-950/90 backdrop-blur-md border-b border-neutral-800/80 transition-colors">
      {/* Announcement Bar */}
      {settings.bannerActive && (
        <div className="bg-neutral-900 border-b border-neutral-800 text-[11px] uppercase tracking-widest text-neutral-400 py-1.5 px-4 text-center font-medium">
          {settings.bannerAnnouncement}
        </div>
      )}

      {/* Main Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand & Mode Switcher */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => setCurrentView('store')}
            className="flex items-center gap-2 text-left group"
          >
            <span className="font-mono text-xl font-bold tracking-tighter text-white group-hover:text-neutral-200 transition-colors">
              {settings.storeName}
            </span>
            <span className="text-[10px] tracking-widest text-neutral-500 uppercase font-semibold">
              STUDIO
            </span>
          </button>

          {/* Mode Switcher Segmented Control */}
          <div className="flex items-center p-1 bg-neutral-900 border border-neutral-800 rounded-lg text-xs font-medium">
            <button
              onClick={() => setCurrentView('store')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                currentView === 'store'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              <span>Storefront</span>
            </button>
            <button
              onClick={() => setCurrentView('admin')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md transition-all ${
                currentView === 'admin'
                  ? 'bg-neutral-800 text-white shadow-sm'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Merchant OS</span>
            </button>
          </div>
        </div>

        {/* Center: Search in Storefront, or Admin Tabs in Admin */}
        <div className="hidden md:flex flex-1 max-w-md mx-4">
          {currentView === 'store' ? (
            <div className="relative w-full">
              <Search className="w-4 h-4 text-neutral-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products, materials, specs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-600 transition-colors"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-300 text-xs px-1"
                >
                  ✕
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-1 bg-neutral-900/60 p-1 rounded-lg border border-neutral-800/80 text-xs">
              <button
                onClick={() => setAdminTab('overview')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  adminTab === 'overview'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Analytics
              </button>
              <button
                onClick={() => setAdminTab('inventory')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  adminTab === 'inventory'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Catalog
              </button>
              <button
                onClick={() => setAdminTab('orders')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  adminTab === 'orders'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Orders
              </button>
              <button
                onClick={() => setAdminTab('ai-studio')}
                className={`flex items-center gap-1 px-3 py-1 rounded-md transition-colors ${
                  adminTab === 'ai-studio'
                    ? 'bg-amber-500/10 text-amber-300 font-medium border border-amber-500/20'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                <Sparkles className="w-3 h-3 text-amber-400" />
                <span>AI Studio</span>
              </button>
              <button
                onClick={() => setAdminTab('settings')}
                className={`px-3 py-1 rounded-md transition-colors ${
                  adminTab === 'settings'
                    ? 'bg-neutral-800 text-white font-medium'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Config
              </button>
            </div>
          )}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {currentView === 'store' ? (
            <>
              <button
                onClick={() => {
                  setCurrentView('admin');
                  setAdminTab('ai-studio');
                }}
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-neutral-800 bg-neutral-900/60 hover:bg-neutral-800 text-xs font-medium text-amber-300 transition-colors"
                title="Launch Gemini AI Merchandising Studio"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>AI Copywriter</span>
              </button>

              <button
                onClick={openCart}
                className="relative flex items-center gap-2 px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-medium text-white transition-colors"
                aria-label="Shopping Bag"
              >
                <ShoppingBag className="w-4 h-4 text-neutral-300" />
                <span className="hidden sm:inline">Bag</span>
                <span className="bg-white text-neutral-950 text-[11px] font-bold rounded-full w-5 h-5 flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setCurrentView('store')}
              className="flex items-center gap-1 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-lg text-xs font-medium text-neutral-200 transition-colors"
            >
              <span>Back to Store</span>
              <ChevronRight className="w-3.5 h-3.5 text-neutral-400" />
            </button>
          )}
        </div>
      </div>

      {/* Mobile Submenu for Admin */}
      {currentView === 'admin' && (
        <div className="md:hidden flex items-center overflow-x-auto px-4 py-2 bg-neutral-900/80 border-t border-neutral-800 gap-1 text-xs">
          <button
            onClick={() => setAdminTab('overview')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              adminTab === 'overview' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Analytics
          </button>
          <button
            onClick={() => setAdminTab('inventory')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              adminTab === 'inventory' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Catalog
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              adminTab === 'orders' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Orders
          </button>
          <button
            onClick={() => setAdminTab('ai-studio')}
            className={`px-3 py-1 rounded-md whitespace-nowrap flex items-center gap-1 ${
              adminTab === 'ai-studio' ? 'bg-amber-500/20 text-amber-300' : 'text-neutral-400'
            }`}
          >
            <Sparkles className="w-3 h-3" />
            AI Studio
          </button>
          <button
            onClick={() => setAdminTab('settings')}
            className={`px-3 py-1 rounded-md whitespace-nowrap ${
              adminTab === 'settings' ? 'bg-neutral-800 text-white' : 'text-neutral-400'
            }`}
          >
            Config
          </button>
        </div>
      )}
    </header>
  );
};
