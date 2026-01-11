import { supabase } from "./supabase";

export interface CourseWithDates {
  id: string;
  title: string;
  slug: string;
  short_description: string;
  full_html_content: string;
  price_no_vat: number;
  vat_rate: number;
  image_url: string | null;
  lecturer_name: string;
  lecturer_bio: string | null;
  lecturer_image_url: string | null;
  created_at: string;
  updated_at: string;
  course_dates: CourseDate[];
}

export interface CourseDate {
  id: string;
  course_id: string;
  start_date: string;
  end_date: string;
  location: string;
  max_capacity: number;
  current_booked_count: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

/**
 * Načte všechny aktivní kurzy s jejich budoucími termíny
 */
export async function loadCoursesWithFutureDates(): Promise<CourseWithDates[]> {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      course_dates (
        id,
        course_id,
        start_date,
        end_date,
        location,
        max_capacity,
        current_booked_count,
        is_active,
        created_at,
        updated_at
      )
    `)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error loading courses:", error);
    return [];
  }

  // Filtrujeme pouze budoucí aktivní termíny
  const coursesWithFutureDates = data?.map((course: any) => ({
    ...course,
    course_dates: (course.course_dates || [])
      .filter(
        (date: CourseDate) =>
          date.is_active &&
          new Date(date.start_date) > new Date() &&
          date.current_booked_count < date.max_capacity
      )
      .sort(
        (a: CourseDate, b: CourseDate) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      ),
  }));

  return coursesWithFutureDates || [];
}

/**
 * Načte všechny kurzy s budoucími termíny včetně plných (pro kalendář)
 */
export async function loadAllCoursesForCalendar(): Promise<CourseWithDates[]> {
  const { data, error } = await supabase
    .from("courses")
    .select(`
      *,
      course_dates (
        id,
        course_id,
        start_date,
        end_date,
        location,
        max_capacity,
        current_booked_count,
        is_active,
        created_at,
        updated_at
      )
    `)
    .order("created_at", { ascending: true });

  if (error) {
    console.error("Error loading courses:", error);
    return [];
  }

  // Filtrujeme pouze budoucí aktivní termíny (včetně plných)
  const coursesWithFutureDates = data?.map((course: any) => ({
    ...course,
    course_dates: (course.course_dates || [])
      .filter(
        (date: CourseDate) =>
          date.is_active &&
          new Date(date.start_date) > new Date()
      )
      .sort(
        (a: CourseDate, b: CourseDate) =>
          new Date(a.start_date).getTime() - new Date(b.start_date).getTime()
      ),
  }));

  return coursesWithFutureDates || [];
}

/**
 * Získá krátké označení kurzu pro kalendář (např. "AI", "Impro")
 */
export function getCourseShortName(courseTitle: string): string {
  if (courseTitle.includes("AI") || courseTitle.includes("Akcelerátor")) {
    return "AI";
  }
  if (courseTitle.includes("Improvizace")) {
    return "Impro";
  }
  if (courseTitle.includes("Ledov")) {
    return "Led";
  }
  return courseTitle.substring(0, 3);
}

/**
 * Získá barvu pro kurz podle jeho typu
 */
export function getCourseColor(courseTitle: string, isFull: boolean = false): string {
  // Pokud je kurz plný, použij šedou barvu
  if (isFull) {
    return "bg-slate-400 text-white";
  }

  if (courseTitle.includes("AI") || courseTitle.includes("Akcelerátor")) {
    return "bg-blue-600 text-white";
  }
  if (courseTitle.includes("Improvizace")) {
    return "bg-yellow-500 text-white";
  }
  if (courseTitle.includes("Ledov")) {
    return "bg-red-600 text-white";
  }
  return "bg-slate-600 text-white";
}

/**
 * Kontroluje, zda je daný termín kurzu plný
 */
export function isCourseDateFull(courseDate: CourseDate): boolean {
  return courseDate.current_booked_count >= courseDate.max_capacity;
}

/**
 * Vrací všechny dny, které zabere kurz (start až end)
 */
export function getCourseDateRange(startDate: string, endDate: string): Date[] {
  const dates: Date[] = [];
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Normalize na začátek dne
  start.setHours(0, 0, 0, 0);
  end.setHours(0, 0, 0, 0);

  const current = new Date(start);
  while (current <= end) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }

  return dates;
}
