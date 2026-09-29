import React, { useState } from 'react';
import { X, CheckCircle, ShieldCheck, CreditCard, Truck, ArrowLeft } from 'lucide-react';
import { CartItem, Order, StoreSettings } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  settings: StoreSettings;
  discountPercent: number;
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  settings,
  discountPercent,
  onOrderSuccess,
}) => {
  const [step, setStep] = useState<'details' | 'payment' | 'success'>('details');
  const [customerName, setCustomerName] = useState('Elena Rostova');
  const [customerEmail, setCustomerEmail] = useState('elena.rostova@designlab.co');
  const [street, setStreet] = useState('428 King Street West, Suite 400');
  const [city, setCity] = useState('Toronto');
  const [state, setState] = useState('ON');
  const [zip, setZip] = useState('M5V 1L7');
  const [country, setCountry] = useState('Canada');
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'applepay' | 'cod'>('card');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('883');
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const isFreeShipping = subtotal >= settings.freeShippingThreshold || subtotal === 0;
  const shippingAmount = isFreeShipping ? 0 : 15;
  const taxAmount = ((subtotal - discountAmount) * settings.taxRatePercent) / 100;
  const total = Math.max(0, subtotal - discountAmount + shippingAmount + taxAmount);

  const handleSubmitPayment = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrderId = `ORD-${Math.floor(1000 + Math.random() * 9000)}`;
    const newTracking = `DHL-EX-${Math.floor(1000000 + Math.random() * 9000000)}`;
    
    const newOrder: Order = {
      id: newOrderId,
      customerName,
      customerEmail,
      items: items.map((it) => ({
        productId: it.product.id,
        name: it.product.name,
        price: it.product.price,
        quantity: it.quantity,
        image: it.product.image,
      })),
      subtotal,
      discount: discountAmount,
      shipping: shippingAmount,
      tax: taxAmount,
      total,
      status: 'Processing',
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      }),
      trackingCode: newTracking,
      carrier: 'DHL Express Worldwide',
      shippingAddress: {
        street,
        city,
        state,
        zip,
        country,
      },
      paymentMethod:
        paymentMethod === 'applepay'
          ? 'Apple Pay (Verified)'
          : paymentMethod === 'cod'
          ? 'Cash on Delivery'
          : `Credit Card (•••• ${cardNumber.slice(-4)})`,
    };

    setCompletedOrder(newOrder);
    onOrderSuccess(newOrder);
    setStep('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-950/80 backdrop-blur-md overflow-y-auto">
      <div
        className="relative w-full max-w-2xl bg-neutral-900 border border-neutral-800 rounded-2xl shadow-2xl overflow-hidden my-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {step === 'payment' && (
              <button
                onClick={() => setStep('details')}
                className="p-1 hover:bg-neutral-800 rounded-md text-neutral-400 hover:text-white"
              >
                <ArrowLeft className="w-4 h-4" />
              </button>
            )}
            <h2 className="text-base font-semibold text-white tracking-tight">
              {step === 'details' && 'Shipping & Customer Details'}
              {step === 'payment' && 'Secure Payment'}
              {step === 'success' && 'Order Confirmed'}
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-neutral-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6">
          {step === 'details' && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setStep('payment');
              }}
              className="space-y-4"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-neutral-300 mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                />
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    State / Prov
                  </label>
                  <input
                    type="text"
                    required
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">
                    Postal Code
                  </label>
                  <input
                    type="text"
                    required
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-neutral-300 mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-neutral-600"
                  />
                </div>
              </div>

              {/* Order quick summary bar */}
              <div className="pt-3 border-t border-neutral-800 flex items-center justify-between text-xs text-neutral-400">
                <span>
                  Total Payable: <strong className="text-white">{settings.currencySymbol}{total.toFixed(2)}</strong>
                </span>
                <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                  <Truck className="w-3.5 h-3.5" />
                  {isFreeShipping ? 'Free Express Shipping' : 'Standard Shipping Included'}
                </span>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full py-2.5 px-4 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold rounded-xl transition-colors"
                >
                  Continue to Payment
                </button>
              </div>
            </form>
          )}

          {step === 'payment' && (
            <form onSubmit={handleSubmitPayment} className="space-y-4">
              {/* Payment selector */}
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setPaymentMethod('card')}
                  className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                    paymentMethod === 'card'
                      ? 'border-white bg-neutral-800 text-white'
                      : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Card</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('applepay')}
                  className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                    paymentMethod === 'applepay'
                      ? 'border-white bg-neutral-800 text-white'
                      : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span className="font-bold text-xs tracking-tighter"> Pay / G-Pay</span>
                  <span>Instant</span>
                </button>
                <button
                  type="button"
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3 rounded-lg border text-xs font-medium flex flex-col items-center gap-1.5 transition-colors ${
                    paymentMethod === 'cod'
                      ? 'border-white bg-neutral-800 text-white'
                      : 'border-neutral-800 bg-neutral-950/60 text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <Truck className="w-4 h-4" />
                  <span>Pay on Delivery</span>
                </button>
              </div>

              {paymentMethod === 'card' && (
                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-medium text-neutral-300 mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-600"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-neutral-300 mb-1">
                        CVC / CVV
                      </label>
                      <input
                        type="text"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        className="w-full bg-neutral-950 border border-neutral-800 rounded-lg px-3 py-2 text-xs font-mono text-white focus:outline-none focus:border-neutral-600"
                      />
                    </div>
                  </div>
                </div>
              )}

              {paymentMethod === 'applepay' && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-2">
                  <p className="text-xs text-neutral-300">
                    Touch ID / Face ID payment simulation ready for {customerName}.
                  </p>
                  <p className="text-[11px] text-neutral-500">
                    Click "Authorize Payment" below to complete transaction immediately.
                  </p>
                </div>
              )}

              {paymentMethod === 'cod' && (
                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-center space-y-2">
                  <p className="text-xs text-neutral-300">
                    Payment will be collected by courier upon physical delivery to:
                  </p>
                  <p className="text-xs font-mono text-neutral-400">
                    {street}, {city}, {state}
                  </p>
                </div>
              )}

              <div className="pt-4 border-t border-neutral-800 flex items-center justify-between text-xs">
                <span className="text-neutral-400">Total Charged</span>
                <span className="text-base font-bold text-white">
                  {settings.currencySymbol}{total.toFixed(2)}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Complete Order & Authorize {settings.currencySymbol}{total.toFixed(2)}</span>
              </button>
            </form>
          )}

          {step === 'success' && completedOrder && (
            <div className="text-center py-6 space-y-4">
              <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle className="w-6 h-6" />
              </div>

              <div>
                <h3 className="text-lg font-bold text-white tracking-tight">
                  Thank you for your order, {completedOrder.customerName.split(' ')[0]}!
                </h3>
                <p className="text-xs text-neutral-400 mt-1">
                  We've sent a detailed receipt to{' '}
                  <span className="text-neutral-200 font-mono">{completedOrder.customerEmail}</span>
                </p>
              </div>

              <div className="bg-neutral-950 p-4 rounded-xl border border-neutral-800 text-left text-xs font-mono space-y-2">
                <div className="flex justify-between text-neutral-400">
                  <span>Order Identifier</span>
                  <span className="text-white font-bold">{completedOrder.id}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Tracking Code</span>
                  <span className="text-emerald-400">{completedOrder.trackingCode}</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Carrier</span>
                  <span className="text-neutral-200">{completedOrder.carrier}</span>
                </div>
                <div className="flex justify-between text-neutral-400 border-t border-neutral-800/80 pt-2">
                  <span>Total Paid</span>
                  <span className="text-white font-bold">
                    {settings.currencySymbol}{completedOrder.total.toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={onClose}
                  className="flex-1 py-2.5 px-4 bg-white hover:bg-neutral-200 text-neutral-950 text-xs font-semibold rounded-xl transition-colors"
                >
                  Return to Storefront
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
