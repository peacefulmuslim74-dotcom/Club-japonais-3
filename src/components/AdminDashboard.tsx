import React, { useState } from 'react';
import {
  TrendingUp,
  Package,
  ShoppingBag,
  DollarSign,
  AlertTriangle,
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  ExternalLink,
  CheckCircle,
  Truck,
  Clock,
  Search,
  Filter,
  ArrowUpRight,
  Download,
} from 'lucide-react';
import { Product, Order, StoreSettings } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  settings: StoreSettings;
  adminTab: 'overview' | 'inventory' | 'orders' | 'settings';
  setAdminTab: (tab: any) => void;
  onUpdateProduct: (product: Product) => void;
  onAddProduct: (product: Product) => void;
  onDeleteProduct: (productId: string) => void;
  onUpdateOrder: (order: Order) => void;
  onUpdateSettings: (settings: StoreSettings) => void;
  onOpenAIScribeForProduct: (productId: string) => void;
  onResetData: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  products,
  orders,
  settings,
  adminTab,
  setAdminTab,
  onUpdateProduct,
  onAddProduct,
  onDeleteProduct,
  onUpdateOrder,
  onUpdateSettings,
  onOpenAIScribeForProduct,
  onResetData,
}) => {
  // New Product Modal State
  const [showAddModal, setShowAddModal] = useState(false);
  const [newProdName, setNewProdName] = useState('');
  const [newProdCategory, setNewProdCategory] = useState<Product['category']>('Workspace');
  const [newProdPrice, setNewProdPrice] = useState('149');
  const [newProdStock, setNewProdStock] = useState('25');
  const [newProdImage, setNewProdImage] = useState(
    'https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=1000&q=80'
  );
  const [newProdDescription, setNewProdDescription] = useState(
    'Minimalist titanium smart timepiece with sapphire crystal glass and tactile scroll crown.'
  );

  // Filter & Search states
  const [inventorySearch, setInventorySearch] = useState('');
  const [orderFilterStatus, setOrderFilterStatus] = useState<string>('All');
  const [orderSearch, setOrderSearch] = useState('');

  // Selected Order for Modal
  const [inspectOrder, setInspectOrder] = useState<Order | null>(null);

  // Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.status !== 'Cancelled' ? o.total : 0), 0);
  const totalItemsSold = orders.reduce(
    (sum, o) => sum + o.items.reduce((s, it) => s + it.quantity, 0),
    0
  );
  const avgOrderValue = orders.length > 0 ? totalRevenue / orders.length : 0;
  const lowStockCount = products.filter((p) => p.stock < 20).length;

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newProduct: Product = {
      id: `prod-${Date.now()}`,
      name: newProdName,
      category: newProdCategory,
      price: parseFloat(newProdPrice) || 99,
      stock: parseInt(newProdStock, 10) || 10,
      sku: `ARN-${newProdCategory.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
      rating: 5.0,
      reviewCount: 1,
      image: newProdImage,
      gallery: [newProdImage],
      description: newProdDescription,
      features: ['Precision-machined high grade material', 'Hand-finished edge contours'],
      tags: ['New Release', 'Minimalist', 'Atelier'],
      status: 'active',
      isFeatured: true,
    };

    onAddProduct(newProduct);
    setShowAddModal(false);
    setNewProdName('');
  };

  const handleExportData = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify({ products, orders, settings }, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `arona-commerce-backup-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Overview Analytics View */}
      {adminTab === 'overview' && (
        <div className="space-y-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
              <span>Executive Operations</span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span>Real-Time Commerce Metrics</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Merchant Command Center
            </h1>
          </div>

          {/* Top 4 KPI Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Total Net Revenue</span>
                <DollarSign className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2 font-mono">
                {settings.currencySymbol}
                {(totalRevenue + 47250).toLocaleString(undefined, { minimumFractionDigits: 2 })}
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-emerald-400 mt-2 font-medium">
                <TrendingUp className="w-3.5 h-3.5" />
                <span>+18.4% vs previous 30 days</span>
              </div>
            </div>

            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Total Orders</span>
                <ShoppingBag className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2 font-mono">
                {orders.length + 310}
              </div>
              <div className="text-[11px] text-neutral-400 mt-2">
                <span>{orders.filter((o) => o.status === 'Processing').length} awaiting fulfillment</span>
              </div>
            </div>

            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Average Order Value</span>
                <TrendingUp className="w-4 h-4 text-neutral-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2 font-mono">
                {settings.currencySymbol}
                {(avgOrderValue || 215).toFixed(2)}
              </div>
              <div className="text-[11px] text-neutral-400 mt-2">
                <span>Highest cohort: North America</span>
              </div>
            </div>

            <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl">
              <div className="flex items-center justify-between text-xs text-neutral-400">
                <span>Inventory Alert</span>
                <AlertTriangle className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white mt-2 font-mono">
                {lowStockCount} Low Items
              </div>
              <div className="text-[11px] text-amber-400/90 mt-2">
                <span>Lead time reorder required</span>
              </div>
            </div>
          </div>

          {/* Revenue Chart Visual & Top Sellers */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* 7-Day Revenue Velocity Chart */}
            <div className="lg:col-span-8 p-6 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-sm font-semibold text-white">Daily Revenue Trajectory</h3>
                    <p className="text-xs text-neutral-400">Settled card transactions across all storefronts</p>
                  </div>
                  <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    +24.1% WoW
                  </span>
                </div>

                {/* SVG Visual Chart */}
                <div className="h-48 w-full mt-6">
                  <svg className="w-full h-full" viewBox="0 0 700 160" preserveAspectRatio="none">
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.25" />
                        <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                      </linearGradient>
                    </defs>
                    {/* Area fill */}
                    <path
                      d="M 0,140 Q 116,90 233,110 T 466,60 T 700,20 L 700,160 L 0,160 Z"
                      fill="url(#revenueGradient)"
                    />
                    {/* Stroke line */}
                    <path
                      d="M 0,140 Q 116,90 233,110 T 466,60 T 700,20"
                      fill="none"
                      stroke="#ffffff"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                    />
                    {/* Data Points */}
                    {[
                      { x: 0, y: 140, val: '$3.4k' },
                      { x: 116, y: 95, val: '$5.2k' },
                      { x: 233, y: 110, val: '$4.8k' },
                      { x: 350, y: 80, val: '$6.1k' },
                      { x: 466, y: 60, val: '$7.4k' },
                      { x: 583, y: 40, val: '$8.9k' },
                      { x: 700, y: 20, val: '$11.2k' },
                    ].map((pt, i) => (
                      <circle key={i} cx={pt.x} cy={pt.y} r="4" fill="#000000" stroke="#ffffff" strokeWidth="2" />
                    ))}
                  </svg>
                </div>

                {/* Days labels */}
                <div className="flex justify-between text-[11px] text-neutral-500 font-mono pt-3 border-t border-neutral-800">
                  <span>Mon</span>
                  <span>Tue</span>
                  <span>Wed</span>
                  <span>Thu</span>
                  <span>Fri</span>
                  <span>Sat</span>
                  <span>Today</span>
                </div>
              </div>

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>Peak conversion window: 14:00 - 18:00 UTC</span>
                <span className="font-mono text-white">Cart-to-Order Conversion: 3.42%</span>
              </div>
            </div>

            {/* Quick Actions & Recent Orders Preview */}
            <div className="lg:col-span-4 p-6 bg-neutral-900 border border-neutral-800 rounded-xl flex flex-col justify-between">
              <div>
                <h3 className="text-sm font-semibold text-white mb-1">Recent Fulfillments</h3>
                <p className="text-xs text-neutral-400 mb-4">Latest inbound merchant orders</p>

                <div className="space-y-3">
                  {orders.slice(0, 3).map((o) => (
                    <div
                      key={o.id}
                      onClick={() => setInspectOrder(o)}
                      className="p-3 bg-neutral-950 rounded-lg border border-neutral-800/80 hover:border-neutral-700 cursor-pointer transition-colors text-xs"
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono font-semibold text-white">{o.id}</span>
                        <span
                          className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${
                            o.status === 'Delivered'
                              ? 'bg-emerald-500/10 text-emerald-400'
                              : o.status === 'Shipped'
                              ? 'bg-blue-500/10 text-blue-400'
                              : 'bg-amber-500/10 text-amber-400'
                          }`}
                        >
                          {o.status}
                        </span>
                      </div>
                      <div className="text-neutral-400 text-[11px]">{o.customerName}</div>
                      <div className="flex justify-between items-baseline mt-1 font-mono text-neutral-300">
                        <span>{o.items.length} items</span>
                        <span className="font-bold text-white">
                          {settings.currencySymbol}
                          {o.total.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-neutral-800 flex gap-2">
                <button
                  onClick={() => setAdminTab('orders')}
                  className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-lg font-medium transition-colors"
                >
                  Manage All Orders
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Catalog & Inventory Tab */}
      {adminTab === 'inventory' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                <span>Merchandising Catalog</span>
                <span aria-hidden="true" className="text-neutral-600">/</span>
                <span>Active SKU Management</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Product Catalog ({products.length})
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowAddModal(true)}
                className="px-4 py-2 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>
          </div>

          {/* Search bar */}
          <div className="relative max-w-md">
            <Search className="w-4 h-4 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by product name, SKU, or category..."
              value={inventorySearch}
              onChange={(e) => setInventorySearch(e.target.value)}
              className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-9 pr-4 py-2 text-xs text-white focus:outline-none focus:border-neutral-700"
            />
          </div>

          {/* Products Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Item & SKU</th>
                    <th className="py-3 px-4">Category</th>
                    <th className="py-3 px-4">Retail Price</th>
                    <th className="py-3 px-4">Stock Unit</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  {products
                    .filter(
                      (p) =>
                        p.name.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                        p.sku.toLowerCase().includes(inventorySearch.toLowerCase()) ||
                        p.category.toLowerCase().includes(inventorySearch.toLowerCase())
                    )
                    .map((p) => (
                      <tr key={p.id} className="hover:bg-neutral-850/50 transition-colors">
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={p.image}
                              alt={p.name}
                              className="w-10 h-10 rounded-lg object-cover bg-neutral-950 shrink-0 border border-neutral-800"
                            />
                            <div>
                              <div className="font-semibold text-white line-clamp-1">{p.name}</div>
                              <div className="font-mono text-[11px] text-neutral-500">{p.sku}</div>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-400 font-mono">{p.category}</td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-1 font-mono text-white">
                            <span>{settings.currencySymbol}</span>
                            <input
                              type="number"
                              value={p.price}
                              onChange={(e) =>
                                onUpdateProduct({
                                  ...p,
                                  price: parseFloat(e.target.value) || 0,
                                })
                              }
                              className="w-20 bg-neutral-950 border border-neutral-800 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                            />
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="flex items-center gap-2 font-mono">
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) =>
                                onUpdateProduct({
                                  ...p,
                                  stock: parseInt(e.target.value, 10) || 0,
                                })
                              }
                              className="w-16 bg-neutral-950 border border-neutral-800 rounded px-1.5 py-0.5 text-xs text-white focus:outline-none focus:border-neutral-600"
                            />
                            <span
                              className={`text-[10px] ${
                                p.stock < 15 ? 'text-amber-400 font-bold' : 'text-neutral-500'
                              }`}
                            >
                              {p.stock < 15 ? 'Low' : 'OK'}
                            </span>
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                              p.status === 'active'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : 'bg-neutral-800 text-neutral-400'
                            }`}
                          >
                            {p.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => onOpenAIScribeForProduct(p.id)}
                              className="p-1.5 hover:bg-neutral-800 rounded-md text-amber-400 transition-colors"
                              title="Optimize Copy in Gemini AI Studio"
                            >
                              <Sparkles className="w-3.5 h-3.5" />
                            </button>
                            <button
                              onClick={() => onDeleteProduct(p.id)}
                              className="p-1.5 hover:bg-neutral-800 rounded-md text-neutral-500 hover:text-red-400 transition-colors"
                              title="Delete Product"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Orders Manager Tab */}
      {adminTab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
                <span>Fulfillment Engine</span>
                <span aria-hidden="true" className="text-neutral-600">/</span>
                <span>Inbound Orders</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Order Operations ({orders.length})
              </h1>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1 bg-neutral-900 border border-neutral-800 p-1 rounded-lg text-xs">
              {['All', 'Processing', 'Shipped', 'Delivered'].map((status) => (
                <button
                  key={status}
                  onClick={() => setOrderFilterStatus(status)}
                  className={`px-3 py-1 rounded-md transition-colors ${
                    orderFilterStatus === status
                      ? 'bg-neutral-800 text-white font-medium'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  {status}
                </button>
              ))}
            </div>
          </div>

          {/* Orders Table */}
          <div className="bg-neutral-900 border border-neutral-800 rounded-xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-neutral-950 text-neutral-400 font-mono uppercase text-[11px] border-b border-neutral-800">
                  <tr>
                    <th className="py-3 px-4">Order ID & Date</th>
                    <th className="py-3 px-4">Customer</th>
                    <th className="py-3 px-4">Items</th>
                    <th className="py-3 px-4">Total Amount</th>
                    <th className="py-3 px-4">Status</th>
                    <th className="py-3 px-4 text-right">Fulfillment Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-800 text-neutral-300">
                  {orders
                    .filter(
                      (o) =>
                        orderFilterStatus === 'All' || o.status === orderFilterStatus
                    )
                    .map((o) => (
                      <tr key={o.id} className="hover:bg-neutral-850/50 transition-colors">
                        <td className="py-3 px-4">
                          <button
                            onClick={() => setInspectOrder(o)}
                            className="font-mono font-semibold text-white hover:underline text-left"
                          >
                            {o.id}
                          </button>
                          <div className="text-[11px] text-neutral-500 font-mono mt-0.5">
                            {o.date}
                          </div>
                        </td>
                        <td className="py-3 px-4">
                          <div className="font-medium text-white">{o.customerName}</div>
                          <div className="text-[11px] text-neutral-400 font-mono">
                            {o.customerEmail}
                          </div>
                        </td>
                        <td className="py-3 px-4 text-neutral-300">
                          <span className="font-mono">{o.items.length} item(s)</span>
                          <div className="text-[11px] text-neutral-500 line-clamp-1">
                            {o.items.map((it) => it.name).join(', ')}
                          </div>
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-white">
                          {settings.currencySymbol}
                          {o.total.toFixed(2)}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                              o.status === 'Delivered'
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                : o.status === 'Shipped'
                                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}
                          >
                            {o.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            {o.status === 'Processing' && (
                              <button
                                onClick={() =>
                                  onUpdateOrder({
                                    ...o,
                                    status: 'Shipped',
                                    trackingCode: `DHL-EX-${Math.floor(1000000 + Math.random() * 9000000)}`,
                                    carrier: 'DHL Express Worldwide',
                                  })
                                }
                                className="px-2.5 py-1 bg-neutral-800 hover:bg-neutral-700 text-xs text-white rounded font-medium transition-colors"
                              >
                                Mark Shipped
                              </button>
                            )}

                            {o.status === 'Shipped' && (
                              <button
                                onClick={() =>
                                  onUpdateOrder({
                                    ...o,
                                    status: 'Delivered',
                                  })
                                }
                                className="px-2.5 py-1 bg-emerald-900/60 hover:bg-emerald-800 text-emerald-200 text-xs rounded font-medium transition-colors border border-emerald-700/60"
                              >
                                Mark Delivered
                              </button>
                            )}

                            <button
                              onClick={() => setInspectOrder(o)}
                              className="p-1 hover:bg-neutral-800 rounded text-neutral-400 hover:text-white"
                              title="Inspect Order Details"
                            >
                              <ExternalLink className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Settings Tab */}
      {adminTab === 'settings' && (
        <div className="max-w-3xl space-y-6">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-1">
              <span>Platform Settings</span>
              <span aria-hidden="true" className="text-neutral-600">/</span>
              <span>Storefront Customization</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
              Store Configuration
            </h1>
          </div>

          <div className="bg-neutral-900 border border-neutral-800 rounded-xl p-6 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Brand / Storefront Name
                </label>
                <input
                  type="text"
                  value={settings.storeName}
                  onChange={(e) => onUpdateSettings({ ...settings, storeName: e.target.value })}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Currency Symbol
                </label>
                <select
                  value={settings.currencySymbol}
                  onChange={(e) =>
                    onUpdateSettings({ ...settings, currencySymbol: e.target.value })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                >
                  <option value="$">$ (USD / CAD / AUD)</option>
                  <option value="€">€ (EUR)</option>
                  <option value="£">£ (GBP)</option>
                  <option value="¥">¥ (JPY)</option>
                  <option value="CHF ">CHF (Swiss Franc)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-neutral-300 mb-1">
                Storefront Slogan / Positioning
              </label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => onUpdateSettings({ ...settings, tagline: e.target.value })}
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Free Shipping Minimum Threshold
                </label>
                <div className="flex items-center gap-2">
                  <span className="text-neutral-500 font-mono">{settings.currencySymbol}</span>
                  <input
                    type="number"
                    value={settings.freeShippingThreshold}
                    onChange={(e) =>
                      onUpdateSettings({
                        ...settings,
                        freeShippingThreshold: parseFloat(e.target.value) || 0,
                      })
                    }
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Tax Rate (%)
                </label>
                <input
                  type="number"
                  value={settings.taxRatePercent}
                  onChange={(e) =>
                    onUpdateSettings({
                      ...settings,
                      taxRatePercent: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-neutral-800">
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-medium text-neutral-300">
                  Top Announcement Bar
                </label>
                <button
                  type="button"
                  onClick={() =>
                    onUpdateSettings({ ...settings, bannerActive: !settings.bannerActive })
                  }
                  className={`text-xs px-2.5 py-1 rounded font-medium transition-colors ${
                    settings.bannerActive
                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      : 'bg-neutral-800 text-neutral-400'
                  }`}
                >
                  {settings.bannerActive ? 'Active' : 'Disabled'}
                </button>
              </div>
              <input
                type="text"
                value={settings.bannerAnnouncement}
                onChange={(e) =>
                  onUpdateSettings({ ...settings, bannerAnnouncement: e.target.value })
                }
                className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600 font-mono uppercase"
              />
            </div>

            <div className="pt-6 border-t border-neutral-800 flex flex-wrap items-center justify-between gap-4">
              <button
                onClick={handleExportData}
                className="flex items-center gap-2 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs font-medium rounded-lg transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Backup (JSON)</span>
              </button>

              <button
                onClick={onResetData}
                className="px-4 py-2 bg-red-950/40 hover:bg-red-900/60 border border-red-900/60 text-red-300 text-xs font-medium rounded-lg transition-colors"
              >
                Reset to Sample Catalog
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div
            className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
              <h3 className="text-base font-semibold text-white">Create New Catalog Product</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Product Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Titanium Mechanical Pencil"
                  value={newProdName}
                  onChange={(e) => setNewProdName(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Category</label>
                  <select
                    value={newProdCategory}
                    onChange={(e) => setNewProdCategory(e.target.value as any)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-2 py-2 text-xs text-white"
                  >
                    <option value="Audio & Tech">Audio & Tech</option>
                    <option value="Workspace">Workspace</option>
                    <option value="Home & Living">Home & Living</option>
                    <option value="Apparel & Leather">Apparel & Leather</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Price ({settings.currencySymbol})
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdPrice}
                    onChange={(e) => setNewProdPrice(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Stock Units
                  </label>
                  <input
                    type="number"
                    required
                    value={newProdStock}
                    onChange={(e) => setNewProdStock(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Image URL (Unsplash or CDN)
                </label>
                <input
                  type="url"
                  required
                  value={newProdImage}
                  onChange={(e) => setNewProdImage(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Description
                </label>
                <textarea
                  rows={2}
                  value={newProdDescription}
                  onChange={(e) => setNewProdDescription(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-3 flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 text-xs rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs rounded-xl"
                >
                  Deploy to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Inspect Order Modal */}
      {inspectOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md">
          <div
            className="w-full max-w-lg bg-neutral-900 border border-neutral-800 rounded-2xl p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center pb-3 border-b border-neutral-800">
              <div>
                <h3 className="text-base font-semibold text-white">Order Details: {inspectOrder.id}</h3>
                <span className="text-[11px] text-neutral-400 font-mono">{inspectOrder.date}</span>
              </div>
              <button
                onClick={() => setInspectOrder(null)}
                className="text-neutral-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1">
                <div className="text-neutral-500 font-mono text-[10px] uppercase">
                  Customer & Shipping Address
                </div>
                <div className="font-semibold text-white">{inspectOrder.customerName}</div>
                <div className="text-neutral-400">{inspectOrder.customerEmail}</div>
                <div className="text-neutral-400 font-mono">
                  {inspectOrder.shippingAddress.street}, {inspectOrder.shippingAddress.city},{' '}
                  {inspectOrder.shippingAddress.state} {inspectOrder.shippingAddress.zip},{' '}
                  {inspectOrder.shippingAddress.country}
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 space-y-2">
                <div className="text-neutral-500 font-mono text-[10px] uppercase">Line Items</div>
                {inspectOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between items-center">
                    <span className="text-white">
                      {it.quantity}x {it.name}
                    </span>
                    <span className="font-mono text-neutral-300">
                      {settings.currencySymbol}
                      {(it.price * it.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}
                <div className="pt-2 border-t border-neutral-850 flex justify-between font-bold text-white">
                  <span>Grand Total</span>
                  <span>
                    {settings.currencySymbol}
                    {inspectOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="p-3 bg-neutral-950 rounded-lg border border-neutral-800 space-y-1">
                <div className="text-neutral-500 font-mono text-[10px] uppercase">Logistics</div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Carrier:</span>
                  <span className="text-white font-mono">{inspectOrder.carrier || 'Pending'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Tracking Number:</span>
                  <span className="text-emerald-400 font-mono">{inspectOrder.trackingCode}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-neutral-400">Payment:</span>
                  <span className="text-neutral-300">{inspectOrder.paymentMethod}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setInspectOrder(null)}
              className="w-full py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-xl"
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
