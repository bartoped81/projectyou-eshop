import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

// Pro demo účely: pokud chybí Supabase credentials, vytvoř placeholder klienta
// V produkci by měly být nastaveny správné env proměnné
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// =====================================================
// TypeScript Types pro databázové tabulky
// =====================================================

export interface Course {
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

export interface Order {
  id: string;
  created_at: string;
  user_email: string;
  user_name: string;
  company_name: string | null;
  ico: string | null;
  dic: string | null;
  street: string;
  city: string;
  zip: string;
  phone: string;
  total_price: number;
  status: 'pending' | 'paid' | 'cancelled';
  variable_symbol: string;
  payment_method: 'invoice' | 'qr' | 'card';
  updated_at: string;
}

export interface OrderItem {
  id: string;
  order_id: string;
  course_date_id: string;
  quantity: number;
  unit_price_at_purchase: number;
  created_at: string;
}

// =====================================================
// Helper funkce pro práci s databází
// =====================================================

/**
 * Získá všechny aktivní kurzy
 */
export async function getCourses() {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .order('title');

  if (error) throw error;
  return data as Course[];
}

/**
 * Získá kurz podle slug
 */
export async function getCourseBySlug(slug: string) {
  const { data, error } = await supabase
    .from('courses')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data as Course;
}

/**
 * Získá dostupné termíny pro kurz
 */
export async function getAvailableCourseDates(courseId: string) {
  const { data, error } = await supabase
    .from('course_dates')
    .select('*')
    .eq('course_id', courseId)
    .eq('is_active', true)
    .gt('start_date', new Date().toISOString())
    .order('start_date');

  if (error) throw error;
  return data as CourseDate[];
}

/**
 * Získá všechny dostupné termíny (view)
 */
export async function getAllAvailableDates() {
  const { data, error } = await supabase
    .from('available_course_dates')
    .select('*')
    .order('start_date');

  if (error) throw error;
  return data;
}

/**
 * Vytvoří novou objednávku
 */
export async function createOrder(orderData: Omit<Order, 'id' | 'created_at' | 'updated_at'>) {
  const { data, error } = await supabase
    .from('orders')
    .insert([orderData])
    .select()
    .single();

  if (error) throw error;
  return data as Order;
}

/**
 * Vytvoří položky objednávky
 */
export async function createOrderItems(items: Omit<OrderItem, 'id' | 'created_at'>[]) {
  const { data, error } = await supabase
    .from('order_items')
    .insert(items)
    .select();

  if (error) throw error;
  return data as OrderItem[];
}

/**
 * Subscribe na změny v course_dates (realtime)
 */
export function subscribeToCourseDateChanges(
  courseId: string,
  callback: (payload: any) => void
) {
  return supabase
    .channel(`course-dates-${courseId}`)
    .on(
      'postgres_changes',
      {
        event: '*',
        schema: 'public',
        table: 'course_dates',
        filter: `course_id=eq.${courseId}`,
      },
      callback
    )
    .subscribe();
}

/**
 * Vypočítá celkovou cenu včetně DPH
 */
export function calculatePriceWithVat(priceNoVat: number, vatRate: number): number {
  return priceNoVat * (1 + vatRate / 100);
}

/**
 * Formátuje cenu do českého formátu
 */
export function formatPrice(price: number): string {
  return new Intl.NumberFormat('cs-CZ', {
    style: 'currency',
    currency: 'CZK',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}

/**
 * Formátuje datum do českého formátu
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('cs-CZ', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

/**
 * Generuje variabilní symbol (8 číslic)
 */
export function generateVariableSymbol(): string {
  return Math.floor(10000000 + Math.random() * 90000000).toString();
}

// =====================================================
// Authentication Functions
// =====================================================

export interface User {
  id: string;
  email: string;
  user_metadata?: {
    full_name?: string;
  };
}

/**
 * Registrace nového uživatele
 */
export async function signUp(email: string, password: string, fullName: string) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
      },
    },
  });

  if (error) throw error;
  return data;
}

/**
 * Přihlášení uživatele
 */
export async function signIn(email: string, password: string) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;
  return data;
}

/**
 * Odhlášení uživatele
 */
export async function signOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}

/**
 * Získá aktuálního přihlášeného uživatele
 */
export async function getCurrentUser() {
  const { data: { user }, error } = await supabase.auth.getUser();
  if (error) throw error;
  return user;
}

/**
 * Zkontroluje, zda je uživatel admin
 */
export async function isAdmin() {
  const user = await getCurrentUser();
  if (!user) return false;

  // Admin role je uložena v user_metadata nebo v custom claims
  return user.user_metadata?.role === 'admin' || user.email === 'admin@projectyou.cz';
}

/**
 * Poslouchá změny v auth stavu
 */
export function onAuthStateChange(callback: (user: User | null) => void) {
  return supabase.auth.onAuthStateChange((event, session) => {
    callback(session?.user || null);
  });
}
