'use client';

import { useEffect, useState } from 'react';
import { subscribeToCourseDateChanges } from '@/lib/supabase';

interface RealtimeCapacityProps {
  courseId: string;
  courseDateId: string;
  initialMaxCapacity: number;
  initialCurrentBooked: number;
}

// Helper function for correct Czech pluralization
function getAvailableSpotsText(count: number): string {
  if (count === 1) return '1 místo';
  if (count >= 2 && count <= 4) return `${count} místa`;
  return `${count} míst`;
}

export function RealtimeCapacity({
  courseId,
  courseDateId,
  initialMaxCapacity,
  initialCurrentBooked,
}: RealtimeCapacityProps) {
  const [maxCapacity, setMaxCapacity] = useState(initialMaxCapacity);
  const [currentBooked, setCurrentBooked] = useState(initialCurrentBooked);
  const [justUpdated, setJustUpdated] = useState(false);

  useEffect(() => {
    // Subscribe k real-time změnám
    const channel = subscribeToCourseDateChanges(courseId, (payload: any) => {
      if (payload.new && payload.new.id === courseDateId) {
        setMaxCapacity(payload.new.max_capacity);
        setCurrentBooked(payload.new.current_booked_count);

        // Animace při změně
        setJustUpdated(true);
        setTimeout(() => setJustUpdated(false), 2000);
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [courseId, courseDateId]);

  const availableSpots = maxCapacity - currentBooked;
  const percentFull = (currentBooked / maxCapacity) * 100;

  const getStatusColor = () => {
    if (availableSpots === 0) return 'text-rose-600';
    if (percentFull >= 80) return 'text-amber-600';
    return 'text-emerald-600';
  };

  const getStatusText = () => {
    if (availableSpots === 0) return 'Obsazeno';
    if (availableSpots === 1) return 'Poslední místo!';
    if (percentFull >= 80) return `Zbývá ${getAvailableSpotsText(availableSpots)}`;
    return `Volných ${getAvailableSpotsText(availableSpots)}`;
  };

  return (
    <div
      className={`flex items-center space-x-3 transition-all ${
        justUpdated ? 'scale-105' : 'scale-100'
      }`}
    >
      {/* Progress Bar */}
      <div className="flex-1">
        <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-500 ${
              availableSpots === 0
                ? 'bg-rose-500'
                : percentFull >= 80
                ? 'bg-amber-500'
                : 'bg-emerald-500'
            }`}
            style={{ width: `${percentFull}%` }}
          />
        </div>
      </div>

      {/* Status Text */}
      <div className={`font-semibold text-sm ${getStatusColor()}`}>
        {getStatusText()}
      </div>

      {/* Live Indicator */}
      {justUpdated && (
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-blue-600 rounded-full animate-pulse"></div>
          <span className="text-xs text-blue-600 font-medium">Aktualizováno</span>
        </div>
      )}
    </div>
  );
}
