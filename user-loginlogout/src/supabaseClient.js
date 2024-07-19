import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rkahqdszfubhvjjhsnxj.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJrYWhxZHN6ZnViaHZqamhzbnhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTY5MDAyNjcsImV4cCI6MjAzMjQ3NjI2N30.VCFB8xfL6V8du99OHuVuK4WAHW6hJWDkW_QG8htM-ak';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
