'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, formatPrice } from '@/lib/supabase';

export default function PaymentPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const method = searchParams.get('method') as 'invoice' | 'qr' | 'card';

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: '',
  });

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .eq('id', orderId)
        .single();

      if (error) throw error;
      setOrder(data);
    } catch (error) {
      console.error('Error loading order:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePayment = async () => {
    setProcessing(true);

    // Simulace zpracování platby (2 sekundy)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Mockup: automaticky označit jako zaplaceno
    await supabase
      .from('orders')
      .update({ status: 'paid' })
      .eq('id', orderId);

    // Přesměruj na úspěch
    router.push(`/platba/uspech?orderId=${orderId}`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Načítám platbu...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Objednávka nenalezena</h2>
          <Link href="/" className="text-blue-600 hover:text-blue-700 font-semibold">
            Zpět na homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* MOCKUP Banner */}
        <div className="bg-amber-100 border-l-4 border-amber-500 text-amber-900 p-4 rounded-lg mb-8">
          <div className="flex items-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span className="font-semibold">MOCKUP PLATEBNÍ BRÁNA</span>
          </div>
          <p className="text-sm mt-2">
            Toto je pouze demonstrační platební rozhraní. Žádná reálná platba nebude provedena.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <img
              src="https://www.projectyou.cz/files/projectyou-logo-rgb.svg"
              alt="projectYOU"
              className="h-12 mx-auto mb-4"
            />
            <h1 className="text-3xl font-bold text-slate-900">
              Platba<span className="text-blue-600">.</span>
            </h1>
            <p className="text-slate-600 mt-2">
              Dokončete platbu pro objednávku #{order.variable_symbol}
            </p>
          </div>

          {/* Order Summary */}
          <div className="bg-slate-50 rounded-xl p-6 mb-8">
            <div className="flex justify-between items-center mb-4">
              <span className="text-slate-600">Celková částka:</span>
              <span className="text-3xl font-bold text-blue-600">
                {formatPrice(order.total_price)}
              </span>
            </div>
            <div className="text-sm text-slate-600">
              <div>Jméno: {order.user_name}</div>
              <div>Email: {order.user_email}</div>
              <div>Variabilní symbol: {order.variable_symbol}</div>
            </div>
          </div>

          {/* Payment Methods */}
          {method === 'invoice' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-slate-900 mb-2">Platba fakturou</h2>
                <p className="text-slate-600 mb-6">
                  Faktura bude zaslána na váš email během 24 hodin.
                </p>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <h3 className="font-semibold text-slate-900 mb-3">Platební údaje:</h3>
                <div className="space-y-2 text-sm text-slate-700">
                  <div className="flex justify-between">
                    <span>Číslo účtu:</span>
                    <span className="font-mono font-semibold">123456789/0800</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Variabilní symbol:</span>
                    <span className="font-mono font-semibold">{order.variable_symbol}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Částka:</span>
                    <span className="font-semibold">{formatPrice(order.total_price)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Splatnost:</span>
                    <span className="font-semibold">14 dnů</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {processing ? 'Zpracovávám...' : 'Potvrdit objednávku (MOCKUP)'}
              </button>
            </div>
          )}

          {method === 'qr' && (
            <div className="space-y-6">
              <div className="text-center">
                <h2 className="text-xl font-bold text-slate-900 mb-4">QR platba</h2>
                <p className="text-slate-600 mb-6">
                  Naskenujte QR kód v mobilní aplikaci vaší banky
                </p>
              </div>

              {/* Mockup QR Code */}
              <div className="flex justify-center">
                <div className="w-64 h-64 bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                  <div className="text-center text-slate-400">
                    <svg className="w-32 h-32 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1}
                        d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z"
                      />
                    </svg>
                    <p className="font-semibold">MOCKUP QR KÓD</p>
                  </div>
                </div>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {processing ? 'Čekám na potvrzení platby...' : 'Simulovat platbu (MOCKUP)'}
              </button>
            </div>
          )}

          {method === 'card' && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Platba kartou</h2>
                <p className="text-slate-600 mt-2">Zadejte údaje platební karty</p>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Číslo karty
                  </label>
                  <input
                    type="text"
                    placeholder="1234 5678 9012 3456"
                    value={cardData.number}
                    onChange={(e) => setCardData({ ...cardData, number: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                    maxLength={19}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-900 mb-2">
                    Jméno na kartě
                  </label>
                  <input
                    type="text"
                    placeholder="JAN NOVÁK"
                    value={cardData.name}
                    onChange={(e) => setCardData({ ...cardData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      Platnost
                    </label>
                    <input
                      type="text"
                      placeholder="MM/RR"
                      value={cardData.expiry}
                      onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      maxLength={5}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-slate-900 mb-2">
                      CVV
                    </label>
                    <input
                      type="text"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent"
                      maxLength={3}
                    />
                  </div>
                </div>
              </div>

              <div className="bg-slate-50 rounded-lg p-4 flex items-center space-x-3">
                <svg className="w-5 h-5 text-green-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span className="text-sm text-slate-600">
                  Vaše platba je zabezpečena SSL šifrováním
                </span>
              </div>

              <button
                onClick={handlePayment}
                disabled={processing}
                className="w-full bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold py-4 px-6 rounded-lg hover:shadow-xl transition-all disabled:opacity-50"
              >
                {processing ? 'Zpracovávám platbu...' : 'Zaplatit (MOCKUP)'}
              </button>
            </div>
          )}

          <div className="mt-6 text-center">
            <Link href="/" className="text-sm text-slate-500 hover:text-blue-600 transition-colors">
              Zrušit a vrátit se zpět
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
