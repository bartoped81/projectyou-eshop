"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";
import {
  CourseWithDates,
  CourseDate,
  getCourseShortName,
  getCourseColor,
  getCourseDateRange,
  isCourseDateFull,
} from "@/lib/courses-loader";

interface EventsCalendarProps {
  courses: CourseWithDates[];
  onDateClick?: (date: Date, coursesOnDate: Array<{ course: CourseWithDates; courseDate: CourseDate }>) => void;
}

interface DayEvent {
  course: CourseWithDates;
  courseDate: CourseDate;
  isStartDate: boolean;
  isFull: boolean;
}

// Helper function for correct Czech pluralization
function getAvailableSpotsText(count: number): string {
  if (count === 0) return 'Obsazeno';
  if (count === 1) return '1 volné místo';
  if (count >= 2 && count <= 4) return `${count} volná místa`;
  return `${count} volných míst`;
}

export function EventsCalendar({ courses, onDateClick }: EventsCalendarProps) {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [hoveredDay, setHoveredDay] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Získej rok a měsíc z currentDate
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // První den měsíce
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  // Den v týdnu prvního dne (0 = neděle, 6 = sobota)
  // Přepočítáme tak, že pondělí je 0
  const firstDayWeekday = (firstDayOfMonth.getDay() + 6) % 7;

  // Kolik dní má měsíc
  const daysInMonth = lastDayOfMonth.getDate();

  // Připrav mapu událostí pro každý den
  const eventsMap = new Map<string, DayEvent[]>();

  courses.forEach((course) => {
    course.course_dates?.forEach((courseDate) => {
      const dateRange = getCourseDateRange(courseDate.start_date, courseDate.end_date);
      const startDate = new Date(courseDate.start_date);
      startDate.setHours(0, 0, 0, 0);

      dateRange.forEach((date) => {
        const dateKey = `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
        if (!eventsMap.has(dateKey)) {
          eventsMap.set(dateKey, []);
        }

        const isStartDate = date.getTime() === startDate.getTime();
        const isFull = isCourseDateFull(courseDate);

        eventsMap.get(dateKey)!.push({
          course,
          courseDate,
          isStartDate,
          isFull,
        });
      });
    });
  });

  // Vytvoř grid dnů
  const days: Array<{ day: number; events: DayEvent[] } | null> = [];

  // Prázdná místa před prvním dnem
  for (let i = 0; i < firstDayWeekday; i++) {
    days.push(null);
  }

  // Dny měsíce
  for (let day = 1; day <= daysInMonth; day++) {
    const dateKey = `${year}-${month}-${day}`;
    const events = eventsMap.get(dateKey) || [];
    days.push({ day, events });
  }

  // Navigace měsíců
  const goToPreviousMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  // Formátování názvu měsíce
  const monthName = new Intl.DateTimeFormat("cs-CZ", {
    month: "long",
    year: "numeric",
  }).format(currentDate);

  // Handler kliknutí na den
  const handleDayClick = (day: number, events: DayEvent[]) => {
    if (events.length === 0) return;

    const clickedDate = new Date(year, month, day);
    // Filtruj pouze dostupné kurzy (ne plné)
    const coursesOnDate = events
      .filter((e) => e.isStartDate && !e.isFull)
      .map((e) => ({ course: e.course, courseDate: e.courseDate }));

    if (coursesOnDate.length > 0 && onDateClick) {
      onDateClick(clickedDate, coursesOnDate);
    }
  };

  // Handler pro najetí myší
  const handleMouseEnter = (day: number, e: React.MouseEvent) => {
    setHoveredDay(day);
    const rect = e.currentTarget.getBoundingClientRect();
    setTooltipPosition({
      x: rect.left + rect.width / 2,
      y: rect.top - 10,
    });
  };

  const handleMouseLeave = () => {
    setHoveredDay(null);
  };

  // Formátování času
  const formatTime = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('cs-CZ', { hour: '2-digit', minute: '2-digit' });
  };

  // Výpočet délky kurzu ve dnech
  const getCourseDuration = (startDate: string, endDate: string) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(0, 0, 0, 0);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // Připrav tooltip obsah
  const tooltipContent = hoveredDay !== null && mounted ? (() => {
    const dateKey = `${year}-${month}-${hoveredDay}`;
    const dayEvents = eventsMap.get(dateKey) || [];
    const startEvents = dayEvents.filter(e => e.isStartDate);

    if (startEvents.length === 0) return null;

    return (
      <div
        className="fixed z-[9999] pointer-events-none"
        style={{
          left: `${tooltipPosition.x}px`,
          top: `${tooltipPosition.y}px`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="bg-slate-900 text-white rounded-lg shadow-2xl p-3 max-w-xs mb-2 border border-slate-700">
          {startEvents.map((event, idx) => {
            const availableSpots = event.courseDate.max_capacity - event.courseDate.current_booked_count;
            return (
              <div key={idx} className={idx > 0 ? 'mt-3 pt-3 border-t border-slate-700' : ''}>
                <div className="font-bold text-sm mb-1.5">{event.course.title}</div>
                <div className="text-xs space-y-1 text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">📅</span>
                    <span className="font-semibold text-white">
                      {getCourseDuration(event.courseDate.start_date, event.courseDate.end_date)}denní kurz
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">⏰</span>
                    <span>{formatTime(event.courseDate.start_date)} - {formatTime(event.courseDate.end_date)}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">📍</span>
                    <span>{event.courseDate.location}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <span className="font-semibold text-white">👥</span>
                    <span className={availableSpots < 5 && availableSpots > 0 ? 'text-yellow-400 font-semibold' : availableSpots === 0 ? 'text-red-400 font-semibold' : ''}>
                      {getAvailableSpotsText(availableSpots)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  })() : null;

  return (
    <>
    <div className="bg-white border border-slate-200 rounded-xl p-6 shadow-sm sticky top-24">
      {/* Header s navigací */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={goToPreviousMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Předchozí měsíc"
        >
          <ChevronLeft className="w-5 h-5 text-slate-600" />
        </button>

        <h3 className="text-lg font-bold text-slate-900 capitalize">
          {monthName}
        </h3>

        <button
          onClick={goToNextMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Následující měsíc"
        >
          <ChevronRight className="w-5 h-5 text-slate-600" />
        </button>
      </div>

      {/* Dny v týdnu */}
      <div className="grid grid-cols-7 gap-2 mb-2">
        {["Po", "Út", "St", "Čt", "Pá", "So", "Ne"].map((dayName) => (
          <div
            key={dayName}
            className="text-center text-xs font-semibold text-slate-500 py-2"
          >
            {dayName}
          </div>
        ))}
      </div>

      {/* Grid dnů */}
      <div className="grid grid-cols-7 gap-2">
        {days.map((dayData, index) => {
          if (!dayData) {
            return <div key={`empty-${index}`} className="aspect-square" />;
          }

          const { day, events } = dayData;
          const hasEvents = events.length > 0;
          const hasStartEvents = events.some((e) => e.isStartDate && !e.isFull);
          const today = new Date();
          const isToday =
            today.getDate() === day &&
            today.getMonth() === month &&
            today.getFullYear() === year;

          return (
            <button
              key={day}
              onClick={() => handleDayClick(day, events)}
              onMouseEnter={(e) => hasEvents ? handleMouseEnter(day, e) : null}
              onMouseLeave={handleMouseLeave}
              disabled={!hasStartEvents}
              className={`
                aspect-square p-1 rounded-lg border transition-all relative
                ${isToday ? "border-blue-500 border-2" : "border-slate-200"}
                ${hasEvents ? "bg-slate-50" : "bg-white"}
                ${hasStartEvents ? "cursor-pointer hover:shadow-md hover:border-blue-400" : ""}
                ${!hasStartEvents && hasEvents ? "cursor-default" : ""}
              `}
            >
              <div className="text-sm font-semibold text-slate-900 mb-1">
                {day}
              </div>

              {/* Badges pro kurzy */}
              {hasEvents && (
                <div className="flex flex-wrap gap-0.5 justify-center">
                  {events.slice(0, 2).map((event, idx) => {
                    const shortName = getCourseShortName(event.course.title);
                    const colorClass = getCourseColor(event.course.title, event.isFull);

                    return (
                      <span
                        key={idx}
                        className={`text-[8px] px-1 py-0.5 rounded ${colorClass} font-bold ${
                          !event.isStartDate ? "opacity-50" : ""
                        }`}
                      >
                        {shortName}
                      </span>
                    );
                  })}
                  {events.length > 2 && (
                    <span className="text-[8px] px-1 py-0.5 rounded bg-slate-400 text-white font-bold">
                      +{events.length - 2}
                    </span>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>

      {/* Legenda */}
      <div className="mt-6 pt-6 border-t border-slate-200">
        <h4 className="text-xs font-semibold text-slate-700 mb-3">Typy kurzů:</h4>
        <div className="space-y-2">
          {/* AI - Modrá */}
          <div className="flex items-center text-xs">
            <span className="w-16 px-2 py-1 rounded font-bold mr-2 text-center bg-blue-600 text-white">
              AI
            </span>
            <span className="text-slate-600">AI Firemní Akcelerátor</span>
          </div>

          {/* Impro - Žlutá */}
          <div className="flex items-center text-xs">
            <span className="w-16 px-2 py-1 rounded font-bold mr-2 text-center bg-yellow-500 text-white">
              Impro
            </span>
            <span className="text-slate-600">Aplikovaná Improvizace</span>
          </div>

          {/* Led - Červená */}
          <div className="flex items-center text-xs">
            <span className="w-16 px-2 py-1 rounded font-bold mr-2 text-center bg-red-600 text-white">
              Led
            </span>
            <span className="text-slate-600">Ledové dobrodružství</span>
          </div>
        </div>
      </div>
    </div>

    {/* Tooltip portal */}
    {tooltipContent && createPortal(tooltipContent, document.body)}
    </>
  );
}
