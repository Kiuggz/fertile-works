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
 * Reads VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY (set in .env locally or in
 * the Cloudflare Pages environment). These are baked into the bundle at build
 * time; only VITE_-prefixed vars reach the browser.
 *
 * Resilience: if the vars are absent we DO NOT throw. createClient() would
 * otherwise raise "supabaseUrl is required" at module load and blank the whole
 * app. Instead we fall back to a harmless placeholder client and expose
 * `isSupabaseConfigured` so callers (e.g. the Contact form) can degrade
 * gracefully instead of crashing the marketing site.
 */
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

/** True only when both Supabase env vars are present at build time. */
export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey)

if (!isSupabaseConfigured) {
  console.warn(
    '[supabase] VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY are not set. ' +
      'The Contact form is disabled until they are configured.'
  )
}

export const supabase = createClient(
  supabaseUrl || 'https://placeholder.supabase.co',
  supabaseAnonKey || 'placeholder-anon-key'
)
