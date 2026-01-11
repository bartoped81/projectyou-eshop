import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function addJanuaryDates() {
  console.log('🔄 Přidávám nové termíny pro leden 2026...\n');

  // Získat ID kurzů
  const { data: courses, error: coursesError } = await supabase
    .from('courses')
    .select('id, slug, title')
    .in('slug', ['ai-firemni-akcelerator', 'aplikovana-improvizace', 'ledove-dobrodruzstvi']);

  if (coursesError) {
    console.error('❌ Chyba při načítání kurzů:', coursesError);
    return;
  }

  console.log('✅ Nalezené kurzy:', courses);

  const aiCourse = courses?.find(c => c.slug === 'ai-firemni-akcelerator');
  const improCourse = courses?.find(c => c.slug === 'aplikovana-improvizace');
  const ledovkaCourse = courses?.find(c => c.slug === 'ledove-dobrodruzstvi');

  const newDates = [];

  // AI Firemní Akcelerátor - 14.-15.1.2026
  if (aiCourse) {
    newDates.push({
      course_id: aiCourse.id,
      start_date: '2026-01-14T09:00:00+01:00',
      end_date: '2026-01-15T17:00:00+01:00',
      location: 'Praha - GrowPORT',
      max_capacity: 20,
      current_booked_count: 0,
      is_active: true,
    });

    // AI Firemní Akcelerátor - 28.-29.1.2026
    newDates.push({
      course_id: aiCourse.id,
      start_date: '2026-01-28T09:00:00+01:00',
      end_date: '2026-01-29T17:00:00+01:00',
      location: 'Praha - GrowPORT',
      max_capacity: 20,
      current_booked_count: 0,
      is_active: true,
    });
  }

  // Aplikovaná improvizace - 20.1.2026
  if (improCourse) {
    newDates.push({
      course_id: improCourse.id,
      start_date: '2026-01-20T09:30:00+01:00',
      end_date: '2026-01-20T17:00:00+01:00',
      location: 'Praha - GrowPORT',
      max_capacity: 15,
      current_booked_count: 0,
      is_active: true,
    });
  }

  // Ledové dobrodružství - 23.1.2026
  if (ledovkaCourse) {
    newDates.push({
      course_id: ledovkaCourse.id,
      start_date: '2026-01-23T09:00:00+01:00',
      end_date: '2026-01-23T17:00:00+01:00',
      location: 'Praha - GrowPORT',
      max_capacity: 20,
      current_booked_count: 0,
      is_active: true,
    });
  }

  console.log('\n📅 Přidávám tyto termíny:');
  newDates.forEach((date, i) => {
    const course = courses?.find(c => c.id === date.course_id);
    console.log(`${i + 1}. ${course?.title}: ${date.start_date} - ${date.end_date}`);
  });

  // Vložit nové termíny
  const { data, error } = await supabase
    .from('course_dates')
    .insert(newDates)
    .select();

  if (error) {
    console.error('\n❌ Chyba při přidávání termínů:', error);
    return;
  }

  console.log('\n✅ Úspěšně přidáno', data?.length, 'nových termínů!');
  console.log('\n📊 Detaily přidaných termínů:');
  data?.forEach((date, i) => {
    console.log(`${i + 1}. ID: ${date.id}, Start: ${date.start_date}`);
  });
}

addJanuaryDates()
  .then(() => {
    console.log('\n🎉 Hotovo!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Kritická chyba:', err);
    process.exit(1);
  });
