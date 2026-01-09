'use client';

import { useAuth } from '@/lib/auth-context';
import { signOut } from '@/lib/supabase';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export function UserMenu() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut();
    router.push('/');
  };

  if (loading) {
    return (
      <div className="h-10 w-10 bg-slate-200 rounded-full animate-pulse"></div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center space-x-3">
        <Link
          href="/prihlaseni"
          className="px-4 py-2 text-slate-700 hover:text-blue-600 font-medium transition-colors"
        >
          Přihlásit se
        </Link>
        <Link
          href="/registrace"
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
        >
          Registrace
        </Link>
      </div>
    );
  }

  const displayName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Uživatel';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="relative group">
      {/* Avatar */}
      <button className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-slate-100 transition-colors">
        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center text-white font-semibold">
          {initials}
        </div>
        <div className="hidden lg:block text-left">
          <div className="text-sm font-semibold text-slate-900">{displayName}</div>
          <div className="text-xs text-slate-500">{user.email}</div>
        </div>
        <svg className="w-4 h-4 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <div className="absolute right-0 top-full mt-2 w-56 bg-white shadow-xl rounded-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all border border-slate-200">
        <div className="p-4 border-b border-slate-200">
          <div className="font-semibold text-slate-900">{displayName}</div>
          <div className="text-sm text-slate-500">{user.email}</div>
        </div>

        <div className="py-2">
          <Link
            href="/moje-objednavky"
            className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
          >
            Moje objednávky
          </Link>
          <Link
            href="/admin"
            className="block px-4 py-3 text-slate-700 hover:bg-slate-50 hover:text-blue-600 transition-colors"
          >
            Admin dashboard
          </Link>
        </div>

        <div className="border-t border-slate-200 py-2">
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 text-rose-600 hover:bg-rose-50 transition-colors font-medium"
          >
            Odhlásit se
          </button>
        </div>
      </div>
    </div>
  );
}
