import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://lkcesoqjnenzywpoqttk.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxrY2Vzb3FqbmVuenl3cG9xdHRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQwNjA4ODIsImV4cCI6MjA2OTYzNjg4Mn0.85bcsboOizvB0CO-rc88_f2quTZ9vbLaGAymWtNzJHo'

export const supabase = createClient(supabaseUrl, supabaseKey)
