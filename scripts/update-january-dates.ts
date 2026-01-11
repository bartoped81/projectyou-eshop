import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateJanuaryDates() {
  console.log('🔄 Upravuji lednové termíny...\n');

  // Získat všechny lednové termíny 2026
  const { data: januaryDates, error: fetchError } = await supabase
    .from('course_dates')
    .select('id, course_id, start_date, location, max_capacity, courses(title)')
    .gte('start_date', '2026-01-01T00:00:00+00:00')
    .lt('start_date', '2026-02-01T00:00:00+00:00');

  if (fetchError) {
    console.error('❌ Chyba při načítání termínů:', fetchError);
    return;
  }

  console.log('✅ Nalezeno', januaryDates?.length, 'lednových termínů:\n');
  januaryDates?.forEach((date: any, i: number) => {
    console.log(`${i + 1}. ${date.courses?.title}`);
    console.log(`   Datum: ${date.start_date}`);
    console.log(`   Aktuální lokace: ${date.location}`);
    console.log(`   Aktuální kapacita: ${date.max_capacity}`);
    console.log('');
  });

  // Aktualizovat všechny lednové termíny
  const { data: updatedDates, error: updateError } = await supabase
    .from('course_dates')
    .update({
      location: 'Praha',
      max_capacity: 20,
    })
    .gte('start_date', '2026-01-01T00:00:00+00:00')
    .lt('start_date', '2026-02-01T00:00:00+00:00')
    .select();

  if (updateError) {
    console.error('\n❌ Chyba při aktualizaci termínů:', updateError);
    return;
  }

  console.log('✅ Úspěšně aktualizováno', updatedDates?.length, 'termínů!');
  console.log('\n📊 Nové hodnoty:');
  console.log('   Lokace: Praha');
  console.log('   Kapacita: 20 osob');
}

updateJanuaryDates()
  .then(() => {
    console.log('\n🎉 Hotovo!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('\n💥 Kritická chyba:', err);
    process.exit(1);
  });
