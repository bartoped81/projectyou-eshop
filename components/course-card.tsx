import Link from "next/link";
import { CourseWithDates } from "@/lib/courses-loader";

interface CourseCardProps {
  course: CourseWithDates;
}

export function CourseCard({ course }: CourseCardProps) {
  const priceWithVat = course.price_no_vat * (1 + course.vat_rate / 100);

  return (
    <article className="bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group flex flex-col">
      {/* Obrázek kurzu - landscape, nahoře */}
      {course.image_url && (
        <div className="w-full h-48 flex-shrink-0 bg-slate-100 overflow-hidden">
          <img
            src={course.image_url}
            alt={course.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>
      )}

      {/* Obsah - vpravo */}
      <div className="flex-1 p-4 flex flex-col">
        <div className="flex-1">
          <Link href={`/open-courses/${course.slug}`}>
            <h2 className="text-lg font-bold text-slate-900 mb-1 font-urbanist group-hover:text-blue-600 transition-colors cursor-pointer hover:underline">
              {course.title}
            </h2>
          </Link>

          <p className="text-sm text-slate-600 mb-3 line-clamp-2 leading-snug">
            {course.short_description}
          </p>

          {/* Lektor */}
          <div className="flex items-center mb-3">
            {course.lecturer_image_url && (
              <img
                src={course.lecturer_image_url}
                alt={course.lecturer_name}
                className="w-6 h-6 rounded-full mr-2 object-cover"
              />
            )}
            <p className="text-xs text-slate-600">
              <span className="font-semibold text-slate-900">{course.lecturer_name}</span>
            </p>
          </div>

          {/* Cena a počet termínů */}
          <div className="mb-3">
            <p className="text-lg font-bold text-blue-600">
              {course.price_no_vat.toLocaleString("cs-CZ")} Kč
              <span className="text-xs text-slate-500 font-normal ml-1">bez DPH</span>
            </p>

            {/* Počet dostupných termínů */}
            {course.course_dates && course.course_dates.length > 0 ? (
              <p className="text-xs text-green-600 font-semibold inline-flex items-center mt-1">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                {course.course_dates.length} dostupných termínů
              </p>
            ) : (
              <p className="text-xs text-slate-400 inline-flex items-center mt-1">
                <svg
                  className="w-3 h-3 mr-1"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
                Momentálně nejsou dostupné termíny
              </p>
            )}
          </div>
        </div>

        {/* Tlačítko */}
        <Link
          href={`/open-courses/${course.slug}`}
          className="block w-full text-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg transition-colors shadow-sm hover:shadow-md mt-auto"
        >
          Detail kurzu
        </Link>
      </div>
    </article>
  );
}
