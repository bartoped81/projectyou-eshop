import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixJanuaryCapacity() {
  console.log('🔄 Upravuji kapacitu lednových termínů na 15 osob...\n');

  // Aktualizovat kapacitu na 15 osob
  const { data: updatedDates, error: updateError } = await supabase
    .from('course_dates')
    .update({
      max_capacity: 15,
    })
    .gte('start_date', '2026-01-01T00:00:00+00:00')
    .lt('start_date', '2026-02-01T00:00:00+00:00')
    .select('id, start_date, location, max_capacity, courses(title)');

  if (updateError) {
    console.error('❌ Chyba při aktualizaci:', updateError);
    return;
  }

  console.log('✅ Úspěšně aktualizováno', updatedDates?.length, 'termínů!\n');

  console.log('📊 Aktualizované termíny:');
  updatedDates?.forEach((date: any, i: number) => {
    console.log(`${i + 1}. ${date.courses?.title}`);
    console.log(`   Datum: ${new Date(date.start_date).toLocaleDateString('cs-CZ')}`);
    console.log(`   Lokace: ${date.location}`);
    console.log(`   Kapacita: ${date.max_capacity} osob`);
    console.log('');
  });
}

fixJanuaryCapacity()
  .then(() => {
    console.log('🎉 Hotovo!');
    process.exit(0);
  })
  .catch((err) => {
    console.error('💥 Kritická chyba:', err);
    process.exit(1);
  });
