/**
 * supabase.ts
 *
 * Initialises and exports the Supabase client for use across the application.
 *
 * Currently used by:
 * - Contact.tsx — invokes the 'contact-submission' Edge Function.
 *
 * Phase C+ usage:
 * - Portal authentication may optionally use Supabase Auth as an alternative
 *   to the custom PMIS JWT flow. Confirm architecture before Phase C begins.
 *
 * @remarks
 * Requires the following environment variables in .env (never commit .env):
 *   VITE_SUPABASE_URL      — found in Supabase project Settings → API
 *   VITE_SUPABASE_ANON_KEY — found in Supabase project Settings → API
 *
 * Vite exposes env vars prefixed with VITE_ to the browser bundle.
 * Non-VITE_ vars are not available client-side.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
