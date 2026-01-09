'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { createOrder, createOrderItems, generateVariableSymbol, formatPrice } from '@/lib/supabase';

export default function CheckoutPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // V reálné aplikaci by se data brala z košíku/session
  const [formData, setFormData] = useState({
    user_name: '',
    user_email: '',
    company_name: '',
    ico: '',
    dic: '',
    street: '',
    city: '',
    zip: '',
    phone: '',
    payment_method: 'invoice' as 'invoice' | 'qr' | 'card',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Mockup data - v reálné aplikaci by přišla z košíku
  const cartItems = [
    {
      courseName: 'AI Firemní Akcelerátor',
      date: '15. ledna 2026',
      location: 'Praha',
      price: 24900,
      quantity: 1,
    },
  ];

  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Validace
      if (!formData.user_name || !formData.user_email || !formData.street || !formData.city || !formData.zip || !formData.phone) {
        throw new Error('Vyplňte všechna povinná pole');
      }

      // Vytvoř objednávku
      const variableSymbol = generateVariableSymbol();

      const order = await createOrder({
        user_email: formData.user_email,
        user_name: formData.user_name,
        company_name: formData.company_name || null,
        ico: formData.ico || null,
        dic: formData.dic || null,
        street: formData.street,
        city: formData.city,
        zip: formData.zip,
        phone: formData.phone,
        total_price: totalPrice,
        status: 'pending',
        variable_symbol: variableSymbol,
        payment_method: formData.payment_method,
      });

      // Přesměruj na mockup platbu
      router.push(`/platba?orderId=${order.id}&method=${formData.payment_method}`);
    } catch (err: any) {
      setError(err.message || 'Chyba při vytváření objednávky');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Objednávka<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-600 mt-2">
            Vyplňte kontaktní údaje a zvolte způsob platby
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Formulář */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
              {error && (
                <div className="bg-rose-50 border border-rose-200 text-rose-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Kontaktní údaje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Celé jméno *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.user_name}
                      onChange={(e) => setFormData({ ...formData, user_name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.user_email}
                      onChange={(e) => setFormData({ ...formData, user_email: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Telefon *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Fakturační údaje</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Název firmy (nepovinné)
                    </label>
                    <input
                      type="text"
                      value={formData.company_name}
                      onChange={(e) => setFormData({ ...formData, company_name: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      IČO
                    </label>
                    <input
                      type="text"
                      value={formData.ico}
                      onChange={(e) => setFormData({ ...formData, ico: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      DIČ
                    </label>
                    <input
                      type="text"
                      value={formData.dic}
                      onChange={(e) => setFormData({ ...formData, dic: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Ulice a číslo popisné *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.street}
                      onChange={(e) => setFormData({ ...formData, street: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Město *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      PSČ *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.zip}
                      onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-4">Způsob platby</h2>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                    <input
                      type="radio"
                      name="payment_method"
                      value="invoice"
                      checked={formData.payment_method === 'invoice'}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value as any })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">Faktura</div>
                      <div className="text-sm text-slate-600">Platba na základě faktury</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                    <input
                      type="radio"
                      name="payment_method"
                      value="qr"
                      checked={formData.payment_method === 'qr'}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value as any })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">QR platba</div>
                      <div className="text-sm text-slate-600">Okamžitá platba přes QR kód</div>
                    </div>
                  </label>

                  <label className="flex items-center space-x-3 p-4 border-2 border-slate-200 rounded-lg cursor-pointer hover:border-blue-600 transition-colors">
                    <input
                      type="radio"
                      name="payment_method"
                      value="card"
                      checked={formData.payment_method === 'card'}
                      onChange={(e) => setFormData({ ...formData, payment_method: e.target.value as any })}
                      className="w-5 h-5 text-blue-600"
                    />
                    <div>
                      <div className="font-semibold text-slate-900">Platební karta</div>
                      <div className="text-sm text-slate-600">Okamžitá platba kartou</div>
                    </div>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Zpracovávám...' : 'Pokračovat k platbě'}
              </button>
            </form>
          </div>

          {/* Souhrn objednávky */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24">
              <h2 className="text-xl font-bold text-slate-900 mb-4">Souhrn objednávky</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="pb-4 border-b border-slate-200">
                    <div className="font-semibold text-slate-900">{item.courseName}</div>
                    <div className="text-sm text-slate-600 mt-1">
                      {item.date} • {item.location}
                    </div>
                    <div className="text-sm text-slate-600 mt-1">
                      Počet účastníků: {item.quantity}
                    </div>
                    <div className="font-bold text-slate-900 mt-2">
                      {formatPrice(item.price * item.quantity)}
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t border-slate-200 pt-4">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Celkem:</span>
                  <span className="text-2xl font-bold text-blue-600">
                    {formatPrice(totalPrice)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
