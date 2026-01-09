'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { supabase, formatPrice, formatDate } from '@/lib/supabase';

// Vypnout static generation pro tuto stránku
export const dynamic = 'force-dynamic';

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (orderId) {
      loadOrder();
    }
  }, [orderId]);

  const loadOrder = async () => {
    try {
      const { data, error } = await supabase
        .from('orders')
        .select(`
          *,
          items:order_items(
            quantity,
            unit_price_at_purchase,
            course_date:course_dates(
              start_date,
              location,
              course:courses(title)
            )
          )
        `)
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

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Načítám údaje o objednávce...</p>
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
        <div className="bg-white rounded-2xl shadow-xl p-8">
          {/* Success Icon */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h1 className="text-4xl font-bold text-slate-900 mb-4">
              Objednávka přijata<span className="text-blue-600">!</span>
            </h1>

            <p className="text-lg text-slate-600 mb-2">
              Děkujeme za vaši objednávku
            </p>
            <p className="text-slate-500">
              Potvrzení jsme odeslali na email: <span className="font-semibold">{order.user_email}</span>
            </p>
          </div>

          {/* Order Details */}
          <div className="bg-slate-50 rounded-xl p-6 mb-6">
            <h2 className="text-xl font-bold text-slate-900 mb-4">Detail objednávky</h2>

            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Číslo objednávky:</span>
                <span className="font-mono font-semibold text-slate-900">{order.id.slice(0, 8)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Variabilní symbol:</span>
                <span className="font-mono font-semibold text-slate-900">{order.variable_symbol}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Datum objednávky:</span>
                <span className="font-semibold text-slate-900">{formatDate(order.created_at)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-slate-600">Stav:</span>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-semibold">
                  {order.status === 'paid' ? 'Zaplaceno' : 'Čeká na platbu'}
                </span>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-4">
              <h3 className="font-semibold text-slate-900 mb-3">Objednané kurzy:</h3>
              <div className="space-y-3">
                {order.items.map((item: any, idx: number) => (
                  <div key={idx} className="flex justify-between">
                    <div>
                      <div className="font-medium text-slate-900">{item.course_date.course.title}</div>
                      <div className="text-sm text-slate-600">
                        {new Date(item.course_date.start_date).toLocaleDateString('cs-CZ')} • {item.course_date.location}
                      </div>
                      <div className="text-sm text-slate-600">Počet účastníků: {item.quantity}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-slate-900">
                        {formatPrice(item.unit_price_at_purchase * item.quantity)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-t border-slate-200 mt-4 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-slate-900">Celková částka:</span>
                <span className="text-2xl font-bold text-blue-600">{formatPrice(order.total_price)}</span>
              </div>
            </div>
          </div>

          {/* What's Next */}
          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6 mb-6">
            <h3 className="font-semibold text-slate-900 mb-3">Co bude dál?</h3>
            <ul className="space-y-2 text-sm text-slate-700">
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Potvrzení objednávky jsme odeslali na váš email</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>
                  {order.payment_method === 'invoice'
                    ? 'Fakturu obdržíte do 24 hodin'
                    : 'Platba byla úspěšně zpracována'}
                </span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>14 dní před začátkem kurzu vám zašleme další informace a pokyny</span>
              </li>
              <li className="flex items-start space-x-2">
                <svg className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>V případě jakýchkoli dotazů nás neváhejte kontaktovat</span>
              </li>
            </ul>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              href="/"
              className="flex-1 text-center px-6 py-3 bg-gradient-to-br from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              Zpět na homepage
            </Link>
            <Link
              href="/moje-objednavky"
              className="flex-1 text-center px-6 py-3 border-2 border-blue-600 text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-all"
            >
              Moje objednávky
            </Link>
          </div>
        </div>

        {/* Contact Card */}
        <div className="mt-8 bg-white rounded-2xl shadow-xl p-6">
          <h3 className="font-semibold text-slate-900 mb-3">Máte dotazy?</h3>
          <p className="text-slate-600 mb-4">
            Jsme tu pro vás! V případě jakýchkoli dotazů nás neváhejte kontaktovat.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="mailto:info@projectyou.cz"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <span>info@projectyou.cz</span>
            </a>
            <a
              href="tel:+420123456789"
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+420 123 456 789</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
