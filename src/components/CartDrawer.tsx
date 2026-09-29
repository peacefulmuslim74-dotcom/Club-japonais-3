import React, { useState } from 'react';
import { X, Trash2, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import { CartItem, StoreSettings } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  settings: StoreSettings;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  discountPercent: number;
  setDiscountPercent: (percent: number) => void;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  onUpdateQuantity,
  onRemoveItem,
  discountPercent,
  setDiscountPercent,
  onProceedToCheckout,
}) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponMessage, setCouponMessage] = useState<{ text: string; error: boolean } | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const freeShippingThreshold = settings.freeShippingThreshold;
  const isFreeShipping = subtotal >= freeShippingThreshold || subtotal === 0;
  const shippingAmount = isFreeShipping ? 0 : 15;
  const taxAmount = ((subtotal - discountAmount) * settings.taxRatePercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingAmount + taxAmount);
  const amountToFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponCode.trim().toUpperCase();
    if (code === 'WELCOME15') {
      setDiscountPercent(15);
      setCouponMessage({ text: '15% Discount Applied (WELCOME15)', error: false });
    } else if (code === 'LAUNCH20') {
      setDiscountPercent(20);
      setCouponMessage({ text: '20% Launch Discount Applied (LAUNCH20)', error: false });
    } else if (!code) {
      setDiscountPercent(0);
      setCouponMessage(null);
    } else {
      setCouponMessage({ text: 'Invalid coupon code. Try WELCOME15', error: true });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-neutral-950/70 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-neutral-900 border-l border-neutral-800 shadow-2xl flex flex-col justify-between">
          {/* Header */}
          <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-white tracking-tight">Shopping Bag</h2>
              <span className="text-xs text-neutral-400 font-mono">
                ({items.reduce((acc, it) => acc + it.quantity, 0)} items)
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="px-5 py-3 bg-neutral-950/80 border-b border-neutral-800 text-xs">
            {isFreeShipping ? (
              <p className="text-emerald-400 font-medium flex items-center gap-1.5">
                <span>✓</span> You unlocked Free Worldwide Express Shipping!
              </p>
            ) : (
              <div>
                <p className="text-neutral-300">
                  Add <span className="font-semibold text-white">{settings.currencySymbol}{amountToFreeShipping.toFixed(0)}</span> more for free shipping
                </p>
                <div className="w-full bg-neutral-800 h-1 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-neutral-300 h-full transition-all duration-300"
                    style={{ width: `${Math.min(100, (subtotal / freeShippingThreshold) * 100)}%` }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center py-12 text-neutral-500">
                <p className="text-sm">Your shopping bag is empty.</p>
                <button
                  onClick={onClose}
                  className="mt-4 px-4 py-2 bg-neutral-800 hover:bg-neutral-700 text-neutral-200 text-xs rounded-lg transition-colors"
                >
                  Discover Collections
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 bg-neutral-950/50 rounded-xl border border-neutral-800/80"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 rounded-lg object-cover bg-neutral-900 border border-neutral-800 shrink-0"
                  />
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs font-semibold text-white line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.product.id)}
                          className="text-neutral-500 hover:text-red-400 transition-colors"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                      <span className="text-[11px] text-neutral-400 font-mono">
                        {settings.currencySymbol}
                        {item.product.price} each
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-neutral-800 bg-neutral-900 rounded-md text-xs">
                        <button
                          onClick={() =>
                            onUpdateQuantity(item.product.id, Math.max(1, item.quantity - 1))
                          }
                          className="px-2 py-0.5 text-neutral-400 hover:text-white"
                        >
                          -
                        </button>
                        <span className="px-2 font-mono text-white text-xs">{item.quantity}</span>
                        <button
                          onClick={() =>
                            onUpdateQuantity(
                              item.product.id,
                              Math.min(item.product.stock, item.quantity + 1)
                            )
                          }
                          className="px-2 py-0.5 text-neutral-400 hover:text-white"
                        >
                          +
                        </button>
                      </div>

                      <span className="text-xs font-semibold text-white font-mono">
                        {settings.currencySymbol}
                        {item.product.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer & Calculations */}
          {items.length > 0 && (
            <div className="p-5 border-t border-neutral-800 bg-neutral-950/70 space-y-3">
              {/* Promo input */}
              <form onSubmit={applyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-neutral-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. WELCOME15)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-neutral-900 border border-neutral-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-white placeholder:text-neutral-500 uppercase font-mono focus:outline-none focus:border-neutral-700"
                  />
                </div>
                <button
                  type="submit"
                  className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 text-xs font-medium text-neutral-200 rounded-lg transition-colors"
                >
                  Apply
                </button>
              </form>

              {couponMessage && (
                <p
                  className={`text-[11px] ${
                    couponMessage.error ? 'text-red-400' : 'text-emerald-400'
                  }`}
                >
                  {couponMessage.text}
                </p>
              )}

              {/* Price rows */}
              <div className="space-y-1.5 text-xs text-neutral-400 pt-2 border-t border-neutral-800/80 font-mono">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="text-white">
                    {settings.currencySymbol}
                    {subtotal.toFixed(2)}
                  </span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({discountPercent}%)</span>
                    <span>
                      -{settings.currencySymbol}
                      {discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span className={shippingAmount === 0 ? 'text-emerald-400 font-sans' : 'text-white'}>
                    {shippingAmount === 0 ? 'Complimentary' : `${settings.currencySymbol}${shippingAmount.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Tax ({settings.taxRatePercent}%)</span>
                  <span className="text-white">
                    {settings.currencySymbol}
                    {taxAmount.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-bold text-white pt-2 border-t border-neutral-800">
                  <span>Estimated Total</span>
                  <span className="tracking-tight">
                    {settings.currencySymbol}
                    {total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Checkout Trigger */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full py-3 px-4 bg-white hover:bg-neutral-200 text-neutral-950 font-semibold text-xs rounded-xl flex items-center justify-center gap-2 transition-colors mt-2"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-neutral-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted & Protected Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
