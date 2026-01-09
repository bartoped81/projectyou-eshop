"use client";

import { useEffect, useState } from "react";
import { useParams, notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import { CourseWithDates } from "@/lib/courses-loader";
import { LecturerSection } from "@/components/lecturer-section";
import { TermSelection } from "@/components/term-selection";
import { getLecturerBySlug } from "@/lib/lecturers-data";
import { ArrowDown, Zap, MessageSquare, Users2, Users, Shield } from "lucide-react";
import { CourseBlock } from "@/components/course-block";
import { AI_COURSE_BLOCKS } from "@/lib/ai-course-blocks-data";
import { TargetAudienceCard } from "@/components/target-audience-card";
import { AgendaBlock } from "@/components/agenda-block";
import { FeatureCard } from "@/components/feature-card";
import { LEDOVKA_AGENDA } from "@/lib/ledovka-data";
import { ImprovModuleBlock } from "@/components/improv-module-block";
import { IMPROV_MODULES } from "@/lib/improv-modules-data";

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

  const scrollToBooking = () => {
    const bookingSection = document.getElementById("booking");
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: "smooth" });
    }
  };

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
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-6">
                {course.short_description}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                {course.course_dates && course.course_dates.length > 0 && (
                  <div className="inline-flex items-center px-4 py-2 rounded-full border border-blue-200 bg-blue-50 text-blue-700 text-sm font-medium">
                    <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2 animate-pulse"></span>
                    {course.course_dates.length} dostupných termínů
                  </div>
                )}
                <button
                  onClick={scrollToBooking}
                  className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white text-lg font-semibold rounded-lg shadow-lg transition-all flex items-center gap-2"
                >
                  Vybrat termín <ArrowDown className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Pro koho je kurz určen - Only for AI course */}
        {slug === "ai-firemni-akcelerator" && (
          <section className="py-12 bg-white border-t border-slate-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                  Pro koho je kurz určen?
                </h2>
                <p className="mt-3 text-lg text-slate-600 max-w-3xl mx-auto">
                  Kurz je připraven specificky pro dvě klíčové role ve středních
                  a menších firmách:
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-4 max-w-5xl mx-auto">
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

              <div className="mt-6 text-center bg-slate-100 p-3 rounded-lg max-w-3xl mx-auto border border-slate-200">
                <p className="text-slate-600 text-xs">
                  (Poznámka: Kurz je vhodný i pro ty, kteří AI už používají, ale
                  mají podezření, že využívají jen z malého procenta potenciálu
                  nebo si nejsou jisti, jak s AI pracovat bezpečně.)
                </p>
              </div>
            </div>
          </section>
        )}

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column - Course Content (8 sloupců = 67%) */}
            <div className="lg:col-span-8 order-2 lg:order-1">
              {/* Show CourseBlock components for AI course */}
              {slug === "ai-firemni-akcelerator" ? (
                <>
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
                </>
              ) : slug === "ledove-dobrodruzstvi" ? (
                /* Ledové dobrodružství - structured layout */
                <>
                  {/* Pro koho je kurz určen */}
                  <div className="mb-12">
                    <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
                      Pro koho je program určen?
                    </h2>
                    <p className="text-lg text-slate-600 max-w-3xl mx-auto text-center mb-8">
                      Program je ideální pro firmy, které hledají autentický
                      rozvoj a chtějí posílit svůj leadership v okamžicích, kdy
                      jde do tuhého.
                    </p>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                      <TargetAudienceCard
                        title="Leadery a Manažery"
                        description="Kteří potřebují trénovat rozhodování pod tlakem, práci s odporem a umění vést s pokorou a empatií."
                        icon="briefcase"
                        bgColor="bg-sky-100"
                        textColor="text-sky-600"
                      />
                      <TargetAudienceCard
                        title="Týmy a Oddělení"
                        description="Které chtějí posílit soudržnost, vzájemnou důvěru a schopnost otevřené komunikace v náročných časech."
                        icon="zap"
                        bgColor="bg-amber-100"
                        textColor="text-amber-600"
                      />
                    </div>
                  </div>

                  {/* Průběh expedice */}
                  <div className="mb-12">
                    <div className="text-center mb-8">
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Průběh expedice
                      </h2>
                      <p className="text-slate-600">
                        Jeden den, který změní váš pohled na vedení lidí.
                      </p>
                    </div>

                    <div className="space-y-4">
                      {LEDOVKA_AGENDA.map((item, index) => (
                        <AgendaBlock key={index} {...item} />
                      ))}

                      {/* Lunch Break */}
                      <div className="flex items-center justify-center py-4 text-slate-400 text-sm font-medium">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="w-4 h-4 mr-2"
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

                      {/* Final Block */}
                      <div className="bg-slate-800 rounded-xl border border-slate-700 shadow-sm overflow-hidden text-white">
                        <div className="p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                            <div className="px-4 py-2 bg-slate-700 text-slate-300 font-mono font-bold rounded-lg text-center min-w-[120px] text-sm">
                              15:00 – 17:00
                            </div>
                            <div className="flex-1">
                              <h3 className="text-lg font-bold text-white mb-3">
                                Návrat z expedice & Transfer do reality
                              </h3>
                              <ul className="space-y-3 text-sm text-slate-300">
                                <li className="flex items-start">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-sky-400 mr-2 mt-0.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m12 16 4-4-4-4" />
                                    <path d="M8 12h8" />
                                  </svg>
                                  Reflexe zažitého: Co pro mě fungovalo?
                                </li>
                                <li className="flex items-start">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-sky-400 mr-2 mt-0.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m12 16 4-4-4-4" />
                                    <path d="M8 12h8" />
                                  </svg>
                                  Formulace osobních závazků pro každodenní
                                  práci.
                                </li>
                                <li className="flex items-start">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-4 h-4 text-sky-400 mr-2 mt-0.5 shrink-0"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <circle cx="12" cy="12" r="10" />
                                    <path d="m12 16 4-4-4-4" />
                                    <path d="M8 12h8" />
                                  </svg>
                                  Odnášíte si 1–2 konkrétní kroky, na kterých
                                  začnete pracovat zítra.
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              ) : slug === "aplikovana-improvizace" ? (
                /* Aplikovaná improvizace - structured layout */
                <>
                  {/* K čemu je to dobré */}
                  <div className="mb-12">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        K čemu je to dobré v byznysu?
                      </h2>
                      <div className="w-20 h-1.5 bg-emerald-500 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8 mb-12">
                      <FeatureCard
                        icon={Zap}
                        title="Pohotovost"
                        description="Naučíte se reagovat s lehkostí i v úplně nepředvídatelných situacích před klientem nebo týmem."
                        iconColor="text-emerald-600"
                        iconBgColor="bg-emerald-100"
                      />
                      <FeatureCard
                        icon={MessageSquare}
                        title="Storytelling"
                        description="Přirozeně rozvinete svůj hlas, projev a schopnost vyprávět příběhy, které lidi skutečně strhnou."
                        iconColor="text-violet-600"
                        iconBgColor="bg-violet-100"
                      />
                      <FeatureCard
                        icon={Users2}
                        title="Spolupráce"
                        description='Poznáte základní principy "Ano, a...", které fungují na jevišti i v komunikaci a vztazích v běžném životě.'
                        iconColor="text-amber-600"
                        iconBgColor="bg-amber-100"
                      />
                    </div>
                  </div>

                  {/* Struktura workshopu */}
                  <div className="mb-12">
                    <div className="text-center mb-10">
                      <h2 className="text-3xl font-bold text-slate-900 mb-4">
                        Struktura workshopu
                      </h2>
                      <p className="text-slate-600 text-lg max-w-2xl mx-auto">
                        Jednodenní intenzivní prožitek v našem novém
                        tréninkovém zázemí.
                      </p>
                    </div>

                    <div className="space-y-6">
                      {IMPROV_MODULES.map((module, index) => (
                        <ImprovModuleBlock
                          key={index}
                          time={module.time}
                          title={module.title}
                          description={module.description}
                          details={module.details}
                          color={module.color}
                        />
                      ))}
                    </div>
                  </div>
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
            onClick={scrollToBooking}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all"
          >
            Vybrat termín
          </button>
        </div>
      </div>
    </>
  );
}
