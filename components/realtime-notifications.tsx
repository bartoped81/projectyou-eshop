'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

interface Notification {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: number;
}

// Helper function for correct Czech pluralization
function getAvailableSpotsText(count: number): string {
  if (count === 1) return '1 volné místo';
  if (count >= 2 && count <= 4) return `${count} volná místa`;
  return `${count} volných míst`;
}

export function RealtimeNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    // Subscribe k všem změnám v course_dates
    const channel = supabase
      .channel('all-course-dates')
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'course_dates',
        },
        async (payload: any) => {
          const { old: oldData, new: newData } = payload;

          // Pokud se změnil počet rezervací
          if (oldData.current_booked_count !== newData.current_booked_count) {
            // Získej informace o kurzu
            const { data: courseData } = await supabase
              .from('courses')
              .select('title')
              .eq('id', newData.course_id)
              .single();

            const availableSpots = newData.max_capacity - newData.current_booked_count;
            let message = '';
            let type: 'info' | 'success' | 'warning' | 'error' = 'info';

            if (availableSpots === 0) {
              message = `Kurz "${courseData?.title}" je plně obsazen!`;
              type = 'error';
            } else if (availableSpots <= 3) {
              message = `Kurz "${courseData?.title}" má pouze ${getAvailableSpotsText(availableSpots)}!`;
              type = 'warning';
            } else {
              message = `Nová rezervace na kurz "${courseData?.title}"`;
              type = 'success';
            }

            const notification: Notification = {
              id: `${Date.now()}-${Math.random()}`,
              message,
              type,
              timestamp: Date.now(),
            };

            setNotifications((prev) => [...prev, notification]);

            // Automaticky odebrat po 5 sekundách
            setTimeout(() => {
              setNotifications((prev) => prev.filter((n) => n.id !== notification.id));
            }, 5000);
          }
        }
      )
      .subscribe();

    return () => {
      channel.unsubscribe();
    };
  }, []);

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const getNotificationStyles = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return 'bg-emerald-50 border-emerald-500 text-emerald-900';
      case 'warning':
        return 'bg-amber-50 border-amber-500 text-amber-900';
      case 'error':
        return 'bg-rose-50 border-rose-500 text-rose-900';
      default:
        return 'bg-blue-50 border-blue-500 text-blue-900';
    }
  };

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'warning':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        );
      default:
        return (
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  if (notifications.length === 0) return null;

  return (
    <div className="fixed top-24 right-4 z-50 space-y-3 max-w-sm">
      {notifications.map((notification) => (
        <div
          key={notification.id}
          className={`border-l-4 rounded-lg shadow-xl p-4 flex items-start space-x-3 animate-slide-in ${getNotificationStyles(
            notification.type
          )}`}
        >
          <div className="flex-shrink-0">{getIcon(notification.type)}</div>
          <div className="flex-1">
            <p className="font-semibold text-sm">{notification.message}</p>
          </div>
          <button
            onClick={() => removeNotification(notification.id)}
            className="flex-shrink-0 hover:opacity-70 transition-opacity"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      ))}

      <style jsx>{`
        @keyframes slide-in {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        .animate-slide-in {
          animation: slide-in 0.3s ease-out;
        }
      `}</style>
    </div>
  );
}
