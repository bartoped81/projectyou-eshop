'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { isAdmin, supabase, formatPrice, formatDate } from '@/lib/supabase';

interface OrderWithDetails {
  id: string;
  created_at: string;
  user_email: string;
  user_name: string;
  company_name: string | null;
  total_price: number;
  status: 'pending' | 'paid' | 'cancelled';
  variable_symbol: string;
  payment_method: 'invoice' | 'qr' | 'card';
  items: {
    quantity: number;
    unit_price_at_purchase: number;
    course_date: {
      start_date: string;
      location: string;
      course: {
        title: string;
      };
    };
  }[];
}

export default function AdminOrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderWithDetails[]>([]);
  const [filter, setFilter] = useState<'all' | 'pending' | 'paid' | 'cancelled'>('all');

  useEffect(() => {
    const checkAdminAndLoad = async () => {
      if (!authLoading) {
        if (!user || !(await isAdmin())) {
          router.push('/');
          return;
        }
        await loadOrders();
        setLoading(false);
      }
    };
    checkAdminAndLoad();
  }, [user, authLoading, router]);

  const loadOrders = async () => {
    try {
      const query = supabase
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
        .order('created_at', { ascending: false });

      if (filter !== 'all') {
        query.eq('status', filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setOrders(data || []);
    } catch (error) {
      console.error('Error loading orders:', error);
    }
  };

  useEffect(() => {
    if (!loading) {
      loadOrders();
    }
  }, [filter]);

  const updateOrderStatus = async (orderId: string, newStatus: 'paid' | 'cancelled') => {
    try {
      const { error } = await supabase
        .from('orders')
        .update({ status: newStatus })
        .eq('id', orderId);

      if (error) throw error;
      await loadOrders();
    } catch (error) {
      console.error('Error updating order:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Načítám objednávky...</p>
        </div>
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-amber-100 text-amber-800';
      case 'cancelled':
        return 'bg-rose-100 text-rose-800';
      default:
        return 'bg-slate-100 text-slate-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'paid':
        return 'Zaplaceno';
      case 'pending':
        return 'Čeká na platbu';
      case 'cancelled':
        return 'Zrušeno';
      default:
        return status;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/admin" className="text-blue-600 hover:text-blue-700 font-medium mb-4 inline-block">
            ← Zpět na dashboard
          </Link>
          <h1 className="text-4xl font-bold text-slate-900">
            Správa objednávek<span className="text-blue-600">.</span>
          </h1>
        </div>

        {/* Filter */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-6">
          <div className="flex space-x-4">
            <button
              onClick={() => setFilter('all')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'all'
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Všechny
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'pending'
                  ? 'bg-amber-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Čekající
            </button>
            <button
              onClick={() => setFilter('paid')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'paid'
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Zaplacené
            </button>
            <button
              onClick={() => setFilter('cancelled')}
              className={`px-6 py-2 rounded-lg font-semibold transition-colors ${
                filter === 'cancelled'
                  ? 'bg-rose-600 text-white'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              Zrušené
            </button>
          </div>
        </div>

        {/* Orders List */}
        <div className="space-y-4">
          {orders.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
              <p className="text-slate-600">Žádné objednávky</p>
            </div>
          ) : (
            orders.map((order) => (
              <div key={order.id} className="bg-white rounded-2xl shadow-xl p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-xl font-bold text-slate-900">
                        {order.user_name}
                      </h3>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                          order.status
                        )}`}
                      >
                        {getStatusText(order.status)}
                      </span>
                    </div>
                    <p className="text-slate-600">{order.user_email}</p>
                    {order.company_name && (
                      <p className="text-slate-600">Firma: {order.company_name}</p>
                    )}
                    <p className="text-sm text-slate-500 mt-2">
                      Vytvořeno: {formatDate(order.created_at)}
                    </p>
                    <p className="text-sm text-slate-500">
                      Variabilní symbol: {order.variable_symbol}
                    </p>
                  </div>

                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-900">
                      {formatPrice(order.total_price)}
                    </div>
                    <div className="text-sm text-slate-500 mt-1">
                      Platba: {order.payment_method === 'invoice' ? 'Faktura' : order.payment_method === 'qr' ? 'QR' : 'Karta'}
                    </div>
                  </div>
                </div>

                {/* Order Items */}
                <div className="border-t border-slate-200 pt-4 mb-4">
                  <h4 className="font-semibold text-slate-900 mb-2">Objednané kurzy:</h4>
                  <div className="space-y-2">
                    {order.items.map((item: any, idx: number) => (
                      <div key={idx} className="flex justify-between text-sm">
                        <span className="text-slate-700">
                          {item.course_date.course.title} - {item.course_date.location}
                          <span className="text-slate-500 ml-2">
                            ({new Date(item.course_date.start_date).toLocaleDateString('cs-CZ')})
                          </span>
                        </span>
                        <span className="text-slate-900 font-medium">
                          {item.quantity}× {formatPrice(item.unit_price_at_purchase)}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                {order.status === 'pending' && (
                  <div className="flex space-x-3">
                    <button
                      onClick={() => updateOrderStatus(order.id, 'paid')}
                      className="px-6 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Označit jako zaplaceno
                    </button>
                    <button
                      onClick={() => updateOrderStatus(order.id, 'cancelled')}
                      className="px-6 py-2 bg-rose-600 hover:bg-rose-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Zrušit objednávku
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
