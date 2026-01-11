"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CourseWithDates } from "@/lib/courses-loader";
import { LecturerSection } from "@/components/lecturer-section";
import { TermSelection } from "@/components/term-selection";
import { getLecturerBySlug } from "@/lib/lecturers-data";
import { Zap, MessageSquare, Users2 } from "lucide-react";
import { CourseBlock } from "@/components/course-block";
import { AI_COURSE_BLOCKS } from "@/lib/ai-course-blocks-data";
import { LEDOVKA_BLOCKS } from "@/lib/ledovka-blocks-data";
import { IMPROV_BLOCKS } from "@/lib/improv-blocks-data";
import { AI_TAKEAWAYS } from "@/lib/ai-takeaways-data";
import { LEDOVKA_TAKEAWAYS } from "@/lib/ledovka-takeaways-data";
import { IMPROV_TAKEAWAYS } from "@/lib/improv-takeaways-data";
import { TargetAudienceCard } from "@/components/target-audience-card";
import { FeatureCard } from "@/components/feature-card";
import { TakeawaysSection } from "@/components/takeaways-section";

export default function CourseDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const [course, setCourse] = useState<CourseWithDates | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCourse() {
      const { data, error } = await supabase
        .from("courses")
        .select(
          `
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
        `
        )
        .eq("slug", slug)
        .single();

      if (error || !data) {
        setLoading(false);
        return;
      }

      // Filter only future active dates with available capacity
      const courseWithFutureDates = {
        ...data,
        course_dates: (data.course_dates || [])
          .filter(
            (date: any) =>
              date.is_active &&
              new Date(date.start_date) > new Date() &&
              date.current_booked_count < date.max_capacity
          )
          .sort(
            (a: any, b: any) =>
              new Date(a.start_date).getTime() -
              new Date(b.start_date).getTime()
          ),
      };

      setCourse(courseWithFutureDates);
      setLoading(false);
    }

    loadCourse();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-600">Načítám kurz...</p>
        </div>
      </div>
    );
  }

  if (!course) {
    notFound();
  }

  const lecturer = getLecturerBySlug(slug);

  return (
    <>
      <div className="min-h-screen bg-slate-50">
        {/* Hero Section */}
        <section className="bg-white border-b border-slate-200 py-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-slate-900 mb-4">
                {course.title}
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                {course.short_description}
              </p>
            </div>
          </div>
        </section>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Course Content (8 sloupců = 67%) */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              {/* Show CourseBlock components for AI course */}
              {slug === "ai-firemni-akcelerator" ? (
                <>
                  {/* Pro koho je kurz určen */}
                  <div className="mb-12">
                    <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto">
                      Kurz je připraven specificky pro dvě klíčové role ve středních
                      a menších firmách:
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mt-6">
                      <TargetAudienceCard
                        title="Majitelé a nejvyšší vedení"
                        description="Kteří potřebují strategický nadhled, chtějí firmu rozvíjet, ale topí se v každodenní operativě."
                        icon="briefcase"
                        bgColor="bg-blue-100"
                        textColor="text-blue-600"
                      />
                      <TargetAudienceCard
                        title='"Pravá ruka majitele" (Implementátoři)'
                        description='Provozní ředitelé, schopní manažeři nebo nástupci, kteří mají za úkol přinést do firmy inovaci, "odmakat" zavedení do praxe a naučit to ostatní.'
                        icon="zap"
                        bgColor="bg-cyan-100"
                        textColor="text-cyan-600"
                      />
                    </div>

                    <div className="mt-6 text-center bg-white p-3 rounded-lg max-w-3xl mx-auto border border-slate-200">
                      <p className="text-slate-600 text-sm">
                        Poznámka: Kurz je vhodný i pro ty, kteří AI už používají, ale
                        mají podezření, že využívají jen z malého procenta potenciálu
                        nebo si nejsou jisti, jak s AI pracovat bezpečně.
                      </p>
                    </div>
                  </div>

                  {/* Struktura kurzu - Intro text */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Struktura kurzu
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                      Kurz je postaven jako{" "}
                      <span className="text-slate-900 font-semibold">
                        průchod virtuální společností
                      </span>
                      . Neřešíme nástroje izolovaně, ale aplikujeme je na životní
                      cyklus zakázky a řízení firmy.
                    </p>
                  </div>

                  {/* Day 1 Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-blue-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                        DEN 1
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Strategická expanze & Růst tržeb
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {AI_COURSE_BLOCKS.slice(0, 4).map((block, index) => (
                        <CourseBlock key={index} {...block} />
                      ))}
                    </div>
                  </div>

                  {/* Day 2 Header */}
                  <div className="mb-8">
                    <div className="flex items-center gap-3 mb-6">
                      <span className="bg-cyan-600 text-white text-sm font-bold px-3 py-1 rounded-full">
                        DEN 2
                      </span>
                      <h2 className="text-2xl font-bold text-slate-900">
                        Firma na autopilota: Systém, Data & Automatizace
                      </h2>
                    </div>
                    <div className="space-y-6">
                      {AI_COURSE_BLOCKS.slice(4, 8).map((block, index) => (
                        <CourseBlock key={index + 4} {...block} />
                      ))}
                    </div>
                  </div>

                  {/* Co si odnesete */}
                  <TakeawaysSection
                    title={AI_TAKEAWAYS.title}
                    subtitle={AI_TAKEAWAYS.subtitle}
                    items={AI_TAKEAWAYS.items}
                  />
                </>
              ) : slug === "ledove-dobrodruzstvi" ? (
                /* Ledové dobrodružství - unified layout */
                <>
                  {/* Pro koho je kurz určen */}
                  <div className="mb-12">
                    <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto">
                      Ideální pro lidi, kteří hledají autentický rozvoj a posílit
                      svůj leadership v náročných okamžicích.
                    </p>

                    <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto mt-6">
                      <TargetAudienceCard
                        title="Leadery a Manažery"
                        description="Kteří potřebují trénovat rozhodování pod tlakem, práci s odporem a umění vést s pokorou a empatií."
                        icon="briefcase"
                        bgColor="bg-blue-100"
                        textColor="text-blue-600"
                      />
                      <TargetAudienceCard
                        title="Týmy a Oddělení"
                        description="Které chtějí posílit soudržnost, vzájemnou důvěru a schopnost otevřené komunikace v náročných časech."
                        icon="zap"
                        bgColor="bg-cyan-100"
                        textColor="text-cyan-600"
                      />
                    </div>
                  </div>

                  {/* Struktura programu - Intro text */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Průběh expedice
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                      Jeden den, který změní váš pohled na vedení lidí. Trénink asertivity a vyjednávání v realistickém prostředí polární expedice.
                    </p>
                  </div>

                  {/* Bloky - první část (modré) */}
                  <div className="space-y-6 mb-12">
                    {LEDOVKA_BLOCKS.slice(0, 4).map((block, index) => (
                      <CourseBlock key={index} {...block} />
                    ))}
                  </div>

                  {/* Lunch Break */}
                  <div className="flex items-center justify-center py-6 mb-12">
                    <div className="inline-flex items-center px-6 py-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-600 text-sm font-medium">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 mr-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
                        <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z" />
                        <line x1="6" x2="6" y1="2" y2="8" />
                        <line x1="10" x2="10" y1="2" y2="8" />
                        <line x1="14" x2="14" y1="2" y2="8" />
                      </svg>
                      12:45 – 13:45 Oběd a polární sdílení
                    </div>
                  </div>

                  {/* Bloky - druhá část (cyan) */}
                  <div className="space-y-6">
                    {LEDOVKA_BLOCKS.slice(4).map((block, index) => (
                      <CourseBlock key={index + 4} {...block} />
                    ))}
                  </div>

                  {/* Co si odnesete */}
                  <TakeawaysSection
                    title={LEDOVKA_TAKEAWAYS.title}
                    items={LEDOVKA_TAKEAWAYS.items}
                  />
                </>
              ) : slug === "aplikovana-improvizace" ? (
                /* Aplikovaná improvizace - unified layout */
                <>
                  {/* K čemu je to dobré */}
                  <div className="mb-12">
                    <p className="text-lg text-slate-600 text-center max-w-3xl mx-auto mb-6">
                      Improvizace není jen zábava – je to praktický nástroj pro byznys, který vám pomůže reagovat s lehkostí, vést týmy a komunikovat přesvědčivě.
                    </p>

                    <div className="grid md:grid-cols-3 gap-6">
                      <FeatureCard
                        icon={Zap}
                        title="Pohotovost"
                        description="Naučíte se reagovat s lehkostí i v úplně nepředvídatelných situacích před klientem nebo týmem."
                        iconColor="text-blue-600"
                        iconBgColor="bg-blue-100"
                      />
                      <FeatureCard
                        icon={MessageSquare}
                        title="Storytelling"
                        description="Přirozeně rozvinete svůj hlas, projev a schopnost vyprávět příběhy, které lidi skutečně strhnou."
                        iconColor="text-cyan-600"
                        iconBgColor="bg-cyan-100"
                      />
                      <FeatureCard
                        icon={Users2}
                        title="Spolupráce"
                        description='Poznáte základní principy "Ano, a...", které fungují na jevišti i v komunikaci a vztazích v běžném životě.'
                        iconColor="text-blue-600"
                        iconBgColor="bg-blue-100"
                      />
                    </div>
                  </div>

                  {/* Struktura workshopu - Intro text */}
                  <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Struktura workshopu
                    </h2>
                    <p className="text-xl text-slate-600 max-w-3xl mx-auto">
                      Jednodenní intenzivní prožitek v našem novém tréninkovém zázemí. Od odstranění strachu z chyby až po aplikaci v reálném byznysu.
                    </p>
                  </div>

                  {/* Bloky workshopu */}
                  <div className="space-y-6">
                    {IMPROV_BLOCKS.map((block, index) => (
                      <CourseBlock key={index} {...block} />
                    ))}
                  </div>

                  {/* Co si odnesete */}
                  <TakeawaysSection
                    title={IMPROV_TAKEAWAYS.title}
                    items={IMPROV_TAKEAWAYS.items}
                  />
                </>
              ) : (
                /* Fallback to HTML content for any other courses */
                <div
                  className="bg-white rounded-xl shadow-sm border border-slate-200 p-8 mb-8 prose prose-slate max-w-none prose-headings:font-bold prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-8 prose-h3:text-2xl prose-h3:mb-4 prose-p:text-slate-700 prose-p:leading-relaxed prose-ul:list-disc prose-ul:pl-6 prose-li:text-slate-700"
                  dangerouslySetInnerHTML={{ __html: course.full_html_content }}
                />
              )}
            </div>

            {/* Right Column - Sticky Booking (4 sloupce = 33%) */}
            <div className="lg:col-span-4 order-1 lg:order-2" id="booking">
              {course.course_dates && course.course_dates.length > 0 ? (
                <TermSelection
                  courseTitle={course.title}
                  courseSlug={course.slug}
                  courseDates={course.course_dates}
                  pricePerPerson={course.price_no_vat}
                />
              ) : (
                <div className="bg-white border border-slate-200 rounded-xl p-6 sticky top-24">
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">
                    Rezervace
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Momentálně nejsou k dispozici žádné termíny pro tento kurz.
                  </p>
                  <a
                    href="mailto:info@projectyou.cz"
                    className="block w-full text-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Kontaktujte nás
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Lecturer Section */}
        {lecturer && (
          <LecturerSection
            name={lecturer.name}
            bio={lecturer.bio}
            photo={lecturer.photo}
          />
        )}
      </div>

      {/* Mobile Sticky CTA */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 shadow-lg z-40 p-4">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="text-sm text-slate-600">Cena od</p>
            <p className="text-xl font-bold text-blue-600">
              {course.price_no_vat.toLocaleString("cs-CZ")} Kč
            </p>
          </div>
          <button
            onClick={() => {
              const bookingSection = document.getElementById("booking");
              if (bookingSection) {
                bookingSection.scrollIntoView({ behavior: "smooth" });
              }
            }}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            Vybrat termín
          </button>
        </div>
      </div>
    </>
  );
}
