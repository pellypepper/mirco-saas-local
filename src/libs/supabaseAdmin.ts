import { createClient } from '@supabase/supabase-js';

export const supabaseAdmin = createClient(
  process.env.SUPABASE_URL! || 'https://wcqqluhzyzprvmfqsdgh.supabase.co',
  process.env.SUPABASE_SERVICE_ROLE_KEY! || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndjcXFsdWh6eXpwcnZtZnFzZGdoIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MDY4MDE4MiwiZXhwIjoyMDc2MjU2MTgyfQ.NW0gM5dqCBvQIIYS05dW2c3qSFHmfH1DRj2j4CUxkww'
);
