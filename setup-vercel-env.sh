#!/bin/bash

# Skript pro nastavení environment variables na Vercelu
# Použití: ./setup-vercel-env.sh

echo "🚀 Nastavuji environment variables na Vercelu..."

# Přidání SUPABASE_SERVICE_ROLE_KEY pro všechna prostředí
echo "Přidávám SUPABASE_SERVICE_ROLE_KEY pro production..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9weHRpYnZsYW9uZW1idm94a3hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzkzMjU5MywiZXhwIjoyMDgzNTA4NTkzfQ.78_a-VGtH_t4o7aMra0VoDBVcX2nCBSn0U3Yq7TXnQI" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY production

echo "Přidávám SUPABASE_SERVICE_ROLE_KEY pro preview..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9weHRpYnZsYW9uZW1idm94a3hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzkzMjU5MywiZXhwIjoyMDgzNTA4NTkzfQ.78_a-VGtH_t4o7aMra0VoDBVcX2nCBSn0U3Yq7TXnQI" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY preview

echo "Přidávám SUPABASE_SERVICE_ROLE_KEY pro development..."
echo "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9weHRpYnZsYW9uZW1idm94a3hzIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2NzkzMjU5MywiZXhwIjoyMDgzNTA4NTkzfQ.78_a-VGtH_t4o7aMra0VoDBVcX2nCBSn0U3Yq7TXnQI" | npx vercel env add SUPABASE_SERVICE_ROLE_KEY development

echo ""
echo "✅ Hotovo! Nyní proveďte redeploy na Vercelu:"
echo "   1. Jděte na vercel.com"
echo "   2. Otevřete váš projekt"
echo "   3. Záložka Deployments → klikněte na ⋯ u posledního deploymentu → Redeploy"
echo ""
echo "Nebo spusťte: npx vercel --prod"
