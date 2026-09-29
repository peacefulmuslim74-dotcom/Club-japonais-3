export interface Product {
  id: string;
  name: string;
  category: 'Audio & Tech' | 'Workspace' | 'Home & Living' | 'Apparel & Leather' | 'Wellness';
  price: number;
  compareAtPrice?: number;
  costPrice?: number;
  stock: number;
  sku: string;
  rating: number;
  reviewCount: number;
  image: string;
  gallery: string[];
  description: string;
  story?: string;
  features: string[];
  tags: string[];
  status: 'active' | 'draft' | 'archived';
  isFeatured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
}

export interface OrderItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone?: string;
  items: OrderItem[];
  total: number;
  subtotal: number;
  discount: number;
  shipping: number;
  tax: number;
  status: 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  date: string;
  trackingCode: string;
  carrier?: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  paymentMethod: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verified: boolean;
}

export interface StoreSettings {
  storeName: string;
  tagline: string;
  currencySymbol: string;
  freeShippingThreshold: number;
  bannerAnnouncement: string;
  bannerActive: boolean;
  taxRatePercent: number;
}
