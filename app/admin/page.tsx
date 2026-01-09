'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/lib/auth-context';
import { isAdmin, supabase } from '@/lib/supabase';

interface Stats {
  totalCourses: number;
  totalOrders: number;
  totalRevenue: number;
  pendingOrders: number;
}

export default function AdminDashboard() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const [isAdminUser, setIsAdminUser] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<Stats>({
    totalCourses: 0,
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
  });

  useEffect(() => {
    const checkAdmin = async () => {
      if (!authLoading) {
        if (!user) {
          router.push('/prihlaseni');
          return;
        }

        const adminStatus = await isAdmin();
        if (!adminStatus) {
          router.push('/');
          return;
        }

        setIsAdminUser(true);
        await loadStats();
        setLoading(false);
      }
    };

    checkAdmin();
  }, [user, authLoading, router]);

  const loadStats = async () => {
    try {
      // Počet kurzů
      const { count: coursesCount } = await supabase
        .from('courses')
        .select('*', { count: 'exact', head: true });

      // Počet objednávek
      const { count: ordersCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true });

      // Celkové tržby (pouze zaplacené)
      const { data: revenueData } = await supabase
        .from('orders')
        .select('total_price')
        .eq('status', 'paid');

      const totalRevenue = revenueData?.reduce((sum, order) => sum + order.total_price, 0) || 0;

      // Čekající objednávky
      const { count: pendingCount } = await supabase
        .from('orders')
        .select('*', { count: 'exact', head: true })
        .eq('status', 'pending');

      setStats({
        totalCourses: coursesCount || 0,
        totalOrders: ordersCount || 0,
        totalRevenue,
        pendingOrders: pendingCount || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Načítám admin dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAdminUser) {
    return null;
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Admin Dashboard<span className="text-blue-600">.</span>
          </h1>
          <p className="text-slate-600 mt-2">
            Správa kurzů, objednávek a statistiky
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-blue-600">
            <div className="text-sm font-semibold text-slate-600 mb-1">Celkem kurzů</div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalCourses}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-cyan-500">
            <div className="text-sm font-semibold text-slate-600 mb-1">Celkem objednávek</div>
            <div className="text-3xl font-bold text-slate-900">{stats.totalOrders}</div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-emerald-500">
            <div className="text-sm font-semibold text-slate-600 mb-1">Celkové tržby</div>
            <div className="text-3xl font-bold text-slate-900">
              {new Intl.NumberFormat('cs-CZ', {
                style: 'currency',
                currency: 'CZK',
                minimumFractionDigits: 0,
              }).format(stats.totalRevenue)}
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-6 border-l-4 border-amber-500">
            <div className="text-sm font-semibold text-slate-600 mb-1">Čekající objednávky</div>
            <div className="text-3xl font-bold text-slate-900">{stats.pendingOrders}</div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link
            href="/admin/kurzy"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:border-blue-600 border-2 border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-600 transition-colors">
              <svg
                className="w-6 h-6 text-blue-600 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Správa kurzů</h3>
            <p className="text-slate-600">Přidávat, upravovat a mazat kurzy a jejich termíny</p>
          </Link>

          <Link
            href="/admin/objednavky"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:border-cyan-500 border-2 border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-cyan-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500 transition-colors">
              <svg
                className="w-6 h-6 text-cyan-600 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Správa objednávek</h3>
            <p className="text-slate-600">Zobrazit, schvalovat a rušit objednávky</p>
          </Link>

          <Link
            href="/admin/statistiky"
            className="bg-white rounded-2xl shadow-xl p-8 hover:shadow-2xl hover:border-emerald-500 border-2 border-transparent transition-all group"
          >
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-emerald-500 transition-colors">
              <svg
                className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">Statistiky</h3>
            <p className="text-slate-600">Detailní přehledy tržeb a návštěvnosti</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
