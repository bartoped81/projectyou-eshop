import { createClient } from '@supabase/supabase-js';
import { readFileSync } from 'fs';
import { join } from 'path';

// Read .env.local file
const envPath = join(process.cwd(), '.env.local');
let supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
let supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

try {
  const envContent = readFileSync(envPath, 'utf-8');
  const lines = envContent.split('\n');

  lines.forEach(line => {
    if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) {
      supabaseUrl = line.split('=')[1].trim();
    }
    if (line.startsWith('SUPABASE_SERVICE_ROLE_KEY=')) {
      supabaseKey = line.split('=')[1].trim();
    }
  });
} catch (error) {
  console.error('Could not read .env.local file');
}

console.log('Using service role key for admin access...');

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateLecturerPhotos() {
  console.log('Updating lecturer photos in courses table...\n');

  const updates = [
    { slug: 'ai-firemni-akcelerator', photo: '/images/lecturers/petr.jpg', name: 'Petr Bartoň' },
    { slug: 'aplikovana-improvizace', photo: '/images/lecturers/geza.jpg', name: 'Géza Prouza' },
    { slug: 'ledove-dobrodruzstvi', photo: '/images/lecturers/tomas.jpg', name: 'Tomáš Ptáček' },
  ];

  for (const update of updates) {
    const { data, error } = await supabase
      .from('courses')
      .update({ lecturer_image_url: update.photo })
      .eq('slug', update.slug)
      .select('slug, lecturer_name, lecturer_image_url');

    if (error) {
      console.error(`❌ Error updating ${update.name}:`, error);
    } else {
      console.log(`✅ Updated ${update.name} photo to: ${update.photo}`);
      if (data && data.length > 0) {
        console.log(`   Verified: ${data[0].lecturer_image_url}`);
      }
    }
  }

  // Verify updates
  console.log('\nVerifying updates...\n');
  const { data: courses, error: fetchError } = await supabase
    .from('courses')
    .select('slug, lecturer_name, lecturer_image_url')
    .order('slug');

  if (fetchError) {
    console.error('❌ Error fetching courses:', fetchError);
  } else {
    console.log('Current lecturer photos:');
    courses?.forEach((course) => {
      console.log(`  ${course.lecturer_name} (${course.slug}): ${course.lecturer_image_url}`);
    });
  }
}

updateLecturerPhotos();
