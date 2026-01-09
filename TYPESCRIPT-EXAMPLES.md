# 📘 TypeScript Examples - Ukázky použití

Tady najdeš ready-to-use příklady pro práci s Supabase v Next.js.

---

## 🎓 Stránka se seznamem kurzů

### `app/kurzy/page.tsx`

```typescript
import { getCourses, formatPrice, calculatePriceWithVat } from '@/lib/supabase';
import Image from 'next/image';
import Link from 'next/link';

export default async function KurzyPage() {
  const courses = await getCourses();

  return (
    <main className="min-h-screen p-8 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl font-bold mb-2 text-slate-900">
          Naše kurzy
        </h1>
        <p className="text-xl text-slate-600 mb-12">
          Vzdělávací programy pro moderní firmy
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course) => {
            const priceWithVat = calculatePriceWithVat(
              course.price_no_vat,
              course.vat_rate
            );

            return (
              <Link
                key={course.id}
                href={`/kurzy/${course.slug}`}
                className="group"
              >
                <div className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow border border-slate-200">
                  {course.image_url && (
                    <div className="relative h-48 w-full">
                      <Image
                        src={course.image_url}
                        alt={course.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6">
                    <h2 className="text-2xl font-bold mb-2 text-slate-900 group-hover:text-indigo-600 transition-colors">
                      {course.title}
                    </h2>
                    <p className="text-slate-600 mb-4 line-clamp-2">
                      {course.short_description}
                    </p>
                    <div className="flex items-center gap-3 mb-4">
                      {course.lecturer_image_url && (
                        <Image
                          src={course.lecturer_image_url}
                          alt={course.lecturer_name}
                          width={40}
                          height={40}
                          className="rounded-full"
                        />
                      )}
                      <div>
                        <p className="text-sm font-medium text-slate-900">
                          {course.lecturer_name}
                        </p>
                        <p className="text-xs text-slate-500">Lektor</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-indigo-600">
                        {formatPrice(priceWithVat)}
                      </span>
                      <span className="text-sm text-slate-500">s DPH</span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">
                      {formatPrice(course.price_no_vat)} bez DPH
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
```

---

## 📄 Detailní stránka kurzu

### `app/kurzy/[slug]/page.tsx`

```typescript
import {
  getCourseBySlug,
  getAvailableCourseDates,
  formatDate,
  formatPrice,
  calculatePriceWithVat,
} from '@/lib/supabase';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface Props {
  params: { slug: string };
}

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = params;

  // Načtení kurzu
  const course = await getCourseBySlug(slug).catch(() => null);
  if (!course) notFound();

  // Načtení dostupných termínů
  const dates = await getAvailableCourseDates(course.id);

  const priceWithVat = calculatePriceWithVat(
    course.price_no_vat,
    course.vat_rate
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero sekce */}
      <section className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl font-bold mb-6">{course.title}</h1>
              <p className="text-xl text-indigo-100 mb-8">
                {course.short_description}
              </p>
              <div className="flex items-center gap-4">
                {course.lecturer_image_url && (
                  <Image
                    src={course.lecturer_image_url}
                    alt={course.lecturer_name}
                    width={64}
                    height={64}
                    className="rounded-full border-4 border-white/20"
                  />
                )}
                <div>
                  <p className="font-semibold text-lg">
                    {course.lecturer_name}
                  </p>
                  <p className="text-indigo-200 text-sm">Lektor kurzu</p>
                </div>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
              <div className="text-center">
                <p className="text-indigo-200 text-sm mb-2">Cena kurzu</p>
                <p className="text-5xl font-bold mb-2">
                  {formatPrice(priceWithVat)}
                </p>
                <p className="text-indigo-200 text-sm">
                  {formatPrice(course.price_no_vat)} bez DPH
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Obsah kurzu */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div
            className="prose prose-slate prose-lg max-w-none"
            dangerouslySetInnerHTML={{ __html: course.full_html_content }}
          />
        </div>
      </section>

      {/* O lektorovi */}
      {course.lecturer_bio && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold mb-8">O lektorovi</h2>
            <div className="flex items-start gap-6">
              {course.lecturer_image_url && (
                <Image
                  src={course.lecturer_image_url}
                  alt={course.lecturer_name}
                  width={120}
                  height={120}
                  className="rounded-2xl"
                />
              )}
              <div>
                <h3 className="text-2xl font-bold mb-3">
                  {course.lecturer_name}
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  {course.lecturer_bio}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Dostupné termíny */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold mb-8">Dostupné termíny</h2>

          {dates.length === 0 ? (
            <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
              <p className="text-amber-800">
                Momentálně nejsou k dispozici žádné termíny. Brzy přidáme nové!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {dates.map((date) => {
                const availableSpots = date.max_capacity - date.current_booked_count;
                const isAlmostFull = availableSpots <= 3;

                return (
                  <div
                    key={date.id}
                    className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <p className="text-2xl font-bold text-slate-900 mb-2">
                          {formatDate(date.start_date)}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-slate-600">
                          <span className="flex items-center gap-1">
                            📍 {date.location}
                          </span>
                          <span className="flex items-center gap-1">
                            {isAlmostFull ? '⚠️' : '✅'} Zbývá{' '}
                            {availableSpots} {availableSpots === 1 ? 'místo' : 'míst'}
                          </span>
                        </div>
                      </div>
                      <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition-colors">
                        Rezervovat
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
```

---

## 🔴 Realtime sledování kapacity

### Komponent s live updates

```typescript
'use client';

import { useEffect, useState } from 'react';
import { subscribeToCourseDateChanges, type CourseDate } from '@/lib/supabase';

interface Props {
  courseId: string;
  initialDates: CourseDate[];
}

export function RealtimeCourseDates({ courseId, initialDates }: Props) {
  const [dates, setDates] = useState<CourseDate[]>(initialDates);

  useEffect(() => {
    const channel = subscribeToCourseDateChanges(courseId, (payload) => {
      console.log('Realtime update:', payload);

      if (payload.eventType === 'UPDATE') {
        setDates((current) =>
          current.map((date) =>
            date.id === payload.new.id ? payload.new : date
          )
        );
      }
    });

    return () => {
      channel.unsubscribe();
    };
  }, [courseId]);

  return (
    <div className="space-y-4">
      {dates.map((date) => {
        const available = date.max_capacity - date.current_booked_count;

        return (
          <div key={date.id} className="p-4 bg-white rounded-lg border">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold">
                  {new Date(date.start_date).toLocaleDateString('cs-CZ')}
                </p>
                <p className="text-sm text-slate-600">
                  Zbývá {available} míst
                </p>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-green-500 animate-pulse" />
                <span className="text-xs text-slate-500">Live</span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

**Použití:**

```typescript
// V Server Component
import { getCourseBySlug, getAvailableCourseDates } from '@/lib/supabase';
import { RealtimeCourseDates } from '@/components/RealtimeCourseDates';

export default async function CoursePage({ params }: { params: { slug: string } }) {
  const course = await getCourseBySlug(params.slug);
  const dates = await getAvailableCourseDates(course.id);

  return (
    <div>
      <h1>{course.title}</h1>
      <RealtimeCourseDates courseId={course.id} initialDates={dates} />
    </div>
  );
}
```

---

## 🛒 Vytvoření objednávky

### Server Action pro checkout

```typescript
// app/actions/checkout.ts
'use server';

import {
  createOrder,
  createOrderItems,
  generateVariableSymbol,
  type Order,
  type OrderItem,
} from '@/lib/supabase';

interface CheckoutData {
  email: string;
  name: string;
  phone: string;
  street: string;
  city: string;
  zip: string;
  companyName?: string;
  ico?: string;
  dic?: string;
  items: {
    courseDateId: string;
    quantity: number;
    price: number;
  }[];
  paymentMethod: 'invoice' | 'qr' | 'card';
}

export async function createOrderAction(data: CheckoutData) {
  try {
    // Vypočítat celkovou cenu
    const totalPrice = data.items.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    // Vytvořit objednávku
    const order = await createOrder({
      user_email: data.email,
      user_name: data.name,
      company_name: data.companyName || null,
      ico: data.ico || null,
      dic: data.dic || null,
      street: data.street,
      city: data.city,
      zip: data.zip,
      phone: data.phone,
      total_price: totalPrice,
      status: 'pending',
      variable_symbol: generateVariableSymbol(),
      payment_method: data.paymentMethod,
    });

    // Vytvořit položky objednávky
    const orderItems = await createOrderItems(
      data.items.map((item) => ({
        order_id: order.id,
        course_date_id: item.courseDateId,
        quantity: item.quantity,
        unit_price_at_purchase: item.price,
      }))
    );

    return {
      success: true,
      orderId: order.id,
      variableSymbol: order.variable_symbol,
    };
  } catch (error) {
    console.error('Error creating order:', error);
    return {
      success: false,
      error: 'Nepodařilo se vytvořit objednávku',
    };
  }
}
```

**Použití v komponentě:**

```typescript
'use client';

import { createOrderAction } from '@/app/actions/checkout';
import { useState } from 'react';

export function CheckoutForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);

    const result = await createOrderAction({
      email: formData.get('email') as string,
      name: formData.get('name') as string,
      phone: formData.get('phone') as string,
      street: formData.get('street') as string,
      city: formData.get('city') as string,
      zip: formData.get('zip') as string,
      items: [
        // Tady přidáš položky z košíku
      ],
      paymentMethod: 'invoice',
    });

    if (result.success) {
      window.location.href = `/potvrzeni/${result.orderId}`;
    } else {
      alert(result.error);
    }

    setIsSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Formulářová pole */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="px-8 py-3 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
      >
        {isSubmitting ? 'Odesílám...' : 'Dokončit objednávku'}
      </button>
    </form>
  );
}
```

---

## 🔍 Použití TypeScript typů

```typescript
import type { Course, CourseDate, Order, OrderItem } from '@/lib/supabase';

// Typ pro rozšířený kurz s termíny
interface CourseWithDates extends Course {
  dates: CourseDate[];
}

// Typ pro položku košíku
interface CartItem {
  course: Course;
  date: CourseDate;
  quantity: number;
}

// Použití
function processCart(items: CartItem[]) {
  items.forEach((item) => {
    console.log(`${item.course.title} - ${item.date.start_date}`);
  });
}
```

---

## ✨ Hotovo!

Máš připravené:
- ✅ Stránku se seznamem kurzů
- ✅ Detailní stránku kurzu
- ✅ Realtime komponent
- ✅ Server action pro checkout
- ✅ TypeScript typy

Všechny příklady jsou ready-to-use a můžeš je zkopírovat do svého projektu! 🚀
