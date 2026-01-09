"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { CourseCard } from "@/components/course-card";
import { EventsCalendar } from "@/components/events-calendar";
import { loadCoursesWithFutureDates, CourseWithDates, CourseDate } from "@/lib/courses-loader";
import { DebugData } from "./debug-data";

export default function OpenCoursesPage() {
  const router = useRouter();
  const [courses, setCourses] = useState<CourseWithDates[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState<{
    date: Date;
    courses: Array<{ course: CourseWithDates; courseDate: CourseDate }>;
  } | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      const data = await loadCoursesWithFutureDates();
      setCourses(data);
    } catch (err) {
      console.error("Error loading courses:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleDateClick = (
    date: Date,
    coursesOnDate: Array<{ course: CourseWithDates; courseDate: CourseDate }>
  ) => {
    if (coursesOnDate.length === 1) {
      // Pokud je jen jeden kurz, přesměruj přímo
      router.push(`/open-courses/${coursesOnDate[0].course.slug}`);
    } else if (coursesOnDate.length > 1) {
      // Pokud je více kurzů, zobraz modal s výběrem
      setSelectedDate({ date, courses: coursesOnDate });
    }
  };

  const closeModal = () => {
    setSelectedDate(null);
  };

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-slate-600">Načítám kurzy...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-white">
      {/* Hero sekce */}
      <section className="bg-gradient-to-br from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 font-urbanist">
            Otevřené kurzy
          </h1>
          <p className="text-xl text-slate-600 max-w-3xl">
            Vyberte si z našich transformačních kurzů, které pomohou vám i vašemu
            týmu růst a dosahovat výjimečných výsledků.
          </p>
        </div>
      </section>

      {/* Hlavní obsah - dvousloupcový layout */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Levý sloupec - Seznam kurzů (2 vedle sebe) */}
            <div className="lg:col-span-8">
              {courses && courses.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {courses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-16 bg-slate-50 rounded-xl">
                  <p className="text-xl text-slate-600">
                    Momentálně nejsou k dispozici žádné otevřené kurzy.
                  </p>
                </div>
              )}
            </div>

            {/* Pravý sloupec - Kalendář (sticky) */}
            <div className="lg:col-span-4">
              <EventsCalendar courses={courses} onDateClick={handleDateClick} />
            </div>
          </div>
        </div>
      </section>

      {/* Modal pro výběr kurzu, když je na jeden den více kurzů */}
      {selectedDate && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-xl shadow-xl max-w-md w-full p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-slate-900 mb-4 font-urbanist">
              Vyberte kurz
            </h3>
            <p className="text-slate-600 mb-6">
              Dne{" "}
              {selectedDate.date.toLocaleDateString("cs-CZ", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}{" "}
              začíná více kurzů:
            </p>

            <div className="space-y-4">
              {selectedDate.courses.map(({ course, courseDate }) => (
                <button
                  key={courseDate.id}
                  onClick={() => router.push(`/open-courses/${course.slug}`)}
                  className="w-full text-left p-4 border border-slate-200 rounded-lg hover:border-blue-500 hover:shadow-md transition-all"
                >
                  <h4 className="font-bold text-slate-900 mb-2">
                    {course.title}
                  </h4>
                  <p className="text-sm text-slate-600 mb-2">
                    {course.lecturer_name}
                  </p>
                  <p className="text-sm text-blue-600 font-semibold">
                    {course.price_no_vat.toLocaleString("cs-CZ")} Kč bez DPH
                  </p>
                </button>
              ))}
            </div>

            <button
              onClick={closeModal}
              className="mt-6 w-full px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold rounded-lg transition-colors"
            >
              Zavřít
            </button>
          </div>
        </div>
      )}

      {/* Debug panel */}
      <DebugData />
    </main>
  );
}
