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

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function updateLedovkaDescription() {
  console.log('Updating Ledové dobrodružství description...\n');

  const newDescription = 'Program je ideální pro firmy, které hledají autentický rozvoj a chtějí posílit svůj leadership v okamžicích, kdy jde do tuhého.';

  const { data, error } = await supabase
    .from('courses')
    .update({ short_description: newDescription })
    .eq('slug', 'ledove-dobrodruzstvi')
    .select('slug, title, short_description');

  if (error) {
    console.error('❌ Error updating description:', error);
  } else {
    console.log('✅ Updated Ledové dobrodružství description');
    if (data && data.length > 0) {
      console.log(`   New description: ${data[0].short_description}`);
    }
  }
}

updateLedovkaDescription();
