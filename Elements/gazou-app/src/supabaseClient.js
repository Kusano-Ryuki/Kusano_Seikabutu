// supabaseClient.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://cbiydpuufhvjvtulzknq.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNiaXlkcHV1Zmh2anZ0dWx6a25xIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTU5NTE0MTgsImV4cCI6MjAzMTUyNzQxOH0.PxNdAOxgB4U5xx-HMd5RQPHIGwZ6O0DeblobR1jckZ4";

export const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;